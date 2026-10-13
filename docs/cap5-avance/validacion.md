# CAP5-AVANCE — registro de edición y validación del editor

Fecha: 09/10/2026. Unidad única aprobada explícitamente. **Estado actual, ciclo 2: tres hallazgos aplicados; segunda revisión independiente PENDIENTE. No es aprobación final.** Los hashes y comprobaciones actuales se encuentran en la sección 7.

## Registro del ciclo 1 — primera entrega, conservado como antecedente

Las secciones 1–6 siguientes documentan la primera entrega. Sus hashes corresponden a esa versión, no a la copia corregida del ciclo 2. El usuario comunicó posteriormente el dictamen independiente CAMBIOS NECESARIOS con tres hallazgos; se registra su aplicación en la sección 7 sin sustituir el antecedente ni atribuir una aprobación al nuevo archivo.

## 1. Alcance y archivos

Se leyeron AGENTS, PROJECT, MEMORY, README, rúbrica del segundo examen (pp. 4–6, criterios 12–20), validación CAP3 y ficha funcional saneada. Se inspeccionaron código, contratos, migraciones locales, pruebas existentes, log histórico y procedencia Git. No se ejecutaron tests del producto nuevamente, llamadas a proveedores, migraciones, despliegues, experimentos, commit ni push.

La fuente excepcional aprobada es `tesis/tesis_parcial2_cap3_revisado.docx`; permanece intacta. Se creó `tesis/tesis_parcial2_cap3_cap5_avance.docx`, añadiendo 164 bloques OOXML entre el final de III y REFERENCIAS: capítulo V, nota de IV PENDIENTE, secciones 5.1–5.11, 11 tablas nuevas (33–43) y 13 figuras numeradas (6–18), distribuidas en 19 paneles/recursos nuevos. No se creó capítulo IV ni se renumeraron los anteriores.

Apoyos nuevos y render se encuentran exclusivamente en `docs/cap5-avance/`. MEMORY se amplía con registro real. No se modifican `tesis/tesis_actual.docx`, otros originales, código de producto, migraciones, Supabase, experimentos, artículo, plan de correcciones, auditoría, verificación de fuentes ni los registros históricos CAP3/semana 8. El estado dirty previo se conservó.

## 2. Integridad comprobada

| Elemento | Resultado final |
|---|---|
| SHA-256 fuente antes/después | `89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80` — idéntico |
| SHA-256 copia final | `f828f5cc56fa2a653cdd308abb79cfe7c57729e3e750c4ea2b57e0ff920d33cb` |
| SHA-256 PDF final | `bbd6764bec2182654f8c339974ab2aca2e3e39e4a3fb9d991292fa5b0dd252e4` |
| Bloques previos cotejados | 1072 bloques fuera de resultados de índice, idénticos canónicamente al neutralizar bookmarks `_Toc` y la continuidad de numeración final autorizada |
| Tablas previas | 32 subárboles completos preservados; 43 tablas totales |
| Figuras previas y ecuación | Objetos XML, recursos y relaciones originales conservados; comparación visual de figuras 1–5 y OMML |
| Miembros ZIP originales modificados | Solamente `word/document.xml` y `word/_rels/document.xml.rels` |
| Miembros nuevos | 19 PNG bajo `word/media/cap5-*`; relaciones añadidas sin alterar las anteriores |
| Estilos, numbering, propiedades y otros miembros | Binariamente idénticos a la fuente; no se añadieron estilos globales |
| Diferencias sustantivas fuera de alcance | Ninguna en la comparación realizada |

La excepción en document.xml comprende la inserción autorizada, resultados/formato de índices, 167 bookmarks nuevos asociados y eliminación de `pgNumType start=1` de la sección final para continuar la paginación al introducir láminas. Los formatos de láminas y márgenes nuevos se limitan al capítulo V. No se importa el documento reserializado completo de Word.

En el temporal guardado por Word se observó un párrafo previo con texto no idéntico al original; **no se importó**. Se mantiene su XML original, respaldado por la comprobación canónica. El detalle se registra en `render-indices.json`; no se usa la copia temporal de Word como entrega.

## 3. Índices y paginación

Word COM actualizó únicamente un índice general y dos índices de ilustraciones, preservando sus instrucciones TOC existentes. Se comprobó cada uno de los **167 PAGEREF** contra la página del bookmark en la copia abierta sin guardar. No se detectaron anchors ausentes ni bookmarks duplicados en la comprobación final. El PDF no muestra errores de marcador de índice.

Las 24 entradas nuevas (tablas 33–43 y figuras 6–18) se ajustaron localmente a 11 puntos, alineación izquierda y tabulación derecha con puntos guía para separar títulos largos de la página; no se alteraron estilos globales ni entradas antiguas para esta mejora de legibilidad. Los captions nuevos usan SEQ Tabla/Figura. Los paneles de continuación no incrementan SEQ ni duplican entradas del índice.

