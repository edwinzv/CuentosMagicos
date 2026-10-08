export const SCHEMA_VERSION = "production-contract-1";
export const analysisRequired = [
  "titulo",
  "personajePrincipal",
  "descripcionPersonaje",
  "resumen",
  "escenario",
  "conflictoPrincipal",
  "finalOriginal",
];
export const analysisSchema = {
  type: "object",
  properties: Object.fromEntries(
    [...analysisRequired, "tituloOriginal"].map((k) => [k, { type: "string" }]),
  ),
  required: analysisRequired,
};
export const sceneSchema = {
  type: "object",
  properties: {
    contenido: { type: "string" },
    opciones: { type: "array", items: { type: "string" } },
    esFinal: { type: "boolean" },
  },
  required: ["contenido", "opciones", "esFinal"],
};
// Shared subset only: object/string/array/boolean/properties/items/required.
// Do not force optional tituloOriginal to required for OpenAI strict mode.
export function geminiSchema(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(geminiSchema);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map((
        [k, v],
      ) => [
        k,
        k === "type" && typeof v === "string"
          ? v.toUpperCase()
          : geminiSchema(v),
      ]),
    );
  }
  return value;
}
