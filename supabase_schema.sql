-- ==============================================================================
-- LOOPGRAVITY SAAS — ESQUEMA RELACIONAL POSTGRESQL & POLÍTICAS RLS (FASE 5)
-- Repositorio: https://github.com/Moicogut/LoopGravity
-- Proyecto Supabase: https://bsftifcgyuaubmachzvi.supabase.co
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. FUNCIÓN DE RESOLUCIÓN DE TENANT DESDE AUTH JWT
-- Extrae tenant_id desde app_metadata o user_metadata del token JWT autenticado
CREATE OR REPLACE FUNCTION auth.current_tenant_id()
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT COALESCE(
    (NULLIF(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' ->> 'tenant_id'),
    (NULLIF(current_setting('request.jwt.claims', true), '')::jsonb -> 'user_metadata' ->> 'tenant_id'),
    NULLIF(current_setting('request.jwt.claim.tenant_id', true), '')
  );
$$;

-- 3. TABLA: TENANTS (Organizaciones)
CREATE TABLE IF NOT EXISTS public.tenants (
  id text PRIMARY KEY,
  name text NOT NULL,
  tier text NOT NULL DEFAULT 'Pro Squad',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4. TABLA: PROJECTS (Proyectos Audiovisuales & Timelines)
CREATE TABLE IF NOT EXISTS public.projects (
  id text PRIMARY KEY,
  tenant_id text NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 5. TABLA: ASSET_CATALOG (Model Sheets de Actores, Productos y Escenarios)
CREATE TABLE IF NOT EXISTS public.asset_catalog (
  id text PRIMARY KEY,
  tenant_id text NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  category text NOT NULL CHECK (category IN ('actors', 'products', 'environments')),
  name text NOT NULL,
  role text,
  gender text,
  image_url text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 6. TABLA: CRM_LEADS (Pipeline de Prospectos & Calificación por IA)
CREATE TABLE IF NOT EXISTS public.crm_leads (
  id text PRIMARY KEY,
  tenant_id text NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
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

-- 7. TABLA: USAGE_TELEMETRY (Registro de Cómputo, Tokens y Costos GPU)
CREATE TABLE IF NOT EXISTS public.usage_telemetry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  video_seconds integer NOT NULL DEFAULT 0,
  tokens integer NOT NULL DEFAULT 0,
  engine text NOT NULL DEFAULT 'google-flow',
  recorded_at timestamptz NOT NULL DEFAULT now()
);

-- 8. ÍNDICES DE ALTO RENDIMIENTO POR TENANT
CREATE INDEX IF NOT EXISTS idx_projects_tenant ON public.projects(tenant_id);
CREATE INDEX IF NOT EXISTS idx_catalog_tenant ON public.asset_catalog(tenant_id, category);
CREATE INDEX IF NOT EXISTS idx_leads_tenant ON public.crm_leads(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_telemetry_tenant ON public.usage_telemetry(tenant_id, recorded_at);

-- 9. HABILITACIÓN DE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_telemetry ENABLE ROW LEVEL SECURITY;

-- 10. POLÍTICAS DE AISLAMIENTO ESTRICTO MULTI-TENANT

-- Tenants: Los usuarios solo pueden ver su propio registro de organización
DROP POLICY IF EXISTS tenant_isolation_tenants ON public.tenants;
CREATE POLICY tenant_isolation_tenants ON public.tenants
  FOR ALL
  USING (id = auth.current_tenant_id() OR auth.current_tenant_id() IS NULL)
  WITH CHECK (id = auth.current_tenant_id());

-- Projects
DROP POLICY IF EXISTS tenant_isolation_projects ON public.projects;
CREATE POLICY tenant_isolation_projects ON public.projects
  FOR ALL
  USING (tenant_id = auth.current_tenant_id())
  WITH CHECK (tenant_id = auth.current_tenant_id());

-- Asset Catalog
DROP POLICY IF EXISTS tenant_isolation_catalog ON public.asset_catalog;
CREATE POLICY tenant_isolation_catalog ON public.asset_catalog
  FOR ALL
  USING (tenant_id = auth.current_tenant_id())
  WITH CHECK (tenant_id = auth.current_tenant_id());

-- CRM Leads
DROP POLICY IF EXISTS tenant_isolation_leads ON public.crm_leads;
CREATE POLICY tenant_isolation_leads ON public.crm_leads
  FOR ALL
  USING (tenant_id = auth.current_tenant_id())
  WITH CHECK (tenant_id = auth.current_tenant_id());

-- Usage Telemetry
DROP POLICY IF EXISTS tenant_isolation_telemetry ON public.usage_telemetry;
CREATE POLICY tenant_isolation_telemetry ON public.usage_telemetry
  FOR ALL
  USING (tenant_id = auth.current_tenant_id())
  WITH CHECK (tenant_id = auth.current_tenant_id());

-- 11. SEMILLAS INICIALES (TENANTS, MODEL SHEETS & LEADS CANÓNICOS)

-- Inserción de Organizaciones
INSERT INTO public.tenants (id, name, tier)
VALUES 
  ('tenant-nexus-01', 'Nexus Media Group', 'Pro Squad'),
  ('tenant-apex-02', 'Apex Studio Pro', 'Enterprise'),
  ('tenant-solo-03', 'Solo Creator Studio', 'Hacker')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, tier = EXCLUDED.tier;

-- Inserción de Model Sheets Iniciales (Nexus Media)
INSERT INTO public.asset_catalog (id, tenant_id, category, name, role, gender, image_url, description)
VALUES
  ('actor_sofia_coff_nexus', 'tenant-nexus-01', 'actors', 'Sofía Coff', 'Pastry Chef & Host', 'female', 'https://loopgravity.io/assets/model_sheets/sofia_coff_character_sheet.png', 'Latina female pastry chef / host, late 20s, elegant dark wavy hair in stylish bun'),
  ('actor_moises_guti_nexus', 'tenant-nexus-01', 'actors', 'Moisés Guti', 'Executive Producer & Co-Host', 'male', 'https://loopgravity.io/assets/model_sheets/moises_guti_character_sheet.png', 'Hispanic male executive, early 30s, sharp tailored navy blazer, modern trimmed beard'),
  ('prod_cake_studio_nexus', 'tenant-nexus-01', 'products', 'My Cake Studio Pastry Line', 'Artisanal Dessert Collection', NULL, 'https://loopgravity.io/assets/model_sheets/my_cake_studio_banner.png', 'Orthographic reference views of artisanal cakes and pastry toppings'),
  ('env_cake_kitchen_nexus', 'tenant-nexus-01', 'environments', 'Pastel Bakery Studio', 'Production Kitchen Set', NULL, 'https://loopgravity.io/assets/model_sheets/cake_studio_kitchen.png', 'Sun-drenched modern commercial kitchen set with warm oak countertops')
ON CONFLICT (id) DO NOTHING;

-- Inserción de Model Sheets Iniciales (Apex Studio Pro)
INSERT INTO public.asset_catalog (id, tenant_id, category, name, role, gender, image_url, description)
VALUES
  ('actor_david_ai_apex', 'tenant-apex-02', 'actors', 'David AI Architect', 'Lead AI Engineer', 'male', 'https://loopgravity.io/assets/model_sheets/david_ai_sheet.png', 'Senior AI researcher, casual tech hoodie, wireframe glasses'),
  ('actor_elena_dev_apex', 'tenant-apex-02', 'actors', 'Elena Developer', 'Full-Stack Director', 'female', 'https://loopgravity.io/assets/model_sheets/elena_dev_sheet.png', 'Software engineer, smart casual attire, dark blazer'),
  ('prod_property_os_apex', 'tenant-apex-02', 'products', 'Property OS Suite', 'Enterprise PropTech App', NULL, 'https://loopgravity.io/assets/model_sheets/property_os_banner.png', 'High-res UI tokens of mobile property manager dashboard'),
  ('env_apex_suite_apex', 'tenant-apex-02', 'environments', 'Apex Executive Suite', 'Modern Corporate Loft', NULL, 'https://loopgravity.io/assets/model_sheets/apex_office.png', 'Futuristic skyline boardroom with cyan neon accents and frosted glass')
ON CONFLICT (id) DO NOTHING;

-- Inserción de Leads Iniciales
INSERT INTO public.crm_leads (id, tenant_id, name, email, company, plan_interest, deal_value, status, lead_score, source, notes)
VALUES
  ('lead_nex_01', 'tenant-nexus-01', 'Carlos Mendoza', 'carlos@agenciamarketing.com', 'Nexus Media Agency', 'Pro Squad', 588, 'won', 94, 'Landing Early Access', 'Interesado en generación de videos de 10s y pipelines agénticos.'),
  ('lead_nex_02', 'tenant-nexus-01', 'María Fernández', 'maria@studiodesign.io', 'Studio Design Lab', 'Pro Squad', 588, 'demo_scheduled', 88, 'Video Studio Demo', 'Requiere integración con Google Flow y DaVinci Resolve (OTIO).'),
  ('lead_apx_01', 'tenant-apex-02', 'Guillermo Ramos', 'gramos@apexcapital.com', 'Apex Capital Partners', 'Enterprise', 4800, 'won', 98, 'Enterprise Contact', 'Contrato corporativo anual con SLA dedicado y sandbox privado.')
ON CONFLICT (id) DO NOTHING;
