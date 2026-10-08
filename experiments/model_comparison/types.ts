export type Provider = "G" | "O" | "A";
export type Operation = "analysis" | "initial" | "continuation" | "final";
export type Failure =
  | "technical_failure"
  | "timeout"
  | "rate_limit"
  | "invalid_structure"
  | "narrative_failure"
  | "restriction_failure"
  | "provider_rejection"
  | "truncation";
export type Body = Record<string, string | number | boolean>;
export interface Case {
  id: string;
  category: string;
  operation: Operation;
  input: Body;
  expectedFacts: string[];
  forbiddenContradictions: string[];
  automaticRules: string[];
  manualDimensions: string[];
  criticalRules: string[];
  objectiveIds: string[];
  promptVersion: string;
  schemaVersion: string;
}
export interface Usage {
  input: number | null;
  output: number | null;
  reasoning: number | null;
  cacheRead: number | null;
  cacheWrite: number | null;
  reasoningIncludedOutput: boolean;
  inputIncludesCache: boolean;
  billingValid?: boolean;
}
export interface Attempt {
  original: string | null;
  envelope: unknown;
  parsed: unknown;
  usage: Usage;
  failure: Failure | null;
  status: number | null;
  response_elapsed_ms: number;
  validation_ms: number;
  retry_wait_ms: number;
  processingChanges: string[];
  processed: unknown;
}
export interface ProviderResult {
  provider: Provider;
  model: string;
  caseId: string;
  repetition: number;
  attempts: Attempt[];
  cumulative_ms: number;
  acceptance: boolean | "pending_review";
  provenance: Record<string, unknown>;
}
export type FetchLike = (url: string, init: RequestInit) => Promise<Response>;
export interface Review {
  blindId: string;
  reviewerId: string;
  runId: string;
  scores: Record<string, number | null>;
  notes: string;
  criticalFlags: string[];
  adjudication?: boolean;
}
