import type { Provider } from "../types.ts";
export const CONFIG_VERSION = "dt02-config-3-frozen";
export const models: Record<
  Provider,
  {
    name: string;
    id: string;
    endpoint: string;
    channel: string;
    state: string;
    verification: string;
    documentarySource: string;
    parametersVerification: string;
  }
> = {
  G: {
    name: "Gemini 3.8 Flash",
    id: "gemini-3.8-flash",
    endpoint:
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
    channel: "Google Developer API",
    state: "GA",
    verification: "confirmed_documentary_user",
    documentarySource:
      "Current DT02 user confirmation: GA Developer API; no successful fetch or source capture asserted",
    parametersVerification: "pending_effective_parameters_and_schema",
  },
  O: {
    name: "GPT-5.6 Sol",
    id: "gpt-5.6-sol",
    endpoint: "https://api.openai.com/v1/responses",
    channel: "OpenAI Responses API",
    state: "selected",
    verification: "confirmed_documentary_public",
    documentarySource:
      "Previously retrieved official gpt-5.6-sol model document; current user selection",
    parametersVerification:
      "none documented; effective JSON-mode request contract pending",
  },
  A: {
    name: "Claude Sonnet 5.5",
    id: "claude-sonnet-5-5",
    endpoint: "https://api.anthropic.com/v1/messages",
    channel: "Anthropic Messages API",
    state: "active",
    verification: "confirmed_documentary_public_and_user",
    documentarySource:
      "Previously retrieved official models overview/pricing; current user definitive replacement before results",
    parametersVerification:
      "pending: thinking.disabled and effective Messages contract for Sonnet 5.5 NOT confirmed",
  },
};
export const settings = {
  maxOutputTokens: 2000,
  stream: false,
  timeoutMs: 85000,
  maxTechnicalRetries: 1,
  maxRetryWaitMs: 5000,
  orderingSeed: 20261007,
  modelSeed: null,
  temperature: "omitted",
  topK: "omitted",
  topP: "omitted",
  cache: "no explicit cache; automatic usage recorded",
  thinking: { G: "LOW", O: "none", A: "disabled" },
};
// Mutable execution controls are excluded from the immutable experimental definition.
export const approval = {
  protocol: "approved",
  absoluteCuts: "approved",
  weights: "approved",
  schema: "approved",
  commonFormatDirective: "approved",
  verifiedModelIds: "approved",
  verifiedTariffs: "approved",
  budget: "estimate_only_not_spending_authorization",
  finalLive: "pending",
  connectivityAuthorization: "pending",
};
export const effectiveVerification: Record<
  Provider,
  {
    documentaryProfileApproval: string;
    parametersAndSchema: string;
    access: string;
    connectivityEvidence: string | null;
  }
> = {
  G: {
    documentaryProfileApproval: "pending",
    parametersAndSchema: "pending",
    access: "pending",
    connectivityEvidence: null,
  },
  O: {
    documentaryProfileApproval: "pending",
    parametersAndSchema: "pending",
    access: "pending",
    connectivityEvidence: null,
  },
  A: {
    documentaryProfileApproval: "pending",
    parametersAndSchema: "pending",
    access: "pending",
    connectivityEvidence: null,
  },
};
export function assertLiveApproved(
  explicitNetwork: boolean,
  mode: "connect" | "run" = "run",
  providers: Provider[] = ["G", "O", "A"],
) {
  const commonApproved = [
    approval.protocol,
    approval.absoluteCuts,
    approval.weights,
    approval.schema,
    approval.commonFormatDirective,
    approval.verifiedModelIds,
    approval.verifiedTariffs,
  ].every((x) => x === "approved");
  const profilesApproved = providers.every((p) =>
    effectiveVerification[p].documentaryProfileApproval === "approved"
  );
  const authorization = mode === "connect"
    ? approval.connectivityAuthorization
    : approval.finalLive;
  const accessVerified = mode === "connect" ||
    providers.every((p) =>
      effectiveVerification[p].parametersAndSchema === "verified" &&
      effectiveVerification[p].access === "verified" &&
      !!effectiveVerification[p].connectivityEvidence
    );
  if (
    !explicitNetwork || !commonApproved || !profilesApproved ||
    authorization !== "approved" || !accessVerified
  ) {
    throw new Error(
      "LIVE_BLOCKED: selected-provider documentary profile approval and separate connectivity/run authorization required; run also requires effective contract/access evidence",
    );
  }
}
