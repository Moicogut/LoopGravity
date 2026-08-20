-- ==============================================================================
-- MIGRACIÓN DELTA FASE 3: RENDER ORCHESTRATOR, ADAPTADORES & IDEMPOTENCIA
-- Archivo: supabase/migrations/20260820_phase3_render_orchestrator.sql
-- Repositorio: https://github.com/Moicogut/LoopGravity
-- Proyecto Supabase: https://bsftifcgyuaubmachzvi.supabase.co
-- ==============================================================================
-- REGLAS DE SEGURIDAD APLICADAS:
-- 1. Cero sentencias DROP TABLE / TRUNCATE / DELETE.
-- 2. Modificaciones 100% aditivas y compatibles con Fases 1 y 2.
-- 3. Idempotente con cláusulas IF NOT EXISTS y bloques DO seguros.
-- ==============================================================================

-- 1. ALTER TABLE ADITIVOS A ENTIDADES PREVIAS
ALTER TABLE IF EXISTS public.organizations 
  ADD COLUMN IF NOT EXISTS reserved_credit_cents bigint NOT NULL DEFAULT 0;

-- 2. TABLA: IDEMPOTENCY KEYS (Prevención de dobles renders y doble cobro)
CREATE TABLE IF NOT EXISTS public.idempotency_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  idempotency_key text NOT NULL,
  resource_type text NOT NULL,
  resource_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_tenant_idempotency_key UNIQUE(tenant_id, idempotency_key)
);

-- 3. TABLA: PROVIDER CREDENTIALS (Metadatos de configuración de proveedores sin secretos en crudo)
CREATE TABLE IF NOT EXISTS public.provider_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  provider_name text NOT NULL CHECK (provider_name IN ('mock_engine', 'kling_ai', 'runway_gen3', 'google_veo2')),
  is_active boolean NOT NULL DEFAULT true,
  rate_limit_rpm integer NOT NULL DEFAULT 20,
  config_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_tenant_provider UNIQUE(tenant_id, provider_name)
);

-- 4. TABLA: RENDER COST ESTIMATES (Presupuestación previa al render)
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

-- 5. TABLA: RENDER JOBS (Núcleo del Orchestrator y Máquina de Estados)
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
  CONSTRAINT uq_tenant_render_idempotency UNIQUE(tenant_id, idempotency_key)
);

-- 6. TABLA: RENDER ATTEMPTS (Historial de reintentos y trazabilidad de ejecuciones)
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

-- 7. TABLA: GENERATED MEDIA (Resultados de render validados por toma y versión)
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

-- 8. TABLA: PROVIDER WEBHOOK EVENTS (Ingesta de eventos asíncronos y verificación HMAC)
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
-- 9. ÍNDICES DE ALTO RENDIMIENTO (FASE 3)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_render_jobs_proj ON public.render_jobs(project_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_render_jobs_state ON public.render_jobs(tenant_id, state);
CREATE INDEX IF NOT EXISTS idx_render_jobs_idemp ON public.render_jobs(tenant_id, idempotency_key);
CREATE INDEX IF NOT EXISTS idx_render_attempts_job ON public.render_attempts(render_job_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_generated_media_job ON public.generated_media(render_job_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_generated_media_shot ON public.generated_media(project_id, shot_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_idempotency_keys ON public.idempotency_keys(tenant_id, idempotency_key);
CREATE INDEX IF NOT EXISTS idx_webhook_events_tenant ON public.provider_webhook_events(tenant_id, created_at);

-- ==============================================================================
-- 10. HABILITACIÓN DE ROW LEVEL SECURITY (RLS) EN TABLAS FASE 3
-- ==============================================================================
ALTER TABLE public.idempotency_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.render_cost_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.render_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.render_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_webhook_events ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 11. POLÍTICAS RLS ESTRICTAS POR TENANT (FASE 3)
-- ==============================================================================
DO $$
BEGIN
  -- Idempotency Keys
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'idempotency_keys' AND policyname = 'tenant_isolation_idempotency_keys') THEN
    CREATE POLICY tenant_isolation_idempotency_keys ON public.idempotency_keys
      FOR ALL USING (tenant_id = public.current_tenant_id());
  END IF;

  -- Provider Credentials
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'provider_credentials' AND policyname = 'tenant_isolation_provider_credentials') THEN
    CREATE POLICY tenant_isolation_provider_credentials ON public.provider_credentials
      FOR ALL USING (tenant_id = public.current_tenant_id());
  END IF;

  -- Render Cost Estimates
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'render_cost_estimates' AND policyname = 'tenant_isolation_render_cost_estimates') THEN
    CREATE POLICY tenant_isolation_render_cost_estimates ON public.render_cost_estimates
      FOR ALL USING (tenant_id = public.current_tenant_id());
  END IF;

  -- Render Jobs
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'render_jobs' AND policyname = 'tenant_isolation_render_jobs') THEN
    CREATE POLICY tenant_isolation_render_jobs ON public.render_jobs
      FOR ALL USING (tenant_id = public.current_tenant_id());
  END IF;

  -- Render Attempts
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'render_attempts' AND policyname = 'tenant_isolation_render_attempts') THEN
    CREATE POLICY tenant_isolation_render_attempts ON public.render_attempts
      FOR ALL USING (tenant_id = public.current_tenant_id());
  END IF;

  -- Generated Media
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'generated_media' AND policyname = 'tenant_isolation_generated_media') THEN
    CREATE POLICY tenant_isolation_generated_media ON public.generated_media
      FOR ALL USING (tenant_id = public.current_tenant_id());
  END IF;

  -- Provider Webhook Events
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'provider_webhook_events' AND policyname = 'tenant_isolation_provider_webhook_events') THEN
    CREATE POLICY tenant_isolation_provider_webhook_events ON public.provider_webhook_events
      FOR ALL USING (tenant_id = public.current_tenant_id());
  END IF;
END $$;
