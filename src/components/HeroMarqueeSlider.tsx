import { ArrowUpRight } from 'lucide-react';
import { ProjectCaseStudy, getPublicProjects } from '../data/portfolioData';

interface HeroMarqueeSliderProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export default function HeroMarqueeSlider({ onSelectProject }: HeroMarqueeSliderProps) {
  const projects = getPublicProjects().slice(0, 10);

  const renderTrack = (keyPrefix: string, isDuplicate = false) => (
    <div
      className="flex items-center gap-5 pr-5 shrink-0"
      aria-hidden={isDuplicate ? 'true' : undefined}
    >
      {projects.map((project) => {
        const headlineMetric = project.results[0]?.metric ?? project.statusLabel;

        return (
          <button
            key={`${keyPrefix}-${project.id}`}
            type="button"
            tabIndex={isDuplicate ? -1 : 0}
            onClick={() => onSelectProject(project)}
            className="group flex items-center gap-4 w-[310px] sm:w-[340px] rounded-2xl bg-white border border-slate-200/90 p-3 pr-5 text-left studio-card-shadow hover:studio-card-shadow-hover hover:-translate-y-0.5 hover:border-slate-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] shrink-0"
          >
            <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/70 shrink-0">
              {project.image ? (
                <img
                  src={project.image}
                  alt={isDuplicate ? '' : project.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#EEF3FA] to-[#DBEAFE]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#2563EB] truncate">
                {project.categoryEyebrow}
              </div>
              <div className="mt-0.5 font-display text-sm font-semibold text-[#0F172A] truncate group-hover:text-[#2563EB] transition-colors">
                {project.title}
              </div>
              <div className="mt-1 text-xs font-medium text-[#475569] truncate">
                {headlineMetric}
              </div>
            </div>

            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </button>
        );
      })}
    </div>
  );

  return (
    <section
      aria-label="Selected ventures and productions marquee"
      className="no-print relative py-8 sm:py-10 border-b border-slate-200/80 bg-[#F8FAFC] overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-5 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#475569]">
          Featured Productions &amp; Active Brands
        </p>
        <span className="text-xs font-medium text-slate-400 hidden sm:inline">
          Click any card to open full case study
        </span>
      </div>

      {/* Continuous Right-to-Left Marquee Track with soft architectural edge fades */}
      <div className="marquee-container relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 z-10 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/85 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/85 to-transparent"
          aria-hidden="true"
        />

        <div className="animate-marquee-rtl py-2">
          {renderTrack('primary', false)}
          {renderTrack('duplicate', true)}
        </div>
      </div>
    </section>
  );
}
