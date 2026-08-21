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

## 4. Estado de Ejecución: FASES 0, 1, 2 Y 3 (COMPLETADAS)

- **Fase 0 — Discovery y Validación de Viabilidad:**
  - `PRD_MVP_PRODUCTION_OS.md`: Especificación del primer vertical (Spot de 20–30s, 16:9, máx 2 personajes, 1 producto, 1 set, 4 tomas independientes, locución TTS en español latino, lip-sync y montaje final en MP4).
  - `PROVEEDORES_COSTOS_RIESGOS.md`: Matriz de proveedores (Kling/Runway, ElevenLabs, SyncLabs, FFmpeg Worker), prueba técnica de viabilidad documentada, modelo de costos unitarios ($1.41 USD/spot estimado) y matriz de riesgos.
- **Fase 1 — Núcleo de Datos, RLS y Activos Canónicos:**
  - `supabase_schema.sql`: 12 tablas relacionales con RLS habilitado y políticas de aislamiento estricto por tenant.
  - Implementación en `app.js`: `SecureStorageService`, `AuditService`, `CanonicalAssetService`, `ProductionOSProjectService`.
  - Suite de Pruebas: `test_production_os_phase1.js` (6/6 PASS).
- **Fase 2 — Creative Director, Guion y Storyboard:**
  - Esquema SQL: Tablas `scripts`, `script_versions`, `scenes`, `shots`, `shot_asset_links`, `storyboard_versions`, `storyboard_approvals` con RLS e índices por proyecto.
  - Implementación en `app.js`: `CreativeDirectorService` con generación de 3–5 tomas (20–30s), validación de cadencia de locución ($\le 2.5$ palabras/s), asignación de estrategias de transición (`cut`, `b_roll_insert`, etc.), versionado inmutable y gate de aprobación humana obligatoria.
  - Suite de Pruebas: `test_production_os_phase2.js` (10/10 PASS).
- **Fase 3 — Render Orchestrator y Adaptador de Proveedor:**
  - Esquema SQL: Tablas `render_jobs`, `render_attempts`, `generated_media`, `provider_credentials`, `render_cost_estimates`, `provider_webhook_events`, `idempotency_keys` con RLS y aislamiento estricto.
  - Implementación en `app.js`: `BaseRenderProviderAdapter`, `MockRenderProviderAdapter`, `KlingProviderAdapter`, `RenderOrchestratorService`.
  - Capacidades clave: Creación de plan de render con estimación y reserva de presupuesto, garantía de idempotencia por clave única, manifest inmutable por toma, máquina de estados estricta, verificación de firmas de webhook por HMAC, fallback de polling y registro de `generated_media`.
  - Suite de Pruebas: `test_production_os_phase3.js` (12/12 PASS).

---

## 5. Cierre de Sesión (20/08/2026) — Transición PMV a Production OS

### A. Entregables y Verificaciones Completadas:
- **Scripts V2 de Migración y Verificación Disponibles en `main`:**
  - [`supabase/migrations/20260820_migrate_pmv_to_production_os_v2.sql`](file:///c:/Users/Rolando/Downloads/Prueba%20equipo%20agentes/supabase/migrations/20260820_migrate_pmv_to_production_os_v2.sql)
  - [`supabase/migrations/20260820_verify_production_os_transition_v2.sql`](file:///c:/Users/Rolando/Downloads/Prueba%20equipo%20agentes/supabase/migrations/20260820_verify_production_os_transition_v2.sql)
- **Auditoría en Supabase Production Completada:**
  - Row Level Security (RLS) habilitado en las **29 tablas** (5 PMV + 24 Production OS); políticas revisadas con cláusulas `USING` y `WITH CHECK`.
  - Correspondencia tenants $\leftrightarrow$ organizations: **3/3** (`tenant-nexus-01`, `tenant-apex-02`, `tenant-solo-03`), sin discrepancias de nombres ni claves.
  - Migración `asset_catalog` $\to$ `canonical_assets`: **8/8 registros** migrados defensivamente con sus versiones correspondientes.
  - Integridad referencial auditada: **0 huérfanos** en `asset_links`, `scripts`, `render_jobs` y `canonical_assets`.
  - Clave foránea aditiva creada y validada: `canonical_assets(legacy_catalog_id) REFERENCES public.asset_catalog(id) ON DELETE SET NULL`.
- **Despliegue en Producción (Vercel):**
  - Estado: **Ready** en producción.
  - URL Activa: [https://loopgravity.vercel.app](https://loopgravity.vercel.app) cargando correctamente desde `main` (commit [`8a0a3c0`](https://github.com/Moicogut/LoopGravity/commit/8a0a3c0)).

---

## 6. TAREAS PENDIENTES OBLIGATORIAS

1. **Pruebas Funcionales Manuales en Producción:**
   - Probar navegación completa, Studio, catálogo de assets, flujos de creación/edición y verificar ausencia de errores en la consola del navegador.
2. **Auditoría de Conexión de Backend en Producción:**
   - Confirmar el backend Supabase efectivamente utilizado por la app desplegada en Vercel; no asumir configuración automática por variables de entorno sin verificación en red.
3. **Automatización de Pruebas de Integridad & RLS:**
   - Definir y ejecutar suites de pruebas automatizadas específicas para RLS y validación de claves foráneas en la base de datos.
4. **Revisión de Hardening de `public.current_tenant_id()`:**
   - Revisar en staging la función `public.current_tenant_id()`: actualmente es `SECURITY DEFINER`, retorna `text` y no tiene `search_path` explícitamente fijado (mitigar potencial búsqueda insegura). **No modificar producción sin pruebas previas en staging.**
5. **Documentación Operativa:**
   - Documentar en el README / guía técnica la migración V2, las políticas RLS y la nueva FK de compatibilidad.
