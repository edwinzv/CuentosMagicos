# CAPÍTULO V: IMPLEMENTACIÓN — AVANCE DEL PROTOTIPO

NOTA DE ENTREGA PARCIAL: el capítulo IV se encuentra PENDIENTE y no se incluye en esta entrega. Se conserva la numeración de los capítulos I–III. Este capítulo V documenta el avance técnico disponible al 09/10/2026; no sustituye el diagnóstico institucional, la comparación experimental de modelos ni la evaluación educativa futura.

Se distinguen tres planos: diseño previsto en el capítulo III, implementación observable mediante inspección del código y ejecución respaldada por evidencia disponible. Las figuras 3–5 conservan su carácter conceptual, de flujo objetivo y de arquitectura de diseño; se referencian sin duplicarlas. Las figuras nuevas son reconstrucciones técnicas derivadas del código y de las migraciones locales, no capturas del sistema ni pruebas de despliegue. La plataforma oficial continúa siendo PC Windows y el desarrollo sigue siendo iterativo e incremental.

## 5.1. Alcance del avance y estados de implementación

La inspección comprende main.dart, las vistas, StoryController, los modelos, Services, Repository, las Edge Functions y las migraciones existentes. «Implementado» significa localizado en código, no recorrido E2E acreditado. «Demo» identifica contenido o dependencias de demostración; «fallback» señala un respaldo ante fallo o un entorno sin cliente configurado; «pendiente» identifica una funcionalidad o verificación no respaldada. Una misma ruta puede reunir varios estados.

@tabla Alcance observable del prototipo y límites de acreditación
| Ruta | Estado en código | Evidencia y límite |
| Acceso por roles | Implementado | AuthService: estudiante con código/PIN; docente con correo/contraseña. AuthGate separa roles. No prueba remota actual. |
| Dibujo y personaje | Implementado + demo inicial | DrawView exporta PNG y bloquea doble exportación. StoryController.crearCuentoInicialDemo crea la primera escena con NarrativaService; no usa LLM textual para interpretar el PNG. |
| PDF y personalización | Implementado + fallback inicial | DocumentService extrae texto sin OCR; AiService analiza y solicita escena inicial. Un fallo de esa generación activa respaldo demo; el análisis previo no queda acreditado por ese respaldo. |
| Continuación e ilustraciones | Implementado + respaldo visual | StoryController valida elecciones, construye contexto, reintenta y guarda. Imagen: URL o Data URI; un fallo transitorio no bloquea el texto. |
| Voz y lectura | Implementado | StoryView invoca NarracionService y flutter_tts, además del callback demo de main.dart. No se niega la voz real por la existencia de ese callback. |
| Quiz y revisión final | Implementado con brechas | Cinco preguntas, cuatro alternativas; cinco selecciones enviadas juntas; corrección 0–5 y porcentaje en servidor. RF-22 y RF-26 no están acreditados íntegramente. |
| Historial y panel docente | Implementado parcialmente | Consultas de cuentos/resultados, aulas y matrículas; registro de estudiantes. No se acredita CRUD completo de aulas; hay consultas directas desde la vista. |
| Exportación final | Pendiente | No se localiza el flujo integral que reúna cuento y evaluación en PDF final y lo conserve según RF-30/RF-31. |
| Dependencias de memoria | Demo/fallback | main.dart contiene repositorios y servicios de respaldo para entornos sin cliente o para inyección. El arranque ordinario exige configuración Supabase; no es un modo offline de producción certificado. |
| Validación integral | Pendiente | Capturas funcionales, E2E UI–IA–Quiz–base de datos, despliegue remoto vigente y vínculo al repositorio definitivo no confirmados. |

Fuente: lib/main.dart:82–148, 216–438 y 841–1022; lib/controllers/story_controller.dart:56–95, 102–279 y 335–776; lib/views/quiz_view.dart:58–194. La presencia de componentes no demuestra su rendimiento ni seguridad universal.

## 5.2. Negocio: inventario de respaldo institucional

El diagnóstico y la descripción de Scorza College de los capítulos anteriores son el contexto documentado, pero no autorizan a reconstruir procesos reales, asignar trabajadores institucionales o establecer una frontera organizacional validada. En esta unidad no se dispone de un conjunto completo de instrumentos institucionales, observaciones del proceso y validación por sus responsables que permita modelar formalmente cada proceso estudiado. Los actores estudiante y docente del sistema no se convierten automáticamente en actores o trabajadores del negocio.

@tabla Respaldo disponible y faltantes para el modelado del negocio
| Elemento | Respaldo disponible | Pendiente |
| Contexto educativo | Diagnóstico y objetivos conservados en capítulos I–III | Artefactos originales identificados del levantamiento y confirmación institucional. |
| Procesos y frontera organizacional | Descripción narrativa de necesidades; no inventario validado completo | Identificar procesos estudiados, inicio/fin, trabajadores, entidades y propuesta de valor con fuente. |
| Diagramas del negocio | No se incorporan diagramas formales institucionales sin respaldo | CU del negocio, actividades con particiones, secuencia y objetos por proceso acreditado. |
| Cobertura del criterio 12 | No hay denominador institucional validado para esta entrega | Inventario y paquete completo de cuatro artefactos por proceso; no calcular porcentajes antes de ello. |