Fuente renderizada: **171 páginas**. Copia final: **213 páginas**. Capítulo V inicia en PDF **166**; 5.11 en **206**; referencias en **207**. El capítulo V concluye con unas líneas en 207 antes de REFERENCIAS. Los índices actualizados ocupan PDF 2–9; capítulo III inicia en 87 frente a 86 de la fuente por la redistribución de índices. Las referencias conservan texto, autores, años, DOI y formato; no se exige paginación idéntica.

## 4. Render y revisión visual real

Microsoft Word abrió fuente y copia con ReadOnly para `ExportAsFixedFormat` y cerró con `Close(False)`. Solo se guardó el DOCX temporal para actualizar índices; se extrajeron de él únicamente los elementos autorizados. Se verificó de nuevo el hash de la fuente después del render.

Se revisaron láminas de contacto de PDF **1–13 y 165–208**, incluidos todos los folios que contienen la inserción, tablas multipágina y límites. Se inspeccionaron vistas ampliadas de índices (6, 8, 9), nota/inicio, balance y límite con referencias (206–207), y los diagramas nuevos a través de sus paneles. También se inspeccionaron las comparaciones lado a lado:

| Objeto previo | Fuente PDF | Copia PDF |
|---|---:|---:|
| Figura 1 | 20 | 21 |
| Figura 2 | 58 | 59 |
| Figura 3 | 91 | 92 |
| Figura 4 | 100 | 101 |
| Ecuación | 111 | 112 |
| Figura 5 | 117 | 118 |

En las vistas finales revisadas no se observó recorte de diagramas ni pérdida visible de contenido. Los captions y notas se separan de las imágenes; se corrigieron problemas de densidad, etiquetas de guardas y render encontrados durante la preparación. Las figuras 8, 9, 11, 12, 13 y 15 se dividieron en paneles. Las láminas densas usan A3 horizontal; el panel PDF de figura 9 ajusta únicamente sus márgenes verticales. La comprobación no incluye una impresión física ni lectura exhaustiva de cada celda anterior; no equivale a certificación independiente de UML 2.x. No se introdujo paralelismo para aparentar cobertura de la rúbrica.

Artefactos: PDF final y vistas en este directorio; PDF de fuente preservada en `C:/Users/Ignacia/AppData/Local/Temp/opencode/cap5-fuente-preservada.pdf`. `comparacion-render.json` documenta su SHA y modo de apertura. Las fuentes/figuras técnicas no son capturas funcionales.

## 5. Evidencia y límites preservados

- Código implementado no acredita ejecución ni despliegue. Primera escena dibujada demo; PDF con generación inicial y respaldo; continuación con guardas/contexto/reintentos y guardado sucesivo. Voz real flutter_tts coexiste con callback demo.
- Quiz: cinco preguntas/cuatro alternativas; cinco selecciones juntas; corrección en servidor, 0–5 y `round(aciertos/5*100)`, explicaciones finales. RF-22, RF-26 y RNF-14 permanecen como brechas; no se modifican requisitos para aparentar cumplimiento.
- RLS y `verify_jwt=true` se describen como definiciones locales; no se acreditan políticas remotas, persistencia transaccional integral, archivos crudos inmutables, metadatos experimentales completos ni seguridad web 19(d). CORS observado usa `*`.
- 225 pruebas: resultado histórico del log de 08/10, Flutter 3.47.7/Dart 3.13.5; 24 archivos, 146 test y 79 testWidgets en inspección. Sin hash del snapshot probado; no se atribuye el resultado a HEAD 9133101. Mocks/fakes no prueban APIs reales.
- Smoke 7/7: atribuido al informe local de 07/10, sin log original independiente cotejado; no E2E UI–IA–Quiz. Scripts y dos Deno.test se distinguen de resultados de ejecución no disponibles.
- Ficha del tesista: generar-escena, escena 4, gemini-3.5-flash-lite según log declarado, HTTP 200, versión 7, 2402 ms de ejecución de función. Log original no inspeccionado; no inferencia aislada, espera total, costo, RNF, calidad, resultado educativo ni parte de las 108 solicitudes comparativas futuras. No se insertaron IP, usuarios, sesiones o credenciales.
- Repo: remoto candidato, historia local de 19 commits, HEAD y tag observados. La consulta pública devolvió 404: no acceso público, sin afirmar inexistencia o privacidad. Código Quiz integrado en workspace no presente en HEAD inspeccionado; enlace final, publicación actual e historia original del ZIP pendientes.
- Sin resultados educativos: se conservan cuantitativa/aplicada/descriptiva, diseño preexperimental de un grupo, pre/post futuros sin control ni causalidad exclusiva; 55 como población prevista y muestra pendiente. PC Windows; iterativo e incremental. Candidatos, pesos y matrices experimentales pendientes sin ganador.

