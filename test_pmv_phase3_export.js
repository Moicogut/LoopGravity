/**
 * Automated Verification Suite for LoopGravity PMV - Fase 3 (Professional Timeline & Batch Export)
 */

const assert = require('assert');
const {
  TenantService,
  StorageService,
  AssetCatalogService,
  ExportEngine,
  VideoPromptService
} = require('./app.js');

console.log('🧪 Iniciando Suite de Pruebas Automatizadas PMV (Fase 3: Exportador Profesional)...\n');

const tenantService = new TenantService();
const videoService = new VideoPromptService(tenantService, null);
const exportEngine = new ExportEngine();

// Generate a 4-block sequence (40 seconds)
const config = {
  presetKey: 'cake_studio',
  engine: 'google-flow',
  aspectRatio: '16:9',
  characterCount: 2,
  actorName: 'Sofía Coff',
  actorMode: 'image',
  actorImageUrl: 'https://loopgravity.io/assets/model_sheets/sofia_coff_character_sheet.png',
  voiceProfile: 'Voz femenina dulce y apasionada',
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

const sequenceResult = videoService.generateMultiBlockSequence(config, 4);

// --- Test 1: OpenTimelineIO (.otio) Generation ---
console.log('▶ Test 1: Verificando Exportador OpenTimelineIO (OTIO v1)...');
const otioRaw = exportEngine.generateOTIO(sequenceResult, 'My_Cake_Studio_Spot_40s');
assert.ok(otioRaw && typeof otioRaw === 'string', 'El output de OTIO debe ser un string JSON');

const otio = JSON.parse(otioRaw);
assert.strictEqual(otio.OTIO_SCHEMA, 'Timeline.1', 'Debe cumplir con el esquema OTIO Timeline.1');
assert.strictEqual(otio.name, 'My_Cake_Studio_Spot_40s');
assert.strictEqual(otio.tracks.children.length, 3, 'Debe incluir 3 pistas independientes (Video, VO Dialogue, SFX)');

const videoTrack = otio.tracks.children[0];
assert.strictEqual(videoTrack.kind, 'Video');
assert.strictEqual(videoTrack.children.length, 4, 'La pista de video debe contener 4 clips de 10s');
assert.strictEqual(videoTrack.children[0].source_range.duration.value, 240, 'Cada bloque debe durar 240 frames (10s @ 24fps)');

const audioTrackVO = otio.tracks.children[1];
assert.strictEqual(audioTrackVO.kind, 'Audio');
assert.ok(audioTrackVO.children.length >= 4, 'La pista de audio debe contener clips para todos los bloques/beats');
assert.ok(audioTrackVO.children[0].metadata.dialogue_es || audioTrackVO.children[0].metadata.lip_sync_directive, 'Debe contener directivas de diálogo o lip-sync');

console.log('  ✓ [PASS] Exportador OpenTimelineIO (.otio) validado para DaVinci Resolve & Premiere Pro.');

// --- Test 2: Final Cut Pro XML (.fcpxml) Generation ---
console.log('\n▶ Test 2: Verificando Exportador Final Cut Pro XML (FCPXML v1.9)...');
const fcpxml = exportEngine.generateFCPXML(sequenceResult, 'My_Cake_Studio_Spot_40s');
assert.ok(fcpxml.includes('<?xml version="1.0" encoding="UTF-8"?>'), 'Debe incluir encabezado XML');
assert.ok(fcpxml.includes('<fcpxml version="1.9">'), 'Debe usar la versión FCPXML 1.9');
assert.ok(fcpxml.includes('<project name="My_Cake_Studio_Spot_40s">'), 'Debe contener el nombre del proyecto');
assert.ok(fcpxml.includes('duration="960/24s"'), 'La duración total debe ser 960 frames (40s @ 24fps)');
assert.ok(fcpxml.includes('<marker start="0s" duration="240/24s"'), 'Debe insertar marcadores por cada bloque de 10s con prompts y diálogo');

console.log('  ✓ [PASS] Exportador FCPXML validado con marcadores y timecodes exactos.');

// --- Test 3: Production Plan CSV Generation ---
console.log('\n▶ Test 3: Verificando Exportador de Planilla CSV de Producción...');
const csv = exportEngine.generateCSV(sequenceResult);
const lines = csv.split('\r\n').filter(l => l.trim().length > 0);
assert.strictEqual(lines.length, 5, 'Debe contener 1 fila de cabecera y 4 filas de bloques');

const headers = lines[0];
assert.ok(headers.includes('Block Index'));
assert.ok(headers.includes('Lip-Sync Dialogue (ES)'));
assert.ok(headers.includes('Flow Attached Directive'));
assert.ok(headers.includes('Prompt Payload'));

// Verify proper quoting and escaping
assert.ok(lines[1].startsWith('"1"'));
assert.ok(lines[1].includes('Sofía Coff'));

console.log('  ✓ [PASS] Planilla CSV de Producción validada para Excel / Google Sheets.');

// --- Test 4: Technical Shooting Script (Markdown) ---
console.log('\n▶ Test 4: Verificando Generación de Guión Técnico (.md)...');
const mdScript = exportEngine.generateMarkdownScript(sequenceResult, 'My Cake Studio Spot');
assert.ok(mdScript.includes('# Guión Técnico de Producción: My Cake Studio Spot'));
assert.ok(mdScript.includes('**Duración Total:** **40s** (4 Bloques de 10s)'));
assert.ok(mdScript.includes('### ⏱️ Bloque 1 (00:00 - 00:10):'));
assert.ok(mdScript.includes('### ⏱️ Bloque 2 (00:10 - 00:20):'));
assert.ok(mdScript.includes('👄 Diálogo & Lip-Sync'));
assert.ok(mdScript.includes('Prompt Maestro Completo'));

console.log('  ✓ [PASS] Guión técnico cinematográfico Markdown validado.');

console.log('\n======================================================');
console.log('🎉 RESULTADO FASE 3: 4/4 SUITES DE EXPORTACIÓN PASADAS (0 ERRORES).');
console.log('======================================================\n');
