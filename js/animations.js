import { $, $$ } from './utils.js';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function burstHearts(x, y, count = 14) {
  if (reducedMotion()) return;
  const colors = ['#ff4f9a', '#e63946', '#8cb8ff', '#ffd6e7'];
  const total = Math.min(count, 22);
  for (let i = 0; i < total; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-pop'; heart.textContent = i % 4 === 0 ? '✦' : '♥';
    const angle = (i / total) * Math.PI * 2;
    const distance = 55 + Math.random() * 95;
    heart.style.setProperty('--x', `${x}px`);
    heart.style.setProperty('--y', `${y}px`);
    heart.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    heart.style.setProperty('--dy', `${Math.sin(angle) * distance - 20}px`);
    heart.style.setProperty('--color', colors[i % colors.length]);
    heart.style.setProperty('--size', `${12 + Math.random() * 15}px`);
    document.body.append(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
}

export function burstAt(element, count) {
  const box = element.getBoundingClientRect();
  burstHearts(box.left + box.width / 2, box.top + box.height / 2, count);
}

export function initMotion() {
  const reveal = $$('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion()) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.09, rootMargin: '0px 0px -25px 0px' });
    reveal.forEach(node => observer.observe(node));
  } else reveal.forEach(node => node.classList.add('visible'));

  const chapters = $$('.chapter');
  const navLinks = $$('.chapter-nav a');
  let pending = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    $('#reading-progress').style.width = `${max > 0 ? Math.min(100, Math.max(0, scrollY / max * 100)) : 100}%`;
    const marker = innerHeight * .43;
    let current = chapters[0];
    chapters.forEach(chapter => { if (chapter.getBoundingClientRect().top <= marker) current = chapter; });
    $('#header-chapter').textContent = `${String(current.dataset.chapter).padStart(2, '0')} / ${String(chapters.length).padStart(2, '0')}`;
    navLinks.forEach(link => {
      const active = link.hash === `#${current.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    pending = false;
  }
  addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(updateProgress); } }, { passive: true });
  addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}
