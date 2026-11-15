import { PageRoute } from '../types/navigation';

export interface PolicySectionBlock {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface PolicyDocument {
  route: Extract<
    PageRoute,
    | 'privacy-policy'
    | 'terms-of-service'
    | 'cookie-policy'
    | 'affiliate-disclosure'
    | 'content-policy'
  >;
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: PolicySectionBlock[];
}

export const POLICY_DOCUMENTS: PolicyDocument[] = [
  {
    route: 'privacy-policy',
    eyebrow: 'Legal & Compliance',
    title: 'Privacy Policy',
    subtitle:
      'How information is handled when you explore this portfolio, submit a project inquiry, or follow links to verified channels and storefronts.',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: '1. Information You Voluntarily Provide',
        paragraphs: [
          'This portfolio website does not require user registration, accounts, or hidden background profiling. Personal information is only processed when you actively choose to reach out via the Contact page inquiry form or send an email to farhad0official@gmail.com.',
          'When you submit a project inquiry, your name, email address, selected project type, and project details are used solely to respond to your collaboration or freelance request.',
        ],
        bullets: [
          'Contact form fields: Name, Email Address, Project Category, and Project Scope message.',
          'Client email correspondence is never sold, rented, or distributed to third-party marketing brokers.',
        ],
      },
      {
        heading: '2. Automatic Technical Data & Browser Rendering',
        paragraphs: [
          'Standard hosting infrastructure may log ephemeral technical metadata such as browser user-agent, viewport requests, and basic error diagnostics to serve pages reliably and prevent abuse.',
          'Interactive features on this site—including the 3D Studio camera presets, portfolio category filters, and ATS PDF resume generation—execute locally inside your browser without uploading personal documents to external servers.',
        ],
      },
      {
        heading: '3. External Platforms, Channels & Storefronts',
        paragraphs: [
          'Links throughout this portfolio connect to independently operated third-party platforms where Farhad Ali publishes media or operates storefronts, including YouTube, TikTok, Instagram, Threads, Facebook, Pinterest, Benable, Medium, Shopify (elecostudio.shop), and Fourthwall.',
          'Once you leave this site, your interactions are governed by the privacy policy and data practices of those respective platforms.',
        ],
      },
      {
        heading: '4. Data Retention & Your Rights',
        paragraphs: [
          'Email inquiries and project correspondence are retained only as long as necessary to coordinate potential collaborations, maintain business records, or comply with applicable obligations.',
          'You may request access, correction, or deletion of any inquiry correspondence you have sent by contacting farhad0official@gmail.com directly.',
        ],
      },
    ],
  },
  {
    route: 'terms-of-service',
    eyebrow: 'Legal & Compliance',
    title: 'Terms of Service',
    subtitle:
      'Guidelines governing use of this portfolio showcase, case studies, downloadable resume assets, and collaboration inquiries.',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: '1. Portfolio Scope & Informational Purpose',
        paragraphs: [
          'This website serves as the professional portfolio, creative studio overview, and curriculum vitae for Farhad Ali. Metrics, channel snapshots, and project case studies reflect verified production milestones at the time of documentation.',
          'Viewing this portfolio or downloading the ATS Resume PDF does not establish a binding agency retainer, employment relationship, or exclusive service commitment until formalized in a separate written agreement.',
        ],
      },
      {
        heading: '2. Intellectual Property & Case Study Materials',
        paragraphs: [
          'All original copywriting, UI layouts, 3D scene configurations, brand narratives, and downloadable resume templates displayed on this website remain the intellectual property of Farhad Ali unless otherwise attributed to external platforms or partner marks.',
          'Recruiters, hiring managers, and prospective clients are welcome to download and share the ATS Resume PDF internally for evaluation and hiring purposes.',
        ],
        bullets: [
          'Permitted: Downloading the CV for recruitment evaluation and bookmarking case studies for client reference.',
          'Prohibited: Republishing the full site code, scraping case studies as your own work, or misrepresenting affiliation.',
        ],
      },
      {
        heading: '3. Independent Storefronts & Commerce Transactions',
        paragraphs: [
          'Product purchases, shipping, refunds, and order fulfillment made through external storefronts—including EleCoStudio (Shopify) and The POV Narrative Shop (Fourthwall)—are governed exclusively by the checkout terms, shipping policies, and customer protections displayed on those respective storefront domains.',
        ],
      },
      {
        heading: '4. Limitation of Liability',
        paragraphs: [
          'This portfolio is provided on an "as-is" and "as-available" basis. While care is taken to keep links, project details, and contact workflows accurate and up to date, Farhad Ali is not liable for temporary downtime or changes in third-party external platform availability.',
        ],
      },
    ],
  },
  {
    route: 'cookie-policy',
    eyebrow: 'Legal & Compliance',
    title: 'Cookie Policy',
    subtitle:
      'Clear explanation of browser storage usage on this website and how external social or commerce platforms handle cookies.',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: '1. Minimal First-Party Storage Approach',
        paragraphs: [
          'This portfolio is engineered with a privacy-first architecture. It does not deploy invasive advertising pixels, behavioral cross-site trackers, or intrusive cookie popups for third-party ad networks.',
          'All core site navigation, filter tabs, 3D Studio controls, and case study drawers run smoothly using transient in-memory browser state.',
        ],
      },
      {
        heading: '2. Functional & Hosting Session Essentials',
        paragraphs: [
          'Essential technical session tokens may be used strictly by the web hosting or browser runtime layer to deliver static assets quickly, preserve responsive layout state, and protect against automated abuse.',
        ],
        bullets: [
          'No third-party retargeting pixels are embedded on portfolio pages.',
          'No personal behavioral profiles are built or shared with ad exchanges.',
        ],
      },
      {
        heading: '3. Third-Party Platform Cookies',
        paragraphs: [
          'When you click outbound links to external platforms such as YouTube, TikTok, Instagram, Pinterest, Amazon, Shopify, or Fourthwall, those websites may set their own analytics, login, or affiliate attribution cookies according to their own cookie policies.',
        ],
      },
      {
        heading: '4. Managing Your Browser Preferences',
        paragraphs: [
          'You can inspect, restrict, or clear cookies and site storage at any time inside your browser privacy settings (Chrome, Safari, Firefox, Edge) without losing access to reading this portfolio or downloading the CV.',
        ],
      },
    ],
  },
  {
    route: 'affiliate-disclosure',
    eyebrow: 'Transparency & FTC Compliance',
    title: 'Affiliate & Sponsorship Disclosure',
    subtitle:
      'Transparent disclosure regarding affiliate partnerships across Easy Finds, Benable, Pinterest, and editorial comparison guides.',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: '1. Affiliate Relationships Across Curated Platforms',
        paragraphs: [
          'Farhad Ali operates product discovery and editorial comparison properties including Easy Finds (Pinterest @easyfinds_us), curated recommendation hubs on Benable, and editorial buying guides on What If Money.',
          'Certain outbound product links featured on those connected properties—or referenced within case studies—are affiliate links. If a visitor clicks an affiliate link and completes a qualifying purchase, a small referral commission may be earned at zero extra cost to the buyer.',
        ],
      },
      {
        heading: '2. Amazon Associates Disclosure',
        paragraphs: [
          'Easy Finds and affiliated product curation boards participate in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for publishers to earn referral fees by linking to Amazon.com and affiliated marketplace properties.',
        ],
      },
      {
        heading: '3. Independent Curation & Editorial Integrity',
        paragraphs: [
          'Commissions never dictate product inclusion. Recommendations are vetted around practical usefulness, buyer clarity, review consistency, and category fit before pins, comparison guides, or curated buyer lists are published.',
        ],
        bullets: [
          'Zero extra markup: Affiliate links never increase the price paid by any customer.',
          'Clear separation: Sponsored brand collaborations, when accepted, are explicitly labeled.',
        ],
      },
    ],
  },
  {
    route: 'content-policy',
    eyebrow: 'Creator & IP Governance',
    title: 'Content & DMCA Policy',
    subtitle:
      'Standards covering original video production, editorial accuracy, AI-assisted creative direction, and copyright inquiries.',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: '1. Original Production & Creative Direction Standards',
        paragraphs: [
          'Every video series, editorial essay, and storefront experience showcased in this portfolio—across The POV Narrative, Ford Invests, WhatTheByte, Farhad Muse, and Medium—is produced under structured human creative direction, fact verification, and audio-visual quality assurance.',
          'Where generative media, voiceover synthesis, or coding utilities support production, all scripting, narrative framing, visual selection, and final editorial approval remain human-directed.',
        ],
      },
      {
        heading: '2. Brand Marks & Third-Party Trademarks',
        paragraphs: [
          'Platform logos displayed in the Platforms & Marketplaces showcase (such as YouTube, Facebook, Instagram, TikTok, eBay, Shopify, Amazon, and Pinterest) are trademarks of their respective owners and are shown solely to accurately identify ecosystems where Farhad Ali has built, managed, or operated channels and storefronts.',
        ],
      },
      {
        heading: '3. Copyright & DMCA Takedown Procedure',
        paragraphs: [
          'We respect the intellectual property rights of creators, publishers, and brands. If you believe any visual asset, description, or reference featured on this portfolio requires attribution updates or removal under copyright law, please email farhad0official@gmail.com with the following details:',
        ],
        bullets: [
          'Identification of the copyrighted work claimed to have been infringed.',
          'Exact URL or section on this portfolio where the material appears.',
          'Your contact details and a good-faith statement of ownership or authorization.',
        ],
      },
    ],
  },
];
