import { useState } from 'react';
import { Download, ExternalLink, FileText, Printer } from 'lucide-react';
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
import TiltCard3D from './TiltCard3D';

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
  const [viewMode, setViewMode] = useState<'compact' | 'a4'>('compact');

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
    <section id="resume" className="py-24 lg:py-32 border-b border-slate-200/80 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Control & Summary Column (Hidden on Print) */}
          <div className="no-print lg:col-span-5 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Resume / Curriculum Vitae
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
              Interactive A4 CV preview &amp; ATS-ready PDF export.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
              Inspect a compact Executive Summary or browse the full formatted A4 Curriculum Vitae
              inside the paper deck, then export a clean selectable-text PDF or print.
            </p>

            {/* View Toggle */}
            <div className="mt-7">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Preview Mode
              </div>
              <div
                role="group"
                aria-label="Resume layout mode"
                className="inline-flex items-center gap-1 p-1.5 bg-[#F8FAFC] border border-slate-200/90 rounded-xl"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    viewMode === 'compact'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  Executive Summary
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('a4')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    viewMode === 'a4'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  Full A4 CV
                </button>
              </div>
            </div>

            {/* Download & Print Controls */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onDownloadResume}
                disabled={isGeneratingPdf}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-[0_12px_24px_-10px_rgba(37,99,235,0.55)] hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap shrink-0 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <Download className="w-4 h-4" />
                {isGeneratingPdf ? 'Generating PDF...' : 'Download ATS PDF'}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#0F172A] bg-white border border-slate-200 hover:border-[#0F172A] rounded-xl studio-card-shadow hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <Printer className="w-4 h-4 text-[#C28E36]" />
                Print CV
              </button>
            </div>

            {pdfError && (
              <div
                role="alert"
                className="mt-5 p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-800"
              >
                {pdfError}
              </div>
            )}

            {/* Quick Document Highlights */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl bg-[#F8FAFC] border border-slate-200/80 p-4">
                <div className="font-mono-tabular font-semibold text-base text-[#0F172A]">
                  A4 Portrait
                </div>
                <div className="mt-0.5 text-[#475569]">Selectable ATS text PDF</div>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] border border-slate-200/80 p-4">
                <div className="font-mono-tabular font-semibold text-base text-[#0F172A]">
                  {experiences.length} Roles · {projects.length} Cases
                </div>
                <div className="mt-0.5 text-[#475569]">Complete career &amp; channel overview</div>
              </div>
            </div>
          </div>

          {/* Right 3D Tilted Floating A4 CV Preview Card */}
          <div className="lg:col-span-7 perspective-1200 relative">
            {/* Layered Paper Deck Shadow Sheet Behind Active A4 Card */}
            <div
              aria-hidden="true"
              className="no-print hidden sm:block absolute -inset-x-2 top-3 -bottom-3 rounded-2xl bg-[#F1F5F9] border border-slate-200/80 rotate-[1.2deg]"
            />

            <TiltCard3D
              maxTilt={3.5}
              liftZ={8}
              sheenOpacity={0.1}
              className="relative rounded-2xl bg-white border border-slate-200/95 shadow-[0_26px_54px_-16px_rgba(15,23,42,0.14)] overflow-hidden"
            >
              {/* Paper Top Bar (Hidden on Print) */}
              <div className="no-print px-6 py-3 bg-[#F8FAFC] border-b border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-medium text-[#0F172A]">
                  <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Farhad-Ali-Resume.pdf</span>
                </div>
                <span className="font-mono-tabular text-[11px] text-slate-500">
                  {viewMode === 'compact' ? 'Executive Summary' : 'Full A4 Sheet'}
                </span>
              </div>

              {/* Scrollable Interactive Sheet (Full height on print) */}
              <article
                aria-label="Farhad Ali Curriculum Vitae"
                className="print-only-resume max-h-[600px] overflow-y-auto print:max-h-none print:overflow-visible p-7 sm:p-10"
              >
                {/* 1. Header */}
                <header className="pb-7 border-b border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
                        {PROFILE.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-[#2563EB]">
                        {PROFILE.primaryPositioning}
                      </p>
                      <p className="mt-1.5 text-xs text-slate-500">{PROFILE.locationLine}</p>
                    </div>

                    <div className="sm:text-right space-y-1 text-xs">
                      <div>
                        <a
                          href={`mailto:${CONTACT_CONFIG.email}`}
                          className="font-semibold text-[#0F172A] hover:text-[#2563EB] underline underline-offset-2"
                        >
                          {CONTACT_CONFIG.email}
                        </a>
                      </div>
                      <div className="text-slate-600">{PROFILE.availability.label}</div>
                      <div className="text-slate-500">
                        Languages: {PROFILE.languages.map((l) => l.name).join(' · ')}
                      </div>
                    </div>
                  </div>

                  {(featuredBusiness.length > 0 || featuredChannels.length > 0) && (
                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="font-semibold text-[#0F172A] mb-1">Business Profiles</div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-slate-600">
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
                        <div className="font-semibold text-[#0F172A] mb-1">
                          Channels &amp; Storefronts
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-slate-600">
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
                <section className="py-6 border-b border-slate-200 print-avoid-break">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
                    Professional Summary
                  </h4>
                  <div className="space-y-2.5 text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                    {PROFILE.aboutSummary.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </section>

                {/* 3. Selected Outcomes */}
                <section className="py-6 border-b border-slate-200 print-avoid-break">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
                    Selected Outcomes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {metrics.map((metric) => (
                      <div
                        key={metric.id}
                        className="flex items-baseline justify-between gap-3 py-1 border-b border-slate-100"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#0F172A]">{metric.label}</div>
                          <div className="text-[11px] text-slate-500">
                            {metric.project} · {metric.auditDate}
                          </div>
                        </div>
                        <div className="font-mono-tabular text-sm font-bold text-[#0F172A] shrink-0">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 4. Independent Projects & Ventures */}
                <section className="py-6 border-b border-slate-200">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-4">
                    Independent Projects &amp; Digital Ventures
                  </h4>
                  <div className="space-y-5">
                    {(viewMode === 'compact' ? experiences.slice(0, 4) : experiences).map(
                      (exp) => (
                        <div key={exp.id} className="print-avoid-break">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h5 className="text-xs sm:text-sm font-bold text-[#0F172A]">
                              {exp.role}
                            </h5>
                            <span className="font-mono-tabular text-[11px] text-slate-500 shrink-0">
                              {exp.timeframe}
                            </span>
                          </div>
                          <div className="mt-0.5 text-[11px] font-semibold text-[#2563EB]">
                            {exp.projectGroup}
                            <span className="text-[#475569] font-normal">
                              {' '}
                              · {exp.platforms}
                            </span>
                          </div>
                          <ul className="mt-1.5 space-y-1 text-xs text-slate-600 leading-relaxed">
                            {(viewMode === 'compact'
                              ? exp.responsibilities.slice(0, 2)
                              : exp.responsibilities
                            ).map((item) => (
                              <li key={item} className="grid grid-cols-[10px_1fr] gap-2">
                                <span className="text-slate-400" aria-hidden="true">
                                  •
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                </section>

                {/* 5. Core Expertise */}
                {viewMode === 'a4' && (
                  <section className="py-5 border-b border-slate-200">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
                      Core Expertise
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      {EXPERTISE_CATEGORIES.map((cat) => (
                        <div key={cat.id} className="print-avoid-break">
                          <h5 className="text-xs font-bold text-[#0F172A] mb-1">{cat.title}</h5>
                          <ul className="space-y-1 text-[11px] text-[#475569]">
                            {cat.skills.map((skill) => (
                              <li key={skill.name}>{skill.name}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 6. Tools & Languages */}
                <section className="pt-5 grid grid-cols-1 sm:grid-cols-12 gap-6 print-avoid-break">
                  <div className="sm:col-span-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2.5">
                      Tools &amp; Platforms
                    </h4>
                    <div className="space-y-1.5 text-[11px]">
                      {TOOL_ECOSYSTEM.map((group) => (
                        <div
                          key={group.id}
                          className="grid grid-cols-1 sm:grid-cols-[145px_1fr] gap-1 sm:gap-3"
                        >
                          <span className="font-semibold text-[#0F172A]">{group.category}</span>
                          <span className="text-slate-600">
                            {group.tools.map((t) => t.name).join(' · ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-4 space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                        Languages
                      </h4>
                      <ul className="space-y-1 text-[11px]">
                        {PROFILE.languages.map((lang) => (
                          <li key={lang.name}>
                            <span className="font-semibold text-[#0F172A]">{lang.name}</span>
                            <div className="text-slate-500">{lang.proficiency}</div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {education.length > 0 && (
                      <div className="pt-2 border-t border-slate-200">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-1.5">
                          Education
                        </h4>
                        <ul className="space-y-1 text-[11px] text-slate-600">
                          {education.map((edu) => (
                            <li key={edu.credential}>
                              <div className="font-semibold text-[#0F172A]">{edu.credential}</div>
                              <div>
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
            </TiltCard3D>
          </div>
        </div>
      </div>
    </section>
  );
}
