import { parseEnvelope, request, unknownUsage } from "./adapters/providers.ts";
import { models, settings } from "./config/models.ts";
import { render } from "./prompts.ts";
import { scrub } from "./security.ts";
import { acceptance, validate } from "./validation.ts";
import { normalizeProduction } from "./production_normalization.ts";
import type {
  Attempt,
  Case,
  FetchLike,
  Provider,
  ProviderResult,
} from "./types.ts";
import { retryPolicy } from "./config/policy.ts";
export class TransientTransportError extends Error {}
export function retryAfter(header: string | null, now = Date.now()): number {
  if (!header) return retryPolicy.fallbackWaitMs;
  const seconds = Number(header);
  const ms = Number.isFinite(seconds)
    ? seconds * 1000
    : Date.parse(header) - now;
  return Math.min(
    settings.maxRetryWaitMs,
    Math.max(0, Number.isFinite(ms) ? ms : retryPolicy.fallbackWaitMs),
  );
}
// fetch is mandatory: no default/global network transport, no env reads, no SDK retries.
export async function execute(
  provider: Provider,
  c: Case,
  repetition: number,
  key: string,
  fetcher: FetchLike,
  options: {
    timeoutMs?: number;
    sleep?: (ms: number) => Promise<void>;
    provenance?: Record<string, unknown>;
    beforeAttempt?: () => Promise<void>;
  } = {},
): Promise<ProviderResult> {
  const attempts: Attempt[] = [], cumulativeStart = performance.now();
  const sleep = options.sleep ??
    ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
  for (let i = 0; i <= settings.maxTechnicalRetries; i++) {
    await options.beforeAttempt?.(); // Freeze mismatch aborts outside technical retry handling, before any transport.
    const controller = new AbortController();
    let start: number | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let retry = false, wait = 600;
    const a: Attempt = {
      original: null,
      envelope: null,
      parsed: null,
      usage: unknownUsage(),
      failure: null,
      status: null,
      response_elapsed_ms: 0,
      validation_ms: 0,
      retry_wait_ms: 0,
      processed: null,
      processingChanges: [],
    };
    try {
      const req = request(provider, c, render(c), key);
      start = performance.now();
      // Keep deadline active through complete body, including mocks that ignore abort.
      const deadline = new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new DOMException("Deadline", "AbortError"));
        }, options.timeoutMs ?? settings.timeoutMs);
      });
      const result = await Promise.race([
        (async () => {
          const response = await fetcher(req.url, {
            ...req.init,
            signal: controller.signal,
          });
          return { response, body: await response.text() };
        })(),
        deadline,
      ]);
      a.response_elapsed_ms = performance.now() - start;
      clearTimeout(timer);
      a.status = result.response.status;
      wait = retryAfter(result.response.headers.get("retry-after"));
      const validationStart = performance.now();
      let data: unknown;
      try {
        data = JSON.parse(result.body);
      } catch {
        data = null;
      }
      a.envelope = scrub(data, [key]);
      if (!result.response.ok) {
        a.failure = a.status === 429
          ? "rate_limit"
          : a.status >= 500
          ? "technical_failure"
          : "provider_rejection";
        retry = a.status === 429 || a.status >= 500;
        // No provider error text persisted; usage/billing cannot be assumed zero.
      } else if (!data) a.failure = "invalid_structure";
      else {
        try {
          Object.assign(a, parseEnvelope(provider, data));
        } catch {
          a.failure = "invalid_structure";
        }
        if (a.original !== null) {
          try {
            a.parsed = JSON.parse(a.original);
          } catch {
            a.failure ??= "invalid_structure";
          }
          a.failure ??= validate(c, a.parsed).failure;
          if (a.parsed !== null) {
            const norm = normalizeProduction(c, a.parsed);
            a.processed = norm.processed;
            a.processingChanges = [...norm.changes, ...norm.unavailable];
          }
        }
      }
      a.validation_ms = performance.now() - validationStart;
    } catch (error) {
      a.response_elapsed_ms = start === null ? 0 : performance.now() - start;
      const name = error instanceof Error ? error.name : "";
      if (name === "AbortError") {
        a.failure = "timeout";
        retry = true;
      } else {
        a.failure = "technical_failure";
        retry = error instanceof TransientTransportError ||
          (error instanceof TypeError &&
            [
              "ECONNRESET",
              "ETIMEDOUT",
              "EAI_AGAIN",
              "ECONNREFUSED",
              "UND_ERR_SOCKET",
              "UND_ERR_CONNECT_TIMEOUT",
            ].includes(
              String((error.cause as { code?: unknown } | undefined)?.code),
            ));
      }
      // Do not save error messages/stacks/URLs; they can contain credentials.
    } finally {
      if (timer !== undefined) clearTimeout(timer);
    }
    attempts.push(a);
    if (!retry || i === settings.maxTechnicalRetries) break;
    const waitStart = performance.now();
    await sleep(wait);
    a.retry_wait_ms = performance.now() - waitStart;
  }
  const last = attempts[attempts.length - 1];
  return {
    provider,
    model: models[provider].id,
    caseId: c.id,
    repetition,
    attempts,
    cumulative_ms: performance.now() - cumulativeStart,
    acceptance: last.failure ? false : acceptance(c, last.parsed),
    provenance: options.provenance ?? {},
  };
}
