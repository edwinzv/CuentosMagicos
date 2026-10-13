# MEMORY.md — Cuentos Mágicos

## Última actualización

Pendiente de auditoría inicial completa.

---

## 1. Estado general

Cuentos Mágicos es un proyecto de tesis y aplicación educativa.

Existe actualmente una aplicación Flutter desarrollada principalmente para Windows.

El siguiente objetivo técnico es analizar la posibilidad de adaptar el producto a móvil sin reconstruir innecesariamente funcionalidades existentes.

---

## 2. Tecnologías conocidas

- Flutter
- Dart
- Supabase
- PostgreSQL
- Gemini API
- Git
- GitHub

---

## 3. Arquitectura documentada

Patrón:

**MVC + Services + Repository**

### Views

- HomeView
- DrawView
- DocumentView
- NameView
- StoryView
- QuizView
- FinalView

### Controllers

- AppController
- StoryController
- QuizController
- PDFController

### Models

- Estudiante
- Cuento
- Escena
- Evaluación
- Pregunta

### Services

- AIService
- ImageService
- VoiceService
- DocumentService
- PDFService
- StorageService

### Repositories

- CuentoRepository
- EvaluacionRepository

---

## 4. Funcionalidades documentadas

### Creación de cuento

- creación desde dibujo;
- creación desde PDF;
- ingreso del nombre del personaje;
- generación de cuento personalizado;
- generación de imagen.

### Interacción

- visualización de escenas;
- narración;
- selección de alternativas;
- registro de decisiones;
- generación de continuación narrativa.

### Evaluación

- generación de preguntas;
- respuesta del estudiante;
- evaluación;
- retroalimentación;
- cálculo de resultado.

### Finalización

- registro de evaluación;
- resultado final;
- generación de PDF.

---

## 5. UML documentado

### Caso de uso del negocio

Proceso de actividad de lectura y comprensión.

### Diagramas de actividades

- DA-01 Crear cuento.
- DA-02 Interacción con el cuento.
- DA-03 Evaluación y cierre.

### Diagramas de secuencia

Existen diagramas para:

- creación desde dibujo;
- creación desde PDF;
- evaluación;
- generación de PDF final.

---

## 6. Observaciones académicas conocidas

Pendiente verificar en la tesis actual:

- falta de cuantificación local del diagnóstico;
- falta de estimación detallada del uso de IA;
- falta de análisis costo-beneficio;
- falta de magnitudes cuantitativas en algunos antecedentes;
- falta de matriz comparativa de soluciones;
- falta de requisitos de calidad medibles.

---

## 7. Estado de auditoría

### Tesis

PENDIENTE.

### Código

PENDIENTE.

### Arquitectura real

PENDIENTE.

### Compatibilidad móvil

PENDIENTE.

### Trazabilidad tesis-producto

PENDIENTE.

---

## 8. Repositorio

El proyecto actual corresponde a una copia experimental utilizada para probar un flujo de trabajo con agentes de IA.

El repositorio original del proyecto de tesis debe mantenerse independiente.

---

## 9. Siguiente paso

Ejecutar una auditoría inicial completa.

Precisión del siguiente paso específico para DT-03 y DT-04: PLANIFICAR los cambios concretos en la tesis a partir de las decisiones registradas, antes de editarla. Esta prioridad específica no elimina la agenda general histórica ni declara completada la auditoría inicial.

La auditoría debe responder:

1. ¿Qué funcionalidades están realmente implementadas?
2. ¿Qué funcionalidades están incompletas?
3. ¿La arquitectura implementada coincide con la arquitectura documentada?
4. ¿Qué partes dependen de Windows?
5. ¿Qué puede reutilizarse en móvil?
6. ¿Qué partes de la tesis requieren corrección?
7. ¿Existe coherencia entre tesis y producto?
8. ¿Qué información necesita proporcionar el tesista?

---

## Registro administrativo decisiones DT-03 y DT-04

Registro autorizado únicamente en MEMORY.md y en los bloques DT-03 y DT-04 de docs/plan-correcciones-tesis.md. No se ha aplicado ninguna de estas correcciones a la tesis ni se registra aprobación del asesor, fecha de cierre o validación del reviewer.

### DT-03 — Diseño formal de investigación

- **Disponibilidad:** decisión resuelta; edición de la tesis y validación pendientes.
- **Decisión:** enfoque cuantitativo; tipo de investigación aplicada; alcance descriptivo; diseño preexperimental de un solo grupo. Se aplicarán pretest y postest a los mismos estudiantes, sin grupo de control ni grupo de comparación. Las mediciones son futuras: no se afirma que el pretest se haya aplicado. La muestra continúa pendiente en DT-05. No se atribuirá causalidad exclusiva a la aplicación y deberán explicitarse las limitaciones del diseño.
- **Estado:** DECISIÓN RESUELTA; CORRECCIÓN PENDIENTE DE APLICACIÓN Y VALIDACIÓN.

### DT-04 — Formulación de mejora frente a cambios

- **Disponibilidad:** decisión de formulación resuelta y decisión de DT-03 registrada; edición de la tesis y validación pendientes.
- **Objetivo general:** Determinar en qué medida una aplicación educativa de escritorio basada en gamificación mejora la comprensión lectora de los estudiantes de educación primaria del Scorza College.
- **Cuarto objetivo específico:** Evaluar la variación en la comprensión lectora de los estudiantes mediante la comparación de los resultados obtenidos antes y después de utilizar la aplicación educativa de escritorio basada en gamificación, para establecer si se registra una mejora y en qué medida.
- **Decisión:** los tres primeros objetivos específicos permanecen sin cambios. La mejora es una finalidad por evaluar y no un resultado demostrado. Se mantienen las mediciones futuras a los mismos estudiantes, la ausencia de control o comparación, DT-05 pendiente y los límites de inferencia de DT-03, sin causalidad exclusiva.
- **Estado:** DECISIÓN RESUELTA; CORRECCIÓN PENDIENTE DE APLICACIÓN Y VALIDACIÓN.

**Siguiente etapa:** PLANIFICAR los cambios concretos antes de editar la tesis. La aplicación y la validación siguen pendientes; DT-03 y DT-04 no se cierran y no se continúa con otras correcciones.

## Integración autorizada de la aplicación — 8 de octubre de 2026

