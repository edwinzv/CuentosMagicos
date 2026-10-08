import { cases, CORPUS_VERSION } from "./cases/corpus.ts";
import {
  FORMAT_DIRECTIVE_VERSION,
  PROMPT_VERSION,
  render,
  renderRequest,
} from "./prompts.ts";
import { analysisSchema, sceneSchema, SCHEMA_VERSION } from "./contracts.ts";
import { CONFIG_VERSION, models, settings } from "./config/models.ts";
import { TARIFF_VERSION, tariffs } from "./config/tariffs.ts";
import type { Case, Provider } from "./types.ts";
import { PROTOCOL_VERSION } from "./config/policy.ts";
import { PINNED_PROTOCOL_DIGEST } from "./freeze.ts";
export function canonical(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  return "{" +
    Object.keys(value).sort().map((k) =>
      JSON.stringify(k) + ":" + canonical((value as Record<string, unknown>)[k])
    ).join(",") + "}";
}
export async function sha(value: unknown): Promise<string> {
  return [
    ...new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(canonical(value)),
      ),
    ),
  ].map((x) => x.toString(16).padStart(2, "0")).join("");
}
export function schedule(
  providers: Provider[] = ["G", "O", "A"],
  repetitions = 3,
  corpus: Case[] = cases,
  seed = settings.orderingSeed,
) {
  const blocks = shuffle(
    corpus.flatMap((c) =>
      Array.from({ length: repetitions }, (_, i) => ({ c, repetition: i + 1 }))
    ),
    seed,
  );
  const providerOrder = shuffle(providers, seed + 1);
  return blocks.flatMap((b, i) =>
    providerOrder.map((_, j) => ({
      ...b,
      provider: providerOrder[(j + i) % providerOrder.length],
    }))
  );
}
export async function provenance(
  commit: string = "pending-explicit-git-provenance",
  run: {
    corpus: Case[];
    providers: Provider[];
    repetitions: number;
    orderingSeed: number;
  } = {
    corpus: cases,
    providers: ["G", "O", "A"],
    repetitions: 3,
    orderingSeed: settings.orderingSeed,
  },
) {
  const actualSchedule = schedule(
    run.providers,
    run.repetitions,
    run.corpus,
    run.orderingSeed,
  ).map((x) => ({
    provider: x.provider,
    caseId: x.c.id,
    repetition: x.repetition,
  }));
  return {
    commit,
    protocolVersion: PROTOCOL_VERSION,
    protocolDigest: PINNED_PROTOCOL_DIGEST,
    corpusVersion: CORPUS_VERSION,
    promptVersion: PROMPT_VERSION,
    formatDirectiveVersion: FORMAT_DIRECTIVE_VERSION,
    schemaVersion: SCHEMA_VERSION,
    configVersion: CONFIG_VERSION,
    tariffVersion: TARIFF_VERSION,
    corpusHash: await sha(run.corpus),
    snapshotPromptsHash: await sha(
      run.corpus.map((c) => ({ id: c.id, prompt: render(c) })),
    ),
    promptsHash: await sha(
      run.corpus.map((c) => ({ id: c.id, prompt: renderRequest(c) })),
    ),
    schemaHash: await sha({ analysisSchema, sceneSchema }),
    configHash: await sha({
      configVersion: CONFIG_VERSION,
      formatDirectiveVersion: FORMAT_DIRECTIVE_VERSION,
      tariffVersion: TARIFF_VERSION,
      settings: { ...settings, orderingSeed: run.orderingSeed },
      models: Object.fromEntries(run.providers.map((p) => [p, models[p]])),
      tariffs: Object.fromEntries(run.providers.map((p) => [p, tariffs[p]])),
    }),
    providers: run.providers,
    repetitions: run.repetitions,
    callsPlanned: actualSchedule.length,
    scheduleHash: await sha(actualSchedule),
    runConfigHash: await sha({
      providers: run.providers,
      repetitions: run.repetitions,
      orderingSeed: run.orderingSeed,
    }),
    orderingSeed: run.orderingSeed,
    modelSeed: null,
  };
}
export function shuffle<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let state = seed >>> 0;
  const next = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
