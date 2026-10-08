export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

export function element(tag, className = '', text = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = String(text);
  return node;
}

export function readStored(key, fallback = null) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
export function writeStored(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage may be disabled. */ }
}
export function removeStored(key) {
  try { localStorage.removeItem(key); } catch { /* Storage may be disabled. */ }
}

export function parseCivilDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!match) return null;
  const [year, month, day] = match.slice(1).map(Number);
  const value = new Date(Date.UTC(year, month - 1, day));
  if (value.getUTCFullYear() !== year || value.getUTCMonth() !== month - 1 || value.getUTCDate() !== day) return null;
  return { year, month, day, epoch: value.getTime() };
}

export function todayInZone(zone) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const get = type => Number(parts.find(part => part.type === type)?.value);
    return parseCivilDate(`${get('year')}-${String(get('month')).padStart(2, '0')}-${String(get('day')).padStart(2, '0')}`);
  } catch { return parseCivilDate(new Date().toISOString().slice(0, 10)); }
}

export function calendarDays(start, end) {
  return start && end ? Math.round((end.epoch - start.epoch) / 86400000) : 0;
}

export function displayDate(iso, separator = '.') {
  const date = parseCivilDate(iso);
  return date ? `${String(date.day).padStart(2, '0')}${separator}${String(date.month).padStart(2, '0')}${separator}${date.year}` : '';
}

export function externalUrl(value) {
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol) ? url.href : '';
  } catch { return ''; }
}

export function personalize(value, config) {
  const replacements = {
    apelido: config.apelidoCarinhoso || 'meu amor',
    nomeDele: config.nomeDele || 'Seu namorado',
    nomeDela: config.nomeDela || 'meu amor',
    saudacao: config.nomeDela || 'Meu amor',
    assinante: config.nomeDele || 'Seu namorado'
  };
  return String(value ?? '').replace(/\{(apelido|nomeDele|nomeDela|saudacao|assinante)\}/g, (_, key) => replacements[key]);
}

export function addPhotoOrFallback(container, src, alt, emoji = '♡') {
  if (!src) { container.append(element('span', '', emoji)); return; }
  const image = element('img');
  image.src = src;
  image.alt = alt || 'Uma memória nossa';
  image.loading = 'lazy';
  image.decoding = 'async';
  image.addEventListener('error', () => {
    image.remove();
    container.append(element('span', '', emoji));
    container.classList.add('photo-fallback');
    container.disabled = true;
  }, { once: true });
  container.append(image);
}