- Fuente: ZIP `C:/Users/Ignacia/Downloads/tesis-investigacion-main (2).zip`, proporcionado por el usuario como descarga reciente del repositorio de su hermano. No se dispone del SHA del commit original; no se atribuye uno.
- Plan aprobado explícitamente por el usuario. Se incorporaron 29 archivos nuevos y se reemplazaron 27 archivos distintos en lib/, test/, scripts/, supabase/, pubspec.yaml, pubspec.lock y .gitignore.
- Se conservaron las reglas locales de .gitignore para los artefactos privados de experiments/model_comparison y se excluyeron los respaldos de integración.
- Respaldo de los archivos reemplazados y manifiesto: `backups/integracion-app-20261008-224123/`. El manifiesto indica también qué archivos eran nuevos y sus hashes SHA-256.
- Verificación: los 55 archivos importados distintos de .gitignore coinciden por SHA-256 con el ZIP. .gitignore se combinó intencionalmente con reglas locales.
- Se preservaron los documentos de tesis, docs/, PROJECT.md, AGENTS.md y los cambios académicos previos. MEMORY.md se amplía con este registro, sin reescribir decisiones anteriores.
- La versión incorpora Quiz, historial y componentes del panel docente, nuevas funciones y migración de Quiz, y pruebas adicionales. Su presencia en código no acredita despliegue remoto ni ejecución satisfactoria.
- `flutter pub get` no pudo resolver dependencias: Dart instalado 3.12.2 frente al requisito ^3.13.5 del proyecto. El comando sugirió Flutter 3.47.7; esa sugerencia no se aplicó ni se verificó mediante instalación.
- Análisis y pruebas Flutter pendientes por incompatibilidad de SDK. No se modificó el requisito de Dart ni se actualizó el SDK global.
- No se ejecutaron migraciones, despliegues de Supabase, llamadas a proveedores de IA ni pruebas con datos de estudiantes. No se creó commit ni se realizó push.
- Siguiente paso recomendado: usar un SDK Flutter compatible con Dart ^3.13.5 y ejecutar flutter pub get, flutter analyze y flutter test. Después verificar por separado el entorno Supabase de pruebas. La integración de archivos queda terminada; la validación ejecutable sigue pendiente.

## SDK compatible y validación posterior de integración — 8 de octubre de 2026

- Instalado Flutter 3.47.7 desde el tag oficial de https://github.com/flutter/flutter.git en `E:/Ale/Android/Flutter-3.47.7`, commit `abaf9c523780a608bd46686fd5e53740a07077f8`. `flutter --version` confirmó Dart 3.13.5. Se conserva el SDK anterior y no se cambió el PATH global.
- Se utilizó la ruta absoluta `E:/Ale/Android/Flutter-3.47.7/bin/flutter.bat` para las comprobaciones. El bloqueo por versión de Dart del registro anterior queda resuelto para esta instalación.
- `flutter pub get`: correcto. `flutter analyze --no-pub`: No issues found. `flutter test --no-pub --reporter compact`: 225 pruebas aprobadas.
- El primer análisis incluyó las copias parciales del respaldo. Se añadió únicamente `backups/integracion-app-20261008-224123/analysis_options.yaml` con exclusión de su contenido; el análisis posterior pasó. No se alteró código de aplicación para corregir estos falsos problemas del respaldo.
- Evidencia de pruebas: `backups/integracion-app-20261008-224123/flutter-test.log`.
- Estas comprobaciones no acreditan despliegue remoto, funcionamiento de APIs reales, compilación Windows ni resultados educativos. No se ejecutaron migraciones ni despliegues remotos.
- Siguiente paso: usar esta ruta de Flutter para trabajar; verificar el entorno de pruebas y planificar la comparación de modelos por separado.

## CAP3-REV — Edición autorizada del capítulo 3 — 9 de octubre de 2026

- Unidad única de cinco ajustes aprobados por el usuario. Se leyeron AGENTS, PROJECT, MEMORY, README, la rúbrica del segundo examen y el texto/código pertinente. Para esta tarea prevaleció `tesis/tesis_actual2_entrega_docente_revision_docente.docx`; no se modificó `tesis/tesis_actual.docx` ni otros originales.
- Se creó `tesis/tesis_parcial2_cap3_revisado.docx` con cambios textuales localizados en 50 párrafos existentes exclusivamente de capítulo III. Se distinguieron arquitectura objetivo y correspondencia real, avance de incrementos y actividades previstas, contrato/corrección de Quiz y brechas RF-22/RF-26/RNF-14. Se conservaron los candidatos, pesos, escalas, 108 solicitudes futuras y matrices sin resultados; no se declaró ganador.
- Código comprobado: `_HomeRouterState` integra navegación, StoryController, servicios y repositorios; primera escena dibujada demo, PDF con análisis y solicitud de escena inicial con respaldo, continuaciones reales; QuizView conserva/envía cinco selecciones, SupabaseQuizService invoca generar-quiz/enviar-quiz, corrección y puntaje 0–5 y porcentaje round(aciertos/5*100) en servidor, explicaciones finales e historial consultado por QuizRepositorySupabase. AuthGate distingue roles; panel docente consulta aulas/matrículas, registra estudiantes y consulta resultados, sin acreditar CRUD completo de aulas.
- Se creó `docs/evidencia-funcional-generar-escena-20261009.md`, referenciada en 3.5, como transcripción saneada de evidencia suministrada por el tesista: escena 4, modelo gemini-3.5-flash-lite según log de aplicación declarado, HTTP 200, versión 7, execution_time_ms 2402. No se inspeccionó el log original ni se ejecutó una prueba remota; el tiempo es ejecución de función, no inferencia aislada ni espera total. No se crea capítulo 5.
- Se mantuvieron cuantitativa/aplicada/descriptiva y diseño preexperimental de un grupo, pretest/postest futuros, sin control ni causalidad exclusiva. Los 55 estudiantes son población prevista, no muestra confirmada; muestra pendiente. Desarrollo iterativo e incremental, sin convertirlo en marco ágil ni inventar semanas.
- Integridad: SHA-256 original antes/después `0b0aec9a308940e24a95541181a226693f1c12bc1fd9b79e51a76aacc9bc52b6`; copia `89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80`. Solo cambió el miembro ZIP document.xml; subárboles fuera de capítulo III, tablas completas, propiedades, OMML, dibujos y relaciones conservados.
- Word COM renderizó ambos documentos en modo solo lectura, sin guardar. Se revisaron láminas de contacto de original PDF 85–159 y copia PDF 85–164 y vistas ampliadas de figuras 3–5, ecuación, Quiz, nota, metodología y límite con referencias. No se observó corte/deformación de figuras o ecuación ni pérdida visible de texto; la comprobación visual general de tablas no fue celda por celda. Original 165 páginas, copia 171; referencias pasan de PDF 159 a 164 por redistribución, sin cambiar contenido. Detalle en `docs/validacion-cap3-rev-20261009.md`; renders y comprobaciones en el temporal externo preaprobado.
- Se preservaron cambios dirty previos; no se modificaron código, Supabase, experimentos, plan de correcciones, auditoría ni verificación de fuentes. MEMORY solo se amplió con este registro. No se ejecutaron llamadas IA, pruebas educativas, commit ni push.
- Pendientes: RF-22 sin dimensión explícita/cobertura validada y adecuación del prompt de cuarto grado a cuarto–sexto; RF-26 con feedback final frente al requerido antes de avanzar; RNF-14 con llamadas directas desde TeacherHomeView; primera escena dibujada personalizada y PDF final integral; respaldo de modelos, rúbricas humanas, mediciones, cronograma, instrumentos y baterías RNF. No se resuelven en esta unidad.
- Siguiente paso: revisión independiente de la copia, ficha y validación. Edición realizada, sin aprobación final ni cierre de otras tareas; detenerse después de esta unidad.

## CAP5-AVANCE — inserción autorizada del avance de implementación — 9 de octubre de 2026

