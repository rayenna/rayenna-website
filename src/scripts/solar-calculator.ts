import { Chart, registerables } from 'chart.js';
import { trackEvent } from '../lib/analytics';
import type { CalcI18n } from '../i18n/calculator-en';

Chart.register(...registerables);

export interface SolarCalculatorConfig {
  i18n: CalcI18n;
  contactPath: string;
  publicContactUrl: string;
}

const state = {
  homeType: 'house',
  bedrooms: 3,
  bathrooms: 2,
  floors: 1,
  ac: 2,
  fans: 4,
  tvs: 2,
  fridge: 1,
  microwave: 1,
  washing: 1,
  geyser: true,
  pump: false,
  hasEV: false,
  evCount: 1,
  chargerKw: 3.3,
  chargeHours: 4,
  chargeDays: 5,
  acHours: 8,
  homeAllDay: true,
  monthlyBill: 5000,
};

let i18n: CalcI18n;
let contactPath = '/contact/';
let publicContactUrl = 'https://rayennaenergy.com/contact/';
let savingsChart: Chart | null = null;

const PANEL_SPECS = [
  { id: '620', watt: 620, ppw: 34.5, sqft: 27, label: 'N-Type TopCon 620W' },
  { id: '600', watt: 600, ppw: 34.5, sqft: 27, label: 'N-Type TopCon 600W' },
  { id: '580tc', watt: 580, ppw: 33.5, sqft: 27, label: 'N-Type TopCon 580W' },
  { id: '580bf', watt: 580, ppw: 33.5, sqft: 27, label: 'Bifacial Dual Glass 580W' },
  { id: '540', watt: 540, ppw: 33.0, sqft: 27, label: 'Mono PERC 540W' },
];
type PanelResult = (typeof PANEL_SPECS)[0] & { count: number; roof: number; cost: number };

let cachedPanelResults: PanelResult[] = [];
let cachedSysKw = 0;
let cachedBos = 0;
let cachedAnnSave = 0;
let cachedLifetime = 0;
let selectedPanelId = '600';
let latestShareSummary = '';

const BOS_COST_SCALE = 34.5 / 29.0;
const STEPPER_MAP: Record<string, keyof typeof state> = {
  bedrooms: 'bedrooms',
  bathrooms: 'bathrooms',
  floors: 'floors',
  ac: 'ac',
  fans: 'fans',
  tvs: 'tvs',
  fridge: 'fridge',
  microwave: 'microwave',
  washing: 'washing',
  'ev-count': 'evCount',
};

function fillTemplate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template
  );
}

