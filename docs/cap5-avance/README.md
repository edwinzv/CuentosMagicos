# CAP5-AVANCE — entrega y apoyos

Fecha: 09/10/2026. **Ciclo 2: tres hallazgos del dictamen CAMBIOS NECESARIOS aplicados; comprobaciones del editor ejecutadas; segunda revisión independiente PENDIENTE.** Este directorio no constituye aprobación final del reviewer/asesor ni cierre de otras unidades. Estado y hashes actuales: `validacion.md`, sección 7.

## Entrega

- Fuente preservada: `tesis/tesis_parcial2_cap3_revisado.docx`.
- Copia: `tesis/tesis_parcial2_cap3_cap5_avance.docx`.
- Render: `docs/cap5-avance/tesis_parcial2_cap3_cap5_avance.pdf`.
- Informe: `docs/cap5-avance/validacion.md`.
- Preparación del revisor: `docs/cap5-avance/revision-independiente-pendiente.md`.

`capitulo-v.md` es la fuente textual de la inserción. Los archivos `.puml` y sus `.png` son fuentes y figuras técnicas derivadas del código local, no capturas funcionales ni evidencia de ejecución. Las figuras 8, 9, 11, 12, 13 y 15 tienen dos paneles. No se reutilizan los Mermaid desactualizados de semana 8.

## Comprobaciones reproducibles

- `construir.py`: inserción localizada OOXML y recursos nuevos; no modifica la fuente.
- `indices-render.py`: Word COM actualiza los tres índices en una copia temporal; transfiere únicamente resultados de índice y bookmarks asociados, conserva el XML sustantivo previo y exporta PDF en modo solo lectura. No actualiza globalmente citas/bibliografía.
- `verificar.py`: comparación de 1072 bloques previos, miembros ZIP, relaciones/medios, tablas, dibujos, bookmarks y 167 referencias PAGEREF; genera vistas para revisión visual. **No es un revisor independiente.**
- `comparar-render-fuente.py`: render de la fuente en el temporal autorizado y comparaciones de las cinco figuras previas y ecuación.
- `construccion.json`, `render-indices.json`, `verificacion-integridad.json` y `comparacion-render.json`: resultados de la copia final y límites reales.
- `ciclo2-checks.py`, `ciclo2-antes.json` y `ciclo2-delta.json`: respaldo con hashes de entrada y contraste localizado frente a la primera entrega; `ciclo2-comparacion-*.png` facilita revisar los dos fragmentos afectados. No sustituye el segundo dictamen independiente.
- `contacto-*.png`, `detalle-p*.png`, `comparacion-*.png`: apoyos visuales. Las vistas `detalle` fueron regeneradas con la paginación final; el informe identifica qué páginas se revisaron. No son capturas de la aplicación.
- `inspeccionar.py` y `diagnosticar.py`: extracción e inspección auxiliar. Los archivos `diagnostico-*` son apoyos de depuración, no evidencias académicas nuevas ni resultados funcionales.

Los scripts requieren las dependencias disponibles durante esta tarea: Python, lxml, Pillow, PyMuPDF, pywin32, Microsoft Word COM y Java/PlantUML para las figuras. Se utilizó PlantUML 1.2025.10, con el JAR en el temporal externo autorizado. **No se afirma reconstrucción del producto mediante un solo comando.** Ejecutar los scripts de construcción sobrescribe la copia y exige repetir comprobaciones y revisión visual; no ejecuta el prototipo, migraciones ni proveedores.

Las láminas nuevas densas se presentan en A3 horizontal; no deben imprimirse reducidas automáticamente a A4 si se evalúa legibilidad. Las páginas sustantivas previas mantienen su formato A4. El panel PDF de la figura 9 tiene márgenes verticales propios de la lámina, sin cambiar los anteriores.
