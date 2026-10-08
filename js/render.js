import { siteConfig as config } from './config.js';
import { $, $$, element, displayDate, externalUrl, addPhotoOrFallback, personalize } from './utils.js';

export const photoItems = [];

function append(parent, ...children) { children.forEach(child => parent.append(child)); return parent; }

function setTextCopy() {
  document.title = config.nomeDoSite || 'Nosso Pequeno Infinito ♡';
  $$('[data-copy]').forEach(node => {
    const content = config.textos?.[node.dataset.copy];
    const value = node.id === 'universe-title' ? (content || config.nomeDoSite) : content;
    if (typeof value === 'string' && value.trim()) {
      const text = personalize(value, config);
      if (node.id === 'universe-title' && text.trimEnd().endsWith('♡')) {
        const heart = element('em', '', '♡');
        node.replaceChildren(document.createTextNode(text.trimEnd().slice(0, -1)), heart);
      } else node.textContent = text;
    }
  });
  const pairedHeadings = [
    ['#history-title', 'historyTitleStart', 'historyTitleEnd'],
    ['#worlds-title', 'worldsTitleStart', 'worldsTitleEnd'],
    ['#soundtrack-title', 'musicTitleStart', 'musicTitleEnd'],
    ['#quiz-title', 'quizTitleStart', 'quizTitleEnd'],
    ['#letters-title', 'lettersTitleStart', 'lettersTitleEnd'],
    ['#hug-title', 'hugTitleStart', 'hugTitleEnd'],
    ['#finale-title', 'finaleTitleStart', 'finaleTitleEnd'],
    ['#surprise-title', 'surpriseTitleStart', 'surpriseTitleEnd']
  ];
  pairedHeadings.forEach(([selector, first, second]) => {
    const heading = $(selector);
    if (typeof config.textos?.[first] === 'string') heading.firstChild.nodeValue = personalize(config.textos[first], config);
    if (typeof config.textos?.[second] === 'string') heading.querySelector('em').textContent = personalize(config.textos[second], config);
  });
  const paragraphs = [
    ['.history .section-heading p', 'historyIntro'],
    ['.quiz-intro p', 'quizIntro'],
    ['.letters .section-heading p', 'lettersIntro'],
    ['#letter-display p', 'letterPrompt'],
    ['.hug-copy > p:not(.hug-message)', 'hugIntro'],
    ['#finale-hint', 'finaleHint']
  ];
  paragraphs.forEach(([selector, key]) => {
    if (typeof config.textos?.[key] === 'string') $(selector).textContent = personalize(config.textos[key], config);
  });
  const start = displayDate(config.dataInicioNamoro);
  const anniversary = displayDate(config.dataPrimeiroAniversario);
  if (start && anniversary) {
    $('.invite .eyebrow').textContent = `${start} — ${anniversary}`;
    const dates = $$('.date-line > span:not(.date-heart)');
    dates[0].textContent = start;
    dates[1].textContent = anniversary;
  }
  if (config.cores?.dele?.[0]) document.documentElement.style.setProperty('--navy', config.cores.dele[0]);
  if (config.cores?.dele?.[1]) document.documentElement.style.setProperty('--red', config.cores.dele[1]);
  if (config.cores?.dela?.[0]) document.documentElement.style.setProperty('--pink-100', config.cores.dela[0]);
  if (config.cores?.dela?.[1]) document.documentElement.style.setProperty('--pink-500', config.cores.dela[1]);
}

function renderTimeline() {
  const root = $('#timeline');
  (config.momentos || []).forEach(moment => {
    const item = element('article', 'timeline-item reveal');
    const card = element('div', 'timeline-card');
    if (moment.data) card.append(element('span', 'date', moment.data));
    append(card, element('h3', '', moment.titulo || 'Um pedacinho da nossa história'), element('p', '', moment.descricao || 'Mais uma lembrança para guardar.'));
    const art = element('div', 'timeline-art');
    if (moment.foto) {
      const button = element('button', `photo-trigger memory-illustration photo-polaroid${moment.destaque ? ' important-photo' : ''}`);
      button.type = 'button';
      button.setAttribute('aria-label', `Ampliar foto: ${moment.titulo || 'Memória'}`);
      button.dataset.photoIndex = String(photoItems.push({ src: moment.foto, caption: moment.legenda || moment.titulo, alt: moment.alt || moment.titulo }) - 1);
      addPhotoOrFallback(button, moment.foto, moment.alt || moment.titulo, moment.emoji);
      art.append(button);
    } else {
      const illustration = element('div', 'memory-illustration');
      illustration.append(element('span', '', moment.emoji || '♡'));
      art.append(illustration);
    }
    append(item, card, art);
    root.append(item);
  });
}

