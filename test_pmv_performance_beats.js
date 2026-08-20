/**
 * Automated Verification Suite for LoopGravity PMV - Video Performance Engine
 * Validates: Multi-Character Performance Beats, Cross-Dialogue, Co-Star Reactions, N-1 Continuity, and Exports.
 */

const assert = require('assert');
const {
  TenantService,
  StorageService,
  ExportEngine,
  VideoPromptService
} = require('./app.js');

console.log('🧪 Iniciando Suite de Pruebas Automatizadas PMV (Video Performance Engine & Multi-Beat)...\n');

const tenantService = new TenantService();
const storageService = new StorageService(null);
const exportEngine = new ExportEngine();
const promptService = new VideoPromptService(tenantService, null);

// Generate a 3-block (30s) spot with Sofía Coff & Moisés Guti
const config = {
  presetKey: 'cake_studio',
  characterCount: 2,
  actorName: 'Sofía Coff',
  actor2Name: 'Moisés Guti',
  engine: 'google-flow',
  aspectRatio: '16:9'
};

const sequenceResult = promptService.generateMultiBlockSequence(config, 3);
const { sequenceBlocks } = sequenceResult;

// --- Test 1: Validate Multi-Beat Structure (>= 2 beats per block) ---
console.log('▶ Test 1: Verificando Estructura Multi-Beat en Bloques de 10s...');
assert.strictEqual(sequenceBlocks.length, 3, 'Deben generarse 3 bloques de 10s');

sequenceBlocks.forEach((block, idx) => {
  assert.ok(block.performance_beats, `Bloque ${idx + 1} debe contener el arreglo performance_beats`);
  assert.ok(Array.isArray(block.performance_beats), `performance_beats debe ser un arreglo en Bloque ${idx + 1}`);
  assert.ok(block.performance_beats.length >= 2, `Bloque ${idx + 1} debe tener como mínimo 2 beats para 2 actores`);
});
console.log('  ✓ [PASS] Cada bloque de 10s contiene >= 2 performance_beats.');

// --- Test 2: Validate Active Participation of Both Actors ---
console.log('\n▶ Test 2: Verificando Participación Activa de Todos los Actores en Cada Bloque...');
sequenceBlocks.forEach((block, idx) => {
  const actorsInBlock = block.performance_beats.map(b => b.actor);
  assert.ok(actorsInBlock.includes('Sofía Coff'), `Sofía Coff debe participar en el Bloque ${idx + 1}`);
  assert.ok(actorsInBlock.includes('Moisés Guti'), `Moisés Guti debe participar en el Bloque ${idx + 1}`);
  
  // Verify that both actors have dialogue and physical actions
  block.performance_beats.forEach(beat => {
    assert.ok(beat.dialogue_es && beat.dialogue_es.length > 5, `El beat ${beat.beat_index} de ${beat.actor} debe tener diálogo`);
    assert.ok(beat.physical_action && beat.physical_action.length > 5, `El beat ${beat.beat_index} de ${beat.actor} debe tener acción física`);
  });
});
console.log('  ✓ [PASS] Ambos personajes (Sofía y Moisés) participan activamente en los 3 bloques.');

// --- Test 3: Validate Directives (Emotion, Eyeline, Listener Reaction) ---
console.log('\n▶ Test 3: Verificando Directivas de Emoción, Mirada y Reacción del Coprotagonista...');
sequenceBlocks.forEach((block, idx) => {
  block.performance_beats.forEach(beat => {
    assert.ok(beat.emotion, `Beat ${beat.beat_index} debe tener emoción declarada`);
    assert.ok(beat.eyeline_direction, `Beat ${beat.beat_index} debe tener dirección de mirada`);
    assert.ok(beat.listener_reaction, `Beat ${beat.beat_index} debe tener reacción del coprotagonista`);
    assert.ok(beat.listener_reaction.includes('Sofía') || beat.listener_reaction.includes('Moisés'),
      `La reacción debe involucrar activamente al coprotagonista`);
  });
});
console.log('  ✓ [PASS] Directivas de emoción, mirada y escucha activa validadas al 100%.');

// --- Test 4: Duration Sum Check (10.0s ± 0.25s per block) ---
console.log('\n▶ Test 4: Verificando Suma de Duración de Beats (10.0s ± 0.25s)...');
sequenceBlocks.forEach((block, idx) => {
  const totalDuration = block.performance_beats.reduce((acc, b) => acc + (b.estimated_duration_seconds || 0), 0);
  assert.ok(Math.abs(totalDuration - 10.0) <= 0.25, 
    `Bloque ${idx + 1} la suma de duraciones debe ser 10.0s ± 0.25s (actual: ${totalDuration}s)`);
});
console.log('  ✓ [PASS] Cada bloque suma exactamente 10.0s de actuación.');

