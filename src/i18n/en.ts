import { config, printerSpec } from '../config';
import { enCount, kwd } from './plural';

const c = config;
const calc = c.calculator;
const exRevenue = calc.pricePerSet * calc.setsPerDay * calc.workDays;
const exRunning = c.planMonthlyKwd + calc.cartridgeCostPerSet * calc.setsPerDay * calc.workDays;

const seconds = enCount(c.printSecondsPerNail, 'second', 'seconds');
const replyHours = enCount(c.replyHours, 'hour', 'hours');
const loanerHours = enCount(c.loanerWithinHours, 'hour', 'hours');
const plan = kwd(c.planMonthlyKwd, 'en');

export const en = {
  meta: {
    home: {
      title: 'BRUMA nail printer for salons in Kuwait | Free demo',
      description: `The BRUMA nail printer puts any design on a nail in about ${seconds}. Delivered, installed, trained and supported in Kuwait. Book a free demo in your salon.`,
    },
    thankYou: {
      title: 'Thank you | BRUMA',
      description: "Thanks for booking a free BRUMA demo. We'll message you on WhatsApp to arrange it.",
    },
    notFound: {
      title: 'Page not found | BRUMA',
      description: "This page doesn't exist.",
    },
    ogImageAlt: 'The BRUMA wordmark on a bone background',
    ogLocale: 'en_US',
  },

  skipLink: 'Skip to content',

  nav: {
    label: 'Main',
    homeLabel: 'BRUMA home',
    printer: 'The printer',
    gallery: 'Gallery',
    waysToOwn: 'Ways to own it',
    hygiene: 'Hygiene',
    bookDemo: 'Book a demo',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    menuTitle: 'Menu',
  },

  langSwitch: {
    /** The label shown for the *other* language. */
    label: 'عربي',
    labelLang: 'ar',
  },

  whatsapp: {
    floatLabel: 'Chat with BRUMA on WhatsApp',
    floatMessage: "Hi BRUMA, I'd like to know more about the nail printer.",
  },

  hero: {
    eyebrow: 'For salons in Kuwait',
    h1: `Any design, on the nail in ${seconds}`,
    subline:
      'The BRUMA AI nail printer for salons and clinics. Delivered, installed, trained and supported in Kuwait.',
    price: `From ${plan} a month`,
    priceNote: 'Training, a 1-year warranty and a loaner machine during repairs included.',
    primaryCta: 'Book a free demo in your salon',
    secondaryCta: 'See what it could earn you',
    mediaCaption: 'Video: a nail printing, close-up',
    videoLabel: 'A nail being printed, close-up',
    pauseVideo: 'Pause video',
    playVideo: 'Play video',
  },

  proof: {
    label: 'At a glance',
    items: [
      `About ${seconds} a nail`,
      `${c.warrantyMonths}-month warranty, with a loaner during repairs`,
      'Installed and supported in Kuwait',
    ],
  },

  gallery: {
    h2: 'Designs your clients will ask for',
    tilePlaceholder: 'Photo: printed nail design',
    credit: 'Design by {technician}, {area}',
    note: "Choose from the printer's built-in design library.",
    rowLabels: ['Printed designs, row 1', 'Printed designs, row 2'],
    pause: 'Pause the moving designs',
    play: 'Play the moving designs',
    allLink: 'See all designs',
  },

  how: {
    h2: 'How it works in your salon',
    steps: [
      { title: 'Prep', text: 'Apply base coat as usual.' },
      { title: 'Choose', text: 'Pick a design on the touchscreen.' },
      { title: 'Print', text: `Each nail prints in about ${seconds}.` },
      { title: 'Seal', text: 'Finish with top coat and cure.' },
    ],
    setTime: `A full set takes about ${enCount(c.minutesPerFullSet, 'minute', 'minutes')}.`,
    printerLink: 'See the printer in detail',
  },

  calc: {
    h2: 'What could it earn your salon?',
    intro: 'Set the numbers to match your salon.',
    modeLegend: 'How you pay',
    monthly: 'Monthly plan',
    upfront: 'Paid upfront',
    priceLabel: 'Your price per nail-art set (KWD)',
    setsLabel: 'Sets per day',
    daysLabel: 'Working days a month',
    resultsLabel: 'Your estimate',
    revenue: 'Nail-art revenue a month',
    running: 'Running cost a month',
    ink: 'Ink',
    left: 'Left for your salon each month',
    /** {n} is filled in the browser. */
    breakEven: 'About {n} sets a month cover the plan.',
    breakEvenOne: 'About 1 set a month covers the plan.',
    underCost: 'At this price, cartridges cost more than each set earns. Try a higher price.',
    note: 'Estimate only. Your results depend on your prices and how many clients choose nail art.',
    staticExample: `Example: at ${kwd(calc.pricePerSet, 'en')} a set, ${calc.setsPerDay} sets a day and ${calc.workDays} working days, nail art brings in about ${kwd(Math.round(exRevenue), 'en')} a month. After the plan and cartridges (about ${kwd(Math.round(exRunning), 'en')}), about ${kwd(Math.round(exRevenue - exRunning), 'en')} is left for your salon.`,
    currencyPrefix: 'KWD',
    currencySuffix: '',
  },

  included: {
    h2: "What's included",
    cards: [
      { icon: 'truck', title: 'Delivery and installation', text: 'We set it up in your salon.' },
      { icon: 'training', title: 'Training', text: `On-site training for ${c.techniciansTrained} technicians.` },
      { icon: 'shield', title: `${c.warrantyMonths}-month warranty`, text: 'Repairs handled locally.' },
      { icon: 'swap', title: 'Loaner machine', text: `If a repair takes longer than ${loanerHours}, we lend you a printer.` },
      { icon: 'library', title: 'Design library', text: 'Ready-made designs built in.' },
      { icon: 'refill', title: 'Cartridge refills', text: 'Delivered to your salon. Your first cartridge comes in the box.' },
    ],
  },

  hygiene: {
    h2: 'Clean between every client',
    points: [
      { icon: 'sparkle', text: 'Simple cleaning steps between clients, included in your training.' },
      { icon: 'document', text: 'Safety data sheets for the ink and gels, available on request.' },
      { icon: 'hand', text: 'Patch test advice for clients with sensitive skin.' },
    ],
    detailLink: 'Hygiene and safety in detail',
  },

  ways: {
    h2: 'Two ways to own it',
    monthly: {
      title: 'Monthly plan',
      price: `From ${plan} a month`,
      bullets: ['Machine with BRUMA branding', 'Training, warranty and loaner included', 'Cartridges supplied monthly'],
      small: 'Plan terms explained at your demo.',
    },
    upfront: {
      title: 'Pay upfront',
      price: 'Price at your demo',
      bullets: ['Yours from day one', "Your salon's name and logo on the machine", 'Training, warranty and loaner included'],
      small: '',
    },
    cta: 'Book a free demo',
    compareLink: 'Compare the plans',
  },

  stories: {
    h2: 'Salons using BRUMA',
  },

  printer: {
    meta: {
      title: 'The BRUMA nail printer for salons in Kuwait',
      description: `The BRUMA nail printer for salons: any design on the nail in about ${seconds}. See the specs, training and support in Kuwait, then book a free demo.`,
    },
    hero: {
      eyebrow: 'The BRUMA nail printer',
      h1: 'Detailed nail art, printed in seconds',
      subline: 'Prep the nail, pick a design, and the printer does the detail. Every set comes out the same, whoever is working.',
      specsLink: 'See the specifications',
      mediaCaption: 'Photo: the printer, three-quarter view',
    },
    why: {
      h2: 'Why salons add it',
      cards: [
        { icon: 'sparkle', title: 'A new service on every set', text: 'Offer detailed nail art without hiring a specialist.' },
        { icon: 'check', title: 'The same result every time', text: "The design doesn't depend on who's on shift." },
        { icon: 'timer', title: 'Faster than painting by hand', text: `Each nail prints in about ${seconds}.` },
      ],
    },
    steps: {
      h2: 'Step by step',
      items: [
        {
          title: 'Prep',
          text: 'Prep the nails as your team already does: clean, shape and apply base coat. Your usual routine stays the same.',
          photo: 'Photo: base coat on a prepared nail',
        },
        {
          title: 'Choose',
          text: "Your client picks a design on the touchscreen, from the printer's built-in design library. It's easy to browse together at the nail desk.",
          photo: 'Photo: choosing a design on the touchscreen',
        },
        {
          title: 'Print',
          text: `The printer does the detailed work, one nail at a time. Each nail prints in about ${seconds}.`,
          photo: 'Photo: a nail printing',
        },
        {
          title: 'Seal',
          text: 'Finish with top coat and cure, as you would any manicure. The design is sealed in under the top coat.',
          photo: 'Photo: top coat and curing',
        },
      ],
      footnote: `A full set takes about ${enCount(c.minutesPerFullSet, 'minute', 'minutes')}.`,
    },
    // TODO confirm on the demo unit
    printedOn: {
      h2: 'Printed on the nail, not stuck on',
      text: "The design is printed directly onto the prepared nail, then sealed under top coat and cured. It's not a sticker, a wrap or a press-on.",
      photo: 'Photo: finished nail, close-up',
    },
    specs: {
      h2: 'Specifications',
      caption: 'BRUMA nail printer specifications',
      note: 'Fits on a standard nail desk. Check your space at the demo.',
      boxTitle: "What's in the box",
      labels: {
        printTime: 'Print time',
        curing: 'Curing',
        screen: 'Screen',
        size: 'Size',
        weight: 'Weight',
        power: 'Power',
        ink: 'Ink',
        inkYield: 'Ink yield',
        maintenance: 'Maintenance',
      },
    },
    training: {
      h2: 'Training and support',
      trainingTitle: 'Training',
      trainingItems: ['Using the printer', 'Prepping nails for the best result', 'Cleaning between clients', 'Fixing simple problems'],
      trainingNote: `On site, for ${c.techniciansTrained} technicians.`,
      supportTitle: 'Support',
      supportCards: [
        { icon: 'whatsapp', title: 'WhatsApp help', text: 'Ask us anything on WhatsApp.' },
        { icon: 'truck', title: 'On-site visits', text: 'We come to your salon when needed.' },
      ],
    },
    running: {
      h2: 'Running costs',
      text: `Ink costs about ${kwd(c.calculator.cartridgeCostPerSet, 'en')} per set of 10 nails. Refills are delivered to your salon.`,
      link: 'Try the earnings calculator',
    },
    faq: {
      h2: 'Questions about the printer',
      space: { q: 'How much space does it need?', a: `${printerSpec('size').en} on a nail desk, plus a standard socket.` },
      installs: { q: 'Who installs it?', a: 'We deliver it, set it up in your salon and train your team on site.' },
    },
  },

  galleryPage: {
    meta: {
      title: 'Nail art designs for salons in Kuwait | BRUMA gallery',
      description:
        'Browse nail designs the BRUMA printer puts on the nail in seconds: Gulf, bridal, minimal and seasonal styles. Book a free demo in your salon in Kuwait.',
    },
    h1: 'Browse the designs',
    subline: 'Designs your clients will ask for, printed in seconds.',
    gridTitle: 'Designs',
    filterLabel: 'Filter designs by style',
    categories: { all: 'All', gulf: 'Gulf', bridal: 'Bridal', minimal: 'Minimal', seasonal: 'Seasonal' },
    placeholders: {
      gulf: 'Photo: Gulf nail design',
      bridal: 'Photo: bridal nail design',
      minimal: 'Photo: minimal nail design',
      seasonal: 'Photo: seasonal nail design',
    },
    count: (n: number) => enCount(n, 'design', 'designs'),
    lightbox: {
      label: 'Design viewer',
      close: 'Close',
      prev: 'Previous design',
      next: 'Next design',
      /** {n} and {total} are filled in the browser. */
      count: '{n} of {total}',
    },
    wearTitle: 'Wear test',
    instagram: 'Follow our latest designs',
  },

  waysPage: {
    meta: {
      title: 'Monthly plan or pay upfront | BRUMA nail printer',
      description: `Own the BRUMA nail printer on a monthly plan from ${plan} a month, or pay upfront and save. Training, warranty and support in Kuwait are included.`,
    },
    h1: 'Two ways to own it',
    /** The "and save" version shows while flags.showUpfrontSaving is on. */
    subline: `Pay monthly from ${plan}, or pay once and save. Training, warranty and support are included either way.`,
    sublineNoSaving: `Pay monthly from ${plan}, or pay once upfront. Training, warranty and support are included either way.`,
    plansLabel: 'The two ways to own it',
    compare: {
      h2: 'Compare the plans',
      caption: 'The monthly plan and paying upfront, side by side',
      rows: {
        payment: { label: 'Payment', monthly: `From ${plan} a month`, upfront: 'One payment. Price at your demo' },
        ownership: { label: 'Ownership', monthly: 'Yours after the final payment', upfront: 'Yours from day one' },
        branding: { label: 'Branding', monthly: 'BRUMA name on the machine', upfront: "Your salon's name and logo" },
        included: { label: 'Training, warranty, loaner', monthly: 'Included', upfront: 'Included' },
      },
      /** Shown only while flags.showUpfrontSaving is on; the upfront cell is the saving badge. */
      saving: { label: 'Saving', none: 'No saving' },
    },
    steps: {
      h2: 'How the monthly plan works',
      items: [
        'Sign the plan at your demo.',
        'First payment at signing.',
        'We deliver, install and train your team.',
        'After the final payment, the printer is yours.',
      ],
      /** Under step 2: the terms while flags.showPlanTerms is on, otherwise `termsAtDemo`. */
      terms: `${kwd(c.plan.depositKwd, 'en')} at signing, then ${c.plan.months} monthly payments of ${plan}.`,
      termsAtDemo: 'Full plan terms are explained at your demo.',
    },
    /** Shown only while flags.showPaymentMethods is on. */
    paymentsTitle: 'Ways to pay',
    running: {
      text: 'Ink refills are ordered separately and delivered to your salon.',
      /** Added while flags.showInkCostFaq is on. */
      ink: `Ink costs about ${kwd(c.calculator.cartridgeCostPerSet, 'en')} per set of 10 nails.`,
    },
    // TODO lawyer review: all four answers.
    faq: {
      h2: 'Questions about the plans',
      items: [
        { q: 'Can I pay off the plan early?', a: 'Yes. Pay the remaining amount at any time and the printer is yours.' },
        {
          q: 'Can I have my logo on a monthly-plan machine?',
          a: 'Logos are for printers paid upfront. Monthly-plan printers carry the BRUMA name.',
        },
        {
          q: 'What happens if payments stop?',
          a: "We collect the printer, and payments made count as rental. You can still buy it later by paying the remaining amount, but you can't restart the monthly plan.",
        },
        { q: 'Are there extra charges on the plan?', a: 'The plan total is fixed when you sign.' },
      ],
    },
  },

  // Hygiene between clients (the salon's job) and the printer's automatic print-head cleaning
  // (maintenance) stay strictly separate. Never describe the automatic cleaning as hygiene.
  hygienePage: {
    meta: {
      title: 'Hygiene and safety with the nail printer | BRUMA',
      description:
        'How to clean the parts that touch your client between clients, use gel safely and store ink and gels. Safety data sheets on request. Free demo in Kuwait.',
    },
    h1: 'Hygiene and safety',
    subline: 'What touches your client, how to clean it, and how to keep ink and gels in good condition.',
    // TODO confirm on the demo unit
    touches: {
      h2: 'What touches your client',
      text: 'Two parts touch your client: the finger rest, where the hand sits, and the nail holder, which keeps the finger steady while the nail prints. These are the parts you clean between clients.',
      photo: 'Photo: the finger rest and nail holder',
    },
    between: {
      h2: 'Between every client',
      steps: [
        'Remove the nail holder.',
        `Wipe the finger rest and holder with ${c.disinfectant.en}.`,
        'Let them dry fully.',
        'Refit and start the next client.',
      ],
      note: 'Your team learns this during training.',
    },
    printHead: {
      h2: 'The printer looks after its print head',
      text: 'It cleans its print head automatically, so the ink stays fresh and prints stay sharp.',
      separate: "This is maintenance for print quality. It doesn't replace cleaning between clients.",
      /** Shown while printerPowerGuidance is empty in config. */
      power: "We'll show you how to power it day to day when we install it.",
    },
    // TODO professional review
    gel: {
      h2: 'Using gel safely',
      intro: 'The printer works with gel products, so the usual gel care applies.',
      points: [
        'Keep uncured gel off the skin. If it touches the skin, wipe it off before curing.',
        'Cure every layer fully.',
        "Don't use gel products on a client who has reacted to gel nails before.",
        'If a client gets irritation, stop and advise them to see a doctor.',
      ],
    },
    storage: {
      h2: 'Storing ink and gels',
      text: 'Keep them in a cool, dry place, out of direct sun. Never leave them in a car.',
      /** Shown only when maxStorageTempC is set in config. */
      maxTemp: 'Store below {temp}°C.',
    },
    sds: {
      h2: 'Safety data sheets',
      text: 'Safety data sheets for the ink, print gel and gels are available on request.',
      button: 'Ask for the safety data sheets',
      message: 'Please send me the safety data sheets.',
    },
  },

  /** Wear-test results (printer and gallery pages). The strip shows only when flags.showWearTestResults is true. */
  wearTest: {
    ask: 'Ask to see our wear-test photos at your demo.',
    days: ['Day 1', 'Day 7', 'Day 14'],
    photo: 'Photo: wear test, {day}',
  },

  /** Shown only when flags.showUpfrontSaving is true. */
  upfrontSaving: {
    badge: `Save ${kwd(c.upfrontSavingKwd, 'en')}`,
    note: 'Compared with paying monthly for the full plan.',
  },

  faq: {
    h2: 'Questions salons ask',
    items: [
      {
        q: 'Do my technicians need design skills?',
        a: 'No. They choose a design on the screen and the printer does the detailed work. We train your team on site.',
      },
      {
        q: 'How long does a printed design last?',
        a: "Like any manicure, it depends on prep and top coat. We're running wear tests in Kuwait salons and show you day 1, 7 and 14 photos at your demo.",
        /** Used instead of `a` when flags.showWearTestResults is true. Fill in with the real results. */
        aWithResults: '',
      },
      {
        q: 'What if the machine breaks?',
        a: `It's covered by a ${c.warrantyMonths}-month warranty. If a repair takes longer than ${loanerHours}, we lend you a printer so you keep working.`,
      },
      {
        q: 'Is it hygienic and safe for clients?',
        a: 'Clean the parts that touch the client between every client, following our cleaning guide. Safety data sheets for the ink and gels are available. For clients with sensitive skin, do a patch test first.',
      },
      {
        q: "Can I put my salon's logo on the machine?",
        a: 'Yes, if you pay upfront. Monthly-plan machines carry the BRUMA name.',
      },
    ],
    /** Shown as a sixth question only when flags.showInkCostFaq is true. */
    inkItem: {
      q: 'What does the ink cost per set?',
      a: `About ${kwd(c.calculator.cartridgeCostPerSet, 'en')} per set of 10 nails. One cartridge prints about ${c.nailsPerCartridge} nails, and we deliver refills to your salon.`,
    },
  },

  demo: {
    h2: 'Book a free demo in your salon',
    subline: `We bring the printer to you. It takes about ${enCount(c.demoMinutes, 'minute', 'minutes')}, with no obligation.`,
    nameLabel: 'Your name',
    salonLabel: 'Salon name',
    areaLabel: 'Area',
    areaPlaceholder: 'Choose your area',
    whatsappLabel: 'WhatsApp number',
    whatsappHint: 'The 8 digits after +965',
    honeypotLabel: 'Leave this field empty',
    submit: 'Book my free demo',
    sending: 'Sending…',
    whatsappAlt: 'Or message us on WhatsApp',
    replyTime: `We reply on WhatsApp within ${replyHours}, ${c.replyDays.en}.`,
    privacy: 'We only use your details to arrange your demo.',
    errors: {
      nameRequired: 'Please enter your name.',
      salonRequired: "Please enter your salon's name.",
      areaRequired: 'Please choose your area.',
      whatsappRequired: 'Please enter your WhatsApp number.',
      whatsappInvalid: 'Please enter the 8 digits after +965.',
    },
    fallbackStatus: "We're opening WhatsApp with your details so you can send them to us.",
    fallbackMessage: "Hi BRUMA, I'd like to book a free demo. Name: {name}. Salon: {salon}. Area: {area}.",
  },

  /** Option values are stable English keys; labels are translated. */
  governorates: [
    { value: 'Capital', label: 'Capital' },
    { value: 'Hawalli', label: 'Hawalli' },
    { value: 'Farwaniya', label: 'Farwaniya' },
    { value: 'Ahmadi', label: 'Ahmadi' },
    { value: 'Jahra', label: 'Jahra' },
    { value: 'Mubarak Al-Kabeer', label: 'Mubarak Al-Kabeer' },
  ],

  footer: {
    tagline: 'The BRUMA nail printer for salons and clinics in Kuwait.',
    navLabel: 'Footer',
    sectionsHeading: 'Quick links',
    contactHeading: 'Contact',
    whatsapp: 'WhatsApp',
    phone: 'Phone',
    email: 'Email',
    warranty: 'Warranty terms',
    privacy: 'Privacy policy',
    copyright: `© ${new Date().getFullYear()} BRUMA`,
  },

  thankYou: {
    h1WithName: 'Thanks, {name}.',
    h1: 'Thank you.',
    body: `We'll message you on WhatsApp within ${replyHours} to arrange your demo.`,
    talkNow: 'Prefer to talk now?',
    whatsappButton: 'Message us on WhatsApp',
    whatsappMessage: "Hi BRUMA, I've just booked a free demo on your website.",
    backHome: 'Back to the homepage',
  },

  notFound: {
    line: "This page doesn't exist.",
    home: 'Go to the homepage',
  },
};

export type Dict = typeof en;
