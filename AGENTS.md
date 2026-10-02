# AGENTS.md — Cuentos Mágicos

## 1. Principio fundamental

Cuentos Mágicos es un proyecto existente.

Los agentes deben estudiar primero el estado actual y trabajar sobre él.

Nunca deben asumir que el proyecto debe reconstruirse desde cero.

---

## 2. Orden obligatorio antes de actuar

Antes de modificar cualquier archivo:

1. Leer `PROJECT.md`.
2. Leer `MEMORY.md`.
3. Revisar `README.md`.
4. Revisar la documentación relacionada dentro de `docs/`.
5. Examinar el código afectado por la tarea.
6. Identificar qué ya existe.
7. Identificar qué falta.
8. Elaborar un plan.

Para tareas importantes:

**NO modificar archivos hasta que el plan sea aprobado.**

---

## 3. Diferenciar siempre

Toda respuesta de análisis debe separar claramente:

### EXISTENTE

Información comprobada directamente en documentos o código.

### PENDIENTE

Información que todavía no existe o no ha podido verificarse.

### OBSERVACIÓN

Problema, contradicción o debilidad detectada.

### PROPUESTA

Cambio sugerido por el agente.

Nunca presentar una propuesta como si ya formara parte del proyecto.

---

## 4. Prohibiciones

Nunca:

- inventar información de la tesis;
- inventar resultados;
- inventar encuestas;
- inventar participantes;
- inventar costos;
- inventar métricas;
- inventar referencias;
- inventar DOI;
- inventar funcionalidades;
- presentar supuestos como hechos;
- eliminar funcionalidades sin autorización;
- reemplazar arquitectura funcional solo por preferencia técnica;
- realizar refactorizaciones extensas fuera del alcance;
- mezclar información con otros proyectos.

Cuentos Mágicos debe mantenerse independiente de otros proyectos.

---

## 5. Trabajo académico

Cuando se revise la tesis:

1. Analizar primero el contenido existente.
2. Compararlo con las observaciones del profesor.
3. Compararlo con los objetivos del proyecto.
4. Identificar brechas.
5. Proponer cambios puntuales.
6. Señalar información faltante.
7. No completar datos inexistentes mediante supuestos.

Evitar reescribir capítulos completos si una corrección localizada es suficiente.

---

## 6. Observaciones prioritarias del profesor

El agente debe comprobar especialmente:

### Diagnóstico

Buscar evidencia local cuantitativa relacionada con:

- motivación;
- retroalimentación;
- seguimiento lector.

Si no existe, marcarla como faltante.

### Viabilidad económica

Buscar:

- cantidad estimada de usuarios;
- frecuencia de uso;
- número de llamadas de IA;
- generación de imágenes;
- evaluaciones;
- costos unitarios;
- costo total estimado;
- beneficio esperado.

No inventar cifras.

### Antecedentes

Cuando se afirme que un trabajo produjo mejoras, revisar si existe una magnitud cuantitativa del cambio.

### Selección tecnológica

Verificar existencia de una matriz comparativa de alternativas.

### Requisitos

Los requisitos deben ser verificables.

Evitar expresiones como:

- rápido;
- sencillo;
- eficiente;
- amigable;
- intuitivo;

sin una métrica asociada.

---

## 7. Trabajo con la aplicación

La aplicación existente debe ser preservada siempre que sea técnicamente viable.

Antes de modificarla:

1. revisar la estructura Flutter;
2. identificar navegación;
3. identificar estado;
4. revisar services;
5. revisar repositories;
6. revisar almacenamiento;
7. revisar Supabase;
8. revisar IA generativa;
9. revisar manejo de archivos;
10. revisar PDF;
11. revisar dibujo;
12. revisar audio;
13. revisar permisos;
14. revisar dependencias específicas de Windows.

Para la futura adaptación móvil, clasificar cada elemento como:

- A. reutilizable;
- B. requiere adaptación;
- C. exclusivo de escritorio;
- D. debe reemplazarse.

---

## 8. Trazabilidad

Mantener coherencia entre tesis y producto.

Toda funcionalidad importante debe poder relacionarse con:

Problema  
→ Objetivo  
→ Requisito  
→ Caso de uso  
→ Componente  
→ Código  
→ Prueba  
→ Métrica

Registrar esta relación en:

`docs/traceability.md`

---

## 9. Spec-Driven Development

Para funcionalidades importantes utilizar:

`specs/NNN-nombre/`

Cada carpeta puede contener:

- `spec.md`
- `plan.md`
- `tasks.md`

### spec.md

Describe:

- qué se necesita;
- por qué;
- alcance;
- requisitos;
- casos límite;
- fuera de alcance;
- criterios de aceptación.

### plan.md

Describe:

- cómo se implementará;
- archivos afectados;
- decisiones técnicas;
- estrategia de pruebas.

### tasks.md

Divide el trabajo en tareas pequeñas y verificables.

---

## 10. Implementación

Cuando una spec esté aprobada:

1. implementar una sola tarea;
2. probar;
3. revisar resultado;
4. informar archivos modificados;
5. actualizar `MEMORY.md`;
6. detenerse.

No continuar automáticamente con otra tarea importante.

---

## 11. Código

Priorizar:

- claridad;
- mantenibilidad;
- separación de responsabilidades;
- reutilización;
- coherencia con arquitectura existente;
- compatibilidad móvil;
- capacidad de prueba.

Evitar cambios innecesarios.

---

## 12. Memoria

Al finalizar una sesión importante actualizar:

`MEMORY.md`

Registrar:

- qué se revisó;
- qué se descubrió;
- qué se modificó;
- decisiones tomadas;
- problemas pendientes;
- siguiente paso recomendado.