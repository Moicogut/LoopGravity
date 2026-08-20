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
- **Agente Especializado Flow Director (`.agents/agents/flow-director/agent.md`):**
  - Diseñado exclusivamente para Google Labs Flow / Omni Flash y Google Veo 2.
  - Flujo lineal simplificado de 5 pasos: `Idea -> Personajes -> Ambiente -> Guión -> Prompts Flow`.
  - Regla de anclaje de continuidad estricta: Bloque 1 solo con referencias de personajes; Bloques 2+ anclados con 1 solo fotograma guardado (Start Frame) sin re-adjuntar personajes por separado.
  - Generación de prompts limpios en lenguaje natural (<60 palabras) con diálogos en español entre comillas y directiva de audio `Audio en español con voz nítida y sincronización labial`.
- **Modificación en `app.js`:**
  - Campo `flow_clean_prompt` generado nativamente para cada bloque.
  - `promptOutput.value` prioriza el prompt limpio y ejecutable al seleccionar Google Flow.
- **Suites de Pruebas Automatizadas (25 / 25 PASS):**
  1. `test_pmv_storage_catalog.js` (4/4 PASS)
  2. `test_pmv_phase3_export.js` (4/4 PASS)
  3. `test_pmv_phase4_crm.js` (6/6 PASS)
  4. `test_pmv_phase5_supabase.js` (4/4 PASS)
  5. `test_pmv_performance_beats.js` (7/7 PASS)
- **Estado técnico declarado:** 25/25 pruebas automatizadas aprobadas, sujeto a verificación posterior de la evidencia y commit remoto en GitHub.

---

---

## 3. Estado Oficial de Arquitectura: LoopGravity Production OS

**Declaración Oficial:**  
*LOOPGRAVITY PRODUCTION OS — ARQUITECTURA EN DISEÑO. LA CONTINUIDAD SE RESUELVE POR PRODUCCIÓN, QA Y EDICIÓN; NO POR PROMPTS DE EXTENSIÓN DETERMINISTA N-1.*

- **Evolución del Producto:** LoopGravity deja de definirse como un generador de prompts para Flow/Veo y se redefine como **Plataforma de Producción Audiovisual con IA desacoplada**.
- **Documento Rector:** [`PLAN_IMPLEMENTACION_LOOPGRAVITY_PRODUCTION_OS.md`](file:///c:/Users/Rolando/Downloads/Prueba%20equipo%20agentes/PLAN_IMPLEMENTACION_LOOPGRAVITY_PRODUCTION_OS.md).
- **Pilares del Rediseño:**
  1. *UX Simple en 5 pasos:* `Idea -> Personajes -> Ambiente -> Guion -> Producir video`.
  2. *Canonical Asset System:* Fichas inmutables de personajes, vestuario, producto y ambiente.
  3. *Tomas Independientes & B-Roll:* El Render Orchestrator genera tomas desacopladas; la continuidad se asegura mediante montaje editorial e insertos de producto.
  4. *Voice & Lip-Sync Desacoplados:* TTS previo (ElevenLabs) + Lip-Sync posterior (SyncLabs).
  5. *Continuity QA & Revisión Humana:* Aprobación obligatoria antes de ensamblar.
  6. *Auto Editor FFmpeg:* Renderizado final en la nube en MP4 con pistas de audio separadas y subtítulos.
  7. *Aislamiento Multi-Tenant & Cost Ledger:* Supabase RLS y control de presupuesto por tenant.

---

## 4. Estado de Ejecución: FASE 0 & FASE 1 (COMPLETADAS)

- **Fase 0 — Discovery y Validación de Viabilidad:**
  - `PRD_MVP_PRODUCTION_OS.md`: Especificación del primer vertical (Spot de 20–30s, 16:9, máx 2 personajes, 1 producto, 1 set, 4 tomas independientes, locución TTS en español latino, lip-sync y montaje final en MP4).
  - `PROVEEDORES_COSTOS_RIESGOS.md`: Matriz de proveedores (Kling/Runway, ElevenLabs, SyncLabs, FFmpeg Worker), prueba técnica de viabilidad documentada, modelo de costos unitarios ($1.41 USD/spot estimado) y matriz de riesgos.
- **Fase 1 — Núcleo de Datos, RLS y Activos Canónicos:**
  - `supabase_schema.sql`: 12 tablas relacionales (`organizations`, `users`, `organization_members`, `projects`, `creative_briefs`, `voice_profiles`, `canonical_assets`, `asset_versions`, `asset_links`, `audit_events`, `cost_ledger`, `usage_telemetry`) con RLS habilitado y políticas de aislamiento estricto por tenant.
  - Implementación en `app.js`:
    - `SecureStorageService`: Generación y validación de URLs firmadas criptográficamente con timestamp de expiración.
    - `AuditService`: Registro inmutable de eventos sensibles (`audit_events`) con aislamiento multi-tenant.
    - `CanonicalAssetService`: Creación, versionado (`asset_versions`), archivado, restauración y consultas de activos de marca.
    - `ProductionOSProjectService`: Guardado y recuperación de borradores en el flujo de 5 pasos con vinculación inmutable de versiones de activos.
  - Suite de Pruebas: `test_production_os_phase1.js` (6/6 PASS).

---

## ESTADO DE CERTIFICACIÓN GLOBAL

- **Fase 0 (Discovery & Viabilidad):** APROBADA y documentada.
- **Fase 1 (Datos, RLS & Activos Canónicos):** IMPLEMENTADA y certificada con pruebas automatizadas.
- **Suites de Pruebas Automatizadas Totales (31 / 31 PASS - 0 ERRORES):**
  1. `test_pmv_storage_catalog.js` (4/4 PASS)
  2. `test_pmv_phase3_export.js` (4/4 PASS)
  3. `test_pmv_phase4_crm.js` (6/6 PASS)
  4. `test_pmv_phase5_supabase.js` (4/4 PASS)
  5. `test_pmv_performance_beats.js` (7/7 PASS)
  6. `test_production_os_phase1.js` (6/6 PASS)
- **Fases Restantes (Fase 2 a Fase 7):** En espera de auditoría y autorización formal.
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
