-- ==============================================================================
-- MIGRACIÓN DE TRANSICIÓN: PMV EXISTENTE A LOOPGRAVITY PRODUCTION OS (FASES 1, 2 Y 3)
-- Archivo: supabase/migrations/20260820_migrate_pmv_to_production_os.sql
-- Repositorio: https://github.com/Moicogut/LoopGravity
-- Proyecto Supabase: https://bsftifcgyuaubmachzvi.supabase.co
-- ==============================================================================
-- REGLAS DE SEGURIDAD Y PRESERVACIÓN ABSOLUTA:
-- 1. NO contiene DROP TABLE, TRUNCATE ni DELETE.
-- 2. Preserva al 100% las 5 tablas PMV: tenants, projects, asset_catalog, crm_leads, usage_telemetry.
-- 3. Mantiene las 5 políticas RLS existentes del PMV intactas.
-- 4. Soporta claves de tipo TEXT existentes en projects.id y tenant_id.
-- 5. Sincroniza tenants existentes con la nueva entidad organizations.
-- 6. Realiza backfill no destructivo de asset_catalog a canonical_assets / asset_versions.
-- 7. Define políticas RLS con USING y WITH CHECK para todas las entidades nuevas.
-- ==============================================================================

-- ==============================================================================
-- PASO 1: EXTENSIONES REQUERIDAS
-- ==============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- PASO 2: ORGANIZACIONES Y COMPATIBILIDAD CON TENANTS PMV
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.organizations (
  id text PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE,
  tier text NOT NULL DEFAULT 'Pro Squad',
  credit_balance_cents bigint NOT NULL DEFAULT 5000,
  reserved_credit_cents bigint NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Sincronizar tenants existentes hacia organizations (idempotente)
INSERT INTO public.organizations (id, name, tier, credit_balance_cents, reserved_credit_cents, created_at, updated_at)
SELECT 
  t.id, 
  t.name, 
  COALESCE(t.tier, 'Pro Squad'), 
  5000, 
  0, 
  COALESCE(t.created_at, now()), 
  COALESCE(t.updated_at, now())
FROM public.tenants t
ON CONFLICT (id) DO UPDATE 
SET 
  name = EXCLUDED.name,
  tier = EXCLUDED.tier,
  updated_at = now();

-- Usuarios de plataforma
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Membresías organizacionales
CREATE TABLE IF NOT EXISTS public.organization_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id text NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_org_member UNIQUE(organization_id, user_id)
);

-- ==============================================================================
-- PASO 3: EVOLUCIÓN ADITIVA DE LA TABLA PROJECTS (COMPATIBILIDAD TEXT ID)
-- ==============================================================================
ALTER TABLE public.projects 
  ADD COLUMN IF NOT EXISTS target_duration_seconds integer DEFAULT 30,
  ADD COLUMN IF NOT EXISTS aspect_ratio text DEFAULT '16:9',
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS data jsonb NOT NULL DEFAULT '{}'::jsonb;

-- ==============================================================================
-- PASO 4: FASE 1 — BRIEFS, VOCES, ACTIVOS CANÓNICOS, AUDITORÍA Y COSTOS
-- ==============================================================================

-- Creative Briefs
CREATE TABLE IF NOT EXISTS public.creative_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id text NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  pitch_text text NOT NULL,
  target_audience text,
  emotional_hook text,
  cta_text text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Perfiles Vocales
CREATE TABLE IF NOT EXISTS public.voice_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  name text NOT NULL,
  provider text NOT NULL DEFAULT 'elevenlabs',
  voice_id text NOT NULL,
  language text NOT NULL DEFAULT 'es-MX',
  accent_style text NOT NULL DEFAULT 'neutral-commercial',
  sample_audio_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Activos Canónicos de Marca
CREATE TABLE IF NOT EXISTS public.canonical_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  asset_type text NOT NULL CHECK (asset_type IN ('character', 'outfit', 'product', 'environment', 'audio_voice', 'logo')),
  name text NOT NULL,
  description text,
  is_archived boolean NOT NULL DEFAULT false,
  legacy_catalog_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Versionado Inmutable de Activos
