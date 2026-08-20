-- ==============================================================================
-- SCRIPT DE VERIFICACIÓN DE TRANSICIÓN: PMV A PRODUCTION OS (READ-ONLY)
-- Archivo: supabase/migrations/20260820_verify_production_os_transition.sql
-- Repositorio: https://github.com/Moicogut/LoopGravity
-- Proyecto Supabase: https://bsftifcgyuaubmachzvi.supabase.co
-- ==============================================================================
-- OBJETIVO:
-- Auditoría 100% de solo lectura que valida:
-- 1. Preservación íntegra de las 5 tablas del PMV.
-- 2. Creación completa de las nuevas entidades de Production OS (Fases 1, 2 y 3).
-- 3. Habilitación de Row Level Security (RLS) en todas las tablas.
-- 4. Existencia de las políticas RLS previas y nuevas.
-- 5. Sincronización de los 3 tenants oficiales (tenant-nexus-01, tenant-apex-02, tenant-solo-03).
-- 6. Ausencia de huérfanos o violaciones de integridad referencial.
-- ==============================================================================

-- 1. VERIFICACIÓN DE EXISTENCIA DE TABLAS PMV Y PRODUCTION OS
SELECT 
  table_name,
  CASE 
    WHEN table_name IN ('tenants', 'projects', 'asset_catalog', 'crm_leads', 'usage_telemetry') THEN 'PMV Legacy'
    ELSE 'Production OS (Fase 1-3)'
  END AS origen_entidad,
  EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = t.table_name
  ) AS tabla_existe
FROM (
  VALUES 
    -- Tablas PMV
    ('tenants'),
    ('projects'),
    ('asset_catalog'),
    ('crm_leads'),
    ('usage_telemetry'),
    -- Tablas Production OS
    ('organizations'),
    ('users'),
    ('organization_members'),
    ('creative_briefs'),
    ('voice_profiles'),
    ('canonical_assets'),
    ('asset_versions'),
    ('asset_links'),
    ('audit_events'),
    ('cost_ledger'),
    ('scripts'),
    ('script_versions'),
    ('scenes'),
    ('shots'),
    ('shot_asset_links'),
    ('storyboard_versions'),
    ('storyboard_approvals'),
    ('idempotency_keys'),
    ('provider_credentials'),
    ('render_cost_estimates'),
    ('render_jobs'),
    ('render_attempts'),
    ('generated_media'),
    ('provider_webhook_events')
) AS t(table_name)
ORDER BY origen_entidad, table_name;

-- 2. VERIFICACIÓN DE ESTADO RLS EN TODAS LAS TABLAS PÚBLICAS
SELECT 
  relname AS nombre_tabla,
  rowsecurity AS rls_habilitado,
  CASE WHEN rowsecurity THEN 'PASS' ELSE 'FAIL (RLS Inactivo)' END AS diagnostico_rls
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' 
  AND c.relkind = 'r'
  AND relname IN (
    'tenants', 'projects', 'asset_catalog', 'crm_leads', 'usage_telemetry',
    'organizations', 'users', 'organization_members', 'creative_briefs',
    'voice_profiles', 'canonical_assets', 'asset_versions', 'asset_links',
    'audit_events', 'cost_ledger', 'scripts', 'script_versions', 'scenes',
    'shots', 'shot_asset_links', 'storyboard_versions', 'storyboard_approvals',
    'idempotency_keys', 'provider_credentials', 'render_cost_estimates',
    'render_jobs', 'render_attempts', 'generated_media', 'provider_webhook_events'
  )
ORDER BY nombre_tabla;

-- 3. AUDITORÍA DE POLÍTICAS RLS (EXISTENCIA DE POLÍTICAS PMV Y NUEVAS)
SELECT 
  tablename AS tabla,
  policyname AS nombre_politica,
  cmd AS operacion,
  CASE 
    WHEN policyname LIKE 'tenant_isolation_%' THEN 'PASS (Aislamiento Estricto)'
    ELSE 'REVISAR'
  END AS estado_politica
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 4. VERIFICACIÓN DE SINCRONIZACIÓN DE TENANTS A ORGANIZACIONES
SELECT 
  t.id AS tenant_id_pmv,
  t.name AS nombre_tenant,
  o.id AS org_id_production_os,
  o.credit_balance_cents AS saldo_credito,
  o.reserved_credit_cents AS saldo_reservado,
  CASE 
    WHEN o.id IS NOT NULL THEN 'SINCRONIZADO OK' 
    ELSE 'FAIL (No sincronizado)' 
  END AS estado_sincronizacion
FROM public.tenants t
LEFT JOIN public.organizations o ON t.id = o.id
WHERE t.id IN ('tenant-nexus-01', 'tenant-apex-02', 'tenant-solo-03');

-- 5. AUDITORÍA DE CONTEO Y PRESERVACIÓN DE REGISTROS
SELECT 
  'tenants' AS tabla, COUNT(*) AS total_filas FROM public.tenants
UNION ALL
SELECT 'projects', COUNT(*) FROM public.projects
UNION ALL
SELECT 'asset_catalog', COUNT(*) FROM public.asset_catalog
UNION ALL
SELECT 'canonical_assets', COUNT(*) FROM public.canonical_assets
UNION ALL
SELECT 'crm_leads', COUNT(*) FROM public.crm_leads
UNION ALL
SELECT 'usage_telemetry', COUNT(*) FROM public.usage_telemetry
UNION ALL
SELECT 'organizations', COUNT(*) FROM public.organizations;

-- 6. VERIFICACIÓN DE INTEGRIDAD REFERENCIAL (HÚERFANOS / FK BROKEN)
SELECT 
  'asset_links -> projects' AS relacion_auditada,
  COUNT(*) AS total_huerfanos
FROM public.asset_links al
LEFT JOIN public.projects p ON al.project_id = p.id
WHERE p.id IS NULL
UNION ALL
SELECT 
  'scripts -> projects',
  COUNT(*)
FROM public.scripts s
LEFT JOIN public.projects p ON s.project_id = p.id
WHERE p.id IS NULL
UNION ALL
SELECT 
  'render_jobs -> projects',
  COUNT(*)
FROM public.render_jobs rj
LEFT JOIN public.projects p ON rj.project_id = p.id
WHERE p.id IS NULL;
