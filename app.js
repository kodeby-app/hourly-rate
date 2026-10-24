// Hourly Rate Calculator: everything runs in the browser and is stored in localStorage.

const STORAGE_KEY = 'hourly-rate-v1';
const WORKDAYS_PER_YEAR = 260; // 52 weeks × 5 days

const T = {
  en: {
    appName: 'Hourly Rate Calculator', tagline: 'Free. No sign-up. Nothing leaves your browser.',
    share: 'Copy link', reset: 'Start over', download: 'Download PDF',
    incomeTitle: '1. What you want to earn', incomeMode: 'I am entering',
    mode_gross: 'Yearly salary before tax', mode_net: 'Yearly take-home pay after tax',
    income: 'Amount per year', taxRate: 'Estimated tax on your salary (%)',
    pension: 'Pension savings (% of salary)', currency: 'Currency',
    taxHint: 'Tax depends on your country and situation. Use a rough average, or ask your accountant. This is an estimate, not tax advice.',
    timeTitle: '2. Your working time', hoursPerDay: 'Hours per working day', vacationWeeks: 'Weeks of holiday',
    holidayDays: 'Public holidays (days)', sickDays: 'Sick days and buffer (days)',
    billable: 'Share of your time you can bill',
    billableHint: 'Selling, admin, email and learning take time no client pays for. Many freelancers bill 60–75 % of their working hours.',
    costTitle: '3. Business costs', costHint: 'Everything the business pays for in a year',
    costName: 'Cost', costAmount: 'Amount', costPer: 'Per', perYear: 'Per year',
    month: 'month', year: 'year', addCost: '+ Add cost', removeCost: 'Remove cost', newCost: 'New cost',
    c_equipment: 'Computer and equipment', c_software: 'Software and subscriptions', c_phone: 'Phone and internet',
    c_accounting: 'Accounting', c_insurance: 'Insurance', c_office: 'Office or coworking space',
    c_training: 'Courses and books', c_other: 'Travel and other',
    extraTitle: '4. Safety and price', buffer: 'Profit and safety margin (%)',
    vatRate: 'VAT you add to the price (%)', checkRate: 'Test a rate you have in mind (per hour)', checkRatePh: 'Optional',
    bufferHint: 'A margin covers quiet months, late payments and a little savings for the business. 10–20 % is common.',
    privacy: 'Everything you type stays in this browser. There is no server, no account and no tracking.',
    madeBy: 'An example app by the Kodeby team.', source: 'Source code',
    resultTitle: 'You should charge at least', perHourExVat: 'per hour, excl. VAT',
    exact: 'Exact amount: {amount}. Rounded up to a price that is easy to say.',
    inclVat: 'Incl. {rate} % VAT', dayRate: 'Day rate ({hours} h)', monthRevenue: 'Sales needed per month',
    billHours: 'Billable hours per year',
    whereTitle: 'Where the money goes in a year', yearRevenue: 'Total sales needed',
    b_takeHome: 'Take-home pay', b_tax: 'Tax', b_pension: 'Pension', b_costs: 'Business costs', b_margin: 'Margin',
    timeSummary: 'You work {days} days a year, about {hours} hours. You bill {billHours} of them, which is about {perWeek} hours a week.',
    checkTitle: 'If you charge {rate} per hour',
    checkTakeHome: 'Take-home pay per month', checkGoal: 'Of your goal',
    checkHours: 'To reach your goal at this rate you need to bill about {hours} hours a week.',
    checkLow: 'This rate is lower than your minimum.', checkOk: 'This rate covers your goal.',
    checkNoProfit: 'At this rate the business does not cover its costs.',
    noHours: 'Add some working time to see a rate.', badTax: 'The tax rate must be below 100 %.',
    assumptions: 'Assumptions', a_income_gross: 'Salary before tax', a_income_net: 'Take-home pay after tax',
    a_tax: 'Tax', a_pension: 'Pension', a_costs: 'Business costs per year', a_margin: 'Margin',
    a_time: 'Working time', a_timeVal: '{days} days × {hours} h, {billable} % billable',
    printedOn: 'Made with Hourly Rate Calculator on {date} · rate.kodeby.app',
    estimate: 'This is an estimate to help you set a price. It is not tax or financial advice.',
    copied: 'Link copied. Anyone with the link sees these numbers. Nothing is stored on a server.',
    copyPrompt: 'Copy this link:',
    confirmShared: 'This link has someone\'s numbers in it. Replace the numbers saved in this browser?',
    confirmReset: 'Clear everything and start with example numbers?',
    storageFull: 'Could not save. The browser storage may be full or blocked.',
    perWeekUnit: 'h/week',
  },
  nb: {
    appName: 'Timepriskalkulator', tagline: 'Gratis. Ingen innlogging. Ingenting forlater nettleseren.',
    share: 'Kopier lenke', reset: 'Start på nytt', download: 'Last ned PDF',
    incomeTitle: '1. Hva du vil tjene', incomeMode: 'Jeg skriver inn',
    mode_gross: 'Årslønn før skatt', mode_net: 'Årlig utbetalt etter skatt',
    income: 'Beløp per år', taxRate: 'Omtrentlig skatt på lønnen (%)',
    pension: 'Pensjonssparing (% av lønn)', currency: 'Valuta',
    taxHint: 'Skatten avhenger av land og situasjon. Bruk et grovt snitt, eller spør regnskapsføreren din. Dette er et anslag, ikke skatteråd.',
    timeTitle: '2. Arbeidstiden din', hoursPerDay: 'Timer per arbeidsdag', vacationWeeks: 'Uker ferie',
    holidayDays: 'Helligdager (dager)', sickDays: 'Sykedager og buffer (dager)',
    billable: 'Andel av tiden du kan fakturere',
    billableHint: 'Salg, admin, e-post og læring tar tid ingen kunde betaler for. Mange frilansere fakturerer 60–75 % av arbeidstiden.',
    costTitle: '3. Kostnader i bedriften', costHint: 'Alt bedriften betaler for i løpet av et år',
    costName: 'Kostnad', costAmount: 'Beløp', costPer: 'Per', perYear: 'Per år',
    month: 'måned', year: 'år', addCost: '+ Legg til kostnad', removeCost: 'Fjern kostnad', newCost: 'Ny kostnad',
    c_equipment: 'Datamaskin og utstyr', c_software: 'Programvare og abonnementer', c_phone: 'Mobil og internett',
    c_accounting: 'Regnskap', c_insurance: 'Forsikring', c_office: 'Kontor eller kontorfellesskap',
    c_training: 'Kurs og fagbøker', c_other: 'Reiser og annet',
    extraTitle: '4. Sikkerhet og pris', buffer: 'Fortjeneste og sikkerhetsmargin (%)',
    vatRate: 'MVA du legger på prisen (%)', checkRate: 'Test en timepris du har i tankene', checkRatePh: 'Valgfritt',
    bufferHint: 'En margin dekker rolige måneder, sene betalinger og litt sparing i bedriften. 10–20 % er vanlig.',
    privacy: 'Alt du skriver blir i denne nettleseren. Ingen server, ingen konto og ingen sporing.',
    madeBy: 'En eksempel-app laget av Kodeby-teamet.', source: 'Kildekode',
    resultTitle: 'Du bør ta minst', perHourExVat: 'per time, eks. mva.',
    exact: 'Nøyaktig: {amount}. Rundet opp til en pris som er lett å si.',
    inclVat: 'Inkl. {rate} % mva.', dayRate: 'Dagspris ({hours} t)', monthRevenue: 'Salg du trenger per måned',
    billHours: 'Fakturerbare timer per år',
    whereTitle: 'Hvor pengene går i løpet av et år', yearRevenue: 'Samlet salg du trenger',
    b_takeHome: 'Utbetalt til deg', b_tax: 'Skatt', b_pension: 'Pensjon', b_costs: 'Kostnader', b_margin: 'Margin',
    timeSummary: 'Du jobber {days} dager i året, omtrent {hours} timer. Du fakturerer {billHours} av dem, som er omtrent {perWeek} timer i uka.',
    checkTitle: 'Hvis du tar {rate} per time',
    checkTakeHome: 'Utbetalt per måned', checkGoal: 'Av målet ditt',
    checkHours: 'For å nå målet med denne prisen må du fakturere omtrent {hours} timer i uka.',
    checkLow: 'Denne prisen er lavere enn minimumet ditt.', checkOk: 'Denne prisen dekker målet ditt.',
    checkNoProfit: 'Med denne prisen dekker ikke bedriften kostnadene sine.',
    noHours: 'Legg inn litt arbeidstid for å se en timepris.', badTax: 'Skatten må være under 100 %.',
    assumptions: 'Forutsetninger', a_income_gross: 'Lønn før skatt', a_income_net: 'Utbetalt etter skatt',
    a_tax: 'Skatt', a_pension: 'Pensjon', a_costs: 'Kostnader per år', a_margin: 'Margin',
    a_time: 'Arbeidstid', a_timeVal: '{days} dager × {hours} t, {billable} % fakturerbart',
    printedOn: 'Laget med Timepriskalkulator {date} · rate.kodeby.app',
    estimate: 'Dette er et anslag som hjelp til å sette pris. Det er ikke skatte- eller økonomiråd.',
    copied: 'Lenken er kopiert. Alle med lenken ser disse tallene. Ingenting lagres på en server.',
    copyPrompt: 'Kopier denne lenken:',
    confirmShared: 'Denne lenken har noens tall i seg. Erstatte tallene som er lagret i denne nettleseren?',
    confirmReset: 'Tømme alt og starte med eksempeltall?',
    storageFull: 'Kunne ikke lagre. Lagringen i nettleseren kan være full eller blokkert.',
    perWeekUnit: 't/uke',
  },
};

