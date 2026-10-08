import { siteConfig as config } from './config.js';
import { photoItems } from './render.js';
import { $, $$, readStored, writeStored, removeStored, parseCivilDate, todayInZone, calendarDays } from './utils.js';
import { burstAt } from './animations.js';

const OPENED_KEY = 'npi-invitation-opened';
const LETTERS_KEY = 'npi-letters-opened';
let toastTimer;

function toast(message) {
  const node = $('#toast');
  node.textContent = message;
  node.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('show'), 3700);
}

function initNavigation() {
  const toggle = $('#nav-toggle'); const nav = $('#chapter-nav');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu de capítulos' : 'Abrir menu de capítulos');
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu de capítulos'); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus();
    }
  });
}

function updateCounter() {
  const start = parseCivilDate(config.dataInicioNamoro);
  const anniversary = parseCivilDate(config.dataPrimeiroAniversario);
  const today = todayInZone(config.timezone || 'America/Recife');
  if (!start || !today || !anniversary) {
    $('#day-count').textContent = 'Nossa história ♡';
    $('#anniversary-message').textContent = '';
    return;
  }
  const elapsed = Math.max(0, calendarDays(start, today));
  const number = document.createTextNode(String(elapsed) + ' ');
  const unit = document.createElement('small'); unit.textContent = elapsed === 1 ? 'dia' : 'dias';
  $('#day-count').replaceChildren(number, unit);
  const until = calendarDays(today, anniversary);
  $('#anniversary-message').textContent = until > 0
    ? `Falta${until === 1 ? '' : 'm'} ${until} ${until === 1 ? 'dia' : 'dias'} para o nosso primeiro aniversário. ♡`
    : until === 0 ? 'Hoje celebramos nosso primeiro ano juntos. ♡' : 'E a nossa história continua crescendo a cada dia. ♡';
}

function initInvitation() {
  const button = $('#intro-envelope'); const invite = $('#convite');
  function open(save = true) {
    button.classList.add('open'); invite.classList.add('opened');
    button.setAttribute('aria-expanded', 'true'); button.setAttribute('aria-label', 'Envelope aberto');
    if (save) writeStored(OPENED_KEY, true);
  }
  function close() {
    button.classList.remove('open'); invite.classList.remove('opened');
    button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-label', 'Abrir o envelope');
    removeStored(OPENED_KEY);
  }
  if (readStored(OPENED_KEY, false)) open(false);
  button.addEventListener('click', () => { if (invite.classList.contains('opened')) close(); else { open(); burstAt(button, 12); } });
  $('#discover-button').addEventListener('click', () => burstAt($('#discover-button'), 18));
  $('#revisit-link').addEventListener('click', () => {
    close();
  });
}

function initWorlds() {
  const button = $('#join-worlds'); const stage = $('#worlds-stage'); const union = $('#worlds-union');
  union.inert = true; union.setAttribute('aria-hidden', 'true');
  button.addEventListener('click', () => {
    const joined = !stage.classList.contains('joined');
    stage.classList.toggle('joined', joined); union.classList.toggle('visible', joined);
    union.inert = !joined; union.setAttribute('aria-hidden', String(!joined));
    button.setAttribute('aria-pressed', String(joined));
    button.querySelector('small').innerHTML = joined ? 'JUNTOS<br>♡' : 'UNIR<br>OS MUNDOS';
    if (joined) burstAt(button, 18);
  });
}

