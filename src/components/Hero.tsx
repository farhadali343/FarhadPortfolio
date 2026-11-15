import { useState } from 'react';
import { ArrowDownRight, Box, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';
import AnimatedCounter from './AnimatedCounter';

const HERO_IMPACT_METRICS = [
  {
    id: 'yt-views',
    value: '118K+',
    title: 'YouTube Channel Views',
    context: 'The POV Narrative',
  },
  {
    id: 'peak-reach',
    value: '68K',
    title: 'Peak Single-Video Reach',
    context: 'Viral Storytelling',
  },
  {
    id: 'videos-shipped',
    value: '120+',
    title: 'Produced & Published Videos',
    context: 'Long & Short-Form',
  },
  {
    id: 'editorial-articles',
    value: '80+',
    title: 'Published Editorial Articles',
    context: 'Medium & SEO',
  },
] as const;

export default function Hero() {
  const [portraitError, setPortraitError] = useState(false);

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
      {/* Subtle Ambient Architectural Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 20%, rgba(37, 99, 235, 0.08), transparent 45%), radial-gradient(circle at 82% 28%, rgba(194, 142, 54, 0.07), transparent 40%)',
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-24">
        {/* Executive Split 3D Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Catchy Editorial Copy & Primary/Secondary Pill CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              {/* Top Subtle Status Line */}
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#475569] mb-6">
                <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span>Available for Select Global Projects • PK / Remote</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight text-[#0F172A] leading-[1.06] text-balance mb-6">
                {PROFILE.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-[56ch]">
                {PROFILE.heroSupportingText}
              </p>
            </div>

            {/* Executive Pill CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0F172A] hover:bg-[#2563EB] rounded-full shadow-[0_16px_32px_-12px_rgba(15,23,42,0.45)] hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                Explore Selected Work
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={scrollToStudio3D}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0F172A] bg-white/80 backdrop-blur-md border border-slate-200/90 hover:border-[#2563EB]/45 rounded-full shadow-[0_12px_28px_-14px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                <Box className="w-4 h-4 text-[#2563EB]" />
                Interactive 3D Studio
              </button>
            </div>
          </motion.div>

          {/* Right Column: Frameless 3D Perspective Glass Portrait Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 perspective-1200 relative"
          >
            {/* Soft Studio Rim Lighting Glow Behind Glass Card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[32px] opacity-80 blur-2xl"
              style={{
                background:
                  'radial-gradient(circle at 20% 15%, rgba(37, 99, 235, 0.22), transparent 55%), radial-gradient(circle at 85% 85%, rgba(194, 142, 54, 0.2), transparent 55%)',
              }}
            />

            <TiltCard3D
              maxTilt={8}
              liftZ={16}
              sheenOpacity={0.18}
              className="relative rounded-[24px] bg-white/45 backdrop-blur-md border border-white/80 shadow-[0_28px_60px_-18px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.85)]"
            >
              <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                {showPortraitImage && PROFILE.portraitUrl ? (
                  <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-[23px] bg-slate-900">
                    <img
                      src={PROFILE.portraitUrl}
                      alt={PROFILE.portraitAlt}
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitError(true)}
                      className="w-full h-full object-cover object-top"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[23px] ring-1 ring-inset ring-white/40"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/4.6] flex flex-col items-center justify-center text-center bg-slate-50 rounded-[23px] px-6 py-10">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-3">
                      <Camera className="w-5 h-5 text-slate-500" />
                    </div>
                    <p className="font-display text-base font-semibold text-[#0F172A]">
                      {PROFILE.name}
                    </p>
                  </div>
                )}

                {/* Minimal Floating Corner Glass Metric 1 */}
                <div
                  className="flex items-center gap-2.5 rounded-2xl bg-white/88 backdrop-blur-md border border-white/90 shadow-[0_16px_32px_-10px_rgba(15,23,42,0.22)] px-3.5 py-2.5 absolute left-3 sm:-left-5 top-4 sm:top-6"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0" aria-hidden="true" />
                  <span className="font-mono-tabular text-xs font-semibold text-[#0F172A] whitespace-nowrap">
                    118K+ Organic Views
                  </span>
                </div>

                {/* Minimal Floating Corner Glass Metric 2 */}
                <div
                  className="flex items-center gap-2.5 rounded-2xl bg-white/88 backdrop-blur-md border border-white/90 shadow-[0_16px_32px_-10px_rgba(15,23,42,0.22)] px-3.5 py-2.5 absolute right-3 sm:-right-5 bottom-4 sm:bottom-6"
                  style={{ transform: 'translateZ(34px)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#C28E36] shrink-0" aria-hidden="true" />
                  <span className="font-mono-tabular text-xs font-semibold text-[#0F172A] whitespace-nowrap">
                    120+ Videos Shipped
                  </span>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>
        </div>

        {/* Clean 4-Column Architectural Impact Metrics Bar */}
        <div className="mt-20 pt-14 border-t border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HERO_IMPACT_METRICS.map((item) => (
              <TiltCard3D
                key={item.id}
                maxTilt={4.5}
                liftZ={8}
                className="rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-7 sm:p-8 flex flex-col justify-between"
              >
                <div className="text-4xl sm:text-[42px] font-semibold text-[#0F172A] tracking-tight leading-none">
                  <AnimatedCounter value={item.value} />
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold text-[#0F172A]">{item.title}</div>
                  <div className="mt-1 text-xs font-medium text-[#475569]">{item.context}</div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
