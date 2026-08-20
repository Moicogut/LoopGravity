/**
 * Automated Verification Suite for LoopGravity Production OS (Phase 2)
 * Validates:
 * 1. Multi-Tenant Isolation for Scripts, Shots, and Storyboards.
 * 2. Strict Locked Canonical Asset Versions per Shot.
 * 3. Storyboard Bounds (3–5 shots, 20.0s – 30.0s total duration).
 * 4. Required Shot Properties (Main Action, Transition Strategy, Narrative Intention).
 * 5. Speech Rate & Locution Limit Validation (<= 2.5 words/second).
 * 6. Gate Security: Unapproved storyboard CANNOT pass to render.
 * 7. Version Bump: Editing an approved storyboard automatically creates a new revision.
 * 8. Official Human Approval Workflow & Gate Unlock.
 * 9. Comprehensive Audit Trail (audit_events logging).
 * 10. Zero Leaked Secrets / Provider Keys.
 */

const assert = require('assert');
const {
  TenantService,
  StorageService,
  SecureStorageService,
  AuditService,
  CanonicalAssetService,
  ProductionOSProjectService,
  CreativeDirectorService
} = require('./app.js');

console.log('🧪 Iniciando Suite de Pruebas Automatizadas: LoopGravity Production OS (Fase 2)...\n');

const storage = new StorageService(null);
const secureStorage = new SecureStorageService('secret_test_key_phase2');
const auditService = new AuditService(storage);
const assetService = new CanonicalAssetService(storage, auditService, secureStorage);
const projectService = new ProductionOSProjectService(storage, assetService, auditService);
const creativeDirector = new CreativeDirectorService(storage, projectService, assetService, auditService);

const TENANT_A = 'tenant_saas_realestate';
const TENANT_B = 'tenant_gourmet_bakery';

// Setup Canonical Assets for Tenant A
const char1A = assetService.createAsset(TENANT_A, {
  assetType: 'character',
  name: 'Rolo Guti',
  description: 'Broker senior en abrigo negro',
  initialImageUrl: 'https://cdn.loopgravity.io/rolo_v1.png',
  userId: 'user_a'
});

const char2A = assetService.createAsset(TENANT_A, {
  assetType: 'character',
  name: 'Sofía RealEstate',
  description: 'Co-host en chaqueta de cuero negra',
  initialImageUrl: 'https://cdn.loopgravity.io/sofia_re_v1.png',
  userId: 'user_a'
});

const prodA = assetService.createAsset(TENANT_A, {
  assetType: 'product',
  name: 'Property OS CRM',
  description: 'Dashboard SaaS de leads inmobiliarios',
  initialImageUrl: 'https://cdn.loopgravity.io/property_os_v1.png',
  userId: 'user_a'
});

const envA = assetService.createAsset(TENANT_A, {
  assetType: 'environment',
  name: 'Oficina Ejecutiva 5600K',
  description: 'Estudio moderno con iluminación difusa 5600K',
  initialImageUrl: 'https://cdn.loopgravity.io/office_studio_v1.png',
  userId: 'user_a'
});

// Setup Project A
const projA = projectService.createProject(TENANT_A, { name: 'Spot Comercial Property OS (24s)' });
projectService.saveDraft(TENANT_A, projA.id, {
  step: 3,
  brief: {
    pitch_text: 'Automatiza tus ventas inmobiliarias y gestiona leads de WhatsApp al instante',
    target_audience: 'Agencias inmobiliarias y brokers',
    cta_text: 'Agenda tu demo gratuita hoy'
  },
  assetLinks: {
    actor_1: { asset_id: char1A.id, version_number: 1 },
    actor_2: { asset_id: char2A.id, version_number: 1 },
    product: { asset_id: prodA.id, version_number: 1 },
    environment: { asset_id: envA.id, version_number: 1 }
  }
});

// --- Test 1: Multi-Tenant Isolation in Scripts & Storyboards ---
console.log('▶ Test 1: Verificando Aislamiento Multi-Tenant en Guiones y Storyboards...');
const resultA = creativeDirector.generateScriptAndStoryboard(TENANT_A, projA.id);
assert.ok(resultA.script, 'Debe generar el guion oficial');
assert.ok(resultA.storyboard, 'Debe generar el storyboard');

