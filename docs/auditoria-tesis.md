# Auditoría académica de la tesis de Cuentos Mágicos

Fecha: 1 de octubre de 2026.

## Alcance, fuentes y límites de verificación

- **Fuente académica principal:** `tesis/tesis_actual.docx`, única versión vigente conforme a `tesis/CURRENT.md`.
- **Estado de revisión:** la versión vigente todavía no ha recibido observaciones del profesor, según `tesis/CURRENT.md`.
- **Apoyo de procedimiento:** `PROJECT.md`, `AGENTS.md`, `MEMORY.md` y `agents/thesis-reviewer.md`. Sus observaciones históricas se usan como criterios de revisión, no como correcciones confirmadas de la versión vigente.
- `docs/professor-feedback.md` está vacío al momento de esta revisión; no proporciona observaciones actuales del profesor.
- Se recuperan únicamente los hallazgos académicos de la auditoría inicial. Este documento no evalúa la implementación del software ni propone cambios de código, dependencias, arquitectura o migración.
- La revisión del DOCX comprende el texto, las tablas y las ecuaciones extraídas durante la auditoría inicial. Las figuras incrustadas no fueron verificadas visualmente. No se certifican diagramación, paginación, índices automáticos ni correspondencia visual de diagramas.
- No se verificaron exhaustivamente las fuentes primarias de antecedentes, tarifas y benchmarks. Su presencia en la tesis no equivale a validación externa de su exactitud.
- Las evidencias se identifican por sección y por título de tabla, debido a las inconsistencias de numeración del documento. Todas las referencias a secciones, salvo indicación expresa, corresponden a `tesis/tesis_actual.docx`.
- **PENDIENTE** significa que la información no se identificó en el contenido textual y tabular revisado o que necesita corroboración; no prueba su inexistencia fuera del documento. **PROPUESTA** identifica recomendaciones del auditor, no decisiones aprobadas ni contenido ya incorporado a la tesis.

## 1. Estado general de la tesis

### ESTADO ACTUAL

La tesis desarrolla tres capítulos: planteamiento metodológico, marco teórico y diseño de la solución. Propone una aplicación educativa de escritorio basada en gamificación para estudiantes de primaria del Scorza College. El contenido revisado está formulado principalmente como investigación e intervención previstas; no presenta resultados empíricos propios de una intervención concluida.

**Evidencia:** título, resumen, introducción, 1.9 y 3.12; estructura del documento antes de las referencias.

### FORTALEZAS

Existe una articulación entre diagnóstico, objetivos, fundamentos, diseño tecnológico, requisitos e historias de usuario. La tesis sí contiene presupuesto, antecedentes cuantitativos, matriz de selección y requisitos de calidad medibles; no corresponde repetir que estos elementos faltan solo porque así figure en antecedentes del repositorio.

**Evidencia:** 1.6.3, 2.1, 3.3–3.5 y 3.8–3.11.

### PENDIENTE

Corroborar el grado de avance académico requerido por la universidad y completar el protocolo de investigación, evidencias institucionales e instrumentos.

### OBSERVACIÓN

Los principales problemas identificados son la especificación metodológica incompleta y las inconsistencias internas de selección tecnológica y presupuesto. Este diagnóstico corresponde al auditor, no a una revisión actual del profesor.

### PROPUESTA

Conservar el contenido aprovechable y realizar correcciones puntuales, priorizando coherencia interna y metodología antes de ajustes editoriales.

## 2. Problema y diagnóstico

### ESTADO ACTUAL

El diagnóstico reconoce distintos niveles de logro y oportunidades de práctica, retroalimentación y seguimiento. La tesis señala que las calificaciones institucionales definitivas todavía no están disponibles y prevé datos preliminares para verificar procedimientos.

**Evidencia:** 1.1.1, 1.1.3 y 1.2, especialmente los párrafos sobre acceso a registros y retroalimentación.

### FORTALEZAS

No presupone una deficiencia generalizada. Reconoce que PISA corresponde a otra edad y lo utiliza como contexto nacional, no como evidencia directa del Scorza College. Distingue las calificaciones diagnósticas del instrumento pretest-postest.

