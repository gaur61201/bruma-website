// Dev-only stress-test data for the break-ui pass. src/middleware.ts loads this only under `astro dev`,
// when a page is opened with ?data=worst or ?data=empty (see bruma-stress-data in astro.config.mjs);
// production builds never import it.
//
// - worst: realistic worst-case copy and settings in both languages: longer headings, labels and buttons
//   (what an owner or translator might write), a price with fils, a four-figure saving, a long email,
//   service hours, an Instagram link and long technician credits on gallery tiles.
// - empty: the collections the owner edits, emptied: gallery tiles, spec rows, box contents and the
//   "Before we arrive" list.
//
// The data enters at the same boundary as the real data (the dictionaries, config and data arrays), so
// the components are tested unchanged.
import { setDictionaryOverride, type Dict, type Lang } from '../i18n';
import { en } from '../i18n/en';
import { ar } from '../i18n/ar';
import { boxContents, config, printerSpecs } from '../config';
import { galleryTiles, homeTiles, type GalleryTile } from '../data/gallery';
// A stand-in picture so the credit captions render (never shipped: this module is dev-only).
import standIn from '../assets/brand/bruma-air-icon.png';

type Deep<T> = { [K in keyof T]?: T[K] extends (...args: never[]) => unknown ? T[K] : T[K] extends object ? Deep<T[K]> : T[K] };

/** Merge overrides onto a dictionary, keeping functions and untouched keys by reference. */
const merge = <T>(base: T, patch: Deep<T> | undefined): T => {
  if (!patch) return base;
  if (Array.isArray(patch)) return patch as T;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(patch)) {
    const b = (base as Record<string, unknown>)[k];
    out[k] = v && typeof v === 'object' && !Array.isArray(v) && b && typeof b === 'object' ? merge(b, v as Deep<typeof b>) : v;
  }
  return out as T;
};

