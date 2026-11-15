import { useState } from 'react';
import { ArrowUpRight, Film, FileText, Layers, Sparkles } from 'lucide-react';
import {
  PROJECT_CATEGORIES,
  ProjectCaseStudy,
  ProjectCategory,
  getPublicProjects,
} from '../data/portfolioData';

interface ProjectsProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

function ProjectVisualPlate({ project }: { project: ProjectCaseStudy }) {
  const [imgError, setImgError] = useState(false);

  if (project.image && !imgError) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#15191F] border-b border-[#E5E7EB]">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const getDomainIcon = () => {
    switch (project.primaryCategory) {
      case 'Video Production':
        return <Film className="w-5 h-5 text-[#2563EB]" />;
      case 'Writing & Research':
        return <FileText className="w-5 h-5 text-[#2563EB]" />;
      case 'AI & Digital Projects':
        return <Sparkles className="w-5 h-5 text-[#2563EB]" />;
      default:
        return <Layers className="w-5 h-5 text-[#2563EB]" />;
    }
  };

  return (
    <div className="aspect-[4/3] w-full bg-[#F8F9FB] border-b border-[#E5E7EB] p-5 flex flex-col justify-between transition-colors duration-200 group-hover:bg-[#F1F4F9]">
      <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#68717D]">
        <span>{project.visualCode}</span>
        <span>{project.primaryCategory}</span>
      </div>

      <div className="my-auto py-3">
        <div className="w-10 h-10 rounded-md bg-white border border-[#E5E7EB] flex items-center justify-center mb-3">
          {getDomainIcon()}
        </div>
        <div className="font-display text-lg font-semibold text-[#15191F] leading-snug">
          {project.title}
        </div>
        {project.results[0] && (
          <div className="mt-1 text-xs font-mono-tabular text-[#2563EB]">
            {project.results[0].metric}
          </div>
        )}
      </div>

      <div className="text-[11px] text-[#68717D] truncate">
        {project.tools.slice(0, 3).join(' · ')}
      </div>
    </div>
  );
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All Projects');
  const publicProjects = getPublicProjects();

  const filteredProjects =
    selectedCategory === 'All Projects'
      ? publicProjects
      : publicProjects.filter((project) => project.categories.includes(selectedCategory));

  return (
    <section id="projects" className="py-16 lg:py-24 border-b border-[#E5E7EB] bg-[#F8F9FB]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Selected Portfolio &amp; Case Studies
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#15191F] text-balance max-w-2xl">
              Actual production systems, channels, and digital initiatives.
            </h2>
          </div>
          <p className="text-sm text-[#68717D] max-w-[46ch]">
            Select any project to inspect the full case study, creative direction workflow, verified audit figures, and deliverables.
          </p>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#E5E7EB] rounded-lg mb-10"
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
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  active
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#68717D] hover:text-[#15191F] hover:bg-[#F8F9FB]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Project Gallery Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group bg-white border border-[#E5E7EB] rounded-lg overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-[#94A3B8]"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="w-full text-left block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB]"
                    aria-label={`Open case study for ${project.title}`}
                  >
                    <ProjectVisualPlate project={project} />
                  </button>

                  <div className="p-5 sm:p-6">
                    {/* Unboxed Metadata Line */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#68717D] mb-2">
                      <span className="font-medium text-[#2563EB]">{project.primaryCategory}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.statusLabel}</span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-[#15191F] leading-snug">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-[#68717D]">{project.role}</p>

                    <p className="mt-3 text-sm text-[#68717D] leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
                  <span className="text-xs font-mono-tabular text-[#68717D] truncate">
                    {project.results[0]?.metric ?? project.timeframe}
                  </span>

                  <div className="flex items-center gap-3 shrink-0">
                    {project.externalLinks[0]?.url && !project.externalLinks[0].isPending && (
                      <a
                        href={project.externalLinks[0].url}
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
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#15191F] hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
                    >
                      Case Study
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-10 text-center">
            <p className="font-display text-lg font-semibold text-[#15191F]">
              No public projects listed under &ldquo;{selectedCategory}&rdquo; yet.
            </p>
            <p className="mt-1 text-sm text-[#68717D]">
              Unverified items remain omitted until confirmed. View all verified and active projects instead.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('All Projects')}
              className="mt-4 inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-[#2563EB] rounded-md hover:bg-[#1D4ED8] transition-colors"
            >
              Show All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
