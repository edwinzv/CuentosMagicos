# CAP3-REV — Ficha saneada de evidencia funcional de generar-escena

## Procedencia y alcance

Evidencia **suministrada por el tesista** para la revisión del 09/10/2026. Esta ficha transcribe exclusivamente los datos aportados en la instrucción de la tarea. El editor no ejecutó la función, no inspeccionó el log original ni verificó independientemente el despliegue remoto. No es una prueba ejecutada por el editor ni un resultado de la comparación experimental de modelos. Se referencia en el capítulo 3, sección 3.5, de `tesis/tesis_parcial2_cap3_revisado.docx`. No se crea capítulo 5.

## Datos suministrados

| Campo | Valor y atribución |
|---|---|
| Función | `generar-escena` |
| Escena | 4, según el log de aplicación descrito por el tesista |
| Modelo | `gemini-3.5-flash-lite`, según ese log de aplicación |
| Estado HTTP | 200 |
| `execution_time_ms` | 2402 |
| Versión de la función | 7 |
| Fecha y hora GMT | 09/10/2026 02:50:53 |
| Equivalencia en Lima (UTC−5) | 08/10/2026 21:50:53 |
| `execution_id` | `00a29301-a112-4f0a-9e02-2167e6540106` |

## Límites de interpretación

- Los **2402 ms son tiempo de ejecución de la función**, no inferencia aislada del modelo ni espera total del usuario. No se equiparan con C4 del protocolo comparativo ni acreditan un RNF.
- El modelo declarado es provisional. No se atribuye esta ejecución a Gemini 3.8 Flash ni se selecciona un ganador entre Gemini 3.8 Flash, GPT-5.6 Sol y Claude Sonnet 5.5.
- HTTP 200 no acredita por sí solo calidad narrativa, adecuación pedagógica, persistencia completa, seguridad del contenido ni mejora de comprensión lectora.
- No se dispone aquí de tokens, consumo facturable, costos, repeticiones, medianas, métricas de calidad ni resultados educativos; no se estiman ni inventan.
- El registro no completa las 108 solicitudes base previstas ni las matrices pendientes del capítulo 3.
- Se omiten IP, identificadores de usuario y sesión, credenciales y cualquier otro dato sensible. El identificador de ejecución se conserva únicamente para trazabilidad técnica.

## Pendiente

El revisor independiente deberá contrastar esta atribución y sus límites. Cualquier acreditación adicional requerirá evidencia original saneada y pruebas específicas, sin convertir esta ficha en un benchmark ni en aprobación final.
