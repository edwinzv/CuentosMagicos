import { TARIFF_VERSION, tariffs } from "./config/tariffs.ts";
import { cases } from "./cases/corpus.ts";
import { renderRequest } from "./prompts.ts";
import type { Provider, ProviderResult, Usage } from "./types.ts";
export function cost(provider: Provider, usage: Usage): number | null {
  const t = tariffs[provider];
  if (usage.billingValid === false) return null;
  if (
    [
      usage.input,
      usage.output,
      usage.cacheRead,
      usage.cacheWrite,
      ...(usage.reasoning === null && usage.reasoningIncludedOutput
        ? []
        : [usage.reasoning]),
    ].some((x) =>
      typeof x !== "number" || !Number.isFinite(x) || !Number.isInteger(x) ||
      x < 0
    )
  ) return null;
  if (
    usage.reasoningIncludedOutput && usage.reasoning !== null &&
    usage.output !== null && usage.reasoning > usage.output
  ) return null;
  if (
    usage.input === null || usage.output === null || usage.cacheRead === null ||
    usage.cacheWrite === null ||
    (!usage.reasoningIncludedOutput && usage.reasoning === null)
  ) return null;
  if (
    usage.cacheRead > 0 && t.cacheRead === null ||
    usage.cacheWrite > 0 && t.cacheWrite === null
  ) return null;
  const uncached = usage.inputIncludesCache
    ? usage.input - usage.cacheRead - usage.cacheWrite
    : usage.input;
  if (uncached < 0) return null;
  return (uncached * t.input + usage.cacheRead * (t.cacheRead ?? 0) +
    usage.cacheWrite * (t.cacheWrite ?? 0) +
    (usage.output +
        (usage.reasoningIncludedOutput ? 0 : usage.reasoning ?? 0)) *
      t.output) / 1e6;
}
export function costPerAcceptable(results: ProviderResult[]) {
  const amounts = results.flatMap((r) =>
    r.attempts.map((a) => cost(r.provider, a.usage))
  );
  const accepted = results.filter((r) => r.acceptance === true).length;
  const pending = results.some((r) => r.acceptance === "pending_review");
  const knownSubtotal = amounts.reduce<number>((sum, x) => sum + (x ?? 0), 0);
  return {
    knownSubtotalUSD: knownSubtotal,
    unknownBillableAttempts: amounts.filter((x) => x === null).length,
    accepted,
    pendingReview: pending,
    K: pending || amounts.includes(null) || accepted === 0
      ? null
      : knownSubtotal / accepted,
    status: pending
      ? "pending_review"
      : amounts.includes(null)
      ? "pending_billing"
      : accepted === 0
      ? "no_acceptable_outputs"
      : "frozen_tariff_calculation_not_invoice",
  };
}
export function budget() {
  const prompts = cases.map((c) => ({
    caseId: c.id,
    operation: c.operation,
    chars: renderRequest(c).length,
    heuristicTokensLow: Math.ceil(renderRequest(c).length / 5),
    heuristicTokensHigh: Math.ceil(renderRequest(c).length / 3),
  }));
  const inputLow = prompts.reduce((s, p) => s + p.heuristicTokensLow, 0) * 3;
  const inputHigh = prompts.reduce((s, p) => s + p.heuristicTokensHigh, 0) * 3;
  const perProvider = (["G", "O", "A"] as Provider[]).map((provider) => {
    const outputReserved = 36 * 2000, t = tariffs[provider];
    const low = (inputLow * t.input + outputReserved * t.output) / 1e6;
    const high = (inputHigh * t.input + outputReserved * t.output) / 1e6;
    return {
      provider,
      calls: 36,
      inputLow,
      inputHigh,
      outputReserved,
      baseUSDLow: low,
      baseUSDHigh: high,
      maximumRetryContingencyUSDLow: low,
      maximumRetryContingencyUSDHigh: high,
      totalWithContingencyUSDLow: low * 2,
      totalWithContingencyUSDHigh: high * 2,
    };
  });
  return {
    status: "ESTIMATE_NOT_SPEND_NOT_MEASURED_TOKENS",
    tariffVersion: TARIFF_VERSION,
    charsPerToken: [3, 5],
    prompts,
    perProvider,
    baseCalls: 108,
    maximumAdditionalTechnicalRetries: 108,
    baseTotalUSDLow: perProvider.reduce((s, p) => s + p.baseUSDLow, 0),
    baseTotalUSDHigh: perProvider.reduce((s, p) => s + p.baseUSDHigh, 0),
    caveats:
      "Prompt chars only; schemas/envelope/tokenizer overhead not measured or included. 2000 output tokens reserved per call; model-specific reasoning accounting/limit support pending. No cache discount assumed; no real spending. Maximum retry contingency doubles this estimate, not a certified hard billing cap.",
  };
}
