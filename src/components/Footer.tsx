import { CONTACT_CONFIG, PROFILE } from '../data/portfolioData';

const FOOTER_NAV = [
  { id: 'projects', label: 'Work' },
  { id: 'studio-3d', label: '3D Studio' },
  { id: 'expertise', label: 'Capabilities' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const verifiedLinks = [
    ...CONTACT_CONFIG.channelLinks.filter((c) => Boolean(c.href) && !c.isPlaceholder),
    ...CONTACT_CONFIG.socialLinks.filter((s) => Boolean(s.href) && !s.isPlaceholder),
  ];

  return (
    <footer className="no-print bg-white relative overflow-hidden">
      {/* Subtle two-layer hairline motion accent */}
      <div aria-hidden="true" className="relative h-[2px] w-full bg-slate-200/80 overflow-hidden">
        <div className="footer-ambient-line h-full w-1/2 bg-gradient-to-r from-transparent via-[#2563EB]/45 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Clean 3-Column Architectural Footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80">
          {/* Column 1: Brand Positioning & Email */}
          <div className="md:col-span-4">
            <div className="font-display text-lg font-semibold tracking-tight text-[#0F172A]">
              {PROFILE.wordmark}
            </div>
            <p className="mt-3 text-sm text-[#475569] leading-relaxed max-w-[36ch]">
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

          {/* Column 2: Navigation */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-4">
              Navigation
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-2.5 gap-x-4 text-xs sm:text-[13px] text-[#475569]">
              {FOOTER_NAV.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="hover:text-[#0F172A] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Channels & Profiles */}
          <div className="md:col-span-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-4">
              Verified Channels &amp; Storefronts
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
              {verifiedLinks.map((item) => (
                <li key={item.id} className="truncate">
                  <a
                    href={item.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#475569] hover:text-[#2563EB] transition-colors"
                  >
                    <span className="font-semibold text-[#0F172A]">
                      {item.label.split(' — ')[0]}
                    </span>
                    <span className="mx-1.5 text-slate-300">·</span>
                    <span>{item.value}</span>
                  </a>
                </li>
              ))}
            </ul>
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
