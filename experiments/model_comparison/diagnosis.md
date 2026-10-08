# Diagnóstico del código vigente — 2026-10-07

Los localizadores siguientes se comprobaron en el **working tree**, incluidas
modificaciones del usuario. HEAD observado:
`438685d2889bf9d5486c353758abc7800998ce9c`; no representa por sí solo el
contenido modificado. Ningún hecho de esta tabla procede de resultados antiguos
de modelos.

## EXISTENTE

| Archivo / clase o función / líneas                                                                           | Hecho comprobado                                                                                                                                                                               | Relación con harness                                                                |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `lib/services/document_service.dart`, `DocumentService.procesarPdf`, 20–72; `_limpiarTextoExtraido`, 195–224 | Valida PDF; `PdfTextExtractor.extractText` en 41; limpia texto; rechaza texto vacío incluso PDF solo imagen; extracción de imágenes separada en 53 y 74–169                                    | Análisis recibe **texto**, no PDF binario, imagen ni OCR                            |
| `lib/services/ai_service.dart`, `AiService`, 4–38                                                            | Contratos análisis, escena inicial y escena contextualizada, con nombre original/nuevo y descripción                                                                                           | Fixtures reproducen esas entradas                                                   |
| `lib/services/supabase_ai_service.dart`, `SupabaseAiService.analizarHistoria`, 18–31                         | Envía `{'texto': contenido}` recortado a Edge; timeout cliente 85 s                                                                                                                            | Análisis completo sin corte 8000; 85 s solo límite técnico                          |
| mismo archivo, `generarEscenaInicial`, 39–67; `generarEscena`, 75–145                                        | Inicial fija historial/decisión de inicio, número 1 y final false; cuerpo 120–139 incluye los 14 campos de escena; timeout 85 s en 141                                                         | Corpus usa cuerpo equivalente; fetch directo experimental evita Supabase            |
| mismo archivo, `_validarRespuesta`, 152–168                                                                  | Rechaza null/no mapa/error                                                                                                                                                                     | Validación experimental más estricta sobre original, sin coerciones                 |
| `lib/models/story_analysis.dart`, `StoryAnalysis.fromJson`, 22–36                                            | Coerciona cadenas/trim; título original nullable y alias `titulo_original`                                                                                                                     | Diagnóstico procesado separado del contrato original                                |
| `lib/models/generated_scene.dart`, `GeneratedScene.fromJson`, 12–47                                          | Coerciona opciones; contenido no vacío; 3 opciones distintas no final o vacío final                                                                                                            | Experimental exige tipos originales exactos antes de normalizar                     |
| `lib/controllers/story_controller.dart`, `StoryController.procesarPdf`, 101–125                              | Procesa PDF y analiza texto extraído                                                                                                                                                           | No se mide extracción PDF en este benchmark                                         |
| mismo archivo, `crearCuentoInicialDemo`, 56–94                                                               | Creación desde dibujo usa `NarrativaService` demo y referencia PNG, no análisis multimodal                                                                                                     | Dibujo excluido de comparación textual                                              |
| mismo archivo, `crearCuentoDesdePdfProcesadoDemo`, 132–277                                                   | 160–174 separa nuevo y renombrado; 205–216 llama inicial; 218–236 sustituye nombres; 244–270 usa fallback demo español                                                                         | No heredar rasgos para nuevo; fallback no puntúa original                           |
| mismo archivo, `prepararContinuacion`, 312–326; `generarSiguienteEscena`, 333–561                            | Contexto, validación de decisión, guardias concurrentes; 406–415 limita contexto/fuente; 426–470 reintenta incluso errores de calidad; 483–525 sustituye nombre/fuerza final/completa opciones | Historial fijo, una solicitud activa; se excluyen esos reintentos de calidad        |
| mismo archivo, `sanitizarNombrePersonaje`, 595–614; `esFinalAbierto`, 623–652                                | Sustitución por límites de palabra y detector de finales abiertos                                                                                                                              | Se registra diagnóstico sin corregir puntuación original                            |
| mismo archivo, `asegurarIlustracionEscena`, 668–760                                                          | Imagen separada, referencias PNG/anchors 695–727; timeout 40 s; fallo no bloquea narrativa 755–757                                                                                             | No benchmark visual, ni generación de imágenes                                      |
| `supabase/functions/analizar-historia/index.ts`, handler `Deno.serve`, 45–280; plantilla 95–117              | Extrae solo evidencia; descriptivos españoles; resumen 60–120; desconocido cadena vacía                                                                                                        | Snapshot literal comprobado por test contra código vigente                          |
| mismo archivo, schema 129–174; llamada `llamarGemini`, 22–42; bucle 182–208                                  | Siete campos requeridos; `tituloOriginal` opcional; 2000 salida; timeout Edge 25 s; cascada de modelos                                                                                         | Contrato común conserva opcional; principal individual, sin cascada                 |
| `supabase/functions/generar-escena/index.ts`, handler, 114–170                                               | Cuerpo, nombre nuevo/renombrado, descripción; fuente limitada a 8000                                                                                                                           | Fuente solo se inserta en plantilla inicial                                         |
| mismo archivo, construcción plantilla, 172–331                                                               | Ficha/nombre exacto; tres ramas: inicial 222–254, final 255–294, intermedia 295–331                                                                                                            | Inicial/intermedia 90–160, final 100–160; no agregar fuente a otras ramas           |
| mismo archivo, schema 343–364; bucle 372–399                                                                 | `contenido` string, `opciones` array string, `esFinal` boolean, todos requeridos; cascada                                                                                                      | Adaptadores comparten contrato semántico y prompts                                  |
| mismo archivo, `sanitizarNombre`, 454–463; `esFinalAbierto`, 465–467; tratamiento 470–636                    | trim/sustitución, reescritura pagada 488–565, rechazo de final abierto 568–581, overwrite final 588, dedupe/completar/truncar opciones 601–629                                                 | `original`, `parsed`, `processed`, cambios y reescritura **no ejecutada** separados |