El criterio 12 de la rúbrica exige un conjunto completo de artefactos por proceso. Por tanto, el modelado institucional queda pendiente; no se afirma cobertura de 25 %, 50 %, 75 % o 100 %, ni se añade paralelismo artificial para obtener una condición de la rúbrica.

## 5.3. Casos de uso del sistema y correspondencia con los requisitos

Los casos de uso siguientes describen interacción con el software y se derivan de los requisitos existentes y de los puntos de entrada localizados, no de instrumentos institucionales no disponibles. El estudiante utiliza creación, lectura y práctica; el docente accede a funciones de supervisión y registro localizadas. La autenticación es precondición de las operaciones protegidas; no se representa como include de cada caso porque no se repite el inicio de sesión en cada operación.

@figura 06-casos-uso.png | Casos de uso del sistema: alcance actual y exportación pendiente

La dirección de include va de Procesar PDF hacia Extraer texto PDF: la extracción es parte necesaria de ese procesamiento. Escuchar narración extiende Leer escenas en el punto de lectura, si se solicita o se activa autoNarrar. No se emplea include como sustituto de una flecha de navegación ni se dibujan relaciones de negocio. La figura es una vista de alcance; no acredita modelado completo de todos los CU según la condición 13(d).

@tabla Matriz RF–CU–componente y estado del alcance
| Requisitos existentes | CU y propósito | Componente real y brecha |
| RF-01 | CU-01 Autenticarse | AuthService, LoginView, AuthGate; rechazo de credenciales y rol incorrecto. |
| RF-02 | CU-02 Elegir modalidad | StudentHomeView y _HomeRouterState.AppScreen. |
| RF-03 | CU-03 Dibujar | DrawView; validación del lienzo y exportación PNG. |
| RF-04, RF-05 | CU-04 Procesar PDF; CU-15 Extraer texto | DocumentView, DocumentService, StoryController; sin OCR. |
| RF-06 | CU-05 Personalizar personaje | Diálogo de DrawView y CharacterCustomizationView; nombre no vacío. |
| RF-07, RF-08 | CU-03–CU-06, validación de entrada | Guardas de dibujo, firma PDF y nombre; no se acredita batería integral de contenido infantil ni ContentSafetyService transversal completo. |
| RF-09, RF-10 | CU-06 Crear cuento | StoryController y AiService; dibujo inicial demo; PDF solicita IA con fallback. |
| RF-11 | CU-06/CU-09, salida narrativa | Validaciones estructurales y heurística de cierre; no equivalen a seguridad pedagógica integral. |
| RF-12, RF-13, RF-14 | CU-07 Leer escenas | StoryView, ImageService e IlustracionEscenaWidget; imagen asíncrona, texto independiente. |
| RF-15, RF-16 | CU-08 Escuchar narración | NarracionService/StoryView y flutter_tts; pausa declarada en enum pero no operación de pausa localizada. |
| RF-17, RF-18 | CU-09 Elegir y continuar | StoryView y Cuento.DecisionNarrativa; validación y registro tras generación aceptada. |
| RF-19, RF-20 | CU-09 Continuar historia | StoryController, ContextoNarrativoService, SupabaseAiService; no prueba de seguridad universal. |
| RF-21, RF-22, RF-23, RF-24 | CU-10 Resolver Quiz | QuizView, generar-quiz, modelos tipados; dimensión explícita de RF-22 y cobertura pedagógica pendientes. |
| RF-25, RF-26, RF-27 | CU-10/CU-11 Calificación y revisión | enviar-quiz y QuizResult; explicaciones finales, no antes de siguiente pregunta como exige RF-26. |
| RF-28, RF-29 | CU-11 Consultar resultado/historial | CuentoRepositorySupabase y QuizRepositorySupabase; persistencia integral/E2E pendiente. |
| RF-30, RF-31 | CU-12 Exportar PDF final | Previsto; flujo integral no localizado. No se atribuye a una PDFController inexistente. |
| RF-32 | CU-13 Volver / nueva experiencia | Callbacks de _HomeRouterState; regreso al inicio o al historial. |
| Sin RF nuevo asignado | CU-14 Supervisión y registro docente | TeacherHomeView, QuizRepositorySupabase, crear-estudiante; extensión técnica localizada, sin inventar requisito institucional. |

Todos los códigos RF-01–RF-32 se referencian en la matriz como alcance o brecha. Esto es trazabilidad documental, no porcentaje de cumplimiento ni porcentaje de CU completamente modelados. Las historias HU-01–HU-17 y sus escenarios permanecen en 3.10; la tabla no los reemplaza.

