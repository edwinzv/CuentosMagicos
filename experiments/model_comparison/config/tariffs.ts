import type { Provider } from "../types.ts";
export const TARIFF_VERSION = "dt02-tariffs-approved-frozen-1";
export const tariffs: Record<
  Provider,
  {
    input: number;
    output: number;
    cacheRead: number | null;
    cacheWrite: number | null;
    status: string;
    date: string;
    source: string;
    officialSource: string | null;
    introductoryUntil: string | null;
  }
> = {
  G: {
    input: .75,
    output: 3.75,
    cacheRead: null,
    cacheWrite: null,
    status: "APPROVED_DOCUMENTARY_USER",
    date: "2026-10-07",
    source:
      "Current user documentary confirmation: GA Google Developer API introductory USD/M .75/3.75 through 2026-12-31. No URL/capture supplied; not a successful fetch claim.",
    officialSource: null,
    introductoryUntil: "2026-12-31",
  },
  O: {
    input: 4,
    output: 20,
    cacheRead: null,
    cacheWrite: null,
    status: "APPROVED_USER_AND_PUBLIC_DOCUMENT",
    date: "2026-10-07",
    source:
      "Current user definitive rates; previously retrieved official gpt-5.6-sol model page. USD/M",
    officialSource:
      "https://developers.openai.com/api/docs/models/gpt-5.6-sol.md",
    introductoryUntil: "2026-11-21",
  },
  A: {
    input: 2,
    output: 10,
    cacheRead: null,
    cacheWrite: null,
    status: "APPROVED_USER_AND_PUBLIC_DOCUMENT",
    date: "2026-10-07",
    source:
      "Current user definitive Sonnet 5.5 selection and rates; previously retrieved official pricing. USD/M",
    officialSource: "https://platform.claude.com/docs/en/about-claude/pricing",
    introductoryUntil: null,
  },
};
