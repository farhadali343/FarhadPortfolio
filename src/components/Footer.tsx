import { CONTACT_CONFIG, PROFILE } from '../data/portfolioData';
import {
  NavigateFn,
  POLICY_ROUTES,
  PageRoute,
  ROUTE_TO_PATH,
} from '../types/navigation';

interface FooterProps {
  onNavigate: NavigateFn;
}

const FOOTER_PAGES: { label: string; route: PageRoute; sectionId?: string }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Selected Work', route: 'home', sectionId: 'projects' },
  { label: '3D Studio', route: 'home', sectionId: 'studio-3d' },
  { label: 'About', route: 'about' },
  { label: 'Resume', route: 'resume' },
  { label: 'Contact', route: 'contact' },
];

export default function Footer({ onNavigate }: FooterProps) {
  const allLinks = [...CONTACT_CONFIG.channelLinks, ...CONTACT_CONFIG.socialLinks].filter(
    (item) => Boolean(item.href) && !item.isPlaceholder
  );

  const youtubeLinks = allLinks.filter((item) => item.id.startsWith('yt-'));
  const tiktokLinks = allLinks.filter((item) => item.id.startsWith('tt-'));
  const facebookLinks = allLinks.filter((item) => item.id.startsWith('fb-'));
  const socialAndStoreLinks = allLinks.filter(
    (item) =>
      !item.id.startsWith('yt-') && !item.id.startsWith('tt-') && !item.id.startsWith('fb-')
  );

  return (
    <footer className="no-print bg-white relative overflow-hidden">
      {/* Subtle two-layer hairline motion accent */}
      <div aria-hidden="true" className="relative h-[2px] w-full bg-slate-200/80 overflow-hidden">
        <div className="footer-ambient-line h-full w-1/2 bg-gradient-to-r from-transparent via-[#2563EB]/45 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Clean Architectural Footer with Dedicated Pages, Policies & Channels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80">
          {/* Column 1: Brand Positioning & Email */}
          <div className="md:col-span-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-display text-lg font-semibold tracking-tight text-[#0F172A] hover:text-[#2563EB] transition-colors text-left"
            >
              {PROFILE.wordmark}
            </button>
            <p className="mt-3 text-sm text-[#475569] leading-relaxed max-w-[34ch]">
              High-retention media, AI workflows, and digital storefronts built from concept to
              revenue.
            </p>
            <a
              href={`mailto:${CONTACT_CONFIG.email}`}
              className="mt-4 inline-block text-xs font-semibold text-[#2563EB] hover:underline"
            >
              {CONTACT_CONFIG.email}
            </a>
          </div>

          {/* Column 2: Pages Navigation */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-4">
              Pages
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#475569]">
              {FOOTER_PAGES.map((item) => {
                const href = item.sectionId ? `/#${item.sectionId}` : ROUTE_TO_PATH[item.route];
                return (
                  <li key={item.label}>
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.route, item.sectionId);
                      }}
                      className="hover:text-[#0F172A] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: All Policy Pages */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-4">
              Policies
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#475569]">
              {POLICY_ROUTES.map((policy) => (
                <li key={policy.route}>
                  <a
                    href={ROUTE_TO_PATH[policy.route]}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(policy.route);
                    }}
                    className="hover:text-[#0F172A] transition-colors"
                  >
                    {policy.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Clean Platform-Grouped Channels */}
          <div className="md:col-span-4 space-y-3.5 text-xs">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
              Channels &amp; Profiles
            </h2>

            <div className="grid grid-cols-[76px_1fr] gap-2 items-baseline">
              <span className="font-semibold text-[#0F172A]">YouTube</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#475569]">
                {youtubeLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    {item.value}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-[76px_1fr] gap-2 items-baseline">
              <span className="font-semibold text-[#0F172A]">TikTok</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#475569]">
                {tiktokLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    {item.value}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-[76px_1fr] gap-2 items-baseline">
              <span className="font-semibold text-[#0F172A]">Facebook</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#475569]">
                {facebookLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    {item.value}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-[76px_1fr] gap-2 items-baseline">
              <span className="font-semibold text-[#0F172A]">More</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#475569]">
                {socialAndStoreLinks.map((item) => {
                  const shortLabel = item.id.startsWith('shopify-')
                    ? 'EleCoStudio'
                    : item.id.startsWith('fourthwall-')
                      ? 'POV Shop'
                      : item.id === 'app-automation-editor'
                        ? 'Automation Editor'
                        : item.id === 'app-paktransfer'
                          ? 'PakTransfer'
                          : item.label;
                  return (
                    <a
                      key={item.id}
                      href={item.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#2563EB] transition-colors"
                    >
                      {shortLabel}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#475569]">
          <p>&copy; 2026 Farhad Ali</p>
          <p>{PROFILE.locationLine}</p>
        </div>
      </div>
    </footer>
  );
}
