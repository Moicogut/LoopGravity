# USER_MANUAL.md: Manual Didáctico de Usuario para LoopGravity

## 📖 Introducción
**LoopGravity** es un entorno de desarrollo agéntico de ciclo cerrado diseñado para crear, probar y desplegar aplicaciones completas dentro del ecosistema de **Google Antigravity**.

Este manual te guiará paso a paso para que puedas realizar tus pruebas locales de forma fluida y comprender qué hace cada componente.

---

## 🛠️ Guía Rápida Paso a Paso

### Paso 1: Configurar el Aislamiento de Organización (Tenant Scope)
1. En la parte superior derecha de la sección **Studio**, ubica el menú desplegable **Tenant Scope**.
2. Selecciona la organización con la que deseas operar:
   * `tenant-nexus-01`: Entorno Pro para SaaS en producción.
   * `tenant-apex-02`: Entorno Enterprise con gobernanza estricta.
   * `tenant-solo-03`: Entorno Hacker para desarrolladores individuales.
3. *¿Por qué es importante?* Cada ejecución asocia todas las lecturas, escrituras y telemetría a este identificador, asegurando seguridad multi-tenant por diseño.

---

### Paso 2: Redactar la Especificación del Bucle (Spec Input)
Escribe en el campo de texto la idea o requerimiento de tu aplicación. Puedes probar con ejemplos como:
* **Micro-SaaS de Facturación:** `"SaaS de facturación electrónica con Stripe, PDFs automáticos y base de datos multi-tenant"`
* **CRM para Agencias:** `"CRM para agencias con gestión de leads, autenticación multi-tenant y métricas en tiempo real"`
* **API de Inteligencia Artificial:** `"API REST con FastAPI, base de datos vectorial y agente de búsqueda semántica"`

---

### Paso 3: Ejecutar el Bucle Autónomo (`▶ Execute Closed-Loop`)
Haz clic en el botón azul para iniciar la máquina de estados. Observarás:
* **Columna Izquierda (Pipeline):** Las 6 fases cambiarán de estado:
  1. `01. Descubrimiento & Spec` (@investigador)
  2. `02. Identidad & Tokens` (@branding)
  3. `03. Campaña & Copywriting` (@creativo)
  4. `04. Construcción Paralela` (@web + @app-developer)
  5. `05. Auditoría & Auto-Healing` (@auditor)
  6. `06. Consolidación & DoD` (@director)
* **Columna Derecha (Telemetría):** Verás los logs estructurados con marcas de tiempo `[Timestamp]`, el agente activo `[@agent]` y las métricas de prueba.

---

### Paso 4: Auto-Healing y Calidad Determinista
Durante la **Fase 5**, el subagente `@auditor` ejecuta pruebas de tipos (cero `any`), validación de accesibilidad WCAG AA y seguridad. Si detecta alguna discrepancia, aplica un parche de auto-corrección en caliente antes de autorizar la entrega final al `@director`.

---

---

### Paso 5: Producción Audiovisual con Google Labs Flow (Lip-Sync Multi-Actor & Extensión de Video)
1. Desplázate al módulo **Video Studio** ([http://localhost:3000/#video-studio](http://localhost:3000/#video-studio)).
2. **Concepto a Guión & Cantidad de Personajes:**
   - Selecciona la cantidad de personajes que hablarán en cámara:
     - `1 Personaje (Monólogo / Solo)`
     - `2 Personajes (Diálogo Cruzado & Co-Presentadores con Lip-Sync)` [Recomendado]
     - `3+ Personajes (Escena Coral)`
   - Ingresa tu idea o elige una plantilla (`My Cake Studio`, `Property OS`) y haz clic en **"✨ Generar Guión Cinematográfico"**.
3. **Hojas de Referencia (HR) de Personajes:**
   - Configura las imágenes Model Sheet para **HR-Personaje 1** (ej. Sofía Coff) y **HR-Personaje 2** (ej. Moisés Guti) con sus respectivos perfiles vocales.
4. **Flujo de Extensión y Continuidad en Google Flow:**
   - **Bloque 1 (00:00 - 00:10):** El prompt le pide a Flow adjuntar las imágenes de referencia (Model Sheets) para establecer rostros, producto y set.
   - **Bloques 2..N (00:10 - 00:20...):** El prompt instruye explícitamente **adjuntar el Video renderizado del Bloque anterior ($N-1$)** para extender la toma anterior garantizando 100% de consistencia de personajes, ropa, iluminación y encuadre.
5. **Sincronización Labial (Lip-Sync en Cámara):**
   - Cada bloque define quién habla en cámara (`Active Speaker`), la articulación de labios y visemas (`Speech Action`), y la línea de diálogo exacta (`Spoken Line`).
6. **Copiado en 1-Clic:**
   - **`📑 Copiar Prompt Maestro Unificado (Flow)`**: Copia toda la producción con instrucciones de extensión de video y lip-sync sincronizado.
   - **`📋 Copiar Bloque Activo`**: Copia el bloque actual listo para pegar en la barra de Google Labs Flow.

---

### Paso 6: Exportar los Blueprints para Antigravity
Haz clic en el botón **`Export .agents/ Blueprint`** en el Hero o en el Manual para descargar el archivo JSON de configuración. Puedes importar este archivo o la carpeta `.agents/` en cualquier proyecto de Google Antigravity IDE.

---

## 🌐 Cambio de Idioma (Español / English)
En la barra de navegación superior, haz clic en el selector **ES / EN** para alternar instantáneamente todo el contenido de la interfaz, el manual interactivo y los logs de simulación.