@tabla Especificaciones resumidas de CU: flujo principal y alternos comprobables
| CU / actor y precondición | Flujo principal localizado | Alternos, salida y límite |
| CU-01 / estudiante o docente; credenciales | AuthService valida formato, autentica y obtiene perfil; AuthGate dirige por rol | Campos vacíos/PIN inválido, credenciales rechazadas o perfil/rol incorrecto: no confirmar acceso; logout cuando corresponde. |
| CU-02 / estudiante autenticado | Seleccionar dibujo o PDF cambia AppScreen | Retorno al inicio; configuración ausente impide arranque ordinario. |
| CU-03 / estudiante; entrada de dibujo | Trazar, nombrar y exportar PNG; callback al coordinador | Lienzo no disponible, nombre vacío, exportación activa o PNG null: impedir continuación; fallback headless no es captura real. |
| CU-04 y CU-15 / estudiante; archivo | Seleccionar PDF, validar firma, extraer texto y analizar historia | Archivo vacío/incorrecto, PDF escaneado sin texto o análisis fallido: mensaje; no OCR ni promesa de procesar cualquier PDF. |
| CU-05 / estudiante; dibujo o PDF procesado | Ingresar nombre y elegir personalización; conservar parámetros | Nombre vacío rechazado; modo dibujo PDF exige PNG; mantener/renombrar/nuevo tienen distinta semántica narrativa. |
| CU-06 / estudiante; entradas válidas | Crear Cuento y escena inicial; guardar; mostrar StoryView | Dibujo: demo; PDF: generación IA o respaldo ante fallo inicial; guardado fallido no confirma recorrido integral. Figura 9. |
| CU-07 / estudiante; cuento con escenas | Mostrar contenido, navegar y solicitar imagen si corresponde | Histórico no regenera automáticamente; imagen fallida conserva lectura; no alteración de decisiones históricas. |
| CU-08 / estudiante; escena legible | StoryView inicia TTS y revelado; terminar/detener restituye texto completo | Guarda durante generación o TTS activo; error de voz no elimina texto. Figura 14. |
| CU-09 / estudiante; última escena no final | Elegir opción válida; generar continuación; registrar decisión, escena y guardado | Rechazar escena anterior, opción ajena, cambio de decisión o doble generación; reintentar IA; error no agrega final ficticio. Figura 10. |
| CU-10 / estudiante propietario | Solicitar/reusar Quiz; seleccionar cinco; enviar juntas; corregir en servidor | Falta selección bloquea avance/envío; 401/403 rechazan sesión/propiedad; fallo de envío informa y conserva selecciones. Figura 11. |
| CU-11 / estudiante o docente autorizado | Consultar historial y resultado; mostrar puntaje y explicaciones | Algunos errores de repositorio devuelven mapa vacío/null: ausencia visible no demuestra ausencia de datos; control docente depende de acceso autorizado. |
| CU-12 / estudiante; cuento y evaluación completos | Flujo objetivo: construir y conservar PDF final | Especificación prevista del capítulo III, no ejecución localizada; implementación y prueba pendientes. |
| CU-13 / estudiante | Volver al inicio/historial; elegir nueva modalidad | Salir durante operaciones tiene guardas según vista; no se acredita cancelación universal del backend. |
| CU-14 / docente; sesión y aula autorizadas | Consultar aulas/matrículas, registrar estudiante y consultar resultados | Validar nombre y código local; mostrar error de función; no CRUD completo de aulas ni cumplimiento RNF-14. |

Las secuencias detalladas se concentran en creación, continuación y Quiz; las clases de análisis se comparten por responsabilidades. Las secuencias específicas de acceso, historial y registro docente, así como el paquete completo de cada CU, quedan pendientes. No se afirma haber satisfecho la condición de modelado completo 13(d).

## 5.4. Análisis y diseño: clases, secuencias y estados

El modelo de análisis organiza entrada/lectura/práctica como responsabilidades de interfaz; aventura y Quiz como control; y cuento, escena, decisión e intento como entidades. Es una abstracción técnica, no una transcripción de procesos escolares. En el diseño real, _HomeRouterState compone dependencias y coordina navegación; StoryController orquesta narración generativa y persistencia. QuizView conserva estado local y delega a QuizService; generar-quiz y enviar-quiz implementan preparación y corrección del lado servidor.

@figura 07-clases-analisis.png | Clases de análisis derivadas de las responsabilidades del prototipo

@figura 08-clases-diseno.png,08b-clases-quiz.png | Clases de diseño y contratos reales del núcleo narrativo y Quiz

