import fs from 'fs';
import vm from 'vm';

const htmlPath = process.argv[2] || new URL('../index.html', import.meta.url).pathname;
const html = fs.readFileSync(htmlPath, 'utf8');
const start = html.indexOf('const UNITS={');
const end = html.indexOf('\n};\n\nfunction buildEcosystemUnit');
const code = html.slice(start, end + 3);
const sandbox = { module: { exports: {} } };
vm.runInNewContext(code + '\nmodule.exports = UNITS;', sandbox);
const UNITS = sandbox.module.exports;

const BOARD_UNIT_KEYS = ['tuu','apanio','andco','superapp'];
const RUN_LABELS = {ns:'North star',adq:'Adquisición',act:'Activación',uso:'Uso',ret:'Retención'};
const TYPE_LABELS = {ns:'North star',clave:'Métrica clave',driver:'Métrica palanca',salud:'Salud / eficiencia',operativa:'Operativa'};
const AL = {ventas:'Ventas',cs:'CS',growth:'Growth',ri:'RI',producto:'Producto'};
const EMPTY_DEF = 'Definición pendiente de validar con owner del proceso.';
const RUN_ORDER = {ns:0,adq:1,act:2,uso:3,ret:4};
const TYPE_ORDER = {ns:0,clave:1,driver:2,salud:3,operativa:4};

function parseDefField(def, key) {
  const r = (def||'').match(new RegExp(key+':\\s*([^|]+)', 'i'));
  return r ? r[1].trim() : '';
}
function metricOrigin(m) {
  if (m.origin) return m.origin;
  const raw = (m.def||'').match(/Origen:\s*([^|]+)/i);
  return raw ? raw[1].trim() : '';
}
function metricPreguntas(m) {
  if (m.preguntas) return String(m.preguntas).trim();
  const d = m.def || '';
  return parseDefField(d,'Qué preguntas responde') || parseDefField(d,'Preguntas') || parseDefField(d,'Qué responde') || '';
}
function parseMetricDef(m) {
  const def = (m.def||'').trim();
  if (!def || def === EMPTY_DEF) return {calculo:'',fuente:'',descripcion:''};
  const calculo = parseDefField(def,'Cálculo');
  const fuente = parseDefField(def,'Fuente');
  const interpretacion = parseDefField(def,'Interpretación');
  const hasStructured = !!(calculo||fuente||interpretacion||parseDefField(def,'Unidad'));
  let descripcion = interpretacion;
  if (!descripcion && !hasStructured) descripcion = def;
  return {calculo,fuente,descripcion};
}
function catalogAreaLabel(area) {
  const label = AL[area] || area || '';
  if (label === 'CS' || String(area).toLowerCase() === 'cs') return 'CX';
  return label;
}

const rows = [];
BOARD_UNIT_KEYS.forEach(uid => {
  const u = UNITS[uid];
  u.metrics.forEach(m => {
    const parts = parseMetricDef(m);
    rows.push({
      unit: u.label, unitKey: uid, run: m.run,
      runLabel: RUN_LABELS[m.run] || m.run,
      type: m.type,
      typeLabel: TYPE_LABELS[m.type] || m.type,
      name: m.name,
      descripcion: parts.descripcion || '',
      preguntas: metricPreguntas(m) || '',
      area: catalogAreaLabel(m.area) || '',
      proceso: (m.origin || '').trim(),
      fuente: parts.fuente || '',
      formula: parts.calculo || ''
    });
  });
});
rows.sort((a,b) => {
  const uk = a.unitKey.localeCompare(b.unitKey);
  if (uk) return uk;
  const ro = (RUN_ORDER[a.run]??9) - (RUN_ORDER[b.run]??9);
  if (ro) return ro;
  const to = (TYPE_ORDER[a.type]??9) - (TYPE_ORDER[b.type]??9);
  if (to) return to;
  return a.name.localeCompare(b.name,'es');
});
console.log(JSON.stringify(rows));
