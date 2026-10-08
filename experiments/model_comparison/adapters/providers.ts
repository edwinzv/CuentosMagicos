import { models, settings } from "../config/models.ts";
import { analysisSchema, geminiSchema, sceneSchema } from "../contracts.ts";
import type { Case, Failure, Provider, Usage } from "../types.ts";
import { withFormatDirective } from "../prompts.ts";
export function request(
  provider: Provider,
  c: Case,
  prompt: string,
  key: string,
) {
  prompt = withFormatDirective(c, prompt);
  const schema = c.operation === "analysis" ? analysisSchema : sceneSchema;
  let body: Record<string, unknown>;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (provider === "G") {
    headers["x-goog-api-key"] = key;
    body = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: geminiSchema(schema),
        maxOutputTokens: settings.maxOutputTokens,
        thinkingConfig: { thinkingLevel: "LOW" },
      },
    };
  } else if (provider === "O") {
    headers.Authorization = `Bearer ${key}`;
    // JSON mode preserves the optional analysis field. Strict mode would silently change contract.
    body = {
      model: models.O.id,
      input: [{
        role: "user",
        content: [{ type: "input_text", text: prompt }],
      }],
      text: { format: { type: "json_object" } },
      max_output_tokens: settings.maxOutputTokens,
      reasoning: { effort: "none" },
      stream: false,
      store: false,
    };
  } else {
    headers["x-api-key"] = key;
    headers["anthropic-version"] = "2023-06-01";
    // No provider-specific instructional prompt. Messages text JSON is validated locally.
    // Sonnet 5.5 thinking.disabled/effective contract remain pending; frozen proposal, not supported-capability claim.
    body = {
      model: models.A.id,
      messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
      max_tokens: settings.maxOutputTokens,
      stream: false,
      thinking: { type: "disabled" },
    };
  }
  return {
    url: models[provider].endpoint,
    init: { method: "POST", headers, body: JSON.stringify(body) },
  };
}
const number = (x: unknown): number | null =>
  typeof x === "number" && Number.isFinite(x) && Number.isInteger(x) && x >= 0
    ? x
    : null;
const owns = (o: unknown, k: string): boolean =>
  !!o && typeof o === "object" && Object.prototype.hasOwnProperty.call(o, k);