**Evidencia:** introducción, 1.2 y 1.5.1.

### PENDIENTE

Registros reales del curso, distribución del desempeño por grado y evidencia local sobre oportunidad de la retroalimentación y organización del seguimiento lector. No se identifican mediciones locales de estos dos últimos aspectos en el contenido revisado.

### OBSERVACIÓN

La información atribuida a la dirección es un respaldo cualitativo, pero no sustituye la cuantificación del diagnóstico. Los datos sintéticos autorizados para verificar procedimientos no pueden demostrar el desempeño real de la población. La motivación está excluida como variable en 1.7.1; no debe exigirse una encuesta de motivación automáticamente a partir de observaciones históricas.

### PROPUESTA

Incorporar evidencia institucional autorizada y describir su origen, periodo, cobertura y limitaciones. Etiquetar expresamente cualquier dato de prueba y evitar utilizarlo como resultado empírico.

## 3. Problemas y objetivos

### ESTADO ACTUAL

El problema general pregunta por cambios en comprensión lectora y el objetivo general plantea determinarlos. Los cuatro objetivos específicos abarcan diagnóstico inicial, desarrollo de la propuesta, verificación de requisitos y comparación antes-después.

**Evidencia:** 1.3 y 1.4.

### FORTALEZAS

Los problemas específicos guardan correspondencia temática con los objetivos. La formulación centrada en cambios es prudente y separa la evaluación académica de la verificación tecnológica.

### PENDIENTE

Definir indicadores, instrumentos y resultados verificables para cada objetivo, así como el alcance interpretativo de la comparación.

### OBSERVACIÓN

El título utiliza «para mejorar» y el resumen plantea determinar en qué medida la aplicación «mejora», mientras que problema y objetivo general hablan de cambios. La mejora es una finalidad esperada, no un resultado demostrado. Una comparación antes-después no establece por sí sola causalidad exclusiva.

### PROPUESTA

Alinear título, resumen, problema y objetivo con el diseño finalmente aprobado, distinguiendo finalidad de la intervención y conclusión empírica.

## 4. Diseño de investigación

### ESTADO ACTUAL

Se prevén mediciones antes y después de utilizar la aplicación. El antecedente de Alvarez Jara se describe como preexperimental de un solo grupo y se señala su semejanza con la evaluación prevista para Cuentos Mágicos.

**Evidencia:** introducción, 1.4, 1.5.1, 2.1 y 3.11.

### FORTALEZAS

El esquema de mediciones se relaciona con el objetivo de analizar cambios. Se aclara que los resultados internos de la aplicación no reemplazan el instrumento de investigación.

### PENDIENTE

Una especificación metodológica integrada: enfoque y tipo de estudio, diseño formal, unidades de análisis, selección de participantes, criterios de inclusión y exclusión, amenazas a la validez y alcance de inferencia. No se identificó un desarrollo completo de estos elementos en el contenido revisado.

### OBSERVACIÓN

La metodología iterativa e incremental de 3.6 corresponde al desarrollo tecnológico y no sustituye el diseño de investigación educativa. La semejanza con un antecedente tampoco constituye una especificación suficiente del diseño propio.

### PROPUESTA

Documentar el diseño del estudio y sus limitaciones, incluyendo efectos de práctica, maduración, actividades docentes simultáneas y diferencias entre grados, según el diseño que apruebe el tesista con su asesor.

## 5. Población y muestra

### ESTADO ACTUAL

La tesis considera estudiantes de cuarto, quinto y sexto de primaria del Scorza College y una población máxima de 60 para planificación, pendiente de registros definitivos.

**Evidencia:** 1.1.1, 1.2, 1.6.2 y 1.7.1.

### FORTALEZAS

Hay delimitación institucional y por grado. Se reconoce expresamente que la cantidad debe precisarse con información real.

### PENDIENTE

Población definitiva y distribución por grado; número de participantes efectivos; decisión entre censo y muestra; procedimiento de selección; criterios de elegibilidad y tratamiento de retiros o ausencias.

### OBSERVACIÓN

