# DT-02 — protocolo `dt02-frozen-1`, aprobado y congelado antes de resultados

## EXISTENTE

Selección, directiva común, pesos y bandas aprobados explícitamente por el
usuario en esta unidad técnica. Corpus íntegramente sintético y fijo: doce casos
× tres repeticiones × tres modelos = **108 solicitudes base futuras**,
36/modelo, 9/operación/modelo. Ninguna inferencia o revisión humana real
realizada.

| Proveedor | Nombre/ID activos                       | Canal                                                              | Tarifa USD/M entrada/salida         |
| --------- | --------------------------------------- | ------------------------------------------------------------------ | ----------------------------------- |
| G         | Gemini 3.8 Flash / `gemini-3.8-flash`   | Google Developer API, GA según confirmación documental del usuario | 0.75 / 3.75; intro hasta 2026-12-31 |
| O         | GPT-5.6 Sol / `gpt-5.6-sol`             | OpenAI Responses                                                   | 4 / 20                              |
| A         | Claude Sonnet 5.5 / `claude-sonnet-5-5` | Anthropic Messages                                                 | 2 / 10                              |

Gemini identidad/estado/canal/precios están documentalmente confirmados **por
usuario**. No se suministró URL/captura: `officialSource: null`, sin atribuir
fetch exitoso. OpenAI y Sonnet 5.5 cuentan además con páginas públicas
recuperadas en la etapa anterior, sin nueva consulta afirmada aquí. Para OpenAI
la fuente anterior garantizaba promoción al menos hasta 2026-11-21, no una fecha
de retiro del modelo.

**Histórico NO activo:** Sonnet 4.5 fue el candidato de implementación anterior,
con riesgo de retiro; el usuario autorizó reemplazarlo por Sonnet 5.5 **antes de
resultados**. No permanece en selección, requests, escalas o presupuesto. No hay
resultados antiguos que reutilizar.

## PENDIENTE

Combinación efectiva de parámetros/schema de G/O/A; soporte de A
`thinking.disabled` con Sonnet 5.5 **no confirmado**; acceso/account/key y
evidencia real de conectividad de cada proveedor. `effectiveVerification`
distingue estas condiciones de la identidad documental.
`connectivityAuthorization` y `finalLive` siguen pending; aprobar diseño/bandas
no autoriza gasto ni red. Revisores y resultados pendientes.

## OBSERVACIÓN

Es comparación API **textual** individual, no aplicación completa. Se excluyen
PDF binario/imagen, OCR, dibujos, generación visual, preguntas, audio y
mediciones de comprensión lectora de estudiantes. La producción tiene
cascadas/reparaciones: se estudian en `diagnosis.md`, pero no se aplican al
original puntuado. C4 no es RNF institucional; timeout 85 s es límite técnico.

## Definición congelada y verificación

`frozen/protocol-dt02-frozen-1.json` contiene versiones, configuración
intrínseca y trece hashes de componentes canónicos. Digest fijado en
`freeze.ts`:

```text
2daab00355bb412b48b685c0e2562c184256aa51a35dfa5476b5e73c1421849f
```

Se hashea solo `payload`, no su propio digest ni procedencia/autorizaciones.
Componentes: versiones; corpus; snapshots; prompts enviados; directivas;
schemas; selección; parámetros; tarifas; puntuación/aceptación; retries; diseño;
requests completos sin secretos. JSON UTF-8, claves ordenadas recursivamente,
arrays en orden, números sin redondeo. El formato de archivos no cambia hashes
semánticos; textos renderizados se hashean literalmente.

Versiones:

- protocolo `dt02-frozen-1`;
- corpus `dt02-synthetic-lila-1`;
- prompt `production-snapshot-1`;
- schema `production-contract-1`;
- common JSON `common-json-format-1`;
- config `dt02-config-3-frozen`;
- tarifas `dt02-tariffs-approved-frozen-1`;
- escalas `dt02-absolute-cuts-approved-frozen-1`.

