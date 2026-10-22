// Scroll choreography for the homepage (CLAUDE.md › Motion), with GSAP, ScrollTrigger and SplitText.
//
// Loaded lazily by Base.astro after the load event. Everything here is an enhancement:
// - CSS only hides [data-motion] elements while JS runs and motion is allowed, and shows them
//   after 2s if this file never arrives. Each element is "claimed" (data-motion="on") as it's set up.
// - Under prefers-reduced-motion nothing here runs, so elements simply appear.
// - The hero is animated in CSS (global.css + an inline line splitter) so the LCP text never waits for this file.
// Horizontal movement is multiplied by `dir`, so "from the inline-start side" flips in Arabic.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { numberState, setNumberAnimator, type NumberFormat } from './number-display';
import { chooseTimeline, coatTimeline, printTimeline, sealTimeline, setStage, type NailStage } from './nail';

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
  /**
   * Should this still animate? Not if the failsafe has already shown it on screen, or if it was
   * focused before its section was set up (data-motion="seen").
   */
  // Whether the section being set up is already on screen; read once per setup step, before any
  // writes, so checks below never force a layout.
  let sectionOnScreen = false;
  const fresh = (el: Element) =>
    el.getAttribute('data-motion') !== 'seen' && !(performance.now() > FAILSAFE_MS && sectionOnScreen);

  /** Take elements over from the CSS hidden state. False means: leave them visible, don't animate. */
  const claim = (els: Element[], trigger: Element) => {
    const ok = fresh(trigger) && els.every((el) => el.getAttribute('data-motion') !== 'seen');
    els.forEach((el) => el.setAttribute('data-motion', 'on'));
    return ok;
  };
  const once = (trigger: Element, start = START): ScrollTrigger.Vars => ({ trigger, start, once: true });

  // --- Building blocks -------------------------------------------------------------------------

  /** Line-by-line headline reveal: masked lines rise from yPercent 100. */
  const rise = (h: HTMLElement | null) => {
    if (!h || !claim([h], h)) return;
    SplitText.create(h, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, { yPercent: 100, duration: 0.7, ease: 'expo.out', stagger: 0.08, scrollTrigger: once(h) }),
    });
  };

  /** A group that slides in from the inline-start side together, staggered. */
  const slideIn = (els: HTMLElement[], trigger: Element | null = els[0], stagger = 0.08) => {
    if (!els.length || !trigger || !claim(els, trigger)) return;
    gsap.from(els, { x: -SLIDE * dir, opacity: 0, duration: 0.7, ease: EASE, stagger, scrollTrigger: once(trigger) });
  };

  const fadeUp = (el: HTMLElement | null, delay = 0) => {
    if (!el || !claim([el], el)) return;
    gsap.from(el, { y: 24, opacity: 0, duration: 0.7, ease: EASE, delay, clearProps: 'transform', scrollTrigger: once(el) });
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

  // expo.out reaches the final figure early and settles there, so in-between values (a "7-month"
  // warranty) only flash past.
  const countUp = (el: HTMLElement, to: number, duration = 1) => {
    const o = { v: 0 };
    return gsap.fromTo(
      o,
      { v: 0 },
      { v: to, duration, ease: 'expo.out', immediateRender: false, onUpdate: () => void (el.textContent = String(Math.round(o.v))) },
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
    if (!list) return;
    // Read every final number's width before anything is written, so there's one layout pass.
    const counts = $$('[data-count]', list);
    const widths = counts.map((el) => el.getBoundingClientRect().width);
    if (!claim(items, list)) return;
    const tl = gsap.timeline({ scrollTrigger: once(list, 'top 90%') });
    tl.from(items, { x: -SLIDE * dir, opacity: 0, duration: 0.7, ease: EASE, stagger: 0.08 });
    counts.forEach((el, i) => {
      // Hold the box at the final number's width while it counts, so the words around it never move.
      el.style.minWidth = `${widths[i]}px`;
      tl.add(countUp(el, Number(el.dataset.count)), 0.15 + i * 0.08);
    });
  };

  // The gallery rows are a CSS marquee (GalleryPreview.astro); only the note fades up here.
  const gallery = () => fadeUp($('.gallery-note'));

  const howNote = () => fadeUp($('.set-time'));

  /**
   * How it works. The connecting line is always drawn. The cards slide in once, the first time the steps
   * scroll into view. Then each card plays its step once on the illustrated nail, one nail going through
   * the steps: Prep fills the base coat in; Choose brings three swatches in beside the nail, rings the
   * picked one and fades the dashed preview in; Print runs the print head; Seal sweeps the gloss. Each
   * card takes 1–1.3s, with its number highlighted (carbon fill, bone number, scale 1.1) while it plays.
   * - 1024px and up: chained in step order (right to left in Arabic), started when the cards have
   *   landed; number 4 rests 0.5s after its step, about 5s in all.
   * - Below 1024px the cards stack, so each card plays as it scrolls into view, not chained.
   * Once per page load: no loop, no replay when scrolling back, so no pause control. Afterwards, hovering
   * a card with a mouse (desktop) or focusing it from the keyboard replays just that card's nail. The
   * number fill grows from the centre of the circle (clip-path) and switches off at once, so the digit
   * never passes through a half-faded grey state.
   */
  const steps = () => {
    const list = $('[data-steps]');
    if (!list) return;
    const items = $$('[data-step]', list);
    const nums = items.map((s) => $('.step-num', s)!);
    const fills = items.map((s) => $('.step-num-fill', s)!);
    const cards = items.map((s) => $('.step-card', s)!);
    const nails = cards.map((c) => $<SVGSVGElement>('.step-nail [data-nail]', c)!);
    const swatchList = $('[data-swatches]', list);
    const swatches = swatchList ? $$('.step-swatch', swatchList) : [];
    const last = items.length - 1;

    // Numbers rest as outlined circles; the carbon fill shows only while highlighted.
    const EMPTY = 'circle(0% at 50% 50%)';
    const FULL = 'circle(50% at 50% 50%)';
    const FILL = 0.18;
    gsap.set(fills, { opacity: 1, clipPath: EMPTY });
    const highlight = (tl: gsap.core.Timeline, i: number, from: number, to: number) =>
      tl
        .to(fills[i], { clipPath: FULL, duration: FILL, ease: 'power2.out' }, from)
        .to(nums[i], { scale: 1.1, duration: FILL, ease: 'power2.out' }, from)
        // The outgoing highlight switches off at once (a shrinking circle would slice through the digit).
        .set(fills[i], { clipPath: EMPTY }, to)
        .to(nums[i], { scale: 1, duration: FILL, ease: 'power2.out' }, to);

    // Each card waits at the stage before its step: bare, base coat, design chosen, printed.
    const BEFORE: NailStage[] = ['bare', 'base', 'choose', 'printed'];
    const LENGTH = [1.1, 1.2, 1.3, 1.0]; // seconds per card, each with a short hold at the end
    const reset = (i: number) => {
      setStage(nails[i], BEFORE[i]);
      if (i !== 1 || !swatchList) return;
      gsap.killTweensOf(swatches);
      gsap.set(swatches, { opacity: 0, x: 8 * dir });
      swatchList.setAttribute('data-picking', '');
    };
    const stepTimeline = (i: number) => {
      const nail = nails[i];
      if (i === 0) return coatTimeline(gsap, nail, 0.9);
      if (i === 2) return printTimeline(gsap, nail, 1.1);
      if (i === 3) return sealTimeline(gsap, nail);
      const tl = gsap.timeline();
      if (swatchList)
        tl.to(swatches, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', stagger: 0.06 }, 0).call(
          () => swatchList.removeAttribute('data-picking'),
          [],
          0.55,
        );
      return tl.add(chooseTimeline(gsap, nail, 0.3), 0.75);
    };
    items.forEach((_, i) => reset(i));

    // After a card has played, a mouse hover (desktop) or keyboard focus replays just its step.
    const played = items.map(() => false);
    const running: (gsap.core.Timeline | null)[] = items.map(() => null);
    const replay = (i: number) => {
      if (!played[i] || running[i]?.isActive() || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      reset(i);
      running[i] = stepTimeline(i);
    };
    const chained = matchMedia('(min-width: 1024px)').matches;
    const mouse = matchMedia('(hover: hover) and (pointer: fine)');
    cards.forEach((card, i) => {
      card.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && mouse.matches && chained && replay(i));
      card.addEventListener('focus', () => card.matches(':focus-visible') && replay(i));
    });

    const slide = (onComplete?: () => void) =>
      gsap.from(cards, { x: -SLIDE * dir, opacity: 0, duration: 0.7, ease: EASE, stagger: 0.08, scrollTrigger: once(list), onComplete });

    if (!chained) {
      // Stacked: each card plays as it scrolls into view.
      cards.forEach((card, i) =>
        ScrollTrigger.create({
          trigger: card,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline({ onComplete: () => void (played[i] = true) });
            highlight(tl.add(stepTimeline(i), 0), i, 0, LENGTH[i] + 0.3);
          },
        }),
      );
      if (claim(cards, list)) slide();
      return;
    }

    // Side by side: one sequence, started once.
    let started = false;
    const play = () => {
      if (started) return;
      started = true;
      const seq = gsap.timeline();
      let at = 0;
      items.forEach((_, i) => {
        const end = at + LENGTH[i];
        seq.add(stepTimeline(i), at).call(() => void (played[i] = true), [], end);
        highlight(seq, i, at, i < last ? end : end + 0.5);
        at = end;
      });
    };
    // Cards already shown (failsafe or keyboard focus): the sequence still waits for the first time the
    // steps scroll into view.
    if (!claim(cards, list)) {
      ScrollTrigger.create({ ...once(list), onEnter: play });
      return;
    }
    slide(play);
  };

  /** The footer's background wordmark rises 24px and fades in once, as the footer comes into view. */
  const footerMark = () => {
    const footer = $('.site-footer');
    const mark = footer && $('.footer-mark', footer);
    if (!footer || !mark || !claim([mark], footer)) return;
    gsap.from(mark, { y: 24, opacity: 0, duration: 0.9, ease: EASE, clearProps: 'transform', scrollTrigger: once(footer) });
  };

  const calculator = () => {
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

  /** What's included: the intro fades up, the bento cards stagger in, and their figures count up once. */
  const included = () => {
    $$('.included-head > [data-motion]:not(h2)').forEach((el, i) => fadeUp(el, i * 0.08));
    const cards = $$('.included .bento-card');
    // Read every figure's final width before anything is written (one layout pass); while counting, each
    // box holds that width so the words beside it never move.
    const nums = cards.map((card) => $$('[data-count]', card));
    const widths = nums.map((list) => list.map((el) => el.getBoundingClientRect().width));
    batchIn(cards, { x: -SLIDE * dir }, 0.08, (card, tl, at) => {
      const i = cards.indexOf(card);
      nums[i].forEach((el, j) => {
        el.style.minWidth = `${widths[i][j]}px`;
        // `at` is when the card has landed; the count starts with the card's own entrance.
        tl.add(countUp(el, Number(el.dataset.count)), at - 0.45);
      });
    });
  };

  /** The plan cards (homepage and /ways-to-own/): they rise in, and the monthly card's outline traces in. */
  const ways = (grid: Element) => {
    const cards = $$('.plan', grid);
    cards.forEach((c) => {
      if (c.hasAttribute('data-trace') && fresh(c)) c.classList.add('trace-pending');
    });
    batchIn(cards, { y: 32 }, 0.08, (card, tl, at) => {
      if (card.classList.contains('trace-pending')) tl.add(() => traceOutline(card), at + 0.25);
    });
    fadeUp($('.ways-cta'));
  };

  /** FAQ: native <details>, with the opening and closing height animated. */
  const faq = () => {
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
      // Closing is the system responding: quicker than opening.
      gsap.to(answer(d), {
        height: 0,
        opacity: 0,
        duration: 0.24,
        ease: 'power2.out',
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
      const done = { height: 'auto', opacity: 1, duration: 0.32, ease: EASE, overwrite: true, clearProps: 'height,opacity' };
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
    fadeUp($('.demo-intro p'));
    const form = $('.demo-form');
    slideIn(form ? $$(':scope > [data-motion]', form) : [], form, 0.06);
  };

  const stories = () => {
    batchIn($$('.story'), { x: -SLIDE * dir }, 0.08);
  };

  /**
   * Keyboard safety: elements waiting to be revealed use opacity only (never visibility), so they stay
   * focusable. If focus lands on one before its scroll trigger fires, finish its reveal at once.
   */
  const revealOnFocus = (e: FocusEvent) => {
    // Not set up yet: just show it, and remember not to animate it later.
    const pending = (e.target as Element | null)?.closest<HTMLElement>('[data-motion=""]');
    if (pending) pending.setAttribute('data-motion', 'seen');
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

  /** Photo placeholders (and later photos) rise in with the same clip-path reveal as the homepage media. */
  const photoRise = (el: HTMLElement) => {
    if (!claim([el], el)) return;
    const inner = el.firstElementChild as HTMLElement | null;
    const tl = gsap.timeline({ scrollTrigger: once(el), defaults: { duration: 0.9, ease: 'expo.out' } });
    // The clip opens past the frame's edges so its shadow isn't cut off while it rises.
    tl.fromTo(el, { clipPath: 'inset(100% -30% 0% -30%)' }, { clipPath: 'inset(-30% -30% -30% -30%)', clearProps: 'clipPath' }, 0);
    if (inner) tl.fromTo(inner, { scale: 1.06 }, { scale: 1, clearProps: 'transform' }, 0);
  };

  /**
   * Generic hooks for pages built from shared parts (the printer page and later ones): inside a
   * [data-reveal-section], headings reveal line by line, items slide in from the inline-start side,
   * photos rise in, and [data-reveal="fade"] text fades up.
   */
  const genericHeadings = (section: Element) => $$('[data-reveal="heading"]', section).forEach(rise);
  const genericBody = (section: Element) => {
    $$('[data-reveal="fade"]', section).forEach((el) => fadeUp(el));
    batchIn($$('[data-reveal="item"]', section), { x: -SLIDE * dir }, 0.08);
    $$('[data-reveal="photo"]', section).forEach(photoRise);
  };

  // --- Run ---------------------------------------------------------------------------------------

  type Setup = () => void | (() => void);
  // Yield to the main thread between setup steps (scheduler.yield where supported).
  const nextTask = (fn: () => void) => {
    const s = (window as { scheduler?: { yield?: () => Promise<void> } }).scheduler;
    if (s?.yield) s.yield().then(fn);
    else window.setTimeout(fn, 0);
  };
  /**
   * Sections are set up lazily, about one viewport before they scroll into view, one per task, so the
   * splitting and measuring never piles up into one long task. Work is recorded in the matchMedia
   * context so it's reverted if the media query stops matching.
   */
  const lazily = (ctx: gsap.Context, jobs: Array<[Element | null, ...Setup[]]>) => {
    const byEl = new Map<Element, Setup[]>();
    const queue: Array<[Element, Setup]> = [];
    const undo: Array<() => void> = [];
    let scheduled = false;
    const run = () => {
      scheduled = false;
      const next = queue.shift();
      if (next) {
        const [section, job] = next;
        sectionOnScreen = section.getBoundingClientRect().top < window.innerHeight;
        ctx.add(() => {
          const u = job();
          if (u) undo.push(u);
        });
      }
      if (queue.length) schedule();
    };
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      nextTask(run);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          byEl.get(e.target)!.forEach((step) => queue.push([e.target, step]));
        });
        schedule();
      },
      { rootMargin: '100% 0px' },
    );
    jobs.forEach(([el, ...steps]) => {
      if (!el) return;
      byEl.set(el, steps);
      io.observe(el);
    });
    return () => {
      io.disconnect();
      undo.forEach((u) => u());
    };
  };

  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', (ctx) => {
    document.addEventListener('focusin', revealOnFocus);
    setNumberAnimator((el, from, to, format) => tweenNumber(el, from, to, format));
    // Each section: its heading in one task, the rest in the next.
    const undo = lazily(ctx, [
      [$('.proof'), proof],
      [$('#gallery'), () => rise($('#gallery-title')), gallery],
      [$('#how-it-works'), () => rise($('#how-title')), howNote],
      [$('[data-steps]'), steps],
      [$('#earnings'), () => rise($('#earnings-title')), calculator],
      [$('.included'), () => rise($('#included-title')), included],
      [$('#ways-to-own'), () => rise($('#ways-title'))],
      [$('[data-plans]'), () => ways($('[data-plans]')!)],
      [$('.faq'), () => rise($('#faq-title')), faq],
      [$('#demo'), () => rise($('#demo-title')), demo],
      [$('.stories'), () => rise($('#stories-title')), stories],
      ...$$('[data-reveal-section]').map((section): [Element, Setup, Setup] => [section, () => genericHeadings(section), () => genericBody(section)]),
      [$('.site-footer'), footerMark],
    ]);
    return () => {
      document.removeEventListener('focusin', revealOnFocus);
      setNumberAnimator(null);
      undo();
    };
  });
  // Reduced motion: nothing is registered, so every element simply appears.
}
