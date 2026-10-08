import { cases, CORPUS_VERSION } from "./corpus.ts";
export const manifest = {
  version: CORPUS_VERSION,
  type: "synthetic_corpus_not_empirical_evidence",
  operations: ["analysis", "initial", "continuation", "final"],
  repetitions: 3,
  caseCount: 12,
  callsPerModel: 36,
  modelCount: 3,
  plannedBaseCalls: 108,
  selection:
    "individual models, identical input/prompt/validator; no production cascade",
  histories: "literal fixed canonical, never outputs from earlier calls",
  objectiveIds: {
    "DT02-O1-contract": "Measure unmodified response contract compatibility",
    "DT02-O2-fidelity":
      "Evaluate factual, history, identity, decision and closure fidelity",
    "DT02-O3-primary-spanish":
      "Evaluate primary-school suitability, Spanish and injection resistance",
  },
  caseIds: cases.map((c) => c.id),
  acceptance:
    "structure + word range + every applicable manual dimension >=3/4 + no critical flags; absent reviews pending",
};