- Unidad única expresamente aprobada por el usuario. Se leyeron AGENTS, PROJECT, MEMORY, README, rúbrica pp. 4–6 (criterios 12–20), validación CAP3 y ficha funcional, además del código, migraciones, pruebas/log histórico y procedencia local pertinentes.
- Fuente preservada: `tesis/tesis_parcial2_cap3_revisado.docx`, SHA-256 antes/después `89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80`. Se creó `tesis/tesis_parcial2_cap3_cap5_avance.docx`, SHA-256 `f828f5cc56fa2a653cdd308abb79cfe7c57729e3e750c4ea2b57e0ff920d33cb`.
- Se insertó CAPÍTULO V: IMPLEMENTACIÓN — AVANCE DEL PROTOTIPO entre III y REFERENCIAS: nota de IV PENDIENTE, 5.1–5.11, tablas 33–43 y figuras 6–18 en 19 paneles. Se distinguen diseño previsto, código implementado, demo/fallback y ejecución documentada. No se creó IV ni se renumeraron capítulos anteriores.
- Apoyos nuevos y render: `docs/cap5-avance/`, con fuentes PlantUML, figuras, texto de inserción, scripts y comprobaciones. Informe `validacion.md`; paquete `revision-independiente-pendiente.md`. No se incorporaron los Mermaid desactualizados de semana 8 ni capturas funcionales inexistentes.
- Comprobación OOXML: 1072 bloques previos preservados fuera de índices, neutralizando bookmarks `_Toc` asociados y continuidad de página final; 32 tablas previas, figuras 1–5, ecuación, referencias y recursos originales conservados. Solo cambian los miembros originales document.xml y document.xml.rels; 19 PNG nuevos. Estilos/numbering/otros miembros intactos. No se importa el DOCX reserializado completo de Word.
- Se actualizaron los tres índices, sin actualización global de campos de citas/bibliografía; 167 PAGEREF cotejados con bookmarks/páginas, sin duplicados ni errores de marcador en el render final. Las 24 entradas nuevas de tablas/figuras reciben formato local legible; no se cambian estilos globales.
- Word COM renderizó fuente (171 páginas) y copia (213) en modo solo lectura y sin guardar. Capítulo V inicia en PDF 166, balance 5.11 en 206, referencias en 207. Se revisaron contactos PDF 1–13/165–208, detalles de diagramas/índices/límites y comparaciones lado a lado de figuras 1–5 y ecuación. Láminas densas nuevas en A3 horizontal; panel PDF con margen vertical propio. No se hizo impresión física ni aprobación independiente de UML.
- Se documentaron brechas sin resolverlas: negocio institucional y denominador pendientes; CU no todos completamente modelados; RF-22/RF-26/RNF-14; dibujo inicial demo y PDF final pendiente; RLS/JWT locales frente a remoto no acreditado, CORS '*', guardados sucesivos sin transacción integral, crudos/metadatos experimentales no asegurados.
- Se mantuvieron PC Windows y desarrollo iterativo e incremental; cuantitativa/aplicada/descriptiva, preexperimental de un grupo, pre/post futuros sin control ni causalidad exclusiva, 55 como población prevista y muestra pendiente. Candidatos, pesos y matrices pendientes sin ganador.
- Las 225 pruebas se citan como resultado histórico de 08/10, no resultado de HEAD ni E2E remoto. Smoke 7/7 se atribuye al informe local; scripts y Deno.test sin ejecución acreditada. La ficha generar-escena se atribuye al tesista: log original no inspeccionado, 2402 ms de función, no costo/RNF/benchmark/efecto educativo. Repo final, acceso público y código vigente publicado pendientes; 404 no demuestra privacidad o inexistencia.
- No se modificaron código, migraciones, Supabase, experimentos, artículo, otros originales, plan de correcciones, auditoría, verificación de fuentes ni docs históricos. Se conservaron cambios dirty previos; no tests innecesarios, proveedores IA, despliegues, commit ni push.
- Estado real: **EDICIÓN REALIZADA; COMPROBACIONES DEL EDITOR EJECUTADAS; REVISIÓN INDEPENDIENTE PENDIENTE**. No se disponía de herramienta/identidad de reviewer independiente en esta sesión; no se registra APROBADO ni se cierra otra tarea. Siguiente paso: revisión independiente del paquete, sin introducir cambios fuera de la unidad. Detenerse.

## CAP5-AVANCE — ciclo 2, tres hallazgos del reviewer — 9 de octubre de 2026

- El usuario comunicó dictamen independiente **CAMBIOS NECESARIOS**, limitado a tres hallazgos, con corroboración del resto; autorizó exclusivamente su aplicación y actualización de apoyos/índices/render/hashes/MEMORY. No se inventan datos del revisor ni se registra aprobación del nuevo archivo.
- Se verificaron los hashes de entrada (fuente `89d063...`, copia `f828f5...`, PDF `bbd676...`) y se respaldó la primera entrega en `C:/Users/Ignacia/AppData/Local/Temp/opencode/cap5-ciclo2-base.zip`; manifiesto `docs/cap5-avance/ciclo2-antes.json`.
- **Hallazgo 1:** tabla 38, 5.5, fila quiz_intentos, PDF 194: solo se cambió a «FK cuento y estudiante NOT NULL; FK aula nullable», conforme a SQL:10–12. Figura 15(b) y migración intactas.
- **Hallazgo 2:** figura 13(a), PDF 188: inicio → pseudestado de elección; con resultadoInicial → Resultado, asignando _resultado/_intentoId y _cargando=false; sin resultadoInicial → Carga, invocando _iniciarQuiz(). Corresponde a quiz_view.dart:47–55.
- **Hallazgo 3:** el autobucle de Respondiendo se redistribuyó en tres transiciones internas separadas con las guardas/asignaciones reales de quiz_view.dart:96–131. Se conserva Arial/defaultFontSize 18 en la fuente; no se añaden estados de dominio ni se reduce la fuente para ocultar el cruce.
- Se actualizaron `capitulo-v.md` únicamente en esa frase, el `.puml/.png` afectado, la copia DOCX, índices, PDF, comprobaciones y apoyos de ciclo 2. `validacion.md` conserva el antecedente del ciclo 1 y registra resultados actuales en sección 7; paquete de segunda revisión actualizado.
- Integridad frente a la primera entrega: 1236 bloques fuera de índices cotejados; solo cambia el bloque de tabla 38 y las dimensiones del párrafo de imagen 13(a). Solo cambian document.xml y el PNG 13(a); relaciones/estilos/numbering/otros miembros y los otros 18 paneles binariamente idénticos. Markdown del capítulo V tiene una sola sustitución de frase. Detalle: `ciclo2-delta.json`.
- Se repitieron comprobaciones frente a la fuente: 1072 bloques previos, 32 tablas anteriores, figuras 1–5, ecuación y referencias preservados; tres índices actualizados y 167 PAGEREF correctos. Se mantiene 213 páginas, capítulo V 166, balance 206 y referencias 207. No actualización global de campos de citas/bibliografía.
- Se renderizó la copia con Word COM ReadOnly/Close(False). Revisión visual **del editor** de los 19 paneles (PDF 170,175,176,177,179,180,181,183,184,186,187,188,189,190,192,193,196,197,199), tabla 38 (194), índices (6/8/9) y límites (165/166/207). En el panel afectado no se observa línea atravesando las filas internas; no impresión física ni nuevo dictamen independiente. Comparaciones ciclo1/ciclo2 preparadas para el reviewer.
- SHA-256 fuente antes/después: `89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80`. Copia actual: `011399a5c4d782dc48149568e96c0556d4e03c9263b804a9625de2f248049e80`. PDF actual: `6bbe6afc1e525bd13e9a275d4fcb7ae6c633b7fd2aa45a5d94c705db0856bea9`.
- No se corrigió nada más, ni código/migraciones/Supabase/experimentos/docs históricos/otros capítulos/plan. Sin pruebas del producto, proveedores, despliegues, commit ni push. Se conserva 404 solo como falta de acceso público y todos los pendientes anteriores.
- Estado: **TRES HALLAZGOS APLICADOS; COMPROBACIONES DEL EDITOR EJECUTADAS; SEGUNDA REVISIÓN INDEPENDIENTE PENDIENTE**. No se registra APROBADO antes del nuevo dictamen ni se cierra otra unidad. Siguiente paso: segunda revisión de los fragmentos y hashes entregados; detenerse.

