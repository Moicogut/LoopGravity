/**
 * LoopGravity Core Application Engine
 * Architecture: Modular, Type-safe, Multi-tenant Isolation, Multilingual (ES/EN)
 */

// --- Security Helpers ---
function escapeHtml(unsafe) {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// --- 1. Multilingual Translation Dictionary (i18n) ---
const I18N = {
  es: {
    nav_studio: 'Studio & Runner',
    nav_video: '🎬 Video Studio (10s)',
    nav_manual: '📖 Manual Didáctico',
    nav_features: 'Capacidades',
    nav_blueprints: 'Plantillas de Squads',
    nav_pricing: 'Precios',
    nav_launch: 'Iniciar Studio',
    hero_badge: '⚡ Motor de Bucles Autónomos para Antigravity',
    hero_title: 'De la Arquitectura a Producción en un <span class="gradient-text">Único Bucle Autónomo</span>.',
    hero_subtitle: 'Orquesta escuadrones de IA especializados que diseñan, programan, auditan y auto-corrigen tus aplicaciones directamente en Google Antigravity. Cero alucinaciones. 100% tipado seguro.',
    hero_cta_start: 'Iniciar Bucle en Vivo',
    hero_cta_export: 'Exportar Blueprint .agents/',
    hero_trust_1: '✓ Sin tarjeta de crédito',
    hero_trust_2: '✓ Genera .agents/ listos para producción',
    hero_trust_3: '✓ Aislamiento multi-tenant garantizado',
    studio_badge: 'Simulación Interactiva',
    studio_title: 'LoopGravity Studio: Ejecutor de Pipelines Autónomos',
    tenant_scope_label: 'Alcance Tenant:',
    spec_placeholder: 'Describe el bucle de la aplicación a generar...',
    btn_execute: '▶ Ejecutar Bucle Cerrado',
    pipeline_title: 'Pipeline de Ejecución del Escuadrón',
    pipeline_badge: '6 Fases Activas',
    telemetry_title: 'Telemetría de Observabilidad Estructurada',
    telemetry_badge: 'En Vivo',
    ready_log: 'Motor de bucles inicializado en modo estricto. Presiona "Ejecutar Bucle Cerrado" para iniciar la simulación.',
    stage_0_title: 'Descubrimiento & Spec',
    stage_0_sub: '@investigador → Análisis de mercado & JTBD',
    stage_1_title: 'Identidad & Tokens',
    stage_1_sub: '@branding → Tokens CSS & tono de voz',
    stage_2_title: 'Campaña & Copywriting',
    stage_2_sub: '@creativo → Narrativa PAS/AIDA, copy deck & video prompts',
    stage_3_title: 'Construcción Paralela',
    stage_3_sub: '@web & @app-developer → SaaS & Frontend',
    stage_4_title: 'Auditoría & Auto-Healing',
    stage_4_sub: '@auditor → Chequeo de tipos, tests & seguridad',
    video_badge: 'Estudio de Producción de Video IA & Hojas de Referencia (HR)',
    video_title: 'Video Prompt Studio: Hojas de Referencia (HR) & Audio Multimodal (10s - 100s)',
    video_desc: 'Controla la producción cinematográfica mediante Hojas de Referencia de Personaje (HR-Personaje), Producto (HR-Producto) y Escenario (HR-Escenario), con cinematografía multi-toma y diseño sonoro sincronizado (Diálogos VO + SFX + Score).',
    video_label_engine: 'Motor de Video IA:',
    video_label_blocks: 'Duración Total & Bloques:',
    video_label_ratio: 'Formato / Ratio:',
    video_label_preset: 'Preset de Producción:',
    video_tab_general: '🎬 Ajustes de Cámara',
    video_tab_hr_actor: '👤 HR-Personaje',
    video_tab_hr_product: '💎 HR-Producto',
    video_tab_hr_env: '🏢 HR-Escenario',
    video_tab_audio: '🎧 Audio & SFX',
    video_label_camera_style: 'Estilo de Cinematografía & Lente:',
    video_label_actor_desc: 'HR-Personaje: Identidad, Rostro & Vestuario:',
    video_label_actor_voice: 'Perfil de Voz & Tono (VO):',
    video_label_product_desc: 'HR-Producto: UI / Hardware / Branding:',
    video_label_env_desc: 'HR-Escenario: Set, Iluminación & Atmósfera:',
    video_label_audio_bgm: 'Score / Música de Fondo (BPM & Mood):',
    btn_generate_video: '⚡ Generar Producción Completa (HR + Audio + Video)',
    btn_copy_all_prompts: '📑 Copiar Script Maestro',
    btn_copy_current_prompt: '📋 Copiar Bloque Activo',
    btn_copy_audio_script: '🎙️ Copiar Guión de Audio (VO + SFX)',
    btn_copy_json: '💾 Copiar Payload JSON',
    timeline_title: 'Desglose Temporal del Bloque Activo (Video + Audio)',
    toast_prompt_copied: '✓ Prompt del bloque activo copiado al portapapeles.',
    toast_all_copied: '✓ Script maestro completo copiado al portapapeles.',
    toast_audio_copied: '✓ Guión de audio y efectos de sonido copiado al portapapeles.',
    toast_json_copied: '✓ Payload JSON estructurado copiado al portapapeles.',
    manual_badge: 'Guía Didáctica',
    manual_title: 'Manual de Uso Rápido para Pruebas Locales',
    manual_desc: 'Aprende a operar el motor de bucles y cómo interactúan los 7 agentes.',
    manual_step_1_pill: 'Paso 01',
    manual_step_1_title: 'Configurar Organización (Tenant)',
    manual_step_1_desc: 'Selecciona en el menú superior el Tenant Scope. Toda lectura, escritura y log quedará estrictamente aislada bajo esa organización.',
    manual_step_2_pill: 'Paso 02',
    manual_step_2_title: 'Ingresar la Especificación (Spec)',
    manual_step_2_desc: 'Escribe tu idea de producto o haz clic en cualquiera de estos ejemplos para probar de inmediato:',
    manual_step_3_pill: 'Paso 03',
    manual_step_3_title: 'Monitorear la Telemetría en Vivo',
    manual_step_3_desc: 'Al hacer clic en "Ejecutar", observa cómo el Investigador, Branding, Creativo, Web, App Developer y Auditor coordinan la entrega paso a paso.',
    manual_step_4_pill: 'Paso 04',
    manual_step_4_title: 'Auditoría con Auto-Healing',
    manual_step_4_desc: 'En la Fase 5, el auditor ejecuta pruebas automáticas y corrige en caliente cualquier discrepancia antes del visto bueno del Director.',
    manual_step_5_pill: 'Paso 05',
    manual_step_5_title: 'Video Prompt Studio con Hojas de Referencia (HR)',
    manual_step_5_desc: 'Personaliza HR-Personaje, HR-Producto y HR-Escenario con diseño sonoro (VO + SFX) sincronizado.',
    manual_step_6_pill: 'Paso 06',
    manual_step_6_title: 'Exportar a Antigravity IDE',
    manual_step_6_desc: 'Haz clic en "Exportar .agents/" para descargar la configuración completa e importarla a tu entorno de trabajo de Antigravity.',
    toast_copied: '✓ Ejemplo copiado a la casilla de ejecución.',
    toast_tenant: 'Contexto cambiado a:',
    toast_completed: '🎉 Loop completado al 100%. Artefactos listos para exportación.',
    toast_exported: '✓ Configuración exportada para Antigravity IDE.'
  },
  en: {
    nav_studio: 'Studio & Runner',
    nav_video: '🎬 Video Studio (HR & Audio)',
    nav_manual: '📖 User Guide',
    nav_features: 'Capabilities',
    nav_blueprints: 'Squad Blueprints',
    nav_pricing: 'Pricing',
    nav_launch: 'Launch Studio',
    hero_badge: '⚡ Antigravity-Native Closed-Loop Engine',
    hero_title: 'From Architecture to Production in a <span class="gradient-text">Single Autonomous Loop</span>.',
    hero_subtitle: 'Orchestrate specialized AI squads that design, code, audit, and self-heal your applications directly inside Google Antigravity. Zero hallucinations. 100% type-safe.',
    hero_cta_start: 'Start Live Loop',
    hero_cta_export: 'Export .agents/ Blueprint',
    hero_trust_1: '✓ No credit card required',
    hero_trust_2: '✓ Generates production-ready .agents/',
    hero_trust_3: '✓ Multi-tenant isolated',
    studio_badge: 'Interactive Simulation',
    studio_title: 'LoopGravity Studio: Autonomous Pipeline Runner',
    tenant_scope_label: 'Tenant Scope:',
    spec_placeholder: 'Describe the application loop to generate...',
    btn_execute: '▶ Execute Closed-Loop',
    pipeline_title: 'Agent Squad Execution Pipeline',
    pipeline_badge: '6 Stages Active',
    telemetry_title: 'Structured Observability Telemetry',
    telemetry_badge: 'Live Stream',
    ready_log: 'Loop engine initialized in strict mode. Click "Execute Closed-Loop" to start simulation.',
    stage_0_title: 'Discovery & Spec',
    stage_0_sub: '@investigador → Market analysis & JTBD',
    stage_1_title: 'Identity & Tokens',
    stage_1_sub: '@branding → CSS tokens & tone of voice',
    stage_2_title: 'Campaign & Copywriting',
    stage_2_sub: '@creativo → PAS/AIDA narrative, copy deck & video prompts',
    stage_3_title: 'Parallel Construction',
    stage_3_sub: '@web & @app-developer → SaaS & Frontend',
    stage_4_title: 'Audit & Auto-Healing',
    stage_4_sub: '@auditor → Type-check, tests & security',
    stage_5_title: 'Consolidation & DoD',
    stage_5_sub: '@director → Verified deployment artifact',
    video_badge: 'AI Video Production Studio & Reference Sheets (HR)',
    video_title: 'Video Prompt Studio: Reference Sheets (HR) & Multimodal Audio (10s - 100s)',
    video_desc: 'Master cinematic production with Character Reference Sheets (HR-Personaje), Product Sheets (HR-Producto), and Environment Sheets (HR-Escenario), plus synchronized audio design (VO Dialogue + SFX + Score).',
    video_label_engine: 'Target AI Video Engine:',
    video_label_blocks: 'Total Duration & Blocks:',
    video_label_ratio: 'Aspect Ratio:',
    video_label_preset: 'Production Preset:',
    video_tab_general: '🎬 Camera Rig',
    video_tab_hr_actor: '👤 HR-Character',
    video_tab_hr_product: '💎 HR-Product',
    video_tab_hr_env: '🏢 HR-Environment',
    video_tab_audio: '🎧 Audio & SFX',
    video_label_camera_style: 'Cinematography Style & Lens:',
    video_label_actor_desc: 'HR-Character: Identity, Face & Wardrobe:',
    video_label_actor_voice: 'Voice Profile & Tone (VO):',
    video_label_product_desc: 'HR-Product: UI / Hardware / Branding:',
    video_label_env_desc: 'HR-Environment: Set, Lighting & Atmosphere:',
    video_label_audio_bgm: 'Score / Background Music (BPM & Mood):',
    btn_generate_video: '⚡ Generate Full Production (HR + Audio + Video)',
    btn_copy_all_prompts: '📑 Copy Master Script',
    btn_copy_current_prompt: '📋 Copy Active Block',
    btn_copy_audio_script: '🎙️ Copy Audio Script (VO + SFX)',
    btn_copy_json: '💾 Copy Full JSON Payload',
    timeline_title: 'Active Block Temporal Breakdown (Video + Audio)',
    toast_prompt_copied: '✓ Active block prompt copied to clipboard.',
    toast_all_copied: '✓ Full master script copied to clipboard.',
    toast_audio_copied: '✓ Synchronized audio script & SFX copied to clipboard.',
    toast_json_copied: '✓ Structured JSON payload copied to clipboard.',
    manual_badge: 'User Guide',
    manual_title: 'Didactic Manual for Local Testing',
    manual_desc: 'Learn how to operate the loop engine and how the 7 specialized agents collaborate.',
    manual_step_1_pill: 'Step 01',
    manual_step_1_title: 'Configure Tenant Scope',
    manual_step_1_desc: 'Select the organization from the top right menu. All database queries, code mutations, and logs remain strictly isolated by tenant.',
    manual_step_2_pill: 'Step 02',
    manual_step_2_title: 'Enter Specification (Spec)',
    manual_step_2_desc: 'Write your application idea or click any of these instant examples to test right away:',
    manual_step_3_pill: 'Step 03',
    manual_step_3_title: 'Monitor Live Telemetry',
    manual_step_3_desc: 'Click "Execute" and watch Researcher, Branding, Creative, Web, App Developer, and Auditor coordinate step by step.',
    manual_step_4_pill: 'Step 04',
    manual_step_4_title: 'Audit with Auto-Healing',
    manual_step_4_desc: 'In Phase 5, the auditor runs automated suites and patches any discrepancies before Director approval.',
    manual_step_5_pill: 'Step 05',
    manual_step_5_title: 'Video Prompt Studio (10s)',
    manual_step_5_desc: 'Create deterministic 10s prompts with actor and environment anchors without frame fluctuation.',
    manual_step_6_pill: 'Step 06',
    manual_step_6_title: 'Export to Antigravity IDE',
    manual_step_6_desc: 'Click "Export .agents/" to download the complete topology and import it directly into your Antigravity workspace.',
    toast_copied: '✓ Example copied to input field.',
    toast_tenant: 'Tenant context switched to:',
    toast_completed: '🎉 Loop completed 100%. Artifacts ready for export.',
    toast_exported: '✓ Blueprint exported for Antigravity IDE.'
  }
};

// --- 2. Multi-Tenant Context & Store ---
class TenantService {
  constructor() {
    this.currentTenantId = 'tenant-nexus-01';
    this.currentUserId = 'usr_alex_founder';
    this.tenants = [
      { id: 'tenant-nexus-01', name: 'Nexus AI Labs (SaaS Production)', plan: 'Pro Squad' },
      { id: 'tenant-apex-02', name: 'Apex FinTech Corp (Enterprise)', plan: 'Enterprise' },
      { id: 'tenant-solo-03', name: 'Alex Solo Lab (Hacker Tier)', plan: 'Hacker' }
    ];
    this.listeners = [];
  }

  onTenantChange(cb) {
    if (typeof cb === 'function') {
      this.listeners.push(cb);
    }
  }

  getTenantContext() {
    return {
      tenantId: this.currentTenantId,
      userId: this.currentUserId,
      timestamp: new Date().toISOString()
    };
  }

  setTenant(tenantId) {
    const exists = this.tenants.some(t => t.id === tenantId);
    if (!exists) {
      throw new Error(`[Security] Invalid tenant ID: ${tenantId}`);
    }
    this.currentTenantId = tenantId;
    const ctx = this.getTenantContext();
    this.listeners.forEach(cb => {
      try { cb(ctx); } catch (e) { console.error('[TenantService] Listener error:', e); }
    });
    return ctx;
  }
}

// --- 2A. Supabase Cloud Storage & RLS Adapter (Fase 5) ---
class SupabaseStorageAdapter {
  constructor(supabaseUrl, supabaseAnonKey) {
    this.supabaseUrl = supabaseUrl || 'https://bsftifcgyuaubmachzvi.supabase.co';
    this.supabaseAnonKey = supabaseAnonKey || '';
    this.client = null;
    this._initClient();
  }

  _initClient() {
    if (typeof window !== 'undefined' && window.supabase && this.supabaseAnonKey) {
      try {
        this.client = window.supabase.createClient(this.supabaseUrl, this.supabaseAnonKey);
      } catch (err) {
        console.warn('[SupabaseStorageAdapter] Client init fallback to offline:', err);
      }
    }
  }

  isCloudConnected() {
    return this.client !== null;
  }

  async getProjects(tenantId) {
    if (!this.client) return null;
    const { data, error } = await this.client
      .from('projects')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return data.map(p => ({ ...p.data, id: p.id, name: p.name, tenantId: p.tenant_id, updatedAt: p.updated_at, createdAt: p.created_at }));
  }

  async saveProject(tenantId, project) {
    if (!this.client) return null;
    const record = {
      id: project.id || `proj_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      tenant_id: tenantId,
      name: project.name,
      data: project.data || project,
      updated_at: new Date().toISOString()
    };
    const { data, error } = await this.client
      .from('projects')
      .upsert(record)
      .select()
      .single();
    if (error) throw error;
    return { ...data.data, id: data.id, name: data.name, tenantId: data.tenant_id, updatedAt: data.updated_at };
  }

  async deleteProject(tenantId, projectId) {
    if (!this.client) return null;
    const { error } = await this.client
      .from('projects')
      .delete()
      .eq('id', projectId)
      .eq('tenant_id', tenantId);
    if (error) throw error;
    return true;
  }

  async getLeads(tenantId) {
    if (!this.client) return null;
    const { data, error } = await this.client
      .from('crm_leads')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data.map(l => ({
      id: l.id,
      tenantId: l.tenant_id,
      name: l.name,
      email: l.email,
      company: l.company,
      planInterest: l.plan_interest,
      dealValue: Number(l.deal_value),
      status: l.status,
      leadScore: l.lead_score,
      source: l.source,
      notes: l.notes,
      createdAt: l.created_at,
      updatedAt: l.updated_at
    }));
  }

  async addLead(tenantId, lead) {
    if (!this.client) return null;
    const record = {
      id: lead.id || `lead_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      tenant_id: tenantId,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      plan_interest: lead.planInterest || 'Pro Squad',
      deal_value: lead.dealValue || 588,
      status: lead.status || 'new',
      lead_score: lead.leadScore || 75,
      source: lead.source || 'Landing Form',
      notes: lead.notes || ''
    };
    const { data, error } = await this.client
      .from('crm_leads')
      .insert(record)
      .select()
      .single();
    if (error) throw error;
    return {
      id: data.id,
      tenantId: data.tenant_id,
      name: data.name,
      email: data.email,
      company: data.company,
      planInterest: data.plan_interest,
      dealValue: Number(data.deal_value),
      status: data.status,
      leadScore: data.lead_score,
      source: data.source,
      notes: data.notes,
      createdAt: data.created_at
    };
  }

  async recordTelemetry(tenantId, { videoSeconds = 0, tokens = 0, engine = 'google-flow' }) {
    if (!this.client) return null;
    const { error } = await this.client
      .from('usage_telemetry')
      .insert({
        tenant_id: tenantId,
        video_seconds: videoSeconds,
        tokens: tokens,
        engine: engine
      });
    if (error) console.error('[SupabaseStorageAdapter] Failed to record telemetry:', error);
    return true;
  }
}

// --- 2B. Multi-Tenant Storage & Persistence Service (Fase 1 PMV) ---
class StorageService {
  constructor(cloudAdapter = null) {
    this.memoryStore = new Map();
    this.cloudAdapter = cloudAdapter;
  }

  _isLocalStorageAvailable() {
    try {
      return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined' && window.localStorage !== null;
    } catch {
      return false;
    }
  }

  _getKey(tenantId, key) {
    if (!tenantId || typeof tenantId !== 'string') {
      throw new Error('[Security Exception] tenantId is required and must be a string.');
    }
    return `lg_tenant_${tenantId}_${key}`;
  }

  getItem(tenantId, key) {
    const fullKey = this._getKey(tenantId, key);
    if (this._isLocalStorageAvailable()) {
      const raw = window.localStorage.getItem(fullKey);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch (err) {
        console.error(`[StorageService] Failed to parse item ${fullKey}:`, err);
        return null;
      }
    }
    return this.memoryStore.get(fullKey) || null;
  }

  setItem(tenantId, key, value) {
    const fullKey = this._getKey(tenantId, key);
    const serialized = JSON.stringify(value);
    if (this._isLocalStorageAvailable()) {
      window.localStorage.setItem(fullKey, serialized);
    } else {
      this.memoryStore.set(fullKey, value);
    }
    return true;
  }

  removeItem(tenantId, key) {
    const fullKey = this._getKey(tenantId, key);
    if (this._isLocalStorageAvailable()) {
      window.localStorage.removeItem(fullKey);
    } else {
      this.memoryStore.delete(fullKey);
    }
    return true;
  }

  // --- Project Persistence Operations ---
  getProjects(tenantId) {
    const projects = this.getItem(tenantId, 'projects');
    return Array.isArray(projects) ? projects : [];
  }

  saveProject(tenantId, project) {
    if (!project || !project.name) {
      throw new Error('[StorageService] Project must have a valid name.');
    }
    const projects = this.getProjects(tenantId);
    const existingIndex = projects.findIndex(p => p.id === project.id);
    const now = new Date().toISOString();

    const projectToSave = {
      ...project,
      id: project.id || `proj_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      tenantId,
      updatedAt: now,
      createdAt: project.createdAt || now
    };

    if (existingIndex >= 0) {
      projects[existingIndex] = projectToSave;
    } else {
      projects.unshift(projectToSave);
    }

    this.setItem(tenantId, 'projects', projects);
    return projectToSave;
  }

  deleteProject(tenantId, projectId) {
    const projects = this.getProjects(tenantId);
    const filtered = projects.filter(p => p.id !== projectId);
    this.setItem(tenantId, 'projects', filtered);
    return filtered;
  }

  // --- Workspace Autosave & State Recovery ---
  saveWorkspace(tenantId, state) {
    return this.setItem(tenantId, 'current_workspace', {
      ...state,
      tenantId,
      savedAt: new Date().toISOString()
    });
  }

  loadWorkspace(tenantId) {
    return this.getItem(tenantId, 'current_workspace');
  }

  // --- Multi-Tenant Backup & Migration ---
  exportTenantPackage(tenantId) {
    return {
      tenantId,
      exportedAt: new Date().toISOString(),
      projects: this.getProjects(tenantId),
      workspace: this.loadWorkspace(tenantId),
      catalog: {
        actors: this.getItem(tenantId, 'catalog_actors') || [],
        products: this.getItem(tenantId, 'catalog_products') || [],
        environments: this.getItem(tenantId, 'catalog_environments') || []
      }
    };
  }
}

// --- 2C. Model Sheets & Assets Catalog Service (Fase 2 PMV) ---
class AssetCatalogService {
  constructor(storageService) {
    this.storage = storageService;
    this.defaultSeedCatalog = {
      actors: [
        {
          id: 'actor_sofia_coff',
          name: 'Sofía Coff',
          role: 'Pastry Chef & Host',
          gender: 'female',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/sofia_coff_character_sheet.png',
          description: 'Latina female pastry chef / host, late 20s, elegant dark wavy hair in stylish bun, brown expressive eyes, olive long-sleeve fitted top, light blue denim jeans, radiant warm smile, detailed facial texture',
          voiceProfile: 'Voz femenina dulce, entusiasta y elegante (26-30 años), dicción clara, ritmo acogedor 125 WPM, español neutro/latino'
        },
        {
          id: 'actor_moises_guti',
          name: 'Moisés Guti',
          role: 'Executive Co-Host & SaaS Founder',
          gender: 'male',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/moises_guti_character_sheet.png',
          description: 'Latino male executive / co-host, early 40s, short textured dark hair, light-blue dress shirt with charcoal blazer, dark leather belt, confident and warm smile, hazel eyes, detailed skin texture',
          voiceProfile: 'Voz masculina ejecutiva (38-42 años), tono cálido, seguro y convincente, ritmo dinámico 130 WPM, español neutro'
        },
        {
          id: 'actor_elena_dev',
          name: 'Elena Dev',
          role: 'Lead AI Engineer',
          gender: 'female',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/dev01_character_sheet.png',
          description: 'Hispanic female developer, 29 yo, short dark wavy hair, expressive almond eyes, obsidian minimalist hoodie, relaxed confident posture, detailed skin texture',
          voiceProfile: 'Voz femenina profesional (28-32 años), tono seguro, ritmo dinámico 130 WPM, dicción clara de tecnología'
        },
        {
          id: 'actor_david_arch',
          name: 'David AI',
          role: 'Cloud Architect',
          gender: 'male',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/architect_sheet.png',
          description: 'Tech architect, early 30s, glasses, minimalist dark t-shirt, analytical gaze, high precision posture',
          voiceProfile: 'Voz masculina técnica, analítica, 130 WPM'
        },
        {
          id: 'actor_carlos_eng',
          name: 'Ing. Carlos',
          role: 'Robotics Specialist',
          gender: 'male',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/engineer_character_sheet.png',
          description: 'Tech engineer in cyber-tactical dark apron, safety glasses, focused gaze, precision nitrile gloves',
          voiceProfile: 'Voz serena, profunda, estilo documental de ingeniería aeroespacial'
        }
      ],
      products: [
        {
          id: 'prod_cake_studio',
          name: 'My Cake Studio Collection',
          tagline: 'Pastelería Artesanal & Gourmet',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/my_cake_studio_banner.png',
          description: 'Multi-tiered gourmet wedding cakes with chocolate drip, fresh raspberries, edible gold leaf, macarons, and artisanal pastel cake stands'
        },
        {
          id: 'prod_property_os',
          name: 'Property OS Platform',
          tagline: 'SaaS Inmobiliario con IA',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/property_os_product_sheet.png',
          description: 'Dark-mode real estate management dashboard with live buyer CRM cards, 3D property digital twins, green glowing valuation gauges'
        },
        {
          id: 'prod_loopgravity',
          name: 'LoopGravity Studio UI',
          tagline: 'Motor Agéntico para Google Antigravity',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/loopgravity_product_sheet.png',
          description: 'Dark mode web dashboard (#030712), neon indigo (#6366f1) and cyan (#06b6d4) glowing telemetry bars, 3D holographic Loop crest'
        }
      ],
      environments: [
        {
          id: 'env_cake_kitchen',
          name: 'Pastel Bakery Studio',
          mood: 'Cálido, Acogedor & Gourmet',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/cake_studio_kitchen.png',
          description: 'luxurious pastel bakery studio, white marble countertops, warm ambient wall sconces, mint green accents, cake display pedestals, diffused 5600K key light, subtle golden hour rim'
        },
        {
          id: 'env_fintech_office',
          name: 'Apex Executive Suite',
          mood: 'Corporativo & Moderno',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/modern_executive_office.png',
          description: 'High-floor corner executive real estate office, panoramic city skyline through floor-to-ceiling windows, natural soft afternoon daylight, minimalist walnut desk'
        },
        {
          id: 'env_dev_studio',
          name: 'Developer Studio Cleanroom',
          mood: 'Cyberpunk Minimalista',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/dev_studio_clean.png',
          description: 'minimalist modern software studio, dual 4K matte monitors on solid walnut desk, Key light 5600K diffused, cyan/purple edge rim lighting, shallow depth of field f/1.8'
        }
      ]
    };
  }

  _getCatalogKey(category) {
    return `catalog_${category}`;
  }

  getItems(tenantId, category) {
    const key = this._getCatalogKey(category);
    let items = this.storage.getItem(tenantId, key);
    if (!items || !Array.isArray(items) || items.length === 0) {
      items = this.defaultSeedCatalog[category] ? [...this.defaultSeedCatalog[category]] : [];
      this.storage.setItem(tenantId, key, items);
    }
    return items;
  }

  getItemById(tenantId, category, id) {
    const items = this.getItems(tenantId, category);
    return items.find(item => item.id === id) || null;
  }

  saveItem(tenantId, category, item) {
    if (!item || !item.name) {
      throw new Error(`[AssetCatalogService] Item in ${category} must have a name.`);
    }
    const items = this.getItems(tenantId, category);
    const existingIndex = items.findIndex(i => i.id === item.id);
    const itemToSave = {
      ...item,
      id: item.id || `${category.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      items[existingIndex] = itemToSave;
    } else {
      items.push(itemToSave);
    }

    this.storage.setItem(tenantId, this._getCatalogKey(category), items);
    return itemToSave;
  }

  deleteItem(tenantId, category, id) {
    const items = this.getItems(tenantId, category);
    const filtered = items.filter(i => i.id !== id);
    this.storage.setItem(tenantId, this._getCatalogKey(category), filtered);
    return filtered;
  }
}

// ==============================================================================
// 2D. PRODUCTION OS PHASE 1: NÚCLEO DE DATOS, RLS & ACTIVOS CANÓNICOS VERSIONADOS
// ==============================================================================

class SecureStorageService {
  constructor(secret = 'lg_sec_2026_production_os') {
    this.secret = secret;
  }

  generateSignedUrl(tenantId, assetKey, expirySeconds = 900) {
    if (!tenantId || !assetKey) {
      throw new Error('[SecureStorageService] tenantId and assetKey are required to sign URL.');
    }
    const expires = Math.floor(Date.now() / 1000) + expirySeconds;
    const rawPayload = `${tenantId}:${assetKey}:${expires}:${this.secret}`;
    let hash = 0;
    for (let i = 0; i < rawPayload.length; i++) {
      hash = ((hash << 5) - hash) + rawPayload.charCodeAt(i);
      hash |= 0;
    }
    const signature = Math.abs(hash).toString(36);
    return `https://storage.loopgravity.io/v1/tenants/${tenantId}/assets/${assetKey}?expires=${expires}&signature=${signature}`;
  }

  verifySignedUrl(signedUrl, expectedTenantId) {
    if (!signedUrl || !expectedTenantId) return false;
    try {
      const url = new URL(signedUrl);
      const parts = url.pathname.split('/');
      const urlTenant = parts[3];
      const assetKey = parts[5];
      const expires = parseInt(url.searchParams.get('expires'), 10);
      const signature = url.searchParams.get('signature');

      if (urlTenant !== expectedTenantId) return false;
      if (!expires || expires < Math.floor(Date.now() / 1000)) return false;

      const rawPayload = `${expectedTenantId}:${assetKey}:${expires}:${this.secret}`;
      let hash = 0;
      for (let i = 0; i < rawPayload.length; i++) {
        hash = ((hash << 5) - hash) + rawPayload.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash).toString(36) === signature;
    } catch {
      return false;
    }
  }
}

class AuditService {
  constructor(storageService) {
    this.storage = storageService;
  }

  logEvent(tenantId, { userId = 'system', eventType, resourceType, resourceId, details = {} }) {
    if (!tenantId || !eventType) {
      throw new Error('[AuditService] tenantId and eventType are mandatory.');
    }
    const events = this.storage.getItem(tenantId, 'audit_events') || [];
    const eventRecord = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      tenant_id: tenantId,
      user_id: userId,
      event_type: eventType,
      resource_type: resourceType || 'general',
      resource_id: resourceId || 'none',
      details: details,
      created_at: new Date().toISOString()
    };
    events.unshift(eventRecord);
    if (events.length > 500) events.length = 500;
    this.storage.setItem(tenantId, 'audit_events', events);
    return eventRecord;
  }

  getLogs(tenantId, limit = 50) {
    const events = this.storage.getItem(tenantId, 'audit_events') || [];
    return events.slice(0, limit);
  }
}

class CanonicalAssetService {
  constructor(storageService, auditService, secureStorage) {
    this.storage = storageService;
    this.audit = auditService;
    this.secureStorage = secureStorage;
  }

  _getKey(tenantId) {
    return 'canonical_assets_v2';
  }

  createAsset(tenantId, { assetType, name, description, initialImageUrl, attributes = {}, voiceProfileId = null, userId = 'operator' }) {
    if (!name || !assetType) {
      throw new Error('[CanonicalAssetService] Asset must have a name and assetType.');
    }
    const assets = this.storage.getItem(tenantId, this._getKey(tenantId)) || [];
    const assetId = `asset_${assetType}_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 4)}`;
    const versionId = `ver_${assetId}_1`;

    const initialVersion = {
      version_id: versionId,
      version_number: 1,
      image_url: initialImageUrl || 'https://loopgravity.io/assets/default_avatar.png',
      attributes: attributes,
      voice_profile_id: voiceProfileId,
      change_notes: 'Initial canonical asset creation',
      created_at: new Date().toISOString()
    };

    const newAsset = {
      id: assetId,
      tenant_id: tenantId,
      asset_type: assetType,
      name: name,
      description: description || '',
      is_archived: false,
      current_version_number: 1,
      versions: [initialVersion],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    assets.push(newAsset);
    this.storage.setItem(tenantId, this._getKey(tenantId), assets);

    if (this.audit) {
      this.audit.logEvent(tenantId, {
        userId,
        eventType: 'asset_created',
        resourceType: 'canonical_asset',
        resourceId: assetId,
        details: { name, assetType, version: 1 }
      });
    }

    return newAsset;
  }

  createNewVersion(tenantId, assetId, { imageUrl, attributes = {}, changeNotes = 'Updated version', voiceProfileId = null, userId = 'operator' }) {
    const assets = this.storage.getItem(tenantId, this._getKey(tenantId)) || [];
    const asset = assets.find(a => a.id === assetId && !a.is_archived);
    if (!asset) {
      throw new Error(`[CanonicalAssetService] Active asset not found: ${assetId}`);
    }

    const nextVersionNum = asset.current_version_number + 1;
    const versionId = `ver_${assetId}_${nextVersionNum}`;

    const lastVer = asset.versions[asset.versions.length - 1];
    const newVersion = {
      version_id: versionId,
      version_number: nextVersionNum,
      image_url: imageUrl || lastVer.image_url,
      attributes: { ...(lastVer.attributes || {}), ...attributes },
      voice_profile_id: voiceProfileId || lastVer.voice_profile_id,
      change_notes: changeNotes,
      created_at: new Date().toISOString()
    };

    asset.versions.push(newVersion);
    asset.current_version_number = nextVersionNum;
    asset.updated_at = new Date().toISOString();

    this.storage.setItem(tenantId, this._getKey(tenantId), assets);

    if (this.audit) {
      this.audit.logEvent(tenantId, {
        userId,
        eventType: 'version_bumped',
        resourceType: 'canonical_asset',
        resourceId: assetId,
        details: { version_number: nextVersionNum, changeNotes }
      });
    }

    return newVersion;
  }

  getAsset(tenantId, assetId) {
    const assets = this.storage.getItem(tenantId, this._getKey(tenantId)) || [];
    return assets.find(a => a.id === assetId) || null;
  }

  getAssetVersion(tenantId, assetId, versionNumber = null) {
    const asset = this.getAsset(tenantId, assetId);
    if (!asset) return null;
    if (versionNumber === null) {
      return asset.versions.find(v => v.version_number === asset.current_version_number) || null;
    }
    return asset.versions.find(v => v.version_number === versionNumber) || null;
  }

  archiveAsset(tenantId, assetId, userId = 'operator') {
    const assets = this.storage.getItem(tenantId, this._getKey(tenantId)) || [];
    const asset = assets.find(a => a.id === assetId);
    if (asset) {
      asset.is_archived = true;
      asset.updated_at = new Date().toISOString();
      this.storage.setItem(tenantId, this._getKey(tenantId), assets);
      if (this.audit) {
        this.audit.logEvent(tenantId, {
          userId,
          eventType: 'asset_archived',
          resourceType: 'canonical_asset',
          resourceId: assetId,
          details: { name: asset.name }
        });
      }
    }
    return asset;
  }

  restoreAsset(tenantId, assetId, userId = 'operator') {
    const assets = this.storage.getItem(tenantId, this._getKey(tenantId)) || [];
    const asset = assets.find(a => a.id === assetId);
    if (asset) {
      asset.is_archived = false;
      asset.updated_at = new Date().toISOString();
      this.storage.setItem(tenantId, this._getKey(tenantId), assets);
      if (this.audit) {
        this.audit.logEvent(tenantId, {
          userId,
          eventType: 'asset_restored',
          resourceType: 'canonical_asset',
          resourceId: assetId,
          details: { name: asset.name }
        });
      }
    }
    return asset;
  }

  listAssets(tenantId, assetType = null, includeArchived = false) {
    const assets = this.storage.getItem(tenantId, this._getKey(tenantId)) || [];
    return assets.filter(a => {
      if (!includeArchived && a.is_archived) return false;
      if (assetType && a.asset_type !== assetType) return false;
      return true;
    });
  }
}

class ProductionOSProjectService {
  constructor(storageService, canonicalAssetService, auditService) {
    this.storage = storageService;
    this.assetService = canonicalAssetService;
    this.audit = auditService;
  }

  _getKey(tenantId) {
    return 'production_os_projects_v1';
  }

  createProject(tenantId, { name, targetDuration = 30, aspectRatio = '16:9', userId = 'operator' }) {
    if (!name) throw new Error('[ProductionOSProjectService] Project requires a name.');
    const projects = this.storage.getItem(tenantId, this._getKey(tenantId)) || [];
    const projectId = `proj_pos_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 4)}`;

    const newProject = {
      id: projectId,
      tenant_id: tenantId,
      name: name,
      target_duration_seconds: targetDuration,
      aspect_ratio: aspectRatio,
      status: 'draft',
      current_step: 1,
      brief: {
        pitch_text: '',
        target_audience: 'Inmobiliarias y Brokers',
        emotional_hook: '',
        cta_text: ''
      },
      asset_links: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    projects.push(newProject);
    this.storage.setItem(tenantId, this._getKey(tenantId), projects);

    if (this.audit) {
      this.audit.logEvent(tenantId, {
        userId,
        eventType: 'project_created',
        resourceType: 'production_project',
        resourceId: projectId,
        details: { name }
      });
    }

    return newProject;
  }

  saveDraft(tenantId, projectId, stepData, userId = 'operator') {
    const projects = this.storage.getItem(tenantId, this._getKey(tenantId)) || [];
    const project = projects.find(p => p.id === projectId);
    if (!project) throw new Error(`Project not found: ${projectId}`);

    if (stepData.step) project.current_step = stepData.step;
    if (stepData.brief) project.brief = { ...project.brief, ...stepData.brief };
    if (stepData.name) project.name = stepData.name;

    if (stepData.assetLinks) {
      Object.keys(stepData.assetLinks).forEach(role => {
        const link = stepData.assetLinks[role];
        const asset = this.assetService.getAsset(tenantId, link.asset_id);
        if (asset) {
          const targetVer = link.version_number 
            ? asset.versions.find(v => v.version_number === link.version_number)
            : asset.versions.find(v => v.version_number === asset.current_version_number);
          
          if (targetVer) {
            project.asset_links[role] = {
              asset_id: asset.id,
              asset_name: asset.name,
              asset_type: asset.asset_type,
              asset_version_id: targetVer.version_id,
              version_number: targetVer.version_number,
              image_url: targetVer.image_url,
              linked_at: new Date().toISOString()
            };
          }
        }
      });
    }

    project.updated_at = new Date().toISOString();
    this.storage.setItem(tenantId, this._getKey(tenantId), projects);

    if (this.audit) {
      this.audit.logEvent(tenantId, {
        userId,
        eventType: 'draft_saved',
        resourceType: 'production_project',
        resourceId: projectId,
        details: { step: project.current_step }
      });
    }

    return project;
  }

  getProject(tenantId, projectId) {
    const projects = this.storage.getItem(tenantId, this._getKey(tenantId)) || [];
    return projects.find(p => p.id === projectId) || null;
  }

  listProjects(tenantId) {
    return this.storage.getItem(tenantId, this._getKey(tenantId)) || [];
  }
}

// ==============================================================================
// 2E. PRODUCTION OS PHASE 2: CREATIVE DIRECTOR, GUION & STORYBOARD SERVICE
// ==============================================================================

class CreativeDirectorService {
  constructor(storageService, projectService, canonicalAssetService, auditService) {
    this.storage = storageService;
    this.projectService = projectService;
    this.assetService = canonicalAssetService;
    this.audit = auditService;
    this.MAX_WPS = 2.5; // Max words per second for natural commercial speech
  }

  _getScriptsKey(tenantId) {
    return 'production_os_scripts_v1';
  }

  _getStoryboardsKey(tenantId) {
    return 'production_os_storyboards_v1';
  }

  _getApprovalsKey(tenantId) {
    return 'production_os_approvals_v1';
  }

  validateSpeechRate(dialogue, durationSeconds) {
    if (!dialogue || durationSeconds <= 0) return { isValid: true, wordCount: 0, wps: 0, maxAllowedWords: Math.floor(durationSeconds * this.MAX_WPS) };
    const words = dialogue.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const wps = +(wordCount / durationSeconds).toFixed(2);
    return {
      isValid: wps <= this.MAX_WPS,
      wordCount,
      wps,
      maxAllowedWords: Math.floor(durationSeconds * this.MAX_WPS)
    };
  }

  generateScriptAndStoryboard(tenantId, projectId, { brief = null, customShots = null, userId = 'operator' } = {}) {
    const project = this.projectService.getProject(tenantId, projectId);
    if (!project) throw new Error(`[CreativeDirectorService] Project ${projectId} not found.`);

    const effectiveBrief = brief || project.brief || {};
    const pitch = effectiveBrief.pitch_text || project.name || 'Solución innovadora para impulsar ventas';
    const cta = effectiveBrief.cta_text || 'Comienza hoy mismo';
    const audience = effectiveBrief.target_audience || 'Profesionales y Empresas';

    const actor1 = project.asset_links.actor_1;
    const actor2 = project.asset_links.actor_2;
    const product = project.asset_links.product;
    const env = project.asset_links.environment;

    const actor1Name = actor1 ? actor1.asset_name : 'Presentador';
    const actor2Name = actor2 ? actor2.asset_name : 'Co-presentador';
    const productName = product ? product.asset_name : 'Producto';
    const envName = env ? env.asset_name : 'Estudio';

    // Build default 4-shot commercial storyboard (24s total duration)
    const rawShots = customShots || [
      {
        shot_order: 1,
        shot_type: 'MCU (Medium Close-Up)',
        shot_classification: 'host',
        narrative_intention: 'Gancho Emocional & Frustración del Cliente',
        main_visual_action: `${actor1Name} mira a cámara en ${envName} con gesto de empatía y presenta el problema común.`,
        dialogue_es: `¿Cansado de perder clientes por no responder a tiempo?`,
        duration_seconds: 6.0,
        speaker_role: 'actor_1',
        transition_strategy: 'product_insert'
      },
      {
        shot_order: 2,
        shot_type: 'Macro Product Insert / Screen Reveal',
        shot_classification: 'product_broll',
        narrative_intention: 'Demostración de Valor & Solución Inmediata',
        main_visual_action: `Toma dinámica de detalle de ${productName} mostrando la interfaz activa y datos en tiempo real.`,
        dialogue_es: ``,
        duration_seconds: 5.0,
        speaker_role: null,
        transition_strategy: 'b_roll_insert'
      },
      {
        shot_order: 3,
        shot_type: 'Medium Two-Shot',
        shot_classification: 'dialogue',
        narrative_intention: 'Autoridad & Eficiencia Comprobada',
        main_visual_action: actor2 
          ? `${actor2Name} muestra los resultados en ${productName} mientras ${actor1Name} asiente con seguridad.`
          : `${actor1Name} interactúa con ${productName} mostrando los resultados alcanzados.`,
        dialogue_es: `${productName} califica y organiza cada oportunidad en segundos.`,
        duration_seconds: 7.0,
        speaker_role: actor2 ? 'actor_2' : 'actor_1',
        transition_strategy: 'cut'
      },
      {
        shot_order: 4,
        shot_type: 'Hero Portrait & Brand CTA Lockup',
        shot_classification: 'cta',
        narrative_intention: 'Llamada a la Acción & Cierre Comercial',
        main_visual_action: `${actor1Name} ${actor2 ? 'y ' + actor2Name : ''} sonríen con confianza hacia la lente con el logotipo visible.`,
        dialogue_es: `${cta}. Multiplica tus resultados ahora.`,
        duration_seconds: 6.0,
        speaker_role: 'actor_1',
        transition_strategy: 'cta_lockup'
      }
    ];

    // Validate and enrich shots
    let totalDuration = 0;
    const processedShots = rawShots.map((s, idx) => {
      const duration = s.duration_seconds || 6.0;
      totalDuration += duration;
      const speechCheck = this.validateSpeechRate(s.dialogue_es, duration);

      if (!speechCheck.isValid) {
        throw new Error(`[CreativeDirectorService] Toma ${s.shot_order || idx + 1} excede la velocidad de locución permitida: ${speechCheck.wps} wps (Máx: ${this.MAX_WPS} wps).`);
      }

      // Lock canonical asset version IDs
      const lockedAssets = {};
      if (s.speaker_role && project.asset_links[s.speaker_role]) {
        lockedAssets.speaker = project.asset_links[s.speaker_role];
      }
      if (product) lockedAssets.product = product;
      if (env) lockedAssets.environment = env;

      return {
        id: `shot_${projectId}_${idx + 1}`,
        shot_order: idx + 1,
        shot_type: s.shot_type,
        shot_classification: s.shot_classification,
        narrative_intention: s.narrative_intention,
        main_visual_action: s.main_visual_action,
        dialogue_es: s.dialogue_es || '',
        duration_seconds: duration,
        speech_rate_wps: speechCheck.wps,
        word_count: speechCheck.wordCount,
        max_allowed_words: speechCheck.maxAllowedWords,
        transition_strategy: s.transition_strategy || 'cut',
        locked_asset_versions: lockedAssets,
        status: 'draft'
      };
    });

    if (processedShots.length < 3 || processedShots.length > 5) {
      throw new Error(`[CreativeDirectorService] Storyboard debe contener entre 3 y 5 tomas (actual: ${processedShots.length}).`);
    }

    if (totalDuration < 20.0 || totalDuration > 30.0) {
      throw new Error(`[CreativeDirectorService] La duración total debe estar entre 20s y 30s (actual: ${totalDuration}s).`);
    }

    // Persist Script
    const scriptId = `script_${projectId}_1`;
    const scriptRecord = {
      id: scriptId,
      project_id: projectId,
      tenant_id: tenantId,
      title: `${project.name} - Guion Oficial`,
      logline: pitch,
      target_audience: audience,
      cta_text: cta,
      total_duration_seconds: totalDuration,
      current_version_number: 1,
      status: 'draft',
      shots: processedShots,
      updated_at: new Date().toISOString()
    };

    const scripts = this.storage.getItem(tenantId, this._getScriptsKey(tenantId)) || [];
    const existingScriptIdx = scripts.findIndex(s => s.project_id === projectId);
    if (existingScriptIdx >= 0) {
      scripts[existingScriptIdx] = scriptRecord;
    } else {
      scripts.push(scriptRecord);
    }
    this.storage.setItem(tenantId, this._getScriptsKey(tenantId), scripts);

    // Persist Storyboard Version
    const storyboardVersionId = `sb_ver_${projectId}_1`;
    const storyboardRecord = {
      id: storyboardVersionId,
      project_id: projectId,
      script_id: scriptId,
      tenant_id: tenantId,
      version_number: 1,
      total_duration_seconds: totalDuration,
      shots: processedShots,
      is_approved: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const storyboards = this.storage.getItem(tenantId, this._getStoryboardsKey(tenantId)) || [];
    const existingSbIdx = storyboards.findIndex(s => s.project_id === projectId && s.version_number === 1);
    if (existingSbIdx >= 0) {
      storyboards[existingSbIdx] = storyboardRecord;
    } else {
      storyboards.push(storyboardRecord);
    }
    this.storage.setItem(tenantId, this._getStoryboardsKey(tenantId), storyboards);

    if (this.audit) {
      this.audit.logEvent(tenantId, {
        userId,
        eventType: 'storyboard_created',
        resourceType: 'storyboard',
        resourceId: storyboardVersionId,
        details: { shots_count: processedShots.length, total_duration: totalDuration }
      });
    }

    return {
      script: scriptRecord,
      storyboard: storyboardRecord
    };
  }

  getStoryboard(tenantId, projectId, versionNumber = null) {
    const storyboards = this.storage.getItem(tenantId, this._getStoryboardsKey(tenantId)) || [];
    const projectSbs = storyboards.filter(s => s.project_id === projectId);
    if (projectSbs.length === 0) return null;
    if (versionNumber === null) {
      return projectSbs.sort((a, b) => b.version_number - a.version_number)[0];
    }
    return projectSbs.find(s => s.version_number === versionNumber) || null;
  }

  updateShot(tenantId, projectId, shotId, updatedFields, userId = 'operator') {
    const currentSb = this.getStoryboard(tenantId, projectId);
    if (!currentSb) throw new Error(`[CreativeDirectorService] Storyboard not found for project ${projectId}`);

    const shotIdx = currentSb.shots.findIndex(s => s.id === shotId);
    if (shotIdx < 0) throw new Error(`[CreativeDirectorService] Shot ${shotId} not found.`);

    let targetSb = currentSb;
    if (currentSb.is_approved) {
      const nextVersionNum = currentSb.version_number + 1;
      const newSbId = `sb_ver_${projectId}_${nextVersionNum}`;
      const clonedShots = JSON.parse(JSON.stringify(currentSb.shots));

      targetSb = {
        id: newSbId,
        project_id: projectId,
        script_id: currentSb.script_id,
        tenant_id: tenantId,
        version_number: nextVersionNum,
        total_duration_seconds: currentSb.total_duration_seconds,
        shots: clonedShots,
        is_approved: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const storyboards = this.storage.getItem(tenantId, this._getStoryboardsKey(tenantId)) || [];
      storyboards.push(targetSb);
      this.storage.setItem(tenantId, this._getStoryboardsKey(tenantId), storyboards);

      if (this.audit) {
        this.audit.logEvent(tenantId, {
          userId,
          eventType: 'storyboard_version_bumped',
          resourceType: 'storyboard',
          resourceId: newSbId,
          details: { previous_version: currentSb.version_number, new_version: nextVersionNum, reason: 'Shot edit after approval' }
        });
      }
    }

    const targetShot = targetSb.shots.find(s => s.id === shotId) || targetSb.shots[shotIdx];
    Object.assign(targetShot, updatedFields);

    if (updatedFields.dialogue_es !== undefined || updatedFields.duration_seconds !== undefined) {
      const dur = targetShot.duration_seconds || 6.0;
      const speechCheck = this.validateSpeechRate(targetShot.dialogue_es, dur);
      if (!speechCheck.isValid) {
        throw new Error(`[CreativeDirectorService] Modificación excede la velocidad de locución permitida: ${speechCheck.wps} wps.`);
      }
      targetShot.speech_rate_wps = speechCheck.wps;
      targetShot.word_count = speechCheck.wordCount;
      targetShot.max_allowed_words = speechCheck.maxAllowedWords;
    }

    targetSb.total_duration_seconds = targetSb.shots.reduce((acc, s) => acc + (s.duration_seconds || 0), 0);
    targetSb.updated_at = new Date().toISOString();

    const storyboards = this.storage.getItem(tenantId, this._getStoryboardsKey(tenantId)) || [];
    const idx = storyboards.findIndex(s => s.id === targetSb.id);
    if (idx >= 0) storyboards[idx] = targetSb;
    this.storage.setItem(tenantId, this._getStoryboardsKey(tenantId), storyboards);

    if (this.audit) {
      this.audit.logEvent(tenantId, {
        userId,
        eventType: 'shot_updated',
        resourceType: 'shot',
        resourceId: shotId,
        details: { shot_order: targetShot.shot_order, version: targetSb.version_number }
      });
    }

    return targetSb;
  }

  approveStoryboard(tenantId, projectId, storyboardVersionId = null, userId = 'operator', approvalNotes = 'Aprobado para producción') {
    const sb = storyboardVersionId 
      ? this.storage.getItem(tenantId, this._getStoryboardsKey(tenantId))?.find(s => s.id === storyboardVersionId)
      : this.getStoryboard(tenantId, projectId);

    if (!sb) throw new Error(`[CreativeDirectorService] Storyboard not found for approval.`);

    if (sb.shots.length < 3 || sb.shots.length > 5) {
      throw new Error(`[CreativeDirectorService] No se puede aprobar: número de tomas inválido (${sb.shots.length}).`);
    }
    if (sb.total_duration_seconds < 20.0 || sb.total_duration_seconds > 30.0) {
      throw new Error(`[CreativeDirectorService] No se puede aprobar: duración fuera de rango (${sb.total_duration_seconds}s).`);
    }

    sb.is_approved = true;
    sb.shots.forEach(s => s.status = 'approved');
    sb.updated_at = new Date().toISOString();

    const storyboards = this.storage.getItem(tenantId, this._getStoryboardsKey(tenantId)) || [];
    const sbIdx = storyboards.findIndex(s => s.id === sb.id);
    if (sbIdx >= 0) storyboards[sbIdx] = sb;
    this.storage.setItem(tenantId, this._getStoryboardsKey(tenantId), storyboards);

    const approvals = this.storage.getItem(tenantId, this._getApprovalsKey(tenantId)) || [];
    const approvalRecord = {
      id: `appr_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 4)}`,
      storyboard_version_id: sb.id,
      project_id: projectId,
      tenant_id: tenantId,
      approved_by_user_id: userId,
      approved_at: new Date().toISOString(),
      approval_notes: approvalNotes,
      is_ready_for_render: true
    };
    approvals.push(approvalRecord);
    this.storage.setItem(tenantId, this._getApprovalsKey(tenantId), approvals);

    if (this.audit) {
      this.audit.logEvent(tenantId, {
        userId,
        eventType: 'storyboard_approved',
        resourceType: 'storyboard_approval',
        resourceId: approvalRecord.id,
        details: { storyboard_id: sb.id, version: sb.version_number, notes: approvalNotes }
      });
    }

    return approvalRecord;
  }

  isReadyForRender(tenantId, projectId) {
    const sb = this.getStoryboard(tenantId, projectId);
    if (!sb || !sb.is_approved) return false;

    const approvals = this.storage.getItem(tenantId, this._getApprovalsKey(tenantId)) || [];
    const approval = approvals.find(a => a.storyboard_version_id === sb.id && a.is_ready_for_render);
    return Boolean(approval);
  }
}

// ==============================================================================
// 2F. PRODUCTION OS PHASE 3: RENDER ORCHESTRATOR & PROVIDER ADAPTERS
// ==============================================================================

class BaseRenderProviderAdapter {
  constructor(name, config = {}) {
    this.name = name;
    this.config = config;
  }

  async submitRender(manifest) {
    throw new Error('[BaseRenderProviderAdapter] submitRender must be implemented by subclass.');
  }

  async getRenderStatus(providerJobId) {
    throw new Error('[BaseRenderProviderAdapter] getRenderStatus must be implemented by subclass.');
  }

  async cancelRender(providerJobId) {
    throw new Error('[BaseRenderProviderAdapter] cancelRender must be implemented by subclass.');
  }

  normalizeWebhook(rawPayload, signature) {
    throw new Error('[BaseRenderProviderAdapter] normalizeWebhook must be implemented by subclass.');
  }

  estimateCost(manifest) {
    throw new Error('[BaseRenderProviderAdapter] estimateCost must be implemented by subclass.');
  }

  validateCapabilities(manifest) {
    return { isSupported: true };
  }
}

class MockRenderProviderAdapter extends BaseRenderProviderAdapter {
  constructor(secretSigningKey = 'mock_webhook_secret') {
    super('mock_engine');
    this.secretSigningKey = secretSigningKey;
    this.jobs = new Map();
  }

  estimateCost(manifest) {
    const duration = (manifest && manifest.shot && manifest.shot.duration_seconds) || 5.0;
    // 20 cents base per 5-6s clip
    return {
      estimatedCostCents: Math.round(duration * 4),
      currency: 'USD'
    };
  }

  async submitRender(manifest) {
    const providerJobId = `mock_job_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 6)}`;
    const cost = this.estimateCost(manifest);
    const mockOutput = {
      providerJobId,
      status: 'qa_pending',
      mediaUrl: `https://storage.loopgravity.io/renders/mock_${manifest.shot.id || 'shot'}.mp4`,
      durationSeconds: manifest.shot.duration_seconds || 6.0,
      resolution: '1920x1080',
      fps: 24,
      costCents: cost.estimatedCostCents
    };
    this.jobs.set(providerJobId, mockOutput);
    return mockOutput;
  }

  async getRenderStatus(providerJobId) {
    if (!this.jobs.has(providerJobId)) {
      return { providerJobId, status: 'failed', errorMessage: 'Job not found in mock registry.' };
    }
    return this.jobs.get(providerJobId);
  }

  async cancelRender(providerJobId) {
    if (this.jobs.has(providerJobId)) {
      const job = this.jobs.get(providerJobId);
      job.status = 'cancelled';
      this.jobs.set(providerJobId, job);
      return { providerJobId, status: 'cancelled', success: true };
    }
    return { providerJobId, status: 'not_found', success: false };
  }

  normalizeWebhook(rawPayload, signature) {
    // Validate HMAC signature if provided
    let isSignatureValid = true;
    if (signature) {
      const crypto = require('crypto');
      const expectedSig = crypto.createHmac('sha256', this.secretSigningKey).update(JSON.stringify(rawPayload)).digest('hex');
      isSignatureValid = (signature === expectedSig);
    }
    return {
      isValid: isSignatureValid,
      providerJobId: rawPayload.job_id || rawPayload.id,
      status: rawPayload.status === 'success' ? 'qa_pending' : (rawPayload.status || 'rendering'),
      mediaUrl: rawPayload.output_url || rawPayload.video_url || null,
      errorMessage: rawPayload.error || null
    };
  }
}

class KlingProviderAdapter extends BaseRenderProviderAdapter {
  constructor(apiKey = null) {
    super('kling_ai');
    this.apiKey = apiKey; // Handled strictly in server environment, never client
  }

  estimateCost(manifest) {
    const duration = (manifest && manifest.shot && manifest.shot.duration_seconds) || 5.0;
    return {
      estimatedCostCents: Math.round(duration * 5), // ~25 cents per 5s clip
      currency: 'USD'
    };
  }

  async submitRender(manifest) {
    // Decoupled connector - when running without live API key, returns structured submission manifest
    const providerJobId = `kling_job_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;
    return {
      providerJobId,
      status: 'submitted',
      provider: 'kling_ai',
      model: 'kling-v1-5-pro',
      costCents: this.estimateCost(manifest).estimatedCostCents
    };
  }

  async getRenderStatus(providerJobId) {
    return {
      providerJobId,
      status: 'rendering',
      provider: 'kling_ai'
    };
  }

  async cancelRender(providerJobId) {
    return {
      providerJobId,
      status: 'cancelled',
      success: true
    };
  }

  normalizeWebhook(rawPayload, signature) {
    return {
      isValid: Boolean(signature),
      providerJobId: rawPayload.task_id || rawPayload.job_id,
      status: rawPayload.status === 'completed' ? 'qa_pending' : 'failed',
      mediaUrl: rawPayload.video_url || null,
      errorMessage: rawPayload.error || null
    };
  }
}

class RenderOrchestratorService {
  constructor(storageService, creativeDirectorService, auditService, secureStorageService) {
    this.storage = storageService;
    this.creativeDirector = creativeDirectorService;
    this.audit = auditService;
    this.secureStorage = secureStorageService;
    this.providers = new Map();

    // Register default adapters
    this.registerProvider('mock_engine', new MockRenderProviderAdapter());
    this.registerProvider('kling_ai', new KlingProviderAdapter());
  }

  registerProvider(name, adapter) {
    this.providers.set(name, adapter);
  }

  getProvider(name) {
    return this.providers.get(name) || this.providers.get('mock_engine');
  }

  _getKey(tenantId, resource) {
    return `production_os_${resource}_v1`;
  }

  // --- 1. Create Render Plan & Budget Estimate ---
  createRenderPlan(tenantId, projectId, { provider = 'mock_engine', userId = 'operator' } = {}) {
    const isApproved = this.creativeDirector.isReadyForRender(tenantId, projectId);
    if (!isApproved) {
      throw new Error(`[RenderOrchestrator] Proyecto ${projectId} no cuenta con un Storyboard aprobado. Render bloqueado.`);
    }

    const sb = this.creativeDirector.getStoryboard(tenantId, projectId);
    const adapter = this.getProvider(provider);

    let totalEstimatedCost = 0;
    const shotEstimates = sb.shots.map(shot => {
      const cost = adapter.estimateCost({ shot });
      totalEstimatedCost += cost.estimatedCostCents;
      return {
        shot_id: shot.id,
        shot_order: shot.shot_order,
        duration_seconds: shot.duration_seconds,
        estimated_cost_cents: cost.estimatedCostCents
      };
    });

    // Check Organization Budget
    const orgs = this.storage.getItem(tenantId, 'production_os_orgs_v1') || [{
      id: tenantId,
      credit_balance_cents: 5000,
      reserved_credit_cents: 0
    }];
    const org = orgs.find(o => o.id === tenantId) || orgs[0];

    const availableCredit = (org.credit_balance_cents || 5000) - (org.reserved_credit_cents || 0);
    if (availableCredit < totalEstimatedCost) {
      throw new Error(`[RenderOrchestrator] Saldo insuficiente. Disponible: ${availableCredit}¢, Requerido: ${totalEstimatedCost}¢`);
    }

    const estimateRecord = {
      id: `est_${projectId}_v${sb.version_number}`,
      tenant_id: tenantId,
      project_id: projectId,
      storyboard_version_id: sb.id,
      total_shots: sb.shots.length,
      total_duration_seconds: sb.total_duration_seconds,
      estimated_cost_cents: totalEstimatedCost,
      shot_estimates: shotEstimates,
      provider,
      created_at: new Date().toISOString()
    };

    const estimates = this.storage.getItem(tenantId, this._getKey(tenantId, 'render_cost_estimates')) || [];
    estimates.push(estimateRecord);
    this.storage.setItem(tenantId, this._getKey(tenantId, 'render_cost_estimates'), estimates);

    return estimateRecord;
  }

  // --- 2. Submit Render Job with Strict Idempotency & Budget Lock ---
  async submitRenderJob(tenantId, projectId, shotId, { idempotencyKey, provider = 'mock_engine', userId = 'operator' } = {}) {
    if (!idempotencyKey) {
      throw new Error('[RenderOrchestrator] idempotencyKey es obligatorio para evitar dobles renders.');
    }

    // 1. Idempotency Check
    const idempKeys = this.storage.getItem(tenantId, this._getKey(tenantId, 'idempotency_keys')) || [];
    const existingIdemp = idempKeys.find(k => k.idempotency_key === idempotencyKey);
    if (existingIdemp) {
      const existingJobs = this.storage.getItem(tenantId, this._getKey(tenantId, 'render_jobs')) || [];
      const job = existingJobs.find(j => j.id === existingIdemp.resource_id);
      if (job) return { job, isDuplicate: true };
    }

    // 2. Storyboard Approval Check
    const isApproved = this.creativeDirector.isReadyForRender(tenantId, projectId);
    if (!isApproved) {
      throw new Error(`[RenderOrchestrator] Storyboard sin aprobación humana. Render bloqueado.`);
    }

    const sb = this.creativeDirector.getStoryboard(tenantId, projectId);
    const targetShot = sb.shots.find(s => s.id === shotId);
    if (!targetShot) throw new Error(`[RenderOrchestrator] Shot ${shotId} no encontrado en storyboard.`);

    const adapter = this.getProvider(provider);
    const costEstimate = adapter.estimateCost({ shot: targetShot });

    // 3. Reserve Budget
    const orgs = this.storage.getItem(tenantId, 'production_os_orgs_v1') || [{
      id: tenantId,
      credit_balance_cents: 5000,
      reserved_credit_cents: 0
    }];
    const org = orgs.find(o => o.id === tenantId) || orgs[0];
    const availableCredit = (org.credit_balance_cents || 5000) - (org.reserved_credit_cents || 0);

    if (availableCredit < costEstimate.estimatedCostCents) {
      throw new Error(`[RenderOrchestrator] Presupuesto insuficiente para la toma ${targetShot.shot_order}.`);
    }

    org.reserved_credit_cents = (org.reserved_credit_cents || 0) + costEstimate.estimatedCostCents;
    this.storage.setItem(tenantId, 'production_os_orgs_v1', orgs);

    // 4. Build Immutable Input Manifest
    const inputManifest = {
      tenant_id: tenantId,
      project_id: projectId,
      storyboard_version_id: sb.id,
      shot: JSON.parse(JSON.stringify(targetShot)),
      parameters: {
        resolution: '1920x1080',
        aspect_ratio: '16:9',
        fps: 24,
        camera_style: 'cinematic_commercial',
        lighting: '5600K diffused studio'
      },
      submitted_at: new Date().toISOString()
    };

    const renderJobId = `job_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;
    const jobRecord = {
      id: renderJobId,
      tenant_id: tenantId,
      project_id: projectId,
      storyboard_version_id: sb.id,
      shot_id: shotId,
      shot_order: targetShot.shot_order,
      provider,
      model: 'v1-standard',
      state: 'queued',
      idempotency_key: idempotencyKey,
      input_manifest: inputManifest,
      estimated_cost_cents: costEstimate.estimatedCostCents,
      actual_cost_cents: 0,
      max_attempts: 3,
      current_attempts: 1,
      provider_job_id: null,
      error_message: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Save Idempotency Key
    idempKeys.push({
      id: `idemp_${Date.now().toString(36)}`,
      tenant_id: tenantId,
      idempotency_key: idempotencyKey,
      resource_type: 'render_job',
      resource_id: renderJobId,
      created_at: new Date().toISOString()
    });
    this.storage.setItem(tenantId, this._getKey(tenantId, 'idempotency_keys'), idempKeys);

    // State Transition: queued -> submitted -> rendering
    jobRecord.state = 'submitted';

    // Submit to Provider Adapter
    const providerResult = await adapter.submitRender(inputManifest);
    jobRecord.provider_job_id = providerResult.providerJobId;
    jobRecord.state = providerResult.status || 'rendering';

    // Settle or finalize based on result
    if (jobRecord.state === 'qa_pending' || jobRecord.state === 'completed') {
      jobRecord.actual_cost_cents = providerResult.costCents || costEstimate.estimatedCostCents;

      // Deduct from credit balance and release reserve
      org.credit_balance_cents = (org.credit_balance_cents || 5000) - jobRecord.actual_cost_cents;
      org.reserved_credit_cents = Math.max(0, (org.reserved_credit_cents || 0) - costEstimate.estimatedCostCents);
      this.storage.setItem(tenantId, 'production_os_orgs_v1', orgs);

      // Create Generated Media Record
      const mediaRecords = this.storage.getItem(tenantId, this._getKey(tenantId, 'generated_media')) || [];
      const mediaRecord = {
        id: `media_${renderJobId}`,
        render_job_id: renderJobId,
        tenant_id: tenantId,
        project_id: projectId,
        shot_id: shotId,
        storyboard_version_id: sb.id,
        media_type: 'video_clip',
        storage_path: `renders/${tenantId}/${renderJobId}.mp4`,
        signed_url: providerResult.mediaUrl || `https://storage.loopgravity.io/renders/${renderJobId}.mp4`,
        duration_seconds: targetShot.duration_seconds,
        resolution: '1920x1080',
        fps: 24,
        qa_status: 'qa_pending',
        created_at: new Date().toISOString()
      };
      mediaRecords.push(mediaRecord);
      this.storage.setItem(tenantId, this._getKey(tenantId, 'generated_media'), mediaRecords);
      jobRecord.generated_media_id = mediaRecord.id;
    }

    // Persist Job
    const jobs = this.storage.getItem(tenantId, this._getKey(tenantId, 'render_jobs')) || [];
    jobs.push(jobRecord);
    this.storage.setItem(tenantId, this._getKey(tenantId, 'render_jobs'), jobs);

    if (this.audit) {
      this.audit.logEvent(tenantId, {
        userId,
        eventType: 'render_job_submitted',
        resourceType: 'render_job',
        resourceId: renderJobId,
        details: { shot_id: shotId, provider, estimated_cost: costEstimate.estimatedCostCents }
      });
    }

    return { job: jobRecord, isDuplicate: false };
  }

  // --- 3. Cancel Render Job & Release Reserve ---
  async cancelRenderJob(tenantId, renderJobId, userId = 'operator') {
    const jobs = this.storage.getItem(tenantId, this._getKey(tenantId, 'render_jobs')) || [];
    const job = jobs.find(j => j.id === renderJobId);
    if (!job) throw new Error(`[RenderOrchestrator] Job ${renderJobId} not found.`);

    if (['completed', 'cancelled', 'failed'].includes(job.state)) {
      throw new Error(`[RenderOrchestrator] Transición inválida: No se puede cancelar un job en estado ${job.state}.`);
    }

    const adapter = this.getProvider(job.provider);
    if (job.provider_job_id) {
      await adapter.cancelRender(job.provider_job_id);
    }

    job.state = 'cancelled';
    job.updated_at = new Date().toISOString();
    this.storage.setItem(tenantId, this._getKey(tenantId, 'render_jobs'), jobs);

    // Release reserved credit
    const orgs = this.storage.getItem(tenantId, 'production_os_orgs_v1') || [];
    const org = orgs.find(o => o.id === tenantId);
    if (org && org.reserved_credit_cents > 0) {
      org.reserved_credit_cents = Math.max(0, org.reserved_credit_cents - job.estimated_cost_cents);
      this.storage.setItem(tenantId, 'production_os_orgs_v1', orgs);
    }

    if (this.audit) {
      this.audit.logEvent(tenantId, {
        userId,
        eventType: 'render_job_cancelled',
        resourceType: 'render_job',
        resourceId: renderJobId,
        details: { provider_job_id: job.provider_job_id }
      });
    }

    return job;
  }

  // --- 4. Webhook Processing & Security Verification ---
  handleWebhook(tenantId, provider, rawPayload, signature) {
    const adapter = this.getProvider(provider);
    const normalized = adapter.normalizeWebhook(rawPayload, signature);

    const webhookLogs = this.storage.getItem(tenantId, this._getKey(tenantId, 'webhook_events')) || [];
    const eventRecord = {
      id: `wh_${Date.now().toString(36)}`,
      tenant_id: tenantId,
      provider,
      raw_payload: rawPayload,
      signature_verified: normalized.isValid,
      processed_status: normalized.isValid ? 'processed' : 'invalid',
      error_message: normalized.isValid ? null : 'Firma de webhook inválida',
      created_at: new Date().toISOString()
    };
    webhookLogs.push(eventRecord);
    this.storage.setItem(tenantId, this._getKey(tenantId, 'webhook_events'), webhookLogs);

    if (!normalized.isValid) {
      if (this.audit) {
        this.audit.logEvent(tenantId, {
          userId: 'system_webhook',
          eventType: 'security_alert_webhook_signature_failed',
          resourceType: 'provider_webhook',
          resourceId: eventRecord.id,
          details: { provider, reason: 'Invalid HMAC signature' }
        });
      }
      return { success: false, error: 'Invalid webhook signature.' };
    }

    // Update job state if signature is valid
    if (normalized.providerJobId) {
      const jobs = this.storage.getItem(tenantId, this._getKey(tenantId, 'render_jobs')) || [];
      const job = jobs.find(j => j.provider_job_id === normalized.providerJobId);
      if (job) {
        job.state = normalized.status;
        job.updated_at = new Date().toISOString();
        this.storage.setItem(tenantId, this._getKey(tenantId, 'render_jobs'), jobs);
      }
    }

    return { success: true, normalized };
  }

  listRenderJobs(tenantId, projectId = null) {
    const jobs = this.storage.getItem(tenantId, this._getKey(tenantId, 'render_jobs')) || [];
    if (!projectId) return jobs;
    return jobs.filter(j => j.project_id === projectId);
  }

  getRenderJob(tenantId, renderJobId) {
    const jobs = this.storage.getItem(tenantId, this._getKey(tenantId, 'render_jobs')) || [];
    return jobs.find(j => j.id === renderJobId) || null;
  }
}

// --- 2G. Professional Production & Timeline Export Engine (Fase 3 PMV) ---
class ExportEngine {
  constructor() {}

  generateOTIO(sequenceResult, projectName = 'LoopGravity_Sequence') {
    if (!sequenceResult || !sequenceResult.sequenceBlocks) {
      throw new Error('[ExportEngine] Invalid sequenceResult provided to generateOTIO.');
    }
    const { sequenceBlocks, payload } = sequenceResult;
    const fps = 24;
    const totalDurationSeconds = (payload && payload.total_duration_seconds) || (sequenceBlocks.length * 10);

    const audioClips = [];
    sequenceBlocks.forEach((b) => {
      if (b.performance_beats && b.performance_beats.length > 0) {
        b.performance_beats.forEach((beat) => {
          const beatDurationFrames = Math.round((beat.estimated_duration_seconds || 5.0) * fps);
          const startFrame = beat.beat_index === 1 ? 0 : Math.round(5.0 * fps);
          audioClips.push({
            OTIO_SCHEMA: 'Clip.1',
            name: `VO_${(beat.actor || 'Actor').replace(/\s+/g, '_')}_Beat${beat.beat_index}_Block_${b.block_index}`,
            source_range: {
              OTIO_SCHEMA: 'TimeRange.1',
              start_time: { OTIO_SCHEMA: 'RationalTime.1', rate: fps, value: startFrame },
              duration: { OTIO_SCHEMA: 'RationalTime.1', rate: fps, value: beatDurationFrames }
            },
            metadata: {
              actor: beat.actor,
              dialogue_es: beat.dialogue_es,
              emotion: beat.emotion,
              listener_reaction: beat.listener_reaction,
              eyeline: beat.eyeline_direction,
              lip_sync_directive: b.lip_sync_directive
            }
          });
        });
      } else {
        audioClips.push({
          OTIO_SCHEMA: 'Clip.1',
          name: `VO_${(b.speaker || 'Actor').replace(/\s+/g, '_')}_Block_${b.block_index}`,
          source_range: {
            OTIO_SCHEMA: 'TimeRange.1',
            start_time: { OTIO_SCHEMA: 'RationalTime.1', rate: fps, value: 0 },
            duration: { OTIO_SCHEMA: 'RationalTime.1', rate: fps, value: 10 * fps }
          },
          metadata: {
            speaker: b.speaker,
            dialogue_es: b.dialogue_es,
            lip_sync_directive: b.lip_sync_directive
          }
        });
      }
    });

    const otio = {
      OTIO_SCHEMA: 'Timeline.1',
      metadata: {
        loopgravity: {
          tenantId: payload ? payload.tenant_id : 'tenant-nexus-01',
          engine: payload ? payload.engine_target : 'google-flow',
          aspectRatio: payload ? payload.aspect_ratio : '16:9',
          projectName,
          totalDurationSeconds,
          multiActorPerformanceBeats: true
        }
      },
      name: projectName,
      global_start_time: {
        OTIO_SCHEMA: 'RationalTime.1',
        rate: fps,
        value: 0
      },
      tracks: {
        OTIO_SCHEMA: 'Stack.1',
        children: [
          // Track 1: Video Blocks
          {
            OTIO_SCHEMA: 'Track.1',
            name: 'Video Track (10s Continuous Blocks)',
            kind: 'Video',
            children: sequenceBlocks.map((b) => ({
              OTIO_SCHEMA: 'Clip.1',
              name: `Block_${b.block_index}_(${b.time_range_global})_${(b.act_title_es || 'Act').replace(/\s+/g, '_')}`,
              source_range: {
                OTIO_SCHEMA: 'TimeRange.1',
                start_time: { OTIO_SCHEMA: 'RationalTime.1', rate: fps, value: 0 },
                duration: { OTIO_SCHEMA: 'RationalTime.1', rate: fps, value: 10 * fps }
              },
              metadata: {
                prompt: b.assembled_prompt,
                shot_type: b.shot_type,
                camera: b.camera_motion,
                seed: b.seed,
                media_directive: b.attached_media_directive,
                performance_beats: b.performance_beats || []
              }
            }))
          },
          // Track 2: Dialogue & Performance Beats Audio
          {
            OTIO_SCHEMA: 'Track.1',
            name: 'Audio Track - Lip-Sync Dialogue & Performance Beats',
            kind: 'Audio',
            children: audioClips
          },
          // Track 3: Foley & SFX
          {
            OTIO_SCHEMA: 'Track.1',
            name: 'Audio Track - SFX & Foley',
            kind: 'Audio',
            children: sequenceBlocks.map((b) => ({
              OTIO_SCHEMA: 'Clip.1',
              name: `SFX_Block_${b.block_index}`,
              source_range: {
                OTIO_SCHEMA: 'TimeRange.1',
                start_time: { OTIO_SCHEMA: 'RationalTime.1', rate: fps, value: 0 },
                duration: { OTIO_SCHEMA: 'RationalTime.1', rate: fps, value: 10 * fps }
              },
              metadata: {
                sfx: b.sfx_foley
              }
            }))
          }
        ]
      }
    };
    return JSON.stringify(otio, null, 2);
  }

  generateFCPXML(sequenceResult, projectName = 'LoopGravity_Sequence') {
    if (!sequenceResult || !sequenceResult.sequenceBlocks) {
      throw new Error('[ExportEngine] Invalid sequenceResult provided to generateFCPXML.');
    }
    const { sequenceBlocks, payload } = sequenceResult;
    const totalDurationSeconds = (payload && payload.total_duration_seconds) || (sequenceBlocks.length * 10);
    const durationFrames = totalDurationSeconds * 24;
    const isVertical = payload && payload.aspect_ratio === '9:16';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<!DOCTYPE fcpxml>\n`;
    xml += `<fcpxml version="1.9">\n`;
    xml += `  <resources>\n`;
    xml += `    <format id="r1" frameDuration="1/24s" width="${isVertical ? '1080' : '1920'}" height="${isVertical ? '1920' : '1080'}"/>\n`;
    xml += `  </resources>\n`;
    xml += `  <library>\n`;
    xml += `    <event name="LoopGravity Video Production">\n`;
    xml += `      <project name="${projectName}">\n`;
    xml += `        <sequence format="r1" duration="${durationFrames}/24s">\n`;
    xml += `          <spine>\n`;

    sequenceBlocks.forEach((b, idx) => {
      const cleanPrompt = (b.assembled_prompt || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const cleanDialogue = (b.dialogue_es || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      xml += `            <gap name="Block_${b.block_index}" offset="${idx * 240}/24s" duration="240/24s" start="0s">\n`;
      xml += `              <marker start="0s" duration="240/24s" value="[${b.shot_type}] ${b.speaker}: ${cleanDialogue}" note="${cleanPrompt}" />\n`;
      if (b.performance_beats && b.performance_beats.length > 0) {
        b.performance_beats.forEach((beat) => {
          const beatOffset = beat.beat_index === 1 ? '0s' : '120/24s';
          const beatDur = `${Math.round((beat.estimated_duration_seconds || 5.0) * 24)}/24s`;
          const cleanBeatDia = (beat.dialogue_es || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          const cleanBeatReact = (beat.listener_reaction || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          xml += `              <marker start="${beatOffset}" duration="${beatDur}" value="Beat ${beat.beat_index} - ${beat.actor} (${beat.emotion}): ${cleanBeatDia}" note="Listener Reaction: ${cleanBeatReact}" />\n`;
        });
      }
      xml += `            </gap>\n`;
    });

    xml += `          </spine>\n`;
    xml += `        </sequence>\n`;
    xml += `      </project>\n`;
    xml += `    </event>\n`;
    xml += `  </library>\n`;
    xml += `</fcpxml>`;
    return xml;
  }

  generateCSV(sequenceResult) {
    if (!sequenceResult || !sequenceResult.sequenceBlocks) {
      throw new Error('[ExportEngine] Invalid sequenceResult provided to generateCSV.');
    }
    const { sequenceBlocks } = sequenceResult;
    const headers = [
      'Block Index',
      'Time Range Global',
      'Act Title',
      'Speaker Summary',
      'Lip-Sync Dialogue (ES)',
      'Performance Beats (Multi-Actor)',
      'Emotions Summary',
      'Physical Actions',
      'Eyeline Direction',
      'Listener Reactions',
      'Shot Type',
      'Camera Motion',
      'Subject Action',
      'SFX & Foley',
      'Flow Attached Directive',
      'Prompt Payload',
      'Seed'
    ];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      let str = String(val);
      // Neutralizar inyección de fórmulas de Excel / Sheets
      if (/^[=+@\-\t\r]/.test(str)) {
        str = "'" + str;
      }
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = [headers.join(',')];
    sequenceBlocks.forEach(b => {
      const beatsFormatted = (b.performance_beats || []).map(beat => 
        `[Beat ${beat.beat_index} (${beat.estimated_duration_seconds}s) - ${beat.actor}]: "${beat.dialogue_es}"`
      ).join(' | ');

      const emotionsFormatted = (b.performance_beats || []).map(beat => 
        `[${beat.actor}]: ${beat.emotion}`
      ).join(' | ');

      const actionsFormatted = (b.performance_beats || []).map(beat => 
        `[${beat.actor}]: ${beat.physical_action}`
      ).join(' | ');

      const eyelinesFormatted = (b.performance_beats || []).map(beat => 
        `[${beat.actor}]: ${beat.eyeline_direction}`
      ).join(' | ');

      const reactionsFormatted = (b.performance_beats || []).map(beat => 
        `[Reaction to ${beat.actor}]: ${beat.listener_reaction}`
      ).join(' | ');

      rows.push([
        escapeCsv(b.block_index),
        escapeCsv(b.time_range_global),
        escapeCsv(b.act_title_es),
        escapeCsv(b.speaker),
        escapeCsv(b.dialogue_es),
        escapeCsv(beatsFormatted || b.dialogue_es),
        escapeCsv(emotionsFormatted || 'Natural'),
        escapeCsv(actionsFormatted || b.subject_action),
        escapeCsv(eyelinesFormatted || 'Direct to camera'),
        escapeCsv(reactionsFormatted || 'Active listening'),
        escapeCsv(b.shot_type),
        escapeCsv(b.camera_motion),
        escapeCsv(b.subject_action),
        escapeCsv(b.sfx_foley),
        escapeCsv(b.attached_media_directive),
        escapeCsv(b.assembled_prompt),
        escapeCsv(b.seed)
      ].join(','));
    });

    return rows.join('\r\n');
  }

  generateMarkdownScript(sequenceResult, projectName = 'Producción Audiovisual') {
    if (!sequenceResult || !sequenceResult.sequenceBlocks) {
      throw new Error('[ExportEngine] Invalid sequenceResult provided to generateMarkdownScript.');
    }
    const { sequenceBlocks, masterScript, payload } = sequenceResult;
    let md = `# Guión Técnico de Producción: ${projectName}\n\n`;
    md += `* **Tenant:** \`${payload ? payload.tenant_id : 'tenant-nexus-01'}\`\n`;
    md += `* **Motor Objetivo:** \`${payload ? payload.engine_target : 'google-flow'}\`\n`;
    md += `* **Duración Total:** **${payload ? payload.total_duration_seconds : sequenceBlocks.length * 10}s** (${payload ? payload.total_blocks : sequenceBlocks.length} Bloques de 10s)\n`;
    md += `* **Aspect Ratio:** \`${payload ? payload.aspect_ratio : '16:9'}\`\n`;
    md += `* **Modo de Actuación:** \`Alternating Dialogue & Multi-Beat Interaction (Sin personajes pasivos)\`\n`;
    md += `* **Generado por:** LoopGravity Video Performance Engine\n\n`;
    md += `---\n\n`;
    md += `## 🎬 Desglose por Bloques Continuos (10s)\n\n`;

    sequenceBlocks.forEach(b => {
      md += `### ⏱️ Bloque ${b.block_index} (${b.time_range_global}): ${b.act_title_es}\n\n`;
      md += `- **Toma & Cámara:** \`${b.shot_type}\` — ${b.camera_motion}\n`;
      md += `- **Acción en Cuadro:** ${b.subject_action}\n`;
      md += `- **👄 Diálogo & Lip-Sync (Resumen):** *"${b.dialogue_es}"*\n`;
      md += `- **🎭 Directiva Lip-Sync:** \`${b.lip_sync_directive}\`\n`;
      md += `- **🔊 Efectos SFX / Foley:** \`${b.sfx_foley}\`\n`;
      if (b.attached_media_directive) {
        md += `- **📎 Ingesta Google Flow:** \`${b.attached_media_directive}\`\n`;
      }
      
      if (b.performance_beats && b.performance_beats.length > 0) {
        md += `\n#### 🎭 Desglose de Performance Beats (Multi-Actor):\n`;
        b.performance_beats.forEach(beat => {
          const beatTime = beat.beat_index === 1 ? '0.0s - 5.0s' : '5.0s - 10.0s';
          md += `* **Beat ${beat.beat_index} (${beatTime}, ${beat.estimated_duration_seconds}s) — ${beat.actor}:**\n`;
          md += `  - **Emoción:** ${beat.emotion}\n`;
          md += `  - **Diálogo (ES):** *"${beat.dialogue_es}"*\n`;
          md += `  - **Acción Física:** ${beat.physical_action}\n`;
          md += `  - **Dirección de Mirada:** ${beat.eyeline_direction}\n`;
          md += `  - **Reacción del Coprotagonista:** ${beat.listener_reaction}\n`;
        });
      }

      md += `\n**Prompt Ensamblado:**\n\`\`\`text\n${b.assembled_prompt}\n\`\`\`\n\n`;
    });

    md += `---\n\n## 📑 Prompt Maestro Completo\n\n\`\`\`text\n${masterScript}\n\`\`\`\n`;
    return md;
  }
}

// --- 2E. CRM & SaaS Usage Analytics Service (Fase 4 PMV) ---
class CrmService {
  constructor(storageService) {
    this.storage = storageService;
    this.defaultSeedLeads = {
      'tenant-nexus-01': [
        {
          id: 'lead_nex_01',
          name: 'Carlos Mendoza',
          email: 'carlos@agenciamarketing.com',
          company: 'Nexus Media Agency',
          planInterest: 'Pro Squad',
          dealValue: 588,
          status: 'won',
          leadScore: 94,
          source: 'Landing Early Access',
          createdAt: '2026-08-15T14:30:00.000Z',
          notes: 'Interesado en generación de videos de 10s y pipelines agénticos.'
        },
        {
          id: 'lead_nex_02',
          name: 'María Fernández',
          email: 'maria@studiodesign.io',
          company: 'Studio Design Lab',
          planInterest: 'Pro Squad',
          dealValue: 588,
          status: 'demo_scheduled',
          leadScore: 88,
          source: 'Video Studio Demo',
          createdAt: '2026-08-17T09:15:00.000Z',
          notes: 'Requiere integración con Google Flow y DaVinci Resolve (OTIO).'
        },
        {
          id: 'lead_nex_03',
          name: 'Lucas Vega',
          email: 'lucas@techfounders.co',
          company: 'TechFounders Ventures',
          planInterest: 'Enterprise',
          dealValue: 2400,
          status: 'ai_qualified',
          leadScore: 82,
          source: 'Inbound Referral',
          createdAt: '2026-08-18T16:45:00.000Z',
          notes: 'Evaluando despliegue multi-tenant para 12 marcas subsidiarias.'
        }
      ],
      'tenant-apex-02': [
        {
          id: 'lead_apx_01',
          name: 'Guillermo Ramos',
          email: 'gramos@apexcapital.com',
          company: 'Apex Capital Partners',
          planInterest: 'Enterprise',
          dealValue: 4800,
          status: 'won',
          leadScore: 98,
          source: 'Enterprise Contact',
          createdAt: '2026-08-10T11:00:00.000Z',
          notes: 'Contrato corporativo anual con SLA dedicado y sandbox privado.'
        },
        {
          id: 'lead_apx_02',
          name: 'Beatriz Silva',
          email: 'bsilva@fintechprime.org',
          company: 'FinTech Prime Global',
          planInterest: 'Enterprise',
          dealValue: 3600,
          status: 'ai_qualified',
          leadScore: 90,
          source: 'Landing Form',
          createdAt: '2026-08-16T15:20:00.000Z',
          notes: 'Seguridad estricta y aislamiento por tenant requeridos.'
        }
      ],
      'tenant-solo-03': [
        {
          id: 'lead_solo_01',
          name: 'Daniel Hacker',
          email: 'daniel@solodev.me',
          company: 'Solo Indie Labs',
          planInterest: 'Hacker',
          dealValue: 0,
          status: 'new',
          leadScore: 70,
          source: 'GitHub Community',
          createdAt: '2026-08-18T18:00:00.000Z',
          notes: 'Probando exportación local de .agents/ y scripts de 10s.'
        }
      ]
    };
  }

  _getKey(tenantId) {
    return 'crm_leads';
  }

  getLeads(tenantId) {
    const leads = this.storage.getItem(tenantId, this._getKey(tenantId));
    // Si nunca se ha inicializado la clave (null/undefined), sembrar una sola vez
    if (leads === null || leads === undefined) {
      const seed = this.defaultSeedLeads[tenantId] ? [...this.defaultSeedLeads[tenantId]] : [];
      this.storage.setItem(tenantId, this._getKey(tenantId), seed);
      return seed;
    }
    // Si es un array (incluso vacío []), respetar el estado del usuario
    return Array.isArray(leads) ? leads : [];
  }

  addLead(tenantId, leadData) {
    if (!leadData || !leadData.email) {
      throw new Error('[CrmService] Lead must have a valid email.');
    }
    const leads = this.getLeads(tenantId);
    const newLead = {
      id: leadData.id || `lead_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      tenantId,
      name: leadData.name || 'Prospecto Web',
      email: leadData.email,
      company: leadData.company || 'Empresa Independiente',
      planInterest: leadData.planInterest || 'Pro Squad',
      dealValue: typeof leadData.dealValue === 'number' ? leadData.dealValue : (leadData.planInterest === 'Enterprise' ? 2400 : 588),
      status: leadData.status || 'new',
      leadScore: typeof leadData.leadScore === 'number' ? leadData.leadScore : Math.floor(70 + Math.random() * 25),
      source: leadData.source || 'Landing Form',
      createdAt: leadData.createdAt || new Date().toISOString(),
      notes: leadData.notes || 'Registrado desde la plataforma LoopGravity.'
    };

    leads.unshift(newLead);
    this.storage.setItem(tenantId, this._getKey(tenantId), leads);
    return newLead;
  }

  updateLeadStatus(tenantId, leadId, newStatus) {
    const leads = this.getLeads(tenantId);
    const index = leads.findIndex(l => l.id === leadId);
    if (index >= 0) {
      leads[index].status = newStatus;
      leads[index].updatedAt = new Date().toISOString();
      this.storage.setItem(tenantId, this._getKey(tenantId), leads);
      return leads[index];
    }
    return null;
  }

  deleteLead(tenantId, leadId) {
    const leads = this.getLeads(tenantId);
    const filtered = leads.filter(l => l.id !== leadId);
    this.storage.setItem(tenantId, this._getKey(tenantId), filtered);
    return filtered;
  }

  exportLeadsCSV(tenantId) {
    const leads = this.getLeads(tenantId);
    const headers = [
      'Lead ID',
      'Name',
      'Email',
      'Company',
      'Plan Interest',
      'Deal Value (USD)',
      'Status',
      'Lead Score',
      'Source',
      'Created At',
      'Notes'
    ];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      let str = String(val);
      // Neutralizar inyección de fórmulas de Excel / Sheets
      if (/^[=+@\-\t\r]/.test(str)) {
        str = "'" + str;
      }
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = [headers.join(',')];
    leads.forEach(l => {
      rows.push([
        escapeCsv(l.id),
        escapeCsv(l.name),
        escapeCsv(l.email),
        escapeCsv(l.company),
        escapeCsv(l.planInterest),
        escapeCsv(l.dealValue),
        escapeCsv(l.status),
        escapeCsv(l.leadScore),
        escapeCsv(l.source),
        escapeCsv(l.createdAt),
        escapeCsv(l.notes)
      ].join(','));
    });

    return rows.join('\r\n');
  }

  recordUsage(tenantId, { videoSeconds = 0, tokens = 0, engine = 'google-flow' }) {
    const key = 'usage_telemetry';
    const current = this.storage.getItem(tenantId, key) || {
      totalVideoSeconds: 0,
      totalTokens: 0,
      totalGenerations: 0,
      engineUsage: {}
    };

    current.totalVideoSeconds += videoSeconds;
    current.totalTokens += tokens;
    current.totalGenerations += 1;
    current.engineUsage[engine] = (current.engineUsage[engine] || 0) + 1;
    current.lastRecordedAt = new Date().toISOString();

    this.storage.setItem(tenantId, key, current);
    return current;
  }

  getMetrics(tenantId) {
    const leads = this.getLeads(tenantId);
    const usage = this.storage.getItem(tenantId, 'usage_telemetry') || {
      totalVideoSeconds: 120,
      totalTokens: 18450,
      totalGenerations: 4
    };

    const totalPipelineValue = leads.reduce((sum, l) => sum + (Number(l.dealValue) || 0), 0);
    const wonLeads = leads.filter(l => l.status === 'won');
    const wonRevenue = wonLeads.reduce((sum, l) => sum + (Number(l.dealValue) || 0), 0);
    const conversionRate = leads.length > 0 ? ((wonLeads.length / leads.length) * 100).toFixed(1) : '0.0';

    const computeCost = ((usage.totalVideoSeconds / 10) * 0.08 + (usage.totalTokens / 1000) * 0.005).toFixed(2);
    const hoursSaved = (usage.totalGenerations * 2.5).toFixed(1);

    return {
      tenantId,
      totalLeads: leads.length,
      wonLeadsCount: wonLeads.length,
      totalPipelineValue,
      wonRevenue,
      conversionRate,
      totalVideoSeconds: usage.totalVideoSeconds,
      totalTokens: usage.totalTokens,
      totalGenerations: usage.totalGenerations,
      computeCostUSD: computeCost,
      hoursSaved
    };
  }
}

// --- 3. Structured Telemetry Logger ---
class TelemetryLogger {
  constructor(consoleElementId) {
    this.consoleEl = document.getElementById(consoleElementId);
  }

  log(agent, message, status = 'info', metrics = {}) {
    const entry = {
      timestamp: new Date().toLocaleTimeString(),
      agent,
      message,
      status,
      metrics
    };

    if (this.consoleEl) {
      const row = document.createElement('div');
      row.className = 'log-entry';
      let statusClass = 'log-msg';
      if (status === 'success') statusClass = 'log-success';
      if (status === 'warn') statusClass = 'log-warn';

      row.innerHTML = `
        <span class="log-time">[${entry.timestamp}]</span>
        <span class="log-agent">[@${agent}]</span>
        <span class="${statusClass}">${message}</span>
      `;
      this.consoleEl.appendChild(row);
      this.consoleEl.scrollTop = this.consoleEl.scrollHeight;
    }
  }

  clear() {
    if (this.consoleEl) {
      this.consoleEl.innerHTML = '';
    }
  }
}

// --- 4. Loop Execution Engine ---
class LoopExecutionEngine {
  constructor(tenantService, logger) {
    this.tenantService = tenantService;
    this.logger = logger;
    this.isRunning = false;
    this.stages = [
      { id: 'spec', agent: 'investigador' },
      { id: 'identity', agent: 'branding' },
      { id: 'creative', agent: 'creativo' },
      { id: 'build', agent: 'web + app-developer' },
      { id: 'audit', agent: 'auditor' },
      { id: 'deploy', agent: 'director' }
    ];
  }

  async runFullLoop(appSpec, lang = 'es') {
    if (this.isRunning) return;
    this.isRunning = true;
    const ctx = this.tenantService.getTenantContext();
    this.logger.clear();

    const t = I18N[lang];
    const isEs = lang === 'es';

    this.logger.log('director', isEs ? `Iniciando Loop Autónomo para Tenant [${ctx.tenantId}]...` : `Starting Autonomous Loop for Tenant [${ctx.tenantId}]...`, 'info');
    this.logger.log('director', `${isEs ? 'Especificación' : 'Spec'}: "${appSpec.title}"`, 'info');

    for (let i = 0; i < this.stages.length; i++) {
      const stage = this.stages[i];
      this.updateStageUI(i, 'active');

      await this.simulateStageExecution(stage, ctx, isEs);

      this.updateStageUI(i, 'completed');
    }

    this.logger.log('director', isEs ? '🎉 Bucle completado con éxito. Artefactos verificados.' : '🎉 Loop successfully completed. Artifacts verified.', 'success');
    this.isRunning = false;
    showToast(t.toast_completed);
  }

  async simulateStageExecution(stage, ctx, isEs) {
    return new Promise(resolve => {
      let delay = 800;
      if (stage.id === 'spec') {
        this.logger.log('investigador', isEs ? 'Analizando mercado y derivando User Personas & JTBD...' : 'Analyzing market and deriving User Personas & JTBD...', 'info');
      } else if (stage.id === 'identity') {
        this.logger.log('branding', isEs ? 'Generando CSS Tokens y posicionamiento de marca...' : 'Generating CSS Tokens & brand positioning...', 'info');
      } else if (stage.id === 'creative') {
        this.logger.log('creativo', isEs ? 'Redactando copy AIDA y secuencias de email...' : 'Drafting AIDA copy and email sequences...', 'info');
      } else if (stage.id === 'build') {
        this.logger.log('web', isEs ? 'Construyendo UI responsive y vistas accesibles (WCAG AA)...' : 'Building responsive UI & accessible views (WCAG AA)...', 'info');
        this.logger.log('app-developer', isEs ? `Inyectando aislamiento multi-tenant para [${ctx.tenantId}] con Type-Safety...` : `Injecting multi-tenant isolation for [${ctx.tenantId}] with Type-Safety...`, 'info');
        delay = 1200;
      } else if (stage.id === 'audit') {
        this.logger.log('auditor', isEs ? 'Ejecutando suite de pruebas automatizadas y chequeo de seguridad...' : 'Running automated test suites and security checks...', 'info');
        this.logger.log('auditor', isEs ? 'Detectada discrepancia menor -> Aplicando parche de auto-healing...' : 'Minor discrepancy detected -> Applying self-healing patch...', 'warn');
        this.logger.log('auditor', isEs ? '✓ 24/24 Pruebas pasadas sin errores de tipo.' : '✓ 24/24 Tests passed with strict types.', 'success');
        delay = 1100;
      } else if (stage.id === 'deploy') {
        this.logger.log('director', isEs ? 'Validando Definition of Done (DoD) y emitiendo resumen ejecutivo.' : 'Validating Definition of Done (DoD) & executive overview.', 'success');
      }

      setTimeout(resolve, delay);
    });
  }

  updateStageUI(index, status) {
    const el = document.getElementById(`stage-${index}`);
    if (el) {
      el.className = `stage-step ${status}`;
    }
  }

  resetStages() {
    for (let i = 0; i < this.stages.length; i++) {
      const el = document.getElementById(`stage-${i}`);
      if (el) el.className = 'stage-step';
    }
  }
}

// --- 5. Video Prompt Engine: Idea -> Screenplay -> HR Sheets (Multi-Character + Lip-Sync) -> Flow Production ---
class VideoPromptService {
  constructor(tenantService, logger) {
    this.tenantService = tenantService;
    this.logger = logger;
    this.presets = {
      cake_studio: {
        id: 'cake_studio',
        nameEs: 'My Cake Studio (Pastelería con Sofía Coff & Moisés Guti)',
        nameEn: 'My Cake Studio (Artisan Bakery with Sofía Coff & Moisés Guti)',
        logline: 'Sofía Coff y Moisés Guti presentan la colección de pasteles gourmet en My Cake Studio con diálogo cruzado y sincronización labial.',
        hrPersonaje: {
          token: '[HR_PERSONAJE_SOFIA_COFF]',
          name: 'Sofía Coff',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/sofia_coff_character_sheet.png',
          description: 'Latina female pastry chef / host, late 20s, elegant dark wavy hair in stylish bun, brown expressive eyes, olive long-sleeve fitted top, light blue denim jeans, radiant warm smile, detailed facial texture',
          voiceProfile: 'Voz femenina dulce, entusiasta y elegante (26-30 años), dicción clara, ritmo acogedor 125 WPM, español neutro/latino'
        },
        hrPersonaje2: {
          token: '[HR_PERSONAJE_MOISES_GUTI]',
          name: 'Moisés Guti',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/moises_guti_character_sheet.png',
          description: 'Latino male executive / co-host, early 40s, short textured dark hair, light-blue dress shirt with charcoal blazer, dark leather belt, confident and warm smile, hazel eyes, detailed skin texture',
          voiceProfile: 'Voz masculina ejecutiva (38-42 años), tono cálido, seguro y convincente, ritmo dinámico 130 WPM, español neutro'
        },
        hrProducto: {
          token: '[HR_PRODUCTO_CAKE_COLLECTION]',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/my_cake_studio_banner.png',
          description: 'Multi-tiered gourmet wedding cakes with chocolate drip, fresh raspberries, edible gold leaf, macarons, and artisanal pastel cake stands'
        },
        hrEscenario: {
          token: '[HR_ESCENARIO_CAKE_STUDIO]',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/cake_studio_kitchen.png',
          description: 'luxurious pastel bakery studio, white marble countertops, warm ambient wall sconces, mint green accents, cake display pedestals, diffused 5600K key light, subtle golden hour rim'
        },
        cameraStyle: 'Sony FX9, 50mm Master Prime T1.5, Motorized Slider & 3-Axis Gimbal, Warm Golden Hour lighting, 8K commercial grade',
        audioScore: 'Acoustic Indie Pop / Warm Acoustic Guitar, 110 BPM, gentle glockenspiel bells, celebratory joyful strings',
        audioSfx: 'Sonido suave de espátula de repostería, colocación de frutos rojos, murmullo acogedor de tienda, tintineo de campana dulce',
        acts: [
          {
            actNumber: 1,
            titleEs: 'Hook: Bienvenida & Presentación de Pasteles Únicos',
            titleEn: 'Hook: Welcome & Artisanal Cake Showcase',
            speaker: 'Sofía Coff',
            speakerToken: '[HR_PERSONAJE_SOFIA_COFF]',
            shotType: 'Medium Two-Shot with Slow Push-in',
            cameraMotion: 'Smooth slider glide past luscious tiered drip cake to Sofía and Moisés',
            subjectAction: 'Sofía Coff speaks warmly to camera with natural eye contact and expressive hand gesture, while Moisés stands beside her smiling and nodding in agreement.',
            lipSyncDirective: 'Sofía speaks directly on-camera with synchronized lip movements and natural mouth articulation.',
            dialogueEs: '¡Bienvenidos a My Cake Studio! Aquí convertimos tus momentos más especiales en una experiencia dulce e inolvidable.',
            dialogueEn: 'Welcome to My Cake Studio! Here we turn your most special moments into a sweet and unforgettable experience.',
            sfxFoley: '0-3s: Tintineo de campana de pastelería | 3-7s: Acorde cálido de guitarra acústica | 7-10s: Deslizamiento suave de cámara',
            promptSegment: 'Medium two-shot of [HR_PERSONAJE_SOFIA_COFF] and [HR_PERSONAJE_MOISES_GUTI] standing behind marble counter with [HR_PRODUCTO_CAKE_COLLECTION] inside [ENV_ANCHOR].'
          },
          {
            actNumber: 2,
            titleEs: 'Detalle Artesanal & Diálogo Cruzado de Calidad',
            titleEn: 'Artisanal Details & Co-Host Dialogue',
            speaker: 'Moisés Guti',
            speakerToken: '[HR_PERSONAJE_MOISES_GUTI]',
            shotType: 'Over-the-Shoulder (OTS) to Close-Up on Cake Details',
            cameraMotion: 'Slow motion 60fps macro glide over golden caramel drip and berries, panning up to Moisés as he speaks',
            subjectAction: 'Moisés Guti gestures toward the golden caramel drip cake and speaks with genuine enthusiasm, while Sofía adds finishing touches with fresh berries.',
            lipSyncDirective: 'Moisés speaks directly on-camera with synchronized lip movements and enthusiastic facial expression.',
            dialogueEs: 'Cuidamos cada detalle: goteo artesanal perfecto, frutos frescos e ingredientes premium para tus bodas y cumpleaños.',
            dialogueEn: 'We care for every detail: perfect artisanal drip, fresh berries, and premium ingredients for your weddings and birthdays.',
            sfxFoley: '0-3s: Goteo sutil y apetitoso | 3-7s: Sonido de colocación de fresa fresca | 7-10s: Shimmer musical brillante',
            promptSegment: 'Dynamic tracking shot showing [HR_PERSONAJE_MOISES_GUTI] gesturing to [HR_PRODUCTO_CAKE_COLLECTION] with [HR_PERSONAJE_SOFIA_COFF] crafting details in [ENV_ANCHOR].'
          },
          {
            actNumber: 3,
            titleEs: 'Personalización & Experiencia de Sabor',
            titleEn: 'Customization & Flavor Experience',
            speaker: 'Sofía Coff',
            speakerToken: '[HR_PERSONAJE_SOFIA_COFF]',
            shotType: 'Orbital 45-Degree Two-Shot Glide',
            cameraMotion: '45-degree smooth arc shot showing full cake display on marble table',
            subjectAction: 'Sofía steps forward slightly, holding a mini celebration cake and speaking with charming warmth as Moisés smiles beside her.',
            lipSyncDirective: 'Sofía speaks directly on-camera with synchronized lip movements and radiant smile.',
            dialogueEs: 'Diseños 100% personalizados para que tu celebración sea verdaderamente única y memorable.',
            dialogueEn: '100% custom designs so your celebration is truly unique and memorable.',
            sfxFoley: '0-3s: Risas suaves y calidez | 3-7s: Crescendo de campanas alegres | 7-10s: Beat acústico a 110 BPM',
            promptSegment: 'Orbital arc shot of [HR_PERSONAJE_SOFIA_COFF] and [HR_PERSONAJE_MOISES_GUTI] surrounded by [HR_PRODUCTO_CAKE_COLLECTION] in [ENV_ANCHOR].'
          },
          {
            actNumber: 4,
            titleEs: 'Llamada a la Acción Unificada: Reserva tu Pastel',
            titleEn: 'Unified Call to Action: Book Your Dream Cake',
            speaker: 'Sofía & Moisés (Dúo)',
            speakerToken: '[HR_PERSONAJE_SOFIA_COFF] & [HR_PERSONAJE_MOISES_GUTI]',
            shotType: 'Hero Center Frame with Brand Reveal',
            cameraMotion: 'Centered slow dolly-in with My Cake Studio pastel badge and phone number',
            subjectAction: 'Both Sofía and Moisés look warmly into camera; Sofía delivers the closing line and Moisés joins for the final smile as brand graphics lock in.',
            lipSyncDirective: 'Sofía speaks the final phrase on-camera with synchronized lip movements while both deliver an inviting closing gesture.',
            dialogueEs: 'Reserva tu fecha hoy en mycakestudio.com. ¡Dulzura hecha arte para tus momentos inolvidables!',
            dialogueEn: 'Book your date today at mycakestudio.com. Sweetness made art for your unforgettable moments!',
            sfxFoley: '0-3s: Resonancia de logotipo pastel | 3-7s: Acorde final dulce de piano | 7-10s: Silencio limpio',
            promptSegment: 'Centered hero shot of [HR_PERSONAJE_SOFIA_COFF] and [HR_PERSONAJE_MOISES_GUTI] presenting brand CTA in [ENV_ANCHOR].'
          }
        ]
      },
      saas_property: {
        id: 'saas_property',
        nameEs: 'Property OS (SaaS Inmobiliario con Moisés Guti)',
        nameEn: 'Property OS (Real Estate SaaS with Moisés Guti)',
        logline: 'El ejecutivo Moisés Guti presenta Property OS, la plataforma inteligente de gestión inmobiliaria con IA, automatizando leads y valuaciones.',
        hrPersonaje: {
          token: '[HR_PERSONAJE_MOISES_GUTI]',
          name: 'Moisés Guti',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/moises_guti_character_sheet.png',
          description: 'Latino male executive, early 40s, short textured dark hair, light-blue striped dress shirt, dark leather belt, classic denim jeans, confident and warm smile, hazel eyes, detailed facial texture',
          voiceProfile: 'Voz masculina ejecutiva (38-42 años), tono cálido, seguro y convincente, ritmo dinámico 130 WPM, español neutro'
        },
        hrPersonaje2: {
          token: '[HR_PERSONAJE_SOFIA_COFF]',
          name: 'Sofía (Asesora Inmobiliaria)',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/sofia_coff_character_sheet.png',
          description: 'Latina real estate associate, late 20s, professional navy blazer, smart tablet in hand, attentive and confident expression',
          voiceProfile: 'Voz femenina profesional, ágil, 125 WPM, español neutro'
        },
        hrProducto: {
          token: '[HR_PRODUCTO_PROPERTY_OS]',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/property_os_product_sheet.png',
          description: 'Curved 4K ultrawide monitor displaying Property OS real estate CRM, emerald green (#10b981) and obsidian (#0b0f17) palette, Kanban pipeline, RAG AI chat window, KPI dashboards'
        },
        hrEscenario: {
          token: '[HR_ESCENARIO_MODERN_STUDIO]',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/modern_executive_studio.png',
          description: 'minimalist modern studio, dark gray gradient backdrop, solid executive walnut desk, diffused 5600K key light, subtle cyan backlight rim, shallow depth of field f/1.8'
        },
        cameraStyle: 'Arri Alexa Mini LF, 35mm Master Prime T1.3, Steadicam & 3-Axis Gimbal, Teal & Orange color grade, 8K fidelity',
        audioScore: 'Upbeat Corporate Modern Electronic, 120 BPM, clean acoustic guitar pluck with warm synth pads, triumphant crescendo at CTA',
        audioSfx: 'Clicks de interfaz nítidos, whoosh de cámara suave, chime de lead calificado exitoso, sonido de teclado táctil',
        acts: [
          {
            actNumber: 1,
            titleEs: 'Hook: El reto de gestionar propiedades manualmente',
            titleEn: 'Hook: Manual property management chaos',
            speaker: 'Moisés Guti',
            speakerToken: '[HR_PERSONAJE_MOISES_GUTI]',
            shotType: 'MCU (Medium Close-Up) 35mm Low-Angle Push-in',
            cameraMotion: 'Cinematic slow push-in, low angle toward executive',
            subjectAction: 'Moisés Guti stands beside the curved Property OS display with a warm, confident expression, gesturing to camera.',
            lipSyncDirective: 'Moisés speaks directly on-camera with synchronized lip movements and convincing eye contact.',
            dialogueEs: '¿Sigues perdiendo cierres inmobiliarios por gestionar prospectos y propiedades de forma manual?',
            dialogueEn: 'Still losing real estate deals managing leads and properties manually?',
            sfxFoley: '0-3s: Tono sutil de ambiente corporativo | 3-7s: Beep de notificación de lead pendiente | 7-10s: Whoosh de cámara',
            promptSegment: 'Cinematic medium close-up of [HR_PERSONAJE_MOISES_GUTI] standing beside [HR_PRODUCTO_PROPERTY_OS] inside [ENV_ANCHOR].'
          },
          {
            actNumber: 2,
            titleEs: 'Demostración de Kanban & RAG Inmobiliario',
            titleEn: 'Kanban & Real Estate RAG Live Demo',
            speaker: 'Moisés Guti',
            speakerToken: '[HR_PERSONAJE_MOISES_GUTI]',
            shotType: 'Over-The-Shoulder (OTS) Lateral Tracking with Steadicam',
            cameraMotion: 'Dynamic 30-degree lateral tracking shot across ultrawide monitor',
            subjectAction: 'Moisés points to Property OS Kanban pipeline as AI automatically qualifies incoming buyer inquiries in 0.8s.',
            lipSyncDirective: 'Moisés speaks directly on-camera with synchronized lip movements as he points to the screen.',
            dialogueEs: 'Con Property OS, la inteligencia artificial califica tus prospectos y automatiza tu inventario en tiempo real.',
            dialogueEn: 'With Property OS, AI qualifies your leads and updates inventory in real time.',
            sfxFoley: '0-3s: Clic de tarjeta Kanban | 3-7s: Chime de IA procesando datos a 0.8s | 7-10s: Resonancia de éxito verde',
            promptSegment: 'Dynamic tracking shot showing [HR_PERSONAJE_MOISES_GUTI] interacting with [HR_PRODUCTO_PROPERTY_OS] in [ENV_ANCHOR].'
          },
          {
            actNumber: 3,
            titleEs: 'Visión 360 & Valuación Automatizada',
            titleEn: '360 Property Insights & Auto-Valuation',
            speaker: 'Moisés Guti',
            speakerToken: '[HR_PERSONAJE_MOISES_GUTI]',
            shotType: 'Orbital 45-Degree Steadicam Rig',
            cameraMotion: 'Medium arc shot, 45-degree orbit around workstation',
            subjectAction: 'The screen reveals automatic valuation and contract generation as Moisés smiles approvingly at camera.',
            lipSyncDirective: 'Moisés speaks directly on-camera with synchronized lip movements and confident posture.',
            dialogueEs: 'Genera reportes de mercado, valuaciones automáticas y contratos listos con un solo clic.',
            dialogueEn: 'Generate market reports, automatic valuations, and contracts ready with one single click.',
            sfxFoley: '0-3s: Transición holográfica suave | 3-7s: Generación de PDF instantánea | 7-10s: Pulso de bajo rítmico a 120 BPM',
            promptSegment: 'Orbital cinematic shot around [HR_PERSONAJE_MOISES_GUTI] showing executive KPI graphs on [HR_PRODUCTO_PROPERTY_OS] in [ENV_ANCHOR].'
          },
          {
            actNumber: 4,
            titleEs: 'Cierre Comercial & Call To Action',
            titleEn: 'Commercial Climax & CTA',
            speaker: 'Moisés Guti',
            speakerToken: '[HR_PERSONAJE_MOISES_GUTI]',
            shotType: 'Centered Hero Portrait with Brand Lockup',
            cameraMotion: 'Centered slow dolly-in with glowing logo reveal',
            subjectAction: 'Moisés delivers high-impact closing statement; Property OS green emblem and URL materialize cleanly.',
            lipSyncDirective: 'Moisés speaks the closing call to action directly into camera with synchronized lip movements.',
            dialogueEs: 'Eleva tu inmobiliaria al siguiente nivel. Descubre Property OS hoy mismo en propertyos.io.',
            dialogueEn: 'Scale your real estate business. Discover Property OS today at propertyos.io.',
            sfxFoley: '0-3s: Resonancia de logotipo Property OS | 3-7s: Acorde musical triunfal de cierre | 7-10s: Desvanecimiento limpio',
            promptSegment: 'Hero portrait shot of [HR_PERSONAJE_MOISES_GUTI] delivering final CTA beside [HR_PRODUCTO_PROPERTY_OS] in [ENV_ANCHOR].'
          }
        ]
      },
      saas_demo: {
        id: 'saas_demo',
        nameEs: 'LoopGravity Studio (AI Dev & Founder)',
        nameEn: 'LoopGravity Studio (AI Dev & Founder)',
        logline: 'Una desarrolladora senior automatiza la creación de micro-SaaS y bucles agénticos con Google Antigravity.',
        hrPersonaje: {
          token: '[HR_PERSONAJE_DEV_01]',
          name: 'Elena Dev',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/dev01_character_sheet.png',
          description: 'Hispanic female developer, 29 yo, short dark wavy hair, expressive almond eyes, obsidian minimalist hoodie, relaxed confident posture, detailed skin texture',
          voiceProfile: 'Voz femenina profesional (28-32 años), tono seguro, ritmo dinámico 130 WPM, dicción clara de tecnología'
        },
        hrPersonaje2: {
          token: '[HR_PERSONAJE_ARCHITECT]',
          name: 'David (AI Architect)',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/architect_sheet.png',
          description: 'Tech architect, early 30s, glasses, minimalist dark t-shirt, analytical gaze',
          voiceProfile: 'Voz masculina técnica, 130 WPM'
        },
        hrProducto: {
          token: '[HR_PRODUCTO_LOOPGRAVITY]',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/loopgravity_product_sheet.png',
          description: 'Dark mode web dashboard (#030712), neon indigo (#6366f1) and cyan (#06b6d4) glowing telemetry bars, 3D holographic Loop crest'
        },
        hrEscenario: {
          token: '[HR_ESCENARIO_STUDIO]',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/dev_studio_clean.png',
          description: 'minimalist modern software studio, dual 4K matte monitors on solid walnut desk, Key light 5600K diffused, cyan/purple edge rim lighting, shallow depth of field f/1.8'
        },
        cameraStyle: 'Arri Alexa Mini LF, 35mm Master Prime T1.3, Steadicam & 3-Axis Gimbal, Teal & Orange color grade, 8K fidelity',
        audioScore: 'Ambient Tech Hybrid Score, 118 BPM, pulsating analog bassline, evolving arpeggiated synths, triumphal rise at CTA',
        audioSfx: 'Teclados mecánicos táctiles, sub-bass swooshes, chime holográfico de compilación exitosa',
        acts: [
          {
            actNumber: 1,
            titleEs: 'Hook & Frustración con Código Manual',
            titleEn: 'Hook & Manual Coding Friction',
            speaker: 'Elena Dev',
            speakerToken: '[HR_PERSONAJE_DEV_01]',
            shotType: 'MCU (Medium Close-Up) Low-Angle Push-in',
            cameraMotion: 'Cinematic slow push-in, 35mm lens, low angle',
            subjectAction: 'Developer looks at IDE and turns to camera speaking directly with focused expression.',
            lipSyncDirective: 'Elena speaks directly on-camera with synchronized lip movements and expressive facial delivery.',
            dialogueEs: '¿Sigues perdiendo horas depurando prompts manuales que rompen tu arquitectura?',
            dialogueEn: 'Still losing hours debugging manual prompts that break your SaaS architecture?',
            sfxFoley: '0-3s: Clics de teclado mecánico | 3-7s: Zumbido de ventilador | 7-10s: Beep de error de compilación',
            promptSegment: 'Cinematic slow push-in shot of [HR_PERSONAJE_DEV_01] inside [ENV_ANCHOR].'
          },
          {
            actNumber: 2,
            titleEs: 'Descubrimiento & Activación del Bucle',
            titleEn: 'Discovery & Closed-Loop Activation',
            speaker: 'Elena Dev',
            speakerToken: '[HR_PERSONAJE_DEV_01]',
            shotType: 'Over-The-Shoulder Lateral Tracking',
            cameraMotion: 'Dynamic 30-degree lateral pan to keyboard and prompt field',
            subjectAction: 'Types single spec into LoopGravity terminal and speaks with confidence as UI glows cyan.',
            lipSyncDirective: 'Elena speaks on-camera with synchronized lip movements as screen lights up.',
            dialogueEs: 'Con LoopGravity, defines tu requerimiento una sola vez...',
            dialogueEn: 'With LoopGravity, define your spec once...',
            sfxFoley: '0-3s: Pulsación de tecla Enter | 3-7s: Sub-bass whoosh | 7-10s: Activación de UI cian',
            promptSegment: 'Dynamic lateral tracking shot as [HR_PERSONAJE_DEV_01] enters spec into [HR_PRODUCTO_LOOPGRAVITY] in [ENV_ANCHOR].'
          },
          {
            actNumber: 3,
            titleEs: 'Orquestación del Escuadrón Agéntico',
            titleEn: 'Agent Squad Orchestration',
            speaker: 'Elena Dev',
            speakerToken: '[HR_PERSONAJE_DEV_01]',
            shotType: 'Orbital 45-Degree Steadicam Rig',
            cameraMotion: 'Medium arc shot, 45-degree orbit around workstation',
            subjectAction: 'Gestures to the multi-agent telemetry and speaks with enthusiastic conviction.',
            lipSyncDirective: 'Elena speaks on-camera with synchronized lip movements while gesturing to telemetry.',
            dialogueEs: '...y un escuadrón de agentes especializados toma el control en paralelo.',
            dialogueEn: '...and a specialized agent squad orchestrates in parallel.',
            sfxFoley: '0-3s: Chimes secuenciales | 3-7s: Pulsación rítmica a 118 BPM | 7-10s: Resonancia esmeralda',
            promptSegment: 'Medium orbital shot around [HR_PERSONAJE_DEV_01] in [ENV_ANCHOR] displaying [HR_PRODUCTO_LOOPGRAVITY].'
          },
          {
            actNumber: 4,
            titleEs: 'Clímax Final & Call To Action',
            titleEn: 'Final Climax & Brand CTA',
            speaker: 'Elena Dev',
            speakerToken: '[HR_PERSONAJE_DEV_01]',
            shotType: 'Centered Hero Portrait with Holographic Crest',
            cameraMotion: 'Centered slow dolly-in with brand hologram',
            subjectAction: 'Looks directly into camera with supreme confidence and delivers final invitation.',
            lipSyncDirective: 'Elena speaks directly on-camera with synchronized lip movements and confident smile.',
            dialogueEs: 'Lanza tu escuadrón agéntico hoy. Únete a LoopGravity.',
            dialogueEn: 'Launch your autonomous agent squad today. Join LoopGravity.',
            sfxFoley: '0-3s: Resonancia de logotipo 3D | 3-7s: Sub-bass hit | 7-10s: Eco armónico y silencio limpio',
            promptSegment: 'Hero portrait shot of [HR_PERSONAJE_DEV_01] looking into lens with floating [HR_PRODUCTO_LOOPGRAVITY] crest.'
          }
        ]
      },
      hardware_reveal: {
        id: 'hardware_reveal',
        nameEs: 'Hardware Robotics & Cleanroom',
        nameEn: 'Hardware Robotics & Cleanroom',
        logline: 'Un ingeniero robótico calibra y ensambla unidades edge autónomas con precisión milimétrica.',
        hrPersonaje: {
          token: '[HR_PERSONAJE_ENGINEER_03]',
          name: 'Ing. Carlos',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/engineer_character_sheet.png',
          description: 'Tech engineer in cyber-tactical dark apron, safety glasses, focused gaze, precision nitrile gloves',
          voiceProfile: 'Voz serena, profunda, estilo documental de ingeniería aeroespacial'
        },
        hrPersonaje2: {
          token: '[HR_PERSONAJE_TECH_02]',
          name: 'Técnico Especialista',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/engineer_character_sheet.png',
          description: 'Cleanroom robotic technician in protective clean suit and HUD visor',
          voiceProfile: 'Voz masculina técnica precisa'
        },
        hrProducto: {
          token: '[HR_PRODUCTO_EDGE_UNIT]',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/edge_unit_hardware_sheet.png',
          description: 'Precision CNC-milled obsidian aluminum enclosure, laser-etched circuitry, glowing teal indicators'
        },
        hrEscenario: {
          token: '[HR_ESCENARIO_ROBOTIC_BAY]',
          imageUrl: 'https://loopgravity.io/assets/model_sheets/cleanroom_robotic_bay.png',
          description: 'advanced robotics cleanroom, robotic arms, laser grid floor, crisp neutral 6000K lighting, HEPA airflow'
        },
        cameraStyle: 'Phantom Flex4K, 100mm Macro probe lens, 120fps high-speed capture, hyper-detailed mechanical textures',
        audioScore: 'Cinematic Minimalist Industrial, 90 BPM, sub-harmonic cello, metallic percussions, precision ticking',
        audioSfx: 'Laser calibration whine, pneumatic robotic hiss, magnetic chassis lock, relay clicks',
        acts: [
          {
            actNumber: 1,
            titleEs: 'Calibración Láser Inicial',
            titleEn: 'Initial Laser Calibration',
            speaker: 'Ing. Carlos',
            speakerToken: '[HR_PERSONAJE_ENGINEER_03]',
            shotType: 'Macro Probe Laser Sweep',
            cameraMotion: 'Laser line sweep probe shot',
            subjectAction: 'Robotic arm calibrates autonomous edge device, engineer speaks on camera with calm precision.',
            lipSyncDirective: 'Carlos speaks directly on-camera with synchronized lip movements and focused demeanor.',
            dialogueEs: 'Precisión milimétrica para la próxima generación de hardware autónomo.',
            dialogueEn: 'Millimeter precision for next-generation autonomous hardware.',
            sfxFoley: '0-3s: Silbido de láser azul | 3-7s: Servo motor micro-ajuste | 7-10s: Lock acústico',
            promptSegment: 'Ultra-macro probe camera movement across [HR_PRODUCTO_EDGE_UNIT] guided by [HR_PERSONAJE_ENGINEER_03] in [ENV_ANCHOR].'
          },
          {
            actNumber: 2,
            titleEs: 'Ensamblaje Robótico de Precisión',
            titleEn: 'Precision Robotic Assembly',
            speaker: 'Ing. Carlos',
            speakerToken: '[HR_PERSONAJE_ENGINEER_03]',
            shotType: '360-Degree Macro Rotational Axis',
            cameraMotion: '360 degree rotational sweep',
            subjectAction: 'Hardware chassis snaps together with magnetic precision as engineer explains the architecture.',
            lipSyncDirective: 'Carlos speaks directly on-camera with synchronized lip movements.',
            dialogueEs: 'Diseñado para ejecutar bucles agénticos en el borde con máxima eficiencia.',
            dialogueEn: 'Engineered to execute agentic loops on the edge with maximum efficiency.',
            sfxFoley: '0-3s: Chasquido magnético | 3-7s: Secuencia de relés | 7-10s: Encendido de LEDs teal',
            promptSegment: 'Full 360 rotation around [HR_PRODUCTO_EDGE_UNIT] as [HR_PERSONAJE_ENGINEER_03] inspects in [ENV_ANCHOR].'
          },
          {
            actNumber: 3,
            titleEs: 'Encendido de Red Neuronal Local',
            titleEn: 'Local Neural Engine Power-On',
            speaker: 'Ing. Carlos',
            speakerToken: '[HR_PERSONAJE_ENGINEER_03]',
            shotType: 'Slow-Motion Rising Pedestal Hero',
            cameraMotion: 'Slow-motion rising pedestal shot',
            subjectAction: 'Device powers on, beam of soft cyan laser projects brand seal, engineer speaks approvingly.',
            lipSyncDirective: 'Carlos speaks directly on-camera with synchronized lip movements.',
            dialogueEs: 'Inteligencia local con cero latencia y total soberanía de datos.',
            dialogueEn: 'Local intelligence with zero latency and full data sovereignty.',
            sfxFoley: '0-3s: Zumbido de inducción | 3-7s: Resonancia de proyector | 7-10s: Pulso constante de motor',
            promptSegment: 'Hero pedestal shot of completed [HR_PRODUCTO_EDGE_UNIT] powered on with [HR_PERSONAJE_ENGINEER_03] in [ENV_ANCHOR].'
          },
          {
            actNumber: 4,
            titleEs: 'Revelación Final & Certificación',
            titleEn: 'Final Reveal & Certification',
            speaker: 'Ing. Carlos',
            speakerToken: '[HR_PERSONAJE_ENGINEER_03]',
            shotType: 'Wide Cinematic Cleanroom Vista Crane',
            cameraMotion: 'Gliding crane retreat to full lab vista',
            subjectAction: 'Engineer holds up certified device with subtle smile delivering closing certification statement.',
            lipSyncDirective: 'Carlos delivers closing statement directly into camera with synchronized lip movements.',
            dialogueEs: 'LoopGravity Edge. Disponible para despliegue industrial inmediato.',
            dialogueEn: 'LoopGravity Edge. Ready for immediate industrial deployment.',
            sfxFoley: '0-3s: Aire purificado HEPA | 3-7s: Impacto musical de conclusión | 7-10s: Desvanecimiento suave',
            promptSegment: 'Wide cinematic cleanroom vista with [HR_PERSONAJE_ENGINEER_03] presenting completed [HR_PRODUCTO_EDGE_UNIT] in [ENV_ANCHOR].'
          }
        ]
      }
    };
  }

  generateScreenplayFromIdea(ideaText, presetKey = 'cake_studio', characterCount = 2) {
    const preset = this.presets[presetKey] || this.presets.cake_studio;
    const countNum = parseInt(characterCount, 10) || 2;
    
    let logline = ideaText && ideaText.trim()
      ? `Guión cinematográfico derivado (${countNum} personajes con Lip-Sync): "${ideaText.trim()}"`
      : preset.logline;

    return {
      presetKey: preset.id,
      characterCount: countNum,
      logline,
      totalActs: preset.acts.length,
      durationSeconds: preset.acts.length * 10,
      hrPersonaje: preset.hrPersonaje,
      hrPersonaje2: preset.hrPersonaje2 || preset.hrPersonaje,
      hrProducto: preset.hrProducto,
      hrEscenario: preset.hrEscenario,
      cameraStyle: preset.cameraStyle,
      audioScore: preset.audioScore,
      audioSfx: preset.audioSfx,
      acts: preset.acts
    };
  }

  generateMultiBlockSequence(config, blockCount = 1) {
    const tenantCtx = this.tenantService.getTenantContext();
    const preset = this.presets[config.presetKey] || this.presets.cake_studio;
    const baseSeed = Math.floor(1000000 + Math.random() * 9000000);
    const sequenceId = `seq_${blockCount}x10s_${Date.now().toString(36)}`;
    const negativePrompt = 'morphing, frame distortion, flickering, jitter, extra limbs, deformed fingers, low resolution, blurry text, oversaturated, cartoon, 3d render, unsynchronized lips, silent dialogue';

    const charCount = parseInt(config.characterCount, 10) || 2;
    const actorMode = config.actorMode || 'image';
    const actor2Mode = config.actor2Mode || 'image';
    const productMode = config.productMode || 'image';
    const envMode = config.envMode || 'image';

    const actorName = (config.actorName && config.actorName.trim()) || preset.hrPersonaje.name || 'Protagonista';
    const actor2Name = (config.actor2Name && config.actor2Name.trim()) || (preset.hrPersonaje2 ? preset.hrPersonaje2.name : 'Co-Protagonista');

    const actorImg = config.actorImageUrl || preset.hrPersonaje.imageUrl || 'HR-PERSONAJE.png';
    const actor2Img = config.actor2ImageUrl || (preset.hrPersonaje2 ? preset.hrPersonaje2.imageUrl : 'HR-PERSONAJE-2.png');
    const productImg = config.productImageUrl || (preset.hrProducto ? preset.hrProducto.imageUrl : 'HR-PRODUCTO.png');
    const envImg = config.envImageUrl || (preset.hrEscenario ? preset.hrEscenario.imageUrl : 'HR-ESCENARIO.png');

    const hrActor = config.actor || `${preset.hrPersonaje.token}: ${preset.hrPersonaje.description}`;
    const hrActor2 = config.actor2 || (preset.hrPersonaje2 ? `${preset.hrPersonaje2.token}: ${preset.hrPersonaje2.description}` : '');
    const hrProduct = config.product || (preset.hrProducto ? `${preset.hrProducto.token}: ${preset.hrProducto.description}` : '');
    const hrEnv = config.env || (preset.hrEscenario ? `${preset.hrEscenario.token}: ${preset.hrEscenario.description}` : '');
    const camera = config.camera || preset.cameraStyle;
    const voiceProfile = config.voiceProfile || preset.hrPersonaje.voiceProfile;
    const voiceProfile2 = config.voiceProfile2 || (preset.hrPersonaje2 ? preset.hrPersonaje2.voiceProfile : '');
    const audioScore = config.audioBgm || preset.audioScore;
    const audioSfx = config.audioSfx || preset.audioSfx;

    const actorRefTag = actorMode === 'image'
      ? `[HR-Personaje 1 (${actorName}): Imagen adjunta]`
      : `[HR-Personaje 1 (${actorName} - Descripción): ${hrActor}]`;

    const actor2RefTag = charCount >= 2
      ? (actor2Mode === 'image'
          ? `[HR-Personaje 2 (${actor2Name}): Imagen adjunta]`
          : `[HR-Personaje 2 (${actor2Name} - Descripción): ${hrActor2}]`)
      : '';

    const productRefTag = productMode === 'image'
      ? `[HR-Producto: Imagen adjunta]`
      : `[HR-Producto: ${hrProduct}]`;

    const envRefTag = envMode === 'image'
      ? `[HR-Escenario: Imagen adjunta]`
      : `[HR-Escenario: ${hrEnv}]`;

    const presetP1Name = preset.hrPersonaje.name || 'Sofía Coff';
    const presetP2Name = (preset.hrPersonaje2 && preset.hrPersonaje2.name) || 'Moisés Guti';

    const replaceTokensAndNames = (txt) => {
      if (!txt) return '';
      let res = txt;
      // Replace specific character 1 tokens
      res = res.replace(/\[HR_PERSONAJE_SOFIA_COFF\]/g, actorRefTag)
               .replace(/\[HR_PERSONAJE_DEV_01\]/g, actorRefTag)
               .replace(/\[HR_PERSONAJE_ENGINEER_03\]/g, actorRefTag)
               .replace(/\[HR_PERSONAJE_1\]/g, actorRefTag);

      // Replace specific character 2 tokens
      if (charCount >= 2) {
        res = res.replace(/\[HR_PERSONAJE_MOISES_GUTI\]/g, actor2RefTag)
                 .replace(/\[HR_PERSONAJE_ARCHITECT\]/g, actor2RefTag)
                 .replace(/\[HR_PERSONAJE_TECH_02\]/g, actor2RefTag)
                 .replace(/\[HR_PERSONAJE_2\]/g, actor2RefTag);
      } else {
        res = res.replace(/\[HR_PERSONAJE_MOISES_GUTI\]/g, actorRefTag)
                 .replace(/\[HR_PERSONAJE_ARCHITECT\]/g, actorRefTag)
                 .replace(/\[HR_PERSONAJE_TECH_02\]/g, actorRefTag)
                 .replace(/\[HR_PERSONAJE_2\]/g, actorRefTag);
      }

      // Replace generic person token
      res = res.replace(/\[HR_PERSONAJE_\w+\]/g, actorRefTag);
      // Replace product and env tokens
      res = res.replace(/\[HR_PRODUCTO_\w+\]/g, productRefTag);
      res = res.replace(/\[HR_ESCENARIO_\w+\]/g, envRefTag);
      res = res.replace(/\[ENV_ANCHOR\]/g, envRefTag);

      // Replace literal names in description
      if (presetP1Name && actorName && presetP1Name !== actorName) {
        res = res.split(presetP1Name).join(actorName);
      }
      if (charCount >= 2 && presetP2Name && actor2Name && presetP2Name !== actor2Name) {
        res = res.split(presetP2Name).join(actor2Name);
      }
      return res;
    };

    // Distribute Acts across blockCount
    const selectedActs = this.distributeActs(preset.acts, blockCount);

    const sequenceBlocks = selectedActs.map((act, index) => {
      const blockNum = index + 1;
      const startSec = (blockNum - 1) * 10;
      const endSec = blockNum * 10;
      const timeGlobal = `${this.formatSeconds(startSec)} - ${this.formatSeconds(endSec)}`;
      const blockSeed = baseSeed + index * 37;

      const isFirstBlock = blockNum === 1;
      const attachedMediaDirective = isFirstBlock
        ? ''
        : `[ADJUNTAR VIDEO DEL BLOQUE ${blockNum - 1} EN GOOGLE FLOW (Extender toma anterior de 00:${this.formatSeconds(startSec - 10)} a 00:${this.formatSeconds(startSec)})]`;

      const continuityDirective = isFirstBlock
        ? `[Initial Establishing Master Shot: Locks spatial positions and identity of ${actorRefTag}${actor2RefTag ? ' and ' + actor2RefTag : ''} inside ${envRefTag}].`
        : `[Continuity Extension: Extends ending frame & camera vector of Block ${blockNum - 1}. Identical facial geometry, clothing, lighting, and placement of ${actorRefTag}${actor2RefTag ? ' and ' + actor2RefTag : ''} inside ${envRefTag}].`;

      const chunkT1 = `${act.promptSegment} (0-3s: [Shot: ${act.shotType}] ${act.cameraMotion})`;
      const chunkT2 = `Core progression & Multi-Actor Interaction: ${act.subjectAction} (3-7s)`;
      const chunkT3 = blockNum === blockCount
        ? `Hero resolution, brand lockup and high-impact CTA framing with final smile (7-10s)`
        : `Seamless camera motion transition preparing extension into Block ${blockNum + 1} (7-10s)`;

      // Determine active speaker summary
      let activeSpeaker = actorName;
      let activeVoice = voiceProfile;
      let activeLipDirective = act.lipSyncDirective || 'Direct on-camera speech with natural mouth visemes and synchronized lips.';

      if (charCount >= 2) {
        activeSpeaker = `${actorName} & ${actor2Name}`;
        activeVoice = `${actorName} (${voiceProfile}) | ${actor2Name} (${voiceProfile2 || voiceProfile})`;
      } else {
        activeSpeaker = actorName;
        activeVoice = voiceProfile;
      }

      let dynamicSubjectAction = replaceTokensAndNames(act.subjectAction);
      let dynamicLipDirective = replaceTokensAndNames(activeLipDirective);

      // Generate Performance Beats for the block
      const performanceBeats = this.generatePerformanceBeats(act, blockNum, actorName, actor2Name, charCount, blockCount);

      const blockPayload = {
        block_index: blockNum,
        time_range_global: timeGlobal,
        time_range_relative: '00:00 - 00:10',
        act_title_es: act.titleEs,
        act_title_en: act.titleEn,
        speaker: activeSpeaker,
        shot_type: act.shotType,
        camera_motion: act.cameraMotion,
        subject_action: dynamicSubjectAction,
        lip_sync_directive: dynamicLipDirective,
        dialogue_es: act.dialogueEs || act.voDialogueEs,
        dialogue_en: act.dialogueEn || act.voDialogueEn,
        performance_beats: performanceBeats,
        sfx_foley: act.sfxFoley,
        seed: blockSeed,
        attached_media_directive: attachedMediaDirective,
        continuity_directive: continuityDirective,
        prompt_chunks: {
          chunk_0_3s: replaceTokensAndNames(chunkT1),
          chunk_3_7s: replaceTokensAndNames(chunkT2),
          chunk_7_10s: replaceTokensAndNames(chunkT3)
        }
      };

      const blockPrompt = this.formatSingleBlockPrompt({
        engine: config.engine,
        aspectRatio: config.aspectRatio,
        actorName,
        actor2Name,
        actorRefTag,
        actor2RefTag,
        productRefTag,
        envRefTag,
        aesthetic: camera,
        voiceProfile: activeVoice,
        audioScore,
        audioSfx,
        blockPayload,
        negativePrompt,
        blockNum,
        totalBlocks: blockCount,
        timeGlobal
      });

      const isFirst = blockNum === 1;
      const attachedNotice = isFirst
        ? `[Instrucción Flow: Arrastra solo las imágenes de referencia de los personajes]`
        : `[Instrucción Flow: Arrastra ÚNICAMENTE el fotograma guardado del Bloque ${blockNum - 1}]`;

      const dialogueSpoken = (performanceBeats && performanceBeats.length > 0)
        ? performanceBeats.map(b => `${b.actor} dice en español: "${b.dialogue_es}"`).join(' ')
        : (act.dialogueEs ? `Dice en español: "${act.dialogueEs}"` : '');

      let flowCleanPrompt = '';
      if (isFirst) {
        flowCleanPrompt = `${attachedNotice}\nPlano cinematográfico ${act.shotType}. ${actorName}${charCount >= 2 ? ' y ' + actor2Name : ''} en ${envRefTag}. ${act.promptSegment}. ${dialogueSpoken}. ${camera}. Iluminación de estudio 5600K, 8k fotorrealista. Audio en español con voz nítida y sincronización labial.`;
      } else {
        flowCleanPrompt = `${attachedNotice}\nToma continua iniciando exactamente desde el fotograma adjunto. Mismos personajes ${actorName}${charCount >= 2 ? ' y ' + actor2Name : ''} con la misma ropa en la misma oficina. ${act.cameraMotion}. ${act.subjectAction}. ${dialogueSpoken}. Misma iluminación y atmósfera. Audio en español con voz profesional.`;
      }

      return {
        ...blockPayload,
        flow_clean_prompt: flowCleanPrompt,
        assembled_prompt: blockPrompt
      };
    });

    const masterScript = this.formatFullMasterScript({
      engine: config.engine,
      totalDuration: blockCount * 10,
      totalBlocks: blockCount,
      actorName,
      actor2Name,
      actorRefTag,
      actor2RefTag,
      productRefTag,
      envRefTag,
      camera,
      voiceProfile,
      voiceProfile2,
      audioScore,
      audioSfx,
      sequenceBlocks,
      negativePrompt,
      baseSeed
    });

    const fullPayload = {
      tenant_id: tenantCtx.tenantId,
      sequence_id: sequenceId,
      total_duration_seconds: blockCount * 10,
      total_blocks: blockCount,
      target_engine: config.engine,
      aspect_ratio: config.aspectRatio,
      character_count: charCount,
      reference_sheets: {
        hr_personaje_1: {
          name: actorName,
          mode: actorMode,
          reference: actorRefTag,
          image_file: actorImg,
          voice_talent: voiceProfile
        },
        hr_personaje_2: charCount >= 2 ? {
          name: actor2Name,
          mode: actor2Mode,
          reference: actor2RefTag,
          image_file: actor2Img,
          voice_talent: voiceProfile2
        } : null,
        hr_producto: {
          mode: productMode,
          reference: productRefTag,
          image_file: productImg
        },
        hr_escenario: {
          mode: envMode,
          reference: envRefTag,
          image_file: envImg
        },
        cinematography_rig: camera,
        score_bgm: audioScore,
        sfx_foley_style: audioSfx,
        base_seed: baseSeed
      },
      negative_prompt: negativePrompt,
      sequence_blocks: sequenceBlocks
    };

    if (this.logger) {
      this.logger.log('creativo', `Generada producción audiovisual de ${blockCount * 10}s (${blockCount} bloques) para [${config.engine}] con Diálogo Cruzado Multi-Actor y Cero Actores Pasivos bajo Tenant [${tenantCtx.tenantId}]`, 'success');
    }

    return {
      payload: fullPayload,
      masterScript,
      sequenceBlocks
    };
  }

  generatePerformanceBeats(act, blockNum, actorName, actor2Name, charCount, totalBlocks) {
    if (charCount >= 2) {
      const isOdd = blockNum % 2 === 1;
      const firstActor = isOdd ? actorName : actor2Name;
      const secondActor = isOdd ? actor2Name : actorName;

      let dia1 = '';
      let dia2 = '';

      if (act && act.dialogueEs) {
        const parts = act.dialogueEs.split(/[.¡!¿?]/).map(s => s.trim()).filter(s => s.length > 0);
        if (parts.length >= 2) {
          dia1 = parts[0] + '.';
          dia2 = parts.slice(1).join('. ') + '.';
        } else {
          dia1 = act.dialogueEs;
          dia2 = `¡Totalmente de acuerdo! Cuidamos cada detalle para tu máxima satisfacción.`;
        }
      } else {
        dia1 = `¡Bienvenidos! Presentamos la más alta calidad en cada detalle.`;
        dia2 = `Innovación y diseño personalizado para superar todas tus expectativas.`;
      }

      const beat1 = {
        beat_index: 1,
        actor: firstActor,
        dialogue_es: dia1,
        emotion: isOdd ? 'entusiasmo contagioso y calidez' : 'convicción profesional y fascinación',
        physical_action: isOdd 
          ? 'gesticula cálidamente hacia el producto y sostiene el contacto visual con la cámara'
          : 'muestra el detalle del producto con elegancia y complementa la escena',
        eyeline_direction: `mira con seguridad a cámara y conecta visualmente con ${secondActor} con una sonrisa`,
        listener_reaction: `${secondActor} escucha con atención activa, asiente aprobando y reacciona con una sonrisa cómplice`,
        estimated_duration_seconds: 5.0
      };

      const beat2 = {
        beat_index: 2,
        actor: secondActor,
        dialogue_es: dia2,
        emotion: isOdd ? 'seguridad ejecutiva y orgullo' : 'pasión culinaria y calidez',
        physical_action: isOdd
          ? 'da un paso adelante, señala el acabado artesanal y complementa la explicación'
          : 'coloca delicadamente el toque final y muestra el resultado con satisfacción',
        eyeline_direction: `contacto visual directo con la cámara tras mirar con aprobación a ${firstActor}`,
        listener_reaction: `${firstActor} sonríe con complicidad, asiente suavemente y participa activamente en la escena`,
        estimated_duration_seconds: 5.0
      };

      return [beat1, beat2];
    } else {
      const beat1 = {
        beat_index: 1,
        actor: actorName,
        dialogue_es: act && act.dialogueEs ? act.dialogueEs : '¡Bienvenidos a nuestra presentación exclusiva!',
        emotion: 'entusiasmo contagioso y visión estratégica',
        physical_action: 'inicia la presentación con dinamismo, gesticulando hacia la pantalla y mirando a cámara',
        eyeline_direction: 'contacto visual firme y acogedor hacia la lente',
        listener_reaction: 'audiencia virtual cautivada por la claridad y precisión de la demostración',
        estimated_duration_seconds: 5.0
      };

      const beat2 = {
        beat_index: 2,
        actor: actorName,
        dialogue_es: 'Descubre cómo transformar tus resultados hoy mismo.',
        emotion: 'seguridad, convicción y cercanía',
        physical_action: 'hace un gesto de bienvenida y cierra con una sonrisa inspiradora',
        eyeline_direction: 'mirada directa al lente con expresión radiante',
        listener_reaction: 'entorno del set resalta con iluminación cinematográfica y confirmación visual',
        estimated_duration_seconds: 5.0
      };

      return [beat1, beat2];
    }
  }

  distributeActs(actsCatalog, count) {
    if (count <= 1) return [actsCatalog[0]];
    if (count >= actsCatalog.length) {
      return actsCatalog.slice(0, count);
    }
    const result = [];
    const step = (actsCatalog.length - 1) / (count - 1);
    for (let i = 0; i < count; i++) {
      const idx = Math.round(i * step);
      result.push(actsCatalog[idx]);
    }
    return result;
  }

  formatSeconds(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  formatSingleBlockPrompt({ engine, aspectRatio, actorName, actor2Name, actorRefTag, actor2RefTag, productRefTag, envRefTag, aesthetic, voiceProfile, audioScore, blockPayload, negativePrompt, blockNum, totalBlocks, timeGlobal }) {
    const { continuity_directive, attached_media_directive, prompt_chunks, seed, shot_type, speaker, dialogue_es, lip_sync_directive, sfx_foley, performance_beats } = blockPayload;
    const p1 = prompt_chunks.chunk_0_3s;
    const p2 = prompt_chunks.chunk_3_7s;
    const p3 = prompt_chunks.chunk_7_10s;

    const attachedLine = attached_media_directive ? `• ATTACHED MEDIA INPUTS: ${attached_media_directive}\n` : `• ATTACHED MEDIA INPUTS:\n`;
    const charReferences = actor2RefTag ? `${actorRefTag}\n• CHARACTER REFERENCE 2: ${actor2RefTag}` : actorRefTag;

    const beatsPrompt = (performance_beats || []).map(beat => {
      const timeLabel = beat.beat_index === 1 ? '0.0s - 5.0s' : '5.0s - 10.0s';
      return `  - BEAT ${beat.beat_index} (${timeLabel}, ${beat.estimated_duration_seconds}s) [Actor: ${beat.actor}]:\n` +
             `    * Emotion: ${beat.emotion}\n` +
             `    * Physical Action: ${beat.physical_action}\n` +
             `    * Eyeline: ${beat.eyeline_direction}\n` +
             `    * Spoken Dialogue (ES Lip-Sync): "${beat.dialogue_es}"\n` +
             `    * Co-Star Listener Reaction: ${beat.listener_reaction}`;
    }).join('\n');

    switch (engine) {
      case 'google-flow':
        return `[Google Labs Flow / Google Veo 2 - Block ${blockNum}/${totalBlocks} (${timeGlobal})]\n` +
          attachedLine +
          `• CHARACTER REFERENCE 1: ${charReferences}\n` +
          `• PRODUCT REFERENCE: ${productRefTag}\n` +
          `• SCENE & LIGHTING: ${envRefTag}\n` +
          `• CINEMATOGRAPHY: [Shot: ${shot_type}] | ${aesthetic}\n` +
          `• CONTINUITY DIRECTIVE: ${continuity_directive}\n` +
          `• TEMPORAL TIMELINE:\n` +
          `  - (00:00 - 00:03): ${p1}\n` +
          `  - (00:03 - 00:07): ${p2}\n` +
          `  - (00:07 - 00:10): ${p3}\n` +
          `• MULTI-ACTOR PERFORMANCE & BEAT-BY-BEAT ACTING DIRECTIVES:\n` +
          `${beatsPrompt}\n` +
          `• MANDATORY PERFORMANCE & REAL-TIME INTERACTION RULES:\n` +
          `  - Bi-directional active engagement: continuous eye contact, mutual micro-expressions, active listening, subtle head nods, organic breathing, and contextual physical reactions.\n` +
          `  - STRICT PROHIBITIONS: STRICTLY NO voice-over, NO off-screen dialogue, NO frozen actors, NO static mannequin poses, NO inactive co-stars, NO blank stares.\n` +
          `  - All dialogue MUST be delivered visibly on-camera with synchronized lip-sync in Spanish.\n` +
          `  - When one character speaks, the co-star visibly reacts and interacts physically in real-time.\n` +
          `• SOUND DESIGN (SFX & SCORE):\n` +
          `  - SFX / Foley: ${sfx_foley}\n` +
          `  - Score / BGM: ${audioScore}\n` +
          `• CONSTRAINTS: Negative: ${negativePrompt} | Ratio: ${aspectRatio} | Seed: ${seed}`;

      case 'runway-gen3':
        return `[Runway Gen-3 Alpha Prompt - Block ${blockNum}/${totalBlocks} (${timeGlobal})]\n` +
          `${attached_media_directive}\n` +
          `${continuity_directive}\n` +
          `Shot: ${shot_type}. Characters: ${actorRefTag}${actor2RefTag ? ' + ' + actor2RefTag : ''}. Product: ${productRefTag}. Environment: ${envRefTag}. Rig: ${aesthetic}\n` +
          `Timeline: 0-3s: ${p1} | 3-7s: ${p2} | 7-10s: ${p3}\n` +
          `Multi-Beat Acting: ${beatsPrompt}\n` +
          `Rules: On-camera visible lip-sync only. Strictly NO voice-over, NO frozen actors. Real-time listener reaction and active engagement.\n` +
          `SFX: ${sfx_foley} | BGM: ${audioScore}\n` +
          `Negative: ${negativePrompt} --ar ${aspectRatio} --seed ${seed}`;

      case 'kling-1.5':
        return `Cinematic 10s Sequence [Block ${blockNum}/${totalBlocks} | ${timeGlobal}]. ` +
          `${attached_media_directive}. ${continuity_directive} Shot: ${shot_type}. Characters: ${actorRefTag}${actor2RefTag ? ' + ' + actor2RefTag : ''}. Product: ${productRefTag}. Scene: ${envRefTag}. ` +
          `[0-3s]: ${p1}. [3-7s]: ${p2}. [7-10s]: ${p3}. ` +
          `Performance Beats: [${beatsPrompt}]. Rules: On-camera dialogue ONLY (no voice-over), continuous eye-contact, natural reactions. SFX: ${sfx_foley}. Score: ${audioScore}. ` +
          `${aesthetic} --neg ${negativePrompt} --ar ${aspectRatio} --seed ${seed}`;

      case 'sora':
        return `Cinematic Master Shot [Block ${blockNum}/${totalBlocks} | Timeline ${timeGlobal}] on ${aesthetic}. ` +
          `Framing: ${shot_type}. ${attached_media_directive} ${continuity_directive} ` +
          `Characters: ${actorRefTag}${actor2RefTag ? ' & ' + actor2RefTag : ''} | Product: ${productRefTag} | Scene: ${envRefTag}. ` +
          `Timeline: (0-3s) ${p1}, (3-7s) ${p2}, (7-10s) ${p3}. ` +
          `Multi-actor performance beats: ${beatsPrompt}. Rules: Bi-directional eye contact, active co-star reactions, realistic lip movements on camera without voice-over. Voice: ${voiceProfile}. Score: ${audioScore}.`;

      case 'luma':
      default:
        return `10s Master Clip [Block ${blockNum}/${totalBlocks} | ${timeGlobal}]. ` +
          `Shot: ${shot_type}. ${attached_media_directive} ${continuity_directive} ` +
          `Characters: ${actorRefTag}${actor2RefTag ? ' & ' + actor2RefTag : ''} with ${productRefTag} in ${envRefTag}. ` +
          `0-3s: ${p1} | 3-7s: ${p2} | 7-10s: ${p3}. Performance Beats: [${beatsPrompt}]. Rules: On-camera dialogue with visible lip-sync and co-star active listening. No voice-over. --aspect ${aspectRatio} --seed ${seed}`;
    }
  }

  formatFullMasterScript({ engine, totalDuration, totalBlocks, actorName, actor2Name, actorRefTag, actor2RefTag, productRefTag, envRefTag, camera, voiceProfile, voiceProfile2, audioScore, audioSfx, sequenceBlocks, negativePrompt, baseSeed }) {
    let script = `================================================================================\n`;
    script += `🎬 LOOPGRAVITY MASTER AUDIOVISUAL PRODUCTION SCRIPT (GOOGLE FLOW / VEO 2)\n`;
    script += `⏱️ Duración Total: ${totalDuration}s | ${totalBlocks} Bloques de 10s | Diálogos con Lip-Sync & Video Previo\n`;
    script += `================================================================================\n\n`;

    script += `📋 [HOJAS DE REFERENCIA DE PRODUCCIÓN - HR SHEETS]\n`;
    script += `• 👤 HR-Personaje 1 (${actorName}): ${actorRefTag}\n`;
    script += `  - Perfil de Voz & Tono: ${voiceProfile}\n`;
    if (actor2RefTag) {
      script += `• 👥 HR-Personaje 2 (${actor2Name}): ${actor2RefTag}\n`;
      script += `  - Perfil de Voz & Tono: ${voiceProfile2 || voiceProfile}\n`;
    }
    script += `• 💎 HR-Producto: ${productRefTag}\n`;
    script += `• 🏢 HR-Escenario: ${envRefTag}\n`;
    script += `• 🎥 Cinematografía & Rig: ${camera}\n`;
    script += `• 🎧 Sound Design: Score "${audioScore}" | Foley "${audioSfx}"\n`;
    script += `• Master Seed Base: ${baseSeed} | Negative: ${negativePrompt}\n\n`;

    sequenceBlocks.forEach((b) => {
      script += `--------------------------------------------------------------------------------\n`;
      script += `▶ BLOQUE ${b.block_index}/${totalBlocks} [${b.time_range_global}] - ${b.act_title_es}\n`;
      script += `  📹 Toma: ${b.shot_type}\n`;
      script += `  🗣️ Habla en Cámara (${b.speaker}): "${b.dialogue_es}"\n`;
      script += `  📎 Instrucción Flow: ${b.attached_media_directive}\n`;
      script += `--------------------------------------------------------------------------------\n`;
      script += `${b.assembled_prompt}\n\n`;
    });

    script += `================================================================================\n`;
    script += `✓ FIN DEL SCRIPT MAESTRO - LISTO PARA GENERAR SECUENCIALMENTE EN GOOGLE FLOW\n`;
    script += `================================================================================`;

    return script;
  }

  formatAudioScript({ totalDuration, totalBlocks, voiceProfile, audioScore, sequenceBlocks }) {
    let script = `================================================================================\n`;
    script += `🎙️ LOOPGRAVITY AUDIO & VOICE-OVER (VO) PRODUCTION SCRIPT\n`;
    script += `⏱️ Total Duration: ${totalDuration}s | ${totalBlocks} Chained Acts\n`;
    script += `🎧 Voice Profile: ${voiceProfile}\n`;
    script += `🎵 Master Music Score (BGM): ${audioScore}\n`;
    script += `================================================================================\n\n`;

    sequenceBlocks.forEach((b) => {
      script += `--------------------------------------------------------------------------------\n`;
      script += `[TIMECODE ${b.time_range_global}] - ACTO ${b.block_index}: ${b.act_title_es.toUpperCase()}\n`;
      script += `--------------------------------------------------------------------------------\n`;
      script += `🗣️ DIÁLOGO / VO (ES): "${b.vo_dialogue_es}"\n`;
      script += `🗣️ DIALOGUE / VO (EN): "${b.vo_dialogue_en}"\n`;
      script += `🔊 SFX & FOLEY: ${b.sfx_foley}\n`;
      script += `🎬 ACCIÓN EN PANTALLA: ${b.subject_action}\n\n`;
    });

    script += `================================================================================\n`;
    script += `✓ AUDIO SCRIPT READY FOR VOICEOVER TALENT, SOUND DESIGNERS & COMPOSERS\n`;
    script += `================================================================================`;

    return script;
  }
}

// --- 6. Antigravity Exporter ---
class AntigravityExporter {
  static exportStructure(lang = 'es') {
    const structure = {
      project: 'LoopGravity Generated Workspace',
      version: '1.0.0',
      antigravity_config: {
        skills_path: '.agents/skills/',
        rules_path: '.agents/rules/AGENTS.md',
        mcp_config: 'mcp_config.json'
      },
      squad: [
        'director',
        'investigador',
        'branding',
        'creativo',
        'web',
        'app-developer',
        'auditor'
      ],
      exported_at: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(structure, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'antigravity-loop-squad.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast(I18N[lang].toast_exported);
  }
}

// --- 7. UI Helpers, Language Manager & Init ---
let currentLang = 'es';

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

function setLanguage(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  localStorage.setItem('loopgravity_lang', lang);

  // Update active state in buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Apply translations to all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang][key]) {
      el.innerHTML = I18N[lang][key];
    }
  });

  // Update placeholders
  const specInput = document.getElementById('loop-spec-input');
  if (specInput && I18N[lang].spec_placeholder) {
    specInput.placeholder = I18N[lang].spec_placeholder;
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
  const tenantService = new TenantService();
  const storageService = new StorageService();
  const catalogService = new AssetCatalogService(storageService);
  const logger = new TelemetryLogger('console-logs');
  const engine = new LoopExecutionEngine(tenantService, logger);
  const videoService = new VideoPromptService(tenantService, logger);

  // Restore saved language or default to 'es'
  const savedLang = localStorage.getItem('loopgravity_lang') || 'es';
  setLanguage(savedLang);

  // Language switcher event listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // --- Project Persistence Elements (Fase 1 PMV) ---
  const projectSavedSelect = document.getElementById('project-saved-select');
  const projectNameInput = document.getElementById('project-name-input');
  const btnSaveProject = document.getElementById('btn-save-project');
  const btnNewProject = document.getElementById('btn-new-project');
  const btnDeleteProject = document.getElementById('btn-delete-project');
  const projectStatusBadge = document.getElementById('project-status-badge');

  // --- Catalog Quick-Picker Elements (Fase 2 PMV) ---
  const catalogSelectActor1 = document.getElementById('catalog-select-actor1');
  const btnSaveActor1 = document.getElementById('btn-save-actor1-to-catalog');
  const catalogSelectActor2 = document.getElementById('catalog-select-actor2');
  const btnSaveActor2 = document.getElementById('btn-save-actor2-to-catalog');
  const catalogSelectProduct = document.getElementById('catalog-select-product');
  const btnSaveProduct = document.getElementById('btn-save-product-to-catalog');
  const catalogSelectEnv = document.getElementById('catalog-select-env');
  const btnSaveEnv = document.getElementById('btn-save-env-to-catalog');

  // --- Catalog Modal Elements ---
  const btnOpenCatalogModal = document.getElementById('btn-open-catalog-modal');
  const btnCloseCatalogModal = document.getElementById('btn-close-catalog-modal');
  const modalAssetCatalog = document.getElementById('modal-asset-catalog');
  const modalTenantLabel = document.getElementById('modal-tenant-label');
  const catalogModalItemsContainer = document.getElementById('catalog-modal-items-container');
  let currentModalTab = 'actors';

  // Tenant switcher listener
  const tenantSelect = document.getElementById('tenant-select');
  if (tenantSelect) {
    tenantSelect.addEventListener('change', (e) => {
      const newTenantId = e.target.value;
      tenantService.setTenant(newTenantId);
      refreshProjectsList();
      refreshCatalogSelectors();
      loadWorkspaceForActiveTenant();
      showToast(`${I18N[currentLang].toast_tenant} ${newTenantId}`);
    });
  }

  // Run Loop Button listener
  const btnRunLoop = document.getElementById('btn-run-loop');
  if (btnRunLoop) {
    btnRunLoop.addEventListener('click', () => {
      engine.resetStages();
      const specInput = document.getElementById('loop-spec-input');
      const specTitle = specInput && specInput.value.trim() 
        ? specInput.value.trim() 
        : (currentLang === 'es' ? 'CRM para agencias con gestión de leads' : 'Agency CRM with lead management');
      engine.runFullLoop({ title: specTitle }, currentLang);
    });
  }

  // Export Blueprint Button listeners
  document.querySelectorAll('.btn-export-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      AntigravityExporter.exportStructure(currentLang);
    });
  });

  // --- HR Sheets Sub-Tabs Navigation ---
  const hrTabButtons = document.querySelectorAll('.hr-tab-btn');
  hrTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-hrtab');
      hrTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.hr-tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `hr-content-${targetTab}`);
      });
    });
  });

  // --- Video Studio Controls & Listeners (Idea to Screenplay + HR Sheets Multi-Character & Lip-Sync) ---
  const ideaInput = document.getElementById('video-idea-input');
  const btnGenScreenplay = document.getElementById('btn-generate-screenplay');
  const loglineText = document.getElementById('screenplay-logline-text');
  const actsCountText = document.getElementById('screenplay-acts-count');
  const voPreviewText = document.getElementById('screenplay-vo-preview');

  const blocksSelect = document.getElementById('video-blocks-select');
  const presetSelect = document.getElementById('video-preset-select');
  const charCountSelect = document.getElementById('video-character-count');
  const engineSelect = document.getElementById('video-engine-select');
  const ratioSelect = document.getElementById('video-ratio-select');

  // Dual mode options: Actor 1
  const optActorImg = document.getElementById('opt-actor-img');
  const optActorTxt = document.getElementById('opt-actor-txt');
  const boxActorImg = document.getElementById('box-actor-image-field');
  const boxActorTxt = document.getElementById('box-actor-text-field');

  // Dual mode options: Actor 2
  const optActor2Img = document.getElementById('opt-actor2-img');
  const optActor2Txt = document.getElementById('opt-actor2-txt');
  const boxActor2Img = document.getElementById('box-actor2-image-field');
  const boxActor2Txt = document.getElementById('box-actor2-text-field');
  const tabBtnActor2 = document.getElementById('tab-btn-actor2');

  const optProductImg = document.getElementById('opt-product-img');
  const optProductTxt = document.getElementById('opt-product-txt');
  const boxProductImg = document.getElementById('box-product-image-field');
  const boxProductTxt = document.getElementById('box-product-text-field');

  const optEnvImg = document.getElementById('opt-env-img');
  const optEnvTxt = document.getElementById('opt-env-txt');
  const boxEnvImg = document.getElementById('box-env-image-field');
  const boxEnvTxt = document.getElementById('box-env-text-field');

  let hrActorMode = 'image';
  let hrActor2Mode = 'image';
  let hrProductMode = 'image';
  let hrEnvMode = 'image';

  function setupDualModeToggle(optImg, optTxt, boxImg, boxTxt, onModeChange) {
    if (optImg && optTxt) {
      optImg.addEventListener('click', () => {
        optImg.classList.add('selected');
        optTxt.classList.remove('selected');
        if (boxImg) boxImg.style.display = 'block';
        if (boxTxt) boxTxt.style.display = 'none';
        onModeChange('image');
        triggerAutoSave();
        executeGeneration();
      });
      optTxt.addEventListener('click', () => {
        optTxt.classList.add('selected');
        optImg.classList.remove('selected');
        if (boxImg) boxImg.style.display = 'none';
        if (boxTxt) boxTxt.style.display = 'block';
        onModeChange('text');
        triggerAutoSave();
        executeGeneration();
      });
    }
  }

  setupDualModeToggle(optActorImg, optActorTxt, boxActorImg, boxActorTxt, (mode) => { hrActorMode = mode; });
  setupDualModeToggle(optActor2Img, optActor2Txt, boxActor2Img, boxActor2Txt, (mode) => { hrActor2Mode = mode; });
  setupDualModeToggle(optProductImg, optProductTxt, boxProductImg, boxProductTxt, (mode) => { hrProductMode = mode; });
  setupDualModeToggle(optEnvImg, optEnvTxt, boxEnvImg, boxEnvTxt, (mode) => { hrEnvMode = mode; });

  const actorNameInput = document.getElementById('video-actor-name');
  const actorImgInput = document.getElementById('video-actor-image-url');
  const actorInput = document.getElementById('video-actor-input');
  const actorVoiceInput = document.getElementById('video-actor-voice');

  const actor2NameInput = document.getElementById('video-actor2-name');
  const actor2ImgInput = document.getElementById('video-actor2-image-url');
  const actor2Input = document.getElementById('video-actor2-input');
  const actor2VoiceInput = document.getElementById('video-actor2-voice');

  const productImgInput = document.getElementById('video-product-image-url');
  const productInput = document.getElementById('video-product-input');
  const envImgInput = document.getElementById('video-env-image-url');
  const envInput = document.getElementById('video-env-input');
  const cameraInput = document.getElementById('video-camera-input');
  const audioBgmInput = document.getElementById('video-audio-bgm');
  const audioSfxInput = document.getElementById('video-audio-sfx');

  const btnPreviewActor = document.getElementById('btn-preview-actor-img');
  const btnPreviewActor2 = document.getElementById('btn-preview-actor2-img');
  const btnPreviewProduct = document.getElementById('btn-preview-product-img');

  const btnGenVideo = document.getElementById('btn-generate-video');
  const btnCopyAllPrompts = document.getElementById('btn-copy-all-prompts');
  const btnCopyCurrentPrompt = document.getElementById('btn-copy-current-prompt');
  const btnCopyJson = document.getElementById('btn-copy-json');
  const promptOutput = document.getElementById('video-prompt-output');
  const jsonOutput = document.getElementById('video-json-output');
  const timelineContainer = document.getElementById('video-timeline-display');
  const tabsContainer = document.getElementById('video-blocks-tabs');

  let currentSequenceResult = null;
  let activeTabKey = 'master'; // 'master' or block index number (1..10)

  function updateImagePreview(boxId, url, placeholder) {
    const box = document.getElementById(boxId);
    if (!box) return;
    if (url && (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/'))) {
      box.innerHTML = `<img src="${url}" alt="Model Sheet Preview" onerror="this.parentElement.innerHTML='<span style=\\'font-size:11px;color:var(--color-accent-cyan)\\'>✓ Imagen Adjunta: ${url}</span>'">`;
    } else if (url && (url.endsWith('.png') || url.endsWith('.jpg') || url.includes('.png') || url.includes('.jpg'))) {
      box.innerHTML = `<span style="font-size: 11px; color: var(--color-accent-cyan); font-weight: 600;">📎 Archivo Adjunto en Flow: ${url}</span>`;
    } else if (url && url.trim().length > 0) {
      box.innerHTML = `<span style="font-size: 11px; color: var(--color-accent-cyan); font-weight: 600;">📎 Archivo / Referencia: ${url}</span>`;
    } else {
      box.innerHTML = `<span style="font-size: 11px; color: var(--text-muted);">${placeholder}</span>`;
    }
  }

  function getFormState() {
    return {
      projectName: projectNameInput ? projectNameInput.value.trim() : 'Proyecto LoopGravity',
      idea: ideaInput ? ideaInput.value.trim() : '',
      presetKey: presetSelect ? presetSelect.value : 'cake_studio',
      blocks: blocksSelect ? blocksSelect.value : '4',
      characterCount: charCountSelect ? charCountSelect.value : '2',
      engine: engineSelect ? engineSelect.value : 'google-flow',
      ratio: ratioSelect ? ratioSelect.value : '16:9',
      hrActorMode,
      actorName: actorNameInput ? actorNameInput.value.trim() : '',
      actorImg: actorImgInput ? actorImgInput.value.trim() : '',
      actorText: actorInput ? actorInput.value.trim() : '',
      actorVoice: actorVoiceInput ? actorVoiceInput.value.trim() : '',
      hrActor2Mode,
      actor2Name: actor2NameInput ? actor2NameInput.value.trim() : '',
      actor2Img: actor2ImgInput ? actor2ImgInput.value.trim() : '',
      actor2Text: actor2Input ? actor2Input.value.trim() : '',
      actor2Voice: actor2VoiceInput ? actor2VoiceInput.value.trim() : '',
      hrProductMode,
      productImg: productImgInput ? productImgInput.value.trim() : '',
      productText: productInput ? productInput.value.trim() : '',
      hrEnvMode,
      envImg: envImgInput ? envImgInput.value.trim() : '',
      envText: envInput ? envInput.value.trim() : '',
      camera: cameraInput ? cameraInput.value.trim() : '',
      audioBgm: audioBgmInput ? audioBgmInput.value.trim() : '',
      audioSfx: audioSfxInput ? audioSfxInput.value.trim() : ''
    };
  }

  function applyFormState(state) {
    if (!state) return;
    if (state.projectName && projectNameInput) projectNameInput.value = state.projectName;
    if (state.idea !== undefined && ideaInput) ideaInput.value = state.idea;
    if (state.presetKey && presetSelect) presetSelect.value = state.presetKey;
    if (state.blocks && blocksSelect) blocksSelect.value = state.blocks;
    if (state.characterCount && charCountSelect) charCountSelect.value = state.characterCount;
    if (state.engine && engineSelect) engineSelect.value = state.engine;
    if (state.ratio && ratioSelect) ratioSelect.value = state.ratio;

    if (state.actorName !== undefined && actorNameInput) actorNameInput.value = state.actorName;
    if (state.actorImg !== undefined && actorImgInput) actorImgInput.value = state.actorImg;
    if (state.actorText !== undefined && actorInput) actorInput.value = state.actorText;
    if (state.actorVoice !== undefined && actorVoiceInput) actorVoiceInput.value = state.actorVoice;

    if (state.actor2Name !== undefined && actor2NameInput) actor2NameInput.value = state.actor2Name;
    if (state.actor2Img !== undefined && actor2ImgInput) actor2ImgInput.value = state.actor2Img;
    if (state.actor2Text !== undefined && actor2Input) actor2Input.value = state.actor2Text;
    if (state.actor2Voice !== undefined && actor2VoiceInput) actor2VoiceInput.value = state.actor2Voice;

    if (state.productImg !== undefined && productImgInput) productImgInput.value = state.productImg;
    if (state.productText !== undefined && productInput) productInput.value = state.productText;
    if (state.envImg !== undefined && envImgInput) envImgInput.value = state.envImg;
    if (state.envText !== undefined && envInput) envInput.value = state.envText;

    if (state.camera !== undefined && cameraInput) cameraInput.value = state.camera;
    if (state.audioBgm !== undefined && audioBgmInput) audioBgmInput.value = state.audioBgm;
    if (state.audioSfx !== undefined && audioSfxInput) audioSfxInput.value = state.audioSfx;

    const charCount = parseInt(state.characterCount || '2', 10);
    if (tabBtnActor2) tabBtnActor2.style.display = charCount >= 2 ? 'inline-block' : 'none';

    updateImagePreview('actor-image-preview-box', state.actorImg, 'Model Sheet Personaje 1');
    updateImagePreview('actor2-image-preview-box', state.actor2Img, 'Model Sheet Personaje 2');
    updateImagePreview('product-image-preview-box', state.productImg, 'Orthographic Views Sheet');
  }

  function triggerAutoSave() {
    const tenantId = tenantService.currentTenantId;
    const state = getFormState();
    storageService.saveWorkspace(tenantId, state);
    if (projectStatusBadge) {
      projectStatusBadge.innerText = `⚡ Guardado [${tenantId}]`;
    }
  }

  // --- Project Persistence Handlers (Fase 1) ---
  function refreshProjectsList() {
    if (!projectSavedSelect) return;
    const tenantId = tenantService.currentTenantId;
    const projects = storageService.getProjects(tenantId);
    
    let html = '<option value="">(Borrador actual / Sin guardar)</option>';
    projects.forEach(p => {
      html += `<option value="${p.id}">${p.name} (${new Date(p.updatedAt).toLocaleTimeString()})</option>`;
    });
    projectSavedSelect.innerHTML = html;
  }

  function loadWorkspaceForActiveTenant() {
    const tenantId = tenantService.currentTenantId;
    const saved = storageService.loadWorkspace(tenantId);
    if (saved) {
      applyFormState(saved);
    } else if (presetSelect) {
      loadPresetIntoInputs(presetSelect.value || 'cake_studio');
    }
    executeGeneration();
  }

  if (btnSaveProject) {
    btnSaveProject.addEventListener('click', () => {
      const tenantId = tenantService.currentTenantId;
      const name = projectNameInput && projectNameInput.value.trim() ? projectNameInput.value.trim() : 'Proyecto LoopGravity';
      const formState = getFormState();
      const currentSelectedId = projectSavedSelect ? projectSavedSelect.value : '';

      const saved = storageService.saveProject(tenantId, {
        id: currentSelectedId || undefined,
        name,
        state: formState
      });

      refreshProjectsList();
      if (projectSavedSelect) projectSavedSelect.value = saved.id;
      showToast(currentLang === 'es' ? `✓ Proyecto "${saved.name}" guardado con éxito.` : `✓ Project "${saved.name}" successfully saved.`);
    });
  }

  if (projectSavedSelect) {
    projectSavedSelect.addEventListener('change', (e) => {
      const projectId = e.target.value;
      if (!projectId) return;
      const tenantId = tenantService.currentTenantId;
      const projects = storageService.getProjects(tenantId);
      const proj = projects.find(p => p.id === projectId);
      if (proj && proj.state) {
        applyFormState(proj.state);
        executeGeneration();
        triggerAutoSave();
        showToast(currentLang === 'es' ? `✓ Proyecto "${proj.name}" cargado.` : `✓ Project "${proj.name}" loaded.`);
      }
    });
  }

  if (btnNewProject) {
    btnNewProject.addEventListener('click', () => {
      if (projectSavedSelect) projectSavedSelect.value = '';
      if (projectNameInput) projectNameInput.value = `Nuevo Proyecto ${new Date().toLocaleTimeString()}`;
      if (presetSelect) loadPresetIntoInputs(presetSelect.value || 'cake_studio');
      executeGeneration();
      triggerAutoSave();
      showToast(currentLang === 'es' ? '✓ Nuevo borrador de proyecto creado.' : '✓ New draft project created.');
    });
  }

  if (btnDeleteProject) {
    btnDeleteProject.addEventListener('click', () => {
      const tenantId = tenantService.currentTenantId;
      const projectId = projectSavedSelect ? projectSavedSelect.value : '';
      if (!projectId) {
        showToast(currentLang === 'es' ? 'Selecciona un proyecto guardado para eliminar.' : 'Select a saved project to delete.');
        return;
      }
      storageService.deleteProject(tenantId, projectId);
      refreshProjectsList();
      showToast(currentLang === 'es' ? '✓ Proyecto eliminado.' : '✓ Project deleted.');
    });
  }

  // --- Catalog Quick-Pickers (Fase 2) ---
  function refreshCatalogSelectors() {
    const tenantId = tenantService.currentTenantId;
    const actors = catalogService.getItems(tenantId, 'actors');
    const products = catalogService.getItems(tenantId, 'products');
    const envs = catalogService.getItems(tenantId, 'environments');

    if (catalogSelectActor1) {
      catalogSelectActor1.innerHTML = '<option value="">⭐ Cargar Actor de Catálogo...</option>' +
        actors.map(a => `<option value="${a.id}">${a.name} (${a.role || 'Actor'})</option>`).join('');
    }
    if (catalogSelectActor2) {
      catalogSelectActor2.innerHTML = '<option value="">⭐ Cargar Actor de Catálogo...</option>' +
        actors.map(a => `<option value="${a.id}">${a.name} (${a.role || 'Actor'})</option>`).join('');
    }
    if (catalogSelectProduct) {
      catalogSelectProduct.innerHTML = '<option value="">⭐ Cargar Producto de Catálogo...</option>' +
        products.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    }
    if (catalogSelectEnv) {
      catalogSelectEnv.innerHTML = '<option value="">⭐ Cargar Escenario de Catálogo...</option>' +
        envs.map(e => `<option value="${e.id}">${e.name} (${e.mood || 'Set'})</option>`).join('');
    }
  }

  if (catalogSelectActor1) {
    catalogSelectActor1.addEventListener('change', (e) => {
      const actorId = e.target.value;
      if (!actorId) return;
      const tenantId = tenantService.currentTenantId;
      const actor = catalogService.getItemById(tenantId, 'actors', actorId);
      if (actor) {
        if (actorNameInput) actorNameInput.value = actor.name;
        if (actorImgInput) actorImgInput.value = actor.imageUrl || '';
        if (actorInput) actorInput.value = `[HR_PERSONAJE_${actor.name.toUpperCase().replace(/\\s+/g, '_')}]: ${actor.description}`;
        if (actorVoiceInput) actorVoiceInput.value = actor.voiceProfile || '';
        updateImagePreview('actor-image-preview-box', actor.imageUrl, 'Model Sheet Personaje 1');
        executeGeneration();
        triggerAutoSave();
        showToast(`✓ Actor "${actor.name}" cargado a Personaje 1.`);
      }
    });
  }

  if (catalogSelectActor2) {
    catalogSelectActor2.addEventListener('change', (e) => {
      const actorId = e.target.value;
      if (!actorId) return;
      const tenantId = tenantService.currentTenantId;
      const actor = catalogService.getItemById(tenantId, 'actors', actorId);
      if (actor) {
        if (actor2NameInput) actor2NameInput.value = actor.name;
        if (actor2ImgInput) actor2ImgInput.value = actor.imageUrl || '';
        if (actor2Input) actor2Input.value = `[HR_PERSONAJE_${actor.name.toUpperCase().replace(/\\s+/g, '_')}]: ${actor.description}`;
        if (actor2VoiceInput) actor2VoiceInput.value = actor.voiceProfile || '';
        updateImagePreview('actor2-image-preview-box', actor.imageUrl, 'Model Sheet Personaje 2');
        executeGeneration();
        triggerAutoSave();
        showToast(`✓ Actor "${actor.name}" cargado a Personaje 2.`);
      }
    });
  }

  if (catalogSelectProduct) {
    catalogSelectProduct.addEventListener('change', (e) => {
      const prodId = e.target.value;
      if (!prodId) return;
      const tenantId = tenantService.currentTenantId;
      const prod = catalogService.getItemById(tenantId, 'products', prodId);
      if (prod) {
        if (productImgInput) productImgInput.value = prod.imageUrl || '';
        if (productInput) productInput.value = `[HR_PRODUCTO_${prod.name.toUpperCase().replace(/\\s+/g, '_')}]: ${prod.description}`;
        updateImagePreview('product-image-preview-box', prod.imageUrl, 'Orthographic Views Sheet');
        executeGeneration();
        triggerAutoSave();
        showToast(`✓ Producto "${prod.name}" cargado desde catálogo.`);
      }
    });
  }

  if (catalogSelectEnv) {
    catalogSelectEnv.addEventListener('change', (e) => {
      const envId = e.target.value;
      if (!envId) return;
      const tenantId = tenantService.currentTenantId;
      const env = catalogService.getItemById(tenantId, 'environments', envId);
      if (env) {
        if (envImgInput) envImgInput.value = env.imageUrl || '';
        if (envInput) envInput.value = `[HR_ESCENARIO_${env.name.toUpperCase().replace(/\\s+/g, '_')}]: ${env.description}`;
        executeGeneration();
        triggerAutoSave();
        showToast(`✓ Escenario "${env.name}" cargado desde catálogo.`);
      }
    });
  }

  if (btnSaveActor1) {
    btnSaveActor1.addEventListener('click', () => {
      const tenantId = tenantService.currentTenantId;
      const name = actorNameInput ? actorNameInput.value.trim() : 'Actor Guardado';
      const actorItem = {
        name,
        role: 'Protagonista',
        imageUrl: actorImgInput ? actorImgInput.value.trim() : '',
        description: actorInput ? actorInput.value.trim() : '',
        voiceProfile: actorVoiceInput ? actorVoiceInput.value.trim() : ''
      };
      catalogService.saveItem(tenantId, 'actors', actorItem);
      refreshCatalogSelectors();
      showToast(`✓ Actor "${name}" guardado en el Catálogo.`);
    });
  }

  if (btnSaveActor2) {
    btnSaveActor2.addEventListener('click', () => {
      const tenantId = tenantService.currentTenantId;
      const name = actor2NameInput ? actor2NameInput.value.trim() : 'Co-Protagonista Guardado';
      const actorItem = {
        name,
        role: 'Co-Host / Diálogo',
        imageUrl: actor2ImgInput ? actor2ImgInput.value.trim() : '',
        description: actor2Input ? actor2Input.value.trim() : '',
        voiceProfile: actor2VoiceInput ? actor2VoiceInput.value.trim() : ''
      };
      catalogService.saveItem(tenantId, 'actors', actorItem);
      refreshCatalogSelectors();
      showToast(`✓ Actor "${name}" guardado en el Catálogo.`);
    });
  }

  if (btnSaveProduct) {
    btnSaveProduct.addEventListener('click', () => {
      const tenantId = tenantService.currentTenantId;
      const name = prompt('Nombre del Producto en Catálogo:', 'Producto ' + new Date().toLocaleDateString());
      if (!name) return;
      const prodItem = {
        name,
        tagline: 'Item de Catálogo',
        imageUrl: productImgInput ? productImgInput.value.trim() : '',
        description: productInput ? productInput.value.trim() : ''
      };
      catalogService.saveItem(tenantId, 'products', prodItem);
      refreshCatalogSelectors();
      showToast(`✓ Producto "${name}" guardado en Catálogo.`);
    });
  }

  if (btnSaveEnv) {
    btnSaveEnv.addEventListener('click', () => {
      const tenantId = tenantService.currentTenantId;
      const name = prompt('Nombre del Escenario / Set:', 'Set ' + new Date().toLocaleDateString());
      if (!name) return;
      const envItem = {
        name,
        mood: 'Cinematográfico',
        imageUrl: envImgInput ? envImgInput.value.trim() : '',
        description: envInput ? envInput.value.trim() : ''
      };
      catalogService.saveItem(tenantId, 'environments', envItem);
      refreshCatalogSelectors();
      showToast(`✓ Escenario "${name}" guardado en Catálogo.`);
    });
  }

  // --- Asset Catalog Modal UI ---
  function renderCatalogModalItems(category) {
    if (!catalogModalItemsContainer) return;
    const tenantId = tenantService.currentTenantId;
    const items = catalogService.getItems(tenantId, category);

    if (modalTenantLabel) {
      modalTenantLabel.innerText = `Tenant: ${tenantId} | ${items.length} assets disponibles`;
    }

    if (items.length === 0) {
      catalogModalItemsContainer.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 30px;">No hay assets registrados en esta categoría para este tenant.</div>';
      return;
    }

    let html = '<div class="catalog-grid">';
    items.forEach(item => {
      const img = item.imageUrl || 'https://via.placeholder.com/200x120?text=Model+Sheet';
      html += `
        <div class="catalog-item-card">
          <img src="${img}" class="catalog-item-thumb" alt="${item.name}" onerror="this.src='https://via.placeholder.com/200x120?text=Model+Sheet'">
          <div class="catalog-item-name">${item.name}</div>
          <div class="catalog-item-desc">${item.description || item.voiceProfile || item.mood || 'Sin descripción'}</div>
          <div class="catalog-item-actions">
            <button class="btn btn-sm btn-cyan btn-apply-asset" data-cat="${category}" data-id="${item.id}">🎯 Usar</button>
            <button class="btn btn-sm btn-secondary btn-delete-asset" style="color: var(--color-danger);" data-cat="${category}" data-id="${item.id}">🗑️</button>
          </div>
        </div>
      `;
    });
    html += '</div>';
    catalogModalItemsContainer.innerHTML = html;

    // Attach button listeners in modal
    catalogModalItemsContainer.querySelectorAll('.btn-apply-asset').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        const id = btn.getAttribute('data-id');
        const it = catalogService.getItemById(tenantId, cat, id);
        if (it) {
          if (cat === 'actors') {
            if (actorNameInput) actorNameInput.value = it.name;
            if (actorImgInput) actorImgInput.value = it.imageUrl || '';
            if (actorInput) actorInput.value = `[HR_PERSONAJE_${it.name.toUpperCase().replace(/\\s+/g, '_')}]: ${it.description}`;
            if (actorVoiceInput) actorVoiceInput.value = it.voiceProfile || '';
            updateImagePreview('actor-image-preview-box', it.imageUrl, 'Model Sheet Personaje 1');
          } else if (cat === 'products') {
            if (productImgInput) productImgInput.value = it.imageUrl || '';
            if (productInput) productInput.value = `[HR_PRODUCTO_${it.name.toUpperCase().replace(/\\s+/g, '_')}]: ${it.description}`;
            updateImagePreview('product-image-preview-box', it.imageUrl, 'Orthographic Views Sheet');
          } else if (cat === 'environments') {
            if (envImgInput) envImgInput.value = it.imageUrl || '';
            if (envInput) envInput.value = `[HR_ESCENARIO_${it.name.toUpperCase().replace(/\\s+/g, '_')}]: ${it.description}`;
          }
          executeGeneration();
          triggerAutoSave();
          if (modalAssetCatalog) modalAssetCatalog.style.display = 'none';
          showToast(`✓ Asset "${it.name}" cargado a Studio.`);
        }
      });
    });

    catalogModalItemsContainer.querySelectorAll('.btn-delete-asset').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        const id = btn.getAttribute('data-id');
        catalogService.deleteItem(tenantId, cat, id);
        renderCatalogModalItems(cat);
        refreshCatalogSelectors();
        showToast('✓ Asset eliminado del catálogo.');
      });
    });
  }

  if (btnOpenCatalogModal && modalAssetCatalog) {
    btnOpenCatalogModal.addEventListener('click', () => {
      modalAssetCatalog.style.display = 'flex';
      renderCatalogModalItems(currentModalTab);
    });
  }

  if (btnCloseCatalogModal && modalAssetCatalog) {
    btnCloseCatalogModal.addEventListener('click', () => {
      modalAssetCatalog.style.display = 'none';
    });
  }

  document.querySelectorAll('.modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentModalTab = btn.getAttribute('data-cat-tab');
      renderCatalogModalItems(currentModalTab);
    });
  });

  // Preset loader
  function loadPresetIntoInputs(presetKey) {
    const p = videoService.presets[presetKey] || videoService.presets.cake_studio;
    if (actorNameInput) actorNameInput.value = p.hrPersonaje.name || 'Sofía Coff';
    if (actorImgInput) actorImgInput.value = p.hrPersonaje.imageUrl || 'HR-PERSONAJE.png';
    if (actorInput) actorInput.value = `${p.hrPersonaje.token}: ${p.hrPersonaje.description}`;
    if (actorVoiceInput) actorVoiceInput.value = p.hrPersonaje.voiceProfile;

    if (p.hrPersonaje2) {
      if (actor2NameInput) actor2NameInput.value = p.hrPersonaje2.name || 'Moisés Guti';
      if (actor2ImgInput) actor2ImgInput.value = p.hrPersonaje2.imageUrl || 'HR-PERSONAJE-2.png';
      if (actor2Input) actor2Input.value = `${p.hrPersonaje2.token}: ${p.hrPersonaje2.description}`;
      if (actor2VoiceInput) actor2VoiceInput.value = p.hrPersonaje2.voiceProfile;
    }
    
    if (productImgInput) productImgInput.value = (p.hrProducto && p.hrProducto.imageUrl) || 'HR-PRODUCTO.png';
    if (productInput) productInput.value = p.hrProducto ? `${p.hrProducto.token}: ${p.hrProducto.description}` : '';
    
    if (envImgInput) envImgInput.value = (p.hrEscenario && p.hrEscenario.imageUrl) || 'HR-ESCENARIO.png';
    if (envInput) envInput.value = p.hrEscenario ? `${p.hrEscenario.token}: ${p.hrEscenario.description}` : '';
    
    if (cameraInput) cameraInput.value = p.cameraStyle;
    if (audioBgmInput) audioBgmInput.value = p.audioScore;
    if (audioSfxInput) audioSfxInput.value = p.audioSfx;

    const charCount = charCountSelect ? parseInt(charCountSelect.value, 10) : 2;
    if (tabBtnActor2) {
      tabBtnActor2.style.display = charCount >= 2 ? 'inline-block' : 'none';
    }

    if (loglineText) loglineText.innerText = p.logline || 'Guión cinematográfico con Lip-Sync optimizado.';
    if (actsCountText) actsCountText.innerText = `${p.acts.length} Actos (${p.acts.length * 10} Segundos Totales)`;
    if (voPreviewText) voPreviewText.innerText = charCount >= 2 ? 'Diálogo Dúo con Lip-Sync' : 'Monólogo con Lip-Sync';

    updateImagePreview('actor-image-preview-box', p.hrPersonaje.imageUrl, 'Model Sheet Personaje 1');
    if (p.hrPersonaje2) {
      updateImagePreview('actor2-image-preview-box', p.hrPersonaje2.imageUrl, 'Model Sheet Personaje 2');
    }
    updateImagePreview('product-image-preview-box', p.hrProducto ? p.hrProducto.imageUrl : '', 'Orthographic Views Sheet');
  }

  if (charCountSelect) {
    charCountSelect.addEventListener('change', () => {
      const charCount = parseInt(charCountSelect.value, 10) || 2;
      if (tabBtnActor2) {
        tabBtnActor2.style.display = charCount >= 2 ? 'inline-block' : 'none';
      }
      if (voPreviewText) {
        voPreviewText.innerText = charCount >= 2 ? 'Diálogo Dúo con Lip-Sync' : 'Monólogo con Lip-Sync';
      }
      triggerAutoSave();
      executeGeneration();
    });
  }

  if (presetSelect) {
    presetSelect.addEventListener('change', (e) => {
      loadPresetIntoInputs(e.target.value);
      triggerAutoSave();
      executeGeneration();
    });
  }

  if (btnPreviewActor && actorImgInput) {
    btnPreviewActor.addEventListener('click', () => {
      updateImagePreview('actor-image-preview-box', actorImgInput.value.trim(), 'Model Sheet Personaje 1');
      showToast('✓ Vista previa de Personaje 1 actualizada.');
    });
  }

  if (btnPreviewActor2 && actor2ImgInput) {
    btnPreviewActor2.addEventListener('click', () => {
      updateImagePreview('actor2-image-preview-box', actor2ImgInput.value.trim(), 'Model Sheet Personaje 2');
      showToast('✓ Vista previa de Personaje 2 actualizada.');
    });
  }

  if (btnPreviewProduct && productImgInput) {
    btnPreviewProduct.addEventListener('click', () => {
      updateImagePreview('product-image-preview-box', productImgInput.value.trim(), 'Orthographic Views Sheet');
      showToast('✓ Vista previa de Producto actualizada.');
    });
  }

  if (btnGenScreenplay) {
    btnGenScreenplay.addEventListener('click', () => {
      const idea = ideaInput ? ideaInput.value.trim() : '';
      const presetKey = presetSelect ? presetSelect.value : 'cake_studio';
      const charCount = charCountSelect ? parseInt(charCountSelect.value, 10) : 2;
      const screenplay = videoService.generateScreenplayFromIdea(idea, presetKey, charCount);

      if (loglineText) loglineText.innerText = screenplay.logline;
      if (actsCountText) actsCountText.innerText = `${screenplay.totalActs} Actos (${screenplay.durationSeconds}s)`;
      if (blocksSelect) blocksSelect.value = screenplay.totalActs.toString();
      if (voPreviewText) voPreviewText.innerText = charCount >= 2 ? 'Diálogo Dúo con Lip-Sync' : 'Monólogo con Lip-Sync';

      triggerAutoSave();
      executeGeneration();
      showToast(currentLang === 'es'
        ? `✓ Guión cinematográfico generado para ${screenplay.totalActs * 10}s con Lip-Sync.`
        : `✓ Cinematic screenplay generated for ${screenplay.totalActs * 10}s with Lip-Sync.`);
    });
  }

  function renderTabsAndDisplay(result) {
    currentSequenceResult = result;
    const { sequenceBlocks, masterScript, payload } = result;
    const isEs = currentLang === 'es';

    // Render Tab Pills
    if (tabsContainer) {
      let tabsHtml = `<button class="block-tab-btn ${activeTabKey === 'master' ? 'active' : ''}" data-tab="master">📑 ${isEs ? 'Prompt Maestro Unificado' : 'Unified Master Prompt'} (${payload.total_duration_seconds}s)</button>`;
      sequenceBlocks.forEach(b => {
        const isActive = activeTabKey === b.block_index.toString();
        tabsHtml += `<button class="block-tab-btn ${isActive ? 'active' : ''}" data-tab="${b.block_index}">🎬 ${isEs ? 'Bloque' : 'Block'} ${b.block_index} (${b.time_range_global})</button>`;
      });
      tabsContainer.innerHTML = tabsHtml;

      // Add click listeners to tabs
      tabsContainer.querySelectorAll('.block-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeTabKey = btn.getAttribute('data-tab');
          renderTabsAndDisplay(currentSequenceResult);
        });
      });
    }

    // Update Output Textarea according to activeTab
    if (promptOutput) {
      if (activeTabKey === 'master') {
        promptOutput.value = masterScript;
      } else {
        const blockIdx = parseInt(activeTabKey, 10);
        const block = sequenceBlocks.find(b => b.block_index === blockIdx) || sequenceBlocks[0];
        promptOutput.value = (payload && payload.target_engine === 'google-flow')
          ? (block.flow_clean_prompt || block.assembled_prompt)
          : block.assembled_prompt;
      }
    }

    // Update JSON Viewer
    if (jsonOutput) {
      jsonOutput.innerText = JSON.stringify(payload, null, 2);
    }

    // Render Timeline Visualizer
    if (timelineContainer) {
      if (activeTabKey === 'master') {
        timelineContainer.innerHTML = sequenceBlocks.map(b => `
          <div class="timeline-card">
            <div class="timeline-header">
              <span class="timeline-time">⏱️ ${b.time_range_global} (Bloque ${b.block_index}/${payload.total_blocks})</span>
              <span class="timeline-badge">${isEs ? b.act_title_es : b.act_title_en}</span>
            </div>
            <div class="timeline-motion">
              <span class="timeline-shot-tag">${b.shot_type}</span>
              <strong>📹 ${isEs ? 'Cámara' : 'Camera'}:</strong> ${b.camera_motion}
            </div>
            <div class="timeline-action"><strong>🎯 ${isEs ? 'Acción' : 'Action'}:</strong> ${b.subject_action}</div>
            <div class="timeline-audio-track">
              <div class="timeline-vo"><strong>👄 Habla en Cámara (${b.speaker}):</strong> "${b.dialogue_es}"</div>
              <div class="timeline-sfx"><strong>🔊 SFX:</strong> ${b.sfx_foley}</div>
            </div>
            <div class="timeline-handoff" style="font-size: 11px; color: var(--color-accent-cyan);"><strong>📎 Flow Input:</strong> ${b.attached_media_directive}</div>
          </div>
        `).join('');
      } else {
        const blockIdx = parseInt(activeTabKey, 10);
        const b = sequenceBlocks.find(item => item.block_index === blockIdx) || sequenceBlocks[0];
        timelineContainer.innerHTML = `
          <div class="timeline-card active-card">
            <div class="timeline-header">
              <span class="timeline-time">⏱️ ${b.time_range_global} (Bloque ${b.block_index}/${payload.total_blocks})</span>
              <span class="timeline-badge">${isEs ? b.act_title_es : b.act_title_en}</span>
            </div>
            <div class="timeline-motion">
              <span class="timeline-shot-tag">${b.shot_type}</span>
              <strong>📹 ${isEs ? 'Movimiento' : 'Camera'}:</strong> ${b.camera_motion}
            </div>
            <div class="timeline-action"><strong>🎯 ${isEs ? 'Acción' : 'Action'}:</strong> ${b.subject_action}</div>
            <div class="timeline-audio-track">
              <div class="timeline-vo" style="color: #6ee7b7;"><strong>👄 Diálogo en Cámara & Lip-Sync (${b.speaker}):</strong> "${b.dialogue_es}"</div>
              <div class="timeline-vo" style="font-size: 11px; color: var(--text-muted);"><strong>🎭 Directiva Lip-Sync:</strong> ${b.lip_sync_directive}</div>
              <div class="timeline-sfx"><strong>🔊 Efectos SFX / Foley:</strong> ${b.sfx_foley}</div>
            </div>
            <div class="timeline-handoff" style="background: rgba(6, 182, 212, 0.1); border: 1px dashed var(--color-accent-cyan); padding: 8px; border-radius: 4px; margin-top: 8px;">
              <strong style="color: var(--color-accent-cyan);">📎 Instrucción para Google Flow:</strong>
              <div style="font-size: 12px; color: var(--text-primary); margin-top: 2px;">${b.attached_media_directive}</div>
            </div>
            <div class="timeline-snippet" style="margin-top: 8px;"><strong>0-3s:</strong> ${b.prompt_chunks.chunk_0_3s}</div>
            <div class="timeline-snippet"><strong>3-7s:</strong> ${b.prompt_chunks.chunk_3_7s}</div>
            <div class="timeline-snippet"><strong>7-10s:</strong> ${b.prompt_chunks.chunk_7_10s}</div>
          </div>
        `;
      }
    }
  }

  function executeGeneration() {
    const blockCount = blocksSelect ? parseInt(blocksSelect.value, 10) : 1;
    const charCount = charCountSelect ? parseInt(charCountSelect.value, 10) : 2;

    const config = {
      presetKey: presetSelect ? presetSelect.value : 'cake_studio',
      engine: engineSelect ? engineSelect.value : 'google-flow',
      aspectRatio: ratioSelect ? ratioSelect.value : '16:9',
      characterCount: charCount,
      actorName: actorNameInput ? actorNameInput.value.trim() : 'Sofía Coff',
      actorMode: hrActorMode,
      actor: actorInput ? actorInput.value.trim() : '',
      actorImageUrl: actorImgInput ? actorImgInput.value.trim() : '',
      voiceProfile: actorVoiceInput ? actorVoiceInput.value.trim() : '',
      actor2Name: actor2NameInput ? actor2NameInput.value.trim() : 'Moisés Guti',
      actor2Mode: hrActor2Mode,
      actor2: actor2Input ? actor2Input.value.trim() : '',
      actor2ImageUrl: actor2ImgInput ? actor2ImgInput.value.trim() : '',
      voiceProfile2: actor2VoiceInput ? actor2VoiceInput.value.trim() : '',
      productMode: hrProductMode,
      product: productInput ? productInput.value.trim() : '',
      productImageUrl: productImgInput ? productImgInput.value.trim() : '',
      envMode: hrEnvMode,
      env: envInput ? envInput.value.trim() : '',
      envImageUrl: envImgInput ? envImgInput.value.trim() : '',
      camera: cameraInput ? cameraInput.value.trim() : '',
      audioBgm: audioBgmInput ? audioBgmInput.value.trim() : '',
      audioSfx: audioSfxInput ? audioSfxInput.value.trim() : ''
    };

    const result = videoService.generateMultiBlockSequence(config, blockCount);
    renderTabsAndDisplay(result);

    if (typeof crmService !== 'undefined' && crmService.recordUsage) {
      crmService.recordUsage(tenantService.getTenant(), {
        videoSeconds: blockCount * 10,
        tokens: 1200 + (blockCount * 300),
        engine: config.engine
      });
      if (typeof renderCrmDashboard === 'function') {
        renderCrmDashboard();
      }
    }
  }

  // Real-time updates as user types in any input
  const allDynamicInputs = [
    projectNameInput, ideaInput,
    actorNameInput, actorImgInput, actorInput, actorVoiceInput,
    actor2NameInput, actor2ImgInput, actor2Input, actor2VoiceInput,
    productImgInput, productInput, envImgInput, envInput,
    cameraInput, audioBgmInput, audioSfxInput
  ];

  allDynamicInputs.forEach(inputEl => {
    if (inputEl) {
      inputEl.addEventListener('input', () => {
        triggerAutoSave();
        executeGeneration();
      });
      inputEl.addEventListener('change', () => {
        triggerAutoSave();
        executeGeneration();
      });
    }
  });

  if (btnGenVideo) {
    btnGenVideo.addEventListener('click', () => {
      triggerAutoSave();
      executeGeneration();
      const blockCount = blocksSelect ? parseInt(blocksSelect.value, 10) : 1;
      const charCount = charCountSelect ? parseInt(charCountSelect.value, 10) : 2;
      showToast(currentLang === 'es' 
        ? `✓ Prompt Maestro (${blockCount * 10}s, ${charCount} personajes) con Lip-Sync y anclaje de video generado para Google Flow.` 
        : `✓ Master Prompt (${blockCount * 10}s, ${charCount} characters) with Lip-Sync and video extension generated for Google Flow.`);
    });
  }

  if (blocksSelect) {
    blocksSelect.addEventListener('change', () => {
      triggerAutoSave();
      executeGeneration();
    });
  }

  if (engineSelect) {
    engineSelect.addEventListener('change', () => {
      triggerAutoSave();
      executeGeneration();
    });
  }

  if (ratioSelect) {
    ratioSelect.addEventListener('change', () => {
      triggerAutoSave();
      executeGeneration();
    });
  }

  if (btnCopyAllPrompts) {
    btnCopyAllPrompts.addEventListener('click', () => {
      if (currentSequenceResult && currentSequenceResult.masterScript) {
        navigator.clipboard.writeText(currentSequenceResult.masterScript).then(() => {
          showToast(I18N[currentLang].toast_all_copied);
        });
      }
    });
  }

  if (btnCopyCurrentPrompt) {
    btnCopyCurrentPrompt.addEventListener('click', () => {
      if (promptOutput && promptOutput.value) {
        navigator.clipboard.writeText(promptOutput.value).then(() => {
          showToast(I18N[currentLang].toast_prompt_copied);
        });
      }
    });
  }

  if (btnCopyJson) {
    btnCopyJson.addEventListener('click', () => {
      if (currentSequenceResult && currentSequenceResult.payload) {
        navigator.clipboard.writeText(JSON.stringify(currentSequenceResult.payload, null, 2)).then(() => {
          showToast(I18N[currentLang].toast_json_copied);
        });
      }
    });
  }

  // --- Production Timeline Exporters (Fase 3 PMV) ---
  const exportEngine = new ExportEngine();

  function downloadBlobFile(filename, content, mimeType = 'text/plain;charset=utf-8') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const btnExportOtio = document.getElementById('btn-export-otio');
  if (btnExportOtio) {
    btnExportOtio.addEventListener('click', () => {
      if (!currentSequenceResult) executeGeneration();
      const projName = projectNameInput && projectNameInput.value.trim() ? projectNameInput.value.trim().replace(/\s+/g, '_') : 'LoopGravity_Sequence';
      const otioJson = exportEngine.generateOTIO(currentSequenceResult, projName);
      downloadBlobFile(`${projName}.otio`, otioJson, 'application/json');
      showToast('✓ Archivo OpenTimelineIO (.otio) descargado para DaVinci Resolve y Premiere Pro.');
    });
  }

  const btnExportFcpxml = document.getElementById('btn-export-fcpxml');
  if (btnExportFcpxml) {
    btnExportFcpxml.addEventListener('click', () => {
      if (!currentSequenceResult) executeGeneration();
      const projName = projectNameInput && projectNameInput.value.trim() ? projectNameInput.value.trim().replace(/\s+/g, '_') : 'LoopGravity_Sequence';
      const fcpxml = exportEngine.generateFCPXML(currentSequenceResult, projName);
      downloadBlobFile(`${projName}.fcpxml`, fcpxml, 'application/xml');
      showToast('✓ Archivo Final Cut Pro XML (.fcpxml) descargado.');
    });
  }

  const btnExportCsv = document.getElementById('btn-export-csv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      if (!currentSequenceResult) executeGeneration();
      const projName = projectNameInput && projectNameInput.value.trim() ? projectNameInput.value.trim().replace(/\s+/g, '_') : 'LoopGravity_Sequence';
      const csv = exportEngine.generateCSV(currentSequenceResult);
      downloadBlobFile(`${projName}_production_sheet.csv`, csv, 'text/csv;charset=utf-8');
      showToast('✓ Planilla CSV de producción descargada.');
    });
  }

  const btnExportMd = document.getElementById('btn-export-md');
  if (btnExportMd) {
    btnExportMd.addEventListener('click', () => {
      if (!currentSequenceResult) executeGeneration();
      const projName = projectNameInput && projectNameInput.value.trim() ? projectNameInput.value.trim() : 'Producción LoopGravity';
      const md = exportEngine.generateMarkdownScript(currentSequenceResult, projName);
      downloadBlobFile(`${projName.replace(/\s+/g, '_')}_guion_tecnico.md`, md, 'text/markdown;charset=utf-8');
      showToast('✓ Guión Técnico de Producción (.md) descargado.');
    });
  }

  const btnExportJson = document.getElementById('btn-export-json');
  if (btnExportJson) {
    btnExportJson.addEventListener('click', () => {
      if (!currentSequenceResult) executeGeneration();
      const projName = projectNameInput && projectNameInput.value.trim() ? projectNameInput.value.trim().replace(/\s+/g, '_') : 'LoopGravity_Sequence';
      const payloadJson = JSON.stringify(currentSequenceResult.payload, null, 2);
      downloadBlobFile(`${projName}_batch_payload.json`, payloadJson, 'application/json');
      showToast('✓ Payload JSON de producción descargado.');
    });
  }

  // --- CRM & SaaS Telemetry Dashboard (Fase 4 PMV) ---
  const crmService = new CrmService(storageService);

  const crmTenantBadge = document.getElementById('crm-tenant-badge');
  const kpiPipelineValue = document.getElementById('kpi-pipeline-value');
  const kpiLeadsCount = document.getElementById('kpi-leads-count');
  const kpiWonRevenue = document.getElementById('kpi-won-revenue');
  const kpiConvRate = document.getElementById('kpi-conv-rate');
  const kpiVideoSeconds = document.getElementById('kpi-video-seconds');
  const kpiComputeCost = document.getElementById('kpi-compute-cost');
  const kpiHoursSaved = document.getElementById('kpi-hours-saved');
  const kpiTokensCount = document.getElementById('kpi-tokens-count');
  const crmTableBody = document.getElementById('crm-table-body');
  const crmSearchInput = document.getElementById('crm-search-input');
  const crmStatusFilter = document.getElementById('crm-status-filter');
  const modalAddLead = document.getElementById('modal-add-lead');
  const btnOpenLeadModal = document.getElementById('btn-open-lead-modal');
  const btnCloseLeadModal = document.getElementById('btn-close-lead-modal');
  const btnCancelLead = document.getElementById('btn-cancel-lead');
  const formNewLead = document.getElementById('form-new-lead');
  const btnExportLeadsCsv = document.getElementById('btn-export-leads-csv');

  function renderCrmDashboard() {
    const tenantId = tenantService.getTenant();
    if (crmTenantBadge) crmTenantBadge.innerText = `Scope: ${tenantId}`;

    const metrics = crmService.getMetrics(tenantId);
    if (kpiPipelineValue) kpiPipelineValue.innerText = `$${metrics.totalPipelineValue.toLocaleString()}`;
    if (kpiLeadsCount) kpiLeadsCount.innerText = `${metrics.totalLeads} Leads Activos`;
    if (kpiWonRevenue) kpiWonRevenue.innerText = `$${metrics.wonRevenue.toLocaleString()}`;
    if (kpiConvRate) kpiConvRate.innerText = `${metrics.conversionRate}% Tasa de Conversión`;
    if (kpiVideoSeconds) kpiVideoSeconds.innerText = `${metrics.totalVideoSeconds}s`;
    if (kpiComputeCost) kpiComputeCost.innerText = `Costo API Est.: $${metrics.computeCostUSD} USD`;
    if (kpiHoursSaved) kpiHoursSaved.innerText = `${metrics.hoursSaved} hrs`;
    if (kpiTokensCount) kpiTokensCount.innerText = `${metrics.totalTokens.toLocaleString()} Tokens IA`;

    // Filter Leads
    const allLeads = crmService.getLeads(tenantId);
    const searchTerm = crmSearchInput ? crmSearchInput.value.toLowerCase().trim() : '';
    const statusTerm = crmStatusFilter ? crmStatusFilter.value : 'all';

    const filteredLeads = allLeads.filter(l => {
      const matchesSearch = !searchTerm || 
        (l.name && l.name.toLowerCase().includes(searchTerm)) ||
        (l.email && l.email.toLowerCase().includes(searchTerm)) ||
        (l.company && l.company.toLowerCase().includes(searchTerm));
      const matchesStatus = statusTerm === 'all' || l.status === statusTerm;
      return matchesSearch && matchesStatus;
    });

    if (crmTableBody) {
      if (filteredLeads.length === 0) {
        crmTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 24px;">No se encontraron prospectos para los filtros seleccionados.</td></tr>`;
      } else {
        crmTableBody.innerHTML = filteredLeads.map(l => {
          let scoreClass = 'score-med';
          if (l.leadScore >= 90) scoreClass = 'score-high';
          else if (l.leadScore < 75) scoreClass = 'score-low';

          return `
            <tr>
              <td>
                <div style="font-weight: 700; color: var(--text-primary);">${escapeHtml(l.name)}</div>
                <div style="font-size: 11px; color: var(--text-secondary);">${escapeHtml(l.email)} • <span style="color: var(--color-accent-cyan);">${escapeHtml(l.company)}</span></div>
              </td>
              <td><span class="badge badge-glow" style="font-size: 10px;">${escapeHtml(l.planInterest)}</span></td>
              <td style="font-family: var(--font-mono); font-weight: 700;">$${(Number(l.dealValue) || 0).toLocaleString()}</td>
              <td><span class="score-pill ${scoreClass}">${Number(l.leadScore) || 0}/100</span></td>
              <td>
                <select class="crm-status-select" data-lead-id="${escapeHtml(l.id)}" aria-label="Cambiar estado del lead">
                  <option value="new" ${l.status === 'new' ? 'selected' : ''}>Nuevo</option>
                  <option value="ai_qualified" ${l.status === 'ai_qualified' ? 'selected' : ''}>Calificado IA</option>
                  <option value="demo_scheduled" ${l.status === 'demo_scheduled' ? 'selected' : ''}>Demo Agendada</option>
                  <option value="won" ${l.status === 'won' ? 'selected' : ''}>🏆 Ganado</option>
                  <option value="lost" ${l.status === 'lost' ? 'selected' : ''}>❌ Perdido</option>
                </select>
              </td>
              <td style="font-size: 11px; color: var(--text-muted);">${escapeHtml(l.source || 'Web')}</td>
              <td>
                <button class="btn btn-sm btn-secondary btn-delete-lead" data-lead-id="${escapeHtml(l.id)}" title="Eliminar lead" style="padding: 3px 8px; font-size: 11px; color: #f87171;">🗑️</button>
              </td>
            </tr>
          `;
        }).join('');

        // Wire status change
        crmTableBody.querySelectorAll('.crm-status-select').forEach(sel => {
          sel.addEventListener('change', (e) => {
            const leadId = e.target.getAttribute('data-lead-id');
            crmService.updateLeadStatus(tenantId, leadId, e.target.value);
            renderCrmDashboard();
            showToast('✓ Estado de prospecto actualizado en CRM.');
          });
        });

        // Wire delete
        crmTableBody.querySelectorAll('.btn-delete-lead').forEach(btn => {
          btn.addEventListener('click', () => {
            const leadId = btn.getAttribute('data-lead-id');
            crmService.deleteLead(tenantId, leadId);
            renderCrmDashboard();
            showToast('✓ Prospecto eliminado.');
          });
        });
      }
    }
  }

  // Subscribe to tenant change
  tenantService.onTenantChange(() => {
    renderCrmDashboard();
  });

  if (crmSearchInput) {
    crmSearchInput.addEventListener('input', () => renderCrmDashboard());
  }
  if (crmStatusFilter) {
    crmStatusFilter.addEventListener('change', () => renderCrmDashboard());
  }

  if (btnOpenLeadModal && modalAddLead) {
    btnOpenLeadModal.addEventListener('click', () => {
      modalAddLead.style.display = 'flex';
    });
  }

  if (btnCloseLeadModal && modalAddLead) {
    btnCloseLeadModal.addEventListener('click', () => {
      modalAddLead.style.display = 'none';
    });
  }

  if (btnCancelLead && modalAddLead) {
    btnCancelLead.addEventListener('click', () => {
      modalAddLead.style.display = 'none';
    });
  }

  if (formNewLead) {
    formNewLead.addEventListener('submit', (e) => {
      e.preventDefault();
      const tenantId = tenantService.getTenant();
      const name = document.getElementById('lead-form-name').value.trim();
      const email = document.getElementById('lead-form-email').value.trim();
      const company = document.getElementById('lead-form-company').value.trim();
      const planInterest = document.getElementById('lead-form-plan').value;
      const status = document.getElementById('lead-form-status').value;
      const notes = document.getElementById('lead-form-notes').value.trim();

      crmService.addLead(tenantId, {
        name,
        email,
        company,
        planInterest,
        status,
        notes,
        source: 'CRM Dashboard Direct'
      });

      modalAddLead.style.display = 'none';
      formNewLead.reset();
      renderCrmDashboard();
      showToast('✓ Nuevo lead registrado y calificado en CRM.');
    });
  }

  if (btnExportLeadsCsv) {
    btnExportLeadsCsv.addEventListener('click', () => {
      const tenantId = tenantService.getTenant();
      const csv = crmService.exportLeadsCSV(tenantId);
      downloadBlobFile(`leads_${tenantId}_${new Date().toISOString().slice(0, 10)}.csv`, csv, 'text/csv;charset=utf-8');
      showToast('✓ Archivo CSV de leads exportado con éxito.');
    });
  }

  // Interactive Example Snippets in Manual
  document.querySelectorAll('.example-snippet').forEach(snippet => {
    snippet.addEventListener('click', () => {
      const text = snippet.getAttribute('data-spec-text');
      const specInput = document.getElementById('loop-spec-input');
      if (specInput && text) {
        specInput.value = text;
        showToast(I18N[currentLang].toast_copied);
        specInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        specInput.focus();
      }
    });
  });

  // Early access form (Syncs with CRM Service)
  const leadForm = document.getElementById('early-access-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('lead-email');
      if (emailInput && emailInput.value.includes('@')) {
        const tenantId = tenantService.getTenant();
        crmService.addLead(tenantId, {
          name: emailInput.value.split('@')[0],
          email: emailInput.value.trim(),
          source: 'Landing Early Access',
          planInterest: 'Pro Squad',
          status: 'new'
        });
        renderCrmDashboard();
        showToast(currentLang === 'es' 
          ? `✓ Acceso prioritario registrado y sincronizado en CRM para: ${emailInput.value}` 
          : `✓ Early access registered and synced to CRM for: ${emailInput.value}`);
        emailInput.value = '';
      }
    });
  }

  // Initial Boot
  refreshProjectsList();
  refreshCatalogSelectors();
  loadWorkspaceForActiveTenant();
  renderCrmDashboard();
  });
}

// CommonJS Exports for automated test runner
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    escapeHtml,
    TenantService,
    SupabaseStorageAdapter,
    StorageService,
    SecureStorageService,
    AuditService,
    CanonicalAssetService,
    ProductionOSProjectService,
    CreativeDirectorService,
    BaseRenderProviderAdapter,
    MockRenderProviderAdapter,
    KlingProviderAdapter,
    RenderOrchestratorService,
    AssetCatalogService,
    ExportEngine,
    CrmService,
    LoopExecutionEngine,
    VideoPromptService,
    I18N
  };
}

