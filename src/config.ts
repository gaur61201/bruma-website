// Every fact and setting for the site lives here.
// Values marked `// TODO confirm` are placeholders until confirmed; they are listed in TODO.md.

export const config = {
  siteUrl: 'https://brumakw.com',

  whatsappNumber: '965XXXXXXXX', // TODO confirm
  phoneDisplay: '+965 XXXX XXXX', // TODO confirm
  email: 'hello@brumakw.com', // TODO confirm
  formEndpoint: '', // n8n webhook URL. Empty means use the WhatsApp fallback.
  formTimeoutMs: 10000, // after this, the form falls back to WhatsApp
  analyticsId: '', // Umami website ID (cookieless). Empty means analytics off. // TODO confirm provider
  analyticsScriptSrc: 'https://cloud.umami.is/script.js', // TODO confirm provider

  printSecondsPerNail: 10, // TODO confirm by timing the demo unit
  minutesPerFullSet: 15, // TODO confirm
  demoMinutes: 30, // TODO confirm
  replyHours: 2, // TODO confirm
  replyDays: { en: 'Saturday to Thursday', ar: 'من السبت إلى الخميس' }, // TODO confirm
  planMonthlyKwd: 100,
  warrantyMonths: 12,
  loanerWithinHours: 72, // TODO confirm
  techniciansTrained: 2, // TODO confirm
  calculator: {
    pricePerSet: 6, // TODO confirm
    setsPerDay: 3, // TODO confirm
    workDays: 26, // TODO confirm
    cartridgeCostPerSet: 0.6, // Ink cost to the salon per 10-nail set, TODO confirm after the demo-unit test
  },
  nailsPerCartridge: 700, // TODO confirm by measuring on the demo unit
  upfrontSavingKwd: 150, // TODO confirm: monthly plan total minus upfront price

  flags: { showSalonStories: false, showWearTestResults: false, showInkCostFaq: false, showUpfrontSaving: true },
};

// Slider ranges for the earnings calculator.
export const calculatorRanges = {
  price: { min: 1, max: 30, step: 0.5 },
  sets: { min: 0, max: 20, step: 1 },
  days: { min: 1, max: 31, step: 1 },
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const phoneHref = `tel:${config.phoneDisplay.replace(/\s+/g, '')}`;