## 6. Balance 12–20 y revisión independiente

12: modelado institucional completo y denominador pendientes. 13: matriz de los 32 RF y CU con actores, pero instrumentos y paquete completo de cada CU pendientes. 14: núcleo de clases/secuencias/estados documentado, no cobertura exhaustiva. 15: datos locales documentados; remoto, inmutabilidad y metadata pendientes. 16: componentes/topología configurada/paquetes, no hardware ni RNF remoto probados. 17: trazabilidad tecnológica, no cadena educativa negocio–VI–VD validada. 18: correspondencia/procedencia explicitadas, repositorio final pendiente. 19: alcance/contratos/estados reales, con brechas y capturas pendientes. 20: pruebas históricas y atribuidas clasificadas, E2E y capturas pendientes.

No se asignan notas ni se registra APROBADO. **No se pudo ejecutar una revisión independiente con otra identidad o herramienta de reviewer en esta sesión.** `revision-independiente-pendiente.md` prepara el contraste posterior sin presentarlo como realizado. MEMORY registra edición y comprobaciones del editor, no cierre ni aprobación final. Después de esta unidad se detiene el trabajo.

## 7. Ciclo 2 — tres hallazgos del dictamen independiente

**Dictamen recibido:** CAMBIOS NECESARIOS, comunicado por el usuario en la instrucción de este ciclo. El revisor corroboró el resto de la entrega según esa comunicación. No se inventan identidad, método o fecha de su revisión. Esta sección registra únicamente la corrección autorizada y las comprobaciones del editor; la **segunda revisión independiente permanece pendiente**.

### 7.1. Cambios exactos

1. **Tabla 38, sección 5.5, fila quiz_intentos, PDF 194.** Se sustituyó exclusivamente «FK cuento, estudiante y aula nullable» por **«FK cuento y estudiante NOT NULL; FK aula nullable»**, según las líneas 10–12 de `supabase/migrations/20261008100000_quiz_comprension.sql`. No se modificó SQL ni figura 15(b), que ya era correcta.
2. **Figura 13(a), PDF 188.** Se sustituyó la entrada única a Carga por inicio → pseudestado de elección `Inicio`, con dos guardas excluyentes. `[resultadoInicial != null]` conduce a Resultado, asignando `_resultado`, `_intentoId` y `_cargando=false`; `[resultadoInicial == null]` conduce a Carga e invoca `_iniciarQuiz()`. Corresponde a `quiz_view.dart:47–55`, sin invocar la carga en la rama de resultado suministrado.
3. **Figura 13(a), Respondiendo.** El autobucle que cruzaba el texto se sustituyó por tres transiciones internas separadas en el compartimento del estado: selección, siguiente y anterior, con sus guardas y asignaciones existentes (`quiz_view.dart:96–131`). Se explicitan los alias en la leyenda; no se añaden estados de dominio ni salidas/reentradas ficticias. Se conservó **Arial y defaultFontSize 18** en PlantUML: el cruce se elimina mediante redistribución, no reduciendo la fuente para ocultarlo.

El único cambio de `capitulo-v.md` es la frase de tabla 38. Solo se regeneró la fuente/imagen `13-estados-quiz-imagen.puml/.png`; no se regeneraron ni corrigieron los otros 18 recursos de panel. No se cambió el cuerpo de ninguna otra sección o capítulo.

### 7.2. Hashes y comprobaciones actuales

| Elemento | SHA-256 |
|---|---|
| Fuente preservada antes/después | `89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80` |
| DOCX anterior, ciclo 1 | `f828f5cc56fa2a653cdd308abb79cfe7c57729e3e750c4ea2b57e0ff920d33cb` |
| DOCX actual, ciclo 2 | `011399a5c4d782dc48149568e96c0556d4e03c9263b804a9625de2f248049e80` |
| PDF anterior, ciclo 1 | `bbd6764bec2182654f8c339974ab2aca2e3e39e4a3fb9d991292fa5b0dd252e4` |
| PDF actual, ciclo 2 | `6bbe6afc1e525bd13e9a275d4fcb7ae6c633b7fd2aa45a5d94c705db0856bea9` |

Antes de editar se confirmaron los hashes de entrada y se creó respaldo en el temporal autorizado: `C:/Users/Ignacia/AppData/Local/Temp/opencode/cap5-ciclo2-base.zip`. `ciclo2-antes.json` registra su ubicación y SHA. `ciclo2-delta.json` contrasta esta copia con la primera entrega:

