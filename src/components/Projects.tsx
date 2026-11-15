import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  CURATED_PROJECT_TABS,
  CuratedProjectTab,
  ProjectCaseStudy,
  getPublicProjects,
} from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';
import ProjectVisualHeader3D from './ProjectVisualHeader3D';

interface ProjectsProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const [selectedTab, setSelectedTab] = useState<CuratedProjectTab>('All Work');
  const publicProjects = getPublicProjects();

  const filteredProjects =
    selectedTab === 'All Work'
      ? publicProjects
      : publicProjects.filter((project) => project.curatedTabs.includes(selectedTab));

  return (
    <section id="projects" className="py-24 lg:py-32 border-b border-slate-200/80 bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Curated Agency Showcase Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Selected Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance max-w-2xl">
              Selected Portfolio &amp; Case Studies.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#475569] max-w-[46ch] leading-relaxed">
            Production channels, editorial publications, storefronts, and AI prototypes built from
            concept to release.
          </p>
        </div>

        {/* 5 Curated Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter portfolio work by category"
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200/90 studio-card-shadow rounded-full mb-12"
        >
          {CURATED_PROJECT_TABS.map((tab) => {
            const active = selectedTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  active
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Uniform 3-Column Agency Showcase Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            {filteredProjects.map((project) => (
              <TiltCard3D
                key={project.id}
                maxTilt={4.5}
                liftZ={10}
                className="h-full rounded-2xl bg-white border border-slate-200/90 studio-card-shadow overflow-hidden"
              >
                <article className="group h-full flex flex-col justify-between">
                  <div className="flex-1 flex flex-col">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="w-full text-left block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB]"
                      aria-label={`View case study for ${project.title}`}
                    >
                      <ProjectVisualHeader3D project={project} />
                    </button>

                    <div className="p-7 sm:p-8 flex-1 flex flex-col">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                        {project.categoryEyebrow}
                      </div>

                      <h3 className="font-display text-xl font-semibold tracking-tight text-[#0F172A] leading-snug">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm text-[#475569] leading-relaxed line-clamp-2">
                        {project.cardSummary}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 sm:px-8 pb-7 pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </article>
              </TiltCard3D>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl studio-card-shadow p-12 text-center">
            <p className="font-display text-lg font-semibold text-[#0F172A]">
              No projects listed under &ldquo;{selectedTab}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSelectedTab('All Work')}
              className="mt-4 inline-flex items-center px-5 py-2.5 text-xs font-semibold text-white bg-[#0F172A] rounded-full hover:bg-[#2563EB] transition-colors"
            >
              Show All Work
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
