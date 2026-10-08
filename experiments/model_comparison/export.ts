import { csv, safeJSON } from "./security.ts";
import type { ProviderResult } from "./types.ts";
export function exportJSON(
  results: ProviderResult[],
  secrets: string[] = [],
): string {
  return safeJSON({ artifactType: "benchmark_results", results }, secrets);
}
export function exportCSV(
  results: ProviderResult[],
  secrets: string[] = [],
): string {
  return csv(
    results.flatMap((r) =>
      r.attempts.map((a, i) => ({
        provider: r.provider,
        model: r.model,
        caseId: r.caseId,
        repetition: r.repetition,
        attempt: i + 1,
        acceptance: r.acceptance,
        failure: a.failure,
        status: a.status,
        original: a.original,
        parsed: a.parsed,
        processed: a.processed,
        processingChanges: a.processingChanges,
        envelope: a.envelope,
        usage: a.usage,
        response_elapsed_ms: a.response_elapsed_ms,
        validation_ms: a.validation_ms,
        retry_wait_ms: a.retry_wait_ms,
        cumulative_ms: r.cumulative_ms,
        provenance: r.provenance,
      }))
    ),
    secrets,
  );
}
