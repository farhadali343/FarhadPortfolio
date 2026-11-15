import { PROFILE } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';

const WORKFLOW_TAGS = ['Quality Control', 'Adaptability', 'Repeatability'];

export default function About() {
  return (
    <section id="about" className="py-16 lg:py-24 border-b border-slate-200/80 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Narrative & Core Scope */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              About &amp; Approach
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] text-balance mb-6">
              Systems-oriented digital creation from concept to release.
            </h2>

            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              {PROFILE.aboutSummary.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-3">
                Core Operational Scope
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 text-sm text-slate-600">
                {PROFILE.aboutDisciplines.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#2563EB] font-mono-tabular mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 5-Stage Production Workflow — Connected 3D Stepped Glass Cards */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A]">
                  Five-Stage Production Workflow
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Sequential pipeline engineered for consistent creative output
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {WORKFLOW_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#F8FAFC] border border-slate-200/90 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative space-y-3.5">
              {/* Vertical Connector Rail */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute left-7 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#2563EB]/40 via-[#C28E36]/35 to-[#2563EB]/40"
              />

              {PROFILE.workflowSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="relative sm:pl-3 transition-transform duration-200"
                  style={{
                    marginLeft: index % 2 === 1 ? '0.5rem' : '0rem',
                  }}
                >
                  <TiltCard3D
                    maxTilt={4}
                    liftZ={8}
                    className="rounded-2xl bg-white/90 border border-slate-200/90 studio-card-shadow p-5 flex flex-col sm:flex-row sm:items-start gap-4"
                  >
                    <div className="flex items-center gap-3 sm:w-56 shrink-0">
                      <span
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-xl font-mono-tabular text-xs font-bold border ${
                          index === 3
                            ? 'bg-[#C28E36]/12 border-[#C28E36]/30 text-[#9A6B1E]'
                            : 'bg-[#2563EB]/10 border-[#2563EB]/20 text-[#2563EB]'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h4 className="font-display text-base font-semibold text-[#0F172A]">
                        {step.title}
                      </h4>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed flex-1">
                      {step.description}
                    </p>
                  </TiltCard3D>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