@tabla Correspondencia del análisis con el diseño y persistencia
| Responsabilidad o entidad | Clase o componente real | Correspondencia y límite |
| Entrada y coordinación | DrawView, DocumentView, CharacterCustomizationView, _HomeRouterState | No AppController separado; la composición y navegación residen en main.dart. |
| Aventura y lectura | StoryController, StoryView, NarracionService | Orquestación de contexto, guardas, reintentos, ilustración y lectura; no simple pasarela al LLM. |
| Cuento y escena | Cuento, Escena, DecisionNarrativa | Listas de escenas/decisiones por cuento; tablas cuentos, escenas y decisiones_narrativas. |
| Análisis y generación | PdfStoryData, StoryAnalysis, GeneratedScene | Datos de transferencia; no tablas homónimas ni persistencia completa automática. |
| Práctica y corrección | _QuizViewState, SupabaseQuizService, funciones Quiz | No QuizController separado; la clave y la corrección permanecen en servidor. |
| Preguntas/resultados | QuizQuestion, QuizAnswerSubmission, QuizResult, QuizQuestionResult, QuizAttemptSummary | DTO de entrada/salida e historial; quiz_intentos y quiz_respuestas. |
| Perfil y supervisión | UserProfile, AuthService, TeacherHomeView | profiles, aulas y aula_estudiantes; llamadas directas de vista son excepción de diseño. |

La agregación de datos de transferencia no introduce entidades institucionales nuevas. Cuento contiene escenas y decisiones como partes del recorrido; la figura de diseño muestra la composición del agregado y las realizaciones de interfaces. Las multiplicidades de colecciones en memoria no se confunden con restricciones de la base de datos: antes de recibir una respuesta válida puede haber cero elementos.

@figura 09-secuencia-creacion.png,09b-secuencia-pdf.png | Secuencia de creación: dibujo demo, PDF con IA y respaldo inicial

@figura 10-secuencia-continuacion.png | Secuencia de continuación: guardas, contexto, reintentos y persistencia

La configuración por defecto fija cuatro escenas, contexto objetivo de 5500 caracteres, texto fuente de hasta 8000, timeout de continuación de 45 segundos y dos reintentos adicionales. El retardo entre intentos es de 600 ms. ContextoNarrativoService conserva inicio, decisiones y escenas recientes cuando poda; el resultado resumido no tiene un recorte final que garantice estrictamente 5500 caracteres. El timeout del controlador puede vencer antes que los 85 segundos del servicio; no se acredita cancelación de la solicitud remota. Estos valores son configuración del código, no medidas experimentales ni cumplimiento de RNF.

StoryController aplica sustitución de nombre por límites de palabra y una heurística de expresiones de final abierto. En la última escena exige esFinal, opciones vacías y cierre aceptado; si agota intentos lanza error. Fuera de ese cierre, puede completar opciones de respaldo cuando no existen. Registra la decisión después de recibir una escena aceptada, agrega la escena y luego guarda. Un fallo de guardado puede dejar memoria modificada sin confirmación completa en base de datos.

@figura 11-secuencia-quiz.png,11b-secuencia-envio-quiz.png | Secuencia de Quiz: preparación, reutilización y corrección en servidor

generar-quiz comprueba pertenencia y escenas mediante consultas, acepta una marca de final o al menos cuatro escenas, reutiliza intentos cuando dispone de datos y construye el camino cronológico. Persiste intento y cinco preguntas con clave; al estudiante devuelve preguntas sin índice correcto ni explicación antes de finalizar. enviar-quiz valida las cinco respuestas, compara índices almacenados, calcula puntaje y porcentaje mediante round(aciertos/5*100), y devuelve explicaciones finales. La reutilización de un intento completado evita recalcular cuando se recuperan sus cinco respuestas; no se afirma una garantía transaccional global frente a toda concurrencia.

@figura 12-estados-experiencia.png,12b-estados-story.png | Estados de navegación y ciclo de lectura de StoryView

@figura 13-estados-quiz-imagen.png,13b-estados-imagen.png | Estados derivados del Quiz y estados locales de ilustración

@figura 14-estados-narracion.png | Estados declarados y transiciones localizadas de NarracionService

Las máquinas distinguen estados de actividades y rotulan eventos, guardas y acciones. AppScreen y StoryStatus son enums existentes; la representación del Quiz es una abstracción de flags, no un enum añadido. EstadoNarracion declara pausado, pero no se localiza un método que lo alcance. El handler de error puede resolver la espera y una actualización posterior restituir detenido; por tanto, no se presenta el estado de error como siempre persistente. Estos diagramas describen el núcleo seleccionado, no acreditan cobertura exhaustiva de cada transición de toda la aplicación.

## 5.5. Datos y persistencia

Las migraciones locales 20261007000000_schema_local.sql y 20261008100000_quiz_comprension.sql definen relaciones de perfiles, aulas, matrículas, cuentos, escenas, decisiones e intentos. PostgreSQL corresponde a esta topología relacional: se requieren identificadores, asociaciones, unicidad y consultas cruzadas entre estudiante, aula, cuento y resultado. Esta justificación procede de la estructura observada, no de una comparación de motores ejecutada.

@figura 15-datos.png,15b-datos-quiz.png | Modelo de datos físico parcial derivado de las migraciones locales