Guardas reales: antes de autorización/credenciales en CLI, comienzo de corrida y
cada caso/intento/retry. Si cambia corpus, prompt, candidato, tarifa, escala,
parámetros, schema o política, abortar y crear **otra versión con aprobación
independiente**; no recalibrar bandas después de resultados ni sobrescribir la
versión. La procedencia del freeze declara `executedCommit: null`, definición no
ejecutada y working tree no comprometido; una corrida futura deberá aportar su
procedencia real.

Controles de autorización, fechas/evidencia operativas, verificación
documental/effectiveVerification quedan fuera del payload para poder completarse
posteriormente sin invalidar la definición. Cambios en parámetros propuestos o
tarifas numéricas sí requieren nueva definición. El digest no es una firma/ACL
contra edición deliberada de código y manifiesto a la vez.

## Prompts, contratos y parámetros

Snapshots literales de producción intactos.
`renderRequest = render + formatDirective`, misma directiva por operación para
G/O/A, sin mejoras por proveedor. Esta capa común es una desviación **explícita
y ahora aprobada** del template literal; no reemplaza el snapshot ni se agrega a
producción.

Texto aprobado de análisis, conservado exacto:

```text
FORMATO DE RESPUESTA COMÚN:
Devuelve únicamente un objeto JSON válido, sin Markdown ni texto fuera del JSON.
Los siete campos requeridos son: titulo, personajePrincipal, descripcionPersonaje, resumen, escenario, conflictoPrincipal, finalOriginal. Todos deben ser cadenas.
El campo tituloOriginal es opcional; si se incluye, debe ser una cadena.
```

Directiva común de escenas también conservada:

```text
FORMATO DE RESPUESTA COMÚN:
Devuelve únicamente un objeto JSON válido, sin Markdown ni texto fuera del JSON.
Los campos requeridos son: contenido, opciones, esFinal. contenido debe ser una cadena, opciones una lista de cadenas y esFinal un booleano.
```

Schema de análisis: siete strings requeridos, título original string opcional,
vacío permitido para desconocido. Schema escena: contenido string no vacío,
opciones strings, esFinal boolean exacto; no final exige tres únicas/no vacías y
false, final exige [] y true. Resumen 60–120 palabras; inicial/intermedia
90–160; final 100–160. Fuente limitada a 8000 solo en inicial; no insertar
fuente extra en continuación/final.

G usa JSON MIME/schema con tipos mayúsculos; O JSON mode preserva título
opcional (strict all-required alteraría contrato); A Messages textual +
validación local. No equivalencia ficticia de garantías nativas. Schema común
objeto/string/array/boolean/properties/items/required, sin additionalProperties
false añadido. Soporte efectivo de combinación pendiente.

**PROPUESTA técnica congelada, no capacidad confirmada:** salida 2000, streaming
false; G LOW, O reasoning none, A thinking disabled. No forzar
temperature/top-k/top-p/seed/cache. Ninguna sustitución silenciosa si Sonnet 5.5
no acepta disabled: nueva versión requerida. Registrar cache automático cuando
se reporte.

## Corpus y orden

| Caso | Operación    | Hecho/control específico                                                             |
| ---- | ------------ | ------------------------------------------------------------------------------------ |
| A01  | Análisis     | Español completo, hechos/final originales                                            |
| A02  | Análisis     | Inglés completo, descriptivos españoles/título exacto                                |
| A03  | Análisis     | Truncado antes de desenlace + editorial English/pérdidas/OVERRIDE; finalOriginal ""  |
| I01  | Inicial      | Lila ardilla castaña/bufanda verde, observadora/paciente                             |
| I02  | Inicial      | Mara solo renombrada, conserva rasgos/relaciones                                     |
| I03  | Inicial      | Nico robot azul/mochila amarilla, no hereda ardilla                                  |
| C01  | Continuación | Pedir ayuda a Tomás                                                                  |
| C02  | Continuación | Piedras alternativas verificadas desde orilla                                        |
| C03  | Continuación | Inspección sin pisar tabla + editorial English/Reina/graphic injury                  |
| F01  | Final        | Reparación real y siembra antes de lluvia                                            |
| F02  | Final        | Piedras seguras, puente **sigue roto**                                               |
| F03  | Final        | Lluvia ya comenzó, cruce peligroso, bandejas bajo cobertizo sin cruce/escape/milagro |

