// Known secrets must be supplied explicitly by the caller; never discover/read environment.
export function scrub(value: unknown, secrets: string[] = []): unknown {
  if (typeof value === "string") {
    let s = value;
    for (
      const secret of secrets.filter(Boolean).sort((a, b) =>
        b.length - a.length
      )
    ) {
      s = s.split(secret).join("[REDACTED]").split(encodeURIComponent(secret))
        .join("[REDACTED]");
    }
    return s.replace(/\bBearer\s+[^\s"'<>]+/gi, "Bearer [REDACTED]")
      .replace(/\b(?:sk-(?:ant-)?[\w-]+|AIza[\w-]+)\b/g, "[REDACTED]")
      .replace(
        /([?&](?:key|api_key|apikey|token|access_token|secret)=)[^\s&#"']*/gi,
        "$1[REDACTED]",
      );
  }
  if (Array.isArray(value)) return value.map((x) => scrub(x, secrets));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map((
        [k, v],
      ) => [
        String(scrub(k, secrets)),
        /^(authorization|proxy-authorization|x-goog-api-key|x-api-key|api[_-]?key|.*secret.*|password|access[_-]?token|refresh[_-]?token|token|credentials|cookie|set-cookie)$/i
            .test(k)
          ? "[REDACTED]"
          : scrub(v, secrets),
      ]),
    );
  }
  return value;
}
export function safeJSON(value: unknown, secrets: string[] = []): string {
  return JSON.stringify(scrub(value, secrets), null, 2);
}
export function csv(
  rows: Record<string, unknown>[],
  secrets: string[] = [],
): string {
  if (!rows.length) return "";
  const clean = scrub(rows, secrets) as Record<string, unknown>[];
  const keys = [...new Set(clean.flatMap((r) => Object.keys(r)))].sort();
  const cell = (v: unknown) => {
    let s = typeof v === "string" ? v : v == null ? "" : JSON.stringify(v);
    if (/^[\s]*[=+@-]/u.test(s)) s = "'" + s; // spreadsheet formula injection
    return '"' + s.replaceAll('"', '""') + '"';
  };
  return [
    keys.map(cell).join(","),
    ...clean.map((r) => keys.map((k) => cell(r[k])).join(",")),
  ].join("\r\n");
}
