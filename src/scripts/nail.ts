// Client side of NailIllustration.astro: switch a nail's design and stage, and animate the steps of a
// print. GSAP is loaded on demand (the same package motion.ts uses); under reduced motion, or if GSAP
// can't load, every change simply jumps to its final state.
//
// - print: a vapor print-head line travels tip to cuticle while a clip reveals the design behind it
//   (about 1.4s), then stops.
// - seal: a soft gloss highlight sweeps once across the printed design.
// - coat: the nude base coat fills in from the cuticle up.

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
});

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
  loaded?.killTweensOf([p.coat, p.print, p.head, p.sweep]);
  p.coat.setAttribute('y', '0');
  p.coat.setAttribute('height', String(H));
  p.print.setAttribute('height', String(H));
  p.head.style.opacity = '0';
  p.sweep.style.opacity = '0';
  svg.dataset.stage = stage;
}

/** The base coat fills in from the cuticle up. */
export async function animateCoat(svg: SVGSVGElement) {
  const gsap = reducedMotion() ? null : await loadGsap();
  setStage(svg, 'base');
  if (!gsap) return;
  const { coat } = parts(svg);
  await gsap.fromTo(coat, { attr: { y: H, height: 0 } }, { attr: { y: 0, height: H }, duration: 0.7, ease: 'power2.out' });
}

/** Print the current design: the head sweeps tip to cuticle while the design is revealed behind it. */
export async function animatePrint(svg: SVGSVGElement) {
  const gsap = reducedMotion() ? null : await loadGsap();
  setStage(svg, 'printed');
  if (!gsap) return;
  const { print, head } = parts(svg);
  gsap.killTweensOf([print, head]);
  gsap.set(head, { opacity: 1, y: 0 });
  const tl = gsap.timeline();
  tl.fromTo(print, { attr: { height: 0 } }, { attr: { height: H }, duration: PRINT_SECONDS, ease: 'none' }, 0)
    .fromTo(head, { y: 4 }, { y: H - 6, duration: PRINT_SECONDS, ease: 'none' }, 0)
    .to(head, { opacity: 0, duration: 0.2, ease: 'power2.out' }, PRINT_SECONDS);
  await tl;
}

/** Seal: the gloss highlight sweeps once across the nail and the resting streak fades in. */
export async function animateSeal(svg: SVGSVGElement) {
  const gsap = reducedMotion() ? null : await loadGsap();
  setStage(svg, 'sealed');
  if (!gsap) return;
  const { sweep } = parts(svg);
  const streak = svg.querySelector('.nail-gloss-streak');
  gsap.killTweensOf([sweep, streak]);
  const tl = gsap.timeline();
  tl.fromTo(sweep, { x: -20, opacity: 0 }, { x: 120, duration: 0.9, ease: 'power2.inOut' }, 0)
    .to(sweep, { opacity: 0.55, duration: 0.25, ease: 'power2.out' }, 0)
    .to(sweep, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 0.6)
    .fromTo(streak, { opacity: 0 }, { opacity: 0.45, duration: 0.5, ease: 'power2.out' }, 0.35);
  await tl;
}

/** Print, then seal: one full run on the illustration. */
export async function printAndSeal(svg: SVGSVGElement) {
  await animatePrint(svg);
  await animateSeal(svg);
}