## CAP5-AVANCE — cierre administrativo tras revisión independiente final — 09/10/2026

- El usuario comunicó el dictamen de la **segunda revisión independiente: APROBADO, CAP5-AVANCE ciclo 2, 09/10/2026**, en alcance documental. Se registra ese dictamen real comunicado; no se inventan identidad o método del revisor ni se presenta este cierre como una nueva revisión ejecutada por el editor.
- Los tres hallazgos quedan resueltos documentalmente: tabla 38 con nulabilidad correcta de las FK; figura 13(a) con elección inicial y rutas excluyentes; legibilidad de las transiciones de Respondiendo. Los estados PENDIENTE de los registros anteriores son históricos y quedan resueltos únicamente para esta revisión y unidad.
- Entregable aprobado: `tesis/tesis_parcial2_cap3_cap5_avance.docx`, SHA-256 `011399a5c4d782dc48149568e96c0556d4e03c9263b804a9625de2f248049e80`. Render aprobado: `docs/cap5-avance/tesis_parcial2_cap3_cap5_avance.pdf`, SHA-256 `6bbe6afc1e525bd13e9a275d4fcb7ae6c633b7fd2aa45a5d94c705db0856bea9`.
- Se conservan las comprobaciones documentales del ciclo 2: 213 páginas, 167 PAGEREF correctos y 1072 bloques previos preservados. Fuente intacta `tesis/tesis_parcial2_cap3_revisado.docx`, SHA-256 `89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80`. No se repitió el render ni se reejecutaron esas comprobaciones estructurales durante el cierre administrativo.
- Se comprobaron los hashes de fuente, DOCX y PDF antes y después del cierre; permanecen idénticos. No se tocaron DOCX, PDF, figuras, código, migraciones, otros apoyos, plan de correcciones ni documentos históricos. Solo se añade este registro y se actualizan los cierres autorizados del informe y paquete, manteniendo su historial.
- La aprobación es **exclusivamente documental de CAP5-AVANCE ciclo 2**: no implica aprobación del asesor, del examen, de la tesis completa ni cumplimiento íntegro de la rúbrica.
- Permanecen pendientes: criterio 12, modelado institucional respaldado; 13, modelado completo de CU; 15, verificación remota y metadatos experimentales; 18, repositorio definitivo; 19, capturas y brechas RF-22/RF-26/RNF-14; 20, E2E. Los demás límites previos no se resuelven por este cierre.
- **Estado de la unidad: CIERRE ADMINISTRATIVO REGISTRADO — REVISIÓN INDEPENDIENTE FINAL APROBADA EN ALCANCE DOCUMENTAL.** No se cierra otra tarea. El artículo es la siguiente tarea y **no se ha iniciado**; requiere su propia unidad de trabajo. Detenerse.

## Aclaración del estado comparativo — 09/10/2026

- Unidad localizada autorizada por el usuario, sin ID formal comunicado ni cierre de DT-02. Se cotejó directamente `tesis/tesis_parcial2_cap3_cap5_avance.docx` con B725–B753 de la extracción histórica: 29 bloques textualmente coincidentes, desplazados 13 posiciones por índices; no diferencias sustantivas. SHA-256 real de entrada: `011399a5c4d782dc48149568e96c0556d4e03c9263b804a9625de2f248049e80`.
- Solo se aclararon §§3.4.3/3.4.4, tablas 19/20 y 3.5: protocolo no ejecutado, 108 solicitudes base previstas, estados explícitos sin resultados, puntuaciones/orden/elegibilidad pendientes, ausencia de ganador y límites de evidencia funcional. La entrega no acredita cumplimiento íntegro de la observación; ejecución sujeta a autorización operativa/económica independiente.
- Se conservaron candidatos, indicadores, pesos, escalas, fórmula, descripción de fallos/banderas, atribución funcional y cambios previos de CAP5. Solo cambia document.xml: ocho bloques sustantivos y 13 números PAGEREF en dos bloques de índices; 1247 bloques intactos. Estructura y formato OOXML, OMML, recursos y demás miembros ZIP conservados. No se actualizaron citas/bibliografía globalmente.
- Word COM renderizó sin guardar el documento; PDF de 213 páginas en temporal. Inspección visual del editor de PDF 110–114: tablas y ecuación legibles, tabla 19 densa con escaso espacio entre columnas, sin recorte observado; nota de tabla 20 continúa en página siguiente. No impresión física ni dictamen independiente. Se cotejaron 167 PAGEREF con bookmarks para la paginación.
- SHA-256 final DOCX: `bb20e3637004608ec933174670e5574bb3eda976aab3a4ae1a5be52f3bd85df0`. PDF temporal: `e809db2ea1f63149c8f4759da6b6a4d784abaab0d5aab730b5454b902f5750f0`. Respaldo `comparativo-antes.docx`, diff, scripts, render y validación `comparativo-*` en `C:/Users/Ignacia/AppData/Local/Temp/opencode/`.
- No se modificaron tesis_actual, CURRENT, fuentes PDF, registros/apoyos históricos CAP5, código, protocolo, metodología educativa, artículo ni plan de correcciones. Sin benchmark, APIs, red, gasto, lectura de secretos, commit o push. Solo DOCX y este registro mínimo en el repositorio. Estado: **EDICIÓN REALIZADA; REVISIÓN INDEPENDIENTE PENDIENTE**. La aprobación histórica CAP5 no se extiende a esta unidad. Siguiente paso: revisión independiente del fragmento y comprobaciones; detenerse.

## conjunto8observaciones — paquete documental autorizado — 09/10/2026

