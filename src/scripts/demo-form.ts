import { track } from './analytics';
import { getLeadParams, storage } from './lead';

interface Settings {
  lang: 'en' | 'ar';
  endpoint: string;
  timeoutMs: number;
  whatsappNumber: string;
  thankYouPath: string;
  errors: {
    nameRequired: string;
    salonRequired: string;
    areaRequired: string;
    whatsappRequired: string;
    whatsappInvalid: string;
  };
  sending: string;
  submit: string;
  fallbackStatus: string;
  fallbackMessage: string;
  genericMessage: string;
  areaLabels: Record<string, string>;
}

type Field = 'name' | 'salon' | 'area' | 'whatsapp';
const FIELDS: Field[] = ['name', 'salon', 'area', 'whatsapp'];
export const NAME_KEY = 'bruma_lead_name';

/** Arabic-Indic and Persian digits to Western digits. */
const westernDigits = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660)).replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0));

/** The 8-digit Kuwait number, accepting spaces, dashes and a pasted +965 / 00965 prefix. */
export const localNumber = (raw: string) => {
  let digits = westernDigits(raw).replace(/\D/g, '');
  if (digits.length === 13 && digits.startsWith('00965')) digits = digits.slice(5);
  if (digits.length === 11 && digits.startsWith('965')) digits = digits.slice(3);
  return digits;
};

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (m, k: string) => values[k] ?? m);

export function initDemoForm(form: HTMLFormElement) {
  const s = JSON.parse(form.dataset.settings ?? '{}') as Settings;
  const control = (f: Field) => form.elements.namedItem(f) as HTMLInputElement | HTMLSelectElement;
  const errorEl = (f: Field) => form.querySelector<HTMLElement>(`#demo-${f}-error`)!;
  const submitBtn = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const waLink = form.querySelector<HTMLAnchorElement>('[data-demo-whatsapp]');
  const honeypot = form.elements.namedItem('website') as HTMLInputElement;
  const dirty = new Set<Field>();
  let sending = false;

  const value = (f: Field) => control(f).value.trim();

  const check = (f: Field): string => {
    const v = value(f);
    if (f === 'name') return v ? '' : s.errors.nameRequired;
    if (f === 'salon') return v ? '' : s.errors.salonRequired;
    if (f === 'area') return v ? '' : s.errors.areaRequired;
    if (!v) return s.errors.whatsappRequired;
    return localNumber(v).length === 8 ? '' : s.errors.whatsappInvalid;
  };

  const show = (f: Field, message: string) => {
    errorEl(f).textContent = message;
    if (message) control(f).setAttribute('aria-invalid', 'true');
    else control(f).removeAttribute('aria-invalid');
  };

  for (const f of FIELDS) {
    const el = control(f);
    // Editing a field clears its message; leaving a field you've touched checks it.
    el.addEventListener(f === 'area' ? 'change' : 'input', () => {
      dirty.add(f);
      show(f, '');
      if (f === 'area') show(f, check(f));
    });
    el.addEventListener('blur', () => {
      if (dirty.has(f)) show(f, check(f));
    });
  }

  const details = () => {
    const area = value('area');
    return {
      name: value('name'),
      salon: value('salon'),
      area,
      areaLabel: s.areaLabels[area] ?? area,
      whatsapp: `+965${localNumber(value('whatsapp'))}`,
    };
  };

  const whatsappUrl = (message: string) => `https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(message)}`;
  const fallbackUrl = () => {
    const d = details();
    return whatsappUrl(fill(s.fallbackMessage, { name: d.name, salon: d.salon, area: d.areaLabel }));
  };

  // The "message us on WhatsApp" button carries the details when they've been filled in.
  waLink?.addEventListener('click', () => {
    const complete = value('name') && value('salon') && value('area');
    waLink.href = complete ? fallbackUrl() : whatsappUrl(s.genericMessage);
  });

  const setSending = (on: boolean) => {
    sending = on;
    submitBtn.disabled = on;
    submitBtn.setAttribute('aria-busy', String(on));
    submitBtn.textContent = on ? s.sending : s.submit;
  };

  const openWhatsApp = () => {
    status.textContent = s.fallbackStatus;
    track('whatsapp_click', { lang: s.lang, location: 'form_fallback' });
    const url = fallbackUrl();
    window.setTimeout(() => {
      window.location.assign(url);
      setSending(false);
    }, 600);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;

    const messages = FIELDS.map((f) => [f, check(f)] as const);
    messages.forEach(([f, m]) => show(f, m));
    const firstInvalid = messages.find(([, m]) => m);
    if (firstInvalid) {
      control(firstInvalid[0]).focus();
      return;
    }

    setSending(true);
    status.textContent = '';
    const d = details();
    storage.set(NAME_KEY, d.name);

    // A filled honeypot means a bot: pretend it worked and send nothing.
    if (honeypot?.value) {
      window.location.assign(s.thankYouPath);
      return;
    }

    if (!s.endpoint) {
      openWhatsApp();
      return;
    }

    const { src, rep } = getLeadParams();
    const payload = {
      name: d.name,
      salon: d.salon,
      area: d.area,
      whatsapp: d.whatsapp,
      lang: s.lang,
      src,
      rep,
      page: window.location.origin + window.location.pathname,
      submittedAt: new Date().toISOString(),
    };

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), s.timeoutMs);
    try {
      const res = await fetch(s.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      track('demo_submit', { lang: s.lang, area: d.area, src, rep });
      window.location.assign(s.thankYouPath);
    } catch {
      openWhatsApp();
    } finally {
      window.clearTimeout(timer);
    }
  });

  // Coming back with the back button: make sure the form is usable again.
  window.addEventListener('pageshow', () => {
    if (sending) setSending(false);
  });
}
