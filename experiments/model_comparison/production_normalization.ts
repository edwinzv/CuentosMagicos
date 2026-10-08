import type { Case } from "./types.ts";
// Separate diagnostic simulation only. Never applied before original scoring. Never invokes a rewrite.
export function normalizeProduction(
  c: Case,
  parsed: unknown,
): { processed: unknown; changes: string[]; unavailable: string[] } {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {
      processed: null,
      changes: [],
      unavailable: ["production would reject non-object"],
    };
  }
  const v = parsed as Record<string, unknown>,
    changes: string[] = [],
    unavailable: string[] = [];
  if (c.operation === "analysis") {
    const processed = Object.fromEntries(
      [
        "titulo",
        "personajePrincipal",
        "descripcionPersonaje",
        "resumen",
        "escenario",
        "conflictoPrincipal",
        "finalOriginal",
      ].map((k) => [k, String(v[k] ?? "").trim()]),
    );
    const orig = String(v.tituloOriginal ?? v.titulo_original ?? "").trim();
    Object.assign(processed, { tituloOriginal: orig || null });
    if (JSON.stringify(v) !== JSON.stringify(processed)) {
      changes.push("StoryAnalysis: coercion/trim/optional title alias");
    }
    return { processed, changes, unavailable };
  }
  const original = String(c.input.personajeOriginal ?? ""),
    actual = String(c.input.personajePrincipal ?? "");
  const replace = (s: string) =>
    original && original.toLowerCase() !== actual.toLowerCase()
      ? s.replace(
        new RegExp(
          `(?<![\\wáéíóúüñÁÉÍÓÚÜÑ])${
            original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          }(?![\\wáéíóúüñÁÉÍÓÚÜÑ])`,
          "gi",
        ),
        actual,
      )
      : s;
  const contenido = replace(String(v.contenido ?? "").trim());
  const final = c.input.esUltimaEscena === true;
  let opciones = [
    ...new Set(
      (Array.isArray(v.opciones) ? v.opciones : []).map((x) =>
        replace(String(x ?? "").trim())
      ).filter(Boolean),
    ),
  ];
  if (final) {
    if (
      v.esFinal !== true || opciones.length ||
      /(siguiente\s+paso|decidi[oó]\s+investigar|continuar[aá]|tendr[aá]\s+que\s+descubrir)/iu
        .test(contenido)
    ) {
      unavailable.push(
        "Edge requests paid rewrite then may reject; NOT executed",
      );
    }
    opciones = [];
  } else {
    for (
      const option of [
        "Continuar explorando el sendero con atención",
        "Buscar una solución creativa e ingeniosa",
        "Pedir ayuda a los amigos del lugar",
      ]
    ) {
      if (opciones.length < 3 && !opciones.includes(option)) {
        opciones.push(option);
      }
    }
    opciones = opciones.slice(0, 3);
  }
  const processed = { contenido, opciones, esFinal: final };
  if (contenido !== v.contenido) changes.push("trim/name sanitization");
  if (JSON.stringify(opciones) !== JSON.stringify(v.opciones)) {
    changes.push(
      "option coercion/trim/dedupe/completion/truncation/final removal",
    );
  }
  if (final !== v.esFinal) changes.push("esFinal overwrite");
  if (!contenido) {
    unavailable.push(
      "production rejects empty content; controller may use Spanish demo fallback (NOT scored)",
    );
  }
  return { processed, changes, unavailable };
}
