import { PROFILE } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';

const HORIZONTAL_WORKFLOW = [
  {
    number: '01',
    title: 'Research',
    description:
      'Audience psychology, topic validation, search intent, and competitive packaging audits.',
  },
  {
    number: '02',
    title: 'Direction',
    description:
      'Hook architecture, narrative pacing blueprints, visual language, and prompt systems.',
  },
  {
    number: '03',
    title: 'Production',
    description:
      'Uniting hands-on scripting and editing with directed motion, voiceover, and AI media.',
  },
  {
    number: '04',
    title: 'Quality Control',
    description:
      'Source fact-checking, audio-visual sync inspection, and thumbnail clarity review.',
  },
  {
    number: '05',
    title: 'Optimization',
    description:
      'Platform SEO metadata, scheduled publishing, retention diagnostics, and iteration.',
  },
] as const;

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 border-b border-slate-200/80 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* 1. About & Creative Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              About &amp; Creative Philosophy
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#0F172A] leading-[1.08] text-balance">
              Systems Over Shortcuts.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-5 text-base sm:text-[17px] text-[#475569] leading-relaxed">
            {PROFILE.aboutSummary.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* 2. Sleek Horizontal 5-Step Production Workflow */}
        <div className="mt-20 pt-16 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                Production Architecture
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A]">
                Five-step workflow from signal to release.
              </h3>
            </div>
            <p className="text-sm text-[#475569]">
              Consistent creative quality engineered across every format
            </p>
          </div>

          <div className="relative">
            {/* Subtle Horizontal Connector Track on Desktop */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-11 left-[10%] right-[10%] h-[1.5px] bg-gradient-to-r from-[#2563EB]/25 via-[#2563EB]/45 to-[#C28E36]/35"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
              {HORIZONTAL_WORKFLOW.map((step, index) => (
                <TiltCard3D
                  key={step.number}
                  maxTilt={4.5}
                  liftZ={8}
                  className="relative h-full rounded-2xl bg-[#F8FAFC] border border-slate-200/90 studio-card-shadow p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span
                        className={`relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-xl font-mono-tabular text-xs font-semibold border bg-white shadow-xs ${
                          index === 3
                            ? 'border-[#C28E36]/40 text-[#9A6B1E]'
                            : 'border-[#2563EB]/25 text-[#2563EB]'
                        }`}
                      >
                        {step.number}
                      </span>
                      {index < HORIZONTAL_WORKFLOW.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="hidden lg:inline-block font-mono-tabular text-xs text-slate-300"
                        >
                          →
                        </span>
                      )}
                    </div>

                    <h4 className="font-display text-base font-semibold tracking-tight text-[#0F172A] mb-2">
                      {step.title}
                    </h4>

                    <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </TiltCard3D>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
