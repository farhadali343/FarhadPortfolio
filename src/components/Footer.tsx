import { CONTACT_CONFIG, PROFILE } from '../data/portfolioData';

const FOOTER_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print bg-white relative overflow-hidden">
      {/* Subtle two-layer hairline motion accent */}
      <div aria-hidden="true" className="relative h-[2px] w-full bg-[#E5E7EB] overflow-hidden">
        <div className="footer-ambient-line h-full w-1/2 bg-gradient-to-r from-transparent via-[#2563EB]/45 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E5E7EB]">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <div className="font-display text-lg font-bold tracking-tight text-[#15191F]">
              {PROFILE.wordmark}
            </div>
            <p className="mt-2 text-sm text-[#68717D] leading-relaxed max-w-[42ch]">
              {PROFILE.primaryPositioning}. Structured digital content, AI-directed video production, and multi-platform operations.
            </p>
            <a
              href={`mailto:${CONTACT_CONFIG.email}`}
              className="mt-4 inline-block text-xs font-medium text-[#2563EB] hover:underline"
            >
              {CONTACT_CONFIG.email}
            </a>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#15191F] mb-3">
              Navigation
            </h2>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-[#68717D]">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="hover:text-[#15191F] transition-colors"
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
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#15191F] mb-2.5">
                Business Social Media
              </h2>
              <ul className="space-y-1.5 text-xs text-[#68717D]">
                {CONTACT_CONFIG.socialLinks.map((social) => (
                  <li key={social.id} className="flex items-baseline justify-between gap-2">
                    <span className="text-[#15191F] font-medium">{social.label}</span>
                    {social.href && !social.isPlaceholder ? (
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2563EB] hover:underline truncate"
                      >
                        {social.value}
                      </a>
                    ) : (
                      <span>Pending link</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#E5E7EB]">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#15191F] mb-2.5">
                Channels
              </h2>
              <ul className="space-y-1.5 text-xs text-[#68717D]">
                {CONTACT_CONFIG.channelLinks.map((channel) => (
                  <li key={channel.id} className="flex items-baseline justify-between gap-2">
                    <span className="text-[#15191F] font-medium">{channel.label}</span>
                    {channel.href && !channel.isPlaceholder ? (
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2563EB] hover:underline truncate"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <span>Pending link</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#68717D]">
          <p>&copy; {currentYear} {PROFILE.name}. All rights reserved.</p>
          <p>{PROFILE.locationLine}</p>
        </div>
      </div>
    </footer>
  );
}
