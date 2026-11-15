import { useState } from 'react';
import { ArrowDownRight, Download, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE, getPublicMetrics } from '../data/portfolioData';

interface HeroProps {
  onDownloadResume: () => void;
  isGeneratingPdf: boolean;
}

export default function Hero({ onDownloadResume, isGeneratingPdf }: HeroProps) {
  const [portraitError, setPortraitError] = useState(false);
  const verifiedMetrics = getPublicMetrics();

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const showPortraitImage = Boolean(PROFILE.portraitUrl) && !portraitError;

  return (
    <section id="home" className="border-b border-[#E5E7EB] bg-[#F8F9FB]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-20 lg:pb-20">
        {/* Two-Column Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Primary Typography & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between py-1"
          >
            <div>
              {/* Quiet Unboxed Editorial Metadata */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#68717D] mb-6">
                <span className="font-medium text-[#15191F]">{PROFILE.name}</span>
                <span aria-hidden="true">·</span>
                <span>{PROFILE.locationLine}</span>
                {PROFILE.availability.showIndicator && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#2563EB] font-medium">{PROFILE.availability.label}</span>
                  </>
                )}
              </div>

              <p className="text-sm sm:text-base font-medium text-[#2563EB] mb-3">
                {PROFILE.primaryPositioning}
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#15191F] leading-[1.08] text-balance mb-5">
                {PROFILE.heroHeadline}
              </h1>

              <p className="text-sm sm:text-base font-medium text-[#15191F]/80 mb-4">
                {PROFILE.heroSubheadline}
              </p>

              <p className="text-base sm:text-lg text-[#68717D] leading-relaxed max-w-[60ch]">
                {PROFILE.heroSupportingText}
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                Explore My Work
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onDownloadResume}
                disabled={isGeneratingPdf}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#15191F] bg-white border border-[#E5E7EB] hover:border-[#15191F] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                <Download className="w-4 h-4 text-[#68717D]" />
                {isGeneratingPdf ? 'Preparing PDF...' : 'Download Resume'}
              </button>
            </div>
          </motion.div>

          {/* Right Column: Farhad Ali Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <div className="w-full min-h-[340px] lg:h-full bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-5 flex flex-col justify-between">
              {showPortraitImage && PROFILE.portraitUrl ? (
                <>
                  <div className="flex-1 min-h-[300px] overflow-hidden rounded-md bg-[#15191F] border border-[#E5E7EB]">
                    <img
                      src={PROFILE.portraitUrl}
                      alt={PROFILE.portraitAlt}
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitError(true)}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2 text-xs text-[#68717D]">
                    <span className="font-medium text-[#15191F]">
                      {PROFILE.name} · Creative Direction
                    </span>
                    <span className="font-mono-tabular text-[#15191F]">PK / Global</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs text-[#68717D] pb-4 border-b border-[#E5E7EB]">
                    <span className="font-mono-tabular uppercase tracking-wider">Studio Frame</span>
                    <span className="font-mono-tabular">01 / Portrait</span>
                  </div>

                  <div className="my-6 flex-1 flex flex-col items-center justify-center text-center bg-[#F8F9FB] border border-dashed border-[#CBD5E1] rounded-md px-6 py-10">
                    <div className="w-14 h-14 rounded-md bg-white border border-[#E5E7EB] flex items-center justify-center mb-4">
                      <Camera className="w-6 h-6 text-[#64748B]" />
                    </div>
                    <p className="font-display text-lg font-semibold text-[#15191F] mb-1">
                      Farhad Ali
                    </p>
                    <p className="text-xs text-[#68717D] max-w-[28ch] leading-relaxed">
                      Portrait photograph unavailable. Check asset path in portfolioData.ts.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2 text-xs text-[#68717D]">
                    <span>Creative Direction · Content Systems</span>
                    <span className="font-mono-tabular text-[#15191F]">PK / Global</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Full-Width Dated Audit Highlights Strip Below Hero Split */}
        <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#68717D]">
              Verified Historical Audit Highlights
            </h2>
            <p className="text-xs text-[#68717D]">
              Account-specific snapshots with explicit audit dates
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {verifiedMetrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white border border-[#E5E7EB] rounded-lg p-4 flex flex-col justify-between"
              >
                <div className="font-mono-tabular text-2xl font-semibold text-[#15191F] tracking-tight">
                  {metric.value}
                </div>
                <div className="mt-2">
                  <div className="text-xs font-medium text-[#15191F] leading-snug">
                    {metric.label}
                  </div>
                  <div className="mt-1 text-[11px] text-[#68717D] leading-snug">
                    {metric.project} · {metric.auditDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
