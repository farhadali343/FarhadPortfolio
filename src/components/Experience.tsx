import { getPublicExperience } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';

export default function Experience() {
  const experiences = getPublicExperience();

  return (
    <section
      id="experience"
      className="py-16 lg:py-24 bg-[#F1F5F9]/75 text-[#0F172A] border-b border-slate-200/80"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Independent Projects &amp; Digital Ventures
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] text-balance">
              Operational roles across self-directed brands and digital platforms.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-[44ch]">
            Owner-operated digital ventures, publishing channels, and active AI-directed experiments.
          </p>
        </div>

        <div className="space-y-4">
          {experiences.map((entry, idx) => (
            <TiltCard3D
              key={entry.id}
              maxTilt={3.5}
              liftZ={8}
              className="rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-6 sm:p-7"
            >
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Left Column: Role & Timeframe */}
                <div className="lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular mb-2.5">
                    <span className="inline-flex items-center justify-center rounded-md bg-[#2563EB]/10 text-[#2563EB] px-2 py-0.5 font-semibold">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-slate-500">{entry.timeframe}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span
                      className={`font-medium ${
                        entry.status === 'in_progress' ? 'text-[#C28E36]' : 'text-[#0F172A]'
                      }`}
                    >
                      {entry.engagementType}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#0F172A] tracking-tight">
                    {entry.role}
                  </h3>

                  <p className="mt-1.5 text-sm font-semibold text-[#2563EB]">
                    {entry.projectGroup}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Platforms: {entry.platforms}
                  </p>
                </div>

                {/* Right Column: Responsibilities */}
                <div className="lg:col-span-7 flex items-center">
                  <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                    {entry.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="font-mono-tabular text-[#2563EB] mt-0.5">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
