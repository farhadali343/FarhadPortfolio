import { getPublicExperience } from '../data/portfolioData';

export default function Experience() {
  const experiences = getPublicExperience();

  return (
    <section
      id="experience"
      className="py-16 lg:py-24 bg-[#15191F] text-[#F8F9FB] border-b border-[#262C36]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#60A5FA] mb-3">
              Independent Projects &amp; Digital Ventures
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
              Verified operational roles across self-directed brands.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-[44ch]">
            Distinguishing owner-operated digital ventures and active experiments from unverified historical employment claims.
          </p>
        </div>

        <div className="divide-y divide-[#262C36] border-t border-b border-[#262C36]">
          {experiences.map((entry, idx) => (
            <article
              key={entry.id}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
            >
              {/* Left Column: Role & Timeframe */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 text-xs text-[#9CA3AF] font-mono-tabular mb-2">
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  <span aria-hidden="true">·</span>
                  <span>{entry.timeframe}</span>
                  <span aria-hidden="true">·</span>
                  <span className={entry.status === 'in_progress' ? 'text-[#60A5FA]' : 'text-[#D1D5DB]'}>
                    {entry.engagementType}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-white tracking-wide">
                  {entry.role}
                </h3>

                <p className="mt-1.5 text-sm font-medium text-[#60A5FA]">
                  {entry.projectGroup}
                </p>

                <p className="mt-2 text-xs text-[#9CA3AF]">
                  Platforms: {entry.platforms}
                </p>
              </div>

              {/* Right Column: Responsibilities */}
              <div className="lg:col-span-7">
                <ul className="space-y-3 text-sm sm:text-[15px] text-[#D1D5DB] leading-relaxed">
                  {entry.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="font-mono-tabular text-[#60A5FA] mt-0.5">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
