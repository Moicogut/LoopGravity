/**
 * Automated Verification Suite for LoopGravity PMV - Fase 4 (CRM & SaaS Telemetry)
 */

const assert = require('assert');
const {
  TenantService,
  StorageService,
  CrmService
} = require('./app.js');

console.log('🧪 Iniciando Suite de Pruebas Automatizadas PMV (Fase 4: CRM & Analítica SaaS)...\n');

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

// --- Test 4: Leads CSV Export ---
console.log('\n▶ Test 4: Verificando Exportador de Leads a CSV...');
const csvData = crmService.exportLeadsCSV('tenant-nexus-01');
const csvLines = csvData.split('\r\n').filter(l => l.trim().length > 0);
assert.ok(csvLines.length >= 4, 'Debe incluir cabecera + al menos 3 filas de datos');
assert.ok(csvLines[0].includes('Lead ID'));
assert.ok(csvLines[0].includes('Deal Value (USD)'));
assert.ok(csvLines[0].includes('Status'));
assert.ok(csvLines[1].includes('Carlos Mendoza'));

console.log('  ✓ [PASS] Exportación CSV de leads validada correctamente.');

console.log('\n======================================================');
console.log('🎉 RESULTADO FASE 4: 4/4 SUITES CRM & TELEMETRÍA PASADAS (0 ERRORES).');
console.log('======================================================\n');
