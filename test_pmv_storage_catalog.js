/**
 * Automated Verification Suite for LoopGravity PMV
 * Tests:
 * 1. Multi-Tenant Storage Isolation (StorageService)
 * 2. Project Persistence & Workspace State CRUD
 * 3. Model Sheets Asset Catalog (AssetCatalogService)
 * 4. Video Prompt Engine Multi-Block Continuity & Lip-Sync
 */

const assert = require('assert');
const {
  TenantService,
  StorageService,
  AssetCatalogService,
  VideoPromptService
} = require('./app.js');

console.log('🧪 Iniciando Suite de Pruebas Automatizadas PMV (Fase 1 & Fase 2)...\n');

// --- Test 1: StorageService Multi-Tenant Isolation ---
console.log('▶ Test 1: Verificando Aislamiento Multi-Tenant Estricto...');
const storage = new StorageService();

const tenantA = 'tenant-nexus-01';
const tenantB = 'tenant-apex-02';

// Save project in Tenant A
const projA = storage.saveProject(tenantA, {
  name: 'Nexus AI Ad 40s',
  state: { presetKey: 'saas_demo', blocks: '4' }
});

// Save project in Tenant B
const projB = storage.saveProject(tenantB, {
  name: 'Apex FinTech Spot 20s',
  state: { presetKey: 'saas_property', blocks: '2' }
});

const projectsA = storage.getProjects(tenantA);
const projectsB = storage.getProjects(tenantB);

assert.strictEqual(projectsA.length, 1, 'Tenant A debe tener exactamente 1 proyecto');
assert.strictEqual(projectsA[0].name, 'Nexus AI Ad 40s');
assert.strictEqual(projectsB.length, 1, 'Tenant B debe tener exactamente 1 proyecto');
assert.strictEqual(projectsB[0].name, 'Apex FinTech Spot 20s');
assert.notStrictEqual(projectsA[0].id, projectsB[0].id, 'Los IDs de proyecto deben ser independientes');

// Ensure Tenant A cannot access Tenant B's data
const workspaceA = { actorName: 'Elena Dev', presetKey: 'saas_demo' };
const workspaceB = { actorName: 'Moisés Guti', presetKey: 'saas_property' };

storage.saveWorkspace(tenantA, workspaceA);
storage.saveWorkspace(tenantB, workspaceB);

const loadedA = storage.loadWorkspace(tenantA);
const loadedB = storage.loadWorkspace(tenantB);

assert.strictEqual(loadedA.actorName, 'Elena Dev', 'Workspace A debe recuperar el actor de Tenant A');
assert.strictEqual(loadedB.actorName, 'Moisés Guti', 'Workspace B debe recuperar el actor de Tenant B');
console.log('  ✓ [PASS] Aislamiento Multi-Tenant verificado con éxito (0 fugas de datos entre tenants).');

// --- Test 2: Project CRUD Operations ---
console.log('\n▶ Test 2: Verificando CRUD de Proyectos...');
// Update existing project
projA.name = 'Nexus AI Ad 40s (Final Cut)';
storage.saveProject(tenantA, projA);

const updatedProjectsA = storage.getProjects(tenantA);
assert.strictEqual(updatedProjectsA[0].name, 'Nexus AI Ad 40s (Final Cut)', 'El nombre del proyecto debe actualizarse');

// Delete project
storage.deleteProject(tenantA, projA.id);
const remainingA = storage.getProjects(tenantA);
assert.strictEqual(remainingA.length, 0, 'La lista de proyectos de Tenant A debe estar vacía tras eliminar');
console.log('  ✓ [PASS] Operaciones CRUD de proyectos verificadas al 100%.');

// --- Test 3: AssetCatalogService & Model Sheets Management ---
console.log('\n▶ Test 3: Verificando Biblioteca de Model Sheets & Catálogo...');
const catalog = new AssetCatalogService(storage);

// Verify default seed catalog
const actors = catalog.getItems(tenantA, 'actors');
assert.ok(actors.length >= 3, 'El catálogo de actores debe contener las semillas predeterminadas');
const sofia = actors.find(a => a.name === 'Sofía Coff');
assert.ok(sofia, 'Sofía Coff debe estar en el catálogo de actores');
assert.ok(sofia.voiceProfile.includes('Voz femenina dulce'), 'El perfil de voz debe ser preciso');

// Add custom actor to Tenant A
const customActor = catalog.saveItem(tenantA, 'actors', {
  name: 'Valeria Quantum',
  role: 'AI Researcher',
  imageUrl: 'https://loopgravity.io/assets/model_sheets/valeria_sheet.png',
  description: 'AI Researcher in cyber-lab coat, hazel eyes, sharp analytical smile',
  voiceProfile: 'Voz ejecutiva y calmada, 130 WPM'
});