- **1236 bloques fuera de índices**, incluido todo el capítulo V: solo cambian el bloque de tabla 38 y las dimensiones del párrafo de la imagen 13(a), neutralizando únicamente bookmarks `_Toc` asociados.
- Solo dos miembros del DOCX cambian frente al ciclo 1: **`word/document.xml`** y **`word/media/cap5-13-estados-quiz-imagen.png`**. El inventario de miembros permanece igual.
- Relaciones, estilos, numbering, propiedades y demás miembros, incluidos **los otros 18 paneles**, son binariamente idénticos a la primera entrega.
- Se repitió la comprobación frente a la fuente: **1072 bloques previos**, **32 tablas anteriores**, **figuras 1–5**, ecuación y referencias preservados; ninguna diferencia sustantiva fuera del alcance autorizado.
- Se actualizaron únicamente los tres índices en el temporal de Word, transfiriendo resultados y bookmarks asociados; no se actualizan globalmente citas/bibliografía ni se importa el DOCX reserializado completo.
- **167 PAGEREF** nuevamente cotejados con las páginas de bookmarks; sin anchors ausentes, duplicados o errores de marcador detectados.
- Se mantiene **213 páginas**, capítulo V en **166**, 5.11 en **206**, referencias en **207**, figura 13(a) en **188** y tabla 38 en **194**. No hay cambio global de paginación o numeración.

### 7.3. Render y revisión visual de este ciclo

Se exportó nuevamente la copia mediante Word COM en modo ReadOnly, cerrando sin guardar. Se regeneraron las láminas y vistas `contacto-*`/`detalle-p*`. El editor revisó las **19 páginas de panel**: 170, 175, 176, 177, 179, 180, 181, 183, 184, 186, 187, **188**, 189, 190, 192, 193, 196, 197 y 199; además, tabla 38 en **194**, índices **6/8/9** y límites **165/166/207**. En el panel afectado se observan las dos ramas iniciales y las tres filas internas sin una flecha atravesando selección/siguiente/anterior; no se observó recorte del contenido corregido en las vistas inspeccionadas. No se realizó impresión física.

Para el contraste independiente se generan `ciclo2-comparacion-figura13a.png` y `ciclo2-comparacion-tabla38.png`, a partir del PDF anterior respaldado y del actual. **La comprobación visual anterior es del editor, no un nuevo dictamen independiente**; el segundo revisor deberá confirmar la semántica y legibilidad del panel y la corrección de la fila.

No se modificaron código, migraciones, otros capítulos, otras figuras ni pendientes; no se ejecutaron pruebas del producto, proveedores, despliegues, experimentos, commit o push. Se conserva el sentido de 404 como falta de acceso público, sin afirmar privacidad/inexistencia, y todos los límites anteriores. MEMORY se amplía con los hechos del ciclo. **Estado: correcciones aplicadas; listo para segunda revisión, sin registrar APROBADO ni cerrar otras tareas.**

### 7.4. Cierre administrativo — dictamen independiente final del 09/10/2026

**Estado final de CAP5-AVANCE ciclo 2: APROBADO EN ALCANCE DOCUMENTAL**, conforme al dictamen de la segunda revisión independiente comunicado por el usuario. Quedan resueltos los tres hallazgos documentales: nulabilidad de tabla 38, elección inicial de figura 13(a) y legibilidad de sus transiciones. Las menciones anteriores de revisión pendiente corresponden a los estados históricos de preparación y edición; no describen el estado final de esta unidad.

El dictamen se registra sin inventar identidad o método del revisor, sin reejecutar la revisión y sin atribuirlo al editor. **No implica aprobación del asesor, examen, tesis completa o rúbrica íntegra.** Se mantienen los resultados documentales ya comprobados: **213 páginas, 167 PAGEREF correctos y 1072 bloques previos preservados**, con fuente intacta.

Entregables conservados, cuyos SHA-256 se comprobaron antes y después del cierre:

- DOCX: `011399a5c4d782dc48149568e96c0556d4e03c9263b804a9625de2f248049e80`.
- PDF: `6bbe6afc1e525bd13e9a275d4fcb7ae6c633b7fd2aa45a5d94c705db0856bea9`.
- Fuente: `89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80`.

No se modificaron ni se rerenderizaron DOCX/PDF/figuras; no se reejecutaron las comprobaciones estructurales o del producto. Este cierre modifica únicamente MEMORY y los cierres administrativos autorizados de este informe y del paquete, manteniendo el historial.

**Pendientes conservados:** 12, modelado institucional; 13, CU completamente modelados; 15, verificación remota/metadatos; 18, repositorio definitivo; 19, capturas y brechas RF-22/RF-26/RNF-14; 20, E2E. Los demás límites anteriores permanecen. **Artículo: siguiente tarea, no iniciado.** No se inicia otra unidad ni se modifica el plan de correcciones.
