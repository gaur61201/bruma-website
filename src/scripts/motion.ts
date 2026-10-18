// Scroll choreography for the homepage (CLAUDE.md › Motion), with GSAP, ScrollTrigger and SplitText.
//
// Loaded lazily by Base.astro after the load event. Everything here is an enhancement:
// - CSS only hides [data-motion] elements while JS runs and motion is allowed, and shows them
//   after 2s if this file never arrives. Each element is "claimed" (data-motion="on") as it's set up.
// - Under prefers-reduced-motion nothing here runs, so elements simply appear.
// - The hero is animated in CSS (global.css) so the LCP text never waits for this file.
// Horizontal movement is multiplied by `dir`, so "from the inline-start side" flips in Arabic.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { numberState, setNumberAnimator, type NumberFormat } from './number-display';

const FAILSAFE_MS = 2000; // keep in sync with the CSS failsafe in global.css
const START = 'top 85%';
const EASE = 'power3.out';
const SLIDE = 32; // px, slide-ins from the inline-start side

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const rtl = document.documentElement.dir === 'rtl';
  const dir = rtl ? -1 : 1;
  // If GSAP arrives after the failsafe has already shown everything, leave what's on screen alone.
  const late = performance.now() > FAILSAFE_MS;

  /** Take elements over from the CSS hidden state. False means: leave them visible, don't animate. */
  const claim = (els: Element[], trigger: Element) => {
    els.forEach((el) => el.setAttribute('data-motion', 'on'));
    return !(late && trigger.getBoundingClientRect().top < window.innerHeight);
  };
  const once = (trigger: Element, start = START): ScrollTrigger.Vars => ({ trigger, start, once: true });

  // --- Building blocks -------------------------------------------------------------------------

  /** Print-head wipe: per line, a thin bar sweeps from inline-start to inline-end and reveals the text. */
  const wipe = (h: HTMLElement | null) => {
    if (!h || !claim([h], h)) return;
    SplitText.create(h, {
      type: 'lines', // lines only: Arabic letters must stay joined
      linesClass: 'wipe-line',
      autoSplit: true,
      onSplit(self) {
        const lines = self.lines as HTMLElement[];
        const layer = document.createElement('span');
        layer.className = 'wipe-layer';
        layer.setAttribute('aria-hidden', 'true');
        const bars = lines.map((line) => {
          const bar = document.createElement('span');
          bar.className = 'wipe-bar';
          bar.style.top = `${line.offsetTop + line.offsetHeight * 0.1}px`;
          bar.style.height = `${line.offsetHeight * 0.8}px`;
          layer.append(bar);
          return bar;
        });
        h.append(layer);

        // The head travels across the text itself, not the whole (often much wider) heading box.
        const textWidth = (line: HTMLElement) => {
          const range = document.createRange();
          range.selectNodeContents(line);
          return Math.min(line.offsetWidth, Math.ceil(range.getBoundingClientRect().width) + 4);
        };
        const inset = (gap: number) => (rtl ? `inset(-30% 0px -30% ${gap}px)` : `inset(-30% ${gap}px -30% 0px)`);
        const tl = gsap.timeline({ scrollTrigger: once(h), defaults: { duration: 0.7, ease: EASE } });
        lines.forEach((line, i) => {
          const at = i * 0.12;
          const box = line.offsetWidth;
          const text = textWidth(line);
          tl.fromTo(line, { clipPath: inset(box) }, { clipPath: inset(box - text) }, at)
            .set(bars[i], { opacity: 1 }, at)
            .fromTo(bars[i], { x: 0 }, { x: text * dir, immediateRender: false }, at)
            .to(bars[i], { opacity: 0, duration: 0.15, ease: 'none' }, at + 0.6);
        });
        tl.set(lines, { clipPath: 'none' });
        return tl;
      },
    });
  };

  /** Line-by-line headline reveal: masked lines rise from yPercent 100. */
  const rise = (h: HTMLElement | null) => {
    if (!h || !claim([h], h)) return;
    SplitText.create(h, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, { yPercent: 100, duration: 0.8, ease: 'expo.out', stagger: 0.08, scrollTrigger: once(h) }),
    });
  };

  /** A group that slides in from the inline-start side together, staggered. */
  const slideIn = (els: HTMLElement[], trigger: Element | null = els[0], stagger = 0.08) => {
    if (!els.length || !trigger || !claim(els, trigger)) return;
    gsap.from(els, { x: -SLIDE * dir, opacity: 0, duration: 0.7, ease: EASE, stagger, scrollTrigger: once(trigger) });
  };

  const fadeUp = (el: HTMLElement | null, delay = 0) => {
    if (!el || !claim([el], el)) return;
    gsap.from(el, { y: 24, opacity: 0, duration: 0.7, ease: EASE, delay, scrollTrigger: once(el) });
  };

  /**
   * Items that may be spread over a long column (mobile): each batch animates as it enters.
   * `onLand(el, tl, at)` adds follow-up animation for an item once it has landed.
   */
  const batchIn = (
    els: HTMLElement[],
    from: gsap.TweenVars,
    stagger = 0.08,
    onLand?: (el: HTMLElement, tl: gsap.core.Timeline, at: number) => void,
  ) => {
    const pending = els.filter((el) => claim([el], el));
    if (!pending.length) return;
    gsap.set(pending, { ...from, opacity: 0 });
    ScrollTrigger.batch(pending, {
      start: START,
      once: true,
      onEnter: (batch) => {
        const tl = gsap.timeline();
        (batch as HTMLElement[]).forEach((el, i) => {
          tl.to(el, { x: 0, y: 0, opacity: 1, duration: 0.7, ease: EASE }, i * stagger);
          onLand?.(el, tl, i * stagger + 0.45);
        });
      },
    });
  };

  const countUp = (el: HTMLElement, to: number, duration = 1.2) => {
    const o = { v: 0 };
    return gsap.fromTo(
      o,
      { v: 0 },
      { v: to, duration, ease: EASE, immediateRender: false, onUpdate: () => void (el.textContent = String(Math.round(o.v))) },
    );
  };

  // Calculator numbers tween to new values instead of jumping (0.4s, power2.out).
  const proxies = new WeakMap<HTMLElement, { v: number }>();
  const tweenNumber = (el: HTMLElement, from: number, to: number, format: NumberFormat, duration = 0.4, ease = 'power2.out') => {
    let p = proxies.get(el);
    if (!p) proxies.set(el, (p = { v: from }));
    const proxy = p;
    gsap.to(proxy, { v: to, duration, ease, overwrite: true, onUpdate: () => void (el.textContent = format(proxy.v)) });
  };

  /** The monthly card's vapor outline traces around once, then stays. */
  const traceOutline = (card: HTMLElement) => {
    const { width: w, height: h } = card.getBoundingClientRect();
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'plan-trace');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', String(w));
    svg.setAttribute('height', String(h));
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const rect = document.createElementNS(ns, 'rect');
    const attrs = { x: 1, y: 1, width: w - 2, height: h - 2, rx: 15, fill: 'none', stroke: 'currentColor', 'stroke-width': 2, pathLength: 1 };
    Object.entries(attrs).forEach(([k, v]) => rect.setAttribute(k, String(v)));
    svg.append(rect);
    card.append(svg);
    gsap.fromTo(
      rect,
      { strokeDasharray: 1, strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: EASE,
        onComplete: () => {
          card.classList.remove('trace-pending');
          svg.remove();
        },
      },
    );
  };

  // --- Sections --------------------------------------------------------------------------------

  const proof = () => {
    const list = $('.proof-list');
    const items = $$('.proof-list > li');
    if (!list || !claim(items, list)) return;
    const tl = gsap.timeline({ scrollTrigger: once(list, 'top 90%') });
    tl.from(items, { x: -SLIDE * dir, opacity: 0, duration: 0.7, ease: EASE, stagger: 0.1 });
    $$('[data-count]', list).forEach((el, i) => tl.add(countUp(el, Number(el.dataset.count)), 0.15 + i * 0.1));
  };

  const gallery = () => {
    wipe($('#gallery-title'));
    const grid = $('.gallery-grid');
    const tiles = $$('.gallery-grid > li');
    if (grid && claim(tiles, grid)) {
      // A wave from the inline-start top corner (the first tile is top-left, or top-right in Arabic).
      gsap.from(tiles, {
        scale: 0.96,
        opacity: 0,
        duration: 0.7,
        ease: EASE,
        stagger: { each: 0.08, grid: 'auto', from: 'start' },
        scrollTrigger: once(grid),
      });
    }
    fadeUp($('.gallery-note'));
  };

  const howHeading = () => {
    wipe($('#how-title'));
    fadeUp($('.set-time'));
  };

  /** How it works: the line draws, each circle fills as the line reaches it, then its card slides in. */
  const steps = (mode: 'scrub' | 'once') => {
    const list = $('[data-steps]');
    if (!list) return;
    const items = $$('[data-step]', list);
    const fills = items.map((s) => $('.step-num-fill', s)!);
    const links = items.map((s) => $('.step-link', s));
    const cards = items.map((s) => $('.step-card', s)!);
    if (!claim(cards, list)) return;
    const axis = mode === 'scrub' ? 'scaleX' : 'scaleY';
    const filled = 'circle(75% at 50% 50%)';
    gsap.set(fills, { clipPath: 'circle(0% at 50% 50%)' });
    gsap.set(links.filter(Boolean), { [axis]: 0 });
    gsap.set(cards, { x: -SLIDE * dir, opacity: 0 });

    if (mode === 'once') {
      // Mobile: plays once (vertical timeline).
      const tl = gsap.timeline({ scrollTrigger: once(list) });
      let t = 0;
      items.forEach((_, i) => {
        tl.to(fills[i], { clipPath: filled, duration: 0.2, ease: EASE }, t)
          .to(cards[i], { x: 0, opacity: 1, duration: 0.6, ease: EASE }, t + 0.08);
        if (links[i]) tl.to(links[i], { scaleY: 1, duration: 0.25, ease: EASE }, t + 0.2);
        t += 0.45;
      });
      return;
    }

    // Desktop: the line and the fills are tied to scroll (no pinning); each card slides in once.
    const tl = gsap.timeline({ defaults: { ease: 'none' } });
    const marks: number[] = [];
    let t = 0;
    items.forEach((_, i) => {
      tl.to(fills[i], { clipPath: filled, duration: 0.3 }, t);
      t += 0.3;
      marks.push(t);
      if (links[i]) {
        tl.to(links[i], { scaleX: 1, duration: 1 }, t);
        t += 1;
      }
    });
    const shown = new Set<number>();
    const reveal = (self: ScrollTrigger) =>
      marks.forEach((m, i) => {
        if (shown.has(i) || self.progress * t < m - 0.001) return;
        shown.add(i);
        gsap.to(cards[i], { x: 0, opacity: 1, duration: 0.7, ease: EASE });
      });
    ScrollTrigger.create({
      animation: tl,
      trigger: list,
      start: 'top 75%',
      end: 'bottom 55%',
      scrub: true,
      onUpdate: reveal,
      onRefresh: reveal,
    });
  };

  const calculator = () => {
    wipe($('#earnings-title'));
    fadeUp($('.calc-intro'));
    const inputs = $('.calc-inputs');
    slideIn(inputs ? $$(':scope > *', inputs) : [], inputs);

    const results = $('[data-calc-results]');
    const items = $$('[data-calc-results] [data-motion]');
    if (!results || !claim(items, results)) return;
    const tl = gsap.timeline({ scrollTrigger: once(results) });
    tl.from(items, { x: -SLIDE * dir, opacity: 0, duration: 0.7, ease: EASE, stagger: 0.08 }, 0.15);
    // On first view the results count up from 0.
    tl.add(() => {
      $$('[data-out]', results).forEach((el) => {
        const s = numberState(el);
        if (!s) return;
        proxies.set(el, { v: 0 });
        tweenNumber(el, 0, s.value, s.format, 1, EASE);
      });
    }, 0.15);
  };

  const included = () => {
    rise($('#included-title'));
    const shapes = (card: HTMLElement) => $$<SVGElement>('[data-draw] path, [data-draw] rect, [data-draw] circle', card);
    const cards = $$('.included-card');
    cards.forEach((card) => {
      if (!late || card.getBoundingClientRect().top >= window.innerHeight)
        gsap.set(shapes(card), { strokeDasharray: 1, strokeDashoffset: 1 });
    });
    // Each card's outline icon draws itself as the card lands.
    batchIn(cards, { x: -SLIDE * dir }, 0.08, (card, tl, at) =>
      tl.to(shapes(card), { strokeDashoffset: 0, duration: 0.6, ease: EASE }, at),
    );
  };

  const hygiene = () => {
    rise($('#hygiene-title'));
    batchIn($$('.hygiene-list > li'), { x: -SLIDE * dir }, 0.1);
  };

  const ways = () => {
    rise($('#ways-title'));
    const cards = $$('.plan');
    cards.forEach((c) => {
      if (c.hasAttribute('data-trace') && (!late || c.getBoundingClientRect().top >= window.innerHeight))
        c.classList.add('trace-pending');
    });
    batchIn(cards, { y: 32 }, 0.12, (card, tl, at) => {
      if (card.classList.contains('trace-pending')) tl.add(() => traceOutline(card), at + 0.25);
    });
    fadeUp($('.ways-cta'));
  };

  /** FAQ: native <details>, with the opening and closing height animated. */
  const faq = () => {
    rise($('#faq-title'));
    batchIn($$('.faq-list > details'), { x: -SLIDE * dir }, 0.06);

    const list = $('.faq-list');
    if (!list) return;
    const items = $$<HTMLDetailsElement>('details', list);
    // Without JS the shared name keeps one open at a time; here JS does it, so closing can animate.
    const names = items.map((d) => d.getAttribute('name'));
    items.forEach((d) => d.removeAttribute('name'));
    const answer = (d: HTMLDetailsElement) => $('.faq-answer', d)!;

    const close = (d: HTMLDetailsElement) => {
      d.classList.add('is-closing');
      gsap.to(answer(d), {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: EASE,
        overwrite: true,
        onComplete: () => {
          d.open = false;
          d.classList.remove('is-closing');
          gsap.set(answer(d), { clearProps: 'height,opacity' });
        },
      });
    };
    const open = (d: HTMLDetailsElement) => {
      items.forEach((o) => o !== d && o.open && !o.classList.contains('is-closing') && close(o));
      const wasClosed = !d.open;
      d.classList.remove('is-closing');
      d.open = true;
      const done = { height: 'auto', opacity: 1, duration: 0.35, ease: EASE, overwrite: true, clearProps: 'height,opacity' };
      if (wasClosed) gsap.fromTo(answer(d), { height: 0, opacity: 0 }, done);
      else gsap.to(answer(d), done);
    };
    const onClick = (e: Event) => {
      const summary = (e.target as Element).closest('summary');
      if (!summary || !list.contains(summary)) return;
      const d = summary.parentElement as HTMLDetailsElement;
      e.preventDefault();
      if (d.open && !d.classList.contains('is-closing')) close(d);
      else open(d);
    };
    list.addEventListener('click', onClick);
    return () => {
      list.removeEventListener('click', onClick);
      items.forEach((d, i) => names[i] && d.setAttribute('name', names[i]!));
    };
  };

  const demo = () => {
    wipe($('#demo-title'));
    fadeUp($('.demo-intro p'));
    const form = $('.demo-form');
    slideIn(form ? $$(':scope > [data-motion]', form) : [], form, 0.06);
  };

  const stories = () => {
    rise($('#stories-title'));
    batchIn($$('.story'), { x: -SLIDE * dir }, 0.1);
  };

  /**
   * Keyboard safety: elements waiting to be revealed use opacity only (never visibility), so they stay
   * focusable. If focus lands on one before its scroll trigger fires, finish its reveal at once.
   */
  const revealOnFocus = (e: FocusEvent) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-motion="on"]');
    if (!el || getComputedStyle(el).opacity === '1') return;
    gsap.getTweensOf(el).forEach((tween) => {
      let anim: gsap.core.Animation = tween;
      while (anim.parent && anim.parent !== gsap.globalTimeline) anim = anim.parent;
      anim.scrollTrigger?.kill();
      anim.progress(1);
    });
    if (getComputedStyle(el).opacity !== '1') gsap.to(el, { x: 0, y: 0, opacity: 1, duration: 0.2, overwrite: true });
  };

  // --- Run ---------------------------------------------------------------------------------------
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.addEventListener('focusin', revealOnFocus);
    setNumberAnimator((el, from, to, format) => tweenNumber(el, from, to, format));
    proof();
    gallery();
    howHeading();
    calculator();
    included();
    hygiene();
    ways();
    const undoFaq = faq();
    demo();
    stories();
    return () => {
      document.removeEventListener('focusin', revealOnFocus);
      setNumberAnimator(null);
      undoFaq?.();
    };
  });
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => steps('scrub'));
  mm.add('(prefers-reduced-motion: no-preference) and (max-width: 1023px)', () => steps('once'));
  // Reduced motion: nothing is registered, so every element simply appears.
}