const updatedActorsA = catalog.getItems(tenantA, 'actors');
const actorsB = catalog.getItems(tenantB, 'actors');

assert.ok(updatedActorsA.some(a => a.name === 'Valeria Quantum'), 'Valeria debe estar en Tenant A');
assert.ok(!actorsB.some(a => a.name === 'Valeria Quantum'), 'Valeria NO debe existir en Tenant B (aislamiento)');

// Retrieve by ID
const foundActor = catalog.getItemById(tenantA, 'actors', customActor.id);
assert.strictEqual(foundActor.name, 'Valeria Quantum');

// Delete custom actor
catalog.deleteItem(tenantA, 'actors', customActor.id);
const postDeleteActors = catalog.getItems(tenantA, 'actors');
assert.ok(!postDeleteActors.some(a => a.name === 'Valeria Quantum'), 'Valeria debe haber sido eliminada');
console.log('  ✓ [PASS] Gestión de Model Sheets y aislamiento por tenant verificado.');

// --- Test 4: VideoPromptService Multi-Block Continuity & Lip-Sync ---
console.log('\n▶ Test 4: Verificando Generación de Video Multi-Bloque con Lip-Sync...');
const tenantService = new TenantService();
const videoService = new VideoPromptService(tenantService, null);

const sequenceConfig = {
  presetKey: 'cake_studio',
  engine: 'google-flow',
  aspectRatio: '16:9',
  characterCount: 2,
  actorName: 'Sofía Coff',
  actorMode: 'image',
  actorImageUrl: 'https://loopgravity.io/assets/model_sheets/sofia_coff_character_sheet.png',
  voiceProfile: 'Voz femenina dulce y elegante',
  actor2Name: 'Moisés Guti',
  actor2Mode: 'image',
  actor2ImageUrl: 'https://loopgravity.io/assets/model_sheets/moises_guti_character_sheet.png',
  voiceProfile2: 'Voz masculina ejecutiva',
  productMode: 'image',
  productImageUrl: 'https://loopgravity.io/assets/model_sheets/my_cake_studio_banner.png',
  envMode: 'image',
  envImageUrl: 'https://loopgravity.io/assets/model_sheets/cake_studio_kitchen.png',
  camera: 'Sony FX9, 50mm Master Prime, Warm Golden Hour, 8K',
  audioBgm: 'Acoustic Guitar, 110 BPM',
  audioSfx: 'Tintineo de campana dulce'
};

const seq = videoService.generateMultiBlockSequence(sequenceConfig, 4);
assert.strictEqual(seq.sequenceBlocks.length, 4, 'Deben generarse 4 bloques de 10s');
assert.strictEqual(seq.payload.total_duration_seconds, 40, 'Duración total debe ser 40s');

// Verify Block 1 has Model Sheet image anchor
const b1 = seq.sequenceBlocks[0];
assert.ok(b1.assembled_prompt.includes('[HR-Personaje 1 (Sofía Coff): Imagen adjunta]'), 'Bloque 1 debe anclar imagen de Sofía');
assert.ok(b1.assembled_prompt.includes('[HR-Personaje 2 (Moisés Guti): Imagen adjunta]'), 'Bloque 1 debe anclar imagen de Moisés');

// Verify Block 2..4 have Video extension anchor to Block N-1
for (let i = 1; i < seq.sequenceBlocks.length; i++) {
  const b = seq.sequenceBlocks[i];
  assert.ok(b.attached_media_directive.includes(`ADJUNTAR VIDEO DEL BLOQUE ${i}`), `Bloque ${i+1} debe referenciar el video renderizado previo`);
  assert.ok(b.continuity_directive.includes(`Extends ending frame & camera vector of Block ${i}`), `Bloque ${i+1} debe contener directiva de extensión continua`);
}

// Verify Lip-Sync Directives in all blocks
seq.sequenceBlocks.forEach((b, idx) => {
  assert.ok(b.lip_sync_directive && b.lip_sync_directive.length > 5, `Bloque ${idx+1} debe contener directiva explícita de Lip-Sync`);
  assert.ok(b.assembled_prompt.includes('Lip-Sync') || b.assembled_prompt.includes('lip movements') || b.assembled_prompt.includes('Diálogo'), `Bloque ${idx+1} debe especificar articulación labial visible`);
});

console.log('  ✓ [PASS] Encadenamiento de video en bloques de 10s y lip-sync verificado al 100%.');

console.log('\n======================================================');
console.log('🎉 RESULTADO: 4/4 SUITES PASADAS CON 0 ERRORES.');
console.log('======================================================\n');