// Only omitted optional counters default to zero. Present invalid values remain unknown.
function optionalCount(
  parent: unknown,
  key: string,
  usage: unknown,
): number | null {
  if (!usage || typeof usage !== "object" || Array.isArray(usage)) return null;
  if (parent === undefined) return 0;
  if (!parent || typeof parent !== "object" || Array.isArray(parent)) {
    return null;
  }
  return owns(parent, key)
    ? number((parent as Record<string, unknown>)[key])
    : 0;
}
function aliasCount(
  parent: unknown,
  keys: string[],
  usage: unknown,
): number | null {
  const present = keys.filter((k) => owns(parent, k));
  if (!present.length) return optionalCount(parent, keys[0], usage);
  const values = present.map((k) =>
    number((parent as Record<string, unknown>)[k])
  );
  return values.includes(null) || new Set(values).size !== 1 ? null : values[0];
}
export const unknownUsage = (): Usage => ({
  input: null,
  output: null,
  reasoning: null,
  cacheRead: null,
  cacheWrite: null,
  reasoningIncludedOutput: true,
  inputIncludesCache: true,
  billingValid: false,
});
// Envelopes are untrusted HTTP data; dynamic access is confined to adapter boundary.
interface EnvelopeShape {
  candidates?: {
    content?: { parts?: { thought?: boolean; text?: unknown }[] };
    finishReason?: string;
  }[];
  usageMetadata?: Record<string, unknown>;
  promptFeedback?: { blockReason?: unknown };
  output?: { content?: { type?: string; text?: unknown }[] }[];
  content?: { type?: string; text?: unknown }[];
  usage?: Record<string, unknown> & {
    output_tokens_details?: Record<string, unknown>;
    input_tokens_details?: Record<string, unknown>;
  };
  status?: string;
  incomplete_details?: { reason?: string };
  error?: unknown;
  stop_reason?: string;
  type?: string;
}
export function parseEnvelope(
  provider: Provider,
  raw: unknown,
): { original: string | null; usage: Usage; failure: Failure | null } {
  const data = raw as EnvelopeShape;
  const u = unknownUsage();
  let original: string | null = null, failure: Failure | null = null;
  if (provider === "G") {
    const candidate = data?.candidates?.[0];
    const parts = candidate?.content?.parts?.filter((x) =>
      !x.thought && typeof x.text === "string"
    ) ?? [];
    original = parts.length
      ? parts.map((x) => x.text).join("")
      : null;
    const usage = data?.usageMetadata;
    u.input = number(usage?.promptTokenCount);
    u.output = number(usage?.candidatesTokenCount);
    u.reasoning = optionalCount(usage, "thoughtsTokenCount", usage);
    u.cacheRead = optionalCount(usage, "cachedContentTokenCount", usage);
    u.cacheWrite = 0;
    u.reasoningIncludedOutput = false;
    if (candidate?.finishReason === "MAX_TOKENS") failure = "truncation";
    else if (
      data?.promptFeedback?.blockReason ||
      ["SAFETY", "RECITATION", "BLOCKLIST", "PROHIBITED_CONTENT"].includes(
        candidate?.finishReason ?? "",
      )
    ) failure = "provider_rejection";
  } else if (provider === "O") {
    const parts = (data?.output ?? []).flatMap((x) => x.content ?? []);
    const texts = parts.filter((x) =>
      x.type === "output_text" && typeof x.text === "string"
    );
    original = texts.length ? texts.map((x) => x.text).join("") : null;
    u.input = number(data?.usage?.input_tokens);
    u.output = number(data?.usage?.output_tokens);
    u.reasoning = optionalCount(
      data?.usage?.output_tokens_details,
      "reasoning_tokens",
      data?.usage,
    );
    u.cacheRead = optionalCount(
      data?.usage?.input_tokens_details,
      "cached_tokens",
      data?.usage,
    );
    u.cacheWrite = aliasCount(data?.usage?.input_tokens_details, [
      "cache_write_tokens",
      "cache_creation_tokens",
    ], data?.usage);
    if (
      data?.status === "incomplete" &&
      data?.incomplete_details?.reason === "max_output_tokens"
    ) failure = "truncation";
    else if (
      parts.some((x) => x.type === "refusal") || data?.error ||
      data?.status === "failed" || data?.status === "incomplete"
    ) failure = "provider_rejection";
    else if (data?.status === "in_progress" || data?.status === "queued") {
      failure = "truncation"; // unfinished envelope, never a quality retry
    }
  } else {
    const texts = (data?.content ?? []).filter((x) =>
      x.type === "text" && typeof x.text === "string"
    );
    original = texts.length ? texts.map((x) => x.text).join("") : null;
    u.input = number(data?.usage?.input_tokens);
    u.output = number(data?.usage?.output_tokens);
    u.reasoning = null; // Anthropic does not provide a separate thinking count here; output already includes it.
    u.cacheRead = optionalCount(
      data?.usage,
      "cache_read_input_tokens",
      data?.usage,
    );
    u.cacheWrite = optionalCount(
      data?.usage,
      "cache_creation_input_tokens",
      data?.usage,
    );
    u.inputIncludesCache = false;
    if (data?.stop_reason === "max_tokens") failure = "truncation";
    else if (data?.stop_reason === "refusal" || data?.type === "error") {
      failure = "provider_rejection";
    }
  }
  u.billingValid = u.input !== null && u.output !== null &&
    u.cacheRead !== null && u.cacheWrite !== null &&
    (provider === "A" || u.reasoning !== null);
  if (
    u.billingValid && u.inputIncludesCache &&
    u.cacheRead! + u.cacheWrite! > u.input!
  ) u.billingValid = false;
  if (u.billingValid && provider === "O" && u.reasoning! > u.output!) {
    u.billingValid = false;
  }
  const usage = provider === "G" ? data?.usageMetadata : data?.usage;
  const totalKey = provider === "G" ? "totalTokenCount" : "total_tokens";
  if (owns(usage, totalKey)) {
    const expected = u.input !== null && u.output !== null
      ? u.input + u.output +
        (u.reasoningIncludedOutput ? 0 : u.reasoning ?? 0) +
        (u.inputIncludesCache ? 0 : (u.cacheRead ?? 0) + (u.cacheWrite ?? 0))
      : null;
    if (
      number(usage?.[totalKey]) === null || expected === null ||
      usage?.[totalKey] !== expected
    ) u.billingValid = false;
  }
  if (original === null && !failure) failure = "provider_rejection";
  return { original, usage: u, failure };
}
