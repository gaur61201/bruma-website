// Arabic copy. All of it needs a native speaker's review (listed in TODO.md).
// Buttons use verbal nouns, never gendered commands. Numbers use Western digits.
import { config } from '../config';
import { ar as forms, arCount, kwd } from './plural';
import type { Dict } from './en';

const c = config;
const calc = c.calculator;
const exRevenue = calc.pricePerSet * calc.setsPerDay * calc.workDays;
const exRunning = c.planMonthlyKwd + calc.cartridgeCostPerSet * calc.setsPerDay * calc.workDays;

const seconds = arCount(c.printSecondsPerNail, forms.seconds);
const replyHours = arCount(c.replyHours, forms.hours);
const loanerHours = arCount(c.loanerWithinHours, forms.hours);
const warranty = arCount(c.warrantyMonths, forms.months);
const plan = kwd(c.planMonthlyKwd, 'ar');

export const ar: Dict = {
  meta: {
    home: {
      title: 'طابعة الأظافر BRUMA لصالونات الكويت | عرض مجاني',
      description: `طابعة الأظافر من BRUMA تضع أي تصميم على الظفر خلال ${seconds} تقريباً، مع التوصيل والتركيب والتدريب والدعم داخل الكويت. حجز عرض مجاني في صالونك.`,
    },
    thankYou: {
      title: 'شكراً لك | BRUMA',
      description: 'شكراً لحجز عرض BRUMA المجاني. سنراسلك عبر واتساب لترتيب الموعد.',
    },
    notFound: {
      title: 'الصفحة غير موجودة | BRUMA',
      description: 'هذه الصفحة غير موجودة.',
    },
    ogImageAlt: 'شعار BRUMA على خلفية بلون العاج',
    ogLocale: 'ar_AR',
  },

  skipLink: 'الانتقال إلى المحتوى',

  nav: {
    label: 'القائمة الرئيسية',
    homeLabel: 'BRUMA، الصفحة الرئيسية',
    printer: 'الطابعة',
    gallery: 'المعرض',
    waysToOwn: 'طرق التملّك',
    hygiene: 'النظافة',
    bookDemo: 'حجز عرض',
    menuOpen: 'فتح القائمة',
    menuClose: 'إغلاق القائمة',
    menuTitle: 'القائمة',
  },

  langSwitch: {
    label: 'English',
    labelLang: 'en',
  },

  whatsapp: {
    floatLabel: 'مراسلة BRUMA عبر واتساب',
    floatMessage: 'مرحباً BRUMA، أرغب في معرفة المزيد عن طابعة الأظافر.',
  },

  hero: {
    eyebrow: 'لصالونات الكويت',
    h1: `أي تصميم على الظفر خلال ${seconds}`,
    subline: 'طابعة الأظافر الذكية من BRUMA للصالونات والعيادات. التوصيل والتركيب والتدريب والدعم داخل الكويت.',
    price: `ابتداءً من ${plan} شهرياً`,
    priceNote: 'يشمل التدريب وضمان لمدة سنة وجهازاً بديلاً أثناء الصيانة.',
    primaryCta: 'حجز عرض مجاني في صالونك',
    secondaryCta: 'حساب الأرباح المتوقعة',
    mediaCaption: 'فيديو: طباعة ظفر عن قرب',
    videoLabel: 'طباعة تصميم على ظفر، عن قرب',
    pauseVideo: 'إيقاف الفيديو مؤقتاً',
    playVideo: 'تشغيل الفيديو',
  },

  proof: {
    label: 'باختصار',
    items: [
      `نحو ${seconds} لكل ظفر`,
      `ضمان لمدة ${warranty} مع جهاز بديل أثناء الصيانة`,
      'التركيب والدعم داخل الكويت',
    ],
  },

  gallery: {
    h2: 'تصاميم ستطلبها عميلاتك',
    tilePlaceholder: 'صورة: تصميم مطبوع على ظفر',
    credit: 'تصميم: {technician}، {area}',
    note: 'تصاميم جاهزة للاختيار من المكتبة المدمجة في الطابعة.',
    rowLabels: ['تصاميم مطبوعة، الصف الأول', 'تصاميم مطبوعة، الصف الثاني'],
    pause: 'إيقاف حركة التصاميم مؤقتاً',
    play: 'تشغيل حركة التصاميم',
  },

  how: {
    h2: 'كيف تعمل في صالونك',
    steps: [
      { title: 'التحضير', text: 'وضع طبقة الأساس كالمعتاد.' },
      { title: 'الاختيار', text: 'اختيار التصميم من الشاشة اللمسية.' },
      { title: 'الطباعة', text: `يُطبع كل ظفر خلال ${seconds} تقريباً.` },
      { title: 'التثبيت', text: 'الإنهاء بالطبقة العلوية ثم التجفيف بالمصباح.' },
    ],
    setTime: `تستغرق المجموعة الكاملة نحو ${arCount(c.minutesPerFullSet, forms.minutes)}.`,
  },

  calc: {
    h2: 'كم يمكن أن يربح صالونك؟',
    intro: 'تعديل الأرقام بما يناسب صالونك.',
    modeLegend: 'طريقة الدفع',
    monthly: 'خطة شهرية',
    upfront: 'الدفع مقدماً',
    priceLabel: 'سعر مجموعة فن الأظافر لديكم (د.ك)',
    setsLabel: 'عدد المجموعات يومياً',
    daysLabel: 'أيام العمل في الشهر',
    resultsLabel: 'التقدير',
    revenue: 'إيرادات فن الأظافر شهرياً',
    running: 'تكلفة التشغيل شهرياً',
    ink: 'الحبر',
    left: 'المتبقي لصالونك كل شهر',
    breakEven: 'نحو {n} شهرياً تغطي قيمة الخطة.',
    breakEvenOne: 'مجموعة واحدة شهرياً تغطي قيمة الخطة.',
    underCost: 'بهذا السعر تكون تكلفة الحبر أعلى من دخل المجموعة. يُنصح بتجربة سعر أعلى.',
    note: 'تقدير فقط. تعتمد النتائج على أسعاركم وعدد العميلات اللواتي يخترن فن الأظافر.',
    staticExample: `مثال: بسعر ${kwd(calc.pricePerSet, 'ar')} للمجموعة، و${arCount(calc.setsPerDay, forms.sets)} يومياً، و${calc.workDays} يوم عمل في الشهر، يحقق فن الأظافر نحو ${kwd(Math.round(exRevenue), 'ar')} شهرياً. وبعد قيمة الخطة والحبر (نحو ${kwd(Math.round(exRunning), 'ar')})، يتبقى لصالونك نحو ${kwd(Math.round(exRevenue - exRunning), 'ar')}.`,
    currencyPrefix: '',
    currencySuffix: 'د.ك',
  },

  included: {
    h2: 'ما الذي يشمله',
    cards: [
      { icon: 'truck', title: 'التوصيل والتركيب', text: 'نتولى تركيب الطابعة في صالونك.' },
      { icon: 'training', title: 'التدريب', text: `تدريب في الصالون لعدد ${c.techniciansTrained} من فريق العمل.` },
      { icon: 'shield', title: `ضمان لمدة ${warranty}`, text: 'الصيانة تتم محلياً.' },
      { icon: 'swap', title: 'جهاز بديل', text: `إذا استغرقت الصيانة أكثر من ${loanerHours}، نوفر لكم طابعة بديلة.` },
      { icon: 'library', title: 'مكتبة التصاميم', text: 'تصاميم جاهزة مدمجة في الطابعة.' },
      { icon: 'refill', title: 'عبوات الحبر', text: 'توصيل العبوات البديلة إلى صالونك.' },
    ],
  },

  hygiene: {
    h2: 'نظافة بين كل عميلة وأخرى',
    points: [
      { icon: 'sparkle', text: 'خطوات تنظيف بسيطة بين العميلات، ضمن التدريب.' },
      { icon: 'document', text: 'صحائف بيانات السلامة للحبر والجل متاحة عند الطلب.' },
      { icon: 'hand', text: 'إرشادات اختبار الحساسية للعميلات ذوات البشرة الحساسة.' },
    ],
  },

  ways: {
    h2: 'طريقتان للتملّك',
    monthly: {
      title: 'خطة شهرية',
      price: `ابتداءً من ${plan} شهرياً`,
      bullets: ['جهاز يحمل علامة BRUMA', 'يشمل التدريب والضمان والجهاز البديل', 'توريد عبوات الحبر شهرياً'],
      small: 'تُشرح شروط الخطة خلال العرض.',
    },
    upfront: {
      title: 'الدفع مقدماً',
      price: 'السعر يُقدَّم خلال العرض',
      bullets: ['ملكك من اليوم الأول', 'اسم صالونك وشعاره على الجهاز', 'يشمل التدريب والضمان والجهاز البديل'],
      small: '',
    },
    cta: 'حجز عرض مجاني',
  },

  stories: {
    h2: 'صالونات تستخدم BRUMA',
  },

  upfrontSaving: {
    badge: `وفّر ${kwd(c.upfrontSavingKwd, 'ar')}`,
    note: 'مقارنةً بالدفع الشهري طوال مدة الخطة.',
  },

  faq: {
    h2: 'أسئلة شائعة من الصالونات',
    items: [
      {
        q: 'هل يحتاج فريق العمل إلى مهارات في الرسم؟',
        a: 'لا. يُختار التصميم من الشاشة، وتتولى الطابعة التفاصيل الدقيقة. ونقدّم التدريب لفريقكم في الصالون.',
      },
      {
        q: 'كم يدوم التصميم المطبوع؟',
        a: 'كأي مانيكير، يعتمد ذلك على التحضير والطبقة العلوية. نُجري اختبارات تحمّل في صالونات داخل الكويت، ونعرض صور اليوم الأول والسابع والرابع عشر خلال العرض.',
        aWithResults: '',
      },
      {
        q: 'ماذا لو تعطّل الجهاز؟',
        a: `الجهاز مشمول بضمان لمدة ${warranty}. وإذا استغرقت الصيانة أكثر من ${loanerHours}، نوفر لكم طابعة بديلة ليستمر العمل في صالونك.`,
      },
      {
        q: 'هل هي نظيفة وآمنة للعميلات؟',
        a: 'تُنظَّف الأجزاء التي تلامس العميلة بعد كل عميلة وفق دليل التنظيف الخاص بنا. صحائف بيانات السلامة للحبر والجل متاحة. وللعميلات ذوات البشرة الحساسة، يُنصح بإجراء اختبار حساسية أولاً.',
      },
      {
        q: 'هل يمكن وضع شعار الصالون على الجهاز؟',
        a: 'نعم، عند الدفع مقدماً. أما أجهزة الخطة الشهرية فتحمل اسم BRUMA.',
      },
    ],
    inkItem: {
      q: 'كم تبلغ تكلفة الحبر للمجموعة الواحدة؟',
      a: `نحو ${kwd(c.calculator.cartridgeCostPerSet, 'ar')} لكل مجموعة من 10 أظافر. تطبع العبوة الواحدة نحو ${c.nailsPerCartridge} ظفر، ونوصل العبوات البديلة إلى صالونك.`,
    },
  },

  demo: {
    h2: 'حجز عرض مجاني في صالونك',
    subline: `نحضر الطابعة إليكم. يستغرق العرض نحو ${arCount(c.demoMinutes, forms.minutes)}، دون أي التزام.`,
    nameLabel: 'الاسم',
    salonLabel: 'اسم الصالون',
    areaLabel: 'المنطقة',
    areaPlaceholder: 'اختيار المنطقة',
    whatsappLabel: 'رقم واتساب',
    whatsappHint: 'الأرقام الثمانية بعد ‎+965',
    honeypotLabel: 'يُترك هذا الحقل فارغاً',
    submit: 'تأكيد حجز العرض',
    sending: 'جارٍ الإرسال…',
    whatsappAlt: 'أو المراسلة عبر واتساب',
    replyTime: `نرد عبر واتساب خلال ${replyHours}، ${c.replyDays.ar}.`,
    privacy: 'نستخدم بياناتكم لترتيب العرض فقط.',
    errors: {
      nameRequired: 'يرجى كتابة الاسم.',
      salonRequired: 'يرجى كتابة اسم الصالون.',
      areaRequired: 'يرجى اختيار المنطقة.',
      whatsappRequired: 'يرجى كتابة رقم واتساب.',
      whatsappInvalid: 'يرجى كتابة الأرقام الثمانية بعد ‎+965.',
    },
    fallbackStatus: 'نفتح واتساب الآن مع بياناتكم لإرسالها إلينا.',
    fallbackMessage: 'مرحباً BRUMA، أرغب في حجز عرض مجاني. الاسم: {name}. الصالون: {salon}. المنطقة: {area}.',
  },

  governorates: [
    { value: 'Capital', label: 'العاصمة' },
    { value: 'Hawalli', label: 'حولي' },
    { value: 'Farwaniya', label: 'الفروانية' },
    { value: 'Ahmadi', label: 'الأحمدي' },
    { value: 'Jahra', label: 'الجهراء' },
    { value: 'Mubarak Al-Kabeer', label: 'مبارك الكبير' },
  ],

  footer: {
    tagline: 'طابعة الأظافر من BRUMA للصالونات والعيادات في الكويت.',
    navLabel: 'تذييل الصفحة',
    sectionsHeading: 'في هذه الصفحة',
    contactHeading: 'التواصل',
    whatsapp: 'واتساب',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    copyright: `© ${new Date().getFullYear()} BRUMA`,
  },

  thankYou: {
    h1WithName: 'شكراً، {name}.',
    h1: 'شكراً لك.',
    body: `سنراسلكم عبر واتساب خلال ${replyHours} لترتيب موعد العرض.`,
    talkNow: 'هل تفضلون التحدث الآن؟',
    whatsappButton: 'المراسلة عبر واتساب',
    whatsappMessage: 'مرحباً BRUMA، حجزت للتو عرضاً مجانياً عبر موقعكم.',
    backHome: 'العودة إلى الصفحة الرئيسية',
  },

  notFound: {
    line: 'هذه الصفحة غير موجودة.',
    home: 'الانتقال إلى الصفحة الرئيسية',
  },
};