function setText(id: string, val: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

const inr = (n: number): string =>
  isNaN(n) || !isFinite(n) ? '—' : Math.round(n).toLocaleString('en-IN');

function getContactPropertyType(type: string): string {
  return type === 'apartment' ? 'Apartment' : 'Home / Villa';
}

function getBillRange(bill: number): string {
  if (bill <= 1000) return 'Below ₹1,000';
  if (bill <= 2000) return '₹1,000 – ₹2,000';
  if (bill <= 4000) return '₹2,000 – ₹4,000';
  if (bill <= 8000) return '₹4,000 – ₹8,000';
  if (bill <= 15000) return '₹8,000 – ₹15,000';
  return 'Above ₹15,000';
}

function pmSubsidy(sysKw: number): number {
  if (sysKw <= 1) return 30000;
  if (sysKw <= 2) return 60000;
  return 78000;
}

function calcBos(sysKw: number): number {
  let inverter: number;
  if (sysKw <= 1) inverter = 18000;
  else if (sysKw <= 2) inverter = 25000;
  else if (sysKw <= 3) inverter = 32000;
  else if (sysKw <= 4) inverter = 38000;
  else if (sysKw <= 5) inverter = 44000;
  else if (sysKw <= 6) inverter = 52000;
  else if (sysKw <= 7) inverter = 58000;
  else if (sysKw <= 8) inverter = 65000;
  else if (sysKw <= 9) inverter = 72000;
  else inverter = 80000;

  let mounting: number;
  if (sysKw <= 1) mounting = 12000;
  else if (sysKw <= 2) mounting = 18000;
  else if (sysKw <= 3) mounting = 22000;
  else if (sysKw <= 4) mounting = 26000;
  else if (sysKw <= 5) mounting = 30000;
  else if (sysKw <= 7) mounting = sysKw * 4500;
  else mounting = sysKw * 4000;

  let cables: number;
  if (sysKw <= 1) cables = 10000;
  else if (sysKw <= 2) cables = 13000;
  else if (sysKw <= 3) cables = 16000;
  else if (sysKw <= 4) cables = 18000;
  else if (sysKw <= 5) cables = 20000;
  else cables = sysKw * 3500;

  let install: number;
  if (sysKw <= 1) install = 10000;
  else if (sysKw <= 2) install = 14000;
  else if (sysKw <= 3) install = 18000;
  else if (sysKw <= 4) install = 20000;
  else if (sysKw <= 5) install = 22000;
  else install = sysKw * 3500;

  const base = inverter + mounting + cables + install + 3000;
  return Math.round(base * BOS_COST_SCALE);
}

function getSystemProfileLabel(sysKw: number): string {
  if (sysKw <= 2) return i18n.fitCompact;
  if (sysKw <= 5) return i18n.fitBalanced;
  if (sysKw <= 8) return i18n.fitHigh;
  return i18n.fitLarge;
}

function buildResultSummary(): string {
  const home = i18n.homeTypes[state.homeType as keyof typeof i18n.homeTypes] ?? 'home';
  const bill = inr(state.monthlyBill);
  if (state.hasEV) {
    return fillTemplate(i18n.resultSummaryWithEv, { home, bill, count: String(state.evCount) });
  }
  return fillTemplate(i18n.resultSummaryNoEv, { home, bill });
}

function buildFitCopy(p: PanelResult): string {
  const occupancy = state.homeAllDay ? i18n.occupancyHome : i18n.occupancyAway;
  let text = fillTemplate(i18n.fitCopyBase, {
    occupancy,
    panel: p.label,
    panels: String(p.count),
    roof: p.roof.toLocaleString('en-IN') + i18n.sqFt,
  });
  if (state.hasEV) {
    text += fillTemplate(i18n.fitCopyEvSuffix, { count: String(state.evCount) });
  }
  return text;
}

function buildShareSummary(p: PanelResult, paybackText: string): string {
  const home = i18n.homeTypes[state.homeType as keyof typeof i18n.homeTypes] ?? 'home';
  const bill = '₹' + inr(state.monthlyBill);
  const intro = state.hasEV
    ? fillTemplate(i18n.shareIntroWithEv, { home, bill, count: String(state.evCount) })
    : fillTemplate(i18n.shareIntroNoEv, { home, bill });
  return [
    i18n.shareHeading,
    '',
    intro,
    `${i18n.shareSystem}: ${cachedSysKw} kW`,
    `${i18n.shareGeneration}: ~${Math.round(cachedSysKw * 1200).toLocaleString('en-IN')}`,
    `${i18n.shareSavings}: ₹${inr(cachedAnnSave)}${i18n.perYear}`,
    `${i18n.shareSubsidy}: ₹${inr(pmSubsidy(cachedSysKw))}`,
    `${i18n.sharePanel}: ${p.label}`,
    `${i18n.sharePayback}: ${paybackText}`,
    '',
    `${i18n.shareSurvey}:`,
    publicContactUrl,
  ].join('\n');
}

function buildContactHref(p: PanelResult, paybackText: string, summary: string): string {
  const params = new URLSearchParams({
    source: 'solar-calculator',
    subject: i18n.contactSubject,
    summary,
    system: `${cachedSysKw} kW`,
    bill: String(state.monthlyBill),
    billRange: getBillRange(state.monthlyBill),
    propertyType: getContactPropertyType(state.homeType),
    panel: p.label,
    subsidy: `₹${inr(pmSubsidy(cachedSysKw))}`,
    annualSavings: `₹${inr(cachedAnnSave)}${i18n.perYear}`,
    payback: paybackText,
    homeTypeLabel: i18n.homeTypes[state.homeType as keyof typeof i18n.homeTypes] ?? 'home',
    evCount: state.hasEV ? String(state.evCount) : '0',
  });
  return `${contactPath}?${params.toString()}`;
}

async function copyText(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const fallback = document.createElement('textarea');
  fallback.value = value;
  fallback.setAttribute('readonly', '');
  fallback.style.position = 'absolute';
  fallback.style.left = '-9999px';
  document.body.appendChild(fallback);
  fallback.select();
  document.execCommand('copy');
  document.body.removeChild(fallback);
}

function getWhatsAppShareUrl(text: string): string {
  return `whatsapp://send?phone=917907369304&text=${encodeURIComponent(text)}`;
}

function animateCountUp(
  el: HTMLElement | null,
  target: number,
  formatter: (n: number) => string,
  duration = 1400
) {
  if (!el || !isFinite(target)) return;
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatter(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = formatter(target);
  };
  requestAnimationFrame(tick);
}

function animateCurrency(id: string, target: number, suffix = '') {
  animateCountUp(document.getElementById(id), target, (n) => '₹' + inr(n) + suffix);
}

function updateProgressBar(step: number) {
  const fill = document.getElementById('calc-progress-fill');
  if (fill) fill.style.width = `${((step - 1) / 3) * 100}%`;
  document.querySelectorAll<HTMLElement>('.cpb-step').forEach((stepEl, i) => {
    const s = i + 1;
    stepEl.classList.toggle('active', s === step);
    stepEl.classList.toggle('done', s < step);
  });
}

function renderSavingsChart(netCost: number, annSave: number, monthlyBill: number) {
  const canvas = document.getElementById('savings-chart') as HTMLCanvasElement | null;
  if (!canvas) return;

  const years = Array.from({ length: 26 }, (_, i) => i);
  const annualBill = monthlyBill * 12;
  const withoutSolar = years.map((y) => y * annualBill);
  const withSolar = years.map((y) => netCost + y * Math.max(0, annualBill - annSave));

  if (savingsChart) {
    savingsChart.destroy();
    savingsChart = null;
  }

  savingsChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: years.map(String),
      datasets: [
        {
          label: i18n.chartWithoutSolar,
          data: withoutSolar,
          borderColor: 'rgba(168, 56, 56, 0.85)',
          backgroundColor: 'rgba(168, 56, 56, 0.08)',
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: i18n.chartWithSolar,
          data: withSolar,
          borderColor: 'rgba(201, 162, 39, 0.95)',
          backgroundColor: 'rgba(201, 162, 39, 0.12)',
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          borderWidth: 2.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            boxWidth: 12,
            boxHeight: 12,
            usePointStyle: true,
            font: { size: 12, family: 'Poppins, sans-serif' },
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ₹${inr(Number(ctx.raw))}`,
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: i18n.chartYear, font: { size: 11 } },
          grid: { display: false },
          ticks: { maxTicksLimit: 7, font: { size: 10 } },
        },
        y: {
          title: { display: true, text: i18n.chartCumulativeCost, font: { size: 11 } },
          ticks: {
            font: { size: 10 },
            callback: (v) => '₹' + inr(Number(v)),
          },
          grid: { color: 'rgba(19, 39, 67, 0.06)' },
        },
      },
    },
  });
}

function goToStep(n: number) {
  document.querySelectorAll('.calc-step').forEach((el) => el.classList.add('hidden'));
  document.getElementById(`step-${n}`)?.classList.remove('hidden');
  updateProgressBar(n);
  const lbl = document.getElementById('step-label');
  if (lbl) lbl.textContent = i18n.stepLabels[n] ?? '';
  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (n === 4) calculateResults();
}

function initSteppers() {
  document.querySelectorAll<HTMLElement>('.stepper').forEach((stp) => {
    const id = stp.dataset.id ?? '';
    const min = parseInt(stp.dataset.min ?? '0', 10);
    const max = parseInt(stp.dataset.max ?? '99', 10);
    const valEl = stp.querySelector<HTMLElement>('.stp-val');
    stp.querySelector('.stp-minus')?.addEventListener('click', () => {
      let v = parseInt(stp.dataset.val ?? '0', 10);
      if (v > min) {
        v--;
        stp.dataset.val = String(v);
        if (valEl) valEl.textContent = String(v);
        syncState(id, v);
      }
    });
    stp.querySelector('.stp-plus')?.addEventListener('click', () => {
      let v = parseInt(stp.dataset.val ?? '0', 10);
      if (v < max) {
        v++;
        stp.dataset.val = String(v);
        if (valEl) valEl.textContent = String(v);
        syncState(id, v);
      }
    });
  });
}

function syncState(id: string, val: number) {
  const key = STEPPER_MAP[id];
  if (key) (state as Record<string, unknown>)[key] = val;
  if (id === 'ev-count') updateEVImpact();
}

function initCards(gridId: string, attr: string, cb: (val: string) => void) {
  document.querySelectorAll<HTMLElement>(`#${gridId} [data-${attr}]`).forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll(`#${gridId} [data-${attr}]`).forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      cb(card.dataset[attr] ?? '');
    });
  });
}

