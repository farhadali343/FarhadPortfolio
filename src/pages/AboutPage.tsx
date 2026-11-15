import { ArrowLeft, ArrowRight, Globe2, Languages, Layers } from 'lucide-react';
import About from '../components/About';
import TiltCard3D from '../components/TiltCard3D';
import { PROFILE } from '../data/portfolioData';
import { NavigateFn } from '../types/navigation';

interface AboutPageProps {
  onNavigate: NavigateFn;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Dedicated About Hero Header */}
      <section className="py-16 lg:py-24 border-b border-slate-200/80 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#2563EB] transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
                About Farhad Ali
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#0F172A] leading-[1.08] text-balance">
                {PROFILE.primaryPositioning}.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="text-sm font-medium text-[#475569]">{PROFILE.locationLine}</p>
              <p className="mt-1 text-xs font-semibold text-emerald-600">
                {PROFILE.availability.label}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Narrative & 5-Step Workflow */}
      <About />

      {/* Core Disciplines, Languages & Global Remote Operations */}
      <section className="py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <TiltCard3D
              maxTilt={3.5}
              liftZ={6}
              className="lg:col-span-7 rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-8"
            >
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-5">
                <Layers className="w-4 h-4" />
                <span>Core Operating Disciplines</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-[#0F172A]">
                {PROFILE.aboutDisciplines.map((discipline) => (
                  <li key={discipline} className="flex items-start gap-2.5">
                    <span className="font-mono-tabular text-[#2563EB] mt-0.5">—</span>
                    <span>{discipline}</span>
                  </li>
                ))}
              </ul>
            </TiltCard3D>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <TiltCard3D
                maxTilt={4}
                liftZ={6}
                className="rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-8"
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-4">
                  <Languages className="w-4 h-4" />
                  <span>Working Languages</span>
                </div>
                <div className="space-y-3">
                  {PROFILE.languages.map((lang) => (
                    <div
                      key={lang.name}
                      className="flex items-baseline justify-between gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      <span className="font-display text-sm font-semibold text-[#0F172A]">
                        {lang.name}
                      </span>
                      <span className="text-xs text-[#475569]">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </TiltCard3D>

              <TiltCard3D
                maxTilt={4}
                liftZ={6}
                className="rounded-2xl bg-[#0F172A] text-white p-8 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.3)]"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#60A5FA] mb-3">
                  <Globe2 className="w-4 h-4" />
                  <span>Next Step</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Inspect my complete A4 Curriculum Vitae or start a project conversation directly.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('resume')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#0F172A] bg-white hover:bg-[#2563EB] hover:text-white rounded-full transition-colors"
                  >
                    <span>View Resume</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <span>Start a Project</span>
                  </button>
                </div>
              </TiltCard3D>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
