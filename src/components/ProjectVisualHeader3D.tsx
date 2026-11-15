import { ReactNode } from 'react';
import { ProjectCaseStudy } from '../data/portfolioData';

interface ProjectVisualHeader3DProps {
  project: ProjectCaseStudy;
}

function IsometricStage({
  bgClass,
  children,
}: {
  bgClass: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden border-b border-slate-200/80 flex items-center justify-center p-5 select-none ${bgClass}`}
      style={{ perspective: '960px' }}
    >
      {/* Subtle architectural grid horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.32) 1px, transparent 0)',
          backgroundSize: '18px 18px',
        }}
      />
      {/* Ambient studio key-light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#2563EB]/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#C28E36]/10 blur-2xl"
      />

      {/* 3D Isometric Plane */}
      <div
        className="relative w-[86%] h-[84%] flex items-center justify-center transition-transform duration-500 ease-out [transform:rotateX(22deg)_rotateY(-16deg)_rotateZ(6deg)] group-hover:[transform:rotateX(12deg)_rotateY(-8deg)_rotateZ(2deg)_scale(1.04)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  );
}

function IsoScreenMedia({
  src,
  alt,
  className = '',
}: {
  src: string | null;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E3A8A] ${className}`}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full h-full object-cover ${className}`}
    />
  );
}

export default function ProjectVisualHeader3D({ project }: ProjectVisualHeader3DProps) {
  const { id, image, imageAlt } = project;

  // 1. The POV Narrative — Widescreen Cinema Viewport + Floating Retention Curve + Brass Playhead
  if (id === 'the-pov-narrative') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#EEF3FA] via-[#F8FAFC] to-[#E3ECFD]">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Extruded Main Cinema Slate */}
          <div className="w-[82%] rounded-xl bg-white border border-slate-200/90 p-2.5 shadow-[10px_18px_30px_-10px_rgba(15,23,42,0.22),3px_5px_0_#CBD5E1]">
            <div className="aspect-[16/9] rounded-lg overflow-hidden relative bg-[#0F172A]">
              <IsoScreenMedia src={image} alt={imageAlt} className="opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A]/45 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center">
                  <div className="ml-0.5 w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-[#0F172A]" />
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-[#2563EB]" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#C28E36]" />
            </div>
          </div>

          {/* Floating Retention Analytics Card */}
          <div
            className="absolute -right-1 -bottom-1 w-[46%] rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200 p-2.5 shadow-[8px_16px_26px_-8px_rgba(37,99,235,0.25),2px_3px_0_#E2E8F0]"
            style={{ transform: 'translateZ(26px)' }}
          >
            <svg viewBox="0 0 120 34" className="w-full h-7 overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="iso-pov-curve" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 30 C24 28, 42 22, 64 17 C84 12, 100 5, 120 2 L120 34 L0 34 Z"
                fill="url(#iso-pov-curve)"
              />
              <path
                d="M0 30 C24 28, 42 22, 64 17 C84 12, 100 5, 120 2"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 2. Ford Invests — Isometric Motion Bar Columns + Finance Visual Card
  if (id === 'ford-invests') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#EFF4FB] via-[#F8FAFC] to-[#E6EEFE]">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-[84%] rounded-xl bg-white border border-slate-200/90 p-3 shadow-[10px_18px_30px_-10px_rgba(15,23,42,0.22),3px_5px_0_#CBD5E1] grid grid-cols-12 gap-2.5 items-stretch">
            <div className="col-span-5 rounded-lg overflow-hidden bg-[#0F172A] aspect-[4/3]">
              <IsoScreenMedia src={image} alt={imageAlt} />
            </div>
            <div className="col-span-7 rounded-lg bg-[#F8FAFC] border border-slate-100 p-2 flex items-end gap-1.5">
              {[30, 42, 38, 56, 68, 84, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all duration-300"
                  style={{
                    height: `${h}%`,
                    backgroundColor:
                      i === 6 ? '#2563EB' : i === 5 ? '#60A5FA' : i === 3 ? '#C28E36' : '#CBD5E1',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating Radial Dial Card */}
          <div
            className="absolute -left-1 -bottom-1 rounded-xl bg-[#0F172A] border border-slate-800 p-2.5 shadow-[8px_16px_24px_-8px_rgba(15,23,42,0.38)] flex items-center gap-2"
            style={{ transform: 'translateZ(28px)' }}
          >
            <div className="w-6 h-6 rounded-full border-2 border-[#2563EB] border-t-[#C28E36]" />
            <div className="space-y-1">
              <div className="h-1.5 w-10 rounded-full bg-white/80" />
              <div className="h-1.5 w-6 rounded-full bg-white/35" />
            </div>
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 3. WhatTheByte — Fanned Isometric 3D Quiz Cards
  if (id === 'whatthebyte') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#F1F5F9] via-[#F8FAFC] to-[#E8F0FE]">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Left Clue Tile */}
          <div
            className="w-[30%] aspect-[9/13] rounded-xl bg-white border border-slate-200 p-1.5 shadow-[6px_14px_22px_-8px_rgba(15,23,42,0.18),2px_3px_0_#CBD5E1] -mr-3 -rotate-6"
            style={{ transform: 'translateZ(6px)' }}
          >
            <div className="w-full h-2/3 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
              <div className="w-5 h-5 rounded-md bg-[#2563EB]/25 rotate-12" />
            </div>
            <div className="mt-2 h-1.5 w-4/5 rounded-full bg-slate-200 mx-auto" />
          </div>

          {/* Center Elevated Hero Quiz Deck */}
          <div
            className="z-10 w-[38%] aspect-[9/13] rounded-xl bg-[#0F172A] border border-slate-800 p-1.5 shadow-[12px_20px_30px_-10px_rgba(15,23,42,0.35),3px_4px_0_#334155]"
            style={{ transform: 'translateZ(26px)' }}
          >
            <div className="w-full h-3/4 rounded-lg overflow-hidden relative">
              <IsoScreenMedia src={image} alt={imageAlt} />
              <div className="absolute inset-0 bg-[#0F172A]/25 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center shadow">
                  <div className="ml-0.5 w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-white" />
                </div>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-3/4 rounded-full bg-[#C28E36] mx-auto" />
          </div>

          {/* Right Answer Tile */}
          <div
            className="w-[30%] aspect-[9/13] rounded-xl bg-white border border-slate-200 p-1.5 shadow-[6px_14px_22px_-8px_rgba(15,23,42,0.18),2px_3px_0_#CBD5E1] -ml-3 rotate-6"
            style={{ transform: 'translateZ(12px)' }}
          >
            <div className="w-full h-2/3 rounded-lg bg-[#FEF3C7]/60 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-[#C28E36]" />
            </div>
            <div className="mt-2 h-1.5 w-3/5 rounded-full bg-slate-200 mx-auto" />
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 4. Farhad Muse — Multi-Platform Social Grid + Floating Reel Layer
  if (id === 'farhad-muse-ai') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#F4F6FB] via-[#FFFFFF] to-[#EAEFFE]">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Base Social Feed Board */}
          <div className="w-[82%] rounded-xl bg-white border border-slate-200/90 p-2.5 shadow-[10px_18px_30px_-10px_rgba(15,23,42,0.22),3px_5px_0_#CBD5E1]">
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-lg overflow-hidden col-span-2 row-span-2">
                <IsoScreenMedia src={image} alt={imageAlt} />
              </div>
              <div className="aspect-square rounded-lg bg-[#EFF6FF] border border-[#DBEAFE]" />
              <div className="aspect-square rounded-lg bg-[#0F172A]" />
            </div>
          </div>

          {/* Floating Overlapping Carousel Card */}
          <div
            className="absolute -right-1 -top-1 w-[36%] rounded-xl bg-white border border-slate-200 p-2 shadow-[8px_16px_26px_-8px_rgba(37,99,235,0.24),2px_3px_0_#E2E8F0]"
            style={{ transform: 'translateZ(26px)' }}
          >
            <div className="h-9 rounded-md bg-gradient-to-br from-[#2563EB] to-[#1E40AF]" />
            <div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-slate-200" />
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 5. Easy Finds — Isometric Pinterest Masonry Board
  if (id === 'easy-finds') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#F8FAFC] via-[#FFFDF8] to-[#EEF2F6]">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-[86%] grid grid-cols-3 gap-2.5 items-center">
            <div
              className="rounded-xl bg-white border border-slate-200 p-1.5 shadow-[8px_14px_24px_-8px_rgba(15,23,42,0.18),2px_4px_0_#CBD5E1] translate-y-2"
              style={{ transform: 'translateZ(8px)' }}
            >
              <div className="h-14 rounded-lg bg-gradient-to-br from-slate-200 to-slate-100" />
              <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-slate-200" />
            </div>

            <div
              className="rounded-xl bg-white border border-slate-200 p-1.5 shadow-[10px_20px_28px_-8px_rgba(15,23,42,0.24),3px_4px_0_#CBD5E1] -translate-y-1.5"
              style={{ transform: 'translateZ(26px)' }}
            >
              <div className="h-20 rounded-lg overflow-hidden">
                <IsoScreenMedia src={image} alt={imageAlt} />
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <div className="h-1.5 w-2/3 rounded-full bg-[#0F172A]/75" />
                <div className="w-2 h-2 rounded-full bg-[#C28E36]" />
              </div>
            </div>

            <div
              className="rounded-xl bg-white border border-slate-200 p-1.5 shadow-[8px_14px_24px_-8px_rgba(15,23,42,0.18),2px_4px_0_#CBD5E1] translate-y-1"
              style={{ transform: 'translateZ(14px)' }}
            >
              <div className="h-16 rounded-lg bg-gradient-to-br from-[#DBEAFE] to-[#F8FAFC]" />
              <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-[#2563EB]/45" />
            </div>
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 6. Benable — Stepped 3D Curated List Shelves
  if (id === 'benable-curated-lists') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#F7F8FC] via-[#FFFFFF] to-[#EFF1FA]">
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">
          <div
            className="w-[78%] rounded-xl bg-white border border-slate-200 p-2 shadow-[8px_14px_24px_-8px_rgba(15,23,42,0.18),2px_3px_0_#CBD5E1] flex items-center gap-2.5 -translate-x-2"
            style={{ transform: 'translateZ(8px)' }}
          >
            <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
              <IsoScreenMedia src={image} alt={imageAlt} />
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-3/4 rounded-full bg-[#0F172A]/80" />
              <div className="h-1.5 w-1/2 rounded-full bg-slate-200" />
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
          </div>

          <div
            className="w-[78%] rounded-xl bg-white border border-slate-200 p-2 shadow-[10px_18px_28px_-8px_rgba(15,23,42,0.22),3px_4px_0_#CBD5E1] flex items-center gap-2.5 translate-x-2"
            style={{ transform: 'translateZ(24px)' }}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-4/5 rounded-full bg-slate-300" />
              <div className="h-1.5 w-2/5 rounded-full bg-[#C28E36]/65" />
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C28E36]" />
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 7. TikTok Short-Form Network — Staggered 3D Vertical Mobile Trio
  if (id === 'tiktok-short-form-channels') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#F1F5F9] via-[#FFFFFF] to-[#EBF2FE]">
        <div className="relative w-full h-full flex items-center justify-center gap-2.5">
          <div
            className="w-[26%] aspect-[9/16] rounded-xl bg-white border border-slate-200 p-1.5 shadow-[6px_14px_22px_-8px_rgba(15,23,42,0.18),2px_3px_0_#CBD5E1] translate-y-2"
            style={{ transform: 'translateZ(8px)' }}
          >
            <div className="w-full h-full rounded-lg bg-slate-100 flex flex-col justify-end p-1.5 gap-1">
              <div className="h-1 w-4/5 rounded-full bg-slate-300" />
              <div className="h-1 w-1/2 rounded-full bg-slate-200" />
            </div>
          </div>

          <div
            className="w-[32%] aspect-[9/16] rounded-xl bg-[#0F172A] border border-slate-800 p-1.5 shadow-[12px_22px_32px_-10px_rgba(15,23,42,0.35),3px_4px_0_#334155] -translate-y-1"
            style={{ transform: 'translateZ(28px)' }}
          >
            <div className="w-full h-full rounded-lg overflow-hidden relative">
              <IsoScreenMedia src={image} alt={imageAlt} />
              <div className="absolute right-1.5 bottom-2 flex flex-col gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C28E36]" />
              </div>
            </div>
          </div>

          <div
            className="w-[26%] aspect-[9/16] rounded-xl bg-white border border-slate-200 p-1.5 shadow-[6px_14px_22px_-8px_rgba(15,23,42,0.18),2px_3px_0_#CBD5E1] translate-y-2"
            style={{ transform: 'translateZ(14px)' }}
          >
            <div className="w-full h-full rounded-lg bg-[#EFF6FF] flex flex-col justify-between p-1.5">
              <div className="w-3 h-3 rounded-full bg-[#2563EB]/30 self-end" />
              <div className="space-y-1">
                <div className="h-1 w-3/4 rounded-full bg-[#2563EB]/50" />
                <div className="h-1 w-1/2 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 8. What If Money — Isometric Comparison Matrix + Editorial Guide
  if (id === 'what-if-money') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#F8FAFC] via-[#F4F7FB] to-[#E9EFF9]">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-[84%] rounded-xl bg-white border border-slate-200/90 p-3 shadow-[10px_18px_30px_-10px_rgba(15,23,42,0.22),3px_5px_0_#CBD5E1] grid grid-cols-12 gap-2.5">
            <div className="col-span-5 rounded-lg overflow-hidden aspect-[4/3]">
              <IsoScreenMedia src={image} alt={imageAlt} />
            </div>
            <div className="col-span-7 space-y-2 flex flex-col justify-center">
              <div className="h-2 w-full rounded-full bg-slate-200" />
              <div className="h-2 w-5/6 rounded-full bg-[#2563EB]/55" />
              <div className="h-2 w-2/3 rounded-full bg-[#C28E36]/60" />
            </div>
          </div>

          <div
            className="absolute -right-1 -bottom-1 rounded-xl bg-white border border-slate-200 p-2 shadow-[8px_16px_24px_-8px_rgba(15,23,42,0.22),2px_3px_0_#E2E8F0] flex items-center gap-1.5"
            style={{ transform: 'translateZ(26px)' }}
          >
            <span className="w-2.5 h-5 rounded-sm bg-slate-200" />
            <span className="w-2.5 h-7 rounded-sm bg-[#2563EB]" />
            <span className="w-2.5 h-6 rounded-sm bg-[#C28E36]" />
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 9. Medium Publication — Stacked Isometric Editorial Pages
  if (id === 'medium-farhad-ali') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#F8FAFC] via-[#F4F6FB] to-[#ECEFF5]">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Background Sheet */}
          <div
            className="absolute w-[74%] h-[78%] rounded-xl bg-slate-100 border border-slate-200 -translate-x-2 translate-y-2"
            style={{ transform: 'translateZ(2px)' }}
          />
          {/* Foreground Editorial Sheet */}
          <div
            className="relative w-[78%] rounded-xl bg-white border border-slate-200/90 p-3 shadow-[10px_18px_30px_-10px_rgba(15,23,42,0.22),3px_5px_0_#CBD5E1]"
            style={{ transform: 'translateZ(20px)' }}
          >
            <div className="flex items-center gap-2.5 pb-2 mb-2 border-b border-slate-100">
              <div className="w-10 h-8 rounded-md overflow-hidden shrink-0">
                <IsoScreenMedia src={image} alt={imageAlt} />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="h-2 w-4/5 rounded-full bg-[#0F172A]/85" />
                <div className="h-1.5 w-1/2 rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-slate-200" />
              <div className="h-1.5 w-11/12 rounded-full bg-slate-200" />
              <div className="h-1.5 w-2/3 rounded-full bg-[#2563EB]/45" />
            </div>
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 10. Motion & Educational Reels — Multi-Track Timeline + Floating Frame
  if (id === 'short-form-creative-batches') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#EEF2F9] via-[#F8FAFC] to-[#E6EEFE]">
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">
          <div
            className="w-[78%] aspect-[16/8] rounded-xl bg-[#0F172A] border border-slate-800 p-1.5 shadow-[10px_18px_28px_-8px_rgba(15,23,42,0.3)]"
            style={{ transform: 'translateZ(24px)' }}
          >
            <div className="w-full h-full rounded-lg overflow-hidden">
              <IsoScreenMedia src={image} alt={imageAlt} />
            </div>
          </div>

          <div
            className="w-[84%] rounded-xl bg-white border border-slate-200 p-2 shadow-[8px_14px_24px_-8px_rgba(15,23,42,0.18),2px_4px_0_#CBD5E1] space-y-1.5"
            style={{ transform: 'translateZ(8px)' }}
          >
            <div className="flex gap-1.5">
              <div className="h-2 w-2/5 rounded-full bg-[#2563EB]" />
              <div className="h-2 w-1/4 rounded-full bg-[#C28E36]" />
              <div className="h-2 flex-1 rounded-full bg-slate-200" />
            </div>
            <div className="flex gap-1.5">
              <div className="h-1.5 w-1/3 rounded-full bg-slate-200" />
              <div className="h-1.5 w-1/2 rounded-full bg-[#0F172A]/70" />
            </div>
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 11. Automation Editor — Isometric Modular App Window + Floating Inspector
  if (id === 'automation-editor') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#F4F6FA] via-[#FFFFFF] to-[#EBF2FE]">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-[84%] rounded-xl bg-white border border-slate-200/90 overflow-hidden shadow-[10px_18px_30px_-10px_rgba(15,23,42,0.22),3px_5px_0_#CBD5E1]">
            <div className="px-2.5 py-1.5 bg-[#F8FAFC] border-b border-slate-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </div>
            <div className="grid grid-cols-12 p-2 gap-2 items-stretch">
              <div className="col-span-4 space-y-1.5 bg-[#F8FAFC] rounded-lg p-2">
                <div className="h-1.5 w-4/5 rounded-full bg-[#2563EB]" />
                <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
                <div className="h-1.5 w-2/3 rounded-full bg-slate-200" />
              </div>
              <div className="col-span-8 rounded-lg overflow-hidden h-16">
                <IsoScreenMedia src={image} alt={imageAlt} />
              </div>
            </div>
          </div>

          <div
            className="absolute -right-1 -bottom-1 w-10 h-10 rounded-xl bg-[#2563EB] shadow-[8px_14px_24px_-6px_rgba(37,99,235,0.45)] flex items-center justify-center"
            style={{ transform: 'translateZ(28px)' }}
          >
            <div className="w-4 h-4 rounded-sm border-2 border-white/90" />
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 12. PakTransfer — Twin Isometric Transfer Nodes + Arched Flow Ribbon
  if (id === 'paktransfer') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#EDF3FC] via-[#F8FAFC] to-[#E6EEFE]">
        <div className="relative w-full h-full flex items-center justify-center gap-4">
          <div
            className="w-[38%] rounded-xl bg-white border border-slate-200 p-2 shadow-[8px_16px_26px_-8px_rgba(15,23,42,0.2),2px_4px_0_#CBD5E1] -translate-y-2"
            style={{ transform: 'translateZ(18px)' }}
          >
            <div className="h-11 rounded-lg overflow-hidden mb-2">
              <IsoScreenMedia src={image} alt={imageAlt} />
            </div>
            <div className="h-1.5 w-3/4 rounded-full bg-[#0F172A]/80" />
          </div>

          <div
            className="z-10 w-8 h-8 rounded-full bg-[#2563EB] border-2 border-white shadow-lg flex items-center justify-center shrink-0"
            style={{ transform: 'translateZ(30px)' }}
          >
            <div className="w-3 h-0.5 bg-white rounded-full" />
          </div>

          <div
            className="w-[38%] rounded-xl bg-[#0F172A] border border-slate-800 p-2.5 shadow-[10px_18px_28px_-8px_rgba(15,23,42,0.3),3px_4px_0_#334155] translate-y-2"
            style={{ transform: 'translateZ(12px)' }}
          >
            <div className="w-6 h-6 rounded-md bg-[#C28E36] mb-2" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/80" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/30" />
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 13. What If Animation Studio — Isometric 4-Frame Storyboard Deck
  if (id === 'what-if-animation-studio') {
    return (
      <IsometricStage bgClass="bg-gradient-to-br from-[#F8FAFC] via-[#FFFDF8] to-[#EEF2F6]">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-[84%] rounded-xl bg-white border border-slate-200/90 p-2.5 shadow-[10px_18px_30px_-10px_rgba(15,23,42,0.22),3px_5px_0_#CBD5E1]">
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-[16/10] rounded-lg overflow-hidden">
                <IsoScreenMedia src={image} alt={imageAlt} />
              </div>
              <div className="aspect-[16/10] rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#2563EB]/40" />
              </div>
              <div className="aspect-[16/10] rounded-lg bg-[#FEF3C7]/60 border border-[#FDE68A]" />
              <div className="aspect-[16/10] rounded-lg bg-[#0F172A]" />
            </div>
          </div>

          <div
            className="absolute -left-1 -bottom-1 w-[44%] h-4 rounded-full bg-[#0F172A] border border-slate-700 px-2 flex items-center gap-1.5 shadow-lg"
            style={{ transform: 'translateZ(26px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#C28E36]" />
            <span className="h-1 flex-1 rounded-full bg-white/35" />
          </div>
        </div>
      </IsometricStage>
    );
  }

  // 14. EleCoStudio — Isometric Shopify Storefront Showcase + Product Shelf
  return (
    <IsometricStage bgClass="bg-gradient-to-br from-[#F8FAFC] via-[#FFFDF8] to-[#EEF2F6]">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-[84%] rounded-xl bg-white border border-slate-200/90 p-2.5 shadow-[10px_18px_30px_-10px_rgba(15,23,42,0.22),3px_5px_0_#CBD5E1]">
          <div className="h-14 rounded-lg overflow-hidden mb-2 relative">
            <IsoScreenMedia src={image} alt={imageAlt} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/40 to-transparent" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="rounded-md bg-[#F8FAFC] border border-slate-100 p-1.5">
                <div
                  className={`h-5 rounded-sm mb-1.5 ${
                    idx === 1
                      ? 'bg-[#DBEAFE]'
                      : idx === 2
                        ? 'bg-[#FEF3C7]'
                        : 'bg-slate-200/80'
                  }`}
                />
                <div className="h-1 w-4/5 rounded-full bg-slate-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Checkout Pill */}
        <div
          className="absolute -right-1 -top-1 rounded-xl bg-[#0F172A] border border-slate-800 px-2.5 py-2 shadow-[8px_16px_26px_-8px_rgba(15,23,42,0.36)] flex items-center gap-1.5"
          style={{ transform: 'translateZ(26px)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
          <span className="h-1.5 w-8 rounded-full bg-white/80" />
        </div>
      </div>
    </IsometricStage>
  );
}