Los 60 estudiantes no son una muestra confirmada ni participantes ya reclutados. El presupuesto máximo no demuestra acceso efectivo a esa cantidad de estudiantes.

### PROPUESTA

Precisar población y selección con registros autorizados. Justificar el tamaño y el procedimiento elegidos sin convertir automáticamente el máximo presupuestado en muestra real.

## 6. Variables y dimensiones

### ESTADO ACTUAL

La aplicación basada en gamificación constituye la intervención tecnológica y la comprensión lectora la variable evaluada. Se consideran dimensiones literal, inferencial y crítico-reflexiva. La inteligencia artificial y demás servicios son componentes tecnológicos, no variables adicionales.

**Evidencia:** 1.7.1, 2.2, 2.2.2, 2.2.3 y 3.12.

### FORTALEZAS

La delimitación evita confundir herramientas técnicas con variables educativas. La gamificación se fundamenta mediante narrativa, elección, desafíos, progreso y retroalimentación, sin depender obligatoriamente de puntos o insignias.

### PENDIENTE

Matriz de operacionalización con definiciones, indicadores, ítems, escalas, puntuaciones y correspondencia entre dimensiones e instrumento. Precisar cómo se documentará la exposición a la intervención.

### OBSERVACIÓN

Las definiciones conceptuales no constituyen todavía una operacionalización completa. La motivación y el rendimiento académico general están excluidos; no deben incorporarse como variables sin una decisión metodológica explícita.

### PROPUESTA

Construir la operacionalización a partir del instrumento real y definir cómo se registrarán las condiciones de participación en la intervención.

## 7. Instrumentos

### ESTADO ACTUAL

La tesis diferencia calificaciones del curso, instrumento pretest-postest y preguntas de práctica generadas dentro de la aplicación.

**Evidencia:** 1.2, 1.5.1, 2.2.6 y 3.11.

### FORTALEZAS

Evita presentar los puntajes automáticos de cada experiencia como equivalentes a una evaluación profesional independiente o al instrumento principal del estudio.

### PENDIENTE

Instrumento completo, procedencia o elaboración, tabla de especificaciones, reglas de puntuación, validación, confiabilidad, condiciones de administración y comparabilidad de pretest y postest. No se identificaron estos materiales desarrollados en el contenido revisado.

### OBSERVACIÓN

Las preguntas generadas pueden variar en dificultad. Las actividades crítico-reflexivas descritas incluyen justificar decisiones, mientras que el flujo de evaluación también se describe mediante alternativas y respuesta esperada. La adecuación del formato a esa dimensión requiere justificación.

### PROPUESTA

Definir y validar el instrumento independiente; justificar el formato de los ítems por dimensión y distinguirlo de las actividades de práctica. No atribuir validez al instrumento propio por la confiabilidad de instrumentos citados en antecedentes.

## 8. Procedimiento de intervención

### ESTADO ACTUAL

Se describe la experiencia funcional de lectura y evaluación. El presupuesto considera tres experiencias por estudiante, cuatro escenas por experiencia y hasta 180 experiencias.

**Evidencia:** 1.6.3, 1.7.2 y 3.2.

### FORTALEZAS

El flujo propuesto permite reconocer qué actividades recibirían los estudiantes. Se establece su carácter complementario a las actividades docentes.

### PENDIENTE

Cronograma, cantidad y duración de sesiones, distribución por grado, instrucciones, supervisión, condiciones de uso de narración y PDF, intervalo entre mediciones y registro de exposición efectiva.

### OBSERVACIÓN

El flujo funcional no es un protocolo de intervención. Las tres experiencias presupuestadas no están desarrolladas como una dosificación pedagógica justificada. El uso opcional de narración y entradas diferentes puede introducir heterogeneidad entre participantes.

### PROPUESTA

Definir un protocolo reproducible y registrar condiciones relevantes de uso. Las cantidades y tiempos deben proceder de una decisión sustentada, no de completar vacíos mediante supuestos.

## 9. Plan de análisis estadístico

### ESTADO ACTUAL

Se anuncia la comparación de resultados antes y después, general y por dimensiones. Los antecedentes mencionan procedimientos estadísticos, pero no se identifica un plan propio completo.