Fixtures completos públicos en `cases/corpus.ts`: 14 campos de escena, hechos
esperados, contradicciones prohibidas, reglas automáticas/críticas, dimensiones,
objetivos/versiones. Historial literal fijo, nunca salida previa. Una solicitud
activa; barajar bloques caso/repetición y rotar proveedores con semilla
experimental **20261007**, independiente de semilla de modelo omitida. Sin
cascadas.

## Medición, fallos y retries congelados

Cronómetro de respuesta después de preparar prompt/request, inmediatamente antes
de transporte hasta **cuerpo completo**, abort/deadline 85 s activo hasta
terminar. Validación separada; espera/reintentos/preparación incluidos en
cumulative. No TTFT ni tokens/s sin streaming. C4 usa mediana del último intento
de todas las solicitudes, con fallos/cobertura al lado. Conservar
raw/media/mediana/min/max/varianza y desviación poblacional, sin alterar cortes
por distribución observada.

Máximo un retry técnico: 429/5xx/timeout/transporte explícitamente transitorio.
Retry-After segundos/fecha acotado 0–5000 ms, fallback 600. No SDK/hidden
retries ni retry de
JSON/estructura/calidad/idioma/identidad/rechazo/truncamiento. OpenAI
in_progress/queued es truncation/no aceptable/no retry; JSON null es
invalid_structure; A03 campo omitido falla estructura sin bandera de inventar
desenlace. No reescrituras.

Guardar original exacto sin trim, envelope sanitizado, parsed, processed
diagnóstico y cambios por separado. Reparaciones de opciones/nombres/esFinal no
elevan puntuación original; rewrite/fallback no ejecutados. Fallos:
technical_failure, timeout, rate_limit, invalid_structure, narrative_failure,
restriction_failure, provider_rejection, truncation.

Separar denominadores de intentos y solicitudes base finales, recuperaciones
técnicas y rechazos/truncamientos. RecoveredTechnicalRuns significa fallo
técnico previo/último intento no técnico, no aceptación narrativa.
`hasEvaluableContent` compartido: null/vacío/whitespace no evaluable; no
convierte error técnico en cero manual.

## Escalas y pesos aprobados — inmutables después de resultados

Pesos **25/25/20/20/10**. C1 compatibilidad estructural, denominador todas las
solicitudes base; C2 fidelidad/historia/protagonista/decisión/opciones/cierre
aplicables; C3 primaria/español/resistencia. C2/C3 porcentaje sobre máximo
humano 4, media por caso de dimensiones aplicables, casos equiponderados. N/A
excluido; cobertura y revisiones pendientes explícitas; finales pendientes hasta
revisar todas las salidas evaluables. No redondear antes de clasificar.

| Criterio                | 5     | 4              | 3               | 2               | 1      |
| ----------------------- | ----- | -------------- | --------------- | --------------- | ------ |
| C1/C2/C3 % raw          | ≥95   | ≥90 y <95      | ≥80 y <90       | ≥60 y <80       | <60    |
| C4 mediana respuesta ms | ≤5000 | >5000 y ≤10000 | >10000 y ≤20000 | >20000 y ≤40000 | >40000 |
| C5 USD/aceptable K      | ≤0.01 | >0.01 y ≤0.02  | >0.02 y ≤0.04   | >0.04 y ≤0.08   | >0.08  |