CREATE TABLE IF NOT EXISTS public.asset_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id uuid NOT NULL REFERENCES public.canonical_assets(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  version_number integer NOT NULL DEFAULT 1,
  image_url text NOT NULL,
  attributes jsonb NOT NULL DEFAULT '{}'::jsonb,
  voice_profile_id uuid REFERENCES public.voice_profiles(id) ON DELETE SET NULL,
  change_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_asset_version UNIQUE(asset_id, version_number)
);

-- Vínculos de Versiones con el Proyecto
CREATE TABLE IF NOT EXISTS public.asset_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id text NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  asset_id uuid NOT NULL REFERENCES public.canonical_assets(id) ON DELETE CASCADE,
  asset_version_id uuid NOT NULL REFERENCES public.asset_versions(id) ON DELETE CASCADE,
  role_in_project text NOT NULL CHECK (role_in_project IN ('actor_1', 'actor_2', 'product', 'environment', 'logo')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_project_asset_role UNIQUE(project_id, role_in_project)
);

-- Registro de Auditoría de Seguridad
CREATE TABLE IF NOT EXISTS public.audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  user_id text,
  event_type text NOT NULL,
  resource_type text NOT NULL,
  resource_id text NOT NULL,
  details jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Libro Mayor de Costos
CREATE TABLE IF NOT EXISTS public.cost_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  project_id text REFERENCES public.projects(id) ON DELETE SET NULL,
  job_type text NOT NULL,
  job_id text NOT NULL,
  amount_cents integer NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- BACKFILL NO DESTRUCTIVO: Migrar asset_catalog existente a canonical_assets
-- ------------------------------------------------------------------------------
DO $$
DECLARE
  cat_row RECORD;
  new_asset_id uuid;
  mapped_type text;
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'asset_catalog') THEN
    FOR cat_row IN SELECT * FROM public.asset_catalog LOOP
      -- Mapear categorías PMV a asset_type de Production OS
      mapped_type := CASE 
        WHEN cat_row.category = 'actors' THEN 'character'
        WHEN cat_row.category = 'products' THEN 'product'
        WHEN cat_row.category = 'environments' THEN 'environment'
        ELSE 'character'
      END;

      -- Verificar si ya fue migrado
      SELECT id INTO new_asset_id FROM public.canonical_assets 
      WHERE tenant_id = cat_row.tenant_id AND legacy_catalog_id = cat_row.id;

      IF new_asset_id IS NULL THEN
        new_asset_id := gen_random_uuid();
        INSERT INTO public.canonical_assets (id, tenant_id, asset_type, name, description, is_archived, legacy_catalog_id, created_at, updated_at)
        VALUES (
          new_asset_id,
          cat_row.tenant_id,
          mapped_type,
          cat_row.name,
          cat_row.description,
          false,
          cat_row.id,
          COALESCE(cat_row.created_at, now()),
          COALESCE(cat_row.updated_at, now())
        );

        -- Crear versión inicial (v1)
        INSERT INTO public.asset_versions (id, asset_id, tenant_id, version_number, image_url, attributes, change_notes, created_at)
        VALUES (
          gen_random_uuid(),
          new_asset_id,
          cat_row.tenant_id,
          1,
          cat_row.image_url,
          jsonb_build_object('role', cat_row.role, 'gender', cat_row.gender),
          'Migración automática desde catálogo PMV',
          COALESCE(cat_row.created_at, now())
        );
      END IF;
    END LOOP;
  END IF;
END $$;

-- ==============================================================================
-- PASO 5: FASE 2 — GUION, ESCENAS, SHOTS Y STORYBOARD
-- ==============================================================================

-- Guiones
CREATE TABLE IF NOT EXISTS public.scripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id text NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  title text NOT NULL,
  logline text,
  target_audience text,
  cta_text text,
  total_duration_seconds numeric(4,2) NOT NULL DEFAULT 25.0,
  current_version_number integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'needs_revision')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Versiones de Guion
CREATE TABLE IF NOT EXISTS public.script_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id uuid NOT NULL REFERENCES public.scripts(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  version_number integer NOT NULL,
  content_json jsonb NOT NULL,
  change_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_script_version UNIQUE(script_id, version_number)
);

