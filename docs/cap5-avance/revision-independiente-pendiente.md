# CAP5-AVANCE — paquete para revisión independiente

**Estado final: SEGUNDA REVISIÓN INDEPENDIENTE APROBADA EN ALCANCE DOCUMENTAL — CAP5-AVANCE ciclo 2, 09/10/2026**, conforme al dictamen comunicado por el usuario. El estado pendiente histórico queda resuelto para esta unidad; no implica aprobación del asesor, examen, tesis completa o rúbrica íntegra. El nombre del archivo se conserva para mantener trazabilidad.

## Antecedente de preparación — conservado como historial

**Estado anterior: SEGUNDA REVISIÓN INDEPENDIENTE PENDIENTE.** El usuario comunicó el primer dictamen CAMBIOS NECESARIOS con tres hallazgos y corroboración del resto. Los tres cambios se aplicaron en el ciclo 2; no había todavía dictamen de la copia corregida ni aprobación final. Este documento era preparación, no una revisión firmada por el editor con otra identidad. Las listas siguientes se conservan como historial de ese paquete, no como pendientes vigentes de revisión de los tres hallazgos.

## Contraste específico del ciclo 2

- [ ] Tabla 38 / PDF 194: «FK cuento y estudiante NOT NULL; FK aula nullable», conforme a SQL:10–12. Figura 15(b) y SQL sin modificar.
- [ ] Figura 13(a) / PDF 188: inicio → elección; rama con resultadoInicial a Resultado con las tres asignaciones; rama sin resultadoInicial a Carga con `_iniciarQuiz()`. Contrastar `quiz_view.dart:47–55`.
- [ ] Figura 13(a): tres transiciones internas separadas de Respondiendo con guardas/acciones de `quiz_view.dart:96–131`, sin línea sobre el texto ni reducción de defaultFontSize 18 para ocultar el cruce.
- [ ] Solo los dos miembros DOCX declarados cambiaron frente al ciclo 1; otros 18 paneles y capítulos previos intactos; 213 páginas y 167 PAGEREF correctos.

Hashes actuales, delta y vistas comparativas: `validacion.md`, sección 7; `ciclo2-delta.json`; `ciclo2-comparacion-figura13a.png`; `ciclo2-comparacion-tabla38.png`. El alcance de esta segunda revisión es el ciclo autorizado, no otra corrección del contenido corroborado por el primer dictamen.

## Documentos a contrastar

1. Fuente preservada `tesis/tesis_parcial2_cap3_revisado.docx` y hash consignado en validacion.md.
2. Copia `tesis/tesis_parcial2_cap3_cap5_avance.docx`, PDF final y hashes.
3. Rúbrica `docs/rubrica-segundo-examen.pdf`, pp. 4–6, criterios 12–20.
4. Fuentes `.puml`, figuras, código y migraciones locales citadas en 5.1–5.10.
5. `construccion.json`, `render-indices.json`, `verificacion-integridad.json`, `comparacion-render.json` y láminas visuales.
6. Ficha del tesista y log Flutter histórico; distinguir transcripción, código, mock, informe histórico y evidencia original inspeccionada.

## Lista original del primer paquete — conservada como antecedente

- [ ] Solo unidad CAP5-AVANCE, después de III/antes de REFERENCIAS, IV expresamente pendiente y sin renumerar I–III.
- [ ] Fuente, 32 tablas previas, figuras 1–5, ecuación, referencias y metodología preservadas, con excepciones de índices/paginación explicitadas.
- [ ] RF-01–RF-32 en matriz; distinguir alcance de cumplimiento y CU parcial de CU completamente modelado según 13(d).
- [ ] No procesos institucionales, porcentajes de cobertura, modelos ganadores, resultados educativos ni notas fabricados.
- [ ] Nombres, atributos, relaciones, multiplicidades, guardas y alt/loop/opt/break coherentes con código; diagrama técnico no ejecución.
- [ ] Datos locales frente a remoto; inmutabilidad y metadata no aseguradas; excepciones de capas, RLS, CORS y guardado sucesivo sin ocultar.
- [ ] Captions SEQ 33–43 y 6–18, continuaciones sin duplicar índice, links/167 PAGEREF coherentes; referencias en PDF 207.
- [ ] Legibilidad de las 19 láminas/paneles a tamaño real, incluidos A3 horizontal y margen específico del panel PDF; no reducirlos inadvertidamente a A4.
- [ ] Pruebas históricas/fakes, smoke reportado y evidencia del tesista separados de E2E remoto, benchmarks y efectos educativos.
- [ ] Fuente experimental/ZIP sin SHA original, HEAD local no equivale a código integrado publicado, consulta 404 no prueba privacidad/inexistencia.
- [ ] Confirmar tratamiento separado del instrumento educativo, muestra pendiente y ausencia de atribución causal exclusiva.

El revisor deberá registrar su identidad, método, fecha real, archivos/hashes revisados, hallazgos y dictamen después de la revisión. No se precompleta una aprobación ni se modifica el plan de correcciones.

## Cierre administrativo — revisión final del 09/10/2026

El usuario comunicó **VEREDICTO APROBADO** de la segunda revisión independiente para CAP5-AVANCE ciclo 2. Se registran como resueltos documentalmente los tres hallazgos de tabla 38 y figura 13(a); no se inventan identidad o método del revisor ni se presenta este registro como una nueva revisión del editor.

- DOCX aprobado: `tesis/tesis_parcial2_cap3_cap5_avance.docx`; SHA-256 `011399a5c4d782dc48149568e96c0556d4e03c9263b804a9625de2f248049e80`.
- PDF aprobado: `docs/cap5-avance/tesis_parcial2_cap3_cap5_avance.pdf`; SHA-256 `6bbe6afc1e525bd13e9a275d4fcb7ae6c633b7fd2aa45a5d94c705db0856bea9`.
- Resultados documentales conservados: 213 páginas, 167 PAGEREF correctos, fuente intacta y 1072 bloques previos preservados.
- Hashes de DOCX/PDF y fuente comprobados antes y después del cierre, sin cambios; no se abrió Word, no se rerenderizó ni se modificó el material entregado.

Este cierre no resuelve los pendientes de 12 (institucional), 13 (CU completos), 15 (remoto/metadatos), 18 (repo), 19 (capturas/brechas) ni 20 (E2E), ni amplía la aprobación a asesor/examen/rúbrica completa. El artículo es la siguiente tarea y **no está iniciado**. El resto del historial se conserva; no se modifica el plan ni se continúa con otra unidad.
