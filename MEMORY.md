# MEMORY.md: Registro Arquitectónico & Roadmap MVP (LoopGravity)

---

## 1. Decisiones Arquitectónicas Implementadas

### A. Pipeline Audiovisual en Bloques de 10s (Google Labs Flow / Veo 2)
- **División Temporal Estricta:** Secuencias desglosadas en bloques modulares de 10 segundos ($N \times 10\text{s}$, de 10s a 100s) para adaptarse a la ventana de generación óptima de los modelos de video de vanguardia.
- **Anclaje y Extensión Secuencial de Video:**
  - **Bloque 1 (00:00 - 00:10):** Establece la escena anclando Hojas de Referencia canónicas (Model Sheets).
  - **Bloques 2..N:** El prompt instruye expresamente adjuntar el archivo de video renderizado del Bloque previo ($N-1$) para extender la toma anterior garantizando 100% de consistencia de rostros, vestimenta, iluminación y set.

### B. Sistema Multi-Personaje & Sincronización Labial (Lip-Sync On-Camera)
- **Selector de Personajes:** Configurable para 1 personaje (monólogo), 2 personajes (diálogo cruzado/co-presentadores) o 3+ (coral).
- **Hojas de Referencia Desacopladas:**
  - `HR-Personaje 1` (Nombre, Model Sheet / Texto canónico, Perfil de Voz & Tono).
  - `HR-Personaje 2` (Nombre, Model Sheet / Texto canónico, Perfil de Voz & Tono).
- **Directivas de Habla Visible:** Sustitución de voz en off genérica por instrucciones de visemas, movimiento labial y articulación facial visible en cámara por cada actor activo.

### C. Hojas de Referencia Dual-Mode & Audio Unificado
- **Dual-Mode (Imagen vs. Texto):** Cada hoja (Personajes, Producto, Escenario) permite seleccionar entre referencia de imagen adjunta (`[HR-Personaje: Imagen adjunta]`) o descripción textual detallada.
- **Audio Unificado en el Prompt:** Locución (VO), Efectos sonoros (SFX/Foley) y Banda sonora (Score/BGM) viajan dentro del prompt maestro para evitar procesos de postproducción complejos.

### D. Persistencia Multi-Tenant & Estado de Workspace (`StorageService`) [PMV Fase 1]
- **Aislamiento Criptográfico/Prefijado:** Almacenamiento local particionado estrictamente mediante claves `lg_tenant_{tenant_id}_*`.
- **Gestión de Proyectos & Autosave:** Guardado, carga y eliminación de proyectos con recuperación instantánea de estado al alternar entre organizaciones (`tenant-nexus-01`, `tenant-apex-02`, `tenant-solo-03`).

### E. Catálogo Reutilizable de Model Sheets & Assets (`AssetCatalogService`) [PMV Fase 2]
- **Biblioteca Desacoplada por Tenant:** Catálogo independiente para Actores (rostros, biometría, perfiles de voz), Productos (vistas ortográficas, UI tokens) y Escenarios (iluminación, sets).
- **Integración UI Bidireccional:** Selectores rápidos en cada pestaña HR y Modal de Assets interactivo con función "Usar" y "Guardar en Catálogo".

---

## 2. Estado Actual del Sistema

| Componente | Estado | Detalle |
| :--- | :--- | :--- |
| **Engine & Squads** | ✅ Operativo | 7 agentes especializados (`@director`, `@creativo`, etc.) y presets cinematográficos. |
| **Video Studio (UI & Prompt Engine)** | ✅ Operativo | Generación de prompts para Google Flow, Runway Gen-3, Kling 1.5, Sora y Luma. |
| **Persistencia Multi-Tenant (StorageService)** | ✅ Operativo | Guardado y carga de proyectos con aislamiento estricto por `tenant_id`. |
| **Biblioteca de Model Sheets (AssetCatalogService)** | ✅ Operativo | Catálogo de actores, productos y escenarios con modal y selectores rápidos. |
| **Pruebas Automatizadas PMV** | ✅ 100% Passed | `test_pmv_storage_catalog.js` validando 4 suites (Aislamiento, CRUD, Catálogo, Lip-Sync). |

---

### F. Motor de Exportación Profesional de Línea de Tiempo & Batch (`ExportEngine`) [PMV Fase 3]
- **OpenTimelineIO (`.otio` v1):** Generación de timelines nativas con 3 pistas independientes (Video continuo en bloques de 10s, Audio VO con metadatos de Lip-Sync y Pistas Foley/SFX) para DaVinci Resolve y Premiere Pro.
- **Final Cut Pro XML (`.fcpxml` v1.9):** Marcadores de tiempo exactos (24fps / 240 frames por bloque) con prompts ensamblados y líneas de diálogo.
- **Planilla CSV de Producción (`.csv`):** Cuadro de rodaje técnico tabular con directivas de ingesta y seeds deterministas.
- **Guión Técnico Markdown (`.md`):** Documento técnico de rodaje cinematográfico.

### G. CRM de Leads & Telemetría SaaS Multi-Tenant (`CrmService`) [PMV Fase 4]
- **Gestión de Prospectos Aislada:** Pipeline de leads calificados por organización con Lead Score (0-100), valor de deal, estados de embudo (Nuevo, Calificado IA, Demo, Ganado, Perdido) y exportación a CSV.
- **Métricas de Consumo & ROI en Tiempo Real:** Rastreo acumulado de segundos de video generados, tokens IA procesados, costo estimado de APIs GPU y horas de desarrollo ahorradas.
- **Sincronización Bidireccional:** Formulario web de Early Access / Demo conectado automáticamente al CRM del tenant activo.

---

## 2. Estado Actual del Sistema (PMV 100% Completo)

| Componente | Estado | Detalle |
| :--- | :--- | :--- |
| **Engine & Squads** | ✅ Operativo | 7 agentes especializados (`@director`, `@creativo`, etc.) y presets cinematográficos. |
| **Video Studio (UI & Prompt Engine)** | ✅ Operativo | Generación de prompts para Google Flow, Runway Gen-3, Kling 1.5, Sora y Luma. |
| **Persistencia Multi-Tenant (StorageService)** | ✅ Operativo | Guardado y carga de proyectos con aislamiento estricto por `tenant_id`. |
| **Biblioteca de Model Sheets (AssetCatalogService)** | ✅ Operativo | Catálogo de actores, productos y escenarios con modal y selectores rápidos. |
| **Exportador de Producción (ExportEngine)** | ✅ Operativo | Descarga en 1 clic de OTIO, FCPXML, CSV, Markdown y Batch JSON. |
| **CRM & Telemetría SaaS (CrmService)** | ✅ Operativo | Pipeline de leads, KPI cards, registro de cómputo GPU y exportación CSV. |
| **Pruebas Automatizadas PMV** | ✅ 100% Passed | 12/12 suites pasadas (`test_pmv_storage_catalog.js`, `test_pmv_phase3_export.js`, `test_pmv_phase4_crm.js`). |

---

## 3. Estado del PMV de Mercado
- **Fase 1 (Persistencia Multi-Tenant):** ✅ Completada
- **Fase 2 (Catálogo de Model Sheets):** ✅ Completada
- **Fase 3 (Exportador Profesional Timeline):** ✅ Completada
- **Fase 4 (CRM de Leads & Analítica SaaS):** ✅ Completada
- **Resultado:** PMV listo para despliegue y validación comercial con usuarios reales.
