import { renderSite } from './render.js';
import { initMotion } from './animations.js';
import { initInteractions } from './interactions.js';

document.body.classList.add('js');
renderSite();
initInteractions();
initMotion();
