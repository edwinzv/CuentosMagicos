import type { Case, ProviderResult, Review } from "./types.ts";
import { sha, shuffle } from "./provenance.ts";
import { scrub } from "./security.ts";
import { hasEvaluableContent } from "./validation.ts";
export async function blindPackets(
  results: ProviderResult[],
  corpus: Case[],
  runId: string,
  seed: number,
  secrets: string[] = [],
) {
  const packets = [], privateMapping = [];
  for (const r of shuffle(results, seed)) {
    const blindId: string = "B-" +
      (await sha({ runId, seed, index: packets.length })).slice(0, 16);
    const c = corpus.find((c) => c.id === r.caseId)!;
    const last = r.attempts.at(-1)!;
    packets.push({
      blindId,
      runId,
      caseId: c.id,
      input: c.input,
      expectedFacts: c.expectedFacts,
      forbiddenContradictions: c.forbiddenContradictions,
      dimensions: c.manualDimensions,
      criticalRules: c.criticalRules,
      content: scrub(last.original, secrets),
      evaluability: hasEvaluableContent(last.original)
        ? "evaluable"
        : "not_evaluable",
    });
    privateMapping.push({
      blindId,
      provider: r.provider,
      model: r.model,
      repetition: r.repetition,
    });
  }
  return { packets, privateMapping }; // privateMapping must never be sent to reviewers.
}
export function reviewTemplate(
  blindId: string,
  runId: string,
  c: Case,
): Review {
  return {
    blindId,
    runId,
    reviewerId: "",
    scores: Object.fromEntries(c.manualDimensions.map((d) => [d, null])),
    notes: "",
    criticalFlags: [],
  };
}
export function validateReview(r: Review, c: Case) {
  return !!r.blindId && !!r.runId && !!r.reviewerId &&
    c.manualDimensions.every((d) =>
      r.scores[d] !== null && Number.isInteger(r.scores[d]) &&
      Number(r.scores[d]) >= 0 && Number(r.scores[d]) <= 4
    ) && typeof r.notes === "string";
}
