import { useState } from 'react';
import {
  AttributionLevel,
  EXPERTISE_CATEGORIES,
  TOOL_ECOSYSTEM,
} from '../data/portfolioData';

type AttributionFilter = 'All' | AttributionLevel;

const ATTRIBUTION_OPTIONS: AttributionFilter[] = [
  'All',
  'Hands-on',
  'AI-assisted / Directed',
  'Learning / Experimental',
];

export default function Expertise() {
  const [attributionFilter, setAttributionFilter] = useState<AttributionFilter>('All');

  const getAttributionStyle = (level: AttributionLevel) => {
    switch (level) {
      case 'Hands-on':
        return 'text-[#15191F]';
      case 'AI-assisted / Directed':
        return 'text-[#2563EB]';
      case 'Learning / Experimental':
        return 'text-[#68717D]';
    }
  };

  return (
    <section id="expertise" className="py-16 lg:py-24 border-b border-[#E5E7EB] bg-[#F8F9FB]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header & Transparent Attribution Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Expertise &amp; Tool Ecosystem
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#15191F] text-balance max-w-2xl">
              Eight core disciplines backed by clear role attribution.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#68717D] max-w-[65ch]">
              Every capability and tool below distinguishes personal hands-on execution, workflows directed through AI systems, and experimental areas currently in active development.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter skills and tools by execution type"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-[#E5E7EB] rounded-lg self-start lg:self-auto"
          >
            {ATTRIBUTION_OPTIONS.map((option) => {
              const active = attributionFilter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAttributionFilter(option)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    active
                      ? 'bg-[#15191F] text-white'
                      : 'text-[#68717D] hover:text-[#15191F]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* 8 Expertise Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXPERTISE_CATEGORIES.map((category) => {
            const visibleSkills =
              attributionFilter === 'All'
                ? category.skills
                : category.skills.filter((skill) => skill.attribution === attributionFilter);

            return (
              <article
                key={category.id}
                className="bg-white border border-[#E5E7EB] rounded-lg p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2 pb-3 mb-3 border-b border-[#E5E7EB]">
                    <h3 className="font-display text-base font-semibold text-[#15191F]">
                      {category.title}
                    </h3>
                    <span className="font-mono-tabular text-xs text-[#68717D]">
                      {category.index}
                    </span>
                  </div>

                  <p className="text-xs text-[#68717D] leading-relaxed mb-4">
                    {category.description}
                  </p>

                  {visibleSkills.length > 0 ? (
                    <ul className="space-y-2.5">
                      {visibleSkills.map((skill) => (
                        <li key={skill.name} className="text-xs leading-snug">
                          <div className="font-medium text-[#15191F]">{skill.name}</div>
                          <div className={`mt-0.5 text-[11px] ${getAttributionStyle(skill.attribution)}`}>
                            {skill.attribution}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-[#68717D] italic py-2">
                      No items in this category match &ldquo;{attributionFilter}&rdquo;.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Categorized Tool Ecosystem */}
        <div className="mt-12 pt-10 border-t border-[#E5E7EB]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#15191F]">
              Categorized Tool Ecosystem
            </h3>
            <p className="text-xs text-[#68717D]">
              AI-directed rendering &amp; code workflows are labeled explicitly as AI-assisted / Directed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOL_ECOSYSTEM.map((group) => {
              const visibleTools =
                attributionFilter === 'All'
                  ? group.tools
                  : group.tools.filter((tool) => tool.attribution === attributionFilter);

              return (
                <div
                  key={group.id}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-5"
                >
                  <h4 className="font-display text-sm font-semibold text-[#15191F] pb-3 mb-3 border-b border-[#E5E7EB]">
                    {group.category}
                  </h4>

                  {visibleTools.length > 0 ? (
                    <ul className="divide-y divide-[#E5E7EB]/70">
                      {visibleTools.map((tool) => (
                        <li
                          key={tool.name}
                          className="py-2 first:pt-0 last:pb-0 flex items-baseline justify-between gap-3 text-xs"
                        >
                          <span className="font-medium text-[#15191F]">{tool.name}</span>
                          <span className={`shrink-0 text-[11px] ${getAttributionStyle(tool.attribution)}`}>
                            {tool.attribution}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-[#68717D] italic">
                      No tools match &ldquo;{attributionFilter}&rdquo;.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