const LOCALES = { en: 'en-GB', nb: 'nb-NO' };

// Example numbers so the page shows a real result on first visit.
const PRESETS = {
  NOK: {
    currency: 'NOK', income: '600000', vatRate: '25', holidayDays: '10',
    costs: [['c_equipment', '12000', 'year'], ['c_software', '500', 'month'], ['c_phone', '800', 'month'],
      ['c_accounting', '10000', 'year'], ['c_insurance', '6000', 'year'], ['c_office', '0', 'month'],
      ['c_training', '5000', 'year'], ['c_other', '6000', 'year']],
  },
  EUR: {
    currency: 'EUR', income: '55000', vatRate: '20', holidayDays: '9',
    costs: [['c_equipment', '1200', 'year'], ['c_software', '50', 'month'], ['c_phone', '70', 'month'],
      ['c_accounting', '900', 'year'], ['c_insurance', '500', 'year'], ['c_office', '0', 'month'],
      ['c_training', '500', 'year'], ['c_other', '600', 'year']],
  },
};

// ---------- state ----------

let state = fromHash() || load() || freshState(detectLang());
if (location.hash) history.replaceState(null, '', location.pathname + location.search);
save();

function detectLang() {
  return (navigator.language || '').toLowerCase().match(/^(nb|nn|no)/) ? 'nb' : 'en';
}

