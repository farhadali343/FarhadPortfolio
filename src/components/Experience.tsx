interface VentureTimelineEntry {
  id: string;
  venture: string;
  role: string;
  timeframe: string;
  bullets: [string, string];
  platforms: string[];
}

const VENTURE_TIMELINE: VentureTimelineEntry[] = [
  {
    id: 'pov-narrative',
    venture: 'The POV Narrative',
    role: 'YouTube Channel Manager & Creator',
    timeframe: '2025 – 2026',
    bullets: [
      'Architected second-person POV storytelling, high-CTR packaging, and SEO metadata systems across the catalog.',
      'Shipped 120 published videos generating 118,142 channel views and ~68K views on the top release.',
    ],
    platforms: ['YouTube', 'YouTube Studio', 'Fourthwall'],
  },
  {
    id: 'farhad-muse-ai',
    venture: 'Farhad Muse AI',
    role: 'Digital Content Creator & Social Media Operator',
    timeframe: 'Active',
    bullets: [
      'Built daily multi-platform publishing calendars and visual carousels focused on AI workflows and freelancing systems.',
      'Produced and shipped short-form Reels batches, including 12 recent November releases across feeds.',
    ],
    platforms: ['Instagram', 'Threads', 'Facebook'],
  },
  {
    id: 'ford-invests-whatthebyte',
    venture: 'Ford Invests & WhatTheByte',
    role: 'AI Video Producer',
    timeframe: '2025 – 2026',
    bullets: [
      'Directed short-form finance explainers and modular quiz formats spanning logos, flags, landmarks, US states, and puzzles.',
      'Coordinated script pacing, Remotion and FFmpeg motion rendering, voice narration, and sound-effect timing.',
    ],
    platforms: ['YouTube Shorts', 'TikTok', 'Facebook Reels'],
  },
  {
    id: 'elecostudio-easy-finds',
    venture: 'EleCoStudio & Easy Finds',
    role: 'E-Commerce & Affiliate Marketing Operator',
    timeframe: 'Active',
    bullets: [
      'Operated EleCoStudio (Shopify) and companion merch storefronts, managing product presentation and buyer readiness.',
      'Scaled Easy Finds and Benable curation with 266 live Pinterest pins and structured Amazon Associates discovery.',
    ],
    platforms: ['Shopify', 'Fourthwall', 'Pinterest', 'Amazon Associates'],
  },
  {
    id: 'medium-editorial',
    venture: 'Medium Editorial',
    role: 'Digital Writer & Content Researcher',
    timeframe: '2026',
    bullets: [
      'Researched, drafted, edited, and published 80 long-form stories covering freelancing systems and digital workflows.',
      'Structured articles and What If Money finance guides for reader clarity, search intent, and factual accuracy.',
    ],
    platforms: ['Medium', 'Blogger', 'SEO Research'],
  },
  {
    id: 'ai-product-prototypes',
    venture: 'AI Product Prototypes',
    role: 'Product Concept & Creative Director',
    timeframe: 'In Development',
    bullets: [
      'Defined product specs, UX flows, and iterative interface feedback for Automation Editor and PakTransfer web utilities.',
      'Directed storyboarding, character continuity rules, and timed narration prototypes for What If Animation Studio.',
    ],
    platforms: ['Google AI Studio', 'Web Prototypes', 'Animation R&D'],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 lg:py-32 bg-[#F1F5F9]/60 text-[#0F172A] border-b border-slate-200/80"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Header Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Experience &amp; Ventures
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
              Self-directed brands, channels &amp; digital operations.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
              A track record of launching, operating, and scaling independent media properties,
              storefronts, and AI-assisted prototypes.
            </p>
          </div>

          {/* Right Minimalist Vertical Architectural Timeline */}
          <div className="lg:col-span-8">
            <div className="relative pl-6 sm:pl-9 border-l border-slate-300/80 space-y-12">
              {VENTURE_TIMELINE.map((entry, idx) => (
                <article key={entry.id} className="relative group">
                  {/* Architectural Timeline Marker */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[30px] sm:-left-[42px] top-1.5 w-3 h-3 rounded-full border-2 border-[#F8FAFC] transition-colors ${
                      idx === 0
                        ? 'bg-[#2563EB] ring-4 ring-[#2563EB]/15'
                        : 'bg-[#0F172A] group-hover:bg-[#2563EB]'
                    }`}
                  />

                  {/* Venture & Timeframe Row */}
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div className="flex flex-wrap items-baseline gap-2.5">
                      <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A]">
                        {entry.venture}
                      </h3>
                      <span className="text-xs sm:text-sm font-medium text-[#2563EB]">
                        {entry.role}
                      </span>
                    </div>

                    <span className="font-mono-tabular text-xs font-medium text-[#475569]">
                      {entry.timeframe}
                    </span>
                  </div>

                  {/* 2 Concise Impact Bullets */}
                  <ul className="mt-4 space-y-2.5 text-sm sm:text-[15px] text-[#475569] leading-relaxed max-w-[66ch]">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="font-mono-tabular text-[#2563EB] mt-0.5">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Clean Platform Tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {entry.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="inline-flex items-center rounded-lg bg-white border border-slate-200/90 px-2.5 py-1 text-[11px] font-medium text-[#475569]"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
