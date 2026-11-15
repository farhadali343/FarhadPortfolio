import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Layers,
  PlaySquare,
  ShoppingBag,
  Sparkles,
  Target,
} from 'lucide-react';
import { CONTACT_CONFIG, PROFILE } from '../data/portfolioData';
import { NavigateFn } from '../types/navigation';
import TiltCard3D from './TiltCard3D';

/* ============================================================================
   SECTION 6 (Home): Creative Philosophy Teaser -> bridges to /about
   ============================================================================ */
export function HomePhilosophySection({ onNavigate }: { onNavigate: NavigateFn }) {
  const pillars = [
    {
      title: 'Audience Psychology First',
      detail:
        'Every video and article begins with retention mechanics, curiosity gaps, and verifiable viewer intent.',
      Icon: Target,
    },
    {
      title: 'Packaging & Craft Precision',
      detail:
        'Thumbnails, headlines, pacing, and sound cues are engineered together before publishing.',
      Icon: Layers,
    },
    {
      title: 'Repeatable Production Systems',
      detail:
        'Disciplined creative workflows uniting editorial rigor with modern automation tools.',
      Icon: Sparkles,
    },
  ];

  return (
    <section className="py-24 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Creative Philosophy
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#0F172A] leading-[1.08] text-balance">
              Systems Over Shortcuts.
            </h2>
            <p className="mt-5 text-base text-[#475569] leading-relaxed">
              {PROFILE.aboutSummary[0]}
            </p>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0F172A] hover:bg-[#2563EB] rounded-full shadow-[0_14px_28px_-12px_rgba(15,23,42,0.4)] hover:-translate-y-0.5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <span>Read Full Story &amp; About</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {pillars.map((pillar) => {
              const Icon = pillar.Icon;
              return (
                <TiltCard3D
                  key={pillar.title}
                  maxTilt={4.5}
                  liftZ={8}
                  className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 studio-card-shadow p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-[#2563EB] mb-5">
                      <Icon className="w-5 h-5" strokeWidth={1.7} />
                    </div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-[#0F172A] leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#475569] leading-relaxed">
                      {pillar.detail}
                    </p>
                  </div>
                </TiltCard3D>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 7 (Home): 5-Step Production Workflow Architecture
   ============================================================================ */
export function HomeWorkflowSection() {
  const steps = [
    {
      number: '01',
      title: 'Research',
      description: 'Audience psychology, search demand, and competitive packaging audits.',
    },
    {
      number: '02',
      title: 'Direction',
      description: 'Hook architecture, visual pacing blueprints, and prompt framing.',
    },
    {
      number: '03',
      title: 'Production',
      description: 'Scripting, voiceover pacing, motion rendering, and visual assembly.',
    },
    {
      number: '04',
      title: 'Quality Control',
      description: 'Fact verification, audio-visual sync inspection, and thumbnail clarity.',
    },
    {
      number: '05',
      title: 'Optimization',
      description: 'SEO metadata, publishing cadence, and retention diagnostics.',
    },
  ];

  return (
    <section className="py-24 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
              Production Architecture
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A]">
              Five-step workflow from signal to release.
            </h2>
          </div>
          <p className="text-sm text-[#475569]">
            Repeatable quality control across video, editorial, and commerce
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-11 left-[10%] right-[10%] h-[1.5px] bg-gradient-to-r from-[#2563EB]/25 via-[#2563EB]/45 to-[#C28E36]/35"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
            {steps.map((step, index) => (
              <TiltCard3D
                key={step.number}
                maxTilt={4.5}
                liftZ={8}
                className="relative h-full rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span
                      className={`relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-xl font-mono-tabular text-xs font-semibold border bg-[#F8FAFC] shadow-xs ${
                        index === 3
                          ? 'border-[#C28E36]/40 text-[#9A6B1E]'
                          : 'border-[#2563EB]/25 text-[#2563EB]'
                      }`}
                    >
                      {step.number}
                    </span>
                    {index < steps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="hidden lg:inline-block font-mono-tabular text-xs text-slate-300"
                      >
                        →
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-[#0F172A] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 9 (Home): Flagship YouTube & Video Channels Spotlight
   ============================================================================ */
export function HomeChannelSpotlightSection() {
  const channels = [
    {
      name: 'The POV Narrative',
      handle: '@ThePOVNarrative',
      platform: 'YouTube Documentary',
      metric: '118,142 Views · 120 Videos',
      description:
        'Second-person investigative and military hierarchy narratives backed by custom packaging and Fourthwall merch.',
      href: 'https://www.youtube.com/@ThePOVNarrative',
    },
    {
      name: 'Ford Invests',
      handle: '@fordinvestsUS',
      platform: 'YouTube Finance',
      metric: 'Motion Explainers',
      description:
        'Crisp personal-finance explainers uniting clean visual data charts, timed voice pacing, and retention-first scripting.',
      href: 'https://www.youtube.com/@fordinvestsUS',
    },
    {
      name: 'WhatTheByte',
      handle: '@whatthebyte',
      platform: 'TikTok & Shorts',
      metric: '5+ Quiz Formats',
      description:
        'High-completion cross-platform visual quizzes spanning logos, flags, landmarks, US states, and rebus puzzles.',
      href: 'https://www.tiktok.com/@whatthebyte',
    },
  ];

  return (
    <section className="py-24 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Flagship Media Properties
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance max-w-2xl">
              Live channels engineered for watch time and retention.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#475569] max-w-[44ch] leading-relaxed">
            Built across long-form narrative YouTube and high-tempo vertical video networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <TiltCard3D
              key={channel.handle}
              maxTilt={4.5}
              liftZ={8}
              className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 studio-card-shadow p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-[#2563EB]">
                    <PlaySquare className="w-5 h-5" strokeWidth={1.7} />
                  </div>
                  <span className="font-mono-tabular text-xs font-semibold text-[#0F172A]">
                    {channel.metric}
                  </span>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#2563EB]">
                  {channel.platform}
                </div>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-[#0F172A]">
                  {channel.name}
                </h3>
                <p className="mt-3 text-sm text-[#475569] leading-relaxed">
                  {channel.description}
                </p>
              </div>

              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 pt-5 border-t border-slate-200/80 inline-flex items-center justify-between text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
              >
                <span>{channel.handle}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 10 (Home): E-Commerce, Merch & Affiliate Ecosystems
   ============================================================================ */
export function HomeCommerceSection() {
  const storefronts = [
    {
      eyebrow: 'Shopify Storefront',
      title: 'EleCoStudio',
      metric: 'elecostudio.shop',
      description:
        'Live Shopify storefront built for clean product merchandising, structured buyer messaging, and cash-on-delivery readiness.',
      href: 'http://elecostudio.shop/',
      cta: 'Visit Storefront',
    },
    {
      eyebrow: 'Creator Merch',
      title: 'The POV Narrative Shop',
      metric: 'Fourthwall Storefront',
      description:
        'Official print-on-demand apparel and collectible merchandise storefront extending The POV Narrative channel brand.',
      href: 'https://thepovnarrative-shop.fourthwall.com/',
      cta: 'Explore Merch',
    },
    {
      eyebrow: 'Visual Discovery & Affiliate',
      title: 'Easy Finds & Benable',
      metric: '266 Live Pins · Amazon Associates',
      description:
        'Evergreen Pinterest SEO discovery boards and curated buyer lists converting high-intent search into vetted product clicks.',
      href: 'https://www.pinterest.com/easyfinds_us/',
      cta: 'Browse Discovery Boards',
    },
  ];

  return (
    <section className="py-24 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Digital Commerce &amp; Discovery
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance max-w-2xl">
              Turning content audiences into storefronts and discovery traffic.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#475569] max-w-[44ch] leading-relaxed">
            End-to-end storefront merchandising, print-on-demand integration, and affiliate product
            ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {storefronts.map((store) => (
            <TiltCard3D
              key={store.title}
              maxTilt={4.5}
              liftZ={8}
              className="rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-slate-200/90 flex items-center justify-center text-[#C28E36]">
                    <ShoppingBag className="w-5 h-5" strokeWidth={1.7} />
                  </div>
                  <span className="font-mono-tabular text-xs font-medium text-[#475569]">
                    {store.metric}
                  </span>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#2563EB]">
                  {store.eyebrow}
                </div>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-[#0F172A]">
                  {store.title}
                </h3>
                <p className="mt-3 text-sm text-[#475569] leading-relaxed">
                  {store.description}
                </p>
              </div>

              <a
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 pt-5 border-t border-slate-100 inline-flex items-center justify-between text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
              >
                <span>{store.cta}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 11 (Home): Editorial Publishing & Research Depth
   ============================================================================ */
export function HomeEditorialSection() {
  const topics = [
    {
      num: '80+',
      label: 'Long-Form Medium Essays',
      detail:
        'Structured essays covering freelancing systems, productivity architecture, and modern creator operations.',
    },
    {
      num: 'SEO',
      label: 'What If Money Guides',
      detail:
        'Comparison frameworks and personal-finance articles structured around clear buyer intent and verified claims.',
    },
    {
      num: '120+',
      label: 'Narrative Video Scripts',
      detail:
        'Hook-engineered second-person scripts and educational breakdowns edited for spoken cadence and viewer tension.',
    },
  ];

  return (
    <section className="py-24 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="w-11 h-11 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 flex items-center justify-center text-[#2563EB] mb-5">
              <BookOpen className="w-5 h-5" strokeWidth={1.7} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Editorial &amp; Research
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance leading-[1.1]">
              Research-led storytelling across articles, scripts, and buyer guides.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
              Every visual production and affiliate publication starts with clean written
              architecture—fact-checked briefs, scannable formatting, and compelling hooks.
            </p>
            <a
              href="https://farhadaliofficial.medium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] hover:underline"
            >
              <span>Read Medium Publication (farhadaliofficial.medium.com)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {topics.map((item) => (
              <TiltCard3D
                key={item.label}
                maxTilt={4.5}
                liftZ={8}
                className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 studio-card-shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="font-display text-3xl font-semibold tracking-tight text-[#2563EB]">
                    {item.num}
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-[#0F172A]">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 13 (Home): Dedicated Resume Page Preview CTA -> /resume
   ============================================================================ */
export function HomeResumeCtaSection({
  onNavigate,
  onDownloadResume,
  isGeneratingPdf,
}: {
  onNavigate: NavigateFn;
  onDownloadResume: () => void;
  isGeneratingPdf: boolean;
}) {
  return (
    <section className="py-24 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F8FAFC] border border-slate-200/90 studio-card-shadow p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Curriculum Vitae
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
              Inspect the interactive A4 Resume or export an ATS-ready PDF.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed max-w-[54ch]">
              View the full formatted Curriculum Vitae on its dedicated Resume page—complete with
              verified venture outcomes, platform ecosystems, core competencies, and one-click PDF
              download.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('resume')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0F172A] hover:bg-[#2563EB] rounded-full shadow-[0_14px_28px_-12px_rgba(15,23,42,0.4)] hover:-translate-y-0.5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <span>Open Full Resume Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onDownloadResume}
                disabled={isGeneratingPdf}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0F172A] bg-white border border-slate-200 hover:border-[#2563EB] rounded-full studio-card-shadow hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <Download className="w-4 h-4 text-[#2563EB]" />
                <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download ATS PDF'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 perspective-1200">
            <TiltCard3D
              maxTilt={5}
              liftZ={10}
              className="rounded-2xl bg-white border border-slate-200/95 shadow-[0_24px_48px_-16px_rgba(15,23,42,0.16)] p-6"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
                  <FileText className="w-4 h-4 text-[#2563EB]" />
                  <span>Farhad-Ali-Resume.pdf</span>
                </div>
                <span className="font-mono-tabular text-[11px] font-medium text-[#2563EB]">
                  A4 Portrait
                </span>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-bold text-[#0F172A]">{PROFILE.name}</div>
                <div className="text-xs font-medium text-[#475569]">
                  {PROFILE.primaryPositioning}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="rounded-lg bg-[#F8FAFC] border border-slate-200/70 p-2.5">
                    <div className="font-mono-tabular text-sm font-bold text-[#0F172A]">118K+</div>
                    <div className="text-[10px] text-[#475569]">YT Views</div>
                  </div>
                  <div className="rounded-lg bg-[#F8FAFC] border border-slate-200/70 p-2.5">
                    <div className="font-mono-tabular text-sm font-bold text-[#0F172A]">120+</div>
                    <div className="text-[10px] text-[#475569]">Videos</div>
                  </div>
                  <div className="rounded-lg bg-[#F8FAFC] border border-slate-200/70 p-2.5">
                    <div className="font-mono-tabular text-sm font-bold text-[#0F172A]">80+</div>
                    <div className="text-[10px] text-[#475569]">Articles</div>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 14 (Home): Collaboration & Workflow FAQ Accordion
   ============================================================================ */
const HOME_FAQS = [
  {
    q: 'What types of projects and retainers do you take on?',
    a: 'YouTube channel strategy and packaging, high-retention short-form video systems (Shorts, Reels, TikTok), social media calendar operations, Shopify/Fourthwall storefront setup, and SEO editorial writing.',
  },
  {
    q: 'How do you manage video pacing, hooks, and quality assurance?',
    a: 'Every release follows a five-step pipeline: audience research, first-3-second hook direction, structured voice and motion assembly, audio-visual sync and factual QA, followed by SEO metadata and retention optimization.',
  },
  {
    q: 'Can you scale faceless or brand channels from zero?',
    a: 'Yes. Properties like The POV Narrative (120 videos, 118K+ organic views), Ford Invests, and WhatTheByte were architected from niche positioning and visual templates up through consistent publishing cadence.',
  },
  {
    q: 'How do remote international collaborations work?',
    a: 'I collaborate asynchronously and live with global creators, agencies, and digital brands from Pakistan—delivering organized briefs, timelines, and publishing-ready creative deliverables.',
  },
] as const;

export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-24 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Common Questions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
              Clarity before we start building.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
              Direct answers on production workflows, channel scaling, and remote partnerships.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {HOME_FAQS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl bg-white border border-slate-200/90 studio-card-shadow overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full px-6 sm:px-7 py-5 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB]"
                  >
                    <span className="font-display text-base sm:text-lg font-semibold text-[#0F172A]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#475569] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#2563EB]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-6 text-sm text-[#475569] leading-relaxed border-t border-slate-100 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 15 (Home): Final Launch CTA Band -> bridges to /contact
   ============================================================================ */
export function HomeLaunchCtaSection({ onNavigate }: { onNavigate: NavigateFn }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_CONFIG.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="py-24 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0F172A] text-white p-8 sm:p-14 lg:p-16 shadow-[0_32px_64px_-20px_rgba(15,23,42,0.38)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#2563EB]/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#C28E36]/20 blur-3xl"
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-300 mb-4">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                <span>Available for Select Global Projects • PK / Remote</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight leading-[1.08] text-balance">
                {CONTACT_CONFIG.headline}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[52ch]">
                {CONTACT_CONFIG.supportingText}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-[#0F172A] bg-white hover:bg-[#2563EB] hover:text-white rounded-full shadow-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied {CONTACT_CONFIG.email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-300" />
                    <span>{CONTACT_CONFIG.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