function initToggles() {
  document.getElementById('toggle-geyser')?.addEventListener('change', (e) => {
    state.geyser = (e.target as HTMLInputElement).checked;
  });
  document.getElementById('toggle-pump')?.addEventListener('change', (e) => {
    state.pump = (e.target as HTMLInputElement).checked;
  });
  document.getElementById('toggle-ev')?.addEventListener('change', (e) => {
    state.hasEV = (e.target as HTMLInputElement).checked;
    document.getElementById('ev-panel')?.classList.toggle('hidden', !state.hasEV);
    if (state.hasEV) updateEVImpact();
  });
}

function bindSlider(id: string, displayId: string, fmt: (v: number) => string, cb: (v: number) => void) {
  const input = document.getElementById(id) as HTMLInputElement | null;
  const disp = document.getElementById(displayId);
  if (!input) return;
  const paint = () => {
    const pct = ((+input.value - +input.min) / (+input.max - +input.min)) * 100;
    input.style.background = `linear-gradient(to right, #c9a227 ${pct}%, rgba(19,39,67,0.12) ${pct}%)`;
  };
  input.addEventListener('input', () => {
    const v = parseInt(input.value, 10);
    if (disp) disp.textContent = fmt(v);
    cb(v);
    paint();
  });
  if (disp) disp.textContent = fmt(parseInt(input.value, 10));
  paint();
}

