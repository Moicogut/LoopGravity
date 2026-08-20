-- ==============================================================================
-- LOOPGRAVITY PRODUCTION OS — ESQUEMA POSTGRESQL & POLÍTICAS RLS (FASE 1)
-- Repositorio: https://github.com/Moicogut/LoopGravity
-- Proyecto Supabase: https://bsftifcgyuaubmachzvi.supabase.co
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. FUNCIÓN DE RESOLUCIÓN DE TENANT DESDE AUTH JWT
CREATE OR REPLACE FUNCTION public.current_tenant_id()
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'tenant_id'),
    (auth.jwt() -> 'user_metadata' ->> 'tenant_id'),
    (NULLIF(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' ->> 'tenant_id'),
    (NULLIF(current_setting('request.jwt.claims', true), '')::jsonb -> 'user_metadata' ->> 'tenant_id'),
    NULLIF(current_setting('request.jwt.claim.tenant_id', true), '')
  );
$$;

-- 3. ORGANIZACIONES / TENANTS
CREATE TABLE IF NOT EXISTS public.organizations (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name text NOT NULL,
  slug text UNIQUE,
  tier text NOT NULL DEFAULT 'Pro Squad',
  credit_balance_cents bigint NOT NULL DEFAULT 5000, -- $50.00 USD inicial
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Compatibilidad con tabla legacy tenants
CREATE TABLE IF NOT EXISTS public.tenants (
  id text PRIMARY KEY,
  name text NOT NULL,
  tier text NOT NULL DEFAULT 'Pro Squad',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4. USUARIOS & MEMBRESÍAS
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY,
  email text NOT NULL,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.organization_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id text NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

-- 5. PROYECTOS
CREATE TABLE IF NOT EXISTS public.projects (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tenant_id text NOT NULL,
  name text NOT NULL,
  target_duration_seconds integer DEFAULT 30,
  aspect_ratio text DEFAULT '16:9',
  status text NOT NULL DEFAULT 'draft',
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 6. CREATIVE BRIEFS (Paso 1: Idea Comercial)
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

-- 7. VOCES Y PERFILES VOCALES
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

-- 8. CANONICAL ASSETS (Activos Canónicos de Marca)
CREATE TABLE IF NOT EXISTS public.canonical_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  asset_type text NOT NULL CHECK (asset_type IN ('character', 'outfit', 'product', 'environment', 'audio_voice', 'logo')),
  name text NOT NULL,
  description text,
  is_archived boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 9. ASSET VERSIONS (Versionado Inmutable de Activos)
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
  UNIQUE(asset_id, version_number)
);

-- 10. ASSET LINKS (Vinculación Inmutable de Versión con el Proyecto)
CREATE TABLE IF NOT EXISTS public.asset_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id text NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  asset_id uuid NOT NULL REFERENCES public.canonical_assets(id) ON DELETE CASCADE,
  asset_version_id uuid NOT NULL REFERENCES public.asset_versions(id) ON DELETE CASCADE,
  role_in_project text NOT NULL CHECK (role_in_project IN ('actor_1', 'actor_2', 'product', 'environment', 'logo')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(project_id, role_in_project)
);

-- 11. AUDIT EVENTS (Auditoría de Seguridad y Eventos Sensibles)
CREATE TABLE IF NOT EXISTS public.audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  user_id text,
  event_type text NOT NULL, -- 'asset_created', 'version_bumped', 'project_saved', 'access_denied'
  resource_type text NOT NULL,
  resource_id text NOT NULL,
  details jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 12. USAGE EVENTS & COST LEDGER (Libro Mayor de Costos)
CREATE TABLE IF NOT EXISTS public.cost_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  project_id text REFERENCES public.projects(id) ON DELETE SET NULL,
  job_type text NOT NULL, -- 'render_video', 'tts', 'lip_sync', 'assembly'
  job_id text NOT NULL,
  amount_cents integer NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.usage_telemetry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  video_seconds integer NOT NULL DEFAULT 0,
  tokens integer NOT NULL DEFAULT 0,
  engine text NOT NULL DEFAULT 'google-flow',
  recorded_at timestamptz NOT NULL DEFAULT now()
);

-- Tablas legacy de soporte
CREATE TABLE IF NOT EXISTS public.asset_catalog (
  id text PRIMARY KEY,
  tenant_id text NOT NULL,
  category text NOT NULL CHECK (category IN ('actors', 'products', 'environments')),
  name text NOT NULL,
  role text,
  gender text,
  image_url text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.crm_leads (
  id text PRIMARY KEY,
  tenant_id text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  plan_interest text NOT NULL DEFAULT 'Pro Squad',
  deal_value numeric NOT NULL DEFAULT 588,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'ai_qualified', 'demo_scheduled', 'won', 'lost')),
  lead_score integer NOT NULL DEFAULT 70 CHECK (lead_score >= 0 AND lead_score <= 100),
  source text NOT NULL DEFAULT 'Landing Form',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 13. ÍNDICES DE ALTO RENDIMIENTO POR TENANT
CREATE INDEX IF NOT EXISTS idx_projects_tenant ON public.projects(tenant_id);
CREATE INDEX IF NOT EXISTS idx_canonical_assets_tenant ON public.canonical_assets(tenant_id);
CREATE INDEX IF NOT EXISTS idx_asset_versions_asset ON public.asset_versions(asset_id);
CREATE INDEX IF NOT EXISTS idx_asset_links_proj ON public.asset_links(project_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_events_tenant ON public.audit_events(tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_cost_ledger_tenant ON public.cost_ledger(tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_catalog_tenant ON public.asset_catalog(tenant_id, category);
CREATE INDEX IF NOT EXISTS idx_leads_tenant ON public.crm_leads(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_telemetry_tenant ON public.usage_telemetry(tenant_id, recorded_at);

-- 14. HABILITACIÓN DE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creative_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canonical_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;

-- 15. POLÍTICAS RLS ESTRICTAS
DROP POLICY IF EXISTS tenant_isolation_organizations ON public.organizations;
CREATE POLICY tenant_isolation_organizations ON public.organizations
  FOR ALL USING (id = public.current_tenant_id());

DROP POLICY IF EXISTS tenant_isolation_projects ON public.projects;
CREATE POLICY tenant_isolation_projects ON public.projects
  FOR ALL USING (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS tenant_isolation_briefs ON public.creative_briefs;
CREATE POLICY tenant_isolation_briefs ON public.creative_briefs
  FOR ALL USING (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS tenant_isolation_voices ON public.voice_profiles;
CREATE POLICY tenant_isolation_voices ON public.voice_profiles
  FOR ALL USING (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS tenant_isolation_canonical_assets ON public.canonical_assets;
CREATE POLICY tenant_isolation_canonical_assets ON public.canonical_assets
  FOR ALL USING (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS tenant_isolation_asset_versions ON public.asset_versions;
CREATE POLICY tenant_isolation_asset_versions ON public.asset_versions
  FOR ALL USING (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS tenant_isolation_asset_links ON public.asset_links;
CREATE POLICY tenant_isolation_asset_links ON public.asset_links
  FOR ALL USING (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS tenant_isolation_audit_events ON public.audit_events;
CREATE POLICY tenant_isolation_audit_events ON public.audit_events
  FOR ALL USING (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS tenant_isolation_cost_ledger ON public.cost_ledger;
CREATE POLICY tenant_isolation_cost_ledger ON public.cost_ledger
  FOR ALL USING (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS tenant_isolation_telemetry ON public.usage_telemetry;
CREATE POLICY tenant_isolation_telemetry ON public.usage_telemetry
  FOR ALL USING (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS tenant_isolation_catalog ON public.asset_catalog;
CREATE POLICY tenant_isolation_catalog ON public.asset_catalog
  FOR ALL USING (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS tenant_isolation_leads ON public.crm_leads;
CREATE POLICY tenant_isolation_leads ON public.crm_leads
  FOR ALL USING (tenant_id = public.current_tenant_id());
