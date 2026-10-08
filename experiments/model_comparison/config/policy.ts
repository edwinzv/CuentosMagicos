export const PROTOCOL_VERSION = "dt02-frozen-1";
export const SCORE_VERSION = "dt02-absolute-cuts-approved-frozen-1";
export const weights = { C1: 25, C2: 25, C3: 20, C4: 20, C5: 10 };
export const scales = {
  percentageLowerBounds: [95, 90, 80, 60],
  responseMsUpperBounds: [5000, 10000, 20000, 40000],
  usdPerAcceptableUpperBounds: [.01, .02, .04, .08],
  classification:
    "raw unrounded values, absolute bands, immutable before results",
  status: "APPROVED_USER_FROZEN",
};
export const acceptancePolicy = {
  minimumManualScore: 3,
  manualMaximum: 4,
  independentReviewers: 2,
  noCriticalFlags: true,
  originalOnly: true,
  qualityRetries: 0,
  wordRanges: {
    analysis: [60, 120],
    initial: [90, 160],
    continuation: [90, 160],
    final: [100, 160],
  },
  missingReviews: "pending_review",
  missingContent: "not_evaluable",
  unknownBilling: "pending_billing",
};
export const retryPolicy = {
  allowed: ["429", "5xx", "timeout", "explicit_transient_transport"],
  fallbackWaitMs: 600,
  upperWaitMs: 5000,
  noSDKRetries: true,
};