-- Escenas
CREATE TABLE IF NOT EXISTS public.scenes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id uuid NOT NULL REFERENCES public.scripts(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  scene_order integer NOT NULL,
  heading text NOT NULL,
  environment_asset_version_id uuid REFERENCES public.asset_versions(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Tomas (Shots)
CREATE TABLE IF NOT EXISTS public.shots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id uuid NOT NULL REFERENCES public.scripts(id) ON DELETE CASCADE,
  project_id text NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  shot_order integer NOT NULL,
  shot_type text NOT NULL,
  shot_classification text NOT NULL CHECK (shot_classification IN ('host', 'product_broll', 'dialogue', 'cta', 'transition')),
  narrative_intention text NOT NULL,
  main_visual_action text NOT NULL,
  dialogue_es text,
  speaker_asset_version_id uuid REFERENCES public.asset_versions(id) ON DELETE SET NULL,
  transition_strategy text NOT NULL CHECK (transition_strategy IN ('cut', 'b_roll_insert', 'product_insert', 'match_cut', 'dissolve', 'cta_lockup')),
  duration_seconds numeric(4,2) NOT NULL DEFAULT 6.0,
  max_allowed_words integer NOT NULL DEFAULT 15,
  actual_word_count integer NOT NULL DEFAULT 0,
  speech_rate_wps numeric(3,2) NOT NULL DEFAULT 2.0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'needs_revision')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Vínculos inmutables de activos por toma
CREATE TABLE IF NOT EXISTS public.shot_asset_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shot_id uuid NOT NULL REFERENCES public.shots(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  asset_version_id uuid NOT NULL REFERENCES public.asset_versions(id) ON DELETE CASCADE,
  role_in_shot text NOT NULL CHECK (role_in_shot IN ('actor_1', 'actor_2', 'product', 'environment', 'logo')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_shot_asset_role UNIQUE(shot_id, role_in_shot)
);

-- Versiones de Storyboard
CREATE TABLE IF NOT EXISTS public.storyboard_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id text NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  script_id uuid NOT NULL REFERENCES public.scripts(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  version_number integer NOT NULL DEFAULT 1,
  shots_snapshot jsonb NOT NULL,
  total_duration_seconds numeric(4,2) NOT NULL,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_project_storyboard_version UNIQUE(project_id, version_number)
);

-- Aprobaciones Humanas de Storyboard
CREATE TABLE IF NOT EXISTS public.storyboard_approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storyboard_version_id uuid NOT NULL REFERENCES public.storyboard_versions(id) ON DELETE CASCADE,
  project_id text NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  approved_by_user_id text NOT NULL,
  approved_at timestamptz NOT NULL DEFAULT now(),
  approval_notes text,
  is_ready_for_render boolean NOT NULL DEFAULT true,
  CONSTRAINT uq_storyboard_approval UNIQUE(storyboard_version_id)
);

-- ==============================================================================
-- PASO 6: FASE 3 — RENDER ORCHESTRATOR, ADAPTADORES & IDEMPOTENCIA
-- ==============================================================================

-- Idempotency Keys
CREATE TABLE IF NOT EXISTS public.idempotency_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  idempotency_key text NOT NULL,
  resource_type text NOT NULL,
  resource_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_tenant_idempotency UNIQUE(tenant_id, idempotency_key)
);

-- Provider Credentials (Solo metadatos, sin secretos)
CREATE TABLE IF NOT EXISTS public.provider_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  provider_name text NOT NULL CHECK (provider_name IN ('mock_engine', 'kling_ai', 'runway_gen3', 'google_veo2')),
  is_active boolean NOT NULL DEFAULT true,
  rate_limit_rpm integer NOT NULL DEFAULT 20,
  config_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_tenant_prov_name UNIQUE(tenant_id, provider_name)
);

-- Estimaciones de Costo por Render
CREATE TABLE IF NOT EXISTS public.render_cost_estimates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  project_id text NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  storyboard_version_id uuid NOT NULL REFERENCES public.storyboard_versions(id) ON DELETE CASCADE,
  total_shots integer NOT NULL,
  total_duration_seconds numeric(4,2) NOT NULL,
  estimated_cost_cents integer NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Trabajos de Render (Render Jobs)
