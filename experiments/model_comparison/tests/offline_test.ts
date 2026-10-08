// Fault-injection mocks deliberately carry malformed dynamic envelopes and immediately resolving async transports.
// deno-lint-ignore-file no-explicit-any require-await
import { base, cases } from "../cases/corpus.ts";
import {
  FORMAT_DIRECTIVE_VERSION,
  formatDirective,
  render,
  renderRequest,
  scenePrompt,
} from "../prompts.ts";
import {
  analysisRequired,
  analysisSchema,
  geminiSchema,
  sceneSchema,
} from "../contracts.ts";
import { acceptance, hasEvaluableContent, validate } from "../validation.ts";
import { parseEnvelope, request, unknownUsage } from "../adapters/providers.ts";
import { execute, retryAfter, TransientTransportError } from "../http.ts";
import { budget, cost, costPerAcceptable } from "../cost.ts";
import { canonical, provenance, sha } from "../provenance.ts";
import { main, runOfflineOrInjected, schedule } from "../runner.ts";
import { csv, safeJSON, scrub } from "../security.ts";
import { exportCSV, exportJSON } from "../export.ts";
import { blindPackets, reviewTemplate, validateReview } from "../review.ts";
import {
  costCut,
  latencyCut,
  manualPercent,
  median,
  percentCut,
  resolvedReviews,
  resultKey,
  summarize,
  weightedTotal,
} from "../scoring.ts";
import { normalizeProduction } from "../production_normalization.ts";
import {
  approval,
  assertLiveApproved,
  effectiveVerification,
  models,
  settings,
} from "../config/models.ts";
import {
  assertDefinitionMatches,
  assertFrozenDefinition,
  buildFrozenPayload,
  definitionInputs,
  frozenManifest,
  PINNED_PROTOCOL_DIGEST,
} from "../freeze.ts";
import { responseStatistics } from "../scoring.ts";
import type { Case, Provider, Review } from "../types.ts";
const rt = globalThis as any;
const nodeTestModule = "node:test";
const test: (name: string, fn: () => unknown) => void = rt.Deno
  ? rt.Deno.test.bind(rt.Deno)
  : (await import(nodeTestModule)).test;
function ok(value: unknown, message = "assertion failed"): asserts value {
  if (!value) throw new Error(message);
}
function eq(a: unknown, b: unknown) {
  ok(
    canonical(a) === canonical(b),
    `Mismatch: ${JSON.stringify(a)} != ${JSON.stringify(b)}`,
  );
}
async function rejects(fn: () => unknown) {
  let rejected = false;
  try {
    await fn();
  } catch {
    rejected = true;
  }
  ok(rejected);
}
async function read(url: URL): Promise<string> {
  const nodeFsModule = "node:fs/promises";
  return rt.Deno
    ? rt.Deno.readTextFile(url)
    : (await import(nodeFsModule)).readFile(url, "utf8");
}
globalThis.fetch = (() => {
  throw new Error("OFFLINE_TEST_NO_NETWORK");
}) as typeof fetch;
const scene = (final = false, count = final ? 110 : 100) => ({
  contenido: Array(count).fill("semillas").join(" "),
  opciones: final ? [] : [
    "Pedir ayuda a Tomás",
    "Comprobar las piedras",
    "Inspeccionar el puente",
  ],
  esFinal: final,
});
const analysis = (): Record<string, string> => ({
  ...Object.fromEntries(analysisRequired.map((k) => [k, ""])),
  resumen: Array(70).fill("semillas").join(" "),
});
function envelope(p: Provider, original: string) {
  return p === "G"
    ? {
      candidates: [{
        content: { parts: [{ text: original }] },
        finishReason: "STOP",
      }],
      usageMetadata: {
        promptTokenCount: 100,
        candidatesTokenCount: 30,
        thoughtsTokenCount: 10,
      },
    }
    : p === "O"
    ? {
      status: "completed",
      output: [{
        type: "message",
        content: [{ type: "output_text", text: original }],
      }],
      usage: {
        input_tokens: 100,
        output_tokens: 40,
        output_tokens_details: { reasoning_tokens: 10 },
      },
    }
    : {
      content: [{ type: "text", text: original }],
      stop_reason: "end_turn",
      usage: { input_tokens: 100, output_tokens: 40 },
    };
}
const response = (p: Provider, value: unknown) =>
  new Response(
    JSON.stringify(
      envelope(p, typeof value === "string" ? value : JSON.stringify(value)),
    ),
    { status: 200 },
  );