const worstEn: Deep<Dict> = {
  hero: {
    eyebrow: 'For nail salons, beauty salons and clinics in Kuwait',
    h1: 'Any design your clients choose, on the nail in about 10 seconds',
    subline:
      'The BRUMA AI nail printer for nail salons, beauty salons and clinics. Delivered, installed, trained and supported by our own team in Kuwait.',
    price: 'From KWD 99.500 a month',
    priceNote: 'Training for your whole team, a 1-year warranty, a loaner machine during repairs and refills delivered to your salon, all included.',
    primaryCta: 'Book a free demonstration in your salon',
    secondaryCta: 'See what nail art could earn your salon each month',
  },
  proof: {
    items: [
      'About 10 seconds a nail, about 15 minutes for a full set of ten',
      '12-month warranty, with a loaner machine while yours is being repaired',
      'Delivered, installed and supported in all six governorates of Kuwait',
    ],
  },
  gallery: { h2: 'Designs your clients will ask for, again and again', allLink: 'See every design in the built-in library' },
  how: {
    h2: 'How it works in your salon, step by step',
    steps: [
      { title: 'Prepare', text: 'Apply base coat as usual, after cleaning and shaping each nail.' },
      { title: 'Choose together', text: 'Pick a design together on the large touchscreen.' },
      { title: 'Print', text: 'Each nail prints in about 10 seconds, one at a time.' },
      { title: 'Seal and cure', text: 'Finish with top coat and cure, as with any manicure.' },
    ],
  },
  calc: {
    h2: 'What could nail art earn your salon each month?',
    monthly: 'Monthly plan',
    upfront: 'Paid upfront, in full',
    priceLabel: 'Your price for one nail-art set of ten nails (KWD)',
    setsLabel: 'Nail-art sets per day, on average',
    daysLabel: 'Working days in a typical month',
    revenue: 'Nail-art revenue in a typical month',
    running: 'Running cost a month (plan and ink)',
    left: 'Left for your salon each month after costs',
  },
  included: {
    h2: "What's included with every printer",
  },
  ways: {
    h2: 'Two ways to own the BRUMA nail printer',
    monthly: {
      title: 'Flexible monthly plan',
      price: 'From KWD 99.500 a month',
      bullets: ['Machine with BRUMA branding on the front panel', 'Training, warranty and loaner machine included', 'Cartridges supplied and delivered monthly'],
    },
    upfront: {
      title: 'Pay once, upfront',
      price: 'Price confirmed at your free demo',
      bullets: ['Yours from day one, with no monthly payments', "Your salon's name and logo on the machine", 'Training, warranty and loaner machine included'],
    },
    cta: 'Book a free demo in your salon',
    compareLink: 'Compare the two plans side by side',
  },
  upfrontSaving: { badge: 'Save KWD 1,250', note: 'Compared with paying monthly for the full length of the plan.' },
  demo: {
    h2: 'Book a free demonstration in your salon',
    subline: 'We bring the printer to your salon. It takes about 30 minutes, with no obligation to buy.',
    nameLabel: 'Your full name',
    salonLabel: 'Salon or clinic name',
    areaLabel: 'Governorate',
    areaPlaceholder: 'Choose your governorate',
    whatsappLabel: 'WhatsApp number for the salon',
    whatsappHint: 'The 8 digits after +965, no spaces needed',
    submit: 'Book my free in-salon demo',
    whatsappAlt: 'Or send us a message on WhatsApp instead',
    replyTime: 'We reply on WhatsApp within 2 hours, Saturday to Thursday, and arrange a time that suits your salon.',
    privacy: 'We only use your details to arrange your demo, and we never share them.',
    errors: {
      nameRequired: 'Please enter your full name before sending.',
      salonRequired: "Please enter your salon's or clinic's name.",
      areaRequired: 'Please choose the governorate your salon is in.',
      whatsappRequired: 'Please enter the WhatsApp number we should message.',
      whatsappInvalid: 'Please enter the 8 digits after +965, without the country code.',
    },
  },
  printer: {
    hero: {
      h1: 'Detailed nail art, printed in seconds at your nail desk',
      specsLink: 'See the full technical specifications',
    },
    why: {
      h2: 'Why salons and clinics add it',
      cards: [
        { icon: 'sparkle', title: 'A new premium service on every set', text: 'Offer detailed nail art without hiring a specialist artist.' },
        { icon: 'check', title: 'The same result every time', text: "The design doesn't depend on who's on shift that day." },
        { icon: 'timer', title: 'Faster than painting by hand', text: 'Each nail prints in about 10 seconds.' },
      ],
    },
    sectionNav: { overview: 'Why salons add it', how: 'How it works, step by step', specs: 'Specifications', support: 'Training and support', faq: 'Questions' },
    demo: { title: 'Pick any design. Watch it print on the nail.', print: 'Print this design on the nail' },
    printedOn: {
      h2: 'Printed directly on the nail, not stuck on top',
      layers: { top: 'Top coat, cured under the UV/LED lamp', print: 'Printed design (ink only, no film)', film: 'Sticker film with adhesive backing' },
      stickerNote: 'Sticker: a separate film with an adhesive backing, laid on top of the base coat, with an edge that can lift.',
    },
    specs: { fitTitle: 'Will it fit on your nail desk?', drawingCaption: 'Illustration: overall size only, not the printer’s real shape or proportions.' },
    training: {
      h2: 'Your first week with BRUMA, step by step',
      steps: [
        { title: 'Delivery to your salon', text: 'We bring the printer to your salon, anywhere in Kuwait.' },
        { title: 'Installation and first test', text: 'We set it up at your nail desk and print a first test nail with you.' },
        { title: 'Hands-on training', text: '2 technicians trained on site.' },
        { title: 'Ongoing support', text: '' },
      ],
      topics: [
        'Using the printer and its touchscreen menus',
        'Prepping nails for the longest-lasting result',
        'Cleaning between clients, step by step',
        'Fixing simple problems without calling us',
      ],
      support: [
        'WhatsApp help, six days a week',
        'On-site visits whenever needed',
        '12-month warranty',
        'A loaner printer if a repair takes longer than 72 hours',
      ],
    },
  },
  nail: { designs: { flowers: 'Small white flowers with gold centres', heart: 'Gold heart outline, hand-drawn' } },
  bookPage: {
    h1: 'Book a free nail printer demonstration in your salon',
    next: {
      h2: 'What happens after you send the form',
      steps: [
        'Send the form, or message us on WhatsApp.',
        'We message you on WhatsApp within 2 hours to agree a time.',
        'We visit your salon with the printer and print a full set.',
        'You decide afterwards, with no obligation to buy.',
      ],
    },
    before: {
      items: [
        'A table near a standard power socket, close to your nail desk',
        'One team member or client happy to try a printed nail',
        'About 30 minutes when the salon is quieter',
      ],
    },
    contact: { h2: 'Contact us directly' },
  },
  footer: { tagline: 'The BRUMA nail printer for nail salons, beauty salons and clinics in all six governorates of Kuwait.' },
};

