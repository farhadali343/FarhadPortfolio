import { PROFILE } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="py-16 lg:py-24 border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Narrative */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              About &amp; Approach
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#15191F] text-balance mb-6">
              Systems-oriented digital creation from concept to release.
            </h2>

            <div className="space-y-4 text-base text-[#68717D] leading-relaxed">
              {PROFILE.aboutSummary.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#15191F] mb-3">
                Core Operational Scope
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-sm text-[#68717D]">
                {PROFILE.aboutDisciplines.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#2563EB] font-mono-tabular mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 5-Step Methodology */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8F9FB] border border-[#E5E7EB] rounded-lg p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-5 border-b border-[#E5E7EB]">
                <h3 className="font-display text-xl font-semibold text-[#15191F]">
                  Five-Stage Production Workflow
                </h3>
                <span className="text-xs text-[#68717D]">
                  Quality control · Adaptability · Repeatability
                </span>
              </div>

              <div className="divide-y divide-[#E5E7EB]">
                {PROFILE.workflowSteps.map((step) => (
                  <div
                    key={step.step}
                    className="py-5 first:pt-6 last:pb-1 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                  >
                    <div className="sm:col-span-4 flex items-baseline gap-3">
                      <span className="font-mono-tabular text-xs font-medium text-[#2563EB]">
                        {step.step}
                      </span>
                      <h4 className="font-display text-base font-semibold text-[#15191F]">
                        {step.title}
                      </h4>
                    </div>
                    <p className="sm:col-span-8 text-sm text-[#68717D] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
