# CAP3-REV — Registro de edición y comprobaciones

Fecha: 09/10/2026. Unidad de cinco ajustes expresamente autorizada por el usuario. **Edición realizada; revisión independiente pendiente. No es aprobación final.**

## Archivos y alcance

- Fuente excepcional para esta tarea: `tesis/tesis_actual2_entrega_docente_revision_docente.docx`, preservada.
- Copia creada: `tesis/tesis_parcial2_cap3_revisado.docx`.
- Apoyo autorizado: `docs/evidencia-funcional-generar-escena-20261009.md`, referenciado en 3.5; no se crea capítulo 5.
- Registro añadido a `MEMORY.md`, sin reescribir los registros previos.
- No se modificaron código, Supabase, experimentos, plan de correcciones, auditoría ni verificación de fuentes. No se ejecutaron llamadas de IA ni pruebas educativas.

Se leyeron AGENTS, PROJECT, MEMORY, README y la rúbrica del segundo examen; se revisó el texto fuente y el código pertinente. `docs/architecture.md` y `docs/professor-feedback.md` estaban vacíos: no se usaron como evidencia sustantiva.

## Cambios localizados

1. Apertura y 3.1–3.2: distinguir diseño y avance; primera escena dibujada demo, PDF con análisis/solicitud y respaldo, continuación real; Quiz de cinco preguntas y cuatro alternativas, envío final conjunto, corrección y cálculo en servidor y explicaciones finales; PDF final no acreditado íntegramente.
2. 3.3 y 3.5: conservar candidatos y comparación futura; no atribuir el log provisional a Gemini 3.8 Flash ni declarar ganador. Nota de evidencia suministrada por el tesista y enlace textual a la ficha saneada.
3. 3.6–3.7: separar incrementos previstos y avance; correspondencia de componentes conceptuales con `_HomeRouterState`, StoryController, QuizView, SupabaseQuizService, QuizRepositorySupabase, NarracionService/StoryView y almacenamiento existente. AuthGate y panel docente con consulta de aulas/matrículas, registro de estudiantes y resultados, sin acreditar CRUD completo de aulas.
4. 3.8 y 3.10–3.11: mantener RF-22, RF-26 y RNF-14 y explicitar brechas; corregir HU-13/HU-14 que atribuían corrección/cálculo al cliente. Aclarar componente previsto frente a real sin modificar las tablas.
5. 3.11.2 y 3.12: conservar cuantitativa/aplicada/descriptiva, preexperimental de un grupo, pretest/postest futuros, sin control ni causalidad exclusiva; 55 como previsión de población y muestra pendiente; mantener desarrollo iterativo e incremental.

Localización XML comprobada por encabezados: capítulo III comienza en B523; referencias comienzan en B1031 (índices cero de hijos de `w:body`). Se editaron únicamente textos de **50 párrafos existentes**, sin insertar, eliminar ni reordenar bloques. Bloques cambiados:

`525, 526, 535, 539, 543, 544, 545, 546, 548, 554, 582, 617, 619, 624, 626, 627, 630, 634, 643, 647, 650, 655, 750, 759, 763, 764, 765, 772, 780, 785, 787, 798, 803, 815, 816, 820, 836, 843, 961, 963, 970, 972, 975, 977, 1011, 1015, 1016, 1022, 1024, 1027`.

## Integridad

| Comprobación | Resultado |
|---|---|
| SHA-256 fuente antes y después | `0b0aec9a308940e24a95541181a226693f1c12bc1fd9b79e51a76aacc9bc52b6` — idéntico |
| SHA-256 copia final | `89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80` |
| Lista y orden de miembros ZIP | Idénticos |
| Contenido descomprimido de miembros ZIP | Todos idénticos salvo `word/document.xml`; ninguna excepción adicional |
| Subárboles XML fuera de capítulo III | Idénticos por comparación canónica; B0–B522 y B1031 hasta el final |
| Estructura y propiedades XML | Idénticas en todo document.xml al neutralizar únicamente el texto de `w:t` |
| Tablas | Todos los subárboles `w:tbl` idénticos, incluido su contenido |
| Estilos y propiedades de párrafo/run | Conservados; sin añadir ni eliminar runs |
| OMML, dibujos, figuras y relaciones | Conservados; objetos XML y miembros relacionados sin cambios |