const worstAr: Deep<Dict> = {
  hero: {
    eyebrow: 'لصالونات الأظافر والتجميل والعيادات في الكويت',
    h1: 'أي تصميم يختاره العملاء على الظفر خلال نحو 10 ثوانٍ',
    subline: 'طابعة الأظافر الذكية من BRUMA لصالونات الأظافر والتجميل والعيادات، مع التوصيل والتركيب والتدريب والدعم من فريقنا داخل الكويت.',
    price: 'ابتداءً من 99.500 د.ك شهرياً',
    priceNote: 'يشمل تدريب فريقك بالكامل وضماناً لمدة سنة وجهازاً بديلاً أثناء الصيانة وتوصيل عبوات الحبر إلى الصالون.',
    primaryCta: 'حجز عرض توضيحي مجاني داخل صالونك',
    secondaryCta: 'حساب الأرباح المتوقعة لصالونك كل شهر',
  },
  proof: {
    items: [
      'نحو 10 ثوانٍ لكل ظفر، ونحو 15 دقيقة للمجموعة الكاملة',
      'ضمان لمدة 12 شهراً مع جهاز بديل أثناء إصلاح جهازك',
      'توصيل وتركيب ودعم في محافظات الكويت الست كلها',
    ],
  },
  gallery: { h2: 'تصاميم سيطلبها عملاؤك مرة بعد مرة', allLink: 'عرض كل التصاميم في المكتبة المدمجة' },
  how: {
    h2: 'طريقة العمل داخل صالونك خطوة بخطوة',
    steps: [
      { title: 'التحضير', text: 'وضع طبقة الأساس كالمعتاد بعد تنظيف كل ظفر وتشكيله.' },
      { title: 'اختيار التصميم معاً', text: 'اختيار التصميم معاً على شاشة اللمس الكبيرة.' },
      { title: 'الطباعة', text: 'يُطبع كل ظفر في نحو 10 ثوانٍ، ظفراً بعد ظفر.' },
      { title: 'الطبقة النهائية والتجفيف', text: 'إنهاء العمل بالطبقة العلوية والتجفيف كأي مانيكير.' },
    ],
  },
  calc: {
    h2: 'كم يمكن أن يربح صالونك من فن الأظافر كل شهر؟',
    monthly: 'الخطة الشهرية',
    upfront: 'الدفع مقدماً بالكامل',
    priceLabel: 'سعرك لمجموعة فن الأظافر الكاملة لعشرة أظافر (د.ك)',
    setsLabel: 'عدد المجموعات يومياً في المتوسط',
    daysLabel: 'عدد أيام العمل في الشهر المعتاد',
    left: 'المتبقي لصالونك كل شهر بعد التكاليف',
  },
  ways: {
    h2: 'طريقتان لامتلاك طابعة الأظافر من BRUMA',
    monthly: { title: 'خطة الاشتراك الشهري المرنة', price: 'ابتداءً من 99.500 د.ك شهرياً' },
    upfront: { title: 'الدفع مرة واحدة مقدماً', price: 'يُحدَّد السعر خلال العرض المجاني' },
    cta: 'حجز عرض مجاني في صالونك',
    compareLink: 'مقارنة الخطتين جنباً إلى جنب',
  },
  upfrontSaving: { badge: 'وفّر 1,250 د.ك' },
  demo: {
    h2: 'حجز عرض توضيحي مجاني داخل صالونك',
    nameLabel: 'الاسم الكامل',
    salonLabel: 'اسم الصالون أو العيادة',
    areaLabel: 'المحافظة',
    areaPlaceholder: 'اختيار المحافظة أو المنطقة',
    whatsappLabel: 'رقم واتساب الخاص بالصالون',
    whatsappHint: 'الأرقام الثمانية بعد +965 من دون مسافات',
    submit: 'إرسال طلب حجز العرض المجاني',
    whatsappAlt: 'أو المراسلة مباشرة عبر واتساب',
    replyTime: 'نرد عبر واتساب خلال ساعتين، من السبت إلى الخميس، ونرتّب موعداً يناسب الصالون.',
    errors: {
      nameRequired: 'يرجى إدخال الاسم الكامل قبل إرسال الطلب.',
      salonRequired: 'يرجى إدخال اسم الصالون أو العيادة.',
      areaRequired: 'يرجى اختيار المحافظة التي يقع فيها الصالون.',
      whatsappRequired: 'يرجى إدخال رقم واتساب الذي نتواصل عبره.',
      whatsappInvalid: 'يرجى إدخال الأرقام الثمانية بعد +965 من دون رمز الدولة.',
    },
  },
  printer: {
    hero: { h1: 'نقوش أظافر دقيقة تُطبع في ثوانٍ على طاولة الأظافر', specsLink: 'عرض المواصفات الفنية كاملة' },
    sectionNav: { overview: 'لماذا تضيفها الصالونات', how: 'كيف تعمل خطوة بخطوة', specs: 'المواصفات الفنية', support: 'التدريب والدعم', faq: 'الأسئلة الشائعة' },
    demo: { print: 'طباعة هذا التصميم على الظفر' },
    printedOn: {
      layers: { top: 'الطبقة العلوية بعد التجفيف بمصباح UV/LED', print: 'التصميم المطبوع (حبر فقط، من دون طبقة لاصقة)', film: 'طبقة الملصق مع الجهة اللاصقة' },
    },
    specs: { fitTitle: 'هل تتّسع لها طاولة الأظافر في صالونك؟' },
    training: {
      topics: ['استخدام الطابعة وقوائم شاشة اللمس', 'تجهيز الأظافر لأطول ثبات ممكن', 'التنظيف بين العميلات خطوة بخطوة', 'حل المشكلات البسيطة دون الاتصال بنا'],
      support: ['المساعدة عبر واتساب ستة أيام في الأسبوع', 'زيارات في الصالون كلما احتجتم إليها', 'ضمان لمدة 12 شهراً', 'طابعة بديلة إذا استغرقت الصيانة أكثر من 72 ساعة'],
    },
  },
  nail: { designs: { flowers: 'زهور بيضاء صغيرة بمراكز ذهبية', heart: 'قلب ذهبي مرسوم باليد' } },
  bookPage: {
    h1: 'حجز عرض توضيحي مجاني لطابعة الأظافر داخل صالونك',
    next: {
      h2: 'ما الذي يحدث بعد إرسال الطلب',
      steps: [
        'إرسال الطلب أو مراسلتنا عبر واتساب.',
        'نراسلكم عبر واتساب خلال ساعتين لتحديد موعد.',
        'نزور الصالون ومعنا الطابعة ونطبع مجموعة كاملة.',
        'القرار لكم بعد ذلك، من دون أي التزام بالشراء.',
      ],
    },
    contact: { h2: 'التواصل المباشر معنا' },
  },
};