function initQuiz() {
  const questions = Array.isArray(config.perguntas) ? config.perguntas.filter(q => q?.pergunta && Array.isArray(q.opcoes) && q.opcoes.length) : [];
  const panel = $('#quiz-panel'); let index = 0; let score = 0; let answered = false;
  function draw() {
    const question = questions[index];
    $('#quiz-feedback').textContent = '';
    $('#quiz-options').replaceChildren();
    $('#quiz-next').hidden = true; $('#quiz-restart').hidden = true;
    if (!question) {
      $('#quiz-progress').textContent = 'FIM DO JOGO';
      $('#quiz-track-fill').style.width = '100%';
      $('#quiz-question').textContent = config.mensagemFinalJogo;
      $('#quiz-feedback').textContent = `${score} de ${questions.length} ${score === 1 ? 'resposta certa' : 'respostas certas'}. O importante é que a gente se escolheu. ♡`;
      $('#quiz-score').textContent = `${score} ${score === 1 ? 'acerto' : 'acertos'} ♡`;
      $('#quiz-skip').hidden = true; $('#quiz-restart').hidden = false;
      burstAt(panel, 18);
      return;
    }
    answered = false;
    $('#quiz-progress').textContent = `PERGUNTA ${String(index + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`;
    $('#quiz-score').textContent = `${score} ${score === 1 ? 'acerto' : 'acertos'} ♡`;
    $('#quiz-track-fill').style.width = `${index / questions.length * 100}%`;
    $('#quiz-question').textContent = question.pergunta;
    $('#quiz-skip').hidden = false;
    question.opcoes.forEach((option, optionIndex) => {
      const button = document.createElement('button'); button.className = 'quiz-option'; button.type = 'button'; button.textContent = option;
      button.addEventListener('click', () => {
        if (answered) return;
        if (optionIndex === question.correta) {
          answered = true; score++;
          button.classList.add('correct');
          $$('.quiz-option', panel).forEach(item => { item.disabled = true; });
          $('#quiz-feedback').textContent = question.acerto || 'Acertou! ♡';
          $('#quiz-score').textContent = `${score} ${score === 1 ? 'acerto' : 'acertos'} ♡`;
          $('#quiz-next').hidden = false; $('#quiz-skip').hidden = true;
          burstAt(button, 10);
        } else {
          button.classList.add('wrong'); button.disabled = true;
          $('#quiz-feedback').textContent = question.erro || 'Quase! Tente de novo ou pule esta pergunta. ♡';
        }
      });
      $('#quiz-options').append(button);
    });
  }
  $('#quiz-next').addEventListener('click', () => { index++; draw(); });
  $('#quiz-skip').addEventListener('click', () => { index++; draw(); });
  $('#quiz-restart').addEventListener('click', () => { index = 0; score = 0; draw(); });
  if (questions.length) draw(); else { $('#quiz-question').textContent = 'Em breve: um jogo só nosso. ♡'; $('#quiz-skip').hidden = true; }
}