Se conservan los objetivos, la metodología fuera de capítulo III, las referencias, autores, años, DOI, pesos 25/25/20/20/10, escalas, 108 solicitudes previstas y tablas de resultados sin puntuaciones. La serialización de document.xml puede diferir lexicalmente; la identidad externa se verificó sobre subárboles XML, no se afirma identidad binaria de ese miembro.

## Render y revisión visual

Microsoft Word COM (`DispatchEx('Word.Application')`) abrió fuente y copia en modo **ReadOnly**, exportó mediante `ExportAsFixedFormat(..., 17)` y cerró con `Close(False)`. No se guardó ninguno de los DOCX desde Word. Se verificó el hash de la fuente después del proceso.

Artefactos temporales fuera del workspace en `C:/Users/Ignacia/AppData/Local/Temp/opencode/`:

- `cap3_original.pdf`: 165 páginas; SHA-256 `1f00a153e79922d2a3f5115ae21c6ad9e4270fc3336ef7208b34490fdc3a0c9e`.
- `cap3_revised.pdf`: 171 páginas; SHA-256 `04bf04516db8028ec2ac703bf9190f6fe6c3f6f2c75963ba55b6ef46dfdcddb0`.
- `cap3_checks.json`: cambios antes/después y comprobaciones; `cap3_render_meta.json`: rangos PDF.
- `cap3_original_sheet1.png` a `sheet7.png` y `cap3_revised_sheet1.png` a `sheet7.png`: láminas de contacto revisadas visualmente para original PDF 85–159 y copia PDF 85–164, incluidos límites, texto y tablas.
- `cap3_detail_*.png`: comparación ampliada de figuras 3–5, ecuación, Quiz, metodología, nota funcional y límite con referencias.

Capítulo III comienza en página PDF 86 en ambos. Las referencias comienzan en PDF 159 del original y PDF 164 de la copia. Las figuras se revisaron ampliadas: figura 3, original 90/copia 91; figura 4, 98/100; figura 5, 114/117. Ecuación OMML: 109/111. Nota funcional: copia 112; HU-13/HU-14: copia 141–142; límites metodológicos: copia 161.

En las vistas inspeccionadas no se observaron figuras ni ecuación cortadas o deformadas, superposición ni pérdida visible de texto. Se conservaron tablas multipágina y encabezados repetidos; cambiaron algunos puntos de división por la redistribución del texto. La revisión general de tablas fue en láminas de contacto, no una comprobación ampliada celda por celda; la identidad íntegra de sus contenidos y propiedades está respaldada por XML. Se mantiene la tipografía y los márgenes existentes. La paginación **no es idéntica**: las aclaraciones producen seis páginas más en el documento completo y desplazan el inicio de referencias cinco páginas; no se alteró su contenido para compensarlo. No se actualizaron índices ni campos fuera de capítulo III.

## Límites y pendientes para el revisor

- Código inspeccionado no equivale a despliegue remoto ni a ejecución funcional propia. El log original no se inspeccionó; 2402 ms son ejecución de función, no inferencia aislada ni espera total.
- RF-22: sin campo explícito de dimensión en contrato/migración ni cobertura pedagógica validada. Prompt orientado a cuarto grado de 9–10 años; adecuación a cuarto–sexto pendiente, sin reducir población.
- RF-26: requisito de feedback antes de la siguiente pregunta conservado, distinto de las explicaciones finales actuales.
- RNF-14: consultas e invocación directas en TeacherHomeView; requisito conservado, no acreditado como cumplido.
- Primera escena dibujada personalizada por IA y PDF final integral pendientes; almacenamiento existente no se niega por falta de clase StorageService.
- Rúbrica: respaldo específico de modelos propietarios (01), rúbricas humanas (02), mediciones y matrices sin resultados (03–05), cronograma sin semanas inventadas (06), instrumentos/trazabilidad del levantamiento (07), brechas RF (08), baterías RNF y modularidad (09). No se resuelven en esta unidad.
- El desarrollo sigue iterativo e incremental, no se declara un marco ágil; criterios 10–11 de la rúbrica son condicionales a esa declaración, no se cambia la metodología para obtenerlos.
- Instrumento independiente, muestra, intervención y mediciones educativas permanecen futuros. Revisión independiente y aprobación final pendientes.
