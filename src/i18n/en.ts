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
      { icon: 'refill', title: 'Cartridge refills', text: 'Delivered to your salon.' },
    ],
  },

  hygiene: {
    h2: 'Clean between every client',
    points: [
      { icon: 'sparkle', text: 'Simple cleaning steps between clients, included in your training.' },
      { icon: 'document', text: 'Safety data sheets for the ink and gels, available on request.' },
      { icon: 'hand', text: 'Patch test advice for clients with sensitive skin.' },
    ],
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
      wearAsk: 'Ask to see our wear-test photos at your demo.',
      /** The wear-test strip, shown only when flags.showWearTestResults is true. */
      wearDays: ['Day 1', 'Day 7', 'Day 14'],
      wearPhoto: 'Photo: wear test, {day}',
    },
    specs: {
      h2: 'Specifications',
      caption: 'BRUMA nail printer specifications',
      note: 'Fits on a standard nail desk. Check your space at the demo.',
      labels: {
        printTime: 'Print time',
        curing: 'Curing',
        screen: 'Screen',
        size: 'Size',
        weight: 'Weight',
        power: 'Power',
        ink: 'Ink',
        inkYield: 'Ink yield',
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
