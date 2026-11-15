import { ReactNode } from 'react';

interface PlatformLogoItem {
  id: string;
  name: string;
  role: string;
  renderLogo: (idSuffix: string) => ReactNode;
}

const PLATFORMS: PlatformLogoItem[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    role: 'Business & Reels',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#1877F2" />
        <path
          d="M15.6 12.8l.45-2.9h-2.8V8.02c0-.8.39-1.57 1.64-1.57h1.27V3.98S15 3.78 13.9 3.78c-2.3 0-3.8 1.4-3.8 3.92v2.2H7.54v2.9h2.56V20h3.15v-7.2h2.35z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    role: 'Creator & Reels',
    renderLogo: (idSuffix) => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <defs>
          <linearGradient id={`ig-brand-grad-${idSuffix}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F58529" />
            <stop offset="45%" stopColor="#DD2A7B" />
            <stop offset="78%" stopColor="#8134AF" />
            <stop offset="100%" stopColor="#515BD4" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="6" fill={`url(#ig-brand-grad-${idSuffix})`} />
        <rect
          x="5.8"
          y="5.8"
          width="12.4"
          height="12.4"
          rx="3.6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.7"
        />
        <circle cx="12" cy="12" r="3.1" fill="none" stroke="#FFFFFF" strokeWidth="1.7" />
        <circle cx="15.8" cy="8.2" r="0.95" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    role: 'Channel Growth',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-7" aria-hidden="true">
        <rect x="1.5" y="4.5" width="21" height="15" rx="4.2" fill="#FF0000" />
        <path d="M10 9.1L15.6 12L10 14.9V9.1Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    role: 'Short-Form Network',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="#0F172A" />
        <path
          d="M15.4 6.6c.6.8 1.5 1.3 2.5 1.4v2.1c-1 0-1.9-.3-2.6-.8v4.3a3.7 3.7 0 1 1-3.1-3.65v2.15a1.65 1.65 0 1 0 1.05 1.54V6.6h2.15z"
          fill="#25F4EE"
          transform="translate(-0.45, -0.35)"
        />
        <path
          d="M15.4 6.6c.6.8 1.5 1.3 2.5 1.4v2.1c-1 0-1.9-.3-2.6-.8v4.3a3.7 3.7 0 1 1-3.1-3.65v2.15a1.65 1.65 0 1 0 1.05 1.54V6.6h2.15z"
          fill="#FE2C55"
          transform="translate(0.45, 0.35)"
        />
        <path
          d="M15.4 6.6c.6.8 1.5 1.3 2.5 1.4v2.1c-1 0-1.9-.3-2.6-.8v4.3a3.7 3.7 0 1 1-3.1-3.65v2.15a1.65 1.65 0 1 0 1.05 1.54V6.6h2.15z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'ebay',
    name: 'eBay',
    role: 'Marketplace Ops',
    renderLogo: () => (
      <svg viewBox="0 0 64 24" className="w-14 h-6" aria-hidden="true">
        <text
          x="2"
          y="18.5"
          fontFamily="Manrope, Arial, sans-serif"
          fontWeight="800"
          fontSize="19"
          letterSpacing="-1"
        >
          <tspan fill="#E53238">e</tspan>
          <tspan fill="#0064D2">b</tspan>
          <tspan fill="#F5AF02">a</tspan>
          <tspan fill="#86B817">y</tspan>
        </text>
      </svg>
    ),
  },
  {
    id: 'shopify',
    name: 'Shopify',
    role: 'Storefront Commerce',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <path
          d="M18.3 6.2c-.05-.3-.32-.48-.58-.5-.26-.02-1.42-.1-1.42-.1s-.95-.93-1.06-1.03c-.1-.1-.3-.07-.38-.05l-.52.16c-.3-.88-.85-1.69-1.81-1.69-.05 0-.1 0-.15.01C12.1 2.66 11.73 2.5 11.4 2.5c-2.32 0-3.43 2.9-3.78 4.38l-1.98.61c-.62.19-.64.21-.72.8C4.86 8.78 3.3 20.8 3.3 20.8L15.4 23l5.1-1.1S18.36 6.5 18.3 6.2z"
          fill="#95BF47"
        />
        <path
          d="M17.72 5.7c-.26-.02-1.42-.1-1.42-.1s-.95-.93-1.06-1.03c-.04-.04-.09-.06-.14-.06L15.4 23l5.1-1.1S18.36 6.5 18.3 6.2c-.05-.3-.32-.48-.58-.5z"
          fill="#5E8E3E"
        />
        <path
          d="M12.1 10.6l-.52 1.54s-.46-.24-1.02-.24c-.82 0-.86.52-.86.65 0 .71 1.86.99 1.86 2.66 0 1.32-.84 2.17-1.97 2.17-1.36 0-2.05-.84-2.05-.84l.36-1.2s.71.61 1.31.61c.39 0 .55-.31.55-.53 0-.93-1.53-.97-1.53-2.5 0-1.29.93-2.54 2.8-2.54.73 0 1.07.22 1.07.22z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'amazon',
    name: 'Amazon',
    role: 'Associates Affiliate',
    renderLogo: () => (
      <svg viewBox="0 0 28 24" className="w-8 h-7" aria-hidden="true">
        <text
          x="7"
          y="15"
          fontFamily="Manrope, Arial, sans-serif"
          fontWeight="800"
          fontSize="16"
          fill="#0F172A"
        >
          a
        </text>
        <path
          d="M4.2 18.2c3.9 2.6 9.8 3.2 15.1 1.1"
          fill="none"
          stroke="#FF9900"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M18.3 17.5l2.5 1.1-1.1 2.4"
          fill="none"
          stroke="#FF9900"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    role: 'Visual Discovery SEO',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <circle cx="12" cy="12" r="10.5" fill="#E60023" />
        <path
          d="M12.2 6.2c-3.3 0-5.2 2.2-5.2 4.6 0 1.1.6 2.5 1.6 2.9.15.06.23.03.26-.1l.24-.95c.02-.1.01-.18-.07-.27-.33-.39-.58-1.08-.58-1.74 0-1.69 1.3-3.32 3.5-3.32 1.9 0 3.2 1.28 3.2 3.12 0 2.08-1.06 3.52-2.44 3.52-.76 0-1.33-.63-1.15-1.4.22-.92.64-1.91.64-2.57 0-.59-.32-1.09-.98-1.09-.78 0-1.4.8-1.4 1.88 0 .68.23 1.15.23 1.15l-.94 3.98c-.24 1.03-.04 2.3-.02 2.43.01.08.11.1.16.04.07-.09.94-1.17 1.24-2.25.11-.39.58-2.25.58-2.25.3.57 1.17 1.07 2.1 1.07 2.76 0 4.63-2.52 4.63-5.88 0-2.55-2.16-4.73-5.4-4.73z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'threads',
    name: 'Threads',
    role: 'Social Publishing',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#0F172A" />
        <path
          d="M15.4 11.4c-.1-2.1-1.3-3.4-3.3-3.4-1.3 0-2.4.6-2.9 1.6l1.4.8c.3-.5.8-.8 1.5-.8.9 0 1.4.5 1.5 1.4-.7-.2-1.5-.3-2.2-.2-1.7.2-2.8 1.2-2.7 2.6.1 1.4 1.2 2.4 2.8 2.4 1.4 0 2.4-.7 2.8-1.8.4.3.7.7.7 1.4 0 1.6-1.3 2.7-3.4 2.7-2.4 0-4.1-1.6-4.1-4.3 0-2.6 1.7-4.5 4.2-4.5 1.4 0 2.5.5 3.2 1.3l1.1-1.1c-1-1.1-2.5-1.8-4.3-1.8-3.4 0-5.8 2.5-5.8 6.1 0 3.6 2.3 5.9 5.7 5.9 3 0 5-1.7 5-4.3 0-1.6-.7-2.8-1.6-3.3zm-3.7 2.9c-.7 0-1.2-.4-1.2-1 0-.6.5-1 1.3-1.1.5-.1 1.1 0 1.7.2-.2 1.2-.8 1.9-1.8 1.9z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'medium',
    name: 'Medium',
    role: 'Editorial Essays',
    renderLogo: () => (
      <svg viewBox="0 0 28 24" className="w-8 h-7" aria-hidden="true">
        <ellipse cx="7.5" cy="12" rx="5.5" ry="5.5" fill="#0F172A" />
        <ellipse cx="16.8" cy="12" rx="2.7" ry="5.1" fill="#0F172A" />
        <ellipse cx="22.1" cy="12" rx="1.1" ry="4.5" fill="#0F172A" />
      </svg>
    ),
  },
  {
    id: 'fourthwall',
    name: 'Fourthwall',
    role: 'Creator Merch',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="#0F172A" />
        <path
          d="M7.5 8h9v2.4h-6.3v2.2h5.1v2.3h-5.1V18H7.5V8z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'canva',
    name: 'Canva',
    role: 'Visual Direction',
    renderLogo: (idSuffix) => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <defs>
          <linearGradient id={`canva-brand-grad-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C4CC" />
            <stop offset="100%" stopColor="#5A32FA" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10.5" fill={`url(#canva-brand-grad-${idSuffix})`} />
        <path
          d="M15.4 14.8c-.75.95-1.8 1.5-3.05 1.5-2.2 0-3.85-1.68-3.85-4.3 0-2.65 1.7-4.35 3.95-4.35 1.3 0 2.35.6 2.9 1.45l-1.55 1.05c-.35-.5-.8-.8-1.4-.8-1.1 0-1.85.92-1.85 2.65 0 1.7.72 2.6 1.85 2.6.68 0 1.22-.35 1.55-.85l1.45 1.05z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'blogger',
    name: 'Blogger',
    role: 'SEO Publishing',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="#FF5722" />
        <path
          d="M8.5 7.5h4.2c1.7 0 3 1.1 3 2.6 0 .8-.4 1.5-1 1.9.9.4 1.5 1.3 1.5 2.4 0 1.7-1.4 2.9-3.3 2.9H8.5V7.5zm2.4 3.7h1.6c.6 0 1-.4 1-.9s-.4-.9-1-.9h-1.6v1.8zm0 4h1.9c.7 0 1.2-.4 1.2-1s-.5-1-1.2-1h-1.9v2z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'benable',
    name: 'Benable',
    role: 'Curated Commerce',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="6" fill="#6D28D9" />
        <path
          d="M8.5 6.8h4.1c1.7 0 2.9 1 2.9 2.4 0 .9-.5 1.6-1.2 1.9.9.3 1.5 1.1 1.5 2.1 0 1.6-1.3 2.7-3.2 2.7H8.5V6.8zm2.3 3.4h1.5c.6 0 1-.35 1-.85s-.4-.85-1-.85h-1.5v1.7zm0 3.7h1.7c.7 0 1.15-.38 1.15-.92s-.45-.92-1.15-.92h-1.7v1.84z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'google-studio',
    name: 'Google',
    role: 'AI Studio & Search',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <path
          d="M21.6 12.2c0-.7-.06-1.4-.18-2.05H12v3.9h5.38c-.24 1.24-.95 2.3-2.02 3v2.5h3.26c1.91-1.76 2.98-4.35 2.98-7.35z"
          fill="#4285F4"
        />
        <path
          d="M12 22c2.7 0 4.97-.9 6.62-2.45l-3.26-2.5c-.9.6-2.05.97-3.36.97-2.59 0-4.78-1.75-5.57-4.1H3.07v2.58C4.71 19.77 8.1 22 12 22z"
          fill="#34A853"
        />
        <path
          d="M6.43 13.92c-.2-.6-.31-1.25-.31-1.92s.11-1.32.31-1.92V7.5H3.07A9.97 9.97 0 0 0 2 12c0 1.62.39 3.15 1.07 4.5l3.36-2.58z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.96 2.98 14.7 2 12 2 8.1 2 4.71 4.23 3.07 7.5l3.36 2.58c.79-2.35 2.98-4.1 5.57-4.1z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
  {
    id: 'remotion',
    name: 'Remotion',
    role: 'Programmatic Video',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#EFF6FF" stroke="#BFDBFE" />
        <path d="M8.5 7.5L17.2 12L8.5 16.5V7.5Z" fill="#0B84F3" />
        <path d="M6.8 9.2L12.6 12L6.8 14.8V9.2Z" fill="#2563EB" opacity="0.65" />
      </svg>
    ),
  },
];

export default function PlatformLogosSlider() {
  const renderTrack = (keyPrefix: string, isDuplicate = false) => (
    <div
      className="flex items-center gap-4 pr-4 shrink-0"
      aria-hidden={isDuplicate ? 'true' : undefined}
    >
      {PLATFORMS.map((platform) => (
        <div
          key={`${keyPrefix}-${platform.id}`}
          className="group flex items-center gap-3.5 rounded-2xl bg-white border border-slate-200/90 px-5 py-3.5 studio-card-shadow hover:studio-card-shadow-hover hover:-translate-y-0.5 hover:border-slate-300 transition-all duration-200 shrink-0"
        >
          <div className="flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
            {platform.renderLogo(keyPrefix)}
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm font-semibold text-[#0F172A] leading-tight whitespace-nowrap">
              {platform.name}
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-[#475569] leading-tight whitespace-nowrap">
              {platform.role}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Platforms and marketplaces worked across"
      className="no-print relative py-10 sm:py-12 border-b border-slate-200/80 bg-[#FFFFFF] overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-6 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#2563EB]">
          Platforms, Marketplaces &amp; Ecosystems Worked Across
        </p>
        <span className="text-xs font-medium text-[#475569]">
          Social · Video · E-Commerce · Publishing
        </span>
      </div>

      {/* Continuous Left-to-Right Marquee with clean edge fade masks */}
      <div className="marquee-container relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 z-10 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/85 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-[#FFFFFF] via-[#FFFFFF]/85 to-transparent"
          aria-hidden="true"
        />

        <div className="animate-marquee-ltr py-2">
          {renderTrack('primary', false)}
          {renderTrack('duplicate', true)}
        </div>
      </div>
    </section>
  );
}