@tabla Claves, restricciones y acceso definidos localmente
| Grupo | Estructura comprobada en SQL | Límite o condición |
| profiles / aulas | profiles.id uuid PK/FK a auth.users; rol docente/estudiante; codigo_acceso único; aulas.docente_id FK | La existencia del perfil no acredita proceso institucional; trigger protege campos sensibles del perfil. |
| aula_estudiantes | PK compuesta aula_id/estudiante_id; ambas FK; único aula_id/codigo_local | Relación de matrícula; no se inventa CRUD completo en la interfaz. |
| cuentos | id text PK; estudiante_id y aula_id FK nullable; texto_fuente y campos del análisis | Nulabilidad admite datos sin asociación; es_demo no convierte demos en datos educativos reales. |
| escenas / decisiones_narrativas | FK cuento_id; únicos por cuento_id/numero y cuento_id/numero_escena; escenas.opciones jsonb | numero_escena de decisiones no tiene FK a escenas; vínculo se interpreta por cuento y número. |
| quiz_intentos | UUID PK; FK cuento y estudiante NOT NULL; FK aula nullable; único cuento/estudiante; estado en_progreso/completado | total_preguntas=5; puntaje 0–5 y porcentaje 0–100; completed_at nullable. |
| quiz_respuestas | UUID PK; FK intento; número 1–5 único por intento; opciones array de cuatro; índices 0–3 | Cinco filas como condición funcional, no obligación de cardinalidad mínima en SQL. No campo de dimensión RF-22. |
| RLS y privilegios | Políticas locales para propietario y docente autorizado; Quiz SELECT para authenticated, escrituras por service_role | Las respuestas del estudiante se consultan al completar el intento. Migraciones y políticas remotas efectivas no verificadas en esta unidad. |

CuentoRepositorySupabase guarda mediante upserts sucesivos en cuentos, escenas y decisiones_narrativas. Recupera escenas y decisiones ordenadas, pero el guardado no constituye una transacción integral. El modelo dispone de campos de personalización y bytes de referencias visuales que no son conservados íntegramente por el mapeo del repositorio; no se garantiza su reconstrucción total desde el historial. QuizRepositorySupabase consulta resúmenes y relaciones; ciertas consultas convierten errores en vacío o null, mientras otras los propagan.

El texto extraído y el resumen se distinguen semánticamente de las escenas generadas y del resultado Quiz, pero residen en estructuras modificables. No hay separación estructural completa de datos crudos inmutables, procesamiento y resultados. El PDF original, las referencias visuales y la metadata experimental no se conservan universalmente mediante un esquema de ejecución con versión del algoritmo, hiperparámetros, hash y artefactos originales. Se mantienen pendientes las condiciones 15(c) y 15(d).

generar-imagen intenta subir el objeto al bucket cuentos con upsert y devuelve URL pública si la obtiene; en ausencia de esa URL devuelve Data URI. StoryController asocia el valor a la escena y trata de guardarlo. Por ello, imagen mostrable no significa objeto persistido en Storage, ni acredita política efectiva de privacidad, disponibilidad o conservación remota.

## 5.6. Arquitectura implementada y topología configurada

La arquitectura objetivo de la figura 5 se conserva. La implementación actual distribuye interfaz, coordinación, modelos, servicios y repositorios, aunque parte del control permanece dentro del estado de las vistas y de main.dart. Las interfaces AiService, ImageService, QuizService, CuentoRepository y QuizRepository facilitan inyección de dobles y delimitan integraciones; no garantizan por sí solas aislamiento del experimento ni integridad de persistencia.

@figura 16-componentes.png | Componentes e interfaces provistas y requeridas del prototipo

@figura 17-despliegue.png | Nodos, artefactos y protocolos de la configuración, sin despliegue acreditado

El arranque exige SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY mediante configuración dart-define. El cliente utiliza SDK y funciones vía HTTPS/JSON con Bearer; las funciones usan supabase-js y APIs externas. La narración utiliza flutter_tts y la síntesis disponible en Windows. No se conoce aquí la distribución física remota, región, capacidad de nodos, IP, firewall, balanceador ni router. No se añaden dispositivos para afirmar una seguridad o un rendimiento no probado; la topología completa solicitada por 16(b) queda pendiente.

@figura 18-paquetes.png | Dependencias relevantes entre paquetes y excepciones de separación por capas

El criterio de paquetes es la responsabilidad técnica, no un cambio a microservicios ni a un marco ágil. TeacherHomeView consulta directamente aulas y matrículas e invoca crear-estudiante; Cuento y StoryController dependen del widget de ilustración para decodificar imágenes. Estas excepciones se documentan sin refactorizar código ni declarar RNF-14 cumplido. La vista por paquetes no constituye una comprobación exhaustiva de ausencia de ciclos.

## 5.7. Trazabilidad tecnológica y límites de inferencia

