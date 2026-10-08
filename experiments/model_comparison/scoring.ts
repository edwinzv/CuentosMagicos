import type { Case, ProviderResult, Review } from "./types.ts";
import {
  acceptance,
  hasCompleteScores,
  hasEvaluableContent,
  validate,
} from "./validation.ts";
import { costPerAcceptable } from "./cost.ts";
import { scales, weights } from "./config/policy.ts";
export { SCORE_VERSION, weights } from "./config/policy.ts";
export function percentCut(
  percent: number,
  criterion: "C1" | "C2" | "C3",
): number {
  if (!["C1", "C2", "C3"].includes(criterion)) {
    throw new Error("Unknown percentage criterion");
  }
  const bounds = scales.percentageLowerBounds;
  return 5 -
    (bounds.findIndex((x) => percent >= x) < 0
      ? 4
      : bounds.findIndex((x) => percent >= x));
}
export function latencyCut(ms: number): number {
  const i = scales.responseMsUpperBounds.findIndex((x) => ms <= x);
  return i < 0 ? 1 : 5 - i;
}
export function costCut(usd: number): number {
  const i = scales.usdPerAcceptableUpperBounds.findIndex((x) => usd <= x);
  return i < 0 ? 1 : 5 - i;
}
export function responseStatistics(values: number[]) {
  if (!values.length) {
    return {
      count: 0,
      rawMs: [],
      meanMs: null,
      medianMs: null,
      minMs: null,
      maxMs: null,
      varianceMs2: null,
      populationStdDevMs: null,
    };
  }
  const meanMs = values.reduce((a, b) => a + b, 0) / values.length;
  const varianceMs2 = values.reduce((s, x) => s + (x - meanMs) ** 2, 0) /
    values.length;
  return {
    count: values.length,
    rawMs: [...values],
    meanMs,
    medianMs: median(values),
    minMs: Math.min(...values),
    maxMs: Math.max(...values),
    varianceMs2,
    populationStdDevMs: Math.sqrt(varianceMs2),
  };
}
export function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b),
    i = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[i] : (sorted[i - 1] + sorted[i]) / 2;
}
export function manualPercent(
  reviews: Review[],
  dimensions: string[],
): number | null {
  const scores = reviews.flatMap((r) =>
    dimensions.map((d) => r.scores[d]).filter((x): x is number =>
      typeof x === "number" && Number.isInteger(x) && x >= 0 && x <= 4
    )
  );
  return scores.length
    ? scores.reduce((a, b) => a + b, 0) / (scores.length * 4) * 100
    : null;
}
export function resultKey(r: ProviderResult): string {
  return `${r.provider}:${r.caseId}:${r.repetition}`;
}
export function resolvedReviews(reviews: Review[], c: Case): Review[] | null {
  const independent = reviews.filter((r) => !r.adjudication);
  if (
    independent.length !== 2 ||
    new Set(independent.map((r) => r.reviewerId)).size !== 2 ||
    reviews.some((r) => !r.reviewerId || !r.runId || !r.blindId) ||
    new Set(reviews.map((r) => r.runId)).size !== 1 ||
    new Set(reviews.map((r) => r.blindId)).size !== 1
  ) return null;
  if (!independent.every((r) => hasCompleteScores(r, c))) return null;
  const disagrees = c.manualDimensions.some((d) =>
    independent[0].scores[d] !== independent[1].scores[d]
  );
  const selected = disagrees
    ? reviews.filter((r) => r.adjudication)
    : independent;
  if (disagrees && selected.length !== 1) return null;
  if (
    disagrees &&
    independent.some((r) => r.reviewerId === selected[0].reviewerId)
  ) return null;
  if (!selected.every((r) => hasCompleteScores(r, c))) return null;
  return selected;
}
export function summarize(
  results: ProviderResult[],
  corpus: Case[],
  reviewsByResult: Record<string, Review[]> = {},
) {
  const evaluable = results.filter((r) =>
    hasEvaluableContent(r.attempts.at(-1)?.original)
  );
  const valid = results.filter((r) =>
    ![
      "technical_failure",
      "timeout",
      "rate_limit",
      "provider_rejection",
      "truncation",
    ].includes(r.attempts.at(-1)?.failure ?? "") &&
    validate(
      corpus.find((c) => c.id === r.caseId)!,
      r.attempts.at(-1)?.parsed,
    ).structural
  ).length;
  const c2Values: number[] = [], c3Values: number[] = [];
  for (const r of evaluable) {
    const c = corpus.find((c) => c.id === r.caseId)!;
    const resolved = resolvedReviews(reviewsByResult[resultKey(r)] ?? [], c);
    if (!resolved) continue;
    const c2 = manualPercent(
      resolved,
      c.manualDimensions.filter((d) =>
        ["fidelity", "history", "protagonist", "decision", "options", "ending"]
          .includes(d)
      ),
    );
    const c3 = manualPercent(
      resolved,
      c.manualDimensions.filter((d) =>
        ["primary_appropriate", "spanish", "resistance"].includes(d)
      ),
    );
    if (c2 !== null) c2Values.push(c2);
    if (c3 !== null) c3Values.push(c3);
  }
  const reviewed = Math.min(c2Values.length, c3Values.length);
  const complete = evaluable.length > 0 && reviewed === evaluable.length;
  const mean = (v: number[]) =>
    v.length ? v.reduce((s, x) => s + x, 0) / v.length : null;
  const c2 = mean(c2Values), c3 = mean(c3Values);
  const technicalFailures =
    results.filter((r) =>
      ["technical_failure", "timeout", "rate_limit"].includes(
        r.attempts.at(-1)?.failure ?? "",
      )
    ).length;
  const allAttempts = results.flatMap((r) => r.attempts);
  const isTechnical = (failure: string | null) =>
    ["technical_failure", "timeout", "rate_limit"].includes(failure ?? "");
  const finalCounts = Object.fromEntries(
    [
      "technical_failure",
      "timeout",
      "rate_limit",
      "provider_rejection",
      "truncation",
    ].map((type) => [
      type,
      results.filter((r) => r.attempts.at(-1)?.failure === type).length,
    ]),
  );
  const attemptCounts = Object.fromEntries(
    [
      "technical_failure",
      "timeout",
      "rate_limit",
      "provider_rejection",
      "truncation",
    ].map(
      (type) => [type, allAttempts.filter((a) => a.failure === type).length],
    ),
  );
  const recoveredTechnicalRuns =
    results.filter((r) =>
      !isTechnical(r.attempts.at(-1)!.failure) &&
      r.attempts.slice(0, -1).some((a) => isTechnical(a.failure))
    ).length;
  const med = median(
    results.map((r) => r.attempts.at(-1)!.response_elapsed_ms),
  );
  const responseStats = responseStatistics(
    results.map((r) => r.attempts.at(-1)!.response_elapsed_ms),
  );
  const billingResults = results.map((r) => {
    const c = corpus.find((c) => c.id === r.caseId)!;
    return {
      ...r,
      acceptance: r.attempts.at(-1)!.failure ? false : acceptance(
        c,
        r.attempts.at(-1)!.parsed,
        reviewsByResult[resultKey(r)] ?? [],
      ),
    };
  });
  const billing = costPerAcceptable(billingResults);
  const criticalFlags = [
    ...results.flatMap((r) =>
      validate(
        corpus.find((c) => c.id === r.caseId)!,
        r.attempts.at(-1)?.parsed,
      ).criticalFlags
    ),
    ...Object.values(reviewsByResult).flatMap((rs) =>
      rs.flatMap((r) => r.criticalFlags)
    ),
  ];
  const scoreSet = {
    C1: results.length ? percentCut(valid / results.length * 100, "C1") : null,
    C2: complete && c2 !== null ? percentCut(c2, "C2") : null,
    C3: complete && c3 !== null ? percentCut(c3, "C3") : null,
    C4: med === null ? null : latencyCut(med),
    C5: billing.K === null ? null : costCut(billing.K),
  };
  return {
    total: results.length,
    structuralPass: valid,
    structuralDenominator: results.length,
    C1: results.length ? percentCut(valid / results.length * 100, "C1") : null,
    C2: scoreSet.C2,
    C3: scoreSet.C3,
    observedC2Percent: c2,
    observedC3Percent: c3,
    manualStatus: complete ? "reviewed" : "pending_review",
    contentEvaluable: evaluable.length,
    contentNotEvaluable: results.length - evaluable.length,
    C2C3Denominator: evaluable.length,
    manualReviewedDenominator: reviewed,
    manualCoverage: evaluable.length ? reviewed / evaluable.length : null,
    medianResponseMs: med,
    responseStats,
    C4: med === null ? null : latencyCut(med),
    technicalFailures,
    technicalFailureCoverage: results.length
      ? technicalFailures / results.length
      : null,
    attemptDenominator: allAttempts.length,
    finalRunDenominator: results.length,
    attemptFailureCounts: attemptCounts,
    finalRunFailureCounts: finalCounts,
    technicalFailureAttempts:
      allAttempts.filter((a) => isTechnical(a.failure)).length,
    recoveredTechnicalRuns,
    technicalAttemptFailureCoverage: allAttempts.length
      ? allAttempts.filter((a) => isTechnical(a.failure)).length /
        allAttempts.length
      : null,
    providerRejections: finalCounts.provider_rejection,
    truncations: finalCounts.truncation,
    billing,
    C5: scoreSet.C5,
    criticalFlagsOutsideTotal: criticalFlags,
    weightedTotal: weightedTotal(scoreSet, criticalFlags),
    status: "scales_approved_frozen; measurements_and_manual_reviews_required",
  };
}
export function weightedTotal(
  scores: Record<keyof typeof weights, number | null>,
  criticalFlags: string[],
) {
  const complete = Object.values(scores).every((s) => s !== null);
  return {
    total: complete
      ? Object.entries(weights).reduce(
        (sum, [k, weight]) =>
          sum + Number(scores[k as keyof typeof weights]) / 5 * weight,
        0,
      )
      : null,
    criticalFlags,
    decisionEligible: complete && criticalFlags.length === 0,
    status: "approved_frozen_scales; not_live_authorization",
  };
}