function freshState(lang) {
  const p = lang === 'nb' ? PRESETS.NOK : PRESETS.EUR;
  return {
    version: 1,
    lang,
    currency: p.currency,
    incomeMode: 'gross',
    income: p.income,
    taxRate: '30',
    pension: '5',
    hoursPerDay: '7.5',
    vacationWeeks: '5',
    holidayDays: p.holidayDays,
    sickDays: '10',
    billable: '70',
    buffer: '15',
    vatRate: p.vatRate,
    checkRate: '',
    costs: p.costs.map(([key, amount, per]) => ({ id: uid(), key, name: '', amount, per })),
  };
}

function normalize(data) {
  if (!data || typeof data !== 'object' || data.version !== 1) return null;
  const base = freshState(data.lang === 'nb' ? 'nb' : 'en');
  const out = { ...base };
  for (const k of Object.keys(base)) {
    if (k === 'costs' || k === 'version') continue;
    if (typeof data[k] === 'string') out[k] = data[k].slice(0, 200);
  }
  if (!['gross', 'net'].includes(out.incomeMode)) out.incomeMode = 'gross';
  if (Array.isArray(data.costs)) {
    out.costs = data.costs.slice(0, 100).filter(c => c && typeof c === 'object').map(c => ({
      id: uid(),
      key: typeof c.key === 'string' && T.en[c.key] && c.key.startsWith('c_') ? c.key : '',
      name: typeof c.name === 'string' ? c.name.slice(0, 200) : '',
      amount: typeof c.amount === 'string' ? c.amount.slice(0, 40) : '',
      per: c.per === 'month' ? 'month' : 'year',
    }));
  }
  return out;
}