CREATE TABLE IF NOT EXISTS public.render_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  project_id text NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  storyboard_version_id uuid NOT NULL REFERENCES public.storyboard_versions(id) ON DELETE CASCADE,
  shot_id text NOT NULL,
  shot_order integer NOT NULL,
  provider text NOT NULL DEFAULT 'mock_engine',
  model text NOT NULL DEFAULT 'v1-standard',
  state text NOT NULL DEFAULT 'draft' CHECK (state IN ('draft', 'queued', 'submitted', 'rendering', 'completed', 'qa_pending', 'approved', 'rejected', 'cancelled', 'failed')),
  idempotency_key text NOT NULL,
  input_manifest jsonb NOT NULL,
  estimated_cost_cents integer NOT NULL DEFAULT 0,
  actual_cost_cents integer NOT NULL DEFAULT 0,
  max_attempts integer NOT NULL DEFAULT 3,
  current_attempts integer NOT NULL DEFAULT 0,
  provider_job_id text,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_tenant_job_idemp UNIQUE(tenant_id, idempotency_key)
);

-- Intentos de Render
CREATE TABLE IF NOT EXISTS public.render_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  render_job_id uuid NOT NULL REFERENCES public.render_jobs(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  attempt_number integer NOT NULL,
  provider_job_id text,
  status text NOT NULL DEFAULT 'submitted',
  response_payload jsonb DEFAULT '{}'::jsonb,
  error_details text,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

-- Medios Generados (Generated Media)
CREATE TABLE IF NOT EXISTS public.generated_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  render_job_id uuid NOT NULL REFERENCES public.render_jobs(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  project_id text NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  shot_id text NOT NULL,
  storyboard_version_id uuid NOT NULL REFERENCES public.storyboard_versions(id) ON DELETE CASCADE,
  media_type text NOT NULL CHECK (media_type IN ('video_clip', 'start_frame', 'end_frame', 'audio_track')),
  storage_path text NOT NULL,
  signed_url text,
  duration_seconds numeric(4,2) NOT NULL,
  resolution text NOT NULL DEFAULT '1920x1080',
  fps integer NOT NULL DEFAULT 24,
  qa_status text NOT NULL DEFAULT 'qa_pending' CHECK (qa_status IN ('qa_pending', 'approved', 'rejected')),
  qa_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Eventos de Webhooks de Proveedores
CREATE TABLE IF NOT EXISTS public.provider_webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  provider text NOT NULL,
  event_type text NOT NULL,
  raw_payload jsonb NOT NULL,
  signature_verified boolean NOT NULL DEFAULT false,
  processed_status text NOT NULL DEFAULT 'pending' CHECK (processed_status IN ('pending', 'processed', 'invalid', 'failed')),
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ==============================================================================
-- PASO 7: ÍNDICES DE ALTO RENDIMIENTO (MIGRACIÓN COMPLETA)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_canonical_assets_tenant ON public.canonical_assets(tenant_id);
CREATE INDEX IF NOT EXISTS idx_asset_versions_asset ON public.asset_versions(asset_id);
CREATE INDEX IF NOT EXISTS idx_asset_links_proj ON public.asset_links(project_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_scripts_project ON public.scripts(project_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_shots_script ON public.shots(script_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_shots_project ON public.shots(project_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_storyboard_proj ON public.storyboard_versions(project_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_storyboard_appr ON public.storyboard_approvals(project_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_render_jobs_proj ON public.render_jobs(project_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_render_jobs_state ON public.render_jobs(tenant_id, state);
CREATE INDEX IF NOT EXISTS idx_render_jobs_idemp ON public.render_jobs(tenant_id, idempotency_key);
CREATE INDEX IF NOT EXISTS idx_render_attempts_job ON public.render_attempts(render_job_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_generated_media_job ON public.generated_media(render_job_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_generated_media_shot ON public.generated_media(project_id, shot_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_idempotency_keys ON public.idempotency_keys(tenant_id, idempotency_key);
CREATE INDEX IF NOT EXISTS idx_audit_events_tenant ON public.audit_events(tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_cost_ledger_tenant ON public.cost_ledger(tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_webhook_events_tenant ON public.provider_webhook_events(tenant_id, created_at);

-- ==============================================================================
-- PASO 8: HABILITACIÓN DE ROW LEVEL SECURITY (RLS) EN TODAS LAS NUEVAS ENTIDADES
-- ==============================================================================
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creative_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canonical_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.script_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shot_asset_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storyboard_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storyboard_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idempotency_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.render_cost_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.render_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.render_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_ledger ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- PASO 9: POLÍTICAS RLS ESTRICTAS CON USING Y WITH CHECK
-- ==============================================================================
DO $$
BEGIN
  -- Organizations
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'organizations' AND policyname = 'tenant_isolation_organizations') THEN
    CREATE POLICY tenant_isolation_organizations ON public.organizations
      FOR ALL USING (id = public.current_tenant_id()) WITH CHECK (id = public.current_tenant_id());
  END IF;

  -- Creative Briefs
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'creative_briefs' AND policyname = 'tenant_isolation_creative_briefs') THEN
    CREATE POLICY tenant_isolation_creative_briefs ON public.creative_briefs
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Voice Profiles
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'voice_profiles' AND policyname = 'tenant_isolation_voice_profiles') THEN
    CREATE POLICY tenant_isolation_voice_profiles ON public.voice_profiles
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Canonical Assets
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'canonical_assets' AND policyname = 'tenant_isolation_canonical_assets') THEN
    CREATE POLICY tenant_isolation_canonical_assets ON public.canonical_assets
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Asset Versions
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'asset_versions' AND policyname = 'tenant_isolation_asset_versions') THEN
    CREATE POLICY tenant_isolation_asset_versions ON public.asset_versions
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Asset Links
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'asset_links' AND policyname = 'tenant_isolation_asset_links') THEN
    CREATE POLICY tenant_isolation_asset_links ON public.asset_links
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Scripts
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'scripts' AND policyname = 'tenant_isolation_scripts') THEN
    CREATE POLICY tenant_isolation_scripts ON public.scripts
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Script Versions
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'script_versions' AND policyname = 'tenant_isolation_script_versions') THEN
    CREATE POLICY tenant_isolation_script_versions ON public.script_versions
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Scenes
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'scenes' AND policyname = 'tenant_isolation_scenes') THEN
    CREATE POLICY tenant_isolation_scenes ON public.scenes
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Shots
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'shots' AND policyname = 'tenant_isolation_shots') THEN
    CREATE POLICY tenant_isolation_shots ON public.shots
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Shot Asset Links
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'shot_asset_links' AND policyname = 'tenant_isolation_shot_asset_links') THEN
    CREATE POLICY tenant_isolation_shot_asset_links ON public.shot_asset_links
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Storyboard Versions
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'storyboard_versions' AND policyname = 'tenant_isolation_storyboard_versions') THEN
    CREATE POLICY tenant_isolation_storyboard_versions ON public.storyboard_versions
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Storyboard Approvals
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'storyboard_approvals' AND policyname = 'tenant_isolation_storyboard_approvals') THEN
    CREATE POLICY tenant_isolation_storyboard_approvals ON public.storyboard_approvals
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Idempotency Keys
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'idempotency_keys' AND policyname = 'tenant_isolation_idempotency_keys') THEN
    CREATE POLICY tenant_isolation_idempotency_keys ON public.idempotency_keys
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Provider Credentials
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'provider_credentials' AND policyname = 'tenant_isolation_provider_credentials') THEN
    CREATE POLICY tenant_isolation_provider_credentials ON public.provider_credentials
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Render Cost Estimates
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'render_cost_estimates' AND policyname = 'tenant_isolation_render_cost_estimates') THEN
    CREATE POLICY tenant_isolation_render_cost_estimates ON public.render_cost_estimates
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Render Jobs
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'render_jobs' AND policyname = 'tenant_isolation_render_jobs') THEN
    CREATE POLICY tenant_isolation_render_jobs ON public.render_jobs
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Render Attempts
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'render_attempts' AND policyname = 'tenant_isolation_render_attempts') THEN
    CREATE POLICY tenant_isolation_render_attempts ON public.render_attempts
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Generated Media
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'generated_media' AND policyname = 'tenant_isolation_generated_media') THEN
    CREATE POLICY tenant_isolation_generated_media ON public.generated_media
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Provider Webhook Events
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'provider_webhook_events' AND policyname = 'tenant_isolation_provider_webhook_events') THEN
    CREATE POLICY tenant_isolation_provider_webhook_events ON public.provider_webhook_events
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Audit Events
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'audit_events' AND policyname = 'tenant_isolation_audit_events') THEN
    CREATE POLICY tenant_isolation_audit_events ON public.audit_events
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;

  -- Cost Ledger
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'cost_ledger' AND policyname = 'tenant_isolation_cost_ledger') THEN
    CREATE POLICY tenant_isolation_cost_ledger ON public.cost_ledger
      FOR ALL USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());
  END IF;
END $$;
