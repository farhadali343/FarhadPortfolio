import { useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { motion } from 'motion/react';
import { ProjectCaseStudy } from '../data/portfolioData';
import ProjectVisualHeader3D from './ProjectVisualHeader3D';

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

  const activeExternalLinks = project.externalLinks.filter(
    (link) => Boolean(link.url) && !link.isPending
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="no-print fixed inset-0 z-50 flex justify-end bg-[#0F172A]/45 backdrop-blur-[2px]"
      onClick={onClose}
    >
      {/* Slide-Over Case Study Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl h-full overflow-y-auto bg-white border-l border-slate-200 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Drawer Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-[#2563EB]">
                {project.categories.join(' · ')}
              </span>
              <span aria-hidden="true">/</span>
              <span>{project.statusLabel}</span>
              <span aria-hidden="true">/</span>
              <span className="font-mono-tabular">{project.timeframe}</span>
            </div>
            <h2
              id="case-study-title"
              className="font-display text-2xl font-bold text-[#0F172A]"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-[#0F172A] hover:border-[#0F172A] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* Custom 3D Visual Header Preview */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 studio-card-shadow">
            <ProjectVisualHeader3D project={project} />
          </div>

          {/* Role & Outcomes */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pb-6 border-b border-slate-200">
            <div className="sm:col-span-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Role &amp; Ownership
              </h3>
              <p className="text-sm font-semibold text-[#0F172A]">{project.role}</p>

              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-1">
                Objective
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{project.objective}</p>
            </div>

            <div className="sm:col-span-7">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Verified Outcomes &amp; Snapshots
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.results.map((result, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8FAFC] border border-slate-200/90 rounded-xl p-3.5"
                  >
                    <div className="font-mono-tabular text-base font-bold text-[#0F172A]">
                      {result.metric}
                    </div>
                    <div className="mt-1 text-xs text-slate-600 leading-snug">
                      {result.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overview & Challenge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display text-base font-bold text-[#0F172A] mb-2">
                Project Overview
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{project.overview}</p>
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#0F172A] mb-2">
                Creative Challenge
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{project.challenge}</p>
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-5">
            <h3 className="font-display text-base font-bold text-[#0F172A] mb-2">
              Execution &amp; Contribution
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{project.contribution}</p>
          </div>

          {/* Workflow & Deliverables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display text-base font-bold text-[#0F172A] mb-3">
                Execution Workflow
              </h3>
              <ol className="space-y-2.5">
                {project.workflow.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="font-mono-tabular text-xs font-semibold text-[#2563EB] mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-[#0F172A] mb-3">
                Deliverables &amp; Tool Stack
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 mb-4">
                {project.workPerformed.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#2563EB] font-mono-tabular">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-[#0F172A]">Deliverables: </span>
                {project.deliverables.join(' · ')}
              </div>
              <div className="mt-2 text-xs text-slate-600">
                <span className="font-semibold text-[#0F172A]">Tools: </span>
                {project.tools.join(' · ')}
              </div>
            </div>
          </div>

          {/* Drawer Footer Links */}
          <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              {activeExternalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-colors"
                >
                  {link.label}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#0F172A] border border-slate-200 hover:border-[#0F172A] rounded-xl transition-colors"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