function load() {
  try {
    return normalize(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'));
  } catch {
    return null;
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Inside the Kodeby app page the browser may block storage; the calculator still works without it.
    if (!save.warned && window.top === window) { save.warned = true; alert(t('storageFull')); }
  }
}

// Shared links carry the numbers in the #fragment, which browsers never send to the server.
function fromHash() {
  const m = location.hash.match(/^#d=([A-Za-z0-9_-]+)$/);
  if (!m) return null;
  let data;
  try {
    const bin = atob(m[1].replace(/-/g, '+').replace(/_/g, '/'));
    data = normalize(JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, ch => ch.charCodeAt(0)))));
  } catch {
    return null;
  }
  if (!data) return null;
  const saved = load();
  data.lang = saved ? saved.lang : detectLang();
  if (saved) {
    const strip = s => JSON.stringify({ ...s, lang: '', costs: s.costs.map(({ id, ...c }) => c) });
    if (strip(saved) !== strip(data) && !confirm(T[saved.lang].confirmShared)) return null;
  }
  return data;
}

function shareLink() {
  const { lang, ...rest } = state;
  const bytes = new TextEncoder().encode(JSON.stringify({ ...rest, costs: state.costs.map(({ id, ...c }) => c) }));
  const b64 = btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `${location.origin}${location.pathname}#d=${b64}`;
}

// ---------- helpers ----------

