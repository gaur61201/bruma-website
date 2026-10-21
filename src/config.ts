import { ar as arForms, arCount, enCount } from './i18n/plural';

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

// Printer specifications for the printer page (/printer/). Labels are translated in the i18n files
// (printer.specLabels); values are given in both languages here. A row with `onlyIf` shows only
// while that flag is on. Kept off the page until confirmed: camera resolution, number of built-in
// designs, Arabic menus, whether it needs internet, uploading your own designs.
export type PrinterSpecKey = 'printTime' | 'curing' | 'screen' | 'size' | 'weight' | 'power' | 'ink' | 'inkYield';
export interface PrinterSpec {
  label: PrinterSpecKey;
  value: { en: string; ar: string };
  confirmed: boolean;
  onlyIf?: keyof typeof config.flags;
}
export const printerSpecs: PrinterSpec[] = [
  {
    label: 'printTime',
    value: {
      en: `About ${enCount(config.printSecondsPerNail, 'second', 'seconds')} a nail`,
      ar: `نحو ${arCount(config.printSecondsPerNail, arForms.seconds)} لكل ظفر`,
    },
    confirmed: false, // TODO confirm on the demo unit
  },
  { label: 'curing', value: { en: 'Built-in UV/LED lamp', ar: 'مصباح UV/LED مدمج' }, confirmed: false }, // TODO confirm on the demo unit
  { label: 'screen', value: { en: '15.6-inch touchscreen', ar: 'شاشة لمس مقاس 15.6 بوصة' }, confirmed: false }, // TODO confirm on the demo unit
  { label: 'size', value: { en: 'About 25 × 37 × 42 cm', ar: 'نحو 25 × 37 × 42 سم' }, confirmed: false }, // TODO confirm on the demo unit
  { label: 'weight', value: { en: 'About 11 kg', ar: 'نحو 11 كغ' }, confirmed: false }, // TODO confirm on the demo unit
  {
    label: 'power',
    value: { en: "100–240 V, works on Kuwait's standard supply", ar: '100–240 فولت، تعمل على الكهرباء المعتادة في الكويت' },
    confirmed: false, // TODO confirm on the demo unit
  },
  { label: 'ink', value: { en: 'One tri-colour cartridge', ar: 'عبوة حبر واحدة ثلاثية الألوان' }, confirmed: false }, // TODO confirm on the demo unit
  {
    label: 'inkYield',
    value: { en: `About ${config.nailsPerCartridge} nails per cartridge`, ar: `نحو ${config.nailsPerCartridge} ظفر لكل عبوة` },
    confirmed: false, // TODO confirm on the demo unit
    onlyIf: 'showInkCostFaq',
  },
];

/** The spec rows to show, honouring each row's flag. */
export const visiblePrinterSpecs = () => printerSpecs.filter((s) => !s.onlyIf || config.flags[s.onlyIf]);

/** A spec value by key, e.g. the printer's size for the FAQ. */
export const printerSpec = (key: PrinterSpecKey) => printerSpecs.find((s) => s.label === key)!.value;

// Slider ranges for the earnings calculator.
export const calculatorRanges = {
  price: { min: 1, max: 30, step: 0.5 },
  sets: { min: 0, max: 20, step: 1 },
  days: { min: 1, max: 31, step: 1 },
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const phoneHref = `tel:${config.phoneDisplay.replace(/\s+/g, '')}`;
