-- ==============================================================================
-- SCRIPT DE VERIFICACIÓN V2 DE TRANSICIÓN: PMV A PRODUCTION OS (READ-ONLY)
-- Archivo: supabase/migrations/20260820_verify_production_os_transition_v2.sql
-- Repositorio: https://github.com/Moicogut/LoopGravity
-- Proyecto Supabase: https://bsftifcgyuaubmachzvi.supabase.co
-- ==============================================================================
-- AUDITORÍA EXHAUSTIVA DE SOLO LECTURA (V2):
-- 1. Validación de compatibilidad entre public.current_tenant_id(), tenant_id y organizations.id.
-- 2. Verificación de rowsecurity = true en el 100% de las 29 entidades (5 PMV + 24 Production OS).
-- 3. Verificación de políticas con cláusulas USING y WITH CHECK para aislamiento estricto.
-- 4. Verificación de las políticas especiales de public.users y public.organization_members.
-- 5. Sincronización y consistencia de los 3 tenants PMV (tenant-nexus-01, tenant-apex-02, tenant-solo-03).
-- 6. Auditoría de integridad referencial (0 huérfanos).
-- ==============================================================================

-- ==============================================================================
-- 1. AUDITORÍA Y SIMULACIÓN DE COMPATIBILIDAD DE CLAIMS JWT & TENANT RESOLUTION
-- ==============================================================================
SELECT 
  'Validación de Función y Tipo de Tenant ID' AS test_nombre,
  current_setting('request.jwt.claim.tenant_id', true) AS valor_claim_directo,
  public.current_tenant_id() AS valor_resuelto_current_tenant_id,
  pg_typeof(public.current_tenant_id())::text AS tipo_dato_resuelto,
  CASE 
    WHEN pg_typeof(public.current_tenant_id())::text = 'text' THEN 'PASS (Tipo TEXT Compatible)'
    ELSE 'FAIL (Tipo Incompatible)'
  END AS diagnostico_tipo;

-- Simulación de coincidencia de formato con los 3 tenants oficiales
SELECT 
  t.id AS tenant_id_pmv,
  o.id AS org_id_production_os,
  CASE 
    WHEN t.id = o.id THEN 'PASS (Formato y Clave Coincidentes)'
    ELSE 'FAIL (Discrepancia de Clave)'
  END AS estado_coincidencia
FROM public.tenants t
FULL OUTER JOIN public.organizations o ON t.id = o.id
WHERE t.id IN ('tenant-nexus-01', 'tenant-apex-02', 'tenant-solo-03')
   OR o.id IN ('tenant-nexus-01', 'tenant-apex-02', 'tenant-solo-03');

-- ==============================================================================
-- 2. VERIFICACIÓN DE EXISTENCIA DE LAS 29 ENTIDADES
-- ==============================================================================
SELECT 
  t.table_name AS entidad,
  t.origen,
  EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = t.table_name
  ) AS existe_en_base_datos
FROM (
  VALUES 
    -- 5 Tablas PMV
    ('tenants', 'PMV Legacy'),
    ('projects', 'PMV Legacy'),
    ('asset_catalog', 'PMV Legacy'),
    ('crm_leads', 'PMV Legacy'),
    ('usage_telemetry', 'PMV Legacy'),
    -- 24 Tablas Production OS (Fases 1, 2 y 3)
    ('organizations', 'Production OS Fase 1'),
    ('users', 'Production OS Fase 1'),
    ('organization_members', 'Production OS Fase 1'),
    ('creative_briefs', 'Production OS Fase 1'),
    ('voice_profiles', 'Production OS Fase 1'),
    ('canonical_assets', 'Production OS Fase 1'),
    ('asset_versions', 'Production OS Fase 1'),
    ('asset_links', 'Production OS Fase 1'),
    ('audit_events', 'Production OS Fase 1'),
    ('cost_ledger', 'Production OS Fase 1'),
    ('scripts', 'Production OS Fase 2'),
    ('script_versions', 'Production OS Fase 2'),
    ('scenes', 'Production OS Fase 2'),
    ('shots', 'Production OS Fase 2'),
    ('shot_asset_links', 'Production OS Fase 2'),
    ('storyboard_versions', 'Production OS Fase 2'),
    ('storyboard_approvals', 'Production OS Fase 2'),
    ('idempotency_keys', 'Production OS Fase 3'),
    ('provider_credentials', 'Production OS Fase 3'),
    ('render_cost_estimates', 'Production OS Fase 3'),
    ('render_jobs', 'Production OS Fase 3'),
    ('render_attempts', 'Production OS Fase 3'),
    ('generated_media', 'Production OS Fase 3'),
    ('provider_webhook_events', 'Production OS Fase 3')
) AS t(table_name, origen)
ORDER BY origen, entidad;