- Se ejecutó el paquete aprobado y el desbloqueo Claude exclusivamente sobre `tesis/tesis_parcial2_cap3_cap5_avance.docx`; hash base cotejado `bb20e3637004608ec933174670e5574bb3eda976aab3a4ae1a5be52f3bd85df0`, final `3ab4dae1ac6da1990f5fab193fa8a58e5dced011e853e0a18313f0cb8125013e`. Respaldo, diff, validación y paquete reviewer `conjunto8-*` en `C:/Users/Ignacia/AppData/Local/Temp/opencode/`, sin sobrescribir históricos.
- Ocho estados: **1 PARCIAL**, fichas del servicio con procedencia, internos/complejidad no verificados; **2 PARCIAL**, 45 descriptores literales/aplicabilidad trasladados, agregación casos/salidas pendiente sin resolver; **3 PARCIAL**, tablas 19/20 y 3.5 preservadas sin resultados/ganador, experimento pendiente; **4 PARCIAL**, justificación y programación explícita pendiente sin inventar semanas; **5 PARCIAL**, matriz documental de origen, levantamiento/validación institucional pendientes; **6 PARCIAL**, siete RF precisados según código/condiciones previstas, seguridad/conservación pendientes; **7 PARCIAL**, casos RNF-04/11 esperados y P95 definido, equipos/ejecución/convención pendientes; **8 PENDIENTE**, Gemini sin fuente oficial exacta disponible. No cierre global.
- Claude conserva candidato: JSON solicitado/validación común y razonamiento pendiente; se retira capacidad no acreditada y se documenta discrepancia con thinking=disabled congelado sin modificar protocolo ni escoger configuración. No referencia global eliminada ni cita genérica falsa para Gemini.
- OOXML: solo cambia document.xml; 23 bloques base sustantivos, 84 añadidos y 103 números PAGEREF. 1218 bloques base idénticos, cuatro apoyos no numerados; CAP5, referencias, tablas 19/20, §3.5, ecuaciones, recursos, estilos y relaciones conservados. Hashes de 266 archivos protegidos sin cambio. Sin código, protocolo, metodología educativa, auditoría/verificación/plan, tesis_actual/CURRENT, red/APIs/pruebas/gasto/secretos/despliegue/commit/push.
- Word COM renderizó en solo lectura sin guardar: 226 páginas, 167 PAGEREF cotejados. PDF temporal `conjunto8-final.pdf`, SHA-256 `6195fd480bdb0975519aa6394679c8f08b220d4d364ca0dbc73ca2922c2b4912`. Inspección del editor de contactos de PDF 4–10, 101–126, 133–145 y 158–162, y detalles de ecuación/tablas/RNF. Tablas densas y continuaciones entre páginas conservadas; no impresión física ni revisión visual exhaustiva celda por celda.
- Estado: **EDICIÓN REALIZADA; COMPROBACIONES DEL EDITOR EJECUTADAS; REVISIÓN INDEPENDIENTE PENDIENTE**. Informe `conjunto8-informe-reviewer.md` en el temporal. No aprobación final propia ni extensión del dictamen histórico CAP5 a este paquete. Siguiente paso: revisión independiente de este artefacto y sus límites; detenerse.

## OBS-HOY-27 — criterio 27, referencias — 12/10/2026

- Unidad única y plan explícitamente aprobados por el usuario. Contexto obligatorio leído; fuentes de esta edición: exclusivamente `docs/parcial2/avance_tesis.docx` y `docs/parcial2/articulo.docx`, preservadas intactas. No se utilizó tesis_actual ni se reinterpretaron observaciones históricas como actuales.
- Creadas sin sobrescritura `docs/parcial2/avance_tesis_OBS-HOY-27.docx` y `docs/parcial2/articulo_OBS-HOY-27.docx`. Tesis: solo última oración P61/P104 con localizador PISA exacto; cuatro Groq P1256–P1259 trasladados después Google (2026b), antes Hong, ahora P1268–P1271; GPT-OSS ahora P1269 con texto aprobado y único hipervínculo Groq, rId89 de uso único corregido. Artículo: solo cita PISA P14 precisada; Groq originales P61/P67 agrupados después Google, antes Hong, ahora P63/P64, a luego b, sin cambiar textos ni años.
- PDF local OCDE corroborado: página impresa 3, cuarta física, sección “What students know and can do in reading”, primera viñeta, 50 %/74 %. Se conservaron edad, 2018, contexto nacional y advertencias de que PISA no es diagnóstico local. Consulta documental web de la URL corregida devolvió la ficha GroqDocs GPT OSS 20B; no se ejecutaron APIs de inferencia.
- SHA-256 originales antes/después: tesis `6815162965209b4202597457a6724822d0e533aceaced1d1765a2cefdd6b135e`; artículo `9edc6c7ffbc10fd66a1bb9e672b3b491d7a9f8a9a2f320ebd76cc20819f5d758`. Copias: tesis `b6194fb982144cdb17b9647eadbfa4f9de578510f1016c88607808f51eb85890`; artículo `cb4845b9580886807c2623eef85c054e067b9fb91e0c8a8b671a972f3e51cd9f`.
- Comprobaciones documentales del editor: ZIP/XML válidos; solo cambian document.xml y su relación rId89 en tesis, solo document.xml en artículo; 96/17 miembros restantes idénticos. Secuencia de bloques OOXML cotejada byte a byte con las sustituciones y traslados autorizados; tablas, imágenes, ecuaciones, estilos, referencias restantes y campos conservados. Sin actualización global de citas/bibliografía. Word COM abrió en solo lectura y exportó sin guardar: tesis original/copia 237 páginas; artículo original/copia 8. Inspección visual localizada de copias PDF 14/23/233 y 2/7, comparadas con originales: textos afectados legibles, sin recorte observado; redistribución normal del artículo, sin edición de secciones ajenas.
- Apoyos para reviewer: `C:/Users/Ignacia/AppData/Local/Temp/opencode/obs27-*` (scripts, diffs limitados, validación JSON, PDFs, imágenes y `obs27-reviewer.md`). No revisión visual integral ni impresión física. No se modificaron otros docs, fuentes PDF, código, modelos, métodos ni resultados; no pruebas de aplicación, despliegue, gasto, commit o push. Cambios previos del repositorio conservados.
- Estado: **EDICIÓN REALIZADA; REVISIÓN INDEPENDIENTE PENDIENTE**. No se declara APROBADO ni cierre. Siguiente paso: reviewer independiente de estas dos copias y evidencia; detenerse sin continuar otra unidad.

## OBS-HOY-14 — criterio 14, atributos de Figura 8(a) — 12/10/2026

