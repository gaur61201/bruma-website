import { track } from './analytics';
import { storage } from './lead';
import { estimate } from './calculator-math';
import { showNumber } from './number-display';
import { ar as arForms, arCount } from '../i18n/plural';

interface Settings {
  lang: 'en' | 'ar';
  plan: number;
  cartridge: number;
  breakEven: string;
  breakEvenOne: string;
  underCost: string;
  labels: { revenue: string; running: string; left: string };
  currencyPrefix: string;
  currencySuffix: string;
}

const USED_KEY = 'bruma_calc_used';
const FIELDS = ['price', 'sets', 'days'] as const;
type Field = (typeof FIELDS)[number];

const fmt = (n: number) => {
  const r = Math.round(n);
  // Thousands separators by hand: the first toLocaleString() call loads locale data (a long task on phones).
  return `${r < 0 ? '−' : ''}${String(Math.abs(r)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export function initCalculator(form: HTMLFormElement) {
  const s = JSON.parse(form.dataset.settings ?? '{}') as Settings;
  const range = (f: Field) => form.querySelector<HTMLInputElement>(`[data-range="${f}"]`)!;
  const number = (f: Field) => form.querySelector<HTMLInputElement>(`[data-number="${f}"]`)!;
  const out = (key: string) => form.querySelector<HTMLElement>(`[data-out="${key}"]`)!;
  const values: Record<Field, number> = { price: 0, sets: 0, days: 0 };

  const limits = (f: Field) => {
    const el = range(f);
    return { min: Number(el.min), max: Number(el.max), step: Number(el.step) };
  };
  const snap = (f: Field, v: number) => {
    const { min, max, step } = limits(f);
    const clamped = Math.min(max, Math.max(min, v));
    return Math.round((clamped - min) / step) * step + min;
  };

  const breakEvenText = (n: number) => {
    if (n === 1) return s.breakEvenOne;
    return s.breakEven.replace('{n}', s.lang === 'ar' ? arCount(n, arForms.sets) : String(n));
  };

  // Screen readers get one summary of the final numbers after the user pauses, not every tween frame.
  const announcer = form.querySelector<HTMLElement>('[data-calc-announce]');
  const money = (n: number) => [s.currencyPrefix, fmt(n), s.currencySuffix].filter(Boolean).join(' ');
  let announceTimer = 0;

  const render = (announce = false) => {
    const monthly = (form.querySelector<HTMLInputElement>('input[name="mode"]:checked')?.value ?? 'monthly') === 'monthly';
    const e = estimate({ ...values, monthly, plan: s.plan, cartridge: s.cartridge });
    showNumber(out('revenue'), e.revenue, fmt);
    showNumber(out('running'), e.running, fmt);
    showNumber(out('left'), e.left, fmt);
    const be = out('breakEven');
    if (e.breakEven === null) {
      be.textContent = s.underCost;
      be.hidden = false;
    } else {
      be.textContent = breakEvenText(e.breakEven);
      be.hidden = !monthly;
    }
    if (announce && announcer) {
      window.clearTimeout(announceTimer);
      announceTimer = window.setTimeout(() => {
        const parts = [
          `${s.labels.revenue}: ${money(e.revenue)}.`,
          `${s.labels.running}: ${money(e.running)}.`,
          `${s.labels.left}: ${money(e.left)}.`,
        ];
        if (!be.hidden) parts.push(be.textContent ?? '');
        announcer.textContent = parts.join(' ');
      }, 600);
    }
  };

  let used = storage.get(USED_KEY) === '1';
  const markUsed = () => {
    if (used) return;
    used = true;
    storage.set(USED_KEY, '1');
    track('calculator_used', { lang: s.lang });
  };

  for (const f of FIELDS) {
    // The browser may restore form values on back navigation: start from the slider and re-sync.
    values[f] = snap(f, Number(range(f).value));
    range(f).value = number(f).value = String(values[f]);

    range(f).addEventListener('input', () => {
      values[f] = Number(range(f).value);
      number(f).value = String(values[f]);
      render(true);
      markUsed();
    });

    // Typing updates live when the value is valid; leaving the field snaps it into range.
    number(f).addEventListener('input', () => {
      const raw = number(f).value;
      const v = Number(raw);
      const { min, max } = limits(f);
      if (raw === '' || !Number.isFinite(v) || v < min || v > max) return;
      values[f] = v;
      range(f).value = String(v);
      render(true);
      markUsed();
    });
    number(f).addEventListener('change', () => {
      const v = Number(number(f).value);
      values[f] = number(f).value === '' || !Number.isFinite(v) ? values[f] : snap(f, v);
      number(f).value = String(values[f]);
      range(f).value = String(values[f]);
      render(true);
    });
  }

  form.querySelectorAll<HTMLInputElement>('input[name="mode"]').forEach((radio) =>
    radio.addEventListener('change', () => {
      render(true);
      markUsed();
    }),
  );
  form.addEventListener('submit', (e) => e.preventDefault());

  render();
}
