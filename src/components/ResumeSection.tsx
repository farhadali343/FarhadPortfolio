import { useState } from 'react';
import { Download, Printer } from 'lucide-react';
import {
  CONTACT_CONFIG,
  EXPERTISE_CATEGORIES,
  PROFILE,
  TOOL_ECOSYSTEM,
  getPublicEducation,
  getPublicExperience,
  getPublicMetrics,
  getPublicProjects,
} from '../data/portfolioData';

interface ResumeSectionProps {
  onDownloadResume: () => void;
  isGeneratingPdf: boolean;
  pdfError: string | null;
}

export default function ResumeSection({
  onDownloadResume,
  isGeneratingPdf,
  pdfError,
}: ResumeSectionProps) {
  const [viewMode, setViewMode] = useState<'web' | 'a4'>('a4');

  const experiences = getPublicExperience();
  const projects = getPublicProjects().slice(0, 8);
  const metrics = getPublicMetrics();
  const education = getPublicEducation();

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-16 lg:py-24 border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Controls Header (Hidden on Print) */}
        <div className="no-print flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Resume / Curriculum Vitae
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#15191F] text-balance">
              Synchronized ATS-ready CV &amp; A4 PDF export.
            </h2>
            <p className="mt-2 text-sm text-[#68717D] max-w-[62ch]">
              Generated directly from the same verified profile data powering this portfolio. Pending old-CV items remain omitted publicly until confirmed.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Web / A4 View Toggle */}
            <div
              role="group"
              aria-label="Resume display layout"
              className="inline-flex items-center gap-1 p-1 bg-[#F8F9FB] border border-[#E5E7EB] rounded-lg"
            >
              <button
                type="button"
                onClick={() => setViewMode('a4')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'a4'
                    ? 'bg-white text-[#15191F] shadow-xs border border-[#E5E7EB]'
                    : 'text-[#68717D] hover:text-[#15191F]'
                }`}
              >
                A4 Sheet View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('web')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'web'
                    ? 'bg-white text-[#15191F] shadow-xs border border-[#E5E7EB]'
                    : 'text-[#68717D] hover:text-[#15191F]'
                }`}
              >
                Compact Summary
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#15191F] bg-white border border-[#E5E7EB] hover:border-[#15191F] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <Printer className="w-4 h-4 text-[#68717D]" />
              Print Resume
            </button>

            <button
              type="button"
              onClick={onDownloadResume}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md transition-colors whitespace-nowrap shrink-0 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <Download className="w-4 h-4" />
              {isGeneratingPdf ? 'Generating PDF...' : 'Download Resume PDF'}
            </button>
          </div>
        </div>

        {pdfError && (
          <div
            role="alert"
            className="no-print mb-6 p-4 rounded-md border border-red-200 bg-red-50 text-xs text-red-800"
          >
            {pdfError}
          </div>
        )}

        {/* Printable A4 / Web Resume Sheet */}
        <div
          className={`print-only-resume mx-auto bg-white border border-[#E5E7EB] rounded-lg ${
            viewMode === 'a4' ? 'max-w-[820px] p-6 sm:p-10 lg:p-12' : 'w-full p-6 sm:p-8'
          }`}
        >
          {/* Resume Header */}
          <div className="pb-6 border-b border-[#E5E7EB]">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#15191F]">
              {PROFILE.name}
            </h3>
            <p className="mt-1 text-sm sm:text-base font-semibold text-[#2563EB]">
              {PROFILE.primaryPositioning}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#68717D]">
              <span>{PROFILE.locationLine}</span>
              <span aria-hidden="true">|</span>
              <a
                href={`mailto:${CONTACT_CONFIG.email}`}
                className="text-[#15191F] hover:text-[#2563EB] underline underline-offset-2"
              >
                {CONTACT_CONFIG.email}
                {CONTACT_CONFIG.emailIsPlaceholder ? ' (Editable Placeholder)' : ''}
              </a>
              <span aria-hidden="true">|</span>
              <span>{PROFILE.availability.label}</span>
              <span aria-hidden="true">|</span>
              <span>Languages: {PROFILE.languages.map((l) => l.name).join(', ')}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#68717D]">
              <span className="font-medium text-[#15191F]">Channels &amp; Profiles:</span>
              {[...CONTACT_CONFIG.socialLinks, ...CONTACT_CONFIG.channelLinks]
                .filter((item) => item.href && !item.isPlaceholder)
                .map((item, idx) => (
                  <span key={item.id} className="inline-flex items-center gap-2">
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <a
                      href={item.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2563EB] hover:underline"
                    >
                      {item.label} ({item.value})
                    </a>
                  </span>
                ))}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="py-5 border-b border-[#E5E7EB] print-avoid-break">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2.5">
              Professional Summary
            </h4>
            <div className="space-y-2 text-sm text-[#15191F] leading-relaxed">
              {PROFILE.aboutSummary.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Core Skills */}
          <div className="py-5 border-b border-[#E5E7EB]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Core Skills &amp; Execution Attribution
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXPERTISE_CATEGORIES.map((cat) => (
                <div key={cat.id} className="print-avoid-break">
                  <div className="text-xs font-semibold text-[#15191F] mb-1">
                    {cat.title}
                  </div>
                  <p className="text-xs text-[#68717D] leading-relaxed">
                    {cat.skills.map((s) => `${s.name} (${s.attribution})`).join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Independent Projects & Experience */}
          <div className="py-5 border-b border-[#E5E7EB]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-4">
              Independent Projects &amp; Digital Ventures
            </h4>
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="print-avoid-break">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-sm font-semibold text-[#15191F]">
                      {exp.role} — <span className="text-[#2563EB]">{exp.projectGroup}</span>
                    </div>
                    <div className="font-mono-tabular text-xs text-[#68717D]">
                      {exp.timeframe}
                    </div>
                  </div>
                  <div className="text-xs text-[#68717D] mt-0.5 mb-2">
                    {exp.engagementType} · Platforms: {exp.platforms}
                  </div>
                  <ul className="space-y-1 text-xs sm:text-[13px] text-[#15191F]/90 leading-relaxed">
                    {exp.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <span className="text-[#68717D]">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Audit Highlights & Key Projects */}
          <div className="py-5 border-b border-[#E5E7EB] print-avoid-break">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Verified Project Snapshots &amp; Highlights
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#15191F] mb-4">
              {metrics.map((m) => (
                <li key={m.id} className="font-mono-tabular">
                  <span className="font-semibold">{m.value}</span> {m.label} —{' '}
                  <span className="text-[#68717D]">
                    {m.project} ({m.auditDate})
                  </span>
                </li>
              ))}
            </ul>
            {viewMode === 'a4' && (
              <div className="pt-3 border-t border-[#E5E7EB]/70 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs">
                    <span className="font-semibold text-[#15191F]">{proj.title}</span>{' '}
                    <span className="text-[#68717D]">({proj.primaryCategory}) — {proj.summary}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tools & Education */}
          <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-6 print-avoid-break">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2.5">
                Tools &amp; Technologies
              </h4>
              <div className="space-y-1.5 text-xs text-[#68717D]">
                {TOOL_ECOSYSTEM.map((group) => (
                  <div key={group.id}>
                    <span className="font-semibold text-[#15191F]">{group.category}: </span>
                    {group.tools.map((t) => t.name).join(', ')}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2.5">
                Education &amp; Languages
              </h4>
              <p className="text-xs text-[#15191F] mb-2">
                <span className="font-semibold">Languages: </span>
                {PROFILE.languages.map((l) => `${l.name} (${l.proficiency})`).join(' · ')}
              </p>
              {education.length > 0 ? (
                <ul className="space-y-1 text-xs text-[#68717D]">
                  {education.map((edu) => (
                    <li key={edu.credential}>
                      {edu.credential} — {edu.institution} ({edu.year})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#68717D]">
                  Education entries are preserved in the central profile config and omitted publicly until formal verification is finalized.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
