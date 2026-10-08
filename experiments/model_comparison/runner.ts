import { cases } from "./cases/corpus.ts";
import { assertLiveApproved, settings } from "./config/models.ts";
import { budget } from "./cost.ts";
import { provenance, schedule } from "./provenance.ts";
export { schedule } from "./provenance.ts";
import { execute } from "./http.ts";
import { exportJSON } from "./export.ts";
import { safeJSON } from "./security.ts";
import type { Case, FetchLike, Provider } from "./types.ts";
import { assertFrozenCase, assertFrozenDefinition } from "./freeze.ts";
export async function runOfflineOrInjected(
  fetcher: FetchLike,
  keys: Partial<Record<Provider, string>>,
  providers: Provider[] = ["G", "O", "A"],
  repetitions = 3,
  corpus: Case[] = cases,
  commit?: string,
) {
  await assertFrozenDefinition();
  const metadata = await provenance(commit, {
      corpus,
      providers,
      repetitions,
      orderingSeed: settings.orderingSeed,
    }),
    results = [];
  for (const item of schedule(providers, repetitions, corpus)) {
    await assertFrozenCase(item.provider, item.c);
    results.push(
      await execute(
        item.provider,
        item.c,
        item.repetition,
        keys[item.provider] ?? "",
        fetcher,
        {
          provenance: metadata,
          beforeAttempt: () => assertFrozenCase(item.provider, item.c),
        },
      ),
    );
  }
  return results; // single active request, no model cascade, no chained history.
}
export async function main(args: string[]) {
  const command = args[0] ?? "dry-run";
  if (command === "budget") {
    await assertFrozenDefinition();
    console.log(JSON.stringify(budget(), null, 2));
    return;
  }
  if (command === "dry-run") {
    console.log(JSON.stringify(
      {
        artifactType: "schedule_only_NOT_RESULTS",
        callsPlanned: 108,
        maxAttemptsWithRetry: 216,
        provenance: await provenance(),
        schedule: schedule().map((x) => ({
          provider: x.provider,
          caseId: x.c.id,
          repetition: x.repetition,
        })),
        live: "BLOCKED",
      },
      null,
      2,
    ));
    return;
  }
  if (!["connect", "run"].includes(command)) throw new Error("Unknown command");
  // Gate before transport selection or any credential access. Environment is never read.
  const providerArg =
    args.find((x) => x.startsWith("--provider="))?.split("=")[1] ?? "all";
  if (!["all", "G", "O", "A"].includes(providerArg)) {
    throw new Error("Invalid provider");
  }
  if (command === "connect" && providerArg === "all") {
    throw new Error(
      "connect requires one provider; consumes one paid inference",
    );
  }
  const providers: Provider[] = providerArg === "all"
    ? ["G", "O", "A"]
    : [providerArg as Provider];
  await assertFrozenDefinition();
  assertLiveApproved(
    args.includes("--allow-network"),
    command as "connect" | "run",
    providers,
  );
  const credentialPath = args.find((x) => x.startsWith("--credentials="))
    ?.slice("--credentials=".length);
  const commit = args.find((x) => x.startsWith("--commit="))?.slice(
    "--commit=".length,
  );
  if (!credentialPath || !commit) {
    throw new Error(
      "Explicit private credential file and commit/worktree provenance required",
    );
  }
  const rt = globalThis as unknown as {
    Deno?: { readTextFile(path: string): Promise<string> };
  };
  let keys: Partial<Record<Provider, string>>;
  try {
    const nodeFsModule = "node:fs/promises"; // Node-only fallback; no npm type dependency in native Deno graph.
    const fs = rt.Deno ? null : await import(nodeFsModule) as {
      readFile(path: string, encoding: string): Promise<string>;
    };
    const contents = rt.Deno
      ? await rt.Deno.readTextFile(credentialPath)
      : await fs!.readFile(credentialPath, "utf8");
    keys = JSON.parse(contents);
    if (!keys || typeof keys !== "object" || Array.isArray(keys)) {
      throw new Error();
    }
  } catch {
    throw new Error(
      "Explicit credential file unreadable or invalid; content suppressed",
    );
  }
  if (providers.some((p) => typeof keys[p] !== "string" || !keys[p])) {
    throw new Error("Missing explicitly supplied credential");
  }
  const results = await runOfflineOrInjected(
    (url, init) => globalThis.fetch(url, init),
    keys,
    providers,
    command === "connect" ? 1 : 3,
    command === "connect" ? [cases[0]] : cases,
    commit,
  );
  const secrets = Object.values(keys).filter((x): x is string =>
    typeof x === "string"
  );
  console.log(
    command === "connect"
      ? safeJSON({
        artifactType: "connectivity_probe_NOT_BENCHMARK_RESULTS",
        probe: results[0],
        accessEvidence:
          "pending operator validation of actual probe; no automatic run authorization",
      }, secrets)
      : exportJSON(results, secrets),
  );
}
const runtime = globalThis as unknown as {
  Deno?: { args: string[] };
  process?: { argv: string[] };
};
const isMain = (import.meta as ImportMeta & { main?: boolean }).main ||
  runtime.process?.argv[1]?.replaceAll("\\", "/").endsWith(
    "/model_comparison/runner.ts",
  );
if (isMain) {
  await main(runtime.Deno?.args ?? runtime.process?.argv.slice(2) ?? []);
}
// Authorized future callers must assertLiveApproved(true) before calling runOfflineOrInjected with global fetch.
// Offline callers inject mocks. Imports never open network/read env; CLI selects real fetch only after gates.