**Evidencia:** 1.4, 1.5.1, 2.1 y 3.11.

### FORTALEZAS

La evaluación por dimensiones permite evitar conclusiones basadas exclusivamente en un puntaje global. Los antecedentes distinguen significancia, tamaños de efecto y ausencia de superioridad entre intervenciones.

### PENDIENTE

Definir estructura de datos, puntuación, análisis descriptivo, hipótesis si corresponden, nivel de significancia, prueba para mediciones relacionadas, supuestos, tamaño de efecto, intervalos y manejo de datos faltantes o comparaciones múltiples.

### OBSERVACIÓN

Las pruebas utilizadas por otros estudios no pueden adoptarse automáticamente. Su pertinencia depende de la escala, distribución, diseño y emparejamiento de los datos propios.

### PROPUESTA

Establecer el plan antes de analizar resultados reales. Como opciones a evaluar, no como decisiones aprobadas, considerar pruebas para mediciones relacionadas acordes con los supuestos y reportar magnitud del cambio además de significancia. Evitar conclusiones causales que excedan el diseño.

## 10. Viabilidad técnica y económica

### ESTADO ACTUAL

La tesis describe recursos del investigador y tecnologías previstas. La estimación económica contempla hasta 60 estudiantes, 180 experiencias, 720 imágenes, 180 evaluaciones y 900 solicitudes principales textuales. Presupuesta 7500 tokens de entrada y 4000 de salida por experiencia, Gemini 2.5 Flash, imágenes, contingencia del 20 % y un máximo redondeado de USD 4,00.

**Evidencia:** 1.6.1–1.6.3 y tablas «Escenario máximo de utilización», «Estimación del consumo de tokens», «Presupuesto tecnológico estimado» y «Relación entre costo previsto y beneficios funcionales».

### FORTALEZAS

Existen volumen, tarifas unitarias, cálculo y beneficios funcionales. El consumo se identifica como supuesto de planificación y se prevé ajustarlo durante pruebas. La tesis no presenta los beneficios educativos como rentabilidad financiera.

### PENDIENTE

Confirmar recursos institucionales, conectividad, concurrencia, tarifas, cuotas y configuración. Justificar consumos multimodales, validaciones, regeneraciones, reintentos, almacenamiento y transferencia. Diferenciar presupuesto variable de intervención y recursos totales de desarrollo.

### OBSERVACIÓN

La viabilidad mezcla referencias a aplicación móvil y pruebas Android con un alcance predominantemente de escritorio. El presupuesto utiliza Gemini 2.5 Flash, mientras 3.5 selecciona Gemini 3.8 Flash.

El cálculo publicado para 2.5 Flash es consistente con sus tarifas consignadas: 1,35 × 0,30 + 0,72 × 2,50 = USD 2,205. Como comprobación condicional, usando las tarifas de 3.8 Flash escritas en 3.3.1 y manteniendo los restantes supuestos, el texto costaría USD 3,7125; al sumar USD 0,72 de imágenes y 20 % de contingencia, resultaría USD 5,319, aproximadamente USD 5,32. Esta es una derivación aritmética de datos de la tesis, no una tarifa corroborada ni un presupuesto nuevo aprobado.

### PROPUESTA

Corregir la coherencia de plataforma y recalcular el presupuesto cuando se confirme el modelo. Incorporar límites y escenarios que permitan justificar el uso de la expresión «máximo», sin inventar consumos o costos.

## 11. Antecedentes y bases teóricas

### ESTADO ACTUAL

Los antecedentes incluyen muestras, medias, porcentajes, significancia y algunos tamaños de efecto. Las bases teóricas desarrollan gamificación, comprensión lectora, narrativa, retroalimentación y tecnologías de apoyo.

**Evidencia:** 2.1, tablas de síntesis nacionales e internacionales y 2.2.

### FORTALEZAS

Se distingue asociación de causalidad en Ramos Casavilca. En Cattoni et al. se reconoce que hubo mejoras internas sin superioridad significativa frente a entrenamiento tradicional. Se explican aportes y diferencias contextuales de los antecedentes.

