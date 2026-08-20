# PRD: LOOPGRAVITY PRODUCTION OS — PRIMER VERTICAL MVP

> **Documento:** `PRD_MVP_PRODUCTION_OS.md`  
> **Versión:** 1.0.0 (Fase 0 Discovery)  
> **Autorizado por:** Dirección de Arquitectura  
> **Alcance:** Spot comercial de 20–30s con IA desacoplada y montaje en MP4.

---

## 1. Visión y Definición de Producto

LoopGravity Production OS es una **plataforma de producción audiovisual gobernada por IA** que permite a marcas, agencias y fundadores crear spots comerciales de alta conversión mediante un flujo estructurado de 5 pasos, desacoplando la generación visual, la locución y el montaje para garantizar control y calidad predecible.

---

## 2. Especificación del Primer Vertical (MVP)

| Parámetro | Especificación del MVP | Justificación Técnica |
| :--- | :--- | :--- |
| **Duración del Spot** | 20 a 30 segundos (4 a 5 tomas de 5–6s cada una). | Duración estándar de anuncios en redes; optimiza costos de GPU y tiempo de render. |
| **Relación de Aspecto** | 16:9 Horizontal (1920x1080 @ 24fps). | Formato base master de alta resolución antes de adaptaciones verticales. |
| **Elenco** | Máximo 2 personajes con foto frontal canónica. | Minimiza variabilidad y permite interacción clara con el producto. |
| **Producto & Set** | 1 producto canónico + 1 ambiente de estudio 5600K. | Anclaje visual consistente mediante assets predefinidos. |
| **Estructura Narrativa** | 4 tomas obligatorias: 1. Gancho/Problema -> 2. Inserto Producto -> 3. Solución Dúo -> 4. CTA. | Estructura comercial AIDA/PAS con cobertura de edición (B-roll). |
| **Idioma & Locución** | Español latinoamericano con voz TTS hiperrealista. | Eliminación de acentos inconsistentes o traducciones erróneas. |
| **Sincronización Labial** | Lip-sync aplicado únicamente sobre los primeros planos aprobados. | Evita aplicar lip-sync sobre planos generales o tomas de producto. |
| **Subtítulos & Audio** | Subtítulos automáticos quemados + BGM al 12% + SFX sutil. | Accesibilidad en redes y dinamismo sonoro. |
| **Control de Calidad** | Semáforo de revisión humana obligatoria antes del montaje. | Garantiza que ningún video con defectos visuales pase al render final. |
| **Entregable Obligatorio** | Archivo maestro MP4 1080p descargable y auditable. | Resultado listo para distribución comercial. |

---

## 3. Criterios de Aceptación (DoD) del MVP

1. **Flujo UX Simple:** Un usuario sin conocimientos técnicos completa el proyecto en < 3 minutos (`Idea -> Personajes -> Ambiente -> Guion -> Producir`).
2. **Versionado Canónico:** Los personajes y productos conservan su versión inmutable (`asset_version_id`) durante toda la producción.
3. **Desacoplamiento Operativo:** Si el proveedor de video cambia o falla, el audio TTS y el guion permanecen intactos.
4. **Exportación Final:** Generación exitosa de un archivo MP4 reproducible con sincronización audio-video a 24fps.
5. **Auditoría de Costos:** Todo segundo de GPU y carácter de voz queda registrado en `cost_ledger` con saldo debitado en centavos de USD.
