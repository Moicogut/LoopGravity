/**
 * Automated Verification Suite for LoopGravity PMV - Fase 4 (CRM & SaaS Telemetry)
 * Including Security & Audit Hardening Verifications (XSS, CSV Formula Injection, Empty State)
 */

const assert = require('assert');
const {
  escapeHtml,
  TenantService,
  StorageService,
  CrmService
} = require('./app.js');

console.log('🧪 Iniciando Suite de Pruebas Automatizadas PMV (Fase 4: CRM, Analítica SaaS & Hardening)...\n');

const tenantService = new TenantService();
const storageService = new StorageService(null);
const crmService = new CrmService(storageService);

// --- Test 1: Multi-Tenant Lead Isolation ---
console.log('▶ Test 1: Verificando Aislamiento Multi-Tenant en CRM...');
const leadsNexus = crmService.getLeads('tenant-nexus-01');
const leadsApex = crmService.getLeads('tenant-apex-02');
const leadsSolo = crmService.getLeads('tenant-solo-03');

assert.ok(leadsNexus.length >= 3, 'tenant-nexus-01 debe tener leads iniciales');
assert.ok(leadsApex.length >= 2, 'tenant-apex-02 debe tener leads iniciales');
assert.ok(leadsSolo.length >= 1, 'tenant-solo-03 debe tener leads iniciales');

// Verify tenant tags match strictly
leadsNexus.forEach(l => {
  assert.ok(!l.company.includes('Apex Capital'), 'Leads de Apex no deben aparecer en Nexus');
});
leadsApex.forEach(l => {
  assert.ok(!l.company.includes('Nexus Media'), 'Leads de Nexus no deben aparecer en Apex');
});

console.log('  ✓ [PASS] Aislamiento estricto de leads entre tenants verificado (0 fugas de datos).');

// --- Test 2: Lead Creation & Status Updates ---
console.log('\n▶ Test 2: Verificando CRUD de Prospectos...');
const newLead = crmService.addLead('tenant-nexus-01', {
  name: 'Alejandro Sanz',
  email: 'asanz@musicmedia.es',
  company: 'Music Media Spain',
  planInterest: 'Pro Squad',
  status: 'new',
  dealValue: 588,
  source: 'Test Runner'
});

assert.ok(newLead.id, 'Debe generarse un ID único para el lead');
assert.strictEqual(newLead.email, 'asanz@musicmedia.es');

const updatedLead = crmService.updateLeadStatus('tenant-nexus-01', newLead.id, 'won');
assert.strictEqual(updatedLead.status, 'won', 'El estado debe actualizarse a won');

const leadsAfterAdd = crmService.getLeads('tenant-nexus-01');
assert.ok(leadsAfterAdd.find(l => l.id === newLead.id), 'El lead nuevo debe encontrarse en el tenant');

crmService.deleteLead('tenant-nexus-01', newLead.id);
const leadsAfterDelete = crmService.getLeads('tenant-nexus-01');
assert.strictEqual(leadsAfterDelete.find(l => l.id === newLead.id), undefined, 'El lead debe ser eliminado');

console.log('  ✓ [PASS] Operaciones CRUD de CRM validadas al 100%.');

// --- Test 3: SaaS Telemetry & Metrics Calculation ---
console.log('\n▶ Test 3: Verificando Métricas de Consumo & KPI Dashboard...');
crmService.recordUsage('tenant-nexus-01', {
  videoSeconds: 60,
  tokens: 8500,
  engine: 'google-flow'
});

const metrics = crmService.getMetrics('tenant-nexus-01');
assert.strictEqual(metrics.tenantId, 'tenant-nexus-01');
assert.ok(metrics.totalPipelineValue > 0, 'El valor del pipeline debe ser mayor a 0');
assert.ok(metrics.wonRevenue >= 588, 'Los ingresos ganados deben reflejar los leads en estado won');
assert.ok(parseFloat(metrics.computeCostUSD) > 0, 'El costo de cómputo estimado debe ser positivo');
assert.ok(parseFloat(metrics.hoursSaved) > 0, 'Las horas ahorradas deben ser calculadas');

console.log(`  ✓ [PASS] Métricas calculadas con éxito: Pipeline=$${metrics.totalPipelineValue}, Ganado=$${metrics.wonRevenue}, Costo GPU=$${metrics.computeCostUSD} USD.`);

// --- Test 4: Leads CSV Export & Formula Injection Neutralization ---
console.log('\n▶ Test 4: Verificando Exportador de Leads a CSV & Mitigación de Inyección de Fórmulas...');
// Inject risky formula characters in lead fields
const formulaLead = crmService.addLead('tenant-nexus-01', {
  name: '=1+1"; cmd|',
  email: '+15551234@excel.org',
  company: '@SUM(A1:A10)',
  notes: '-DDE("cmd";"/C calc";"__dummy__")',
  planInterest: 'Enterprise',
  dealValue: 2400
});

const csvData = crmService.exportLeadsCSV('tenant-nexus-01');
assert.ok(csvData.includes("\"'=1+1"), 'Fórmula que inicia con = debe ser neutralizada con comilla simple');
assert.ok(csvData.includes("\"'+15551234"), 'Campo que inicia con + debe ser neutralizado con comilla simple');
assert.ok(csvData.includes("\"'@SUM"), 'Fórmula que inicia con @ debe ser neutralizada con comilla simple');
assert.ok(csvData.includes("\"'-DDE"), 'Fórmula que inicia con - debe ser neutralizada con comilla simple');

crmService.deleteLead('tenant-nexus-01', formulaLead.id);
console.log('  ✓ [PASS] Inyección de fórmulas CSV neutralizada exitosamente.');

// --- Test 5: XSS Sanitization Function ---
console.log('\n▶ Test 5: Verificando Sanitización contra XSS (escapeHtml)...');
const maliciousXss = '<script>alert("xss")</script><img src=x onerror=alert(1)>';
const sanitized = escapeHtml(maliciousXss);
assert.strictEqual(sanitized, '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;&lt;img src=x onerror=alert(1)&gt;');
assert.strictEqual(escapeHtml(null), '');
assert.strictEqual(escapeHtml(undefined), '');
assert.strictEqual(escapeHtml(123), '123');
console.log('  ✓ [PASS] Sanitización XSS validada contra etiquetas y atributos peligrosos.');

// --- Test 6: Empty Array Persistence without Re-seeding ---
console.log('\n▶ Test 6: Verificando Persistencia de Estado Vacío (Sin Re-inserción de Semillas)...');
// Delete all leads in tenant-solo-03
const soloLeads = crmService.getLeads('tenant-solo-03');
soloLeads.forEach(l => crmService.deleteLead('tenant-solo-03', l.id));

// Verify that getLeads returns [] and does NOT re-insert default seeds
const emptyLeads = crmService.getLeads('tenant-solo-03');
assert.strictEqual(Array.isArray(emptyLeads), true);
assert.strictEqual(emptyLeads.length, 0, 'La lista debe permanecer vacía tras borrar todos los leads');

console.log('  ✓ [PASS] Persistencia de estado vacío verificada: 0 re-inserciones no deseadas.');

console.log('\n======================================================');
console.log('🎉 RESULTADO FASE 4: 6/6 SUITES CRM & AUDITORÍA PASADAS (0 ERRORES).');
console.log('======================================================\n');