Bandas aprobadas **experimentales**, no RNF institucionales ni autorización
económica. Escenario planificado 60×3=180 experiencias; análisis+cuatro
escenas=900 salidas textuales planificadas; bandas K dimensionan 9/18/36/72 USD,
excluyendo imágenes/evaluación/otros. No uso actual ni participantes
confirmados.

Rúbrica completa 0–4 en `review/rubric.md`. Dos humanos ciegos, todas las
puntuaciones aplicables completas antes de adjudicar; registrar
reviewer/run/blindId/nota/flags y conservar independientes. Aceptación
individual: estructura+palabras+cada dimensión ≥3/4+no flags. Flags críticos
fuera de Σ(peso×score/5), impiden elegibilidad aunque suma alta. Sin
datos/revisiones no fabricar puntuación ni resultado.

## Costo y estimación

Tarifas aprobadas congeladas G .75/3.75, O 4/20, A **2/10** USD/M. G
candidates+thoughts separados, contar cada uno una vez; O output incluye
reasoning como subconjunto, no sumar de nuevo; A output incluye thinking, sin
duplicación. Cache separado según envelope; sin precio conocido si uso positivo,
costo pendiente. Contador presente inválido/total incoherente desconocido, no
cero; solo omisión opcional con usage válido permite cero. Timeout/uso ausente
no equivalen a factura cero.

K incluye **todos los intentos**, dividido por originales aceptables.
Facturación incompleta/revisiones pendientes/cero aceptables → null con estado
específico. Subtotal conocido e intentos desconocidos separados. No fingir
comprobación de facturación real.

Budget offline: prompts completos, heurística 3–5 caracteres/token por
proveedor; entrada 33 468–55 773/modelo, reserva 72 000 salida/modelo. G
0.295101–0.31182975; O 1.573872–1.663092; A 0.786936–0.831546; **total base
2.655909–2.80646775 USD**, contingencia máxima igual, **doble
5.311818–5.6129355**. No gasto/tokens medidos ni techo certificado; overhead no
medido y límites reasoning pendientes.

## Fuentes y seguridad

- Gemini: confirmación documental actual **del usuario**, sin URL/captura
  aportada. Los timeouts públicos de la etapa inicial son históricos, no prueba
  actual de inexistencia ni fetch exitoso.
- OpenAI: `https://developers.openai.com/api/docs/models/gpt-5.6-sol.md`,
  recuperado en etapa anterior: ID/Responses/none/4–20.
- Anthropic: `https://platform.claude.com/docs/en/about-claude/models/overview`,
  `/pricing` y `/model-deprecations`, recuperados en etapa anterior: Sonnet 5.5
  active/2–10 y reemplazo del anterior. No nuevas consultas de modelo atribuidas
  en esta unidad.
- Deno portátil: fuente/checksum oficiales fijados en README; descarga de
  runtime distinta de API/inferencia.

Nada de env/descubrimiento de secretos; mocks sin claves reales. No headers de
auth/query tokens/mensajes-stacks de excepciones guardados. Scrub recursivo
claves/valores/secretos suministrados/queries, CSV escapado y protegido de
fórmulas. Original exacto en memoria; copia exportada redacta ecos. Pasar
secretos explícitos también a packets ciegos. No DLP universal ni doble ciego
perfecto si el modelo se autoidentifica; documentar incidente. No resultados
reales o revisiones sintéticas presentados como evidencia.

Autorización operativa separada: connect requiere aprobación documental del
perfil seleccionado (`documentaryProfileApproval`) + permiso explícito +
connectivityAuthorization aprobado, sin prerequisito circular de contrato/acceso
ya comprobados mediante inferencia; run requiere aprobación de perfiles y
contratos/acceso/evidencia efectivos de todos los seleccionados + finalLive
aprobado. Todo acceso y autorizaciones operativas siguen pendientes. Comandos
futuros explícitos y ruta portátil en README; **no ejecutados**.