const sbTenantA = creativeDirector.getStoryboard(TENANT_A, projA.id);
const sbTenantB = creativeDirector.getStoryboard(TENANT_B, projA.id);

assert.ok(sbTenantA !== null, 'Tenant A debe tener su storyboard');
assert.strictEqual(sbTenantB, null, 'Tenant B NO debe ver el storyboard de Tenant A');
console.log('  ✓ [PASS] Aislamiento Multi-Tenant validado al 100%.');

// --- Test 2: Locked Canonical Asset Versions per Shot ---
console.log('\n▶ Test 2: Verificando que Cada Toma Referencie Versiones Canónicas Explícitas...');
const sb = resultA.storyboard;
sb.shots.forEach((shot, idx) => {
  assert.ok(shot.locked_asset_versions, `Toma ${idx + 1} debe contener locked_asset_versions`);
  if (shot.locked_asset_versions.product) {
    assert.strictEqual(shot.locked_asset_versions.product.version_number, 1, 'Producto debe tener versión explícita');
  }
  if (shot.locked_asset_versions.environment) {
    assert.strictEqual(shot.locked_asset_versions.environment.version_number, 1, 'Ambiente debe tener versión explícita');
  }
});
console.log('  ✓ [PASS] Vínculos de versiones inmutables por toma verificados.');

// --- Test 3: Storyboard Bounds (3–5 shots, 20s–30s total duration) ---
console.log('\n▶ Test 3: Verificando Límites del Storyboard (3 a 5 tomas, 20s a 30s de duración)...');
assert.ok(sb.shots.length >= 3 && sb.shots.length <= 5, `Número de tomas debe ser entre 3 y 5 (actual: ${sb.shots.length})`);
assert.ok(sb.total_duration_seconds >= 20.0 && sb.total_duration_seconds <= 30.0,
  `Duración total debe estar entre 20s y 30s (actual: ${sb.total_duration_seconds}s)`);
console.log(`  ✓ [PASS] Storyboard cumple especificaciones: ${sb.shots.length} tomas, ${sb.total_duration_seconds}s totales.`);

// --- Test 4: Shot Properties & Transition Strategies ---
console.log('\n▶ Test 4: Verificando Intención Narrativa, Acción Visual y Estrategias Editoriales...');
const validStrategies = ['cut', 'b_roll_insert', 'product_insert', 'match_cut', 'dissolve', 'cta_lockup'];
sb.shots.forEach((shot, idx) => {
  assert.ok(shot.narrative_intention && shot.narrative_intention.length > 5, `Toma ${idx + 1} debe tener intención narrativa`);
  assert.ok(shot.main_visual_action && shot.main_visual_action.length > 10, `Toma ${idx + 1} debe tener acción visual principal`);
  assert.ok(validStrategies.includes(shot.transition_strategy), `Toma ${idx + 1} debe tener estrategia de transición válida`);
  assert.ok(shot.shot_classification, `Toma ${idx + 1} debe tener clasificación`);
});
console.log('  ✓ [PASS] Todas las tomas tienen estructura cinematográfica completa y estrategia editorial.');

// --- Test 5: Speech Rate / Locution Limit Validation (<= 2.5 wps) ---
console.log('\n▶ Test 5: Verificando Validación Estricta de Velocidad de Locución (<= 2.5 palabras/s)...');
// Valid dialogue check
const checkValid = creativeDirector.validateSpeechRate('Gestiona tus leads de WhatsApp en un solo clic', 5.0);
assert.strictEqual(checkValid.isValid, true);
assert.ok(checkValid.wps <= 2.5);

// Invalid dialogue check (excessive words for 3 seconds)
const checkInvalid = creativeDirector.validateSpeechRate('Esta es una frase extremadamente larga e imposible de locutar en tan poco tiempo sin que suene apresurado o distorsione la sincronización labial en cámara', 3.0);
assert.strictEqual(checkInvalid.isValid, false);
assert.ok(checkInvalid.wps > 2.5);

// Ensure service rejects invalid dialogue in shot update
assert.throws(() => {
  creativeDirector.updateShot(TENANT_A, projA.id, sb.shots[0].id, {
    dialogue_es: 'Texto larguísimo con demasiadas palabras para saturar la duración de la toma de forma inválida en la locución',
    duration_seconds: 3.0
  });
}, /excede la velocidad de locución permitida/);
console.log('  ✓ [PASS] Filtro de velocidad de locución y cadencia de locución validado.');