@tabla Trazabilidad CU–RF–clase–servicio–tabla–prueba y artefacto UML
| CU / RF | Clases, servicio y tabla | Prueba o evidencia existente / UML |
| CU-01 / RF-01 | LoginView, AuthGate, AuthService, UserProfile; profiles | auth_startup_test.dart y reporte smoke local; caso técnico, no acreditación institucional. Figura 6. |
| CU-03/CU-06 / RF-03, RF-06, RF-09 | DrawView, StoryController, NarrativaService; cuentos/escenas | story_controller_test.dart:196–228; creación/guardado con dobles. Figuras 7–9. |
| CU-04–CU-06 / RF-04, RF-05, RF-10 | DocumentService, PdfStoryData, AiService; cuentos | document_service_test.dart y story_controller_test.dart:244–274; no OCR ni API real en mocks. Figura 9. |
| CU-09 / RF-17–RF-20 | StoryController, ContextoNarrativoService, SupabaseAiService; escenas/decisiones_narrativas | story_controller_test.dart:638–746; cierre/reintentos con fake. Figura 10. |
| CU-07/CU-08 / RF-12–RF-16 | StoryView, NarracionService, ImageService; escenas.image_url | story_view_narracion_imagen_test.dart; imagen/voz con dobles. Figuras 12–14. |
| CU-10 / RF-21–RF-27 | QuizView, SupabaseQuizService, enviar-quiz; quiz_intentos/quiz_respuestas | quiz_module_test.dart:129–648 con MockQuizService; no ejecución servidor real. Figura 11. |
| CU-11/CU-14 / RF-28, RF-29 | QuizRepositorySupabase, StudentHomeView, TeacherHomeView; relaciones de Quiz/aulas | quiz_history_and_drawing_test.dart y teacher_panel_redesign_test.dart; datos de prueba, no E2E remoto. Figuras 15–18. |
| CU-12 / RF-30, RF-31 | PDF integral pendiente | Sin prueba integral localizada; figura 6 lo distingue como previsto. |

Esta matriz permite seguir responsabilidades técnicas y relacionarlas con los escenarios de aceptación del capítulo III. No acredita la cadena completa negocio–VI–VD del criterio 17(a). La intervención tecnológica y la comprensión lectora mantienen su relación prevista mediante instrumento independiente, pretest y postest futuros del mismo grupo; el Quiz de práctica y las pruebas de software no sustituyen ese instrumento.

Se conserva el enfoque cuantitativo, aplicado y descriptivo, con diseño preexperimental de un grupo sin control ni comparación. Los 55 estudiantes son población prevista, la muestra continúa pendiente y no se atribuye causalidad exclusiva a la aplicación. Ningún diagrama, porcentaje Quiz o test técnico constituye evidencia de mejora educativa.

## 5.8. Correspondencia diseño–código y procedencia del repositorio

El código inspeccionado corresponde al workspace experimental. El registro de integración en MEMORY identifica la procedencia de archivos desde un ZIP suministrado el 08/10/2026; no dispone del SHA del commit original. Las diferencias de nombres respecto del diseño se explicitan: _HomeRouterState en lugar de AppController separado; QuizView más SupabaseQuizService y funciones servidor en lugar de QuizController; NarracionService en lugar del nombre conceptual VoiceService; resultado dentro de QuizView sin FinalView independiente. No se localiza PDFController ni un flujo final integral y no se niega Storage por falta de una clase homónima.

@tabla Procedencia y verificaciones del repositorio local
| Elemento | Observación comprobada | Límite |
| Remoto configurado | https://github.com/edwinzv/CuentosMagicos | URL candidata; enlace definitivo y acceso del evaluador pendientes. Consulta pública devuelve 404: no acceso público, no prueba de inexistencia ni de privacidad. |
| Historia local | 19 commits; raíz 8e381b8; HEAD 9133101; etiqueta v0.1.0 | No conserva de forma acreditada el historial del origen del ZIP. No se atribuyen las pruebas históricas a HEAD. |
| Seguimiento local | HEAD...origin/main = 0/0 en refs locales | No demuestra sincronización actual con el servidor; no se hizo fetch, push ni publicación. |
| Archivos integrados | QuizView y generar-quiz están en el árbol de trabajo, no en el árbol de HEAD inspeccionado | No acreditar que el código vigente completo esté publicado. |
| Reconstrucción y seguridad | pubspec y lock existentes; SDK compatible registrado; raíz sin .gitignore en el árbol inicial | No entorno reconstruible con un solo comando acreditado, ni ramas experimentales verificadas, ni auditoría exhaustiva de secretos e historial. |

Flutter/Windows se corresponde con la plataforma prevista y las capacidades de dibujo, PDF y TTS localizadas. Supabase y PostgreSQL permiten representar las relaciones y consultas del prototipo; los contratos de servicios separan la integración generativa. Estas razones estructurales no equivalen a una comparación tecnológica medida ni a una certificación de reproducción experimental. La selección de modelo textual continúa pendiente conforme al protocolo del capítulo III, sin declarar ganador.

## 5.9. Interfaces, estado, contratos y seguridad entre capas

