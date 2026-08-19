# ARCHITECTURE.md: LoopGravity Technical Design & Multi-Tenant Specification

## 1. Visión General del Sistema
**LoopGravity** es un motor de orquestación agéntica de ciclo cerrado diseñado para crear, simular, validar y exportar arquitecturas de agentes autónomos para Google Antigravity.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LoopGravity SaaS Client                         │
│   (Visual Loop Builder / Live Runner / Multi-Tenant Studio / Exporter) │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
    ┌─────────────────────────┐             ┌─────────────────────────┐
    │  Tenant & Auth Context  │             │   Loop Execution Engine │
    │  (Strict Isolation by   │             │   (State Machine &      │
    │   tenant_id / user_id)  │             │    Self-Healing Loops)  │
    └────────────┬────────────┘             └────────────┬────────────┘
                 │                                       │
                 ▼                                       ▼
    ┌─────────────────────────┐             ┌─────────────────────────┐
    │  Storage / Repositories │             │ Antigravity Exporter    │
    │  (Schemas & Snapshots)  │             │ (.agents/ generator)    │
    └─────────────────────────┘             └─────────────────────────┘
```

---

## 2. Principios Arquitectónicos & Estándares de Seguridad

### A. Aislamiento Multi-Tenant Estricto
Toda operación de lectura o mutación exige explícitamente el contexto de `tenant_id`:
```typescript
interface TenantContext {
  readonly tenantId: string;
  readonly userId: string;
  readonly role: 'owner' | 'admin' | 'developer' | 'auditor';
}

interface WorkspaceEntity {
  id: string;
  tenantId: string; // Foreign key de aislamiento obligatorio
  name: string;
  createdAt: string;
  updatedAt: string;
}
```

### B. Validación de Esquemas Defensiva
Las configuraciones de loops, agentes y parámetros de ejecución se validan mediante esquemas estrictos antes del procesamiento en runtime.

---

## 3. Topología de Agentes y Máquina de Estados del Bucle (Loop Engine)

El ciclo de vida de un bucle de desarrollo consta de 5 fases secuenciales con validación automatizada:

```
[1. Spec & Intent] ──> [2. Multi-Agent Planning] ──> [3. Parallel Build]
                                                            │
    ┌───────────────────────────────────────────────────────┘
    ▼
[4. Deterministic Audit]
    ├─► PASS ──> [5. Verified Delivery (DoD & Antigravity .agents/)]
    └─► FAIL ──> [Self-Healing Patch Loop] ──► (Re-ejecuta Audit)
```

---

## 4. Estructura de Salida Generada para Google Antigravity

LoopGravity exporta la estructura nativa estándar:
```
.agents/
├── agents/
│   ├── director/agent.md
│   ├── investigador/agent.md
│   ├── branding/agent.md
│   ├── creativo/agent.md
│   ├── web/agent.md
│   ├── app-developer/agent.md
│   └── auditor/agent.md
├── skills/
│   └── <custom-skills>/SKILL.md
├── rules/
│   └── AGENTS.md
└── mcp_config.json
```

---

---

## 5. Módulo VideoPromptService (Idea -> Screenplay -> HR Model Sheets -> Multimodal Studio)

El subsistema opera bajo un flujo de producción cinematográfica en 4 etapas:

```
┌────────────────────────────────────────────────────────┐
│                   VideoPromptService                   │
├────────────────────────────────────────────────────────┤
│ 1. Idea-to-Screenplay: Conversión de pitch a guión     │
│ 2. Control de Hojas de Referencia Multimodales (HR):   │
│     * HR-Personaje (Texto + Imagen Model Sheet + VO)   │
│     * HR-Producto (Texto + Vistas Ortográficas 360°)   │
│     * HR-Escenario (Texto + Imagen de Set/Lighting)    │
│ 3. Cinematografía & Shotlist (Steadicam, Gimbal, Macro)│
│ 4. Capa de Audio Multimodal Sincronizada:              │
│     * Diálogos Voice-Over (VO) por timecode            │
│     * Foley & SFX detallado (0-3s, 3-7s, 7-10s)        │
│     * Score / BGM con BPM y mood progression           │
│ 5. Handoff Tail-to-Head para Google Flow, Runway, Kling│
└────────────────────────────────────────────────────────┘
```

### Contrato de Datos (TypeScript Interfaces):
```typescript
interface ReferenceSheetItem {
  readonly token: string;
  readonly description: string;
  readonly imageUrl?: string;
  readonly voiceProfile?: string;
  readonly orthographicViews?: string;
}

interface ReferenceSheetsConfig {
  readonly hrPersonaje: ReferenceSheetItem;
  readonly hrProducto: ReferenceSheetItem;
  readonly hrEscenario: ReferenceSheetItem;
  readonly cinematographyRig: string;
  readonly scoreBgm: string;
  readonly sfxFoleyStyle: string;
  readonly baseSeed: number;
}

interface ScreenplayPayload {
  readonly presetKey: string;
  readonly logline: string;
  readonly totalActs: number;
  readonly durationSeconds: number;
  readonly hrPersonaje: ReferenceSheetItem;
  readonly hrProducto: ReferenceSheetItem;
  readonly hrEscenario: ReferenceSheetItem;
  readonly cameraStyle: string;
  readonly audioScore: string;
  readonly audioSfx: string;
  readonly acts: ReadonlyArray<VideoActDefinition>;
}

interface VideoSequenceBlock {
  readonly blockIndex: number;          // 1 a 10
  readonly timeRangeGlobal: string;     // "00:00 - 00:10", "00:10 - 00:20"
  readonly timeRangeRelative: string;   // "00:00 - 00:10"
  readonly actTitleEs: string;
  readonly actTitleEn: string;
  readonly shotType: string;            // ej. "MCU Low-Angle Push-in", "Macro Probe"
  readonly cameraMotion: string;
  readonly subjectAction: string;
  readonly voDialogueEs: string;        // Diálogo en off sincronizado
  readonly voDialogueEn: string;
  readonly sfxFoley: string;            // Foley segundo a segundo
  readonly seed: number;
  readonly continuityDirective: string; // Tail-to-head camera handoff lock
  readonly promptChunks: {
    readonly chunk03s: string;
    readonly chunk37s: string;
    readonly chunk710s: string;
  };
  readonly assembledPrompt: string;
}

interface MultiBlockSequencePayload {
  readonly tenantId: string;
  readonly sequenceId: string;
  readonly totalDurationSeconds: number; // 10..100s
  readonly totalBlocks: number;          // 1..10
  readonly targetEngine: 'google-flow' | 'runway-gen3' | 'kling-1.5' | 'sora' | 'luma';
  readonly aspectRatio: '16:9' | '9:16';
  readonly referenceSheets: ReferenceSheetsConfig;
  readonly negativePrompt: string;
  readonly sequenceBlocks: readonly VideoSequenceBlock[];
}
```

---

## 6. Observabilidad & Logs Estructurados
Todos los eventos del motor emiten logs con la siguiente firma estructurada:
```json
{
  "timestamp": "2026-08-17T01:20:00Z",
  "level": "INFO",
  "tenantId": "tenant-corp-01",
  "loopId": "loop_a8f93e2b",
  "step": "deterministic_audit",
  "agent": "auditor",
  "status": "PASSED",
  "metrics": {
    "durationMs": 420,
    "testsPassed": 14,
    "lintErrors": 0
  }
}
```