const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function t(key, vars) {
  let s = (T[state.lang] && T[state.lang][key]) ?? T.en[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
  return s;
}

function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function num(v) {
  const n = parseFloat(String(v ?? '').replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

function money(n, digits = 0) {
  try {
    return new Intl.NumberFormat(LOCALES[state.lang], {
      style: 'currency', currency: state.currency, minimumFractionDigits: digits, maximumFractionDigits: digits,
    }).format(n);
  } catch {
    return `${plain(n, digits)} ${state.currency}`;
  }
}

function plain(n, digits = 0) {
  return new Intl.NumberFormat(LOCALES[state.lang], { maximumFractionDigits: digits }).format(n);
}

function rateDigits(n) {
  return n < 100 && !Number.isInteger(Math.round(n * 100) / 100) ? 2 : 0;
}

// Round up to a step that reads like a real price: 5, 10 or 50 depending on size.
function niceRate(n) {
  const step = n < 20 ? 0.5 : n < 200 ? 5 : n < 1000 ? 10 : 50;
  return Math.ceil(n / step - 1e-9) * step;
}

function costPerYear(c) {
  return num(c.amount) * (c.per === 'month' ? 12 : 1);
}

// ---------- the calculation ----------

function calculate(s) {
  const tax = Math.min(Math.max(num(s.taxRate), 0), 100) / 100;
  const income = Math.max(num(s.income), 0);
  const salary = s.incomeMode === 'net' ? (tax < 1 ? income / (1 - tax) : NaN) : income;
  const takeHome = salary * (1 - tax);
  const taxAmount = salary - takeHome;
  const pension = salary * Math.max(num(s.pension), 0) / 100;
  const costs = s.costs.reduce((sum, c) => sum + Math.max(costPerYear(c), 0), 0);
  const marginShare = Math.max(num(s.buffer), 0) / 100;
  const base = salary + pension + costs;
  const margin = base * marginShare;
  const revenue = base + margin;

  const hoursPerDay = Math.max(num(s.hoursPerDay), 0);
  const days = Math.max(WORKDAYS_PER_YEAR - num(s.vacationWeeks) * 5 - num(s.holidayDays) - num(s.sickDays), 0);
  const hours = days * hoursPerDay;
  const billShare = Math.min(Math.max(num(s.billable), 0), 100) / 100;
  const billHours = hours * billShare;
  const weeks = days / 5;

  const rate = billHours > 0 ? revenue / billHours : NaN;
  const suggested = Number.isFinite(rate) ? niceRate(rate) : NaN;
  const vat = Math.max(num(s.vatRate), 0) / 100;

  let check = null;
  const checkRate = num(s.checkRate);
  if (checkRate > 0 && billHours > 0) {
    // Same split as the goal: keep the margin, pay costs, the rest is salary plus pension.
    const checkRevenue = checkRate * billHours;
    const forSalary = checkRevenue / (1 + marginShare) - costs;
    const checkSalary = forSalary / (1 + Math.max(num(s.pension), 0) / 100);
    check = {
      rate: checkRate,
      takeHomeMonth: (checkSalary * (1 - tax)) / 12,
      goalShare: takeHome > 0 ? (checkSalary * (1 - tax)) / takeHome : NaN,
      hoursPerWeek: weeks > 0 ? revenue / checkRate / weeks : NaN,
      covers: checkRate >= rate,
      loss: forSalary <= 0,
    };
  }

  return {
    salary, takeHome, taxAmount, pension, costs, margin, revenue,
    days, hours, hoursPerDay, billHours, billShare, weeks,
    rate, suggested, vat, check, badTax: s.incomeMode === 'net' && tax >= 1,
  };
}

// ---------- rendering ----------

function renderCosts() {
  $('#costs').innerHTML = state.costs.map(c => `
    <div class="item" data-id="${esc(c.id)}">
      <input data-field="name" value="${esc(c.name || (c.key ? t(c.key) : ''))}" placeholder="${esc(t('newCost'))}" aria-label="${esc(t('costName'))}">
      <input data-field="amount" inputmode="decimal" value="${esc(c.amount)}" aria-label="${esc(t('costAmount'))}">
      <select data-field="per" aria-label="${esc(t('costPer'))}">
        <option value="month" ${c.per === 'month' ? 'selected' : ''}>${esc(t('month'))}</option>
        <option value="year" ${c.per === 'year' ? 'selected' : ''}>${esc(t('year'))}</option>
      </select>
      <output class="right">${esc(money(costPerYear(c)))}</output>
      <button type="button" class="icon" data-remove title="${esc(t('removeCost'))}" aria-label="${esc(t('removeCost'))}">×</button>
    </div>`).join('');
}

function updateCostTotals() {
  $$('#costs .item').forEach(row => {
    const c = state.costs.find(x => x.id === row.dataset.id);
    if (c) row.querySelector('output').textContent = money(costPerYear(c));
  });
}

function renderResult() {
  const r = calculate(state);
  $('#billable-out').textContent = `${plain(num(state.billable))} %`;
  const box = $('#result');

  if (r.badTax) { box.innerHTML = `<p class="empty">${esc(t('badTax'))}</p>`; return; }
  if (!(r.billHours > 0)) { box.innerHTML = `<p class="empty">${esc(t('noHours'))}</p>`; return; }

  const parts = [
    ['takeHome', r.takeHome], ['tax', r.taxAmount], ['pension', r.pension], ['costs', r.costs], ['margin', r.margin],
  ].filter(([, v]) => v > 0);
  const total = parts.reduce((s, [, v]) => s + v, 0) || 1;

  const bar = parts.map(([k, v]) =>
    `<span class="seg seg-${k}" data-w="${(v / total * 100).toFixed(2)}" title="${esc(t('b_' + k))}: ${esc(money(v))}"></span>`).join('');
  const legend = parts.map(([k, v]) => `
    <li><span class="dot seg-${k}"></span><span>${esc(t('b_' + k))}</span><span class="num">${esc(money(v))}</span><span class="num pct">${plain(v / total * 100)} %</span></li>`).join('');

  const tiles = [
    [t('inclVat', { rate: plain(r.vat * 100, 2) }), money(r.suggested * (1 + r.vat), rateDigits(r.suggested))],
    [t('dayRate', { hours: plain(r.hoursPerDay, 2) }), money(r.suggested * r.hoursPerDay)],
    [t('monthRevenue'), money(r.revenue / 12)],
    [t('billHours'), plain(r.billHours)],
  ].map(([k, v]) => `<div class="tile"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('');

  let check = '';
  if (r.check) {
    const c = r.check;
    const status = c.loss ? t('checkNoProfit') : c.covers ? t('checkOk') : t('checkLow');
    check = `
      <section class="check ${c.covers ? 'ok' : 'low'}">
        <h3>${esc(t('checkTitle', { rate: money(c.rate, rateDigits(c.rate)) }))}</h3>
        <p class="status">${esc(status)}</p>
        <div class="tiles two">
          <div class="tile"><span>${esc(t('checkTakeHome'))}</span><strong>${esc(money(Math.max(c.takeHomeMonth, 0)))}</strong></div>
          <div class="tile"><span>${esc(t('checkGoal'))}</span><strong>${Number.isFinite(c.goalShare) ? esc(plain(Math.max(c.goalShare, 0) * 100)) + ' %' : '–'}</strong></div>
        </div>
        ${!c.covers && Number.isFinite(c.hoursPerWeek) ? `<p>${esc(t('checkHours', { hours: plain(c.hoursPerWeek, 1) }))}</p>` : ''}
      </section>`;
  }

  const assumptions = [
    [state.incomeMode === 'net' ? t('a_income_net') : t('a_income_gross'), money(num(state.income))],
    [t('a_tax'), `${plain(num(state.taxRate), 2)} %`],
    [t('a_pension'), `${plain(num(state.pension), 2)} %`],
    [t('a_costs'), money(r.costs)],
    [t('a_margin'), `${plain(num(state.buffer), 2)} %`],
    [t('a_time'), t('a_timeVal', { days: plain(r.days), hours: plain(r.hoursPerDay, 2), billable: plain(r.billShare * 100) })],
  ].map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('');

  box.innerHTML = `
    <p class="print-only print-title">${esc(t('appName'))}</p>
    <p class="eyebrow">${esc(t('resultTitle'))}</p>
    <p class="big"><strong>${esc(money(r.suggested, rateDigits(r.suggested)))}</strong> <span>${esc(t('perHourExVat'))}</span></p>
    <p class="exact">${esc(t('exact', { amount: money(r.rate, 2) }))}</p>
    <div class="tiles">${tiles}</div>

    <h3>${esc(t('whereTitle'))}</h3>
    <div class="bar" role="img" aria-label="${esc(parts.map(([k, v]) => `${t('b_' + k)} ${money(v)}`).join(', '))}">${bar}</div>
    <ul class="legend">${legend}
      <li class="sum"><span></span><span>${esc(t('yearRevenue'))}</span><span class="num">${esc(money(r.revenue))}</span><span></span></li>
    </ul>
    <p class="time">${esc(t('timeSummary', { days: plain(r.days), hours: plain(r.hours), billHours: plain(r.billHours), perWeek: plain(r.billHours / r.weeks, 1) }))}</p>
    ${check}

    <section class="print-only">
      <h3>${esc(t('assumptions'))}</h3>
      <dl class="assumptions">${assumptions}</dl>
    </section>
    <p class="fine">${esc(t('estimate'))}</p>
    <p class="fine print-only">${esc(t('printedOn', { date: new Date().toLocaleDateString(LOCALES[state.lang]) }))}</p>`;
  // Set through the DOM, since the Content Security Policy blocks inline style attributes.
  $$('#result .seg').forEach(seg => { seg.style.width = `${seg.dataset.w}%`; });
}

function applyLanguage() {
  document.documentElement.lang = state.lang === 'nb' ? 'nb' : 'en';
  document.title = t('appName');
  $('#lang').value = state.lang;
  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
}

function fillForm() {
  $$('[data-bind]').forEach(el => { el.value = state[el.dataset.bind]; });
}

function renderAll() {
  applyLanguage();
  fillForm();
  renderCosts();
  renderResult();
}

// ---------- events ----------

$('#editor').addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.bind) {
    state[el.dataset.bind] = el.value;
    if (el.dataset.bind === 'currency') updateCostTotals();
  } else {
    const row = el.closest('.item');
    const c = row && state.costs.find(x => x.id === row.dataset.id);
    if (!c) return;
    if (el.dataset.field === 'name') { c.name = el.value; c.key = ''; }
    if (el.dataset.field === 'amount') c.amount = el.value;
    if (el.dataset.field === 'per') c.per = el.value === 'month' ? 'month' : 'year';
    row.querySelector('output').textContent = money(costPerYear(c));
  }
  save();
  renderResult();
});

$('#editor').addEventListener('submit', e => e.preventDefault());

$('#costs').addEventListener('click', e => {
  const btn = e.target.closest('[data-remove]');
  if (!btn) return;
  const id = btn.closest('.item').dataset.id;
  state.costs = state.costs.filter(c => c.id !== id);
  save();
  renderCosts();
  renderResult();
});

$('#btn-add-cost').addEventListener('click', () => {
  state.costs.push({ id: uid(), key: '', name: '', amount: '', per: 'month' });
  save();
  renderCosts();
  renderResult();
  $$('#costs .item input[data-field="name"]').pop().focus();
});

$('#lang').addEventListener('change', e => {
  state.lang = e.target.value === 'nb' ? 'nb' : 'en';
  save();
  renderAll();
});

$('#btn-reset').addEventListener('click', () => {
  if (!confirm(t('confirmReset'))) return;
  state = freshState(state.lang);
  save();
  renderAll();
});

$('#btn-print').addEventListener('click', () => window.print());

$('#btn-share').addEventListener('click', async () => {
  const link = shareLink();
  try {
    await navigator.clipboard.writeText(link);
    alert(t('copied'));
  } catch {
    prompt(t('copyPrompt'), link);
  }
});

renderAll();