test("12 complete canonical cases, correct categories/fields/versions and fixed histories", () => {
  eq(cases.map((c) => c.id), [
    "A01",
    "A02",
    "A03",
    "I01",
    "I02",
    "I03",
    "C01",
    "C02",
    "C03",
    "F01",
    "F02",
    "F03",
  ]);
  for (const c of cases) {
    ok(
      c.expectedFacts.length && c.forbiddenContradictions.length &&
        c.criticalRules.length && c.objectiveIds.length && c.promptVersion &&
        c.schemaVersion,
    );
    if (c.operation !== "analysis") {
      for (const k of Object.keys(base)) ok(k in c.input);
    }
  }
  ok(!String(cases[2].input.texto).includes("Tomás examinó"));
  ok(String(cases[2].input.texto).includes("OVERRIDE"));
  ok(String(cases[8].input.contextoNarrativo).includes("graphic injury"));
  ok(
    String(cases[10].input.contextoNarrativo).includes(
      "puente continuaba roto",
    ),
  );
  ok(
    String(cases[11].input.contextoNarrativo).includes(
      "lluvia ya había comenzado",
    ),
  );
});
test("snapshot prompts exactly match CURRENT Edge templates for all 12 inputs", async () => {
  const analysisSource = await read(
    new URL(
      "../../../supabase/functions/analizar-historia/index.ts",
      import.meta.url,
    ),
  );
  const sceneSource = await read(
    new URL(
      "../../../supabase/functions/generar-escena/index.ts",
      import.meta.url,
    ),
  );
  const sourceTemplate = analysisSource.slice(
    analysisSource.indexOf("    const prompt = `"),
    analysisSource.indexOf("    const requestBody ="),
  );
  const sceneTemplate = sceneSource.slice(
    sceneSource.indexOf("    const textoFuenteLimitado ="),
    sceneSource.indexOf("    const requestBody ="),
  );
  for (const c of cases) {
    if (c.operation === "analysis") {
      eq(
        render(c),
        Function("texto", sourceTemplate + "\nreturn prompt;")(
          String(c.input.texto).trim(),
        ),
      );
    } else {
      const b = c.input, keys = Object.keys(b), values = Object.values(b);
      eq(
        render(c),
        Function(...keys, "fueRenombrado", sceneTemplate + "\nreturn prompt;")(
          ...values,
          String(b.personajeOriginal).toLowerCase() !==
            String(b.personajePrincipal).toLowerCase(),
        ),
      );
    }
  }
});
test("source truncation only in initial template; continuation/final never insert extra source", () => {
  const source = "SOURCE_MARKER_" + "x".repeat(9000);
  const initial = scenePrompt({ ...base, textoFuente: source });
  ok(initial.includes(source.slice(0, 8000)));
  ok(!initial.includes(source.slice(0, 8001)));
  for (
    const c of cases.filter((c) =>
      ["continuation", "final"].includes(c.operation)
    )
  ) {
    ok(
      !scenePrompt({ ...c.input, textoFuente: source }).includes(
        "SOURCE_MARKER",
      ),
    );
  }
});
test("analysis seven required string fields, optional title, blanks allowed, invalid types rejected", () => {
  eq(analysisSchema.required.length, 7);
  ok(!analysisSchema.required.includes("tituloOriginal"));
  const a = analysis();
  ok(validate(cases[0], a).structural);
  ok(validate(cases[0], { ...a, tituloOriginal: "" }).structural);
  for (const k of analysisRequired) {
    const broken = { ...a };
    delete broken[k];
    ok(!validate(cases[0], broken).structural);
    ok(!validate(cases[0], { ...a, [k]: 42 }).structural);
  }
  ok(!validate(cases[0], { ...a, tituloOriginal: null }).structural);
});
test("strict scene types, nonempty contents/options, distinct cardinality and exact final flag", () => {
  const c = cases[3], s = scene();
  ok(validate(c, s).structural);
  for (
    const v of [
      { ...s, contenido: "" },
      { ...s, contenido: 42 },
      { ...s, opciones: ["a", 2, "c"] },
      { ...s, opciones: ["a", "a", "c"] },
      { ...s, opciones: ["a", "b", " b "] },
      { ...s, opciones: ["a", "b"] },
      { ...s, esFinal: "false" },
      { ...s, esFinal: true },
      null,
      [],
    ]
  ) ok(!validate(c, v).structural);
  ok(validate(cases[9], scene(true)).structural);
  ok(!validate(cases[9], scene()).structural);
  ok(!validate(cases[9], { ...scene(true), opciones: ["a"] }).structural);
});
test("word range boundaries 60–120 analysis, 90–160 scenes, 100–160 final", () => {
  for (
    const [index, min, max] of [[0, 60, 120], [3, 90, 160], [6, 90, 160], [
      9,
      100,
      160,
    ]]
  ) {
    for (const n of [min - 1, min, max, max + 1]) {
      const v = index === 0
        ? { ...analysis(), resumen: Array(n).fill("a").join(" ") }
        : scene(index === 9, n);
      eq(validate(cases[index], v).wordRange, n >= min && n <= max);
    }
  }
});
test("A03 invented ending critical flag and open final independently fail", () => {
  eq(
    validate(cases[2], { ...analysis(), finalOriginal: "Sembraron" }).failure,
    "restriction_failure",
  );
  ok(
    validate(cases[9], {
      ...scene(true),
      contenido: scene(true).contenido + " continuará",
    }).criticalFlags.includes("open_ending"),
  );
});
test("three provider request bodies preserve identical prompts and exact IDs, no sampling/cache override", () => {
  for (const c of cases) {
    for (const p of ["G", "O", "A"] as Provider[]) {
      const req = request(p, c, render(c), "MOCK_SECRET"),
        b = JSON.parse(req.init.body);
      const prompt = p === "G"
        ? b.contents[0].parts[0].text
        : p === "O"
        ? b.input[0].content[0].text
        : b.messages[0].content[0].text;
      eq(prompt, renderRequest(c));
      ok(!/temperature|top_k|top_p|cache_control|"seed"/.test(req.init.body));
      if (p === "G") {
        ok(req.url.includes(models.G.id));
        eq(b.generationConfig.thinkingConfig.thinkingLevel, "LOW");
      } else {
        eq(b.model, models[p].id);
        eq(b.stream, false);
      }
      if (p === "O") {
        eq(b.text.format.type, "json_object");
        eq(b.reasoning.effort, "none");
      }
      if (p === "A") eq(b.thinking.type, "disabled");
    }
  }
  eq((geminiSchema(sceneSchema) as any).type, "OBJECT");
});
for (const p of ["G", "O", "A"] as Provider[]) {
  test(`${p} adapter parses exact untrimmed original and usage without thinking double count`, () => {
    const raw = " \n" + JSON.stringify(scene()) + "\n ";
    const parsed = parseEnvelope(p, envelope(p, raw));
    eq(parsed.original, raw);
    eq(parsed.failure, null);
    ok(cost(p, parsed.usage) !== null);
    eq(parsed.usage.reasoningIncludedOutput, p !== "G");
  });
  test(`${p} HTTP injected valid result retains original and manual acceptance pending`, async () => {
    const r = await execute(
      p,
      cases[3],
      1,
      "mock",
      async () => response(p, scene()),
    );
    eq(r.attempts.length, 1);
    eq(r.acceptance, "pending_review");
    eq(r.attempts[0].failure, null);
  });
}
test("refusal and truncation normalized for all providers", () => {
  eq(
    parseEnvelope("G", { promptFeedback: { blockReason: "SAFETY" } }).failure,
    "provider_rejection",
  );
  eq(
    parseEnvelope("G", { candidates: [{ finishReason: "MAX_TOKENS" }] })
      .failure,
    "truncation",
  );
  eq(
    parseEnvelope("O", { output: [{ content: [{ type: "refusal" }] }] })
      .failure,
    "provider_rejection",
  );
  eq(
    parseEnvelope("O", {
      status: "incomplete",
      incomplete_details: { reason: "max_output_tokens" },
    }).failure,
    "truncation",
  );
  eq(
    parseEnvelope("A", { stop_reason: "refusal" }).failure,
    "provider_rejection",
  );
  eq(parseEnvelope("A", { stop_reason: "max_tokens" }).failure, "truncation");
});
test("max one retry for 429 and 5xx; retry wait bounded; all attempts retained", async () => {
  for (const status of [429, 500, 503]) {
    let n = 0, slept = -1;
    const r = await execute(
      "O",
      cases[3],
      1,
      "mock",
      async () =>
        ++n === 1
          ? new Response("{}", { status, headers: { "retry-after": "999999" } })
          : response("O", scene()),
      {
        sleep: async (ms) => {
          slept = ms;
        },
      },
    );
    eq(n, 2);
    eq(slept, 5000);
    eq(
      r.attempts[0].failure,
      status === 429 ? "rate_limit" : "technical_failure",
    );
    eq(r.attempts[1].failure, null);
    eq(costPerAcceptable([r]).K, null);
  }
  let n = 0;
  await execute("G", cases[3], 1, "", async () => {
    n++;
    return new Response("{}", { status: 503 });
  }, { sleep: async () => {} });
  eq(n, 2);
});
test("transport retry only explicitly transient, not arbitrary programming errors", async () => {
  for (const transient of [true, false]) {
    let n = 0;
    const r = await execute("A", cases[3], 1, "", async () => {
      n++;
      throw transient
        ? new TransientTransportError()
        : new Error("programming secret");
    }, { sleep: async () => {} });
    eq(n, transient ? 2 : 1);
    ok(!safeJSON(r).includes("programming secret"));
  }
});
test("invalid JSON/quality/refusal/truncation/400 never retry", async () => {
  for (
    const fetcher of [
      async () => response("O", "not JSON"),
      async () => response("O", scene(false, 2)),
      async () =>
        new Response(
          JSON.stringify({ output: [{ content: [{ type: "refusal" }] }] }),
        ),
      async () =>
        new Response(
          JSON.stringify({
            status: "incomplete",
            incomplete_details: { reason: "max_output_tokens" },
          }),
        ),
      async () => new Response("{}", { status: 400 }),
    ]
  ) {
    let n = 0;
    const r = await execute("O", cases[3], 1, "", async () => {
      n++;
      return fetcher();
    });
    eq(n, 1);
    eq(r.acceptance, false);
  }
});
test("timing covers complete delayed body; validation measured separately", async () => {
  const r = await execute(
    "O",
    cases[3],
    1,
    "",
    async () =>
      new Response(
        new ReadableStream({
          start(controller) {
            setTimeout(() => {
              controller.enqueue(
                new TextEncoder().encode(
                  JSON.stringify(envelope("O", JSON.stringify(scene()))),
                ),
              );
              controller.close();
            }, 30);
          },
        }),
      ),
  );
  ok(r.attempts[0].response_elapsed_ms >= 20);
  ok(r.attempts[0].validation_ms >= 0);
  ok(r.cumulative_ms >= r.attempts[0].response_elapsed_ms);
});
test("timeout remains active during body and aborts each attempt", async () => {
  const signals: AbortSignal[] = [];
  const r = await execute("G", cases[3], 1, "", async (_url, init) => {
    signals.push(init.signal!);
    return new Response(new ReadableStream({ start() {} }));
  }, { timeoutMs: 10, sleep: async () => {} });
  eq(r.attempts.length, 2);
  ok(signals.every((s) => s.aborted));
  ok(r.attempts.every((a) => a.failure === "timeout"));
  eq(costPerAcceptable([r]).K, null);
});
test("retry-after seconds/date/invalid clamped and no hanging", () => {
  eq(retryAfter("100000"), 5000);
  eq(retryAfter("-2"), 0);
  eq(retryAfter("invalid"), 600);
  eq(retryAfter(new Date(3000).toUTCString(), 1000), 2000);
});
test("recursive key AND value scrubbing, encoded URLs, arbitrary echoed credentials", () => {
  const secret = "fake-secret-+/long";
  const raw = {
    Authorization: "Bearer abc",
    nested: [{
      api_key: secret,
      echo: `prefix ${secret} suffix`,
      url: "https://example.invalid?key=" + encodeURIComponent(secret),
      message: "Bearer xyz sk-ant-1234 AIza1234",
      output_tokens: 50,
    }],
    [secret]: secret,
  };
  const output = safeJSON(raw, [secret]);
  ok(!output.includes(secret));
  ok(!output.includes(encodeURIComponent(secret)));
  ok(!output.includes("Bearer abc"));
  ok(!output.includes("sk-ant-1234"));
  ok(output.includes("output_tokens"));
  eq((scrub(raw) as any).nested[0].api_key, "[REDACTED]");
});
test("provider envelope sanitized before persistence and exception text never exported", async () => {
  const r = await execute(
    "G",
    cases[3],
    1,
    "arbitrary_mock_key",
    async () =>
      new Response(
        JSON.stringify({
          ...envelope("G", JSON.stringify(scene())),
          Authorization: "arbitrary_mock_key",
          nested: { echo: "arbitrary_mock_key" },
        }),
      ),
  );
  ok(!safeJSON(r.attempts[0].envelope).includes("arbitrary_mock_key"));
});
test("JSON/CSV export scrub originals and metadata, quotes/newlines and formula injection", async () => {
  const r = await execute(
    "O",
    cases[3],
    1,
    "",
    async () => response("O", scene()),
  );
  r.attempts[0].original = '=DANGER\n"mock_secret"';
  ok(!exportJSON([r], ["mock_secret"]).includes("mock_secret"));
  const out = exportCSV([r], ["mock_secret"]);
  ok(!out.includes("mock_secret"));
  ok(out.includes("'=DANGER"));
  ok(out.includes('""'));
  ok(csv([{ a: "@cmd" }]).includes("'@cmd"));
});
test("cost G candidates + thoughts, O/A output already includes reasoning; cache unknown pending", () => {
  const g = parseEnvelope("G", envelope("G", "{}")).usage;
  eq(cost("G", g), (100 * .75 + 40 * 3.75) / 1e6);
  const o = parseEnvelope("O", envelope("O", "{}")).usage;
  eq(cost("O", o), (100 * 4 + 40 * 20) / 1e6);
  const a = parseEnvelope("A", envelope("A", "{}")).usage;
  eq(cost("A", a), (100 * 2 + 40 * 10) / 1e6);
  eq(cost("G", { ...g, cacheRead: 10 }), null);
  eq(cost("A", { ...a, cacheWrite: 10 }), null);
  eq(cost("O", unknownUsage()), null);
});
test("K includes all attempts, pending reviews and unknown bills are not zero", async () => {
  const r = await execute(
    "O",
    cases[3],
    1,
    "",
    async () => response("O", scene()),
  );
  eq(costPerAcceptable([r]).K, null);
  r.acceptance = true;
  eq(costPerAcceptable([r]).K, cost("O", r.attempts[0].usage));
  r.attempts.push({ ...r.attempts[0] });
  eq(costPerAcceptable([r]).K, 2 * cost("O", r.attempts[0].usage)!);
  r.attempts[1].usage = unknownUsage();
  eq(costPerAcceptable([r]).unknownBillableAttempts, 1);
  eq(costPerAcceptable([r]).K, null);
});
test("budget uses rendered 12 prompts and 36/model, 108 base calls separate max retry", () => {
  const b = budget();
  eq(b.prompts.length, 12);
  eq(b.baseCalls, 108);
  eq(b.maximumAdditionalTechnicalRetries, 108);
  for (const p of b.perProvider) {
    eq(p.calls, 36);
    eq(p.outputReserved, 72000);
    eq(p.totalWithContingencyUSDHigh, 2 * p.baseUSDHigh);
  }
  ok(b.baseTotalUSDHigh > b.baseTotalUSDLow);
  eq(b.prompts[0].chars, renderRequest(cases[0]).length);
});
test("canonical hashes stable across key order, changed corpus/prompt/config version affects provenance", async () => {
  eq(await sha({ a: 1, b: 2 }), await sha({ b: 2, a: 1 }));
  ok(await sha({ version: 1 }) !== await sha({ version: 2 }));
  const p = await provenance("explicit-test-commit");
  eq(p.commit, "explicit-test-commit");
  ok(
    p.corpusHash.length === 64 && p.promptsHash.length === 64 &&
      p.schemaHash.length === 64 && p.configHash.length === 64,
  );
});
test("seeded deterministic interleaved ordering 108 unique tasks, seed distinct from model seed", () => {
  const s = schedule();
  eq(s.length, 108);
  eq(s, schedule());
  ok(canonical(s) !== canonical(schedule(["G", "O", "A"], 3, cases, 123)));
  for (let i = 0; i < s.length; i += 3) {
    eq(new Set(s.slice(i, i + 3).map((x) => x.provider)).size, 3);
    eq(new Set(s.slice(i, i + 3).map((x) => x.c.id)).size, 1);
  }
});
test("offline runner one active mock request, no chained generated outputs", async () => {
  let active = 0, max = 0, n = 0;
  const results = await runOfflineOrInjected(
    async (_u, init) => {
      active++;
      max = Math.max(max, active);
      n++;
      const b = JSON.parse(String(init.body));
      ok(b.contents[0].parts[0].text === renderRequest(cases[3]));
      await new Promise((r) => setTimeout(r, 1));
      active--;
      return response("G", scene());
    },
    {},
    ["G"],
    3,
    [cases[3]],
    "test",
  );
  eq(max, 1);
  eq(n, 3);
  eq(results.length, 3);
});
test("no human reviews means pending, two independent complete reviews needed; disagreement adjudicated", () => {
  const c = cases[3], r = reviewTemplate("B-id", "run", c);
  eq(acceptance(c, scene()), "pending_review");
  ok(!validateReview(r, c));
  const scores = Object.fromEntries(c.manualDimensions.map((d) => [d, 3]));
  const one: Review = {
    ...r,
    reviewerId: "R1",
    scores,
    notes: "offline synthetic TEST ONLY",
  };
  const two = { ...one, reviewerId: "R2" };
  eq(acceptance(c, scene(), [one]), "pending_review");
  eq(acceptance(c, scene(), [one, two]), true);
  const low = { ...two, scores: { ...scores, fidelity: 2 } };
  eq(acceptance(c, scene(), [one, low]), "pending_review");
  eq(
    acceptance(c, scene(), [one, low, {
      ...one,
      reviewerId: "ADJ",
      adjudication: true,
    }]),
    true,
  );
  eq(
    acceptance(c, scene(), [one, {
      ...two,
      criticalFlags: ["identity contradiction"],
    }]),
    false,
  );
});
test("N/A excluded, no reviews not zero, critical flags outside weighted total", () => {
  eq(manualPercent([], ["fidelity"]), null);
  eq(
    manualPercent([{
      ...reviewTemplate("B", "run", cases[3]),
      scores: { fidelity: 4, history: null },
    }], ["fidelity", "history"]),
    100,
  );
  const w = weightedTotal({ C1: 5, C2: 5, C3: 5, C4: 5, C5: 5 }, ["danger"]);
  eq(w.total, 100);
  eq(w.decisionEligible, false);
  eq(weightedTotal({ C1: 5, C2: null, C3: 5, C4: 5, C5: 5 }, []).total, null);
});
test("blind packets exclude provider/model/envelopes and review template records only blanks", async () => {
  const r = await execute(
    "A",
    cases[3],
    1,
    "",
    async () => response("A", scene()),
  );
  const b = await blindPackets([r], cases, "run", 9);
  ok(!safeJSON(b.packets).includes(models.A.id));
  ok(!("provider" in b.packets[0]));
  ok(!("envelope" in b.packets[0]));
  eq(b.privateMapping[0].provider, "A");
  ok(
    Object.values(reviewTemplate("B", "run", cases[3]).scores).every((x) =>
      x === null
    ),
  );
});
test("no-content technical failure C2/C3 not evaluable and denominators explicit", async () => {
  const r = await execute("G", cases[3], 1, "", async () => {
    throw new Error();
  });
  const s = summarize([r], cases);
  eq(s.contentNotEvaluable, 1);
  eq(s.C2, null);
  eq(s.C3, null);
  eq(s.C2C3Denominator, 0);
  eq(s.technicalFailures, 1);
});
test("approved C1/C2/C3/C4/C5 absolute frozen boundaries", () => {
  for (const c of ["C1", "C2", "C3"] as const) {
    eq([95, 90, 80, 60, 59].map((x) => percentCut(x, c)), [5, 4, 3, 2, 1]);
  }
  eq([5000, 10000, 20000, 40000, 40001].map(latencyCut), [5, 4, 3, 2, 1]);
  eq([.01, .02, .04, .08, .09].map(costCut), [5, 4, 3, 2, 1]);
  eq(median([10, 20, 30, 40]), 25);
});
test("production repairs diagnosed separately never improve original structural score", () => {
  const c = cases[4],
    raw = { contenido: "Lila mira", opciones: ["a", "a"], esFinal: true };
  const norm = normalizeProduction(c, raw);
  ok(!validate(c, raw).structural);
  eq((norm.processed as any).opciones.length, 3);
  eq((norm.processed as any).esFinal, false);
  ok((norm.processed as any).contenido.includes("Mara"));
  ok(norm.changes.length >= 3);
  ok(
    normalizeProduction(cases[9], raw).unavailable.some((x) =>
      x.includes("rewrite")
    ),
  );
});
test("live gate blocks before any credential read and explicit network flag alone insufficient", async () => {
  await rejects(() => assertLiveApproved(false));
  await rejects(() => assertLiveApproved(true));
  await rejects(() =>
    main([
      "connect",
      "--provider=G",
      "--allow-network",
      "--credentials=NONEXISTENT",
    ])
  );
  await rejects(() => main(["run", "--provider=all", "--allow-network"]));
});
test("malformed provider envelope classified invalid structure with no technical retry", async () => {
  let n = 0;
  const r = await execute("O", cases[3], 1, "", async () => {
    n++;
    return new Response(JSON.stringify({ output: {} }));
  });
  eq(n, 1);
  eq(r.attempts[0].failure, "invalid_structure");
});
test("completed independent review aggregation yields C2/C3, K and provisional weighted score", async () => {
  const c = cases[3],
    r = await execute("G", c, 1, "", async () => response("G", scene()));
  const scores = Object.fromEntries(c.manualDimensions.map((d) => [d, 4]));
  const template = reviewTemplate("B1", "run1", c);
  const reviews = [{
    ...template,
    reviewerId: "human-test-1",
    scores,
    notes: "synthetic unit test only",
  }, {
    ...template,
    reviewerId: "human-test-2",
    scores,
    notes: "synthetic unit test only",
  }];
  const s = summarize([r], cases, { [resultKey(r)]: reviews });
  eq(s.C2, 5);
  eq(s.C3, 5);
  eq(s.manualCoverage, 1);
  ok(s.billing.K !== null);
  ok(s.weightedTotal.total !== null);
  eq(
    acceptance(c, scene(), [{ ...reviews[0], runId: "OTHER" }, reviews[1]]),
    "pending_review",
  );
});
test("OpenAI reported cache writes preserved and unverified write tariff remains pending", () => {
  const e = envelope("O", "{}") as any;
  e.usage.input_tokens_details = {
    cache_creation_tokens: 20,
    cached_tokens: 10,
  };
  const u = parseEnvelope("O", e).usage;
  eq(u.cacheWrite, 20);
  eq(u.cacheRead, 10);
  eq(cost("O", u), null);
});
test("cycle1 A01/A02/A03 common explicit JSON directive identical G/O/A, seven required and optional title", () => {
  eq(approval.commonFormatDirective, "approved");
  eq(FORMAT_DIRECTIVE_VERSION, "common-json-format-1");
  for (const c of cases.slice(0, 3)) {
    const sent = (["G", "O", "A"] as Provider[]).map((p) => {
      const b = JSON.parse(request(p, c, render(c), "mock").init.body);
      return p === "G"
        ? b.contents[0].parts[0].text
        : p === "O"
        ? b.input[0].content[0].text
        : b.messages[0].content[0].text;
    });
    eq(sent[0], sent[1]);
    eq(sent[1], sent[2]);
    eq(sent[0], render(c) + formatDirective(c));
    ok(sent[0].includes("Devuelve únicamente un objeto JSON válido"));
    ok(
      formatDirective(c).includes(
        `Los siete campos requeridos son: ${analysisRequired.join(", ")}.`,
      ),
    );
    ok(formatDirective(c).includes("tituloOriginal es opcional"));
    ok(!render(c).includes("FORMATO DE RESPUESTA COMÚN"));
  }
});
function completeReviews(c: Case): Review[] {
  const t = reviewTemplate("B-cycle1", "run-cycle1", c),
    scores = Object.fromEntries(c.manualDimensions.map((d) => [d, 4]));
  return ["R1", "R2"].map((reviewerId) => ({
    ...t,
    reviewerId,
    scores: { ...scores },
    notes: "synthetic regression ONLY",
  }));
}
test("cycle1 acceptance cannot adjudicate over incomplete independent scores", () => {
  const c = cases[3],
    complete = completeReviews(c),
    adjudicator = { ...complete[0], reviewerId: "ADJ", adjudication: true };
  for (const invalid of [null, undefined, NaN, -1, 5, 1.5, "4"]) {
    const incomplete = {
      ...complete[1],
      scores: { ...complete[1].scores, fidelity: invalid },
    } as Review;
    eq(
      acceptance(c, scene(), [complete[0], incomplete, adjudicator]),
      "pending_review",
    );
    eq(resolvedReviews([complete[0], incomplete, adjudicator], c), null);
  }
});
test("cycle1 summarize incomplete independent review plus complete adjudication stays pending", async () => {
  const c = cases[3],
    r = await execute("G", c, 1, "", async () => response("G", scene()));
  const rs = completeReviews(c);
  rs[1].scores.fidelity = null;
  const summary = summarize([r], cases, {
    [resultKey(r)]: [...rs, {
      ...completeReviews(c)[0],
      reviewerId: "ADJ",
      adjudication: true,
    }],
  });
  eq(summary.C2, null);
  eq(summary.C3, null);
  eq(summary.manualStatus, "pending_review");
  eq(summary.manualReviewedDenominator, 0);
  eq(summary.billing.K, null);
  eq(summary.billing.pendingReview, true);
});
test("cycle1 model JSON null is invalid_structure for all providers, exact original and no retry/repair", async () => {
  for (const p of ["G", "O", "A"] as Provider[]) {
    let calls = 0;
    const raw = " \nnull\n ";
    const r = await execute(p, cases[0], 1, "", async () => {
      calls++;
      return response(p, raw);
    });
    eq(calls, 1);
    eq(r.attempts[0].original, raw);
    eq(r.attempts[0].parsed, null);
    eq(r.attempts[0].processed, null);
    eq(r.attempts[0].processingChanges, []);
    eq(r.attempts[0].failure, "invalid_structure");
    eq(r.acceptance, false);
  }
});
test("cycle1 OpenAI in_progress/queued valid JSON is unfinished, not acceptable, no retry", async () => {
  for (const status of ["in_progress", "queued"]) {
    const raw = " \n" + JSON.stringify(scene()) + "\n ",
      e = { ...envelope("O", raw), status };
    let calls = 0;
    const r = await execute("O", cases[3], 1, "", async () => {
      calls++;
      return new Response(JSON.stringify(e));
    });
    eq(calls, 1);
    eq(r.attempts[0].failure, "truncation");
    eq(r.attempts[0].original, raw);
    eq(r.attempts[0].parsed, scene());
    eq(r.attempts[0].processingChanges, []);
    eq(r.acceptance, false);
    eq(summarize([r], cases).structuralPass, 0);
  }
});
test("cycle1 A03 missing finalOriginal is structure failure, not evidence of invented ending", async () => {
  const a = analysis();
  delete a.finalOriginal;
  const raw = JSON.stringify(a);
  const v = validate(cases[2], a);
  eq(v.failure, "invalid_structure");
  eq(v.criticalFlags, []);
  let calls = 0;
  const r = await execute("A", cases[2], 1, "", async () => {
    calls++;
    return response("A", raw);
  });
  eq(calls, 1);
  eq(r.acceptance, false);
  eq(r.attempts[0].failure, "invalid_structure");
  eq(r.attempts[0].original, raw);
  ok(!("finalOriginal" in (r.attempts[0].parsed as object)));
  eq(summarize([r], cases).criticalFlagsOutsideTotal, []);
});
test("cycle1 present invalid optional usage is unknown, never zero or known billing", () => {
  for (const bad of [-1, NaN, Infinity, "0", null, undefined]) {
    for (
      const [p, key] of [
        ["G", "thoughtsTokenCount"],
        ["G", "cachedContentTokenCount"],
        ["O", "reasoning_tokens"],
        ["O", "cached_tokens"],
        ["O", "cache_write_tokens"],
        ["A", "cache_read_input_tokens"],
        ["A", "cache_creation_input_tokens"],
      ] as [Provider, string][]
    ) {
      const e = envelope(p, "{}") as any;
      if (p === "G") e.usageMetadata[key] = bad;
      else if (p === "O") {
        const parent = key === "reasoning_tokens"
          ? "output_tokens_details"
          : "input_tokens_details";
        e.usage[parent] = { ...(e.usage[parent] ?? {}), [key]: bad };
        if (key === "cache_write_tokens") {
          e.usage[parent].cache_creation_tokens = 0;
        }
      } else e.usage[key] = bad;
      const u = parseEnvelope(p, e).usage;
      eq(u.billingValid, false);
      eq(cost(p, u), null);
    }
  }
});
test("cycle1 omitted optional usage defaults zero only with valid envelope, no double counting", () => {
  for (const p of ["G", "O", "A"] as Provider[]) {
    const e = envelope(p, "{}") as any;
    if (p === "G") delete e.usageMetadata.thoughtsTokenCount;
    if (p === "O") delete e.usage.output_tokens_details;
    const u = parseEnvelope(p, e).usage;
    eq(u.billingValid, true);
    eq(u.cacheRead, 0);
    eq(u.cacheWrite, 0);
    eq(u.reasoning, p === "A" ? null : 0);
    ok(cost(p, u)! > 0);
  }
  const e = envelope("O", "{}") as any;
  e.usage.input_tokens_details = null;
  eq(cost("O", parseEnvelope("O", e).usage), null);
});
test("cycle1 incoherent total/cache/reasoning subsets leave billing pending", () => {
  const variants: [Provider, any][] = [];
  const g = envelope("G", "{}") as any;
  g.usageMetadata.totalTokenCount = 130;
  variants.push(["G", g]);
  const gc = envelope("G", "{}") as any;
  gc.usageMetadata.cachedContentTokenCount = 101;
  variants.push(["G", gc]);
  const o = envelope("O", "{}") as any;
  o.usage.output_tokens_details.reasoning_tokens = 41;
  variants.push(["O", o]);
  const oc = envelope("O", "{}") as any;
  oc.usage.input_tokens_details = { cached_tokens: 80, cache_write_tokens: 30 };
  variants.push(["O", oc]);
  const ot = envelope("O", "{}") as any;
  ot.usage.total_tokens = 150;
  variants.push(["O", ot]);
  for (const [p, e] of variants) {
    const u = parseEnvelope(p, e).usage;
    eq(u.billingValid, false);
    eq(cost(p, u), null);
  }
  const coherent = envelope("G", "{}") as any;
  coherent.usageMetadata.totalTokenCount = 140;
  eq(
    cost("G", parseEnvelope("G", coherent).usage),
    (100 * .75 + 40 * 3.75) / 1e6,
  );
  const coherentO = envelope("O", "{}") as any;
  coherentO.usage.total_tokens = 140;
  eq(cost("O", parseEnvelope("O", coherentO).usage), (100 * 4 + 40 * 20) / 1e6);
});
test("cycle1 invalid usage counters keep K pending_billing after acceptance review", async () => {
  const e = envelope("O", JSON.stringify(scene())) as any;
  e.usage.input_tokens_details = { cached_tokens: "invalid" };
  const r = await execute(
    "O",
    cases[3],
    1,
    "",
    async () => new Response(JSON.stringify(e)),
  );
  const s = summarize([r], cases, {
    [resultKey(r)]: completeReviews(cases[3]),
  });
  eq(s.billing.accepted, 1);
  eq(s.billing.K, null);
  eq(s.billing.status, "pending_billing");
  eq(s.billing.unknownBillableAttempts, 1);
});
test("cycle1 response timing starts after prompt/request preparation before transport", async () => {
  const descriptor = Object.getOwnPropertyDescriptor(performance, "now");
  let clock = 0;
  Object.defineProperty(performance, "now", {
    configurable: true,
    value: () => clock,
  });
  try {
    const c = {
      ...cases[0],
      input: {
        get texto() {
          clock += 1000;
          return "cuento";
        },
      },
    };
    const r = await execute("O", c, 1, "", async () => {
      clock += 10;
      return response("O", analysis());
    });
    eq(r.attempts[0].response_elapsed_ms, 10);
    eq(r.cumulative_ms, 1010);
  } finally {
    if (descriptor) Object.defineProperty(performance, "now", descriptor);
    else delete (performance as any).now;
  }
});
test("cycle1 provenance reflects actual subset/providers/repetitions and schedule hashes", async () => {
  const corpus = [cases[3]],
    results = await runOfflineOrInjected(
      async () => response("G", scene()),
      {},
      ["G"],
      2,
      corpus,
      "cycle1",
    );
  const p = results[0].provenance;
  eq(p.corpusHash, await sha(corpus));
  eq(
    p.promptsHash,
    await sha(corpus.map((c) => ({ id: c.id, prompt: renderRequest(c) }))),
  );
  eq(p.providers, ["G"]);
  eq(p.repetitions, 2);
  eq(p.callsPlanned, 2);
  eq(
    p.scheduleHash,
    await sha(
      schedule(["G"], 2, corpus).map((x) => ({
        provider: x.provider,
        caseId: x.c.id,
        repetition: x.repetition,
      })),
    ),
  );
  eq(p.formatDirectiveVersion, FORMAT_DIRECTIVE_VERSION);
  const other = await provenance("cycle1", {
    corpus,
    providers: ["G", "O"],
    repetitions: 1,
    orderingSeed: settings.orderingSeed,
  });
  ok(p.runConfigHash !== other.runConfigHash);
  ok(p.scheduleHash !== other.scheduleHash);
  const altered = await provenance("cycle1", {
    corpus: [{ ...cases[3], input: { ...cases[3].input, titulo: "Otro" } }],
    providers: ["G"],
    repetitions: 2,
    orderingSeed: settings.orderingSeed,
  });
  ok(p.corpusHash !== altered.corpusHash);
  ok(p.promptsHash !== altered.promptsHash);
});
test("cycle1 summary distinguishes all attempts, recovered technical runs and final rejections/truncations", async () => {
  let calls = 0;
  const recovered = await execute(
    "O",
    cases[3],
    1,
    "",
    async () =>
      ++calls === 1
        ? new Response("{}", { status: 429 })
        : response("O", scene()),
    { sleep: async () => {} },
  );
  const timeout = await execute(
    "O",
    cases[3],
    2,
    "",
    async () => new Promise<Response>(() => {}),
    { timeoutMs: 1, sleep: async () => {} },
  );
  const rejection = await execute(
    "O",
    cases[3],
    3,
    "",
    async () =>
      new Response(
        JSON.stringify({ output: [{ content: [{ type: "refusal" }] }] }),
      ),
  );
  const truncation = await execute(
    "O",
    cases[3],
    4,
    "",
    async () =>
      new Response(
        JSON.stringify({
          ...envelope("O", JSON.stringify(scene())),
          status: "in_progress",
        }),
      ),
  );
  const s = summarize([recovered, timeout, rejection, truncation], cases);
  eq(s.attemptDenominator, 6);
  eq(s.finalRunDenominator, 4);
  eq(s.technicalFailureAttempts, 3);
  eq(s.technicalFailures, 1);
  eq(s.recoveredTechnicalRuns, 1);
  eq(s.providerRejections, 1);
  eq(s.truncations, 1);
  eq(s.attemptFailureCounts.rate_limit, 1);
  eq(s.finalRunFailureCounts.rate_limit, 0);
  eq(s.attemptFailureCounts.timeout, 2);
  eq(s.finalRunFailureCounts.timeout, 1);
  eq(s.technicalAttemptFailureCoverage, .5);
  eq(s.technicalFailureCoverage, .25);
});
test("cycle1 empty/whitespace originals centrally not_evaluable in summaries and blind packets", async () => {
  for (const raw of ["", " \n\t "]) {
    const r = await execute(
      "O",
      cases[3],
      1,
      "",
      async () => response("O", raw),
    );
    eq(r.attempts[0].original, raw);
    eq(hasEvaluableContent(raw), false);
    const s = summarize([r], cases);
    eq(s.contentEvaluable, 0);
    eq(s.C2C3Denominator, 0);
    eq(s.contentNotEvaluable, 1);
    eq(s.C2, null);
    eq(s.C3, null);
    const b = await blindPackets([r], cases, "cycle1", 1);
    eq(b.packets[0].evaluability, "not_evaluable");
    eq(b.packets[0].content, raw);
  }
  eq(hasEvaluableContent(null), false);
  eq(hasEvaluableContent("texto"), true);
});
test("freeze active selection documentary user Gemini and definitive Sonnet5.5 with separate access", () => {
  eq(models.G.id, "gemini-3.8-flash");
  eq(models.G.state, "GA");
  eq(models.G.channel, "Google Developer API");
  eq(models.G.verification, "confirmed_documentary_user");
  eq(models.O.id, "gpt-5.6-sol");
  eq(models.A.id, "claude-sonnet-5-5");
  ok(models.A.parametersVerification.includes("NOT confirmed"));
  ok(
    Object.values(effectiveVerification).every((v) =>
      v.access === "pending" && v.parametersAndSchema === "pending" &&
      v.connectivityEvidence === null
    ),
  );
  eq(approval.finalLive, "pending");
  eq(approval.connectivityAuthorization, "pending");
});
test("freeze C1/C2/C3 floating classification never rounds across any boundary", () => {
  for (const c of ["C1", "C2", "C3"] as const) {
    for (const [threshold, score] of [[95, 5], [90, 4], [80, 3], [60, 2]]) {
      eq(percentCut(threshold, c), score);
      eq(percentCut(threshold - .000001, c), score - 1);
      eq(percentCut(threshold + .000001, c), score);
    }
  }
});
test("freeze C4/C5 exact upper boundaries and immediately greater values", () => {
  for (
    const [bound, score] of [[5000, 5], [10000, 4], [20000, 3], [40000, 2]]
  ) {
    eq(latencyCut(bound), score);
    eq(latencyCut(bound + .000001), score - 1);
  }
  for (const [bound, score] of [[.01, 5], [.02, 4], [.04, 3], [.08, 2]]) {
    eq(costCut(bound), score);
    eq(costCut(bound + 1e-10), score - 1);
  }
});
test("freeze raw response mean median min max population dispersion retained", () => {
  const s = responseStatistics([10, 20, 30, 40]);
  eq(s.rawMs, [10, 20, 30, 40]);
  eq(s.meanMs, 25);
  eq(s.medianMs, 25);
  eq(s.minMs, 10);
  eq(s.maxMs, 40);
  eq(s.varianceMs2, 125);
  eq(s.populationStdDevMs, Math.sqrt(125));
  eq(responseStatistics([]).meanMs, null);
});
test("freeze immutable manifest matches canonical definition and pinned digest", async () => {
  await assertFrozenDefinition();
  eq(await sha(await buildFrozenPayload()), PINNED_PROTOCOL_DIGEST);
  eq(frozenManifest.digest, PINNED_PROTOCOL_DIGEST);
});
for (
  const component of [
    "corpus",
    "snapshots",
    "renderedPrompts",
    "commonDirectives",
    "selection",
    "parameters",
    "tariffs",
    "scoring",
    "retryPolicy",
    "schemas",
    "requests",
  ]
) {
  test(`freeze tamper ${component} aborts and requires different protocol version`, async () => {
    const changed = structuredClone(definitionInputs()) as any;
    changed[component] = { altered: changed[component] };
    let message = "";
    try {
      await assertDefinitionMatches(
        frozenManifest.payload,
        frozenManifest.digest,
        changed,
      );
    } catch (e) {
      message = (e as Error).message;
    }
    ok(message.includes("FROZEN_PROTOCOL_MISMATCH"));
    ok(message.includes("new protocol_version"));
  });
}
test("freeze mutable authorization/effective evidence does not change frozen payload", async () => {
  const before = await sha(await buildFrozenPayload());
  const old = structuredClone(effectiveVerification.G);
  try {
    effectiveVerification.G.access = "verified";
    effectiveVerification.G.connectivityEvidence = "synthetic TEST ONLY";
    eq(await sha(await buildFrozenPayload()), before);
  } finally {
    Object.assign(effectiveVerification.G, old);
  }
});
test("freeze guard rejects scheduled altered case before mock fetch", async () => {
  let calls = 0;
  const altered = {
    ...cases[3],
    input: { ...cases[3].input, titulo: "tampered" },
  };
  await rejects(() =>
    runOfflineOrInjected(
      async () => {
        calls++;
        return response("G", scene());
      },
      {},
      ["G"],
      1,
      [altered],
    )
  );
  eq(calls, 0);
});
test("freeze each scheduled call rechecks changed global definition and stops next fetch", async () => {
  let calls = 0;
  const old = models.G.id;
  try {
    await rejects(() =>
      runOfflineOrInjected(
        async () => {
          calls++;
          models.G.id = "tampered";
          return response("G", scene());
        },
        {},
        ["G"],
        2,
        [cases[3]],
      )
    );
    eq(calls, 1);
  } finally {
    models.G.id = old;
  }
});
test("freeze probe gate selected provider without circular all-provider access prerequisite", async () => {
  const previous = approval.connectivityAuthorization;
  const g = structuredClone(effectiveVerification.G);
  try {
    approval.connectivityAuthorization = "approved";
    effectiveVerification.G.documentaryProfileApproval = "approved";
    eq(effectiveVerification.G.parametersAndSchema, "pending");
    eq(effectiveVerification.G.access, "pending");
    assertLiveApproved(true, "connect", ["G"]);
    await rejects(() => assertLiveApproved(true, "connect", ["O"]));
    await rejects(() => assertLiveApproved(true, "run", ["G"]));
  } finally {
    approval.connectivityAuthorization = previous;
    Object.assign(effectiveVerification.G, g);
  }
});
test("freeze unknown billing/manual pending remain null with updated Sonnet rates", async () => {
  const r = await execute(
    "A",
    cases[3],
    1,
    "",
    async () => response("A", scene()),
  );
  eq(cost("A", r.attempts[0].usage), (100 * 2 + 40 * 10) / 1e6);
  eq(costPerAcceptable([r]).K, null);
  r.acceptance = true;
  r.attempts[0].usage = unknownUsage();
  eq(costPerAcceptable([r]).status, "pending_billing");
  eq(costPerAcceptable([r]).K, null);
});
test("freeze mismatch before technical retry aborts without second transport", async () => {
  let calls = 0;
  const old = settings.maxOutputTokens;
  try {
    await rejects(() =>
      runOfflineOrInjected(
        async () => {
          calls++;
          settings.maxOutputTokens = old + 1;
          return new Response("{}", {
            status: 429,
            headers: { "retry-after": "0" },
          });
        },
        {},
        ["G"],
        1,
        [cases[3]],
      )
    );
    eq(calls, 1);
  } finally {
    settings.maxOutputTokens = old;
  }
});
test("freeze edited durable payload or forged digest rejected independently", async () => {
  const changed = structuredClone(frozenManifest.payload);
  changed.parameters.timeoutMs = 85001;
  await rejects(() => assertDefinitionMatches(changed, frozenManifest.digest));
  const forged = await sha(changed);
  await rejects(() => assertDefinitionMatches(changed, forged));
});
test("freeze records actual HTTP method/public API headers without credential headers", () => {
  for (const r of definitionInputs().requests) {
    const c = cases.find((x) => x.id === r.caseId)!;
    const prepared = request(r.provider, c, render(c), "SYNTHETIC_TEST_ONLY");
    const headers = new Headers(prepared.init.headers);
    eq(r.method, prepared.init.method);
    eq(r.publicHeaders["content-type"], headers.get("content-type"));
    if (r.provider === "A") {
      eq(
        r.publicHeaders["anthropic-version"],
        headers.get("anthropic-version"),
      );
    }
    ok(
      !Object.keys(r.publicHeaders).some((k) =>
        /authorization|api[-_]?key|token|secret|cookie/i.test(k)
      ),
    );
  }
});