### PENDIENTE

Contrastar cifras y diseños con fuentes primarias; precisar comparabilidad de poblaciones e instrumentos y comprobar la correspondencia entre citas y bibliografía.

### OBSERVACIÓN

La presencia de cifras es comprobable en el documento, pero su exactitud externa no fue certificada. Algunos antecedentes se refieren a edades, idiomas o habilidades lectoras diferentes; su aporte debe mantenerse delimitado.

### PROPUESTA

Revisar las fuentes primarias y conservar las distinciones metodológicas existentes. Fortalecer la síntesis del aporte de cada estudio sin convertir resultados ajenos en resultados de Cuentos Mágicos.

## 12. Selección tecnológica

### ESTADO ACTUAL

Existe una matriz con cinco criterios, métricas, escalas y pesos que suman 100 %: contexto 15 %, velocidad 25 %, latencia 20 %, costo 20 % y compatibilidad 20 %.

**Evidencia:** 3.3–3.5, tablas de candidatos, escalas, resultados técnicos y matriz ponderada.

### FORTALEZAS

La decisión intenta ser reproducible y reconoce que los benchmarks no garantizan tiempos de la aplicación. El costo normalizado se distingue del consumo de una historia.

### PENDIENTE

Confirmar una sola lista de candidatos, configuraciones comparables, fecha y fuente de mediciones, disponibilidad y tarifas. Justificar la relevancia de las escalas respecto del volumen narrativo previsto.

### OBSERVACIÓN

3.3 y parte de 3.4 describen Gemini 3.8 Flash, GPT-5.6 Luna y Claude Haiku 4.5; 3.4.3 y la matriz usan Gemini 2.5 Flash, GPT-5 mini y Claude Haiku 4.5. La matriz presenta 4,80 / 3,80 / 3,00, mientras 3.5 declara 4,60 / 4,30 / 3,20 para los candidatos nuevos.

Aplicando los pesos y escalas escritos a los datos descritos para los candidatos nuevos, la comprobación aritmética produce 4,20 / 4,10 / 3,00. No constituye una recomendación de selección ni valida externamente las entradas.

En la auditoría anterior se corroboraron las capacidades y tarifas principales de GPT-5.6 Luna con la página oficial citada. La consulta específica de Gemini no se completó por tiempo de espera; los demás datos no tienen validación externa exhaustiva.

### PROPUESTA

Unificar descripción, tablas, puntuaciones, conclusión y presupuesto. Registrar las contradicciones antes de corregir y conservar la evidencia del recálculo con fuentes verificadas.

## 13. Requisitos funcionales y no funcionales

### ESTADO ACTUAL

Se presentan 32 RF, 18 RNF, 17 historias de usuario, escenarios de aceptación y una matriz entre historias, RF y objetivos de desarrollo/verificación.

**Evidencia:** 3.8–3.11.

### FORTALEZAS

Los RNF incluyen métricas, cantidades de ensayos y umbrales. La tesis aclara que los valores son criterios propios del proyecto, no exigencias numéricas de ISO. Existen escenarios exitosos y alternativos.

### PENDIENTE

Precisar condiciones de medición, matriz de equipos, reglas de validación, batería de contenido, alcance de «cuando corresponda» y criterios de evaluación de preguntas. Vincular RNF con pruebas y objetivos de verificación.

### OBSERVACIÓN

La trazabilidad presentada alcanza historias, RF y objetivos; no desarrolla toda la relación problema–objetivo–requisito–caso de uso–componente–prueba–métrica. Un criterio medible no equivale a una prueba realizada ni a cumplimiento demostrado. Esta fase no evalúa la implementación.

### PROPUESTA

Completar especificaciones y trazabilidad documental de forma localizada. Distinguir criterio de aceptación, procedimiento de verificación y evidencia obtenida.

## 14. Aspectos éticos

### ESTADO ACTUAL

La tesis contempla menores de edad, autorizaciones institucionales, consentimiento, minimización de datos, control de acceso, supervisión humana y adecuación del contenido. Indica que datos sintéticos no deben presentarse como registros reales.