// --- Test 5: N-1 Continuity Lock for Blocks 2..N ---
console.log('\n▶ Test 5: Verificando Anclaje y Continuidad N-1 en Bloques 2 y 3...');
assert.strictEqual(sequenceBlocks[0].attached_media_directive, '', 'Bloque 1 es master inicial sin media previa');
assert.ok(sequenceBlocks[1].attached_media_directive.includes('ADJUNTAR VIDEO DEL BLOQUE 1'), 'Bloque 2 debe adjuntar Bloque 1');
assert.ok(sequenceBlocks[2].attached_media_directive.includes('ADJUNTAR VIDEO DEL BLOQUE 2'), 'Bloque 3 debe adjuntar Bloque 2');

assert.ok(sequenceBlocks[1].assembled_prompt.includes('ADJUNTAR VIDEO DEL BLOQUE 1'));
assert.ok(sequenceBlocks[2].assembled_prompt.includes('ADJUNTAR VIDEO DEL BLOQUE 2'));
console.log('  ✓ [PASS] Cadena de extensión N-1 verificada.');

// --- Test 6: Prompt Prohibitions & Interaction Rules ---
console.log('\n▶ Test 6: Verificando Reglas de Interacción y Prohibición de Voice-Over...');
sequenceBlocks.forEach((block, idx) => {
  const prompt = block.assembled_prompt;
  assert.ok(prompt.includes('STRICTLY NO voice-over'), 'Debe prohibir voice-over');
  assert.ok(prompt.includes('NO frozen actors'), 'Debe prohibir actores congelados');
  assert.ok(prompt.includes('NO static mannequin poses'), 'Debe prohibir poses de maniquí');
  assert.ok(prompt.includes('Bi-directional active engagement'), 'Debe exigir interacción bidireccional');
  assert.ok(prompt.includes('MULTI-ACTOR PERFORMANCE'), 'Debe incluir desglose de beats');
});
console.log('  ✓ [PASS] Prompt Assembler blindado contra personajes estáticos y voz en off.');

// --- Test 7: ExportEngine Verification with Multi-Beat Data ---
console.log('\n▶ Test 7: Verificando Exportadores (OTIO, FCPXML, CSV, Markdown) con Performance Beats...');

// OTIO
const otioStr = exportEngine.generateOTIO(sequenceResult, 'MyCakeStudio_Spot');
const otioJson = JSON.parse(otioStr);
assert.ok(otioJson.tracks.children[1].children.length >= 6, 'OTIO Track de Audio debe contener al menos 6 clips de beats para 3 bloques');
assert.ok(otioStr.includes('Sofía_Coff_Beat1'), 'OTIO debe contener clip de audio de Sofía');
assert.ok(otioStr.includes('Moisés_Guti_Beat2'), 'OTIO debe contener clip de audio de Moisés');

// FCPXML
const fcpxml = exportEngine.generateFCPXML(sequenceResult, 'MyCakeStudio_Spot');
assert.ok(fcpxml.includes('Beat 1 - Sofía Coff'), 'FCPXML debe contener marcadores de Beat 1');
assert.ok(fcpxml.includes('Beat 2 - Moisés Guti'), 'FCPXML debe contener marcadores de Beat 2');
assert.ok(fcpxml.includes('Listener Reaction:'), 'FCPXML debe documentar notas de reacción');

// CSV
const csv = exportEngine.generateCSV(sequenceResult);
assert.ok(csv.includes('Performance Beats (Multi-Actor)'), 'CSV debe contener cabecera de performance beats');
assert.ok(csv.includes('Listener Reactions'), 'CSV debe contener cabecera de listener reactions');
assert.ok(csv.includes('Sofía Coff'), 'CSV debe contener registros de Sofía');
assert.ok(csv.includes('Moisés Guti'), 'CSV debe contener registros de Moisés');

// Markdown
const md = exportEngine.generateMarkdownScript(sequenceResult, 'MyCakeStudio_Spot');
assert.ok(md.includes('Desglose de Performance Beats (Multi-Actor)'), 'Markdown debe incluir sección de beats');
assert.ok(md.includes('Reacción del Coprotagonista:'), 'Markdown debe detallar reacciones de coprotagonista');

console.log('  ✓ [PASS] ExportEngine genera OTIO, FCPXML, CSV y Markdown con soporte multi-beat al 100%.');

console.log('\n======================================================');
console.log('🎉 RESULTADO: 7/7 SUITES PERFORMANCE ENGINE PASADAS (0 ERRORES).');
console.log('======================================================\n');