function updateEVImpact() {
  const evDailyAvg = (state.chargerKw * state.chargeHours * state.chargeDays * state.evCount) / 7;
  const evExtraPanels = Math.ceil((evDailyAvg / (4.5 * 0.8)) * 1.25 * 1000 / 600);
  setText('ev-added-load', evDailyAvg.toFixed(1) + i18n.evKwhDay);
  setText(
    'ev-extra-panels',
    '+' + evExtraPanels + (evExtraPanels === 1 ? i18n.evPanel : i18n.evPanels)
  );
  const evTpl = state.evCount > 1 ? i18n.evNoteMulti : i18n.evNoteSingle;
  setText(
    'ev-impact-note',
    fillTemplate(evTpl, {
      kw: String(state.chargerKw),
      hours: String(state.chargeHours),
      days: String(state.chargeDays),
      count: String(state.evCount),
      units: evDailyAvg.toFixed(1),
    })
  );
}

function updateResultActions(p: PanelResult, paybackText: string) {
  const review = document.getElementById('result-review-cta') as HTMLAnchorElement | null;
  const waBtn = document.getElementById('result-whatsapp-btn') as HTMLAnchorElement | null;
  const status = document.getElementById('result-action-status');
  const summary = buildShareSummary(p, paybackText);
  const href = buildContactHref(p, paybackText, summary);
  latestShareSummary = summary;
  if (review) review.href = href;
  if (waBtn) waBtn.href = getWhatsAppShareUrl(summary);
  if (status) status.textContent = '';
}

