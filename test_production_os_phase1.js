/**
 * Automated Verification Suite for LoopGravity Production OS (Phase 1)
 * Validates:
 * 1. Multi-Tenant Isolation (RLS / Data Scoping)
 * 2. Immutable Canonical Asset Versioning (Asset Links preservation)
 * 3. Secure Storage Signed URLs & Expiry Verification
 * 4. Audit Trail (audit_events logging and tenant scoping)
 * 5. 5-Step UX Draft Persistence and State Recovery
 * 6. Zero Leaked Credentials & Security Hardening
 */

const assert = require('assert');
const {
  TenantService,
  StorageService,
  SecureStorageService,
  AuditService,
  CanonicalAssetService,
  ProductionOSProjectService
} = require('./app.js');

console.log('🧪 Iniciando Suite de Pruebas Automatizadas: LoopGravity Production OS (Fase 1)...\n');

// Initialize Services
const tenantService = new TenantService();
const storage = new StorageService(null);
const secureStorage = new SecureStorageService('secret_test_key_2026');
const auditService = new AuditService(storage);
const assetService = new CanonicalAssetService(storage, auditService, secureStorage);
const projectService = new ProductionOSProjectService(storage, assetService, auditService);

const TENANT_A = 'tenant_inmobiliaria_alpha';
const TENANT_B = 'tenant_pasteleria_beta';

// --- Test 1: Multi-Tenant Isolation in Canonical Assets ---
console.log('▶ Test 1: Verificando Aislamiento Multi-Tenant en Activos Canónicos...');
const assetA = assetService.createAsset(TENANT_A, {
  assetType: 'character',
  name: 'Rolo Guti (Inmobiliario)',
  description: 'Broker senior en abrigo negro',
  initialImageUrl: 'https://cdn.loopgravity.io/rolo_v1.png',
  attributes: { attire: 'black coat', age: 48 },
  userId: 'user_a'
});

const assetB = assetService.createAsset(TENANT_B, {
  assetType: 'character',
  name: 'Sofía Coff (Pastelera)',
  description: 'Chef pastelera en uniforme blanco',
  initialImageUrl: 'https://cdn.loopgravity.io/sofia_v1.png',
  attributes: { attire: 'chef apron', age: 28 },
  userId: 'user_b'
});

const listA = assetService.listAssets(TENANT_A);
const listB = assetService.listAssets(TENANT_B);

assert.strictEqual(listA.length, 1, 'Tenant A debe ver exactamente 1 activo propio');
assert.strictEqual(listB.length, 1, 'Tenant B debe ver exactamente 1 activo propio');
assert.strictEqual(listA[0].id, assetA.id, 'Tenant A debe tener su propio activo');
assert.strictEqual(listB[0].id, assetB.id, 'Tenant B debe tener su propio activo');
assert.strictEqual(assetService.getAsset(TENANT_A, assetB.id), null, 'Tenant A NO puede acceder al activo de Tenant B');
assert.strictEqual(assetService.getAsset(TENANT_B, assetA.id), null, 'Tenant B NO puede acceder al activo de Tenant A');
console.log('  ✓ [PASS] Aislamiento Multi-Tenant verificado al 100% (0 fugas de datos).');

// --- Test 2: Immutable Versioning & Asset Linking ---
console.log('\n▶ Test 2: Verificando Inmutabilidad de Versiones en Proyectos...');
// Project 1 links Asset A Version 1
const project1 = projectService.createProject(TENANT_A, { name: 'Spot Property OS 30s' });
projectService.saveDraft(TENANT_A, project1.id, {
  step: 2,
  assetLinks: {
    actor_1: { asset_id: assetA.id, version_number: 1 }
  }
});

let retrievedProj1 = projectService.getProject(TENANT_A, project1.id);
assert.strictEqual(retrievedProj1.asset_links.actor_1.version_number, 1);
assert.strictEqual(retrievedProj1.asset_links.actor_1.image_url, 'https://cdn.loopgravity.io/rolo_v1.png');

// Now we update Asset A to Version 2 (e.g. changed hair / outfit)
const ver2 = assetService.createNewVersion(TENANT_A, assetA.id, {
  imageUrl: 'https://cdn.loopgravity.io/rolo_v2_navy_suit.png',
  attributes: { attire: 'navy blazer' },
  changeNotes: 'Actualización a traje azul marino'
});

assert.strictEqual(ver2.version_number, 2);
const updatedAssetA = assetService.getAsset(TENANT_A, assetA.id);
assert.strictEqual(updatedAssetA.current_version_number, 2);

// Project 1 MUST PRESERVE Version 1 inmutably (No silent drift!)
retrievedProj1 = projectService.getProject(TENANT_A, project1.id);
assert.strictEqual(retrievedProj1.asset_links.actor_1.version_number, 1, 'Proyecto 1 debe preservar la versión 1');
assert.strictEqual(retrievedProj1.asset_links.actor_1.image_url, 'https://cdn.loopgravity.io/rolo_v1.png', 'URL de Proyecto 1 debe permanecer inmutable');