Las interfaces localizadas son LoginView/AuthGate, StudentHomeView, DrawView, DocumentView, CharacterCustomizationView, StoryView, QuizView y TeacherHomeView. Las fichas del capítulo III son previstas; no se dispone de una colección de wireframes y capturas por CU que acredite su correspondencia completa. No se insertan imágenes fabricadas de pantallas: los diagramas de esta entrega son diseño reconstruido, no interfaz ejecutada.

El estado del recorrido reside en _HomeRouterState; StoryView mantiene índice, selección, StoryStatus, voz, revelado y estado de imagen por escena. QuizView mantiene preguntas, mapa de selecciones, carga, envío y resultado. Existen componentes en views/components y widgets especializados; no se afirma que toda vista tenga responsabilidad única ni que todo manejo de errores sea centralizado.

@tabla Contratos de integración, esperas y errores localizados
| Operación | Entrada / salida tipada | Espera y manejo localizado |
| analizar-historia | texto → StoryAnalysis | SupabaseAiService: 85 s; sesión requerida; 401/403 diferenciados; otros errores se propagan. |
| generar-escena | título, personaje, textoFuente, contextoNarrativo, decisionActual, numeroEscena, esUltimaEscena y contexto original → GeneratedScene | Servicio: 85 s; controlador continuación: 45 s por intento. Guardas, sustitución de nombre y validación heurística de cierre. |
| generar-imagen | cuentoId, numeroEscena, contenidoEscena, personajePrincipal y referencias base64 opcionales → imageUrl y metadatos | Servicio: 45 s; controlador: 40 s. Reutilización y bloqueo por escena; 401/403 se propagan, error transitorio retorna null. |
| generar-quiz | cuentoId → intentoId, estado, preguntas o resultado existente | 40 s; QuizQuestion solo numero, pregunta y opciones; sin clave antes de finalizar; 400/401/403/500/503 según función. |
| enviar-quiz | intentoId, respuestas[{numero, indiceSeleccionado}] de longitud 5 → QuizResult | 30 s; corrección en servidor, total 5, porcentaje y revisión; error de envío informa, no calificación local confirmada. |
| crear-estudiante | nombre, aulaId, codigoLocal → datos de registro y acceso | TeacherHomeView invoca directamente y acepta 200/201; guarda de envío y error de diálogo; sin timeout explícito localizado en esa invocación. |
| Consultas de historial | id de estudiante/cuento y relaciones → Cuento o QuizAttemptSummary | Async; algunas excepciones retornan vacío/null; no interceptor universal ni timeout universal acreditados. |

El cliente obtiene el token de la sesión activa para invocar servicios protegidos. La configuración local declara verify_jwt=true en seis funciones y el helper compartido valida token con Auth y rol estudiante; otras funciones poseen comprobaciones propias. Esto es definición local, no acreditación de que cada control esté desplegado remotamente. Las claves de proveedor y de servicio se leen del entorno servidor en las rutas revisadas; no se transcriben sus valores ni se certifica una auditoría exhaustiva del historial.

Las cabeceras CORS observadas usan origen '*'; no cumplen la condición de origen explícito de 19(d). Una aplicación nativa Windows no acredita por ello una estrategia web de cookie HttpOnly, Secure y SameSite. La limpieza de sesión en el arranque no demuestra token exclusivamente en memoria: el SDK contempla persistencia de sesión. Permanecen pendientes el análisis completo de almacenamiento de credenciales, privacidad de objetos y políticas remotas. Las guardas y límites de tiempo localizados reducen duplicados/esperas, pero no prueban ausencia universal de carga infinita ni cancelación remota.

## 5.10. Pruebas y clasificación de evidencia disponible

En esta unidad no se repiten suites históricas, no se invoca IA, no se ejecutan migraciones y no se despliega Supabase. Se documentan resultados existentes con su alcance. La suite Flutter del 08/10/2026 cuenta con log conservado: finaliza con +225 y All tests passed!, bajo Flutter 3.47.7, Dart 3.13.5 y Windows según MEMORY. La inspección de test distingue 24 archivos, 146 declaraciones test y 79 testWidgets; esa clasificación no acredita un snapshot exacto mediante hash, una prueba del commit HEAD ni funcionamiento de servicios reales.

