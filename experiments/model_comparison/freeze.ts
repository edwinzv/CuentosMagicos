import frozen from "./frozen/protocol-dt02-frozen-1.json" with { type: "json" };
import { cases, CORPUS_VERSION } from "./cases/corpus.ts";
import {
  FORMAT_DIRECTIVE_VERSION,
  formatDirective,
  PROMPT_VERSION,
  render,
  renderRequest,
} from "./prompts.ts";
import { analysisSchema, sceneSchema, SCHEMA_VERSION } from "./contracts.ts";
import { CONFIG_VERSION, models, settings } from "./config/models.ts";
import { TARIFF_VERSION, tariffs } from "./config/tariffs.ts";
import {
  acceptancePolicy,
  PROTOCOL_VERSION,
  retryPolicy,
  scales,
  SCORE_VERSION,
  weights,
} from "./config/policy.ts";
import { request } from "./adapters/providers.ts";
import { sha } from "./provenance.ts";
import type { Case, Provider } from "./types.ts";
export const PINNED_PROTOCOL_DIGEST =
  "2daab00355bb412b48b685c0e2562c184256aa51a35dfa5476b5e73c1421849f";
const providers: Provider[] = ["G", "O", "A"];
export function definitionInputs() {
  return {
    versions: {
      protocol_version: PROTOCOL_VERSION,
      corpus_version: CORPUS_VERSION,
      prompt_version: PROMPT_VERSION,
      schema_version: SCHEMA_VERSION,
      common_json_format_version: FORMAT_DIRECTIVE_VERSION,
      config_version: CONFIG_VERSION,
      tariff_version: TARIFF_VERSION,
      score_version: SCORE_VERSION,
    },
    corpus: cases,
    snapshots: cases.map((c) => ({ id: c.id, prompt: render(c) })),
    renderedPrompts: cases.map((c) => ({ id: c.id, prompt: renderRequest(c) })),
    commonDirectives: cases.map((c) => ({
      id: c.id,
      text: formatDirective(c),
    })),
    schemas: { analysisSchema, sceneSchema },
    selection: providers.map((provider) => ({
      provider,
      name: models[provider].name,
      id: models[provider].id,
      endpoint: models[provider].endpoint,
      channel: models[provider].channel,
      state: models[provider].state,
    })),
    parameters: settings,
    tariffs: providers.map((provider) => ({
      provider,
      input: tariffs[provider].input,
      output: tariffs[provider].output,
      cacheRead: tariffs[provider].cacheRead,
      cacheWrite: tariffs[provider].cacheWrite,
      introductoryUntil: tariffs[provider].introductoryUntil,
    })),
    scoring: { weights, scales, acceptancePolicy },
    retryPolicy,
    experimentalDesign: {
      providers,
      repetitions: 3,
      caseCount: 12,
      baseCalls: 108,
      orderingSeed: settings.orderingSeed,
      modelSeed: null,
      history: "fixed literal canonical inputs; no chaining",
      singleActive: true,
    },
    requests: cases.flatMap((c) =>
      providers.map((provider) => {
        const r = request(provider, c, render(c), "");
        return {
          provider,
          caseId: c.id,
          method: r.init.method,
          url: r.url,
          body: JSON.parse(r.init.body),
          publicHeaders: Object.fromEntries(
            [...new Headers(r.init.headers)].filter(([key]) =>
              !/authorization|api[-_]?key|token|secret|cookie|password/i.test(
                key,
              )
            ),
          ),
        };
      })
    ),
  };
}
export type DefinitionInputs = ReturnType<typeof definitionInputs>;
export async function buildFrozenPayload(
  inputs: DefinitionInputs = definitionInputs(),
) {
  const components = Object.fromEntries(
    await Promise.all(
      Object.entries(inputs).map(async (
        [name, value],
      ) => [name, await sha(value)]),
    ),
  );
  return {
    versions: inputs.versions,
    components,
    models: inputs.selection,
    parameters: inputs.parameters,
    tariffs: inputs.tariffs,
    scoring: inputs.scoring,
    retryPolicy: inputs.retryPolicy,
    experimentalDesign: inputs.experimentalDesign,
  };
}
export async function assertDefinitionMatches(
  payload: unknown,
  digest: string,
  inputs: DefinitionInputs = definitionInputs(),
) {
  if (
    digest !== PINNED_PROTOCOL_DIGEST || await sha(payload) !== digest ||
    await sha(await buildFrozenPayload(inputs)) !== digest
  ) {
    throw new Error(
      "FROZEN_PROTOCOL_MISMATCH: stop; changes require a new protocol_version and independently approved freeze, never overwrite after results",
    );
  }
}
export async function assertFrozenDefinition() {
  await assertDefinitionMatches(frozen.payload, frozen.digest);
}
export async function assertFrozenCase(provider: Provider, c: Case) {
  await assertFrozenDefinition();
  const canonicalCase = cases.find((x) => x.id === c.id);
  if (
    !providers.includes(provider) || !canonicalCase ||
    await sha(c) !== await sha(canonicalCase)
  ) {
    throw new Error(
      "FROZEN_CASE_MISMATCH: scheduled input/provider is outside the frozen corpus",
    );
  }
}
export const frozenManifest = frozen;
