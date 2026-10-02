# PROJECT.md — Cuentos Mágicos

## 1. Identidad del proyecto

**Nombre del producto:** Cuentos Mágicos  
**Tipo de proyecto:** Tesis + aplicación educativa  
**Tecnología principal:** Flutter / Dart  
**Estado actual:** Aplicación existente para Windows, en proceso de revisión académica y técnica para su futura adaptación a móvil.

---

## 2. Regla principal

Este proyecto YA EXISTE.

Los agentes deben partir siempre del estado actual del repositorio y de la documentación disponible.

No se debe:

- reconstruir el proyecto desde cero sin justificación;
- reemplazar decisiones previas solo por preferencia del agente;
- asumir funcionalidades no verificadas;
- proponer una arquitectura completamente nueva antes de analizar la existente.

Antes de modificar cualquier elemento:

1. Examinar el repositorio.
2. Revisar la documentación disponible.
3. Identificar lo ya implementado.
4. Identificar lo documentado en la tesis.
5. Detectar diferencias entre tesis y producto.
6. Proponer únicamente los cambios necesarios.

---

## 3. Objetivo del producto

Cuentos Mágicos es una aplicación educativa orientada a actividades de lectura, comprensión lectora y retroalimentación.

El estudiante puede generar cuentos personalizados a partir de:

- un dibujo;
- un documento PDF;
- el nombre de un personaje.

Durante la experiencia, el estudiante puede interactuar con el cuento, seleccionar alternativas narrativas, escuchar narración y posteriormente resolver actividades de comprensión lectora.

---

## 4. Flujo funcional conocido

El flujo documentado actualmente contempla:

1. Iniciar experiencia.
2. Elegir creación desde dibujo o PDF.
3. Ingresar el nombre del personaje.
4. Generar cuento personalizado.
5. Generar imagen de la escena.
6. Mostrar la escena.
7. Permitir narración por voz.
8. Mostrar alternativas narrativas.
9. Registrar la alternativa seleccionada.
10. Generar continuación del cuento.
11. Repetir hasta finalizar la historia.
12. Generar evaluación de comprensión lectora.
13. Registrar las respuestas.
14. Mostrar retroalimentación.
15. Calcular resultado.
16. Registrar la evaluación.
17. Mostrar resultado final.
18. Generar y guardar un PDF final.

---

## 5. Arquitectura documentada

La arquitectura planteada es:

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

### Infraestructura

- Supabase
- PostgreSQL
- Supabase Storage
- Servicio de IA generativa
- Servicio de síntesis de voz

---

## 6. Estado técnico actual

El repositorio contiene una aplicación Flutter desarrollada principalmente para Windows.

La estructura principal del código utiliza:

- `lib/controllers/`
- `lib/models/`
- `lib/repositories/`
- `lib/services/`
- `lib/views/`
- `lib/main.dart`

Existe documentación adicional en:

- `docs/`

No asumir que la arquitectura documentada coincide completamente con la implementación real hasta revisar el código.

---

## 7. Objetivo técnico actual

Analizar el estado real de la aplicación existente y determinar cómo adaptarla a una experiencia móvil sin reconstruir innecesariamente funcionalidades ya operativas.

Antes de realizar la adaptación móvil debe elaborarse una auditoría.

Cada componente deberá clasificarse como:

- **A. Reutilizable sin cambios**
- **B. Reutilizable con adaptación**
- **C. Dependiente de escritorio**
- **D. Debe reemplazarse para móvil**

---

## 8. Objetivo académico actual

Revisar si la tesis se encuentra correctamente encaminada respecto a:

- diagnóstico del problema;
- objetivos;
- viabilidad;
- antecedentes;
- selección tecnológica;
- requisitos;
- arquitectura;
- metodología;
- producto implementado.

La revisión debe considerar prioritariamente las observaciones realizadas por el profesor.

---

## 9. Observaciones conocidas del profesor

### Diagnóstico y problema

Se indicó que el diagnóstico no cuantifica suficientemente el alcance local de problemas relacionados con:

- motivación;
- retroalimentación;
- seguimiento del progreso lector.

### Objetivos y viabilidad

Se requiere mejorar:

- estimación del volumen de solicitudes a servicios de IA;
- estimación del costo correspondiente;
- comparación entre costos y beneficios esperados.

### Antecedentes y teoría

Algunos antecedentes mencionan mejoras en comprensión o motivación, pero no expresan claramente la magnitud cuantitativa de dichos cambios.

### Selección preliminar de la solución

Falta una matriz comparativa que incluya:

- candidatos;
- criterios;
- métricas;
- pesos;
- puntuaciones;
- selección resultante.

### Metodología y requisitos

Faltan requisitos medibles de calidad relacionados directamente con los objetivos del proyecto.

---

## 10. Principio de trazabilidad

Cada funcionalidad importante debe poder relacionarse con:

**Problema → Objetivo → Requisito → Caso de uso → Componente → Código → Prueba → Métrica**

La trazabilidad debe documentarse progresivamente en:

`docs/traceability.md`

---

## 11. Prioridad actual

La prioridad inmediata es realizar una auditoría inicial.

Durante esta etapa:

- no modificar arquitectura;
- no refactorizar;
- no reescribir la tesis;
- no migrar todavía a móvil;
- no cambiar base de datos.

Primero debe conocerse con precisión el estado real del proyecto.