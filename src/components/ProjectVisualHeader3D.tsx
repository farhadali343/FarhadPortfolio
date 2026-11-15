import { ProjectCaseStudy } from '../data/portfolioData';

interface ProjectVisualHeader3DProps {
  project: ProjectCaseStudy;
}

export default function ProjectVisualHeader3D({ project }: ProjectVisualHeader3DProps) {
  const id = project.id;

  // 1. YouTube Channel Analytics & Storytelling Mockup (The POV Narrative / Ford Invests)
  if (id === 'the-pov-narrative' || id === 'ford-invests') {
    const isFinance = id === 'ford-invests';
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#EEF3FA] via-[#F8FAFC] to-[#E6EEFE] border-b border-slate-200/80 flex items-center justify-center p-6">
        <div
          className="w-[88%] transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:-translate-y-0.5"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="rounded-xl bg-white border border-slate-200/90 p-3.5 shadow-[0_20px_38px_-14px_rgba(15,23,42,0.16)]">
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
              </div>
              <div className="h-2 w-16 rounded-full bg-slate-100" />
            </div>

            <div className="grid grid-cols-12 gap-3 items-center">
              {/* Mini Cinema Frame */}
              <div
                className={`col-span-5 aspect-[16/10] rounded-lg flex items-center justify-center relative overflow-hidden ${
                  isFinance
                    ? 'bg-gradient-to-br from-[#0F172A] to-[#1E40AF]'
                    : 'bg-gradient-to-br from-[#0F172A] via-[#172554] to-[#1E3A8A]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                  <div className="ml-0.5 w-0 h-0 border-y-[5px] border-y-transparent border-l-[9px] border-l-white" />
                </div>
              </div>

              {/* Channel Analytics Curve / Motion Chart */}
              <div className="col-span-7 flex flex-col justify-between gap-2">
                <div className="h-12 w-full rounded-lg bg-[#F8FAFC] border border-slate-100 p-2 flex items-end">
                  {isFinance ? (
                    <div className="w-full h-full flex items-end gap-1.5">
                      {[28, 38, 46, 55, 68, 76, 92, 100].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm"
                          style={{
                            height: `${h}%`,
                            backgroundColor: i >= 6 ? '#2563EB' : i >= 4 ? '#93C5FD' : '#CBD5E1',
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <svg viewBox="0 0 180 42" className="w-full h-full overflow-visible" aria-hidden="true">
                      <defs>
                        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 36 C28 34, 46 28, 72 24 C96 20, 118 11, 146 8 C162 6, 172 4, 180 2 L180 42 L0 42 Z"
                        fill={`url(#grad-${id})`}
                      />
                      <path
                        d="M0 36 C28 34, 46 28, 72 24 C96 20, 118 11, 146 8 C162 6, 172 4, 180 2"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="h-2 rounded-full bg-slate-200" />
                  <div className="h-2 rounded-full bg-[#2563EB]/30" />
                  <div className="h-2 rounded-full bg-[#C28E36]/35" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Short-Form Video Triptych / Storyboard Preview (WhatTheByte, TikTok Network, Reels, Animation)
  if (
    id === 'whatthebyte' ||
    id === 'tiktok-short-form-channels' ||
    id === 'short-form-creative-batches' ||
    id === 'what-if-animation-studio'
  ) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#F1F5F9] via-[#F8FAFC] to-[#ECF2FE] border-b border-slate-200/80 flex items-center justify-center p-6">
        <div className="w-[86%] flex items-center justify-center gap-3 transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:-translate-y-0.5">
          {[0, 1, 2].map((frame) => {
            const isCenter = frame === 1;
            return (
              <div
                key={frame}
                className={`rounded-xl border shadow-[0_18px_32px_-14px_rgba(15,23,42,0.16)] overflow-hidden transition-all ${
                  isCenter
                    ? 'w-[36%] aspect-[9/14] bg-[#0F172A] border-slate-800 -translate-y-1.5'
                    : 'w-[29%] aspect-[9/14] bg-white border-slate-200/90 translate-y-1'
                }`}
              >
                <div className="h-full p-2.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-4 h-1 rounded-full ${
                        isCenter ? 'bg-white/35' : 'bg-slate-200'
                      }`}
                    />
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        frame === 0
                          ? 'bg-[#2563EB]'
                          : frame === 1
                            ? 'bg-[#C28E36]'
                            : 'bg-slate-300'
                      }`}
                    />
                  </div>
                  <div className="my-auto flex items-center justify-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        isCenter
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <div
                        className={`ml-0.5 w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px] ${
                          isCenter ? 'border-l-white' : 'border-l-[#0F172A]'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div
                      className={`h-1.5 w-4/5 rounded-full ${
                        isCenter ? 'bg-white/30' : 'bg-slate-200'
                      }`}
                    />
                    <div
                      className={`h-1.5 w-1/2 rounded-full ${
                        isCenter ? 'bg-white/15' : 'bg-slate-100'
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. Shopify Storefront & Product Discovery Preview (EleCoStudio, Easy Finds, Benable)
  if (id === 'elecostudio-commerce' || id === 'easy-finds' || id === 'benable-curated-lists') {
    const isStorefront = id === 'elecostudio-commerce';
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-[#FFFDF8] to-[#EEF2F6] border-b border-slate-200/80 flex items-center justify-center p-6">
        <div className="w-[88%] transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:-translate-y-0.5">
          {isStorefront ? (
            <div className="rounded-xl bg-white border border-slate-200/90 p-3.5 shadow-[0_20px_38px_-14px_rgba(15,23,42,0.14)]">
              <div className="h-9 rounded-lg bg-gradient-to-r from-[#0F172A] to-[#1E293B] mb-3 px-3 flex items-center justify-between">
                <div className="h-2 w-20 rounded-full bg-white/80" />
                <div className="h-4 w-12 rounded-full bg-[#2563EB]" />
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[0, 1, 2].map((card) => (
                  <div
                    key={card}
                    className="rounded-lg bg-[#F8FAFC] border border-slate-200/80 p-2"
                  >
                    <div
                      className={`h-10 rounded-md mb-2 ${
                        card === 1
                          ? 'bg-gradient-to-tr from-[#DBEAFE] to-[#F8FAFC]'
                          : card === 2
                            ? 'bg-gradient-to-tr from-[#FEF3C7]/70 to-[#F8FAFC]'
                            : 'bg-gradient-to-tr from-slate-200 to-slate-100'
                      }`}
                    />
                    <div className="h-1.5 w-4/5 rounded-full bg-slate-300" />
                    <div className="mt-1 h-1.5 w-1/2 rounded-full bg-[#2563EB]/45" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5 items-start">
              {[
                ['h-16', 'bg-gradient-to-br from-[#E2E8F0] to-[#F8FAFC]'],
                ['h-20', 'bg-gradient-to-br from-[#DBEAFE] to-[#F8FAFC]'],
                ['h-14', 'bg-gradient-to-br from-[#FDE68A]/55 to-[#FFFDF8]'],
              ].map(([heightCls, bgCls], idx) => (
                <div
                  key={idx}
                  className={`rounded-xl bg-white border border-slate-200/90 p-2 shadow-[0_16px_30px_-14px_rgba(15,23,42,0.14)] ${
                    idx === 1 ? '-translate-y-1.5' : 'translate-y-1'
                  }`}
                >
                  <div className={`${heightCls} rounded-lg ${bgCls} mb-2`} />
                  <div className="h-1.5 w-4/5 rounded-full bg-slate-200" />
                  <div className="mt-1 h-1.5 w-1/2 rounded-full bg-slate-100" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 4. Editorial Publication Layout (Medium Publication, What If Money)
  if (id === 'medium-farhad-ali' || id === 'what-if-money') {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-[#F4F6FB] to-[#ECEFF5] border-b border-slate-200/80 flex items-center justify-center p-6">
        <div className="w-[86%] transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:-translate-y-0.5">
          <div className="rounded-xl bg-white border border-slate-200/90 p-4 shadow-[0_20px_38px_-14px_rgba(15,23,42,0.14)]">
            <div className="flex items-center gap-3 pb-3 mb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-[#0F172A] shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 w-3/4 rounded-full bg-[#0F172A]/85" />
                <div className="h-1.5 w-1/2 rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3 items-start">
              <div className="col-span-8 space-y-2">
                <div className="h-2 w-full rounded-full bg-slate-200" />
                <div className="h-2 w-11/12 rounded-full bg-slate-200" />
                <div className="h-2 w-4/5 rounded-full bg-slate-100" />
              </div>
              <div className="col-span-4 h-11 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 p-2 flex flex-col justify-between">
                <div className="h-1.5 w-full rounded-full bg-[#2563EB]/60" />
                <div className="h-1.5 w-2/3 rounded-full bg-[#C28E36]/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. AI & Web Prototype / Social Grid UI Mockup (Automation Editor, PakTransfer, Farhad Muse AI)
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#F4F6FA] via-[#FFFFFF] to-[#EBF2FE] border-b border-slate-200/80 flex items-center justify-center p-6">
      <div className="w-[88%] transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:-translate-y-0.5">
        <div className="rounded-xl bg-white border border-slate-200/90 overflow-hidden shadow-[0_20px_38px_-14px_rgba(15,23,42,0.15)]">
          {/* Clean Window Chrome */}
          <div className="px-3.5 py-2 bg-[#F8FAFC] border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span className="w-2 h-2 rounded-full bg-slate-300" />
            </div>
            <div className="h-1.5 w-24 rounded-full bg-slate-200" />
          </div>

          {/* Clean App Workspace Split */}
          <div className="grid grid-cols-12 min-h-[86px]">
            <div className="col-span-4 border-r border-slate-100 p-3 space-y-2 bg-[#FAFCFF]">
              <div className="h-2 w-4/5 rounded-full bg-[#2563EB]/70" />
              <div className="h-2 w-3/4 rounded-full bg-slate-200" />
              <div className="h-2 w-2/3 rounded-full bg-slate-200" />
              <div className="h-2 w-3/5 rounded-full bg-slate-100" />
            </div>
            <div className="col-span-8 p-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-slate-200/80 bg-[#F8FAFC] p-2.5 flex flex-col justify-between">
                <div className="w-5 h-5 rounded-md bg-[#2563EB]/15" />
                <div className="space-y-1 mt-2">
                  <div className="h-1.5 w-4/5 rounded-full bg-slate-300" />
                  <div className="h-1.5 w-1/2 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="rounded-lg border border-slate-200/80 bg-[#F8FAFC] p-2.5 flex flex-col justify-between">
                <div className="w-5 h-5 rounded-md bg-[#C28E36]/20" />
                <div className="space-y-1 mt-2">
                  <div className="h-1.5 w-3/4 rounded-full bg-slate-300" />
                  <div className="h-1.5 w-3/5 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