function calculateResults() {
  const s = state;
  let daily = 0;
  daily += (s.ac * 1500 * s.acHours) / 1000;
  daily += (s.fans * 75 * 10) / 1000;
  daily += (s.tvs * 120 * 6) / 1000;
  daily += (s.fridge * 200 * 24 * 0.3) / 1000;
  daily += (s.microwave * 1200 * 1) / 1000;
  daily += (s.washing * 500 * 1) / 1000;
  daily += (s.bedrooms * 50 * 8) / 1000;
  if (s.geyser) daily += 2000 / 1000;
  if (s.pump) daily += (750 * 2) / 1000;
  if (s.hasEV) {
    const evAvg = (s.chargerKw * s.chargeHours * s.chargeDays * s.evCount) / 7;
    daily += isNaN(evAvg) ? 0 : evAvg;
  }
  daily = daily * (s.homeAllDay ? 1.0 : 0.7);
  daily = isNaN(daily) ? 0 : daily;

  const rawKW = daily / (4.5 * 0.8);
  let sysKw = Math.ceil(rawKW * 1.25);
  sysKw = Math.max(1, isNaN(sysKw) ? 1 : sysKw);

  const annUnits = Math.round(sysKw * 1200);
  const annSave = Math.round(s.monthlyBill * 11);
  const lifetime = annSave * 25;
  const co2 = Math.round((annUnits * 0.82 * 25) / 1000);
  const bos = calcBos(sysKw);
  const subsidy = pmSubsidy(sysKw);

  cachedSysKw = sysKw;
  cachedBos = bos;
  cachedAnnSave = annSave;
  cachedLifetime = lifetime;

  cachedPanelResults = PANEL_SPECS.map((p) => {
    const count = Math.ceil((sysKw * 1000) / p.watt);
    const roof = count * p.sqft;
    const cost = count * p.watt * p.ppw;
    return { ...p, count, roof, cost };
  });

  animateCountUp(document.getElementById('result-kw'), sysKw, (n) => Math.round(n) + i18n.kwSuffix);
  animateCountUp(document.getElementById('kpi-system-kw'), sysKw, (n) => Math.round(n) + i18n.kwSuffix);
  setText(
    'result-units',
    fillTemplate(i18n.generatesUnits, { units: annUnits.toLocaleString('en-IN') })
  );
  animateCountUp(document.getElementById('result-daily'), daily, (n) => n.toFixed(1) + i18n.units);
  animateCountUp(document.getElementById('kpi-daily'), daily, (n) => n.toFixed(1) + i18n.units);
  animateCurrency('result-subsidy', subsidy);
  animateCurrency('result-annual-top', annSave, i18n.perYear);
  animateCurrency('kpi-annual', annSave, i18n.perYear);
  animateCurrency('fin-annual', annSave, i18n.perYear);
  animateCurrency('fin-lifetime', lifetime);
  animateCountUp(document.getElementById('fin-co2'), co2, (n) => Math.round(n) + i18n.tonnes);
  setText('result-summary', buildResultSummary());

  cachedPanelResults.forEach((p) => {
    setText(`p${p.id}-panels`, p.count + i18n.panels);
    setText(`p${p.id}-roof`, p.roof.toLocaleString('en-IN') + i18n.sqFt);
    setText(`p${p.id}-cost`, '₹' + inr(p.cost));
  });

  updatePanelDisplay(selectedPanelId);

  trackEvent('calculator_complete', {
    system_kw: sysKw,
    panel_id: selectedPanelId,
    monthly_bill: s.monthlyBill,
  });
}

