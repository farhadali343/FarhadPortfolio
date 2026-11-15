import { CONTACT_CONFIG, PROFILE } from '../data/portfolioData';

const FOOTER_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'studio-3d', label: '3D Studio' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const activeSocials = CONTACT_CONFIG.socialLinks.filter(
    (s) => Boolean(s.href) && !s.isPlaceholder
  );
  const activeChannels = CONTACT_CONFIG.channelLinks.filter(
    (c) => Boolean(c.href) && !c.isPlaceholder
  );

  return (
    <footer className="no-print bg-white relative overflow-hidden">
      {/* Subtle two-layer hairline motion accent */}
      <div aria-hidden="true" className="relative h-[2px] w-full bg-slate-200/80 overflow-hidden">
        <div className="footer-ambient-line h-full w-1/2 bg-gradient-to-r from-transparent via-[#2563EB]/45 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200/80">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <div className="font-display text-lg font-bold tracking-tight text-[#0F172A]">
              {PROFILE.wordmark}
            </div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-[42ch]">
              {PROFILE.primaryPositioning}. Structured digital content, AI-directed video
              production, and multi-platform operations.
            </p>
            <a
              href={`mailto:${CONTACT_CONFIG.email}`}
              className="mt-4 inline-block text-xs font-semibold text-[#2563EB] hover:underline"
            >
              {CONTACT_CONFIG.email}
            </a>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-3">
              Navigation
            </h2>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-600">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="hover:text-[#0F172A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Channel Links */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2.5">
                Business Social Media
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeSocials.map((social) => (
                  <li key={social.id} className="flex items-baseline justify-between gap-2">
                    <span className="text-[#0F172A] font-medium">{social.label}</span>
                    <a
                      href={social.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2563EB] hover:underline truncate"
                    >
                      {social.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200/80">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2.5">
                Channels &amp; Storefronts
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeChannels.map((channel) => (
                  <li key={channel.id} className="flex items-baseline justify-between gap-2">
                    <span className="text-[#0F172A] font-medium">{channel.label}</span>
                    <a
                      href={channel.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2563EB] hover:underline truncate"
                    >
                      {channel.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
          <p>&copy; {currentYear} {PROFILE.name}. All rights reserved.</p>
          <p>{PROFILE.locationLine}</p>
        </div>
      </div>
    </footer>
  );
}