**Evidencia:** 1.6.2, 1.7.1 y 2.2.6.

### FORTALEZAS

Se reconoce que la generación automática no reemplaza la responsabilidad del investigador. Se distingue el resultado de una actividad de una valoración profesional independiente.

### PENDIENTE

Documentos y responsables del proceso de autorización; tratamiento de asentimiento cuando corresponda; conservación, acceso, anonimización y eliminación de datos; procedimiento para retiro y contenido rechazado. Verificar con las instancias correspondientes las condiciones aplicables al estudio.

### OBSERVACIÓN

Las disposiciones escritas son compromisos previstos, no evidencia de autorizaciones obtenidas o controles verificados. La referencia legal debe contrastarse con la fuente vigente; esta auditoría no certifica cumplimiento jurídico.

### PROPUESTA

Documentar el procedimiento ético concreto y las evidencias requeridas antes de la intervención, manteniendo únicamente los datos necesarios para las finalidades aprobadas.

## 15. Coherencia interna del documento

### ESTADO ACTUAL

El documento desarrolla principalmente una aplicación de escritorio para Windows, comprensión lectora como variable y gamificación como intervención. Las descripciones funcionales son en su mayoría prospectivas.

**Evidencia:** título, 1.7, 1.8, 2.2 y 3.12.

### FORTALEZAS

Hay continuidad temática entre problema, intervención y dimensiones. Se separan IA, recursos visuales y síntesis de voz de las variables educativas.

### PENDIENTE

Revisar plataforma, modelos, precios, puntuaciones, citas, numeración, índices y campos de portada. Verificar visualmente figuras y ecuaciones en el documento original.

### OBSERVACIÓN

Se identificaron «EP1-Corregido» en 2.2.1, nombres de sitios al final de párrafos de 3.5, menciones a «versión previa» en 1.2 y 3.10, y numeración incompleta o inconsistente de tablas. El campo del asesor aparece sin completar en el texto extraído. Varias citas 2026 corresponden a referencias registradas como s. f.

### PROPUESTA

Resolver primero las contradicciones sustantivas y después realizar una revisión editorial localizada. Confirmar la presentación visual antes de afirmar que un índice o figura está incompleto.

## 16. Contradicciones detectadas

### ESTADO ACTUAL

Las siguientes discrepancias proceden de la tesis vigente, no de versiones anteriores ni de una revisión actual del profesor.

| ID | Evidencia en la tesis | Discrepancia |
|---|---|---|
| AC-01 | Título, 1.7.1 y 1.6–1.6.1 | Alcance de escritorio frente a «aplicación móvil» y dispositivo Android para pruebas. |
| AC-02 | 3.3, 3.4.3 y tablas respectivas | Candidatos nuevos frente a candidatos de otra comparación. |
| AC-03 | 3.4.4 y 3.5 | Puntuaciones de la matriz diferentes de las declaradas en la selección final. |
| AC-04 | 1.6.3 y 3.5 | Presupuesto de Gemini 2.5 Flash frente a selección de Gemini 3.8 Flash. |
| AC-05 | Citas de 2.2, 3.3–3.5 y referencias | Uso de año 2026 frente a entradas s. f.; notas con denominaciones/años no uniformes. |

### FORTALEZAS

La existencia de secciones y tablas permite localizar y corregir las discrepancias sin reconstruir la tesis.

### PENDIENTE

Confirmación del tesista sobre plataforma y comparación vigentes, verificación de fuentes y recálculo completo.

### OBSERVACIÓN

El lenguaje de «mejora» frente a «cambios» es una tensión interpretativa, no una contradicción aritmética. La descripción del nivel crítico-reflexivo frente al formato de respuestas requiere justificación metodológica. Ambas cuestiones deben tratarse además de AC-01–AC-05.

### PROPUESTA

Resolver cada ID mediante una decisión explícita y actualizar todas las secciones afectadas. No reemplazar silenciosamente datos incompatibles ni asumir cuál versión es correcta.

## 17. Información pendiente que debe proporcionar el tesista

### ESTADO ACTUAL

La tesis reconoce registros institucionales pendientes, población de planificación, consumo estimado y condiciones de intervención futuras.

