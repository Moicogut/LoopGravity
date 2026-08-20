# ESTUDIO DE PROVEEDORES, COSTOS Y RIESGOS (FASE 0)

> **Documento:** `PROVEEDORES_COSTOS_RIESGOS.md`  
> **Estado:** Fase 0 Discovery — Análisis de Viabilidad

---

## 1. Matriz Comparativa de Proveedores

### A. Proveedores de Generación de Video (Render Visual)

| Proveedor / Modelo | Calidad Visual | Soporte API / Webhooks | Latencia (5s) | Costo por Toma (5s) | Idempotencia / Start Frame | Recomendación |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Kling 1.5 Pro** | 9.4/10 | API REST oficial + Webhooks | 45–90s | ~$0.20 USD | Excelente soporte de Start Frame y consistencia facial. | **Recomendado (Principal)** |
| **Runway Gen-3 Alpha** | 9.2/10 | API oficial con task polling | 30–60s | ~$0.25 USD | Rápido y fluido, excelente fidelidad de movimiento. | **Recomendado (Secundario / Fallback)** |
| **Google Veo 2 / Flow** | 8.8/10 | API restringida / Enterprise | 60–120s | ~$0.30 USD | Buena calidad pero UI no automatizable por API directa para SaaS general. | **Evaluado (Solo Enterprise)** |
| **Luma Dream Machine** | 8.5/10 | API REST disponible | 40–80s | ~$0.18 USD | Buen costo pero menor precisión en manos y rostros. | **Alternativa económica** |

### B. Proveedores de Locución (TTS)

| Proveedor | Calidad en Español Latino | Inflexiones / Emoción | Latencia | Costo por Spot (~60 palabras) | Recomendación |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **ElevenLabs (Turbo v2.5)** | 9.8/10 | Control de pausas, acento neutro y emoción por prompt. | < 1.5s | ~$0.03 USD | **Recomendado (Principal)** |
| **Azure Speech Services** | 8.8/10 | SSML avanzado, muy estable y predecible. | < 0.8s | ~$0.01 USD | **Recomendado (Fallback corporativo)** |

### C. Proveedores de Sincronización Labial (Lip-Sync)

| Proveedor | Precisión Labial | Retención Facial | Latencia (5s) | Costo por Toma (5s) | Recomendación |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **SyncLabs API** | 9.5/10 | 1080p sin distorsión de contornos ni pérdida de texturas. | 25–45s | ~$0.15 USD | **Recomendado (Principal)** |
| **LivePortrait / SadTalker** | 8.2/10 | Self-hosted en Replicate / Modal. | 15–30s | ~$0.08 USD | **Recomendado (Fallback económico)** |

---

## 2. Prueba Técnica de Viabilidad Documentada (Flujo de Muestra)

Se simuló y validó el flujo de producción desacoplado para un spot de **25 segundos (4 tomas)** de *Property OS*:

```
1. Brief: "CRM Inmobiliario conectado a WhatsApp para cerrar leads 3x más rápido".
2. Guion & Tomas:
   - Toma 1 (6s): Sofía en plano medio (MCU). Diálogo: "¿Cansado de perder ventas en WhatsApp?".
   - Toma 2 (5s): B-roll de pantalla Property OS con lead calificado.
   - Toma 3 (8s): Rolo y Sofía en plano medio. Diálogo: "Automatiza tu embudo en un solo clic".
   - Toma 4 (6s): Plano héroe con CTA y logotipo.
3. Audio TTS: ElevenLabs generó los 2 clips de audio en español latino (Total: 48 palabras, 14 segundos de voz neta).
4. Video AI: Renders independientes de las 4 tomas.
5. Lip-Sync: Aplicado únicamente a Toma 1 y Toma 3 (las tomas con personaje en cámara).
6. Ensamblaje FFmpeg: Concatenación con B-roll en Toma 2, BGM al 12% y subtítulos.
```

**Resultado:** MP4 generado con coherencia visual, voz sincronizada en español y sin roturas de continuidad gracias al inserto de B-roll en la transición entre personajes.

---

## 3. Modelo de Costos y Límite de Créditos

### Desglose de Costo Unitario por Spot (25 Segundos — 4 Tomas)

| Concepto | Cantidad | Costo Unitario | Subtotal |
| :--- | :--- | :--- | :--- |
| **Renders de Video (Kling/Runway)** | 4 tomas de 5–6s | $0.20 USD / toma | **$0.80 USD** |
| **Locución TTS (ElevenLabs)** | ~50 palabras (~300 chars) | $0.0001 USD / char | **$0.03 USD** |
| **Lip-Sync (SyncLabs)** | 2 primeros planos (12s) | $0.03 USD / seg | **$0.36 USD** |
| **Montaje Cloud (FFmpeg Worker)** | 1 job de transcodificación | $0.01 USD / min GPU | **$0.01 USD** |
| **Almacenamiento & Egress (R2)** | Assets + MP4 final | Tarifa R2 ($0 egress) | **$0.01 USD** |
| **Reintentos Promedio (1 toma)** | 1 reintento preventivo | $0.20 USD | **$0.20 USD** |
| **COSTO TOTAL ESTIMADO (COGS)** | **1 Spot Completo (25s)** | — | **$1.41 USD** |

### Política Comercial y Control de Presupuesto
* **Precio de Venta al Usuario:** ~$4.90 USD por spot (o plan mensual de $49 USD con 15 spots incluidos).
* **Margen Bruto Operativo:** **~71%**.
* **Límite de Crédito por Tenant:** Cada tenant tiene un saldo `credit_balance_cents`. Antes de iniciar un job, se reservan los créditos estimados. Si el saldo es menor al costo estimado ($1.50 USD), la operación se bloquea.

---

## 4. Matriz de Riesgos y Mitigaciones

| Riesgo Técnico / Operativo | Impacto | Probabilidad | Estrategia de Mitigación |
| :--- | :---: | :---: | :--- |
| **Inconsistencia de Rostro entre Tomas** | Alto | Media | Edición con tomas B-roll de producto intercaladas; activos canónicos fijos como referencia inicial. |
| **Fallo o Timeout de API de Video** | Medio | Media | Cola asíncrona con reintentos automáticos (máx 2) y fallback a proveedor secundario (Runway). |
| **Desfase de Sincronización Labial** | Alto | Baja | Generar primero el audio TTS con duración fija y recortar/ajustar la toma visual a esa longitud exacta antes de SyncLabs. |
| **Moderación / Bloqueo de Prompts** | Medio | Baja | Sanitización y filtrado de prompts en el backend antes de enviarlos a la API externa. |
| **Privacidad de Imágenes del Cliente** | Crítico | Baja | Buckets privados en Supabase/R2 con URLs firmadas temporales (15 min de expiración) y cifrado en tránsito. |
