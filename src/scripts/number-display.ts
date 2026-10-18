// Shows calculator numbers. Without motion the text simply changes; motion.ts registers an
// animator so numbers tween instead of jumping. Works the same whether or not GSAP ever loads.

export type NumberFormat = (n: number) => string;
export type NumberAnimator = (el: HTMLElement, from: number, to: number, format: NumberFormat) => void;

const state = new WeakMap<HTMLElement, { value: number; format: NumberFormat }>();
let animator: NumberAnimator | null = null;

export const setNumberAnimator = (fn: NumberAnimator | null) => {
  animator = fn;
};

/** The value an element is showing (or heading to), and how it's formatted. */
export const numberState = (el: HTMLElement) => state.get(el);

export function showNumber(el: HTMLElement, value: number, format: NumberFormat) {
  const from = state.get(el)?.value;
  state.set(el, { value, format });
  if (animator && from !== undefined && from !== value) animator(el, from, value, format);
  else el.textContent = format(value);
}