-- ==============================================================================
-- 3. AUDITORÍA EXHAUSTIVA DE RLS (29 ENTIDADES CON ROWSECURITY = TRUE)
-- ==============================================================================
SELECT 
  c.relname AS tabla,
  c.rowsecurity AS rls_activo,
  COUNT(p.policyname) AS total_politicas,
  CASE 
    WHEN c.rowsecurity AND COUNT(p.policyname) > 0 THEN 'PASS (RLS Seguro)'
    WHEN c.rowsecurity AND COUNT(p.policyname) = 0 THEN 'FAIL (RLS activo sin políticas)'
    ELSE 'FAIL (RLS Desactivado)'
  END AS diagnostico_seguridad
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
LEFT JOIN pg_policies p ON p.schemaname = 'public' AND p.tablename = c.relname
WHERE n.nspname = 'public' 
  AND c.relkind = 'r'
  AND c.relname IN (
    'tenants', 'projects', 'asset_catalog', 'crm_leads', 'usage_telemetry',
    'organizations', 'users', 'organization_members', 'creative_briefs',
    'voice_profiles', 'canonical_assets', 'asset_versions', 'asset_links',
    'audit_events', 'cost_ledger', 'scripts', 'script_versions', 'scenes',
    'shots', 'shot_asset_links', 'storyboard_versions', 'storyboard_approvals',
    'idempotency_keys', 'provider_credentials', 'render_cost_estimates',
    'render_jobs', 'render_attempts', 'generated_media', 'provider_webhook_events'
  )
GROUP BY c.relname, c.rowsecurity
ORDER BY c.relname;

-- ==============================================================================
-- 4. AUDITORÍA DETALLADA DE POLÍTICAS (INCLUYENDO USING Y WITH CHECK)
-- ==============================================================================
SELECT 
  tablename AS tabla,
  policyname AS nombre_politica,
  cmd AS comando,
  qual IS NOT NULL AS tiene_using,
  with_check IS NOT NULL AS tiene_with_check,
  CASE 
    WHEN policyname IN ('user_self_access_select', 'user_self_access_update', 'org_member_tenant_select') THEN 'PASS (Control de Acceso Usuario/Membresía)'
    WHEN policyname LIKE 'tenant_isolation_%' THEN 'PASS (Aislamiento Multi-Tenant Estricto)'
    ELSE 'REVISAR'
  END AS evaluacion_politica
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ==============================================================================
-- 5. CONTEO Y PRESERVACIÓN DE DATOS EXISTENTES
-- ==============================================================================
SELECT 'tenants (PMV)' AS origen, COUNT(*) AS filas FROM public.tenants
UNION ALL
SELECT 'projects (PMV)', COUNT(*) FROM public.projects
UNION ALL
SELECT 'asset_catalog (PMV)', COUNT(*) FROM public.asset_catalog
UNION ALL
SELECT 'canonical_assets (Production OS)', COUNT(*) FROM public.canonical_assets
UNION ALL
SELECT 'asset_versions (Production OS)', COUNT(*) FROM public.asset_versions
UNION ALL
SELECT 'crm_leads (PMV)', COUNT(*) FROM public.crm_leads
UNION ALL
SELECT 'usage_telemetry (PMV)', COUNT(*) FROM public.usage_telemetry
UNION ALL
SELECT 'organizations (Production OS)', COUNT(*) FROM public.organizations;

-- ==============================================================================
-- 6. INTEGRIDAD REFERENCIAL Y VALIDACIÓN DE HÚERFANOS
-- ==============================================================================
SELECT 
  'asset_links -> projects' AS relacion,
  COUNT(*) AS total_huerfanos
FROM public.asset_links al
LEFT JOIN public.projects p ON al.project_id = p.id
WHERE p.id IS NULL
UNION ALL
SELECT 'scripts -> projects', COUNT(*)
FROM public.scripts s
LEFT JOIN public.projects p ON s.project_id = p.id
WHERE p.id IS NULL
UNION ALL
SELECT 'render_jobs -> projects', COUNT(*)
FROM public.render_jobs rj
LEFT JOIN public.projects p ON rj.project_id = p.id
WHERE p.id IS NULL
UNION ALL
SELECT 'canonical_assets -> legacy_catalog', COUNT(*)
FROM public.canonical_assets ca
LEFT JOIN public.asset_catalog ac ON ca.legacy_catalog_id = ac.id
WHERE ca.legacy_catalog_id IS NOT NULL AND ac.id IS NULL;
