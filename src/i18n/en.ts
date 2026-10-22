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
      description: "Thanks for booking a free BRUMA demo. We’ll message you on WhatsApp to arrange it.",
    },
    notFound: {
      title: 'Page not found | BRUMA',
      description: "This page doesn’t exist.",
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
    floatMessage: "Hi BRUMA, I’d like to know more about the nail printer.",
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
    sampleLabel: 'Sample designs',
    credit: 'Design by {technician}, {area}',
    note: "Choose from the printer’s built-in design library.",
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
    // The homepage bento section.
    eyebrow: "What’s included",
    h2: 'Everything handled, from day one',
    intro: 'You get the printer, the training and the backup. Our team in Kuwait handles the rest.',
    ticks: ['Delivered and set up', 'Team trained on site', 'Covered if anything goes wrong'],
    cta: 'Book a free demo',
    whatsapp: 'Ask on WhatsApp',
    whatsappMessage: "Hi BRUMA, I’d like to know more about what’s included with the nail printer.",
    warranty: {
      unit: (n: number): string => (n === 1 ? 'month' : 'months'),
      title: 'Warranty',
      text: 'Parts and labour covered. Repairs handled in Kuwait.',
    },
    loaner: {
      unit: (n: number): string => (n === 1 ? 'hour' : 'hours'),
      title: 'Loaner printer',
      text: 'Repair taking longer? We lend you one, so you never lose bookings.',
    },
    delivery: { title: 'Delivery and installation', text: 'We bring it, set it up and print your first test nail with you.' },
    technicians: { title: 'Technicians trained', text: 'Prep, printing, cleaning and simple fixes, in your salon.' },
    library: { title: 'Design library', text: 'Ready-made designs built in.', link: 'See sample designs' },
    refills: { title: 'Ink refills', text: 'After that, refills are ordered separately and delivered to your salon.', pill: 'First cartridge free at installation' },
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
      bullets: ['Yours from day one', "Your salon’s name and logo on the machine", 'Training, warranty and loaner included'],
      small: '',
    },
    cta: 'Book a free demo',
    compareLink: 'Compare the plans',
  },

  stories: {
    h2: 'Salons using BRUMA',
  },

  /** NailIllustration: the label under every nail illustration and the design names. */
  nail: {
    label: 'Illustration',
    alt: 'Illustration of a nail: {design}',
    designs: {
      french: 'French tip',
      cherries: 'Cherries',
      dots: 'Polka dots',
      flowers: 'Small white flowers',
      star: 'Black star',
      heart: 'Gold heart outline',
    },
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
    /** The in-page nav under the hero. */
    sectionNav: { label: 'On this page', overview: 'Overview', how: 'How it works', specs: 'Specs', support: 'Support', faq: 'FAQ' },
    /** The hero's "Try it" demo (an illustration; the status line gives the real print time). */
    demo: {
      eyebrow: 'Try it',
      title: 'Pick a design. Watch it print.',
      pickerLabel: 'Choose a design',
      print: 'Print this nail',
      status: `About ${seconds} a nail on the real printer.`,
      printing: 'Printing…',
      done: 'Printed. Seal with top coat and cure.',
    },
    why: {
      h2: 'Why salons add it',
      cards: [
        { icon: 'sparkle', title: 'A new service on every set', text: 'Offer detailed nail art without hiring a specialist.' },
        { icon: 'check', title: 'The same result every time', text: "The design doesn’t depend on who’s on shift." },
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
          text: "Your client picks a design on the touchscreen, from the printer’s built-in design library. It’s easy to browse together at the nail desk.",
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
      text: "The design is printed directly onto the prepared nail, then sealed under top coat and cured. It’s not a sticker, a wrap or a press-on.",
      photo: 'Photo: finished nail, close-up',
      /** The layer diagram (an illustration). */
      layers: { nail: 'Natural nail', base: 'Base coat', print: 'Printed design', film: 'Sticker film', top: 'Top coat, cured' },
      compareLabel: 'Compare with a sticker',
      printed: 'Printed',
      sticker: 'Sticker',
      printedNote: 'Printed: the design lies flat between the base coat and the top coat.',
      stickerNote: 'Sticker: a separate film laid on top, with an edge that can lift.',
    },
    specs: {
      h2: 'Specifications',
      fitTitle: 'Will it fit?',
      drawingAlt: `Line drawing of a box about ${c.printerSizeCm.width} cm wide, ${c.printerSizeCm.depth} cm deep and ${c.printerSizeCm.height} cm high, on a desk edge.`,
      drawingCaption: 'Illustration: overall size only, not the printer’s shape.',
      cm: 'cm',
      caption: 'BRUMA nail printer specifications',
      note: 'Fits on a standard nail desk. Check your space at the demo.',
      boxTitle: "What’s in the box",
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
    /** "Your first week with BRUMA": a sequence, not days (no dates or durations). */
    training: {
      h2: 'Your first week with BRUMA',
      steps: [
        { title: 'Delivery', text: 'We bring the printer to your salon.' },
        { title: 'Installation', text: 'We set it up and print a first test nail with you.' },
        { title: 'Training', text: `${enCount(c.techniciansTrained, 'technician', 'technicians')} trained on site.` },
        { title: 'Ongoing support', text: '' },
      ],
      topicsLabel: 'What the training covers',
      topics: ['Using the printer', 'Prepping nails', 'Cleaning between clients', 'Simple fixes'],
      supportLabel: 'What support includes',
      support: ['WhatsApp help', 'On-site visits when needed', `${c.warrantyMonths}-month warranty`, `A loaner printer if a repair takes longer than ${loanerHours}`],
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
    categories: { all: 'All', gulf: 'Gulf', bridal: 'Bridal', minimal: 'Minimal', seasonal: 'Seasonal', playful: 'Playful' },
    placeholders: {
      gulf: 'Photo: Gulf nail design',
      bridal: 'Photo: bridal nail design',
      minimal: 'Photo: minimal nail design',
      seasonal: 'Photo: seasonal nail design',
      playful: 'Photo: playful nail design',
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
        branding: { label: 'Branding', monthly: 'BRUMA name on the machine', upfront: "Your salon’s name and logo" },
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
          a: "We collect the printer, and payments made count as rental. You can still buy it later by paying the remaining amount, but you can’t restart the monthly plan.",
        },
        { q: 'Are there extra charges on the plan?', a: 'The plan total is fixed when you sign.' },
      ],
    },
  },

  // Hygiene between clients (the salon’s job) and the printer’s automatic print-head cleaning
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
      separate: "This is maintenance for print quality. It doesn’t replace cleaning between clients.",
      /** Shown while printerPowerGuidance is empty in config. */
      power: "We’ll show you how to power it day to day when we install it.",
    },
    // TODO professional review
    gel: {
      h2: 'Using gel safely',
      intro: 'The printer works with gel products, so the usual gel care applies.',
      points: [
        'Keep uncured gel off the skin. If it touches the skin, wipe it off before curing.',
        'Cure every layer fully.',
        "Don’t use gel products on a client who has reacted to gel nails before.",
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

  bookPage: {
    meta: {
      title: 'Book a free nail printer demo in Kuwait | BRUMA',
      description: `We bring the BRUMA nail printer to your salon for a free demo of about ${enCount(c.demoMinutes, 'minute', 'minutes')}, with no obligation. We visit all 6 governorates of Kuwait.`,
    },
    h1: 'Book a free demo in your salon',
    subline: `We bring the printer to you. About ${enCount(c.demoMinutes, 'minute', 'minutes')}, with no obligation.`,
    next: {
      h2: 'What happens next',
      steps: ['Send the form.', `We message you on WhatsApp within ${replyHours}.`, 'We visit with the printer.', 'You decide, with no obligation.'],
    },
    before: {
      h2: 'Before we arrive',
      items: ['A table near a power socket', 'One team member or client happy to try a printed nail'],
    },
    where: {
      h2: 'Where we go',
      text: "We visit salons and clinics in all 6 of Kuwait’s governorates.",
    },
    contact: {
      h2: 'Contact',
      /** Shown only when serviceHours is set in config. */
      hours: 'Service hours: {hours}',
    },
    faq: {
      h2: 'Questions about the demo',
      items: [
        { q: 'Is the demo free?', a: 'Yes. The demo is free.' },
        { q: 'Do I have to buy?', a: 'No. You decide after the demo, with no obligation.' },
        // TODO confirm
        { q: 'Can you come outside working hours?', a: "Ask us on WhatsApp and we’ll try to find a time that suits your salon." },
      ],
    },
  },

  /** The warranty and privacy pages. */
  legal: {
    /** {date} is the legalUpdated date from config. */
    updated: 'Last updated {date}',
  },

  /** The slim carbon band at the end of the warranty and privacy pages. */
  ctaBand: {
    text: 'Want to see the printer in your salon?',
    button: 'Book a free demo',
  },

  // TODO lawyer review: the whole warranty page.
  warrantyPage: {
    meta: {
      title: 'BRUMA nail printer warranty terms',
      description: `What the ${c.warrantyMonths}-month warranty on the BRUMA nail printer covers, what it doesn’t, the loaner printer during repairs and how to make a claim in Kuwait.`,
    },
    h1: 'Warranty terms',
    subline: 'The warranty on your BRUMA nail printer, in plain language.',
    length: {
      h2: 'How long it lasts',
      text: `${enCount(c.warrantyMonths, 'month', 'months')} from the day we install your printer.`,
    },
    covered: {
      h2: "What’s covered",
      text: "Faults in the printer’s parts and workmanship. Repairs under warranty include parts and labour.",
    },
    notCovered: {
      h2: "What’s not covered",
      items: [
        'Damage from drops, liquids or power surges',
        'Repairs or opening by anyone other than BRUMA',
        'Consumables: ink cartridges, gels and nail holders',
        'Normal wear',
      ],
    },
    loaner: {
      h2: 'Loaner printer',
      text: `If a repair takes longer than ${loanerHours}, we lend you a printer so your salon keeps working.`,
    },
    claim: {
      h2: 'How to make a claim',
      steps: ['WhatsApp us with the problem and a photo or short video.', "Then we’ll diagnose it remotely or visit your salon."],
      button: 'Make a claim on WhatsApp',
      message: "Hi BRUMA, I’d like to make a warranty claim.",
    },
    // TODO lawyer review: what happens to monthly-plan printers after the warranty period.
    monthly: {
      h2: 'Monthly-plan printers',
      text: 'The same warranty applies to printers on the monthly plan for the warranty period.',
    },
  },

  // TODO review: the whole privacy policy.
  privacyPage: {
    meta: {
      title: 'Privacy policy | BRUMA',
      description:
        'How BRUMA uses the details you send with the demo form: what we collect, why, who sees it, how long we keep it and how to ask us to delete it.',
    },
    h1: 'Privacy policy',
    subline: 'What we collect when you book a demo, and what we do with it.',
    collect: {
      h2: 'What we collect',
      items: [
        'From the demo form: your name, salon name, area and WhatsApp number',
        'Which link or QR code brought you to the site',
        'Cookieless, anonymous visit statistics',
      ],
    },
    why: { h2: 'Why', text: 'To arrange and follow up your demo. Nothing else.' },
    who: { h2: 'Who sees it', text: 'The BRUMA team only. We never sell or share your details.' },
    // TODO confirm: the retention period (dataRetentionMonths in config).
    keep: {
      h2: 'How long we keep it',
      text: `We keep your details for up to ${enCount(c.dataRetentionMonths, 'month', 'months')} after your last contact with us, then delete them.`,
    },
    choices: { h2: 'Your choices', text: 'Ask us to see or delete your details at any time, by WhatsApp or email.' },
    cookies: { h2: 'Cookies', text: 'The site sets no tracking cookies.' },
    contact: { h2: 'Contact' },
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
        a: "Like any manicure, it depends on prep and top coat. We’re running wear tests in Kuwait salons and show you day 1, 7 and 14 photos at your demo.",
        /** Used instead of `a` when flags.showWearTestResults is true. Fill in with the real results. */
        aWithResults: '',
      },
      {
        q: 'What if the machine breaks?',
        a: `It’s covered by a ${c.warrantyMonths}-month warranty. If a repair takes longer than ${loanerHours}, we lend you a printer so you keep working.`,
      },
      {
        q: 'Is it hygienic and safe for clients?',
        a: 'Clean the parts that touch the client between every client, following our cleaning guide. Safety data sheets for the ink and gels are available. For clients with sensitive skin, do a patch test first.',
      },
      {
        q: "Can I put my salon’s logo on the machine?",
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
      salonRequired: "Please enter your salon’s name.",
      areaRequired: 'Please choose your area.',
      whatsappRequired: 'Please enter your WhatsApp number.',
      whatsappInvalid: 'Please enter the 8 digits after +965.',
    },
    fallbackStatus: "We’re opening WhatsApp with your details so you can send them to us.",
    fallbackMessage: "Hi BRUMA, I’d like to book a free demo. Name: {name}. Salon: {salon}. Area: {area}.",
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
    body: `We’ll message you on WhatsApp within ${replyHours} to arrange your demo.`,
    talkNow: 'Prefer to talk now?',
    whatsappButton: 'Message us on WhatsApp',
    whatsappMessage: "Hi BRUMA, I’ve just booked a free demo on your website.",
    backHome: 'Back to the homepage',
  },

  notFound: {
    line: "This page doesn’t exist.",
    home: 'Go to the homepage',
  },
};

export type Dict = typeof en;