@tabla Pruebas, esperado, obtenido, fuente y alcance probatorio
| Caso / aceptación técnica | Esperado | Obtenido según fuente y límite |
| Suite Flutter histórica / regresión | Completar suite sin fallo | Log flutter-test.log:502–503: +225, All tests passed! (08/10). Resultado agregado histórico; snapshot exacto no acreditado. |
| CU-10 / no avanzar sin respuesta | QuizView mantiene pregunta y solicita selección | Caso 2 de quiz_module_test.dart; resultado agregado histórico disponible, backend es MockQuizService; no persistencia remota. |
| CU-10 / payload conjunto | Finalizar envía cinco QuizAnswerSubmission; resultado recibido | Casos de quiz_module_test.dart; mock conserva últimas respuestas; valores 4/5 y 80 % son fixtures, no logro educativo. |
| CU-09 / cierre y error | Reintentar final abierto; rechazar cierre si agota intentos | story_controller_test.dart:638–746; FakeAiService. Suite histórica aprobada, no calidad real del proveedor. |
| Integración de servicio / sesión | Encabezado Bearer y errores 401/403 coherentes | supabase_ai_service_test.dart usa FakeSession y FakeFunctionsClient; no JWT real ni autenticación remota por ese test. |
| Smoke local / aislamiento | Acceso por rol, cuento propio, rechazo ajeno y limpieza | docs/semana_8/smoke_test.md:97–115 reporta 7/7 locales del 07/10; informe histórico sin log original independiente cotejado. No UI–IA–Quiz E2E. |
| CU-09 / generar-escena suministrado | Contar con una respuesta funcional atribuible | Ficha saneada del tesista: escena 4, gemini-3.5-flash-lite según log declarado, HTTP 200, execution_time_ms=2402, versión 7. Log original no inspeccionado; no prueba propia. |
| Multipart imagen / contrato | FormData contiene la referencia correcta y estructura prevista | Dos Deno.test en pollinations_multipart_test.ts:5–85; código disponible, resultados de ejecución no disponibles. |
| Seguridad/Quiz local / scripts | Verificar roles, contratos y corrección en entorno de prueba | test_ai_security.ts y test_quiz_local.ts existen; no resultado disponible en esta unidad. |
| CU centrales / E2E y capturas | UI bloquea duplicado, payload correcto, DB registra y cliente recibe respuesta | Pendiente: no suite E2E acreditada ni capturas funcionales saneadas disponibles por CU. |

El reporte anterior de 134 pruebas y Flutter 3.47.6 de semana 8 es un antecedente distinto: no se mezcla con el resultado de 225. Los tests con mocks verifican reglas locales, estructura y regresión; no acreditan proveedores reales, despliegue remoto, compilación Windows, validez pedagógica ni mejora en comprensión lectora.

La ficha docs/evidencia-funcional-generar-escena-20261009.md atribuye al tesista la ejecución de 09/10/2026 02:50:53 GMT, equivalente a 08/10/2026 21:50:53 Lima. Se omiten IP, usuarios, sesiones y credenciales. Los 2402 ms son ejecución de la función, no inferencia aislada ni espera total; no acreditan RNF, costo, calidad o resultado educativo. No se atribuye esa ejecución a Gemini 3.8 Flash ni al protocolo de 108 solicitudes futuras. Gemini 3.8 Flash, GPT-5.6 Sol y Claude Sonnet 5.5, sus pesos 25/25/20/20/10 y matrices pendientes permanecen sin modificación y sin ganador.

## 5.11. Balance del avance frente a los criterios 12–20

@tabla Balance documental y pendientes de los criterios de implementación
| Criterio | Aporte de esta entrega | Pendiente; sin calificación inventada |
| 12 Negocio | Inventario de respaldo y límites explícitos | Validación institucional, denominador y paquete de CU/actividades/secuencia/objetos por proceso. |
| 13 CU del sistema | Actores, frontera de sistema, matriz de los 32 RF y especificaciones principales/alternas | Traducción respaldada por instrumentos y artefactos completos por todos los CU; sin porcentaje de modelado completo. |
| 14 Clases, secuencias, estados | Análisis/diseño del núcleo, mensajes cronológicos y alt/loop/opt, guardas y heurísticas | Cobertura exhaustiva de todos los CU y ciclos de vida; comprobación independiente de UML y legibilidad final. |
| 15 Datos | Modelo local, PK/FK, restricciones, mapeo y justificación relacional | Esquema remoto efectivo, crudos inmutables y metadatos experimentales completos. |
| 16 Arquitectura | Componentes UML con lollipop/socket, nodos/protocolos configurados y paquetes | Topología física y RNF verificados; aislamiento experimental e integridad transaccional no acreditados. |
| 17 UML transversal | Nombres reales y trazabilidad tecnológica del núcleo | Cadena completa negocio–VI–VD, instrumentos y detalle suficiente para réplica sin fuente. |
| 18 Diseño, código, repositorio | Desviaciones explícitas, procedencia y observación de historia local | URL definitiva accesible, código vigente publicado, historia original y reconstrucción completa. |
| 19 Alcance e integración | Estados implementado/demo/fallback/pendiente; contratos, estado y errores reales | PDF final, RF-22/RF-26/RNF-14, wireframes/capturas, errores centralizados y condición web de seguridad. |
| 20 Pruebas | Log Flutter histórico, tests con dobles, smoke reportado y ficha atribuida | Capturas por CU, E2E UI–backend–persistencia, snapshot probado y compatibilidad cliente/servidor etiquetada. |

Este balance no asigna notas ni declara aprobación del examen. El avance documenta qué existe y qué falta, sin cerrar otras unidades de corrección. La revisión independiente del documento y de los artefactos debe registrarse después de la edición y la comprobación del render; hasta contar con ella no se afirma aprobación del reviewer ni del asesor.