function updatePanelDisplay(id: string) {
  if (!cachedPanelResults.length) return;
  selectedPanelId = id;
  const p = cachedPanelResults.find((r) => r.id === id) ?? cachedPanelResults[1];
  const subsidy = pmSubsidy(cachedSysKw);
  const totalCost = p.cost + cachedBos;
  const netCost = totalCost - subsidy;
  const payback = netCost / cachedAnnSave;

  animateCountUp(document.getElementById('result-panels'), p.count, (n) => Math.round(n) + i18n.panels);
  setText('result-roof', p.roof.toLocaleString('en-IN') + i18n.sqFt);

  setText('fin-panel-cost', '₹' + inr(p.cost));
  setText('fin-bos', '₹' + inr(cachedBos));
  setText('fin-total-cost', '₹' + inr(totalCost));
  setText('fin-subsidy-row', '−₹' + inr(subsidy));
  animateCurrency('fin-net-cost', netCost);
  const paybackText =
    isNaN(payback) || !isFinite(payback) ? '—' : payback.toFixed(1) + i18n.years;
  setText('fin-payback', paybackText);
  setText('result-payback-top', paybackText);
  setText('result-fit-title', getSystemProfileLabel(cachedSysKw));
  setText('result-fit-copy', buildFitCopy(p));
  updateResultActions(p, paybackText);

  animateCountUp(document.getElementById('kpi-lifetime'), cachedLifetime, (n) => '₹' + inr(n));
  animateCountUp(document.getElementById('kpi-net-cost'), netCost, (n) => '₹' + inr(n));
  animateCountUp(document.getElementById('kpi-payback'), payback, (n) =>
    isNaN(n) || !isFinite(n) ? '—' : n.toFixed(1) + i18n.years
  );

  renderSavingsChart(netCost, cachedAnnSave, state.monthlyBill);

  document.querySelectorAll<HTMLElement>('.panel-option[data-panel-id]').forEach((card) => {
    card.classList.toggle('selected', card.dataset.panelId === id);
  });
}

function initPanelSelect() {
  document.querySelectorAll<HTMLElement>('.panel-option[data-panel-id]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.panel-expand, .panel-option__detail')) return;
      if (!cachedPanelResults.length) return;
      updatePanelDisplay(card.dataset.panelId ?? '600');
    });
  });
}

function initPanelExpand() {
  document.querySelectorAll<HTMLElement>('.panel-expand').forEach((btn) => {
    btn.addEventListener('click', () => {
      const detail = document.getElementById(btn.dataset.target ?? '');
      if (!detail) return;
      const hidden = detail.classList.toggle('hidden');
      btn.textContent = hidden ? i18n.learnMore : i18n.learnClose;
    });
  });
}

function resetAll() {
  Object.assign(state, {
    homeType: 'house',
    bedrooms: 3,
    bathrooms: 2,
    floors: 1,
    ac: 2,
    fans: 4,
    tvs: 2,
    fridge: 1,
    microwave: 1,
    washing: 1,
    geyser: true,
    pump: false,
    hasEV: false,
    evCount: 1,
    chargerKw: 3.3,
    chargeHours: 4,
    chargeDays: 5,
    acHours: 8,
    homeAllDay: true,
    monthlyBill: 5000,
  });

  ['house', 'apartment', 'villa', 'rowhouse'].forEach((t) => {
    document.querySelector<HTMLElement>(`.ht-card[data-type="${t}"]`)?.classList.toggle('selected', t === 'house');
  });
  document.querySelectorAll<HTMLElement>('.charger-card').forEach((c) => {
    c.classList.toggle('selected', c.dataset.kw === '3.3');
  });
  document.querySelectorAll<HTMLElement>('.occ-card').forEach((c) => {
    c.classList.toggle('selected', c.dataset.occ === 'home');
  });

  const defaults: Record<string, number> = {
    bedrooms: 3,
    bathrooms: 2,
    floors: 1,
    ac: 2,
    fans: 4,
    tvs: 2,
    fridge: 1,
    microwave: 1,
    washing: 1,
    'ev-count': 1,
  };
  document.querySelectorAll<HTMLElement>('.stepper').forEach((s) => {
    const id = s.dataset.id ?? '';
    const val = defaults[id] ?? parseInt(s.dataset.min ?? '0', 10);
    s.dataset.val = String(val);
    const el = s.querySelector<HTMLElement>('.stp-val');
    if (el) el.textContent = String(val);
  });

  (document.getElementById('toggle-geyser') as HTMLInputElement).checked = true;
  (document.getElementById('toggle-pump') as HTMLInputElement).checked = false;
  (document.getElementById('toggle-ev') as HTMLInputElement).checked = false;
  document.getElementById('ev-panel')?.classList.add('hidden');

  const sliders: [string, string, string][] = [
    ['ac-hours', 'ac-hours-val', '8'],
    ['bill-slider', 'bill-val', '5000'],
    ['ev-hours', 'ev-hours-val', '4'],
    ['ev-days', 'ev-days-val', '5'],
  ];
  sliders.forEach(([sid, did, dv]) => {
    const el = document.getElementById(sid) as HTMLInputElement | null;
    if (el) {
      el.value = dv.replace(/[^0-9]/g, '') || dv;
      const pct = ((+el.value - +el.min) / (+el.max - +el.min)) * 100;
      el.style.background = `linear-gradient(to right, #c9a227 ${pct}%, rgba(19,39,67,0.12) ${pct}%)`;
    }
    if (sid === 'bill-slider') setText(did, '₹' + parseInt(dv, 10).toLocaleString('en-IN'));
    else setText(did, dv);
  });

  selectedPanelId = '600';
  cachedPanelResults = [];
  if (savingsChart) {
    savingsChart.destroy();
    savingsChart = null;
  }
  document.querySelectorAll<HTMLElement>('.panel-option[data-panel-id]').forEach((card) => {
    card.classList.toggle('selected', card.dataset.panelId === '600');
  });
  document.querySelectorAll('.panel-option__detail').forEach((d) => d.classList.add('hidden'));
  document.querySelectorAll<HTMLElement>('.panel-expand').forEach((b) => {
    b.textContent = i18n.learnMore;
  });
}