function renderRecords() {
  const root = $('#record-grid');
  (config.playlist || []).forEach((record, index) => {
    const card = element('article', 'record-card reveal');
    const disc = element('span', 'disc'); disc.setAttribute('aria-hidden', 'true');
    const content = element('div', 'record-card-content');
    append(content, element('span', 'eyebrow', record.artista || 'NOSSA MÚSICA'), element('h3', '', record.musica || record.titulo || 'Uma canção para nós'), element('p', '', record.mensagem || 'Uma página da nossa trilha sonora.'));
    const actions = element('div', 'record-actions');
    if (record.previewUrl || /^[\w-]{11}$/.test(record.videoId || '')) {
      const preview = element('button', 'record-preview-toggle', '▶ Ouvir prévia');
      preview.type = 'button'; preview.dataset.preview = record.previewUrl || '';
      preview.dataset.videoId = record.videoId || '';
      preview.dataset.start = String(Math.max(0, Number(record.previewInicio) || 0));
      preview.dataset.end = String(Math.max(0, Number(record.previewFim) || 0));
      preview.setAttribute('aria-expanded', 'false');
      preview.setAttribute('aria-controls', `record-preview-${index}`);
      actions.append(preview);
    }
    const link = externalUrl(record.url);
    if (link) {
      const anchor = element('a', '', 'Abrir música ↗');
      anchor.href = link; anchor.target = '_blank'; anchor.rel = 'noopener noreferrer';
      actions.append(anchor);
    }
    content.append(actions);
    const previewSlot = element('div', 'record-preview');
    previewSlot.id = `record-preview-${index}`;
    previewSlot.hidden = true;
    content.append(previewSlot);
    if (index === 2 && config.musica?.ativada && config.musica.faixaLocal) {
      const audio = element('audio');
      audio.controls = true;
      audio.preload = 'none';
      audio.src = config.musica.faixaLocal;
      audio.volume = Math.max(0, Math.min(1, Number(config.musica.volumeInicial) || 0.3));
      audio.setAttribute('aria-label', 'Ouvir nossa música');
      content.append(audio);
    }
    append(card, disc, content); root.append(card);
  });
}

function renderLetters() {
  const root = $('#letter-grid');
  (config.cartinhas || []).forEach((message, index) => {
    const button = element('button', `mini-letter${index === 11 ? ' special' : ''} reveal`);
    button.type = 'button';
    button.dataset.letter = String(index);
    button.setAttribute('aria-label', `Abrir cartinha ${index + 1}`);
    button.setAttribute('aria-pressed', 'false');
    append(button, element('span', 'mini-num', String(index + 1).padStart(2, '0')), element('span', 'mini-icon', index === 11 ? '✦' : ['♡', '✿', '✧', '♥'][index % 4]), element('span', 'mini-status', 'TOQUE PARA ABRIR'));
    root.append(button);
  });
}

function renderFinalLetter() {
  const root = $('#final-letter-text');
  personalize(config.cartaFinal || '', config).split(/\n\s*\n/).filter(Boolean).forEach(paragraph => root.append(element('p', '', paragraph.trim())));
  $('#final-signature').textContent = personalize(config.assinatura || 'Com todo o meu amor ♡', config);
}

function renderPromises() {
  const root = $('#promise-grid');
  [['promessa', 'Uma promessa.', '♡'], ['desejo', 'Um desejo.', '✦'], ['plano', 'Um plano para nós.', '∞']].forEach(([key, label, icon]) => {
    const button = element('button', 'promise-card reveal'); button.type = 'button'; button.dataset.promise = key; button.setAttribute('aria-expanded', 'false');
    append(button, element('span', '', icon), element('strong', '', label), element('small', '', 'Toque para revelar'));
    root.append(button);
  });
}

export function renderSite() {
  setTextCopy(); renderTimeline(); renderRecords(); renderLetters(); renderFinalLetter(); renderPromises();
}