## PENDIENTE

- `docs/requirements.md`, `docs/architecture.md` y `docs/traceability.md` están
  vacíos; no se inventa su contenido.
- Acceso efectivo API Google y soporte de parámetros/schema G/O/A pendientes.
  Identidad/GA/canal/tarifa Gemini confirmados documentalmente por el usuario en
  unidad de congelación; no se atribuye fetch exitoso. Diseño/escalas aprobados;
  autorizaciones operativas de conectividad/corrida pendientes.
- Participantes reales, frecuencia efectiva, presupuesto institucional y
  mediciones de rendimiento/calidad.
- Comprobación estática resuelta en unidad de congelación: Deno portátil 2.5.4
  verificado fuera del repositorio, check estricto de todos los TS y tests
  nativos offline. Node stripping permanece solo como alternativa histórica.

## OBSERVACIÓN

Lectura **solo lectura** del XML interno de `tesis/tesis_actual.docx`, tabla de
RNF: RNF-01 fija P95 ≤2 s para navegación **excluyendo solicitudes externas**;
RNF-02 indicador ≤500 ms; RNF-13 ≥95 % de 20 solicitudes por servicio; RNF-17
PDF P95 ≤5 s **sin carga externa**. Ninguno fija respuesta completa del modelo.
RNF-04/05 son contenido y RNF-18 minimización de datos. No trasladar 2/5 s a IA
ni afirmar que el timeout 85 s sea RNF.

El escenario de 60 estudiantes ×3 experiencias =180 aparece como **máximo de
planificación** en §viabilidad económica del DOCX; no es muestra confirmada ni
consumo medido. Solo se usa como referencia contextual de la propuesta de costo;
no se reutilizan precios, puntuaciones ni métricas de comparaciones anteriores.

## PROPUESTA

Harness experimental textual separado. Sus resultados futuros no certifican RNF
de la aplicación completa ni una mejora educativa. La trazabilidad interna es
`cases/manifest.ts` → objetivos DT02 → operación/caso → prompt/contrato →
adaptador/validador → test → C1–C5. No editar trazabilidad académica ni
producción en esta autorización.
