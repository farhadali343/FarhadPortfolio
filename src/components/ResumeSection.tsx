import { useState } from 'react';
import { Download, ExternalLink, Printer } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'a4' | 'compact'>('a4');

  const experiences = getPublicExperience();
  const projects = getPublicProjects().slice(0, 8);
  const metrics = getPublicMetrics();
  const education = getPublicEducation();

  const handlePrint = () => {
    window.print();
  };

  const featuredChannels = CONTACT_CONFIG.channelLinks.filter(
    (item) => item.href && !item.isPlaceholder
  );
  const featuredBusiness = CONTACT_CONFIG.socialLinks.filter(
    (item) => item.href && !item.isPlaceholder
  );

  return (
    <section id="resume" className="py-16 lg:py-24 border-b border-[#E5E7EB] bg-[#F8F9FB]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Controls (Hidden on Print) */}
        <div className="no-print flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Resume / Curriculum Vitae
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#15191F] text-balance">
              Clean, ATS-ready CV &amp; A4 PDF export.
            </h2>
            <p className="mt-2 text-sm text-[#68717D] max-w-[60ch]">
              Synchronized directly with verified portfolio data. Pending old-CV items remain omitted publicly until confirmed.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Resume layout mode"
              className="inline-flex items-center gap-1 p-1 bg-white border border-[#E5E7EB] rounded-lg"
            >
              <button
                type="button"
                onClick={() => setViewMode('a4')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'a4'
                    ? 'bg-[#15191F] text-white'
                    : 'text-[#68717D] hover:text-[#15191F]'
                }`}
              >
                Full A4 CV
              </button>
              <button
                type="button"
                onClick={() => setViewMode('compact')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'compact'
                    ? 'bg-[#15191F] text-white'
                    : 'text-[#68717D] hover:text-[#15191F]'
                }`}
              >
                Executive Summary
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#15191F] bg-white border border-[#E5E7EB] hover:border-[#15191F] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <Printer className="w-4 h-4 text-[#68717D]" />
              Print
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

        {/* Clean A4 Resume Document Sheet */}
        <article
          aria-label="Farhad Ali Curriculum Vitae"
          className={`print-only-resume mx-auto bg-white border border-[#E5E7EB] rounded-lg shadow-xs ${
            viewMode === 'a4'
              ? 'max-w-[860px] p-6 sm:p-10 lg:p-12'
              : 'max-w-[1000px] p-6 sm:p-10'
          }`}
        >
          {/* 1. Resume Header */}
          <header className="pb-7 border-b border-[#E5E7EB]">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#15191F]">
                  {PROFILE.name}
                </h3>
                <p className="mt-1 text-sm sm:text-base font-semibold text-[#2563EB]">
                  {PROFILE.primaryPositioning}
                </p>
                <p className="mt-2 text-xs text-[#68717D]">
                  {PROFILE.locationLine}
                </p>
              </div>

              <div className="md:text-right space-y-1.5 text-xs">
                <div>
                  <a
                    href={`mailto:${CONTACT_CONFIG.email}`}
                    className="font-medium text-[#15191F] hover:text-[#2563EB] underline underline-offset-2"
                  >
                    {CONTACT_CONFIG.email}
                  </a>
                </div>
                <div className="text-[#68717D]">
                  {PROFILE.availability.label}
                </div>
                <div className="text-[#68717D]">
                  Languages: {PROFILE.languages.map((l) => l.name).join(' · ')}
                </div>
              </div>
            </div>

            {/* Clean Structured Links Row */}
            {(featuredBusiness.length > 0 || featuredChannels.length > 0) && (
              <div className="mt-5 pt-4 border-t border-[#E5E7EB]/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="font-semibold text-[#15191F] mb-1.5">
                    Business Profiles
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#68717D]">
                    {featuredBusiness.map((item) => (
                      <a
                        key={item.id}
                        href={item.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#2563EB] hover:underline"
                      >
                        <span>{item.label}</span>
                        <ExternalLink className="w-3 h-3 no-print" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-[#15191F] mb-1.5">
                    Channels &amp; Storefronts
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#68717D]">
                    {featuredChannels.map((item) => (
                      <a
                        key={item.id}
                        href={item.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#2563EB] hover:underline"
                      >
                        <span>{item.value}</span>
                        <ExternalLink className="w-3 h-3 no-print" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </header>

          {/* 2. Professional Summary */}
          <section className="py-7 border-b border-[#E5E7EB] print-avoid-break">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Professional Summary
            </h4>
            <div className="space-y-2.5 text-sm text-[#15191F]/90 leading-relaxed max-w-[74ch]">
              {PROFILE.aboutSummary.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* 3. Verified Highlights */}
          <section className="py-7 border-b border-[#E5E7EB] print-avoid-break">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-4">
              Verified Audit Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3.5">
              {metrics.map((metric) => (
                <div
                  key={metric.id}
                  className="flex items-baseline justify-between gap-3 py-1.5 border-b border-[#E5E7EB]/60"
                >
                  <div>
                    <div className="text-xs font-medium text-[#15191F]">
                      {metric.label}
                    </div>
                    <div className="text-[11px] text-[#68717D]">
                      {metric.project} · {metric.auditDate}
                    </div>
                  </div>
                  <div className="font-mono-tabular text-sm font-semibold text-[#15191F] shrink-0">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Independent Projects & Digital Ventures */}
          <section className="py-7 border-b border-[#E5E7EB]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-5">
              Independent Projects &amp; Digital Ventures
            </h4>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="print-avoid-break">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                    <h5 className="text-sm sm:text-[15px] font-semibold text-[#15191F]">
                      {exp.role}
                    </h5>
                    <span className="font-mono-tabular text-xs text-[#68717D] shrink-0">
                      {exp.timeframe}
                    </span>
                  </div>

                  <div className="mt-0.5 text-xs font-medium text-[#2563EB]">
                    {exp.projectGroup}
                    <span className="text-[#68717D] font-normal">
                      {' '}· {exp.engagementType} · {exp.platforms}
                    </span>
                  </div>

                  <ul className="mt-2.5 space-y-1.5 text-xs sm:text-[13px] text-[#15191F]/85 leading-relaxed">
                    {exp.responsibilities.map((item) => (
                      <li key={item} className="grid grid-cols-[12px_1fr] gap-2">
                        <span className="text-[#68717D]" aria-hidden="true">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Core Skills */}
          <section className="py-7 border-b border-[#E5E7EB]">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                Core Expertise
              </h4>
              <span className="text-[11px] text-[#68717D]">
                Includes hands-on execution, AI-assisted direction &amp; active R&amp;D
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {EXPERTISE_CATEGORIES.map((cat) => (
                <div key={cat.id} className="print-avoid-break">
                  <h5 className="text-xs font-semibold text-[#15191F] mb-1.5">
                    {cat.title}
                  </h5>
                  <ul className="space-y-1 text-xs text-[#68717D] leading-relaxed">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-baseline justify-between gap-3"
                      >
                        <span className="text-[#15191F]/85">{skill.name}</span>
                        <span className="text-[11px] text-[#68717D] shrink-0">
                          {skill.attribution}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Selected Initiatives (Shown in Full A4 View) */}
          {viewMode === 'a4' && (
            <section className="py-7 border-b border-[#E5E7EB]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-4">
                Selected Portfolio Initiatives
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="print-avoid-break">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-semibold text-[#15191F]">
                        {proj.title}
                      </span>
                      <span className="text-[11px] text-[#68717D] shrink-0">
                        {proj.primaryCategory}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#68717D] leading-relaxed">
                      {proj.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 7. Tools, Technologies & Languages */}
          <section className="pt-7 grid grid-cols-1 md:grid-cols-12 gap-8 print-avoid-break">
            <div className="md:col-span-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3.5">
                Tools &amp; Platforms
              </h4>
              <div className="space-y-2 text-xs">
                {TOOL_ECOSYSTEM.map((group) => (
                  <div
                    key={group.id}
                    className="grid grid-cols-1 sm:grid-cols-[165px_1fr] gap-1 sm:gap-4"
                  >
                    <span className="font-semibold text-[#15191F]">{group.category}</span>
                    <span className="text-[#68717D] leading-relaxed">
                      {group.tools.map((t) => t.name).join(' · ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3.5">
                  Languages
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {PROFILE.languages.map((lang) => (
                    <li key={lang.name}>
                      <span className="font-semibold text-[#15191F]">{lang.name}</span>
                      <div className="text-[11px] text-[#68717D]">{lang.proficiency}</div>
                    </li>
                  ))}
                </ul>
              </div>

              {education.length > 0 && (
                <div className="pt-3 border-t border-[#E5E7EB]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                    Education
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#68717D]">
                    {education.map((edu) => (
                      <li key={edu.credential}>
                        <div className="font-semibold text-[#15191F]">{edu.credential}</div>
                        <div className="text-[11px]">
                          {edu.institution} ({edu.year})
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </article>
      </div>
    </section>
  );
}
