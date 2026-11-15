import { useState } from 'react';
import {
  AttributionLevel,
  EXPERTISE_CATEGORIES,
  TOOL_ECOSYSTEM,
} from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';

type AttributionFilter = 'All' | AttributionLevel;

const ATTRIBUTION_OPTIONS: AttributionFilter[] = [
  'All',
  'Hands-on',
  'AI-assisted / Directed',
  'Learning / Experimental',
];

export default function Expertise() {
  const [attributionFilter, setAttributionFilter] = useState<AttributionFilter>('All');

  const getAttributionPillStyle = (level: AttributionLevel) => {
    switch (level) {
      case 'Hands-on':
        return 'bg-slate-100 text-[#0F172A] border-slate-200';
      case 'AI-assisted / Directed':
        return 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20';
      case 'Learning / Experimental':
        return 'bg-[#C28E36]/12 text-[#9A6B1E] border-[#C28E36]/30';
    }
  };

  return (
    <section id="expertise" className="py-16 lg:py-24 border-b border-slate-200/80 bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Role Attribution Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Expertise &amp; Tool Ecosystem
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] text-balance max-w-2xl">
              Eight core disciplines backed by clear role attribution.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-[65ch]">
              Filter by hands-on execution, AI-directed production workflows, or experimental R&amp;D
              initiatives.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter skills and tools by execution type"
            className="inline-flex flex-wrap items-center gap-1 p-1.5 bg-white border border-slate-200/90 studio-card-shadow rounded-xl self-start lg:self-auto"
          >
            {ATTRIBUTION_OPTIONS.map((option) => {
              const active = attributionFilter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAttributionFilter(option)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    active
                      ? 'bg-[#0F172A] text-white'
                      : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* 8 Uniform-Height 3D Expertise Cards (01 through 08) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {EXPERTISE_CATEGORIES.map((category, idx) => {
            const visibleSkills =
              attributionFilter === 'All'
                ? category.skills
                : category.skills.filter((skill) => skill.attribution === attributionFilter);

            const formattedIndex = String(idx + 1).padStart(2, '0');

            return (
              <TiltCard3D
                key={category.id}
                maxTilt={5}
                liftZ={8}
                className="h-full rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-5 flex flex-col justify-between"
              >
                <article className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 pb-3 mb-3 border-b border-slate-200/80">
                      <h3 className="font-display text-base font-bold text-[#0F172A]">
                        {category.title}
                      </h3>
                      <span className="font-mono-tabular text-xs font-semibold text-[#2563EB]">
                        {formattedIndex}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {category.description}
                    </p>

                    {visibleSkills.length > 0 ? (
                      <ul className="space-y-3">
                        {visibleSkills.map((skill) => (
                          <li key={skill.name} className="text-xs leading-snug">
                            <div className="font-medium text-[#0F172A] mb-1">{skill.name}</div>
                            <span
                              className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${getAttributionPillStyle(
                                skill.attribution
                              )}`}
                            >
                              {skill.attribution}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-500 italic py-2">
                        No skills in this category match &ldquo;{attributionFilter}&rdquo;.
                      </p>
                    )}
                  </div>
                </article>
              </TiltCard3D>
            );
          })}
        </div>

        {/* Categorized 3D Tool Ecosystem Matrix */}
        <div className="mt-14 pt-12 border-t border-slate-200/80">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A]">
              Categorized Tool Ecosystem
            </h3>
            <p className="text-xs text-slate-500">
              Color-coded role attribution across creative, video, publishing, and AI tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {TOOL_ECOSYSTEM.map((group) => {
              const visibleTools =
                attributionFilter === 'All'
                  ? group.tools
                  : group.tools.filter((tool) => tool.attribution === attributionFilter);

              return (
                <TiltCard3D
                  key={group.id}
                  maxTilt={4}
                  liftZ={6}
                  className="h-full rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-5"
                >
                  <h4 className="font-display text-sm font-bold text-[#0F172A] pb-3 mb-3 border-b border-slate-200/80">
                    {group.category}
                  </h4>

                  {visibleTools.length > 0 ? (
                    <ul className="divide-y divide-slate-100">
                      {visibleTools.map((tool) => (
                        <li
                          key={tool.name}
                          className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
                        >
                          <span className="font-medium text-[#0F172A]">{tool.name}</span>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${getAttributionPillStyle(
                              tool.attribution
                            )}`}
                          >
                            {tool.attribution}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      No tools match &ldquo;{attributionFilter}&rdquo;.
                    </p>
                  )}
                </TiltCard3D>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
