import { ProjectCaseStudy } from '../data/portfolioData';

interface ProjectVisualHeader3DProps {
  project: ProjectCaseStudy;
}

export default function ProjectVisualHeader3D({ project }: ProjectVisualHeader3DProps) {
  const category = project.primaryCategory;
  const primaryMetric = project.results[0]?.metric ?? project.timeframe;

  if (category === 'YouTube' || category === 'Video Production') {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#F1F5F9] via-[#F8FAFC] to-[#E8F0FE] border-b border-slate-200/80 p-5 flex flex-col justify-between">
        {/* Top Metadata Row */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tabular text-slate-500">
          <span className="font-semibold text-[#0F172A]">{project.visualCode}</span>
          <span>{category}</span>
        </div>

        {/* Isometric 3D Timeline & Viewport Mockup */}
        <div
          className="relative z-10 mx-auto w-[88%] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]"
          style={{ transform: 'perspective(900px) rotateX(10deg) rotateY(-10deg)' }}
        >
          {/* Floating Back Layer */}
          <div className="rounded-xl bg-white border border-slate-200/90 p-3 shadow-[0_18px_32px_-14px_rgba(15,23,42,0.16)]">
            {/* Top Frame Bar */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                <span className="w-2 h-2 rounded-full bg-[#C28E36]" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
              </div>
              <span className="font-mono-tabular text-[10px] text-slate-400">24 FPS · HD</span>
            </div>

            {/* Preview Frame + Waveform Bars */}
            <div className="grid grid-cols-12 gap-2.5 items-center">
              <div className="col-span-5 h-16 rounded-lg bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] flex items-center justify-center relative overflow-hidden">
                <div className="w-7 h-7 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                  <div className="ml-0.5 w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-white" />
                </div>
              </div>
              <div className="col-span-7 space-y-1.5">
                <div className="h-2 w-4/5 rounded bg-slate-200" />
                <div className="h-2 w-3/5 rounded bg-slate-100" />
                <div className="pt-1 flex items-end gap-1 h-6">
                  {[45, 80, 60, 95, 70, 50, 88, 65].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i % 3 === 0 ? '#2563EB' : '#CBD5E1',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom NLE Track Strip */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5">
              <div className="h-2.5 flex-[2] rounded-sm bg-[#2563EB]/85" />
              <div className="h-2.5 flex-[3] rounded-sm bg-[#C28E36]/70" />
              <div className="h-2.5 flex-1 rounded-sm bg-slate-300" />
            </div>
          </div>
        </div>

        {/* Bottom Metric Caption */}
        <div className="relative z-10 flex items-center justify-between text-[11px]">
          <span className="font-mono-tabular font-semibold text-[#2563EB]">{primaryMetric}</span>
          <span className="text-slate-500 truncate max-w-[55%]">{project.tools.slice(0, 2).join(' · ')}</span>
        </div>
      </div>
    );
  }

  if (category === 'AI & Digital Projects' || category === 'Social Media') {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#F4F6FA] via-[#FFFFFF] to-[#EEF4FF] border-b border-slate-200/80 p-5 flex flex-col justify-between">
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tabular text-slate-500">
          <span className="font-semibold text-[#0F172A]">{project.visualCode}</span>
          <span>{category}</span>
        </div>

        {/* Isometric Layered Node / Social Workflow Card */}
        <div
          className="relative z-10 mx-auto w-[86%] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]"
          style={{ transform: 'perspective(900px) rotateX(11deg) rotateY(9deg)' }}
        >
          <div className="rounded-xl bg-white border border-slate-200/90 p-3.5 shadow-[0_18px_32px_-14px_rgba(15,23,42,0.15)]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-mono-tabular font-semibold uppercase tracking-wider text-[#2563EB]">
                Pipeline Nodes
              </span>
              <span className="text-[10px] font-mono-tabular text-[#C28E36] font-medium">
                {project.status === 'in_progress' ? 'R&D Build' : 'Live System'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {['Prompt', 'Direct', 'Publish'].map((stage, idx) => (
                <div
                  key={stage}
                  className="rounded-lg border border-slate-200/80 bg-[#F8FAFC] p-2 text-center"
                >
                  <div
                    className={`mx-auto mb-1.5 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono-tabular font-bold ${
                      idx === 1
                        ? 'bg-[#2563EB] text-white'
                        : idx === 2
                          ? 'bg-[#C28E36]/15 text-[#9A6B1E]'
                          : 'bg-white border border-slate-200 text-[#0F172A]'
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <div className="text-[10px] font-medium text-[#0F172A]">{stage}</div>
                </div>
              ))}
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono-tabular text-slate-400">
              <span>Input → QA</span>
              <span className="text-[#0F172A] font-semibold">{primaryMetric}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px]">
          <span className="font-mono-tabular font-semibold text-[#2563EB]">{primaryMetric}</span>
          <span className="text-slate-500 truncate max-w-[55%]">{project.tools.slice(0, 2).join(' · ')}</span>
        </div>
      </div>
    );
  }

  if (category === 'E-commerce') {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-[#FFFDF8] to-[#F1F5F9] border-b border-slate-200/80 p-5 flex flex-col justify-between">
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tabular text-slate-500">
          <span className="font-semibold text-[#0F172A]">{project.visualCode}</span>
          <span>{category}</span>
        </div>

        {/* Isometric Storefront Plinth & Product Cards */}
        <div
          className="relative z-10 mx-auto w-[86%] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]"
          style={{ transform: 'perspective(900px) rotateX(10deg) rotateY(-8deg)' }}
        >
          <div className="rounded-xl bg-white border border-slate-200/90 p-3.5 shadow-[0_18px_32px_-14px_rgba(15,23,42,0.14)]">
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
              <span className="text-[10px] font-semibold text-[#0F172A]">Storefront Catalog</span>
              <span className="text-[10px] font-mono-tabular text-[#C28E36] font-semibold">
                Active Store
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-lg bg-[#F8FAFC] border border-slate-200/80 p-2.5">
                <div className="h-10 rounded-md bg-gradient-to-tr from-slate-200 to-slate-100 mb-2 border border-white" />
                <div className="h-2 w-3/4 rounded bg-slate-300" />
                <div className="mt-1 h-2 w-1/2 rounded bg-[#2563EB]/40" />
              </div>
              <div className="rounded-lg bg-[#F8FAFC] border border-slate-200/80 p-2.5">
                <div className="h-10 rounded-md bg-gradient-to-tr from-[#E8F0FE] to-[#F8FAFC] mb-2 border border-white" />
                <div className="h-2 w-4/5 rounded bg-slate-300" />
                <div className="mt-1 h-2 w-1/2 rounded bg-[#C28E36]/45" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px]">
          <span className="font-mono-tabular font-semibold text-[#2563EB]">{primaryMetric}</span>
          <span className="text-slate-500 truncate max-w-[55%]">{project.tools.slice(0, 2).join(' · ')}</span>
        </div>
      </div>
    );
  }

  // Editorial / Writing & Research / Affiliate Marketing
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-[#F4F6FB] to-[#EEF2F7] border-b border-slate-200/80 p-5 flex flex-col justify-between">
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tabular text-slate-500">
        <span className="font-semibold text-[#0F172A]">{project.visualCode}</span>
        <span>{category}</span>
      </div>

      {/* Isometric Stacked Editorial Manuscript / Curation Sheets */}
      <div
        className="relative z-10 mx-auto w-[86%] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]"
        style={{ transform: 'perspective(900px) rotateX(10deg) rotateY(8deg)' }}
      >
        <div className="rounded-xl bg-white border border-slate-200/90 p-3.5 shadow-[0_18px_32px_-14px_rgba(15,23,42,0.14)]">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
            <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#2563EB] font-semibold">
              Editorial Index
            </span>
            <span className="text-[10px] font-mono-tabular text-slate-400">SEO · Curation</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[10px] font-mono-tabular font-bold text-[#2563EB]">
                A
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-2 w-5/6 rounded bg-slate-200" />
                <div className="h-1.5 w-3/5 rounded bg-slate-100" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#C28E36]/15 border border-[#C28E36]/30 flex items-center justify-center text-[10px] font-mono-tabular font-bold text-[#9A6B1E]">
                B
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-2 w-4/5 rounded bg-slate-200" />
                <div className="h-1.5 w-2/5 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px]">
        <span className="font-mono-tabular font-semibold text-[#2563EB]">{primaryMetric}</span>
        <span className="text-slate-500 truncate max-w-[55%]">{project.tools.slice(0, 2).join(' · ')}</span>
      </div>
    </div>
  );
}
