# Equipo de Custom Agents de Antigravity: Product Launch Squad

Este directorio contiene la configuración completa de 7 agentes especializados para el lanzamiento de un producto digital desde cero.

## Estructura de Agentes

```
.agents/agents/
├── director/       # [mainAgent] Orquestador general y consolidador
├── investigador/   # [subagent] Mercado, benchmarking y user personas
├── branding/       # [subagent] Naming, posicionamiento y design tokens
├── creativo/       # [subagent] Copywriting, campañas y storytelling
├── web/            # [subagent] Landing page responsive y conversión
├── app-developer/  # [subagent] Ingeniería de la aplicación y lógica SaaS
└── auditor/        # [subagent] QA técnico, seguridad y coherencia
```

## Flujo de Orquestación Paso a Paso

1. **Activación del Director**:
   En el IDE/CLI de Antigravity, selecciona el agente `director` mediante el selector de agentes o el comando `/agents`.

2. **Fase 1: Descubrimiento**:
   El Director invoca a `investigador`. Salida: `RESEARCH_REPORT.md`.

3. **Fase 2: Identidad y Tokens**:
   El Director pasa `RESEARCH_REPORT.md` a `branding`. Salida: `BRAND_GUIDELINES.md`.

4. **Fase 3: Contenido Persuasivo**:
   El Director pasa la identidad a `creativo`. Salida: `CREATIVE_PACK.md`.

5. **Fase 4: Construcción Paralela**:
   - `web` construye la landing comercial con el copy y los tokens.
   - `app-developer` implementa la app funcional con aislamiento y tipado estricto.

6. **Fase 5: Auditoría y Verificación**:
   `auditor` ejecuta pruebas E2E, revisa aislamiento multi-tenant y accesibilidad. Salida: `AUDIT_REPORT.md`. Si hay observaciones, los especialistas corrigen.

7. **Fase 6: Aprobación y Consolidación**:
   El Director emite `LAUNCH_OVERVIEW.md` con todos los activos validados.