- Unidad única expresamente autorizada: atributos propios de SupabaseAiService y CuentoRepositorySupabase, §5.4, Figura 8(a), imagen P1134. Código actual cotejado sin modificar: `final SupabaseClient client` en services/supabase_ai_service.dart:9 y repositories/cuento_repository_supabase.dart:10; referencia pública de instancia, no nullable y no reasignable, sin afirmar inmutabilidad del objeto.
- Creada sin sobrescritura `docs/parcial2/avance_tesis_OBS-HOY-27_14.docx`, SHA-256 `89d78e5b2b0b9902a3a2e6d16a995c5e0c0bcf54e1870cf510ae1095ca05f7bc`. Cada caja incorpora exactamente `+ client : SupabaseClient {readOnly}` en compartimento de atributos, sin static/subrayado, constructores, métodos ni nueva clase.
- Regeneración PlantUML ensayada en temporal y descartada por desplazamientos de otras cajas/relaciones y sustitución del signo de visibilidad por icono. Adaptación PNG localizada: dos cajas ampliadas hacia abajo y lateralmente en espacio libre para alojar la línea literal en Arial 17 sin reducir la fuente; se cubre únicamente el tramo inicial de realización bajo las cajas, conservando los trazos restantes, destinos y triángulos originales. Lienzo 1251 × 975 y dimensiones OOXML intactos; fuera de los dos rectángulos autorizados todos los píxeles permanecen idénticos.
- Comparación ZIP: únicamente cambia `word/media/image9.png`; otros 97 miembros binariamente idénticos, incluidos document.xml, relaciones y image10.png. Se preservan título, fuente, leyenda, advertencia de no acreditación de ejecución/despliegue, operaciones, otras cajas y relaciones, y OBS27 íntegro (PISA, orden Groq, entrada/enlace GPT-OSS). Original avance_tesis SHA-256 antes/después `6815162965209b4202597457a6724822d0e533aceaced1d1765a2cefdd6b135e`; fuente OBS27 antes/después `b6194fb982144cdb17b9647eadbfa4f9de578510f1016c88607808f51eb85890`. Artículos y apoyos históricos cotejados sin cambios.
- Word COM abrió en solo lectura, exportó y cerró sin guardar ni actualizar campos globalmente; hash de entrega intacto. Render temporal de 237 páginas, SHA-256 PDF `016fa7cd88a985355defe9b7b08dab7d7a7f645588c102c3cdb4b3140c7c7bcf`. Inspección visual del editor de página completa/100 % PDF 200 A3 horizontal y vecinas 199/201/202: atributos legibles, realizaciones visibles, sin recorte/cruce/solapamiento observado; vecinas además idénticas por píxeles al render OBS27. No impresión física ni evaluación independiente.
- Apoyos exclusivamente en `C:/Users/Ignacia/AppData/Local/Temp/opencode/obs14-*`: ensayo PUML/PNG, original/final PNG, scripts, hashes/validación ZIP y píxeles, PDF, vistas y paquete reviewer. No se modificaron tesis_actual, CURRENT, artículo, históricos, código, plan, auditoría ni verificación de fuentes; no APIs, pruebas del producto, gasto, commit ni push. No se altera el estado previo de OBS27.
- Estado: **EDICIÓN REALIZADA; REVISIÓN INDEPENDIENTE PENDIENTE**. No APROBADO propio ni cierre del criterio 14 completo. Siguiente paso: revisión independiente de esta unidad localizada; detenerse.

## OBS-HOY-01 — criterio 1, estados de evaluación Gemini/Qwen — 12/10/2026

- Ejecutado únicamente el plan REVISADO expresamente aprobado por el usuario («si»), con respaldos aportados en docs/resultados_piloto; no se usó el plan anterior de ausencia de evidencia. Contexto obligatorio leído. Copia nueva sin sobrescritura: `docs/parcial2/avance_tesis_OBS-HOY-27_14_01.docx`, SHA-256 `345d34ba7b2061b0bbd297f61c87f4ac7f949e439af289627a6a7dcbfde3b543`. Base OBS27_14 intacta: `89d78e5b2b0b9902a3a2e6d16a995c5e0c0bcf54e1870cf510ae1095ca05f7bc`.
- Solo dos párrafos sustantivos: §3.3.1 B677/P662 y §3.3.2 B686/P671, contando desde cero, confirmados por contenido. Se incorporaron los textos exactos autorizados con etiqueta «Estado de evaluación.» en negrita explícita y propiedades locales de párrafo conservadas; sin tabla nueva ni modificaciones de otros criterios, matrices, ganador, artículos o GPT-OSS.
- CSV corregido verificado: filas 2–6 Gemini ejec_1–ejec_5 y 7–11 Qwen ejec_6–ejec_10, fecha UTC 10/10/2026, caso_01_misterio_agua, repetición 1. Por candidato: cinco operaciones, cinco HTTP 200, cinco solicitudes, cero reintentos/errores; validación estructural/JSON y primer intento=true; es_simulado=false. Resúmenes de cuentos/modelos filas 2/3 coincidentes. Piloto inicial fila 9: Qwen HTTP 429 con mensaje OTPM pese a categoría billing. Los tres CSV raíz son idénticos al piloto inicial; no se citaron como corregidos. No se revalidaron respuestas ni C2/C3, identidad remota o configuración/exclusión de espera en C4.
- Integridad: únicamente cambia word/document.xml; otros 97 miembros ZIP binariamente idénticos, incluidas relaciones, estilos, tablas, ecuaciones y image9.png de OBS14. OBS27 íntegro. Reversión de dos fragmentos y 91 resultados numéricos PAGEREF reproduce document.xml de base byte a byte. Cinco DOCX previos y 17 CSV cotejados intactos. No modificaciones de tesis_actual, CURRENT, originales, artículos, muestras/logs/protocolo, código, plan, auditoría o verificación de fuentes; no lectura de secretos, APIs, gasto, pruebas del producto, commit ni push.
- Word COM ReadOnly/exportación/Close(False), sin guardar ni actualizar campos globales: base 237 páginas, final 238 por extensión de textos. Se cotejaron 167 PAGEREF con bookmarks; 91 resultados locales cambiaron +1 y 76 quedaron intactos. Gemini PDF 103–104, Qwen 106–107; inspección visual del editor de detalles y vecinas 102–108 e índices 4–10: rutas/IDs y etiquetas legibles, sin recortes/solapamientos observados; continuaciones normales entre páginas. No revisión visual integral ni impresión física.
- Apoyos exclusivos `C:/Users/Ignacia/AppData/Local/Temp/opencode/obs01-*`: scripts, evidencia/diff, hashes/validación JSON, auditoría PAGEREF, renders PDF, vistas PNG y obs01-reviewer.md. PDF final SHA-256 `a98090a0595b4cea8e69e23816856bfa87a0422d5e7739e7414e827c122b044d`.
- Estado: **EDICIÓN REALIZADA; COMPROBACIONES DEL EDITOR EJECUTADAS; REVISIÓN INDEPENDIENTE PENDIENTE**. No APROBADO propio ni cierre del criterio 1 completo; no se alteran cierres de otras unidades. Siguiente paso exclusivo: revisión independiente de esta copia y apoyos. Detenerse.

## OBS-HOY-13 — tres secuencias en copia excepcional de parcial 2 — 12/10/2026

