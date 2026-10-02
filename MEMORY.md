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

La auditoría debe responder:

1. ¿Qué funcionalidades están realmente implementadas?
2. ¿Qué funcionalidades están incompletas?
3. ¿La arquitectura implementada coincide con la arquitectura documentada?
4. ¿Qué partes dependen de Windows?
5. ¿Qué puede reutilizarse en móvil?
6. ¿Qué partes de la tesis requieren corrección?
7. ¿Existe coherencia entre tesis y producto?
8. ¿Qué información necesita proporcionar el tesista?