function initLetters() {
  const stored = readStored(LETTERS_KEY, []);
  const opened = new Set(Array.isArray(stored) ? stored : []);
  $$('.mini-letter').forEach(button => {
    const index = Number(button.dataset.letter);
    if (opened.has(index)) { button.classList.add('opened'); button.querySelector('.mini-status').textContent = 'JÁ LIDA · ABRIR'; }
    button.addEventListener('click', () => {
      $$('.mini-letter').forEach(other => other.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true'); button.classList.add('opened');
      button.querySelector('.mini-status').textContent = 'JÁ LIDA · ABRIR';
      opened.add(index); writeStored(LETTERS_KEY, [...opened]);
      const display = $('#letter-display');
      display.replaceChildren();
      const mark = document.createElement('span'); mark.className = 'letter-display-mark'; mark.textContent = index === 11 ? '✦' : '♡';
      const text = document.createElement('p'); text.textContent = config.cartinhas[index];
      const label = document.createElement('small'); label.textContent = `CARTINHA ${String(index + 1).padStart(2, '0')} / 12`;
      display.append(mark, text, label);
      if (matchMedia('(max-width: 600px)').matches) display.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    });
  });
}

function initPhotoDialog() {
  const dialog = $('#photo-dialog'); let current = 0;
  function show(index) {
    if (!photoItems.length) return;
    current = (index + photoItems.length) % photoItems.length;
    const photo = photoItems[current];
    dialog.classList.remove('zoomed');
    $('#dialog-zoom').setAttribute('aria-pressed', 'false');
    $('#dialog-zoom').textContent = 'Ampliar detalhes';
    $('#dialog-image').src = photo.src;
    $('#dialog-image').alt = photo.alt || photo.caption || 'Nossa foto';
    $('#dialog-caption').textContent = photo.caption || '';
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
    $('#dialog-close').focus();
  }
  document.addEventListener('click', event => {
    const photo = event.target.closest('[data-photo-index]');
    if (photo && !photo.disabled) show(Number(photo.dataset.photoIndex));
  });
  $('#dialog-image').addEventListener('error', () => { if (dialog.open) { dialog.close(); toast('Esta foto não pôde ser carregada.'); } });
  $('#dialog-close').addEventListener('click', () => dialog.close());
  $('#dialog-zoom').addEventListener('click', () => {
    const zoomed = dialog.classList.toggle('zoomed');
    $('#dialog-zoom').setAttribute('aria-pressed', String(zoomed));
    $('#dialog-zoom').textContent = zoomed ? 'Ver foto inteira' : 'Ampliar detalhes';
  });
  $('#dialog-prev').addEventListener('click', () => show(current - 1));
  $('#dialog-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('keydown', event => {
    if (!dialog.open) return;
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
}

function initMusicPreviews() {
  const close = button => {
    button.setAttribute('aria-expanded', 'false');
    button.textContent = '▶ Ouvir prévia';
    const slot = document.getElementById(button.getAttribute('aria-controls'));
    slot.replaceChildren(); slot.hidden = true;
  };
  $$('.record-preview-toggle').forEach(button => button.addEventListener('click', () => {
    const wasOpen = button.getAttribute('aria-expanded') === 'true';
    $$('.record-preview-toggle[aria-expanded="true"]').forEach(close);
    if (wasOpen) return;
    const previewUrl = button.dataset.preview;
    const videoId = button.dataset.videoId;
    if (!previewUrl && !/^[\w-]{11}$/.test(videoId)) return;
    const player = document.createElement('iframe');
    if (previewUrl) {
      player.src = previewUrl;
      player.loading = 'lazy';
    } else {
      const start = Math.max(0, Math.floor(Number(button.dataset.start) || 0));
      const end = Math.max(start + 1, Math.floor(Number(button.dataset.end) || start + 30));
      player.src = `https://www.youtube-nocookie.com/embed/${videoId}?start=${start}&end=${end}&autoplay=1&rel=0`;
    }
    player.title = `Prévia de ${button.closest('.record-card').querySelector('h3').textContent}`;
    player.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    player.allowFullscreen = true;
    const slot = document.getElementById(button.getAttribute('aria-controls'));
    slot.replaceChildren(player); slot.hidden = false;
    button.setAttribute('aria-expanded', 'true'); button.textContent = '■ Fechar prévia';
  }));
}

function initAffection() {
  let hugTimer;
  $('#hug-button').addEventListener('click', () => {
    $('#hug-message').textContent = config.abraco;
    $('.hug-art').classList.add('hugging');
    burstAt($('#hug-button'), 14);
    clearTimeout(hugTimer); hugTimer = setTimeout(() => $('.hug-art').classList.remove('hugging'), 2400);
  });
  $('#kiss-button').addEventListener('click', () => { $('#hug-message').textContent = config.beijinho; burstAt($('#kiss-button'), 10); });
}

function initFinale() {
  const envelope = $('#final-envelope'); const letter = $('#final-letter');
  envelope.addEventListener('click', () => {
    const open = !letter.classList.contains('visible');
    envelope.classList.toggle('open', open); envelope.setAttribute('aria-expanded', String(open)); envelope.setAttribute('aria-label', open ? 'Fechar a carta final' : 'Abrir a carta final');
    letter.classList.toggle('visible', open); $('#finale-hint').hidden = open;
    if (!open) return;
    burstAt(envelope, 14);
    setTimeout(() => letter.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }), 250);
  });
}

function initSurprise() {
  const gift = $('#gift-button');
  gift.addEventListener('click', () => {
    const open = !gift.classList.contains('open');
    gift.classList.toggle('open', open); gift.setAttribute('aria-expanded', String(open)); gift.setAttribute('aria-label', open ? 'Fechar o presente' : 'Abrir o presente');
    $('#gift-reveal').classList.toggle('visible', open); if (open) burstAt(gift, 20);
  });
  $$('.promise-card').forEach(button => button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open)); button.classList.toggle('revealed', open);
    button.querySelector('small').textContent = open ? config[button.dataset.promise] || 'Um carinho para nós. ♡' : 'Toque para revelar';
  }));
  $('#celebrate-button').addEventListener('click', () => {
    $('#celebration-message').textContent = 'Feliz 1 ano de namoro! ❤️';
    burstAt($('#celebrate-button'), 22);
  });
}

function initSecrets() {
  $$('[data-secret]').forEach(button => button.addEventListener('click', () => {
    toast(config.segredos?.[button.dataset.secret] || 'Você encontrou um pedacinho escondido de amor. ♡');
    burstAt(button, button.dataset.secret === 'web' ? 18 : 8);
    if (button.dataset.secret === 'web') {
      const web = $('.web-heart'); web.classList.remove('web-spark');
      void web.offsetWidth; web.classList.add('web-spark');
      web.addEventListener('animationend', () => web.classList.remove('web-spark'), { once: true });
    }
  }));
}

export function initInteractions() {
  initNavigation(); updateCounter(); setInterval(updateCounter, 60000);
  initInvitation(); initWorlds(); initQuiz(); initLetters(); initPhotoDialog(); initMusicPreviews();
  initAffection(); initFinale(); initSurprise(); initSecrets();
}