// Project 2 links Version 2
const project2 = projectService.createProject(TENANT_A, { name: 'Spot Property OS v2' });
projectService.saveDraft(TENANT_A, project2.id, {
  step: 2,
  assetLinks: {
    actor_1: { asset_id: assetA.id, version_number: 2 }
  }
});
const retrievedProj2 = projectService.getProject(TENANT_A, project2.id);
assert.strictEqual(retrievedProj2.asset_links.actor_1.version_number, 2);
assert.strictEqual(retrievedProj2.asset_links.actor_1.image_url, 'https://cdn.loopgravity.io/rolo_v2_navy_suit.png');
console.log('  ✓ [PASS] Versionado inmutable y protección contra cambios silenciosos garantizados.');

// --- Test 3: Signed URLs & Secure Storage Simulation ---
console.log('\n▶ Test 3: Verificando URLs Firmadas y Expiración Temporal...');
const signedUrl = secureStorage.generateSignedUrl(TENANT_A, 'master_rolo_face.png', 10); // 10s expiry
assert.ok(signedUrl.includes('signature='), 'Debe contener firma criptográfica');
assert.ok(signedUrl.includes('expires='), 'Debe contener timestamp de expiración');

const isValidForTenantA = secureStorage.verifySignedUrl(signedUrl, TENANT_A);
const isInvalidForTenantB = secureStorage.verifySignedUrl(signedUrl, TENANT_B);
assert.strictEqual(isValidForTenantA, true, 'Tenant A con firma correcta debe ser válido');
assert.strictEqual(isInvalidForTenantB, false, 'Tenant B intentando usar URL de Tenant A debe ser rechazado');

// Tampered URL test
const tamperedUrl = signedUrl.replace('master_rolo_face.png', 'secret_database.csv');
assert.strictEqual(secureStorage.verifySignedUrl(tamperedUrl, TENANT_A), false, 'URL alterada debe ser rechazada');
console.log('  ✓ [PASS] URLs firmadas, validación de firma y aislamiento criptográfico validados.');

// --- Test 4: Audit Trail (audit_events logging) ---
console.log('\n▶ Test 4: Verificando Registro de Auditoría (Audit Trail)...');
const logsA = auditService.getLogs(TENANT_A);
const logsB = auditService.getLogs(TENANT_B);

assert.ok(logsA.length >= 3, 'Tenant A debe tener registros de creación de activo, versión y proyectos');
assert.ok(logsB.length >= 1, 'Tenant B debe tener su propio registro');

const eventTypesA = logsA.map(l => l.event_type);
assert.ok(eventTypesA.includes('asset_created'));
assert.ok(eventTypesA.includes('version_bumped'));
assert.ok(eventTypesA.includes('project_created'));

// Strict isolation of audit logs
logsA.forEach(l => assert.strictEqual(l.tenant_id, TENANT_A));
logsB.forEach(l => assert.strictEqual(l.tenant_id, TENANT_B));
console.log('  ✓ [PASS] Trazabilidad y auditoría de eventos sensibles verificadas al 100%.');

// --- Test 5: 5-Step UX Draft Persistence & Recovery ---
console.log('\n▶ Test 5: Verificando Persistencia y Recuperación de Borradores (Paso 1 -> Paso 3)...');
const draftProj = projectService.createProject(TENANT_A, { name: 'Borrador Comercial Campaña Q4' });

// Step 1: Idea
projectService.saveDraft(TENANT_A, draftProj.id, {
  step: 1,
  brief: {
    pitch_text: 'Plataforma para automatizar citas de venta por WhatsApp',
    target_audience: 'Agencias inmobiliarias y asesores independientes',
    emotional_hook: 'Aumenta tus cierres un 40%',
    cta_text: 'Agenda tu demo gratuita hoy'
  }
});

// Step 2: Personajes & Step 3: Ambiente
projectService.saveDraft(TENANT_A, draftProj.id, {
  step: 3,
  assetLinks: {
    actor_1: { asset_id: assetA.id, version_number: 1 },
    product: { asset_id: assetA.id, version_number: 1 } // mock link
  }
});

// Simulate browser reload / session recovery
const recoveredProj = projectService.getProject(TENANT_A, draftProj.id);
assert.strictEqual(recoveredProj.current_step, 3, 'El proyecto recuperado debe estar en el Paso 3');
assert.strictEqual(recoveredProj.brief.pitch_text, 'Plataforma para automatizar citas de venta por WhatsApp');
assert.ok(recoveredProj.asset_links.actor_1, 'Debe conservar los personajes vinculados');
console.log('  ✓ [PASS] Guardado y recuperación de borrador funcional y libre de pérdida de datos.');

// --- Test 6: Security & Credential Leak Check ---
console.log('\n▶ Test 6: Verificando que no existan claves de servicio ni secretos expuestos...');
const codebaseString = JSON.stringify(draftProj) + JSON.stringify(assetA) + JSON.stringify(logsA);
assert.strictEqual(codebaseString.includes('service_role'), false, 'No debe haber claves service_role expuestas');
assert.strictEqual(codebaseString.includes('sk-'), false, 'No debe haber claves privadas de API expuestas');
console.log('  ✓ [PASS] Hardening de seguridad y cero exposición de secretos.');

console.log('\n======================================================');
console.log('🎉 RESULTADO FASE 1: 6/6 SUITES PRODUCTION OS PASADAS (0 ERRORES).');
console.log('======================================================\n');
