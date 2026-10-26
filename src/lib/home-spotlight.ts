import type { Installation } from '../data/installations';
import { locationLabel } from '../data/installations';
import type { Testimonial } from '../data/testimonials';

function pickN<T>(items: readonly T[], n: number): T[] {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}

function installAlt(item: Installation, lang: 'en' | 'ml'): string {
  const loc = locationLabel(item.location, lang);
  if (lang === 'ml') return `${item.name}, ${loc} — ${item.capacity} സോളാർ ഇൻസ്റ്റാളേഷൻ`;
  return `${item.capacity} solar installation for ${item.name} in ${item.location}`;
}

export function initHomeSpotlight(opts: {
  lang: 'en' | 'ml';
  imgBase: string;
  installations: readonly Installation[];
  testimonials: readonly Testimonial[];
}): void {
  const cards = document.querySelectorAll<HTMLElement>('#home-installs .install-card');
  if (cards.length) {
    const picked = pickN(opts.installations, cards.length);
    picked.forEach((item, i) => {
      const card = cards[i];
      if (!card) return;
      const loc = locationLabel(item.location, opts.lang);
      const img = card.querySelector('img');
      const nameEl = card.querySelector('strong');
      const metaEl = card.querySelector('span');
      if (img) {
        img.src = `${opts.imgBase}/media/references/${item.img}`;
        img.alt = installAlt(item, opts.lang);
      }
      if (nameEl) nameEl.textContent = item.name;
      if (metaEl) metaEl.textContent = `${loc} · ${item.capacity}`;
    });
  }

  const tCards = document.querySelectorAll<HTMLElement>('#home-testimonials .tcard');
  if (tCards.length) {
    const picked = pickN(opts.testimonials, tCards.length);
    picked.forEach((t, i) => {
      const card = tCards[i];
      if (!card) return;
      const quote = card.querySelector('.tcard__quote');
      const avatar = card.querySelector('.tcard__avatar');
      const nameEl = card.querySelector('.tcard__author strong');
      const metaEl = card.querySelector('.tcard__author span');
      if (quote) quote.textContent = t.quote;
      if (avatar) avatar.textContent = t.initials;
      if (nameEl) nameEl.textContent = t.name;
      if (metaEl) {
        metaEl.textContent = t.meta;
        metaEl.hidden = !t.meta;
      }
    });
  }
}
