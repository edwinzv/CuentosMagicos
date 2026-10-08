import { analysisRequired } from "./contracts.ts";
import type { Case, Failure, Review } from "./types.ts";
import { acceptancePolicy } from "./config/policy.ts";
export function words(s: string): number {
  return s.trim() ? s.trim().split(/\s+/u).length : 0;
}
export function hasEvaluableContent(original: unknown): original is string {
  return typeof original === "string" && original.trim().length > 0;
}
export function hasCompleteScores(r: Review, c: Case): boolean {
  return c.manualDimensions.every((d) =>
    typeof r.scores[d] === "number" && Number.isInteger(r.scores[d]) &&
    Number(r.scores[d]) >= 0 && Number(r.scores[d]) <= 4
  );
}
export function validate(
  c: Case,
  value: unknown,
): {
  structural: boolean;
  wordRange: boolean;
  criticalFlags: string[];
  failure: Failure | null;
} {
  const v = value as Record<string, unknown>;
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    return {
      structural: false,
      wordRange: false,
      criticalFlags: [],
      failure: "invalid_structure",
    };
  }
  let structural: boolean;
  if (c.operation === "analysis") {
    structural = analysisRequired.every((k) => typeof v[k] === "string") &&
      (!("tituloOriginal" in v) || typeof v.tituloOriginal === "string");
  } else {
    const final = c.operation === "final";
    structural = typeof v.contenido === "string" && !!v.contenido.trim() &&
      typeof v.esFinal === "boolean" && v.esFinal === final &&
      Array.isArray(v.opciones) && v.opciones.every((x) =>
        typeof x === "string" && !!x.trim()
      ) && v.opciones.length === (final ? 0 : 3) &&
      new Set(v.opciones.map((x) => typeof x === "string" ? x.trim() : x))
          .size === v.opciones.length;
  }
  const count = words(
    typeof v[c.operation === "analysis" ? "resumen" : "contenido"] === "string"
      ? v[c.operation === "analysis" ? "resumen" : "contenido"] as string
      : "",
  );
  const [min, max] = acceptancePolicy.wordRanges[c.operation];
  const criticalFlags: string[] = [];
  if (
    c.id === "A03" && typeof v.finalOriginal === "string" &&
    v.finalOriginal.trim().length > 0
  ) criticalFlags.push("invented_ending");
  if (
    c.operation === "final" && typeof v.contenido === "string" &&
    /(continuará|siguiente paso|tendrá que descubrir|aún debía averiguar|una nueva aventura comenzaba)/iu
      .test(v.contenido)
  ) criticalFlags.push("open_ending");
  return {
    structural,
    wordRange: count >= min && count <= max,
    criticalFlags,
    failure: !structural
      ? "invalid_structure"
      : criticalFlags.length
      ? "restriction_failure"
      : count < min || count > max
      ? "narrative_failure"
      : null,
  };
}
export function acceptance(
  c: Case,
  value: unknown,
  reviews: Review[] = [],
): boolean | "pending_review" {
  const v = validate(c, value);
  if (!v.structural || !v.wordRange || v.criticalFlags.length) return false;
  if (reviews.some((r) => r.criticalFlags.length)) return false;
  const adjudicated = reviews.filter((r) => r.adjudication);
  const independent = reviews.filter((r) => !r.adjudication);
  if (
    independent.length !== 2 ||
    new Set(independent.map((r) => r.reviewerId)).size !== 2 ||
    reviews.some((r) => !r.reviewerId || !r.runId || !r.blindId) ||
    new Set(reviews.map((r) => r.runId)).size !== 1 ||
    new Set(reviews.map((r) => r.blindId)).size !== 1
  ) return "pending_review";
  if (!independent.every((r) => hasCompleteScores(r, c))) {
    return "pending_review";
  }
  const disagree = c.manualDimensions.some((d) =>
    new Set(independent.map((r) => r.scores[d])).size > 1
  );
  if (disagree && adjudicated.length !== 1) return "pending_review";
  const selected = disagree ? adjudicated : independent;
  if (
    disagree && independent.some((r) => r.reviewerId === selected[0].reviewerId)
  ) return "pending_review";
  if (!selected.every((r) => hasCompleteScores(r, c))) return "pending_review";
  return selected.every((r) =>
    c.manualDimensions.every((d) =>
      Number(r.scores[d]) >= acceptancePolicy.minimumManualScore
    )
  );
}