export function initSolarCalculator(config: SolarCalculatorConfig) {
  i18n = config.i18n;
  contactPath = config.contactPath;
  publicContactUrl = config.publicContactUrl;
  document.documentElement.style.setProperty('--panel-selected-label', `"${i18n.panelSelected}"`);

  document.addEventListener('DOMContentLoaded', () => {
    initSteppers();
    initCards('home-type-grid', 'type', (v) => {
      state.homeType = v;
    });
    initCards('charger-grid', 'kw', (v) => {
      state.chargerKw = parseFloat(v);
      updateEVImpact();
    });
    initCards('occupancy-grid', 'occ', (v) => {
      state.homeAllDay = v === 'home';
    });
    initToggles();
    initPanelExpand();
    initPanelSelect();
    updateProgressBar(1);

    bindSlider('ac-hours', 'ac-hours-val', (v) => String(v), (v) => {
      state.acHours = v;
    });
    bindSlider(
      'bill-slider',
      'bill-val',
      (v) => '₹' + v.toLocaleString('en-IN'),
      (v) => {
        state.monthlyBill = v;
      }
    );
    bindSlider('ev-hours', 'ev-hours-val', (v) => String(v), (v) => {
      state.chargeHours = v;
      updateEVImpact();
    });
    bindSlider('ev-days', 'ev-days-val', (v) => String(v), (v) => {
      state.chargeDays = v;
      updateEVImpact();
    });

    document.querySelectorAll<HTMLElement>('.btn-calc-next').forEach((btn) => {
      btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.next ?? '1', 10)));
    });
    document.querySelectorAll<HTMLElement>('.btn-calc-back').forEach((btn) => {
      btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.back ?? '1', 10)));
    });

    document.getElementById('recalculate-btn')?.addEventListener('click', () => {
      resetAll();
      goToStep(1);
    });

    const copyBtn = document.getElementById('result-copy-btn') as HTMLButtonElement | null;
    const waBtn = document.getElementById('result-whatsapp-btn') as HTMLAnchorElement | null;
    const status = document.getElementById('result-action-status');

    copyBtn?.addEventListener('click', async () => {
      if (!status) return;
      if (!latestShareSummary) {
        status.textContent = i18n.generateFirst;
        return;
      }
      try {
        await copyText(latestShareSummary);
        status.textContent = i18n.copied;
      } catch {
        status.textContent = i18n.copyFailed;
      }
    });

    waBtn?.addEventListener('click', (e) => {
      if (!latestShareSummary) {
        e.preventDefault();
        if (status) status.textContent = i18n.generateFirst;
        return;
      }
      e.preventDefault();
      window.location.href = getWhatsAppShareUrl(latestShareSummary);
    });

    document.querySelector<HTMLAnchorElement>('.hero-scroll-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
