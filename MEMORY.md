# LoopGravity — Registro de Memoria y Decisiones Arquitectónicas (MEMORY.md)

Este documento registra las decisiones técnicas, estado de certificación, estructura de módulos y tareas pendientes de la plataforma **LoopGravity SaaS**.

---

## 1. Módulos y Arquitectura del Sistema

### A. Núcleo Agéntico y Presets de Squads
- **Agentes:** 7 agentes especializados (`@investigador`, `@branding`, `@creativo`, `@web`, `@app-developer`, `@auditor`, `@director`).
- **Presets Cinematográficos:** `My Cake Studio` (Pastelería Gourmet), `Property OS` (SaaS PropTech), `Hardware Robotics` (Edge AI).

### B. Persistencia Multi-Tenant (`StorageService`) [Fase 1]
- Aislamiento estricto por clave `lg_tenant_{tenant_id}_*`.
- Modo híbrido con soporte local/memoria y fallback transparente.

### C. Catálogo de Model Sheets (`AssetCatalogService`) [Fase 2]
- Biblioteca de Actores, Productos y Escenarios canónicos con model sheets de alta resolución.

### D. Exportador NLE Profesional (`ExportEngine`) [Fase 3]
- **OpenTimelineIO (`.otio` v1):** 3 pistas (Video, Audio VO/Beats, SFX/Foley).
- **Final Cut Pro XML (`.fcpxml` v1.9):** Marcadores frame-accurate a 24fps.
- **CSV de Producción:** Cuadro de rodaje tabular con protección contra inyección de fórmulas `[=+@-\t\r]`.
- **Guión Técnico Markdown (`.md`):** Desglose teatral de rodaje.

### E. CRM de Leads & Telemetría SaaS (`CrmService`) [Fase 4]
- Pipeline de prospectos con Lead Score, estados de embudo y cálculo de ROI/cómputo GPU en vivo.
- Sanitización XSS obligatoria con `escapeHtml()`.

### F. Infraestructura Cloud PostgreSQL & Supabase RLS [Fase 5]
- Proyecto Cloud: `https://bsftifcgyuaubmachzvi.supabase.co`.
- 5 tablas relacionales (`tenants`, `projects`, `asset_catalog`, `crm_leads`, `usage_telemetry`).
- Función `public.current_tenant_id()` y políticas RLS activas en todas las tablas.

---

## Fase 6 — Video Performance Engine & Validación Audiovisual en Flow

- **Video Performance Engine implementado en `app.js`:**
  - Modelo `performance_beats` integrado para actuación multi-personaje sin personajes pasivos ni congelados.
  - Cada bloque de 10 segundos contiene al menos 2 beats de actuación.
  - Cada beat incluye estrictamente:
    - `actor`
    - `dialogue_es`
    - `emotion`
    - `physical_action`
    - `eyeline_direction`
    - `listener_reaction`
    - `estimated_duration_seconds` (Suma estricta por bloque = 10.0s $\pm 0.25$s).
- **Reglas activas de prompt assembler:**
  - `STRICTLY NO voice-over`.
  - `NO off-screen dialogue`.
  - `NO frozen actors`.
  - `NO static mannequin poses`.
  - `NO inactive co-stars / blank stares`.
  - Escucha activa, contacto visual continuo, microexpresiones, respiración natural y reacción contextual.
- **Continuidad N-1:** Aplicada a los bloques 2 y 3 mediante directivas de extensión de vector y encadenamiento de media adjunta.
- **ExportEngine enriquecido:** Incorporación de performance beats en OTIO (clips de audio por beat), FCPXML (marcadores con timecodes), CSV (17 columnas) y Markdown (desglose teatral).
- **Suites de Pruebas Automatizadas (25 / 25 PASS):**
  1. `test_pmv_storage_catalog.js` (4/4 PASS)
  2. `test_pmv_phase3_export.js` (4/4 PASS)
  3. `test_pmv_phase4_crm.js` (6/6 PASS)
  4. `test_pmv_phase5_supabase.js` (4/4 PASS)
  5. `test_pmv_performance_beats.js` (7/7 PASS)
- **Estado técnico declarado:** 25/25 pruebas automatizadas aprobadas, sujeto a verificación posterior de la evidencia y commit remoto en GitHub.

---

## ESTADO DE CERTIFICACIÓN

- **Arquitectura del PMV:** Aprobada.
- **Seguridad frontend y Supabase RLS:** Aprobadas según pruebas técnicas.
- **Video Performance Engine:** Implementado y pendiente de auditoría directa de código integrado en GitHub.
- **Calidad audiovisual profesional:** NO certificada todavía.
- **Pase audiovisual final a producción:** BLOQUEADO hasta revisar renders reales.

---

## TAREAS PENDIENTES OBLIGATORIAS

### A. Sincronización y trazabilidad:
- [x] Ejecutar: `git push origin main`
- [x] Confirmar que el commit del Video Performance Engine esté visible en GitHub dentro de la rama main.
- [x] Entregar hash completo del commit (`94a6e4a`) y enlace de GitHub: [https://github.com/Moicogut/LoopGravity/commit/94a6e4a](https://github.com/Moicogut/LoopGravity/commit/94a6e4a).

### B. Auditoría técnica posterior:
- [x] Confirmar que `test_pmv_performance_beats.js` exista en `main`.
- [x] Confirmar que `performance_beats` exista en `app.js` de `main`.
- [x] Entregar salida completa de las cinco suites de pruebas.
- [x] Verificar resultado total esperado: 25/25 PASS.

### C. Prueba visual real en Google Flow:
- [ ] Generar 3 variaciones independientes del Bloque 1 de 10 segundos.
- [ ] Usar exactamente las cuatro referencias:
  - Sofía Coff (`HR-Personaje 1`).
  - Moisés Guti (`HR-Personaje 2`).
  - Producto My Cake Studio (`HR-Producto`).
  - Escenario Pastel Bakery Studio (`HR-Escenario`).
- [ ] Usar el prompt de prueba oficial V1 aprobado por Auditoría.
- [ ] Descargar los tres MP4 originales o grabar su reproducción con audio.
- [ ] Adjuntar una captura de Flow mostrando el prompt y los cuatro assets.
- [ ] Indicar el modelo exacto usado en Flow/Veo.

### D. Criterios visuales de auditoría:
- [ ] Sofía habla en cámara con lip-sync aceptable en español.
- [ ] Moisés escucha activamente y luego habla en cámara.
- [ ] Sofía reacciona de forma visible durante el diálogo de Moisés.
- [ ] No hay voz en off ni diálogo fuera de cuadro.
- [ ] No hay actores congelados, inexpresivos o pasivos.
- [ ] Rostros, manos, pastel y escenario permanecen estables.
- [ ] El plano muestra claramente a ambos personajes y el producto.
- [ ] Se selecciona una variación con calidad visual mínima de 8/10 antes de crear los Bloques 2 y 3.