// --- Test 6: Gate Check — Unapproved Storyboard CANNOT Render ---
console.log('\n▶ Test 6: Verificando Gate de Seguridad (Storyboard no aprobado bloquea render)...');
const isReadyBeforeApproval = creativeDirector.isReadyForRender(TENANT_A, projA.id);
assert.strictEqual(isReadyBeforeApproval, false, 'Un proyecto con storyboard sin aprobar NO puede avanzar a render');
console.log('  ✓ [PASS] Bloqueo de avance a render antes de aprobación verificado.');

// --- Test 7: Human Approval Workflow & Gate Unlock ---
console.log('\n▶ Test 7: Verificando Flujo de Aprobación Humana y Desbloqueo de Gate...');
const approvalRecord = creativeDirector.approveStoryboard(TENANT_A, projA.id, sb.id, 'director_humano_1', 'Guion y tomas aprobadas al 100%');
assert.strictEqual(approvalRecord.is_ready_for_render, true);

const isReadyAfterApproval = creativeDirector.isReadyForRender(TENANT_A, projA.id);
assert.strictEqual(isReadyAfterApproval, true, 'Tras aprobación humana, el proyecto queda listo para render');

const approvedSb = creativeDirector.getStoryboard(TENANT_A, projA.id);
assert.strictEqual(approvedSb.is_approved, true);
approvedSb.shots.forEach(s => assert.strictEqual(s.status, 'approved'));
console.log('  ✓ [PASS] Aprobación humana oficial registrada y gate de render desbloqueado.');

// --- Test 8: Version Bump on Edit After Approval ---
console.log('\n▶ Test 8: Verificando Creación Automática de Nueva Versión al Editar Storyboard Aprobado...');
// Editing an approved storyboard MUST create Version 2 and reset is_approved to false!
const updatedSbV2 = creativeDirector.updateShot(TENANT_A, projA.id, sb.shots[0].id, {
  dialogue_es: '¿Problemas para cerrar ventas en WhatsApp?'
});

assert.strictEqual(updatedSbV2.version_number, 2, 'Debe crear la Versión 2');
assert.strictEqual(updatedSbV2.is_approved, false, 'La Versión 2 debe nacer sin aprobar');

// Gate must be locked again until new approval!
const isReadyV2BeforeApproval = creativeDirector.isReadyForRender(TENANT_A, projA.id);
assert.strictEqual(isReadyV2BeforeApproval, false, 'La Versión 2 editada bloquea nuevamente el render');

// Approve Version 2
creativeDirector.approveStoryboard(TENANT_A, projA.id, updatedSbV2.id, 'director_humano_1', 'Revisión V2 aprobada');
assert.strictEqual(creativeDirector.isReadyForRender(TENANT_A, projA.id), true);
console.log('  ✓ [PASS] Versionado automático tras edición y protección contra cambios silenciosos garantizados.');

// --- Test 9: Audit Trail Logging ---
console.log('\n▶ Test 9: Verificando Registro de Auditoría de Fase 2 (audit_events)...');
const logs = auditService.getLogs(TENANT_A);
const eventTypes = logs.map(l => l.event_type);

assert.ok(eventTypes.includes('storyboard_created'), 'Debe registrar creación de storyboard');
assert.ok(eventTypes.includes('storyboard_approved'), 'Debe registrar aprobación de storyboard');
assert.ok(eventTypes.includes('storyboard_version_bumped'), 'Debe registrar versionado por edición');
assert.ok(eventTypes.includes('shot_updated'), 'Debe registrar actualización de toma');
console.log('  ✓ [PASS] Trazabilidad completa en audit_events validada.');

// --- Test 10: Zero Secrets & Credentials Leaked ---
console.log('\n▶ Test 10: Verificando Cero Exposición de Secretos o Claves Privadas...');
const fullJson = JSON.stringify(updatedSbV2) + JSON.stringify(logs) + JSON.stringify(approvalRecord);
assert.strictEqual(fullJson.includes('sk-'), false);
assert.strictEqual(fullJson.includes('service_role'), false);
console.log('  ✓ [PASS] Hardening de seguridad y cero exposición de claves.');

console.log('\n======================================================');
console.log('🎉 RESULTADO FASE 2: 10/10 SUITES CREATIVE DIRECTOR PASADAS (0 ERRORES).');
console.log('======================================================\n');