- Unidad única, opción A limitada y excepción de base aclaradas explícitamente por el coordinador: se edita la copia de entrega parcial 2, no la tesis oficial general ni CURRENT. Contexto y código actual pertinentes inspeccionados. Fuente `docs/parcial2/avance_tesis_OBS-HOY-27_14_01.docx` intacta, SHA-256 antes/después `345d34ba7b2061b0bbd297f61c87f4ac7f949e439af289627a6a7dcbfde3b543`.
- Creada sin sustituir archivo preexistente `docs/parcial2/avance_tesis_OBS-HOY-27_14_01_13.docx`, SHA-256 final `2e4f07c7b46bafb0fdc9f297960627c8473a35b0a72992ff1b5e62ec70ef4f2c`. Solo B1169 con texto exacto aprobado, complemento local no numerado entre B1303/B1304 de base, figuras 19–21 y ajustes locales de índices. Tres secuencias, no paquete ampliado: 17 paneles de continuación A3 horizontal para legibilidad; figuras previas no renumeradas.
- CU-01 separa callback/evento Auth, validación/autenticación/perfil/rol y sesión antes del destino; limpieza local no implica invalidación remota. CU-11 diferencia cuentos/resúmenes/resultados, vacío/fallo, interrupción de consultas por excepción y navegación histórica; QuizView sin resultadoInicial recupera resultado por generarQuiz, no convierte resumen en resultado completo; docente depende de Auth/RLS, sin filtro docente_id en el método. CU-14 registra estudiante por docente autorizado: validaciones, propiedad, duplicidad, creación y matrícula; trigger local condicionado e intento compensatorio deleteUser con retorno no comprobado, sin atomicidad. No mensajes, reintentos ni timeout universales inventados.
- ZIP/XML verificados: únicamente cambian document.xml y sus relaciones; 96 miembros originales idénticos y 17 PNG nuevos. Reversión de la inserción, tres entradas de índice, B1169 y resultados PAGEREF reproduce 1353 bloques previos byte a byte. Se conservan 47 tablas, ecuaciones, estilos, referencias y recursos, incluidas OBS27/14/01 e image9.png. 233 archivos protegidos cotejados intactos. Tabla 43 y restantes pendientes sin cierre; sin nuevas clases de análisis/especificaciones ni cambios de otros CU.
- Word COM en solo lectura/exportación/cierre sin guardar ni actualizar campos globales: base 238 páginas, entrega 258. Complemento PDF 234; figura 19, 235–239; 20, 240–246; 21, 247–251; referencias 252. 170 PAGEREF cotejados con bookmarks/páginas. Inspección visual del editor de los 17 paneles, títulos/fuentes, índices, B1169/continuación y límites. Se corrigió el recorte heredado únicamente en objetos nuevos; no recorte observado en render vigente. Sin impresión física ni dictamen independiente.
- Apoyos exclusivamente `C:/Users/Ignacia/AppData/Local/Temp/opencode/obs13-*`; paquete e informe `obs13-reviewer.md`. PDF vigente `obs13-delivery.pdf`, SHA-256 `d93e17c2f2a15308dc8c7bf4408240ce5753a21504f9ad71013e932adf142145`. No cambios de originales, artículo, históricos, fuentes PDF, código, tests, migraciones, configuración, tesis oficial, CURRENT, plan, auditoría ni verificación de fuentes; sin APIs/gasto/despliegue/commit/push.
- Estado: **EDICIÓN REALIZADA; COMPROBACIONES DEL EDITOR EJECUTADAS; REVISIÓN INDEPENDIENTE PENDIENTE**. Inventario 15 CU, mínimo 8 para 50 %; numerador no determinado. Las tres secuencias no acreditan CU completamente modelados ni cumplimiento de 13(d). Siguiente paso exclusivo: revisión independiente de esta copia, hashes y apoyos. No se cierra otra unidad; detenerse.

## OBS-HOY-13-COB — cobertura documental autorizada — 13/10/2026

- Unidad única del criterio 13; plan ampliado y excepción de base expresamente autorizados por usuario/coordinador. Se leyeron contexto obligatorio, rúbrica original p. 4, paquete anterior, RF/HU/tablas pertinentes y código correcto de `C:/Users/Ignacia/Documents/ChatGPT/tesis_investigacion`; el código del workspace no se usó como evidencia funcional ni se importó aplicación.
- Base excepcional intacta: `docs/parcial2/avance_tesis_OBS-HOY-27_14_01_13.docx`, SHA-256 antes/después `2e4f07c7b46bafb0fdc9f297960627c8473a35b0a72992ff1b5e62ec70ef4f2c`. Creada con nombre libre al iniciar `docs/parcial2/avance_tesis_OBS-HOY-27_14_01_13_cobertura.docx`, SHA-256 final `9ffbeaab833550527fbda3ff1893244b5c795982a2d69f9d3134aa1043e607d9`; no cambia tesis oficial ni CURRENT.
- Se añadió remisión posterior al párrafo histórico de §5.3 sin reescribirlo; continuación del complemento final de V antes de REFERENCIAS: ocho fichas CU-01/02/03/04/11/13/14/15 con básico/alternos ligados a pasos, postcondiciones, RF/HU, artefactos y estado; Figura 22 con seis paneles 22a–22f; Figura 23 con dos paneles conceptuales interfaz/control/entidad; Tabla 44 libre, quince filas y estados MODELADO/IMPLEMENTACIÓN separados. Figuras 6/19–21 y los 17 paneles anteriores intactos, sin renumeración.
- Cómputo documental del editor: ocho paquetes diferenciados sobre quince = 53,33 %, sujeto a dictamen independiente; no APROBADO propio ni cumplimiento total de 13(a)–(c)/13(d). CU-04 y CU-15 tienen ficha/subsecuencia/control distintos; CU-14 conserva carga/selección, registro ESTUDIANTE y resultados, no solo registro. Otros siete permanecen parciales o previstos, incluido CU-12; no se sumó un noveno ni se sustituyeron seleccionados por CU-06/09/10.
- Revalidados atributos de OBS14 y flujos de acceso/historial/registro de Figuras 19–21 contra código correcto; sin nueva edición de esos artefactos. Se conservan ausencia de OCR/análisis semántico del dibujo, PNG headless frente a captura real, creación demo posterior, perfil/rol/sesión, callback/evento sin orden obligatorio, vacío/null/fallo, resumen frente a resultado completo, productores separados del historial, limpieza local sin borrado/cancelación remota, RLS/trigger locales y compensación sin atomicidad garantizada. No mecanismos nuevos para HU-07/RF-22/RF-26 ni requisito institucional docente inventado.
- Integridad: ZIP/XML válidos; solo cambian document.xml y sus relaciones, 113 miembros originales idénticos y ocho PNG nuevos. Reversión de inserción/remisión/tres entradas y resultados PAGEREF reproduce document.xml de base byte a byte: 1431 bloques previos; 47 tablas anteriores, imágenes, ecuaciones, estilos, referencias y OBS27/14/01 conservados. 147 relaciones anteriores intactas y 249 archivos protegidos cotejados sin cambios.
- Word COM ReadOnly/exportación/Close(False), sin guardar ni actualización global de citas/bibliografía: 258 → 276 páginas; fichas PDF 253–260, Figura 22 261–266, Figura 23 267–268, Tabla 44 y cómputo 269, REFERENCIAS 270. Índices locales: entradas de Figuras 22/23 y Tabla 44, 173 PAGEREF cotejados, cuatro resultados cambiados. Render vigente TEMP `obs13-cob-delivery2.pdf`, SHA-256 `102c661f87929acf08bb4e98f774aa81a0e2d8f47ea82875c092c532a8a3b4f4`.
- Inspección visual del editor de ocho fichas, tabla completa, ocho diagramas nuevos y detalles, índices/remisión/fronteras/referencias. Borradores presentaron deformación de tipografía con A3 vertical/A4 horizontal y sangría inicial heredada en objetos nuevos; se resolvió solo mediante geometría local nueva A3 horizontal para láminas densas, espacios XML y retirada de crop/offset/sangría heredados. Render final sin solapamiento/recorte observado; ocho bboxes de imagen comprobados dentro de márgenes. Paneles densos 22c/23b requieren revisión de legibilidad independiente; no impresión física. Un intento de exportación sin PDF se repitió satisfactoriamente con nombre nuevo, sin guardar DOCX.
- Apoyos exclusivamente TEMP `obs13-cob-*`: fuentes PUML/PNG, scripts documentales, renders, reversión/validación, hashes, ficha y paquete reviewer; no archivos de aplicación copiados. En el repositorio solo este DOCX nuevo y ampliación de MEMORY; no código, fuentes PDF, artículo, originales, otros criterios, plan, auditoría, verificación de fuentes ni configuración. Sin APIs/gasto/SQL ejecutado/tests de producto/secretos/commit/push; cambios previos conservados.
- Estado: **EDICIÓN REALIZADA; VERIFICACIÓN DOCUMENTAL DEL EDITOR COMPLETA EN EL ALCANCE AUTORIZADO; REVISIÓN INDEPENDIENTE PENDIENTE**. Permanecen abiertas brechas pedagógicas, remotas, educativas e institucionales; no se cierran otras unidades. Siguiente paso exclusivo: dictamen independiente del archivo/hash y de los ocho paquetes sobre quince. Detenerse.

