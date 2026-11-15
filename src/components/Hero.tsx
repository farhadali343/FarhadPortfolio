import { useState } from 'react';
import { ArrowDownRight, Box, Camera, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE, getPublicMetrics } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';
import AnimatedCounter from './AnimatedCounter';

interface HeroProps {
  onDownloadResume: () => void;
  isGeneratingPdf: boolean;
}

function IsometricMetricBadge({ index }: { index: number }) {
  const isBrass = index % 2 === 1;
  const accent = isBrass ? '#C28E36' : '#2563EB';
  const softFill = isBrass ? 'rgba(194, 142, 54, 0.14)' : 'rgba(37, 99, 235, 0.12)';

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M16 3L28 9.5V22.5L16 29L4 22.5V9.5L16 3Z"
        fill={softFill}
        stroke={accent}
        strokeWidth="1.4"
      />
      <path d="M16 15.5L28 9.5M16 15.5L4 9.5M16 15.5V29" stroke={accent} strokeWidth="1.2" opacity="0.65" />
    </svg>
  );
}

export default function Hero({ onDownloadResume, isGeneratingPdf }: HeroProps) {
  const [portraitError, setPortraitError] = useState(false);
  const verifiedMetrics = getPublicMetrics();

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToStudio3D = () => {
    const el = document.getElementById('studio-3d');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const showPortraitImage = Boolean(PROFILE.portraitUrl) && !portraitError;

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC] to-[#F1F5F9]/70"
    >
      {/* Subtle Ambient Architectural Grid Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 20%, rgba(37, 99, 235, 0.08), transparent 45%), radial-gradient(circle at 82% 28%, rgba(194, 142, 54, 0.07), transparent 40%)',
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-22">
        {/* Split 3D Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Typography & Tactile 3D CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              {/* Crisp Daylight Studio Availability Badge */}
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-white border border-slate-200/90 studio-card-shadow px-3.5 py-1.5 text-xs text-slate-600 mb-6">
                <span className="font-semibold text-[#2563EB]">
                  Open for Freelance &amp; International Collaborations
                </span>
                <span aria-hidden="true" className="text-slate-300">•</span>
                <span className="font-mono-tabular text-[#0F172A] font-medium">PK / Global</span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-[#2563EB] mb-3">
                {PROFILE.primaryPositioning}
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#0F172A] leading-[1.06] text-balance mb-5">
                {PROFILE.heroHeadline}
              </h1>

              <p className="text-sm sm:text-base font-medium text-slate-700 mb-4">
                {PROFILE.heroSubheadline}
              </p>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[58ch]">
                {PROFILE.heroSupportingText}
              </p>
            </div>

            {/* 3D Tactile Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-[0_12px_24px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                Explore My Work
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={scrollToStudio3D}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F172A] bg-white border border-slate-200 hover:border-[#2563EB]/50 rounded-xl studio-card-shadow hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                <Box className="w-4 h-4 text-[#2563EB]" />
                Launch 3D Studio
              </button>

              <button
                type="button"
                onClick={onDownloadResume}
                disabled={isGeneratingPdf}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white/80 border border-slate-200 hover:border-slate-400 hover:text-[#0F172A] rounded-xl hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap shrink-0 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                <Download className="w-4 h-4 text-[#C28E36]" />
                {isGeneratingPdf ? 'Preparing PDF...' : 'Download CV'}
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Floating Studio ID Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 perspective-1200 relative"
          >
            {/* Subtle Ambient Geometric Framing Accents Behind Card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-5 -right-4 w-28 h-28 rounded-2xl border border-[#C28E36]/25 bg-gradient-to-br from-[#C28E36]/10 to-transparent -rotate-6"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -left-4 w-32 h-32 rounded-2xl border border-[#2563EB]/20 bg-gradient-to-tr from-[#2563EB]/10 to-transparent rotate-6"
            />

            <TiltCard3D
              maxTilt={8}
              liftZ={14}
              className="rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-4 sm:p-5"
            >
              {/* Inner Portrait Frame */}
              <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                {showPortraitImage && PROFILE.portraitUrl ? (
                  <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-200">
                    <img
                      src={PROFILE.portraitUrl}
                      alt={PROFILE.portraitAlt}
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitError(true)}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/4.3] flex flex-col items-center justify-center text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl px-6 py-10">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-3">
                      <Camera className="w-5 h-5 text-slate-500" />
                    </div>
                    <p className="font-display text-base font-semibold text-[#0F172A]">
                      {PROFILE.name}
                    </p>
                  </div>
                )}

                {/* Layered 3D Depth Badges Floating Over Frame */}
                <div
                  className="hidden sm:flex items-center gap-2 rounded-xl bg-white/95 border border-slate-200/90 shadow-[0_14px_28px_-10px_rgba(15,23,42,0.2)] px-3 py-2 absolute -left-4 top-6"
                  style={{ transform: 'translateZ(28px)' }}
                >
                  <span className="w-2 h-2 rounded-sm bg-[#2563EB]" aria-hidden="true" />
                  <span className="font-mono-tabular text-xs font-semibold text-[#0F172A] whitespace-nowrap">
                    120+ Videos
                  </span>
                </div>

                <div
                  className="hidden sm:flex items-center gap-2 rounded-xl bg-white/95 border border-slate-200/90 shadow-[0_14px_28px_-10px_rgba(15,23,42,0.2)] px-3 py-2 absolute -right-4 top-20"
                  style={{ transform: 'translateZ(34px)' }}
                >
                  <span className="w-2 h-2 rounded-sm bg-[#C28E36]" aria-hidden="true" />
                  <span className="font-mono-tabular text-xs font-semibold text-[#0F172A] whitespace-nowrap">
                    118K+ Views
                  </span>
                </div>

                <div
                  className="hidden sm:flex items-center gap-2 rounded-xl bg-[#0F172A] text-white border border-slate-800 shadow-[0_14px_28px_-10px_rgba(15,23,42,0.35)] px-3 py-2 absolute -left-3 bottom-5"
                  style={{ transform: 'translateZ(32px)' }}
                >
                  <span className="font-mono-tabular text-[11px] font-semibold tracking-wide text-[#93C5FD] whitespace-nowrap">
                    AI Systems
                  </span>
                </div>
              </div>

              {/* Studio ID Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-[#0F172A]">{PROFILE.name}</span>
                  <span className="mx-1.5 text-slate-300">·</span>
                  <span>Creative Direction</span>
                </div>
                <span className="font-mono-tabular font-semibold text-[#2563EB]">STUDIO ID · 01</span>
              </div>
            </TiltCard3D>
          </motion.div>
        </div>

        {/* Verified Audit Highlights — 3D Bento Grid */}
        <div className="mt-14 pt-10 border-t border-slate-200/80">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-1">
                Verified Audit Highlights
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A]">
                Measured output across channels, publishing, and pins
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Account-specific historical snapshots with audit dates
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            {verifiedMetrics.map((metric, idx) => {
              const bentoSpan = idx < 2 ? 'lg:col-span-6' : 'lg:col-span-3';

              return (
                <TiltCard3D
                  key={metric.id}
                  maxTilt={5}
                  liftZ={8}
                  className={`${bentoSpan} rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-5 flex flex-col justify-between`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-3xl sm:text-[34px] font-bold text-[#0F172A] tracking-tight leading-none">
                        <AnimatedCounter value={metric.value} />
                      </div>
                      <div className="mt-2 text-sm font-semibold text-[#0F172A]">
                        {metric.label}
                      </div>
                    </div>
                    <IsometricMetricBadge index={idx} />
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-medium text-slate-600">{metric.project}</span>
                    <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 font-mono-tabular text-[11px] font-medium text-slate-600">
                      {metric.auditDate}
                    </span>
                  </div>
                </TiltCard3D>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
