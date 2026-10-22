// Client side of NailIllustration.astro: switch a nail's design and stage, and animate the steps of a
// print. GSAP is loaded on demand (the same package motion.ts uses); under reduced motion, or if GSAP
// can't load, every change simply jumps to its final state.
//
// - print: a vapor print-head line travels tip to cuticle while a clip reveals the design behind it
//   (about 1.4s), then stops.
// - seal: a soft gloss highlight sweeps once across the printed design.
// - coat: the nude base coat fills in from the cuticle up.
// - choose: the design's dashed outline preview fades in on the base coat.
//
// The *Timeline builders return GSAP timelines that switch the stage as they start, so a caller can place
// them in a longer sequence (the homepage "How it works" cards). The animate* calls (the printer page)
// run the same timelines on their own.

export type NailStage = 'bare' | 'base' | 'choose' | 'printed' | 'sealed';
export type NailDesign = 'french' | 'cherries' | 'dots' | 'flowers' | 'star' | 'heart';

const H = 172; // viewBox height
const PRINT_SECONDS = 1.4;

type Gsap = typeof import('gsap').gsap;
let gsapPromise: Promise<Gsap | null> | null = null;
let loaded: Gsap | null = null; // once loaded, so setStage can stop a run that's still playing
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const loadGsap = () =>
  (gsapPromise ??= import('gsap')
    .then((m) => (loaded = m.gsap))
    .catch(() => null));

const parts = (svg: SVGSVGElement) => ({
  coat: svg.querySelector<SVGRectElement>('.nail-coat-reveal')!,
  print: svg.querySelector<SVGRectElement>('.nail-print-reveal')!,
  head: svg.querySelector<SVGGElement>('.nail-head')!,
  sweep: svg.querySelector<SVGEllipseElement>('.nail-gloss-sweep')!,
  streak: svg.querySelector<SVGPathElement>('.nail-gloss-streak')!,
  designs: svg.querySelector<SVGGElement>('.nail-designs')!,
});
const stageCall = (svg: SVGSVGElement, stage: NailStage) => () => void (svg.dataset.stage = stage);

/** Show a design (it must have been rendered into this nail), and keep the accessible name in step. */
export function setDesign(svg: SVGSVGElement, design: NailDesign) {
  svg.dataset.design = design;
  const names = JSON.parse(svg.dataset.designNames ?? '{}') as Record<string, string>;
  const template = svg.dataset.altTemplate;
  if (template && names[design]) svg.setAttribute('aria-label', template.replace('{design}', names[design]));
}

/** Jump straight to a stage, with every reveal complete and nothing moving. */
export function setStage(svg: SVGSVGElement, stage: NailStage) {
  const p = parts(svg);
  loaded?.killTweensOf([p.coat, p.print, p.head, p.sweep, p.designs]);
  p.coat.setAttribute('y', '0');
  p.coat.setAttribute('height', String(H));
  p.print.setAttribute('height', String(H));
  p.head.style.opacity = '0';
  p.sweep.style.opacity = '0';
  p.designs.style.removeProperty('opacity');
  svg.dataset.stage = stage;
}

/** Base coat: fills in from the cuticle up. */
export function coatTimeline(gsap: Gsap, svg: SVGSVGElement, duration = 0.7) {
  loaded ??= gsap;
  const { coat } = parts(svg);
  return gsap
    .timeline()
    .call(stageCall(svg, 'base'), [], 0)
    .fromTo(coat, { attr: { y: H, height: 0 } }, { attr: { y: 0, height: H }, duration, ease: 'power2.out', immediateRender: false }, 0);
}

/** Choose: the dashed outline preview of the current design fades in on the base coat. */
export function chooseTimeline(gsap: Gsap, svg: SVGSVGElement, duration = 0.3) {
  loaded ??= gsap;
  const { designs } = parts(svg);
  return gsap
    .timeline()
    .call(stageCall(svg, 'choose'), [], 0)
    .fromTo(designs, { opacity: 0 }, { opacity: 1, duration, ease: 'power2.out', immediateRender: false, clearProps: 'opacity' }, 0);
}

/** Print: the head sweeps tip to cuticle while the design is revealed behind it, then fades. */
export function printTimeline(gsap: Gsap, svg: SVGSVGElement, seconds = PRINT_SECONDS) {
  loaded ??= gsap;
  const { print, head } = parts(svg);
  return gsap
    .timeline()
    .call(stageCall(svg, 'printed'), [], 0)
    .set(head, { opacity: 1, y: 0 }, 0)
    .fromTo(print, { attr: { height: 0 } }, { attr: { height: H }, duration: seconds, ease: 'none', immediateRender: false }, 0)
    .fromTo(head, { y: 4 }, { y: H - 6, duration: seconds, ease: 'none', immediateRender: false }, 0)
    .to(head, { opacity: 0, duration: 0.2, ease: 'power2.out' }, seconds);
}

/** Seal: the gloss highlight sweeps once across the nail and the resting streak fades in. */
export function sealTimeline(gsap: Gsap, svg: SVGSVGElement) {
  loaded ??= gsap;
  const { sweep, streak } = parts(svg);
  gsap.killTweensOf(streak);
  return gsap
    .timeline()
    .call(stageCall(svg, 'sealed'), [], 0)
    .set(streak, { opacity: 0 }, 0)
    .fromTo(sweep, { x: -20, opacity: 0 }, { x: 120, duration: 0.9, ease: 'power2.inOut', immediateRender: false }, 0)
    .to(sweep, { opacity: 0.55, duration: 0.25, ease: 'power2.out' }, 0)
    .to(sweep, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 0.6)
    .to(streak, { opacity: 0.45, duration: 0.5, ease: 'power2.out' }, 0.35);
}

/** The base coat fills in from the cuticle up. */
export async function animateCoat(svg: SVGSVGElement) {
  const gsap = reducedMotion() ? null : await loadGsap();
  setStage(svg, 'base');
  if (!gsap) return;
  await coatTimeline(gsap, svg);
}

/** Print the current design: the head sweeps tip to cuticle while the design is revealed behind it. */
export async function animatePrint(svg: SVGSVGElement) {
  const gsap = reducedMotion() ? null : await loadGsap();
  setStage(svg, 'printed');
  if (!gsap) return;
  await printTimeline(gsap, svg);
}

/** Seal: the gloss highlight sweeps once across the nail and the resting streak fades in. */
export async function animateSeal(svg: SVGSVGElement) {
  const gsap = reducedMotion() ? null : await loadGsap();
  setStage(svg, 'sealed');
  if (!gsap) return;
  await sealTimeline(gsap, svg);
}

/** Print, then seal: one full run on the illustration. */
export async function printAndSeal(svg: SVGSVGElement) {
  await animatePrint(svg);
  await animateSeal(svg);
}
