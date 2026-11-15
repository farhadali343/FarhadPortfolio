import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  PROJECT_CATEGORIES,
  ProjectCaseStudy,
  ProjectCategory,
  getPublicProjects,
} from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';
import ProjectVisualHeader3D from './ProjectVisualHeader3D';

interface ProjectsProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All Projects');
  const publicProjects = getPublicProjects();

  const filteredProjects =
    selectedCategory === 'All Projects'
      ? publicProjects
      : publicProjects.filter((project) => project.categories.includes(selectedCategory));

  return (
    <section id="projects" className="py-16 lg:py-24 border-b border-slate-200/80 bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Selected Portfolio &amp; Case Studies
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] text-balance max-w-2xl">
              Production systems, media channels, and digital initiatives.
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-[46ch]">
            Select any project card to open its full Case Study Drawer with deliverables, audit
            outcomes, and execution workflow.
          </p>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200/90 studio-card-shadow rounded-xl mb-10"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  active
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Uniform-Height 3-Column 3D Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredProjects.map((project) => {
              const liveLink = project.externalLinks.find(
                (link) => link.url && !link.isPending
              );

              return (
                <TiltCard3D
                  key={project.id}
                  maxTilt={5}
                  liftZ={10}
                  className="h-full rounded-2xl bg-white border border-slate-200/90 studio-card-shadow overflow-hidden"
                >
                  <article className="group h-full flex flex-col justify-between">
                    <div className="flex-1 flex flex-col">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="w-full text-left block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB]"
                        aria-label={`Open case study for ${project.title}`}
                      >
                        <ProjectVisualHeader3D project={project} />
                      </button>

                      <div className="p-5 sm:p-6 flex-1 flex flex-col">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-2">
                          <span className="font-semibold text-[#2563EB]">
                            {project.primaryCategory}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{project.statusLabel}</span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-[#0F172A] leading-snug">
                          {project.title}
                        </h3>

                        <p className="mt-1 text-xs font-medium text-slate-500">{project.role}</p>

                        <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {project.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 sm:px-6 pb-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <span className="text-xs font-mono-tabular text-slate-500 truncate">
                        {project.results[0]?.metric ?? project.timeframe}
                      </span>

                      <div className="flex items-center gap-3 shrink-0">
                        {liveLink?.url && (
                          <a
                            href={liveLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#2563EB] hover:underline whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
                          >
                            Visit
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
                        >
                          Case Study
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                </TiltCard3D>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl studio-card-shadow p-10 text-center">
            <p className="font-display text-lg font-semibold text-[#0F172A]">
              No projects listed under &ldquo;{selectedCategory}&rdquo;.
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Browse all active creative projects and case studies.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('All Projects')}
              className="mt-4 inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-[#2563EB] rounded-xl hover:bg-[#1D4ED8] transition-colors"
            >
              Show All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
