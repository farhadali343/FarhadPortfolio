import {
  Film,
  PenTool,
  PlaySquare,
  Share2,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import TiltCard3D from './TiltCard3D';

interface CapabilityItem {
  number: string;
  title: string;
  summary: string;
  deliverables: [string, string, string];
  Icon: typeof PlaySquare;
}

const CORE_CAPABILITIES: CapabilityItem[] = [
  {
    number: '01.',
    title: 'YouTube Channel Growth & Packaging',
    summary:
      'Channel architecture, curiosity-driven packaging, and retention diagnostics engineered for organic reach.',
    deliverables: [
      'Niche positioning & format architecture',
      'Thumbnail direction & high-CTR title framing',
      'YouTube SEO metadata & retention analysis',
    ],
    Icon: PlaySquare,
  },
  {
    number: '02.',
    title: 'Short-Form Video & Motion Systems',
    summary:
      'Repeatable vertical and widescreen video pipelines uniting tight hooks, motion graphics, and audio pacing.',
    deliverables: [
      'Reels, Shorts & TikTok batch production',
      'Hook scripting & retention pacing structure',
      'Remotion motion graphics & sound design QA',
    ],
    Icon: Film,
  },
  {
    number: '03.',
    title: 'AI-Directed Content Pipelines',
    summary:
      'Structured generative media, voice synthesis, and workflow utilities guided by strict creative direction.',
    deliverables: [
      'Prompt engineering & visual consistency QA',
      'AI voiceover timing & Whisper caption sync',
      'Browser workflow & utility prototyping',
    ],
    Icon: Sparkles,
  },
  {
    number: '04.',
    title: 'Social Media Strategy & Brand Ops',
    summary:
      'Cohesive multi-platform publishing calendars, editorial graphics, and audience growth across active feeds.',
    deliverables: [
      'Instagram, Threads & Facebook operations',
      'Content calendars & daily publishing cadence',
      'Carousel visual identity & social copywriting',
    ],
    Icon: Share2,
  },
  {
    number: '05.',
    title: 'E-Commerce & Affiliate Ecosystems',
    summary:
      'High-intent visual product discovery, creator merch storefronts, and structured affiliate merchandising.',
    deliverables: [
      'Shopify & Fourthwall storefront operations',
      'Pinterest discovery SEO & board taxonomy',
      'Amazon Associates & Benable curation',
    ],
    Icon: ShoppingBag,
  },
  {
    number: '06.',
    title: 'Editorial Research & SEO Writing',
    summary:
      'Long-form essays, search-intent product guides, and fact-checked narrative scripts built for clarity.',
    deliverables: [
      'Long-form Medium essays & topic research',
      'SEO comparison blogs & buyer guides',
      'Source verification & structural editing',
    ],
    Icon: PenTool,
  },
];

interface StackColumn {
  title: string;
  tools: string[];
}

const PRODUCTION_STACK: StackColumn[] = [
  {
    title: 'Video & Motion',
    tools: ['Remotion', 'FFmpeg', 'Python Video Workflows', 'HTML/JS Canvas'],
  },
  {
    title: 'AI & Automation',
    tools: [
      'Google AI Studio',
      'Nano Banana Pro',
      'Google Flow',
      'Whisper',
      'AI Voice & TTS',
    ],
  },
  {
    title: 'Publishing & Growth',
    tools: [
      'YouTube Studio',
      'Canva',
      'Pinterest',
      'Medium',
      'Instagram & Threads',
    ],
  },
  {
    title: 'Commerce & Web',
    tools: ['Shopify', 'Amazon Associates', 'Fourthwall', 'Benable', 'Blogger'],
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-16 sm:py-24 lg:py-32 border-b border-slate-200/80 bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Executive Capabilities Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Capabilities &amp; Stack
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance max-w-2xl">
              Six core capabilities built for consistent creative scale.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#475569] max-w-[50ch] leading-relaxed">
            End-to-end execution across narrative video, AI-directed production, social growth, and
            digital commerce.
          </p>
        </div>

        {/* 6 Core Capabilities — Clean 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {CORE_CAPABILITIES.map((cap) => {
            const Icon = cap.Icon;
            return (
              <TiltCard3D
                key={cap.number}
                maxTilt={4.5}
                liftZ={8}
                className="h-full rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-8 flex flex-col justify-between"
              >
                <article className="h-full flex flex-col">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-slate-200/90 flex items-center justify-center text-[#2563EB]">
                      <Icon className="w-5 h-5" strokeWidth={1.6} />
                    </div>
                    <span className="font-mono-tabular text-xs font-semibold text-[#475569]">
                      {cap.number}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold tracking-tight text-[#0F172A] leading-snug">
                    {cap.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#475569] leading-relaxed line-clamp-2">
                    {cap.summary}
                  </p>

                  <ul className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                    {cap.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#0F172A] leading-snug"
                      >
                        <span className="font-mono-tabular text-[#2563EB] mt-0.5">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard3D>
            );
          })}
        </div>

        {/* Minimalist Production Stack — 4-Column Pill Matrix */}
        <div className="mt-20 pt-16 border-t border-slate-200/80">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A]">
              Production Stack
            </h3>
            <p className="text-sm text-[#475569]">
              Core platforms powering video rendering, AI workflows, publishing, and commerce
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {PRODUCTION_STACK.map((column) => (
              <div
                key={column.title}
                className="rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-7 flex flex-col"
              >
                <h4 className="font-display text-sm font-semibold tracking-tight text-[#0F172A] pb-3.5 mb-4 border-b border-slate-100">
                  {column.title}
                </h4>

                <div className="flex flex-wrap gap-2">
                  {column.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center rounded-xl bg-[#F8FAFC] border border-slate-200/90 px-3 py-1.5 text-xs font-medium text-[#0F172A] hover:border-[#2563EB]/45 hover:text-[#2563EB] transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
