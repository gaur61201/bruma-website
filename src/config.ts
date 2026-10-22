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
  printerSizeCm: { width: 25, depth: 37, height: 42 }, // TODO confirm on the demo unit. The size spec and the /printer/ drawing.
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

  instagramUrl: '', // TODO confirm. The gallery's Instagram link renders only when this is set.
  plan: {
    depositKwd: 150, // TODO confirm. First payment at signing; shown only when flags.showPlanTerms is on.
    months: 10, // TODO confirm. Monthly payments after signing; shown only when flags.showPlanTerms is on.
  },
  // TODO confirm. Placeholders; listed on /ways-to-own/ only when flags.showPaymentMethods is on.
  paymentMethods: { en: ['KNET', 'Bank transfer', 'Cash'], ar: ['كي نت', 'تحويل بنكي', 'نقداً'] },
  disinfectant: { en: 'an alcohol-based surface disinfectant', ar: 'مطهّر أسطح يحتوي على الكحول' }, // TODO confirm
  maxStorageTempC: null as number | null, // TODO confirm. The "Store below …°C" line renders only when set.
  // TODO confirm. Day-to-day power advice for the hygiene page; empty means show the generic line.
  printerPowerGuidance: { en: '', ar: '' },
  serviceHours: { en: '', ar: '' }, // TODO confirm. Shown on /book-a-demo/ only when set.
  dataRetentionMonths: 12, // TODO confirm. How long demo-form details are kept (privacy policy).
  legalUpdated: '2026-10-21', // "Last updated" date on the warranty and privacy pages

  flags: {
    // Soft launch: while true, every page carries a noindex, nofollow robots tag and robots.txt disallows
    // everything. Set to false when the site is ready to be indexed.
    noIndex: true,
    showSalonStories: false,
    showWearTestResults: false,
    showInkCostFaq: false,
    showUpfrontSaving: true,
    showPlanTerms: false,
    showPaymentMethods: false,
    showStepPhotos: false, // /printer/ step story: a real photo beside each step once they exist
    showCloseUpPhoto: false, // /printer/ "Printed on the nail": the finished-nail close-up beside the layer diagram
  },
};

// Printer specifications for the printer page (/printer/). Labels are translated in the i18n files
// (printer.specs.labels); values are given in both languages here. A row with `onlyIf` shows only
// while that flag is on. Kept off the page until confirmed: camera resolution, number of built-in
// designs, Arabic menus, whether it needs internet, uploading your own designs.
export type PrinterSpecKey = 'printTime' | 'curing' | 'screen' | 'size' | 'weight' | 'power' | 'ink' | 'inkYield' | 'maintenance';
export interface PrinterSpec {
  label: PrinterSpecKey;
  value: { en: string; ar: string };
  confirmed: boolean;
  onlyIf?: keyof typeof config.flags;
}
const { width, depth, height } = config.printerSizeCm;
const sizeCm = [width, depth, height].join('\u00a0×\u00a0');
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
  { label: 'size', value: { en: `About ${sizeCm}\u00a0cm`, ar: `نحو ${sizeCm}\u00a0سم` }, confirmed: false }, // TODO confirm on the demo unit
  { label: 'weight', value: { en: 'About 11\u00a0kg', ar: 'نحو 11\u00a0كغ' }, confirmed: false }, // TODO confirm on the demo unit
  {
    label: 'power',
    value: { en: "100–240\u00a0V, works on Kuwait’s standard supply", ar: '100–240\u00a0فولت، تعمل على الكهرباء المعتادة في الكويت' },
    confirmed: false, // TODO confirm on the demo unit
  },
  { label: 'ink', value: { en: 'One tri-colour cartridge', ar: 'عبوة حبر واحدة ثلاثية الألوان' }, confirmed: false }, // TODO confirm on the demo unit
  {
    label: 'inkYield',
    value: { en: `About ${config.nailsPerCartridge} nails per cartridge`, ar: `نحو ${config.nailsPerCartridge} ظفر لكل عبوة` },
    confirmed: false, // TODO confirm on the demo unit
    onlyIf: 'showInkCostFaq',
  },
  {
    label: 'maintenance',
    value: { en: 'Cleans its print head automatically', ar: 'تنظّف رأس الطباعة تلقائياً' },
    confirmed: false, // TODO confirm on the demo unit
  },
];

// What's in the box, listed on the printer page after the specifications.
export interface BoxItem {
  item: { en: string; ar: string };
  /** The chip's icon (a name from Icon.astro). */
  icon: 'printer' | 'refill' | 'bottle' | 'hand' | 'document';
  confirmed: boolean;
}
export const boxContents: BoxItem[] = [
  { item: { en: 'The printer', ar: 'الطابعة' }, icon: 'printer', confirmed: false }, // TODO confirm
  { item: { en: 'A starter ink cartridge', ar: 'عبوة حبر للبدء' }, icon: 'refill', confirmed: false }, // TODO confirm
  { item: { en: 'Print gel', ar: 'جل الطباعة' }, icon: 'bottle', confirmed: false }, // TODO confirm
  { item: { en: 'Nail holders', ar: 'حوامل الأظافر' }, icon: 'hand', confirmed: false }, // TODO confirm
  { item: { en: 'A test card', ar: 'بطاقة اختبار' }, icon: 'document', confirmed: false }, // TODO confirm
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
