# BRAND_GUIDELINES.md: LoopGravity

## 1. Fundamentos de Marca

* **Nombre de Marca:** **LoopGravity**
* **Misión:** Empoderar a los creadores de software para orquestar, validar y desplegar aplicaciones completas de forma continua mediante bucles autónomos de agentes multi-especializados en Google Antigravity.
* **Visión:** Convertirse en el estándar de facto para la orquestación agéntica de ciclo cerrado en el desarrollo moderno de software.
* **Propuesta de Valor Única (UVP):** *"Diseña el flujo una vez. Deja que bucles agénticos autónomos construyan, auditen y entreguen tu software con estándares de producción en minutos."*
* **Valores Centrales:**
  1. **Determinismo & Rigor Técnico:** Cada línea y componente generado pasa por gates de auditoría y tipado estricto.
  2. **Autonomía Guiada:** Bucles autónomos de auto-corrección sin perder el control ni la gobernanza arquitectónica.
  3. **Velocidad Extrema (Hyper-Velocity):** Reducción del ciclo de desarrollo de semanas a horas.
  4. **Nativo y Abierto:** Diseñado específicamente para el ecosistema Antigravity (Skills, Rules, MCP, Hooks).

---

## 2. Naming, Taglines & Arquitectura de Mensaje

* **Nombre Oficial:** **LoopGravity**
* **Tagline Principal:** *"Autonomous Agentic Loops for Antigravity"*
* **Taglines Secundarios:**
  * *"From Prompt to Production in a Single Closed Loop."*
  * *"Orchestrate AI Squads. Eliminate Technical Debt."*
* **Arquetipo de Marca:** **El Creador + El Sabio (The Creator & The Sage)**
  * Riguroso, altamente técnico, innovador, preciso, sin jerga publicitaria vacía.

---

## 3. Voz y Tono

| Dimensión | Cómo Comunicamos | Qué Evitamos |
| :--- | :--- | :--- |
| **Enfoque** | Técnico, directo al código, arquitectónico y basado en hechos. | Lenguaje vago, promesas mágicas de IA ("hace todo por ti sin programar"). |
| **Tono** | Seguro, eficiente, conciso y orientado a la productividad del desarrollador. | Respuestas verbosas, saludos innecesarios o tono corporativo lento. |
| **Vocabulario** | *Closed-loop orchestration, subagents, multi-tenancy, deterministic QA, MCP integrations.* | *Magical AI, buzzwords de marketing sin sustancia técnica.* |

---

## 4. Design System & CSS Design Tokens

Estos tokens están estandarizados para su inyección inmediata en `index.css` por los subagentes `web` y `app-developer`.

```css
:root {
  /* --- Color Palette: Dark Cyber-Engineering Theme --- */
  --bg-primary: #0a0d14;
  --bg-secondary: #111622;
  --bg-tertiary: #182032;
  --bg-surface: #1e283d;
  --bg-surface-hover: #26334d;

  /* Accent & Gradients */
  --color-primary: #6366f1;         /* Indigo / Antigravity Core */
  --color-primary-glow: rgba(99, 102, 241, 0.35);
  --color-accent-cyan: #06b6d4;     /* Cyber Cyan for Loops */
  --color-accent-cyan-glow: rgba(6, 182, 212, 0.35);
  --color-accent-purple: #a855f7;   /* Synthetic Violet */
  --gradient-accent: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
  --gradient-card: linear-gradient(180deg, rgba(30, 40, 61, 0.7) 0%, rgba(17, 22, 34, 0.85) 100%);

  /* Semantic Feedback States */
  --color-success: #10b981;
  --color-success-bg: rgba(16, 185, 129, 0.12);
  --color-warning: #f59e0b;
  --color-warning-bg: rgba(245, 158, 11, 0.12);
  --color-danger: #ef4444;
  --color-danger-bg: rgba(239, 68, 68, 0.12);
  --color-info: #3b82f6;

  /* Typography Colors */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-inverse: #030712;

  /* Borders & Dividers */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-focus: rgba(99, 102, 241, 0.6);
  --border-card: rgba(255, 255, 255, 0.12);

  /* Typography Families */
  --font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace;
  --font-display: 'Outfit', 'Inter', sans-serif;

  /* Typography Scales */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */

  /* Spacing & Radii */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Elevation & Glassmorphism Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 25px var(--color-primary-glow);
  --shadow-cyan-glow: 0 0 25px var(--color-accent-cyan-glow);
  --glass-blur: blur(16px);
}
```

---

## 5. Definition of Done (DoD) Checklist
- [x] Estrategia de Naming y UVP definida y alineada al análisis de mercado.
- [x] Tono de voz y pautas de comunicación estipuladas.
- [x] Tokens CSS completos para inyección directa en capas Web y App.