**Evidencia:** 1.1.1, 1.2, 1.6.3, 2.2.6 y 3.11.

### FORTALEZAS

Estos reconocimientos permiten distinguir vacíos de información de afirmaciones ya sustentadas.

### PENDIENTE

1. Alcance oficial aprobado y etapa académica requerida por la universidad.
2. Rúbrica y futuras observaciones específicas de esta versión, cuando existan.
3. Registros reales y autorizados, población definitiva y distribución por grado.
4. Evidencia institucional utilizada para FODA, retroalimentación y seguimiento.
5. Diseño formal, selección de participantes y criterios de elegibilidad.
6. Operacionalización, instrumento, validación, confiabilidad y puntuación.
7. Protocolo de intervención y plan estadístico.
8. Recursos institucionales y condiciones reales de uso previstas.
9. Modelo seleccionado, configuración, fuentes de tarifas y benchmarks.
10. Sustento de consumos, límites, reintentos y escenarios económicos.
11. Fuentes primarias para contrastar antecedentes y resultados citados.
12. Autorizaciones, consentimiento y procedimientos de protección de datos.
13. Figuras, diagramas y anexos en formato verificable, si existen fuera del DOCX.
14. Datos de portada pendientes y criterio bibliográfico institucional.

### OBSERVACIÓN

No se dispone de resultados propios de una intervención concluida en el contenido revisado. No deben generarse participantes, encuestas, métricas o conclusiones para completar apartados. La versión vigente no ha recibido revisión del profesor según `tesis/CURRENT.md`.

### PROPUESTA

Solicitar primero información que condiciona diseño y alcance; después completar evidencias. Si un elemento no está disponible, mantenerlo identificado como pendiente.

## 18. Prioridad recomendada de correcciones

### ESTADO ACTUAL

Hay contenido académico aprovechable y contradicciones localizadas. El orden siguiente es una propuesta del auditor; no constituye autorización para modificar la tesis.

**Evidencia:** hallazgos y fuentes identificados en los apartados 1–17.

### FORTALEZAS

La estructura, objetivos, antecedentes, requisitos y tablas existentes permiten un proceso de corrección puntual y trazable.

### PENDIENTE

Aprobación del orden y provisión de información necesaria por el tesista y su asesor.

### OBSERVACIÓN

Los cambios de plataforma o modelo afectan varias secciones. Corregir solo una tabla dejaría contradicciones abiertas. El estilo editorial no debe ocultar los vacíos metodológicos.

### PROPUESTA

| Prioridad | Acción académica | Criterio de cierre propuesto |
|---|---|---|
| 1 | Confirmar alcance y resolver AC-01. | Plataforma coherente en título, viabilidad, límites y propuesta. |
| 2 | Unificar candidatos, recálculos y presupuesto: AC-02–AC-04. | Modelos, fuentes, puntuaciones y costo consistentes. |
| 3 | Formalizar diseño, población/muestra y operacionalización. | Protocolo explícito con datos reales o pendientes identificados. |
| 4 | Definir y validar instrumentos. | Ítems, dimensiones, puntuación y evidencia de validación documentados. |
| 5 | Precisar intervención y análisis estadístico. | Procedimientos reproducibles definidos antes de analizar resultados. |
| 6 | Completar diagnóstico y sustento operativo. | Evidencia local identificable sin usar datos sintéticos como reales. |
| 7 | Completar procedimientos éticos y autorizaciones. | Evidencia y responsabilidades definidas antes de la intervención. |
| 8 | Precisar requisitos, aceptación y trazabilidad académica. | Condiciones y procedimientos de verificación explícitos. |
| 9 | Contrastar antecedentes y normalizar bibliografía: AC-05. | Cifras y citas respaldadas por fuentes primarias verificadas. |
| 10 | Revisar portada, residuos editoriales, numeración y figuras. | Documento visualmente revisado y sin marcadores de edición. |

Este orden organiza la corrección del documento; no posterga las autorizaciones éticas necesarias para acceder o utilizar registros institucionales. La tesis no se ha reescrito ni corregido en esta fase.
