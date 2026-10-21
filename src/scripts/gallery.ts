// Gallery page: style filters and the design lightbox.
//
// Filters: buttons with aria-pressed. When motion is allowed the change is animated with GSAP Flip
// (loaded on demand from the same gsap package as motion.ts); otherwise tiles simply show and hide.
// Lightbox: a modal <dialog> with a focus trap, Esc to close, arrow keys for next / previous
// (mirrored in Arabic), swipe on touch screens, and focus back on the design's tile when it closes.
// Opening and closing: a 0.2s fade with a scale from 0.96 (skipped under reduced motion).

type FlipKit = { gsap: typeof import('gsap').gsap; Flip: typeof import('gsap/Flip').Flip };

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let flipKit: Promise<FlipKit> | null = null;
const loadFlip = () =>
  (flipKit ??= Promise.all([import('gsap'), import('gsap/Flip')]).then(([{ gsap }, { Flip }]) => {
    gsap.registerPlugin(Flip);
    return { gsap, Flip };
  }));

function initFilters(tiles: HTMLElement[]) {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const status = document.querySelector<HTMLElement>('[data-count-status]');
  let flip: gsap.core.Timeline | null = null;

  const apply = (filter: string) => {
    tiles.forEach((tile) => (tile.hidden = filter !== 'all' && tile.dataset.category !== filter));
  };

  // Tiles may still be waiting for their scroll reveal (motion.ts). Finish it so Flip starts from a
  // clean, visible state, and mark them so motion.ts leaves them alone from now on.
  const settle = (gsap: FlipKit['gsap']) => {
    tiles.forEach((tile) => {
      if (tile.getAttribute('data-motion') === 'seen') return;
      gsap.killTweensOf(tile);
      gsap.set(tile, { clearProps: 'opacity,transform' });
      tile.setAttribute('data-motion', 'seen');
    });
  };

  const select = async (button: HTMLButtonElement) => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    if (status) status.textContent = button.dataset.count ?? '';
    const filter = button.dataset.filter ?? 'all';

    if (reducedMotion()) {
      apply(filter);
      return;
    }
    let kit: FlipKit;
    try {
      kit = await loadFlip();
    } catch {
      apply(filter);
      return;
    }
    // Another filter was chosen while Flip loaded: only the latest one runs.
    if (button.getAttribute('aria-pressed') !== 'true') return;
    const { gsap, Flip } = kit;
    flip?.progress(1);
    settle(gsap);
    const state = Flip.getState(tiles);
    apply(filter);
    flip = Flip.from(state, {
      // Tiles moving across the grid ease in and out; entering tiles ease out, leaving ones go faster.
      duration: 0.5,
      ease: 'power3.inOut',
      absolute: true,
      stagger: 0.02,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.out' }),
    });
  };

  buttons.forEach((button) => button.addEventListener('click', () => select(button)));
  // Warm up Flip once the page has settled, so the first filter change starts at once.
  if (!reducedMotion()) {
    const warm = () => loadFlip().catch(() => {});
    if (document.readyState === 'complete') warm();
    else window.addEventListener('load', warm, { once: true });
  }
}

function initLightbox(tiles: HTMLElement[]) {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  if (!dialog) return;
  const panel = dialog.querySelector<HTMLElement>('[data-lightbox-panel]')!;
  const media = dialog.querySelector<HTMLElement>('[data-lightbox-media]')!;
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]')!;
  const count = dialog.querySelector<HTMLElement>('[data-lightbox-count]')!;
  const closeButton = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]')!;
  const template = dialog.dataset.countTemplate ?? '{n} / {total}';
  const rtl = document.documentElement.dir === 'rtl';
  let current: HTMLButtonElement | null = null;
  let closing = false;

  const openers = () => tiles.filter((tile) => !tile.hidden).map((tile) => tile.querySelector<HTMLButtonElement>('[data-open]')!);

  const show = (opener: HTMLButtonElement) => {
    current = opener;
    const list = openers();
    const { full, alt, placeholder } = opener.dataset;
    if (full) {
      const img = document.createElement('img');
      img.src = full;
      img.alt = alt ?? '';
      img.decoding = 'async';
      media.replaceChildren(img);
    } else {
      const box = document.createElement('div');
      box.className = 'placeholder-media lightbox-placeholder';
      box.textContent = placeholder ?? '';
      media.replaceChildren(box);
    }
    caption.textContent = opener.dataset.caption ?? '';
    count.textContent = template.replace('{n}', String(list.indexOf(opener) + 1)).replace('{total}', String(list.length));
  };

  const step = (delta: number) => {
    const list = openers();
    if (!current || list.length < 2) return;
    const i = list.indexOf(current);
    show(list[(i + delta + list.length) % list.length]);
  };

  const animate = (from: Keyframe, to: Keyframe) =>
    reducedMotion()
      ? Promise.resolve()
      : panel.animate([from, to], { duration: 200, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'both' }).finished.catch(() => {});
  const shown = { opacity: 1, transform: 'scale(1)' };
  const hiddenState = { opacity: 0, transform: 'scale(0.96)' };

  const open = (opener: HTMLButtonElement) => {
    show(opener);
    closing = false;
    dialog.showModal();
    closeButton.focus();
    animate(hiddenState, shown);
  };

  const close = async () => {
    if (closing || !dialog.open) return;
    closing = true;
    await animate(shown, hiddenState);
    dialog.close();
    panel.getAnimations().forEach((a) => a.cancel());
    closing = false;
  };

  dialog.addEventListener('close', () => {
    // Back to the tile of the design that was showing.
    current?.focus();
  });
  // Esc: animate out instead of closing at once.
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });
  closeButton.addEventListener('click', close);
  dialog.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => step(-1));
  dialog.querySelector('[data-lightbox-next]')?.addEventListener('click', () => step(1));

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      // Next is the reading direction: right in English, left in Arabic.
      const forward = e.key === (rtl ? 'ArrowLeft' : 'ArrowRight');
      step(forward ? 1 : -1);
      return;
    }
    if (e.key !== 'Tab') return;
    const items = Array.from(dialog.querySelectorAll<HTMLElement>('button'));
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Swipe: towards the reading direction's start shows the next design.
  const swipeArea = dialog.querySelector<HTMLElement>('[data-lightbox-swipe]')!;
  let startX = 0;
  let startY = 0;
  swipeArea.addEventListener(
    'touchstart',
    (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true },
  );
  swipeArea.addEventListener(
    'touchend',
    (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      const forward = rtl ? dx > 0 : dx < 0;
      step(forward ? 1 : -1);
    },
    { passive: true },
  );

  tiles.forEach((tile) => {
    const opener = tile.querySelector<HTMLButtonElement>('[data-open]');
    opener?.addEventListener('click', () => open(opener));
  });
}

export function initGallery() {
  const grid = document.querySelector<HTMLElement>('[data-design-grid]');
  if (!grid) return;
  const tiles = Array.from(grid.querySelectorAll<HTMLElement>('.design-tile'));
  initFilters(tiles);
  initLightbox(tiles);
}