## OBS-HOY-13-COB — ciclo 2, dos hallazgos del reviewer — 13/10/2026

- El usuario comunicó dictamen independiente **CAMBIOS NECESARIOS**, exclusivamente dos hallazgos semánticos en 22d/22b, y autorizó su aplicación con apoyos, comprobaciones y este registro. Cinco paquetes CU-01/02/11/13/14 confirmados por ese dictamen; CU-03/04/15 parciales por los dos paneles. No se registra APROBADO del archivo nuevo ni se continúa con otra unidad/ciclo automático.
- Respaldo de ciclo 1 sin sobrescritura: TEMP `obs13-cob-ciclo2-base.zip`, SHA-256 `8f05fb63d50dd64758efd4ee0d44ded81e988cc70a33923db76b6b5806a0e334`. Incluye DOCX de entrada `9ffbeaab833550527fbda3ff1893244b5c795982a2d69f9d3134aa1043e607d9`, MEMORY anterior y apoyos históricos. Base original OBS13 `2e4f07c7b46bafb0fdc9f297960627c8473a35b0a72992ff1b5e62ec70ef4f2c` intacta; fuentes, render y paquete de ciclo 1 no se sustituyen.
- **Hallazgo 1 / 22d, PDF 264:** alt anidados por resultado de construcción, extracción y limpieza; retorno de texto solo en extracción correcta. Fallos omiten pasos posteriores; texto limpio vacío sigue error diferenciado y excepción de auxiliares se anida después de texto útil, sin retorno de datos exitoso previo. Auxiliares se explicitan como abstracción de operaciones reales secuenciales interrumpida en primer error, no procedimiento Dart nuevo. ArgumentError previo al try, StateError relanzado/conversión de otros errores, documento?.dispose en finally antes de completar retorno/error; sin OCR/IA. Cotejo: código correcto `lib/services/document_service.dart:24–71`.
- **Hallazgo 2 / 22b, PDF 262:** guarda `_canvasImage == null || _canvasSize.isEmpty` antes de rasterizar; null sin raster/conversión. Entrada disponible: rasterización y, solo si correcta, toByteData; ramas de excepción sin entrega normal, PNG del lienzo versus PNG fijo headless claramente distintos. Callback solo con PNG no null y mounted; liberar `_exportandoDibujo` en finally, sin catch/mecanismo pedagógico nuevo. Cotejo: `lib/views/draw_view.dart:542–559,561–630,678–731` del código correcto.
- Fichas y demás paquetes sin reescritura. Ajuste mínimo PDF 269: tres celdas MODELADO de CU-03/04/15 y dos párrafos de estado/cómputo. Cinco confirmados por ciclo 1 = 5/15, 33,33 %; tres corregidos/revalidados por editor pendientes de segunda revisión; 8/15, 53,33 % como propuesta condicional, no resultado confirmado ni APROBADO propio. Denominador quince y otros siete estados conservados, sin sumar CU-09 ni cambiar implementación/RF/HU.
- DOCX intervenido: `docs/parcial2/avance_tesis_OBS-HOY-27_14_01_13_cobertura.docx`, SHA-256 final `319af01f16d58d6f88ae861d4e16d4c7b25802275418cc4cc1c79d49ad7ac956`. ZIP/XML válidos; solo cambian document.xml y PNG 22b/22d, 120 miembros anteriores idénticos, cero miembros añadidos. Siete cambios XML reversibles reproducen ciclo 1 byte a byte. Las 47 tablas previas, ocho fichas, demás diagramas, referencias, ecuaciones, estilos y relaciones intactos; Tabla 44 solo tres celdas autorizadas.
- Word COM ReadOnly/exportación/Close(False), sin guardar ni actualización global: 276 páginas y bookmarks/páginas conservados, 173 PAGEREF verificados, cero modificados. Comparación de las 276 páginas rasterizadas a escala 0,5: solo 262/264/269 difieren. PDF final TEMP `obs13-cob-ciclo2-final.pdf`, SHA-256 `338118451fcda9a7e4e014101481b0acab9e9bcc44d253cf4750ffc26aeddd47`. Inspección visual de paneles completos/detalles y tabla; sin recorte/solapamiento observado, bboxes dentro de márgenes. Diagramas más densos (~7,54/7,73 pt físicos; Arial 18 fuente) sujetos a revisión independiente de legibilidad; no impresión física.
- 674 archivos protegidos cotejados intactos, incluidos apoyos históricos, base original, tesis oficial/CURRENT/artículo/código correcto y documentación protegida. Apoyos nuevos exclusivamente TEMP `obs13-cob-ciclo2-*`, con diff, fuentes/PNG, render, validación, manifest y ficha/paquete reviewer. En repositorio solo DOCX autorizado y este registro; no código/CSV/APIs/tests de producto/SQL ejecutado/gasto/secretos/configuración/commit/push ni otras correcciones.
- Estado: **DOS HALLAZGOS APLICADOS; COMPROBACIONES DEL EDITOR EJECUTADAS; SEGUNDA REVISIÓN INDEPENDIENTE PENDIENTE**. No se extiende el dictamen anterior a los tres paquetes corregidos. Siguiente paso exclusivo: segunda revisión del archivo/hash de ciclo 2 y estos dos paneles. Se respeta el máximo de dos ciclos editor–reviewer; no iniciar una tercera ronda ni cerrar otras unidades. Detenerse.
