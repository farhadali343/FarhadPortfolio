import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { POLICY_DOCUMENTS } from '../data/policiesData';
import { NavigateFn, POLICY_ROUTES, PageRoute } from '../types/navigation';

interface PolicyPageProps {
  activeRoute: PageRoute;
  onNavigate: NavigateFn;
}

export default function PolicyPage({ activeRoute, onNavigate }: PolicyPageProps) {
  const activePolicy =
    POLICY_DOCUMENTS.find((doc) => doc.route === activeRoute) ?? POLICY_DOCUMENTS[0];

  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80 min-h-[70vh]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#2563EB] transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Policy Switcher Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>All Studio Policies</span>
            </div>

            <nav aria-label="Policy Documents" className="space-y-1.5">
              {POLICY_ROUTES.map((item) => {
                const isSelected = activePolicy.route === item.route;
                return (
                  <button
                    key={item.route}
                    type="button"
                    onClick={() => onNavigate(item.route)}
                    aria-current={isSelected ? 'page' : undefined}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-[#0F172A] text-white font-semibold'
                        : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-[#475569] leading-relaxed">
              Questions regarding privacy, copyright, or disclosures? Email{' '}
              <a
                href="mailto:farhad0official@gmail.com"
                className="font-semibold text-[#2563EB] hover:underline"
              >
                farhad0official@gmail.com
              </a>
              .
            </div>
          </aside>

          {/* Right Policy Document Body */}
          <article className="lg:col-span-8 rounded-3xl bg-white border border-slate-200/90 studio-card-shadow p-8 sm:p-12">
            <div className="pb-8 mb-8 border-b border-slate-200/80">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                  {activePolicy.eyebrow}
                </span>
                <span className="font-mono-tabular text-xs text-[#475569]">
                  Effective: {activePolicy.lastUpdated}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A]">
                {activePolicy.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed">
                {activePolicy.subtitle}
              </p>
            </div>

            <div className="space-y-9">
              {activePolicy.sections.map((block) => (
                <section key={block.heading} className="space-y-3">
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-[#0F172A]">
                    {block.heading}
                  </h2>
                  {block.paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-[15px] text-[#475569] leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {block.bullets && block.bullets.length > 0 && (
                    <ul className="pt-1 space-y-2 text-sm text-[#0F172A]">
                      {block.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <span className="font-mono-tabular text-[#2563EB] mt-0.5">—</span>
                          <span className="text-[#475569]">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
