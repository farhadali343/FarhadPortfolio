import { useEffect } from 'react';
import { ExternalLink, X, Clock } from 'lucide-react';
import { ProjectCaseStudy } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#15191F]/70 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-[#E5E7EB] rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB] px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#68717D] mb-1">
              <span className="font-medium text-[#2563EB]">{project.categories.join(' · ')}</span>
              <span aria-hidden="true">/</span>
              <span>{project.statusLabel}</span>
              <span aria-hidden="true">/</span>
              <span className="font-mono-tabular">{project.timeframe}</span>
            </div>
            <h2
              id="case-study-title"
              className="font-display text-2xl sm:text-3xl font-bold text-[#15191F]"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#E5E7EB] text-[#15191F] hover:border-[#15191F] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Media Preview Slot */}
          {project.image ? (
            <div className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#15191F]">
              <img
                src={project.image}
                alt={project.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full max-h-[400px] object-cover"
              />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#CBD5E1] bg-[#F8F9FB] p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono-tabular text-[#2563EB] mb-1">
                  {project.visualCode} · Media Preview Slot
                </div>
                <p className="text-sm font-medium text-[#15191F]">
                  Ready for project screenshots, YouTube embeds, or Reels links.
                </p>
                <p className="text-xs text-[#68717D] mt-1">
                  Add a verified image or media URL to this project entry in the centralized data file to display it here automatically.
                </p>
              </div>
              <span className="text-xs font-mono-tabular text-[#68717D] shrink-0">
                {project.primaryCategory}
              </span>
            </div>
          )}

          {/* Role & Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-[#E5E7EB]">
            <div className="md:col-span-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#68717D] mb-1">
                Role &amp; Ownership
              </h3>
              <p className="text-sm font-semibold text-[#15191F]">{project.role}</p>

              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#68717D] mt-4 mb-1">
                Objective
              </h3>
              <p className="text-sm text-[#68717D] leading-relaxed">{project.objective}</p>
            </div>

            <div className="md:col-span-7">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#68717D] mb-3">
                Verified Outcomes &amp; Snapshots
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.results.map((result, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8F9FB] border border-[#E5E7EB] rounded-md p-3.5"
                  >
                    <div className="font-mono-tabular text-base font-semibold text-[#15191F]">
                      {result.metric}
                    </div>
                    <div className="mt-1 text-xs text-[#68717D] leading-snug">
                      {result.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overview, Challenge, Contribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display text-base font-semibold text-[#15191F] mb-2">
                Project Overview
              </h3>
              <p className="text-sm text-[#68717D] leading-relaxed">{project.overview}</p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-[#15191F] mb-2">
                Creative Challenge
              </h3>
              <p className="text-sm text-[#68717D] leading-relaxed">{project.challenge}</p>
            </div>
          </div>

          <div className="bg-[#F8F9FB] border border-[#E5E7EB] rounded-lg p-5">
            <h3 className="font-display text-base font-semibold text-[#15191F] mb-2">
              My Contribution
            </h3>
            <p className="text-sm text-[#68717D] leading-relaxed">{project.contribution}</p>
          </div>

          {/* Workflow & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display text-base font-semibold text-[#15191F] mb-3">
                Execution Workflow
              </h3>
              <ol className="space-y-2.5">
                {project.workflow.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-[#68717D]">
                    <span className="font-mono-tabular text-xs font-medium text-[#2563EB] mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-display text-base font-semibold text-[#15191F] mb-3">
                Work Performed &amp; Deliverables
              </h3>
              <ul className="space-y-2 text-sm text-[#68717D] mb-4">
                {project.workPerformed.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#2563EB] font-mono-tabular">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-[#E5E7EB] text-xs text-[#68717D]">
                <span className="font-semibold text-[#15191F]">Deliverables: </span>
                {project.deliverables.join(' · ')}
              </div>
              <div className="mt-2 text-xs text-[#68717D]">
                <span className="font-semibold text-[#15191F]">Tools: </span>
                {project.tools.join(' · ')}
              </div>
            </div>
          </div>

          {/* External Links (honestly labeled when pending) */}
          <div className="pt-5 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.externalLinks.map((link) =>
                link.url && !link.isPending ? (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span
                    key={link.label}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-[#68717D] bg-[#F8F9FB] border border-[#E5E7EB] rounded-md"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {link.label}
                  </span>
                )
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#15191F] border border-[#E5E7EB] hover:border-[#15191F] rounded-md transition-colors"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