const emptyBoth: Deep<Dict> = { bookPage: { before: { items: [] } } };

// Snapshots of the real settings, restored whenever the page is opened without ?data=.
const original = {
  config: { phoneDisplay: config.phoneDisplay, email: config.email, serviceHours: config.serviceHours, instagramUrl: config.instagramUrl, printerSizeCm: config.printerSizeCm },
  tiles: [...galleryTiles],
  home: [...homeTiles],
  specs: printerSpecs.map((s) => ({ ...s })),
  box: [...boxContents],
};
const replace = <T>(target: T[], items: T[]) => target.splice(0, target.length, ...items);

const credited = (tile: GalleryTile, technician: string, area: { en: string; ar: string }): GalleryTile => ({
  ...tile,
  image: standIn,
  alt: { en: 'Stand-in picture for the stress test', ar: 'صورة بديلة لاختبار الضغط' },
  technician,
  area,
});

export type Fixture = 'worst' | 'empty';

export function applyFixture(name: string | null) {
  const fixture: Fixture | null = name === 'worst' || name === 'empty' ? name : null;
  // Read by the dev toggle (src/dev/DataToggle.astro) to mark the active state.
  (globalThis as { __brumaFixture?: string }).__brumaFixture = fixture ?? '';

  // Restore everything first, so switching fixtures never stacks.
  Object.assign(config, original.config);
  replace(galleryTiles, original.tiles);
  replace(homeTiles, original.home);
  original.specs.forEach((s, i) => {
    Object.assign(printerSpecs[i], s);
    printerSpecs[i].onlyIf = s.onlyIf;
  });
  replace(boxContents, original.box);
  setDictionaryOverride(null);

  if (fixture === 'worst') {
    Object.assign(config, {
      phoneDisplay: '+965 9876 5432',
      email: 'demos.and.appointments@brumakw.com',
      serviceHours: { en: 'Saturday to Thursday, 9:00 am to 9:00 pm. Fridays by appointment.', ar: 'من السبت إلى الخميس، من 9 صباحاً حتى 9 مساءً. الجمعة بموعد مسبق.' },
      instagramUrl: 'https://www.instagram.com/brumakw.example/',
    });
    const longArea = { en: 'Mubarak Al-Kabeer', ar: 'مبارك الكبير' };
    const tiles = [...original.tiles];
    tiles[0] = credited(tiles[0], 'Aleksandra Wiśniewska-Kowalczyk', longArea);
    tiles[1] = credited(tiles[1], 'Jo', { en: 'Salmiya', ar: 'السالمية' });
    replace(galleryTiles, tiles);
    replace(homeTiles, tiles.slice(0, 16));
    const size = printerSpecs.find((s) => s.label === 'size');
    if (size) size.value = { en: 'About 25 × 37 × 42 cm (width × depth × height), plus room for the hand rest', ar: 'نحو 25 × 37 × 42 سم (العرض × العمق × الارتفاع)، مع مساحة لمسند اليد' };
    const power = printerSpecs.find((s) => s.label === 'power');
    if (power) power.value = { en: "100–240 V, 50/60 Hz, works on Kuwait's standard supply with the plug supplied", ar: '100–240 فولت، 50/60 هرتز، تعمل على الكهرباء المعتادة في الكويت بالقابس المرفق' };
    // A wide, low box (the drawing rescales) and a longer box list with long items.
    config.printerSizeCm = { width: 48, depth: 52, height: 30 };
    replace(boxContents, [
      ...original.box,
      { item: { en: 'A spare set of nail holders in three sizes', ar: 'مجموعة احتياطية من حوامل الأظافر بثلاثة مقاسات' }, icon: 'hand', confirmed: false },
      { item: { en: 'Quick-start guide in English and Arabic', ar: 'دليل البدء السريع بالعربية والإنجليزية' }, icon: 'document', confirmed: false },
    ]);
    setDictionaryOverride({ en: merge(en, worstEn), ar: merge(ar, worstAr) } satisfies Record<Lang, Dict>);
  }

  if (fixture === 'empty') {
    replace(galleryTiles, []);
    replace(homeTiles, []);
    printerSpecs.forEach((s) => (s.onlyIf = 'showSalonStories')); // every row hidden
    replace(boxContents, []);
    setDictionaryOverride({ en: merge(en, emptyBoth), ar: merge(ar, emptyBoth) });
  }
}
