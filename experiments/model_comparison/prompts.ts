import type { Body, Case } from "./types.ts";
import { analysisRequired, sceneSchema } from "./contracts.ts";
export const PROMPT_VERSION = "production-snapshot-1";
export const FORMAT_DIRECTIVE_VERSION = "common-json-format-1";
// Literal templates from current Edge code; whitespace and instructions are shared by all providers.
export function analysisPrompt(texto: string): string {
  return `
Analiza el siguiente cuento infantil.
Extrae únicamente información respaldada por el texto proporcionado.

REGLA FUNDAMENTAL DE IDIOMA:
Todos los campos descriptivos (titulo, resumen, escenario, conflictoPrincipal, finalOriginal, descripcionPersonaje) DEBEN redactarse en ESPAÑOL fluido, natural y adaptado para estudiantes de educación primaria, incluso si el cuento original está en inglés u otro idioma.

Debes identificar:
- titulo: Título adaptado o traducido al español para niños de educación primaria (por ejemplo, si en inglés se titula "The Case of the Missing Water", el título en español debe ser "El misterio del agua desaparecida").
- tituloOriginal: Título original exacto en el idioma en que está escrito el documento fuente (por ejemplo: "The Case of the Missing Water").
- personajePrincipal: Nombre del personaje principal o protagonista.
- descripcionPersonaje: Breve descripción en español de la personalidad, rol o rasgos del protagonista.
- resumen: Resumen en español de los acontecimientos esenciales del cuento (entre 60 y 120 palabras).
- escenario: Escenario principal donde transcurre la historia, descrito en español.
- conflictoPrincipal: El conflicto, problema o misterio central del cuento, explicado en español.
- finalOriginal: El desenlace o final de la historia original, explicado en español.

No inventes información que no esté en el cuento.
Si algún dato no puede determinarse claramente, devuelve una cadena vacía en ese campo.

CUENTO:
${texto}
`;
}
export function scenePrompt(body: Body): string {
  const text = (key: string) => String(body[key] ?? "").trim();
  const titulo = text("titulo"),
    personajePrincipal = text("personajePrincipal"),
    personajeOriginal = text("personajeOriginal");
  const fueRenombrado = personajeOriginal.length > 0 &&
    personajeOriginal.toLowerCase() !== personajePrincipal.toLowerCase();
  const textoFuente = text("textoFuente"),
    resumenOriginal = text("resumenOriginal"),
    escenarioOriginal = text("escenarioOriginal");
  const conflictoPrincipal = text("conflictoPrincipal"),
    finalOriginal = text("finalOriginal"),
    contextoNarrativo = text("contextoNarrativo");
  const decisionActual = text("decisionActual"),
    numeroEscena = Number(body.numeroEscena ?? 0);
  const esUltimaEscena = body.esUltimaEscena === true,
    esPersonajeNuevo = body.esPersonajeNuevo === true;
  const descripcionPersonaje = text("descripcionPersonaje");
  const textoFuenteLimitado = textoFuente.length > 8000
    ? textoFuente.substring(0, 8000)
    : textoFuente;
  const seccionFichaBase = descripcionPersonaje
    ? `
RASGOS BASE DEL PROTAGONISTA (CANÓNICOS Y PERMANENTES):
"${descripcionPersonaje}"
- Estos rasgos base son la fuente canónica y permanente del protagonista durante toda la aventura.
- En la narración puedes redactarlos con fluidez y naturalidad respetando fielmente estos rasgos (por ejemplo, si su ficha indica vestimenta o accesorios específicos, mantén esos colores y características exactas; NO inventes otros colores ni rasgos contradictorios).
- Solo pueden modificarse temporalmente si la propia acción de la escena lo exige (ejemplos: ponerse una capucha por lluvia, quitarse la mochila para cruzar un río nadando, ensuciarse la ropa en el camino). Dichas modificaciones temporales jamás redefinen su apariencia base ni sustituyen sus rasgos permanentes.
`
    : "";
  const reglaNombreExacto = `
REGLAS ESTRICTAS DE NOMBRE Y TRATAMIENTO:
1. Usa estrictamente "${personajePrincipal}" como el nombre propio del protagonista.
2. NO uses diminutivos no solicitados (por ejemplo, si el nombre es "${personajePrincipal}", no lo conviertas arbitrariamente en un diminutivo), salvo que el estudiante lo haya escrito con diminutivo originalmente.
3. PROHIBIDO combinar la descripción con el nombre. NO llames al personaje "${personajePrincipal} ${
    descripcionPersonaje || ""
  }".
4. NO conviertas objetos, ropa o características físicas en parte de su nombre compuesto.
`;
  const instruccionProtagonista = esPersonajeNuevo
    ? `
ATENCIÓN CRÍTICA - PROTAGONISTA NUEVO:
El estudiante ha creado un protagonista NUEVO para vivir esta aventura.

DATOS DEL PROTAGONISTA NUEVO:
- Nombre: "${personajePrincipal}"
${
      descripcionPersonaje
        ? `- Descripción física y vestimenta: "${descripcionPersonaje}"`
        : "- Descripción: (Sin descripción física adicional)"
    }

${seccionFichaBase}
${reglaNombreExacto}
5. "${personajePrincipal}" reemplaza narrativamente al protagonista del documento original ("${
      personajeOriginal || "protagonista original"
    }"). NO debes asumir automáticamente que conserva su apariencia o personalidad original.
6. Bajo ninguna circunstancia uses el nombre original "${personajeOriginal}".
`
    : fueRenombrado
    ? `
ATENCIÓN CRÍTICA - PROTAGONISTA ORIGINAL RENOMBRADO:
El personaje es exactamente el protagonista original de la historia ("${personajeOriginal}"), pero el estudiante ha decidido cambiar únicamente su nombre a "${personajePrincipal}".
- "${personajePrincipal}" CONSERVA fielmente toda la personalidad, apariencia, descripción original, papel narrativo, habilidades y relaciones con los demás personajes de "${personajeOriginal}".
${
      descripcionPersonaje
        ? `- Descripción y rasgos del protagonista: "${descripcionPersonaje}"`
        : ""
    }
${reglaNombreExacto}
- Debes utilizar exclusivamente "${personajePrincipal}". Bajo ninguna circunstancia uses el nombre antiguo "${personajeOriginal}".
`
    : `
DATOS DEL PROTAGONISTA:
- Nombre: "${personajePrincipal}"
${seccionFichaBase}
${reglaNombreExacto}
`;
  if (numeroEscena === 1) {
    return `
Eres un narrador de cuentos interactivos infantiles para estudiantes de educación primaria.
Tu objetivo es crear la ESCENA INICIAL (Escena 1) de una aventura interactiva, adaptando el relato al español.
${instruccionProtagonista}
DATOS DEL CUENTO:
- Título: ${titulo || "Aventura mágica"}
- Protagonista: ${personajePrincipal}
- Resumen del cuento original: ${resumenOriginal || "No disponible"}
- Escenario original: ${escenarioOriginal || "No disponible"}
- Conflicto principal: ${conflictoPrincipal || "No disponible"}
- Desenlace original previsto: ${finalOriginal || "No disponible"}
- Texto fuente de referencia:
${textoFuenteLimitado || "No disponible"}

INSTRUCCIONES PARA LA ESCENA INICIAL:
1. Idioma: REDACTA OBLIGATORIAMENTE TODO EN ESPAÑOL, con lenguaje amigable, educativo y atractivo para niños de primaria. Si el texto fuente está en inglés, adáptalo completamente al español.
2. Contenido de la escena:
   - Presenta al protagonista (${personajePrincipal}) en su entorno o punto de partida.
   - Establece claramente el escenario (${escenarioOriginal}).
   - Introduce de forma emocionante el conflicto o problema central (${conflictoPrincipal}).
   - NO copies fragmentos en bruto del PDF ni incluyas metadatos editoriales, números de página ni agradecimientos.
   - Longitud: entre 90 y 160 palabras.
3. Decisiones narrativas:
   - "esFinal": false.
   - "opciones": Exactamente tres (3) opciones narrativas concretas, atractivas y distintas para que el niño decida qué hacer:
     * Opción 1 (Ruta original): Acción concreta que avanza según los hechos originales del cuento fuente.
     * Opción 2 (Ruta alternativa): Acción concreta que explora un camino diferente o una solución alternativa ingeniosa.
     * Opción 3 (Ruta de investigación): Acción concreta de observación, diálogo o exploración detallada del entorno.
   - NO uses opciones genéricas como "Seguir la historia" o "Ver qué pasa". Describe acciones específicas del personaje.

Devuelve estrictamente un JSON con las propiedades: contenido, opciones, esFinal.
`;
  }
  if (esUltimaEscena) {
    return `
Eres un narrador de cuentos infantiles para estudiantes de educación primaria.
Tu objetivo es escribir el DESENLACE DEFINITIVO (Escena final ${numeroEscena}) que cierre por completo esta aventura.
${instruccionProtagonista}

DATOS DEL CUENTO:
- Título: ${titulo || "Aventura mágica"}
- Protagonista: ${personajePrincipal}
- Resumen del cuento original: ${resumenOriginal || "No disponible"}
- Escenario original: ${escenarioOriginal || "No disponible"}
- Conflicto principal QUE DEBE QUEDAR RESUELTO AQUÍ: ${
      conflictoPrincipal || "No disponible"
    }
- Desenlace original de referencia: ${finalOriginal || "No disponible"}

HISTORIAL DE LA HISTORIA (CONTEXTO ACUMULADO):
${contextoNarrativo}

ÚLTIMA DECISIÓN TOMADA POR EL ESTUDIANTE:
"${decisionActual}"

INSTRUCCIONES CRÍTICAS PARA EL DESENLACE FINAL (NO ES UNA ESCENA INTERMEDIA):
1. Resolución completa del conflicto:
   - Muestra la consecuencia directa y exitosa de la decisión: "${decisionActual}".
   - Resuelve de forma clara y concluyente el conflicto central ("${conflictoPrincipal}") y el misterio planteado.
   - Muestra el desenlace definitivo: cómo queda el lugar y cómo se soluciona el problema.
2. Cierre del protagonista:
   - Da un cierre reflexivo y satisfactorio a ${personajePrincipal} (por ejemplo: alegría comunitaria, aprendizaje o reconocimiento).
3. PROHIBICIONES ESTRICTAS (BAJO NINGUNA CIRCUNSTANCIA):
   - PROHIBIDO dejar preguntas abiertas o incógnitas pendientes (NO uses "¿qué pasará ahora?", "¿qué hará?", "¿a dónde conducirá?").
   - PROHIBIDO dejar investigaciones o viajes pendientes (NO uses "decidió investigar a dónde llevaba", "el siguiente paso", "tendrá que descubrir", "aún debía averiguar").
   - PROHIBIDO introducir nuevos misterios, villanos, amenazas o caminos.
   - PROHIBIDO sugerir continuaciones (NO uses "continuará", "una nueva aventura comenzaba").
   - La historia TERMINA DEFINITIVAMENTE en esta escena.
4. Extensión: Entre 100 y 160 palabras en español fluido para primaria.
5. Formato JSON obligatorio:
   - "esFinal": true
   - "opciones": [] (lista vacía obligatoria, NO agregues ninguna opción)

Devuelve estrictamente un JSON con las propiedades: contenido, opciones, esFinal.
`;
  }
  return `
Eres un narrador de cuentos interactivos infantiles para estudiantes de educación primaria.
Tu objetivo es continuar la historia de forma coherente según las decisiones tomadas por el estudiante.
${instruccionProtagonista}
DATOS DEL CUENTO:
- Título: ${titulo || "Aventura mágica"}
- Protagonista: ${personajePrincipal}
- Resumen del cuento original: ${resumenOriginal || "No disponible"}
- Escenario original: ${escenarioOriginal || "No disponible"}
- Conflicto principal: ${conflictoPrincipal || "No disponible"}
- Desenlace original de referencia: ${finalOriginal || "No disponible"}

HISTORIAL DE LA HISTORIA (CONTEXTO ACUMULADO):
${contextoNarrativo}

DECISIÓN ACTUAL DEL ESTUDIANTE:
"${decisionActual}"

NÚMERO DE ESTA ESCENA: ${numeroEscena}

REGLAS NARRATIVAS:
1. Idioma: REDACTA OBLIGATORIAMENTE EN ESPAÑOL. Todo el contenido y las opciones deben estar en español claro para primaria.
2. Consecuencia directa: La escena debe comenzar mostrando de forma visible qué ocurre a causa de la decisión tomada: "${decisionActual}".
3. Coherencia: Mantén la personalidad de ${personajePrincipal}, el escenario y la lógica de los acontecimientos previos.
4. Extensión: Entre 90 y 160 palabras.
5. Continuación:
   - "esFinal": false.
   - "opciones": Exactamente tres (3) decisiones narrativas diferentes, específicas y creativas:
     1) Ruta original: avanza hacia los acontecimientos del relato original.
     2) Ruta alternativa: permite consecuencias diferentes e intrigantes.
     3) Acción concreta de observación, ingenio o diálogo.
   - Cada opción debe ser una acción concreta (no genérica) y no estar vacía.

Devuelve estrictamente un JSON con las propiedades: contenido, opciones, esFinal.
`;
}
export function render(c: Case): string {
  return c.operation === "analysis"
    ? analysisPrompt(String(c.input.texto).trim())
    : scenePrompt(c.input);
}
// Authorized common appendix, NOT part of the faithful production snapshot.
export function formatDirective(c: Case): string {
  return c.operation === "analysis"
    ? `\nFORMATO DE RESPUESTA COMÚN:\nDevuelve únicamente un objeto JSON válido, sin Markdown ni texto fuera del JSON.\nLos siete campos requeridos son: ${
      analysisRequired.join(", ")
    }. Todos deben ser cadenas.\nEl campo tituloOriginal es opcional; si se incluye, debe ser una cadena.\n`
    : `\nFORMATO DE RESPUESTA COMÚN:\nDevuelve únicamente un objeto JSON válido, sin Markdown ni texto fuera del JSON.\nLos campos requeridos son: ${
      sceneSchema.required.join(", ")
    }. contenido debe ser una cadena, opciones una lista de cadenas y esFinal un booleano.\n`;
}
export function withFormatDirective(c: Case, snapshot: string): string {
  return snapshot + formatDirective(c);
}
export function renderRequest(c: Case): string {
  return withFormatDirective(c, render(c));
}
