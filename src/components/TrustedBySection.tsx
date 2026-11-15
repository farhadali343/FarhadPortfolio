import { ReactNode } from 'react';

interface TrustedLogoItem {
  id: string;
  name: string;
  renderMark: (idSuffix: string) => ReactNode;
}

const TRUSTED_PLATFORMS: TrustedLogoItem[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    renderMark: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
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
    renderMark: (idSuffix) => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <defs>
          <linearGradient id={`trusted-ig-${idSuffix}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F58529" />
            <stop offset="45%" stopColor="#DD2A7B" />
            <stop offset="78%" stopColor="#8134AF" />
            <stop offset="100%" stopColor="#515BD4" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="6" fill={`url(#trusted-ig-${idSuffix})`} />
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
    id: 'ebay',
    name: 'eBay',
    renderMark: () => (
      <svg viewBox="0 0 64 24" className="w-12 h-5" aria-hidden="true">
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
    id: 'pinterest',
    name: 'Pinterest',
    renderMark: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10.5" fill="#E60023" />
        <path
          d="M12.2 6.2c-3.3 0-5.2 2.2-5.2 4.6 0 1.1.6 2.5 1.6 2.9.15.06.23.03.26-.1l.24-.95c.02-.1.01-.18-.07-.27-.33-.39-.58-1.08-.58-1.74 0-1.69 1.3-3.32 3.5-3.32 1.9 0 3.2 1.28 3.2 3.12 0 2.08-1.06 3.52-2.44 3.52-.76 0-1.33-.63-1.15-1.4.22-.92.64-1.91.64-2.57 0-.59-.32-1.09-.98-1.09-.78 0-1.4.8-1.4 1.88 0 .68.23 1.15.23 1.15l-.94 3.98c-.24 1.03-.04 2.3-.02 2.43.01.08.11.1.16.04.07-.09.94-1.17 1.24-2.25.11-.39.58-2.25.58-2.25.3.57 1.17 1.07 2.1 1.07 2.76 0 4.63-2.52 4.63-5.88 0-2.55-2.16-4.73-5.4-4.73z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'medium',
    name: 'Medium',
    renderMark: () => (
      <svg viewBox="0 0 28 24" className="w-7 h-6" aria-hidden="true">
        <ellipse cx="7.5" cy="12" rx="5.5" ry="5.5" fill="#0F172A" />
        <ellipse cx="16.8" cy="12" rx="2.7" ry="5.1" fill="#0F172A" />
        <ellipse cx="22.1" cy="12" rx="1.1" ry="4.5" fill="#0F172A" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    renderMark: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-6" aria-hidden="true">
        <rect x="1.5" y="4.5" width="21" height="15" rx="4.2" fill="#FF0000" />
        <path d="M10 9.1L15.6 12L10 14.9V9.1Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    renderMark: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
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
    id: 'shopify',
    name: 'Shopify',
    renderMark: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
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
    renderMark: () => (
      <svg viewBox="0 0 28 24" className="w-7 h-6" aria-hidden="true">
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
    id: 'threads',
    name: 'Threads',
    renderMark: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#0F172A" />
        <path
          d="M15.4 11.4c-.1-2.1-1.3-3.4-3.3-3.4-1.3 0-2.4.6-2.9 1.6l1.4.8c.3-.5.8-.8 1.5-.8.9 0 1.4.5 1.5 1.4-.7-.2-1.5-.3-2.2-.2-1.7.2-2.8 1.2-2.7 2.6.1 1.4 1.2 2.4 2.8 2.4 1.4 0 2.4-.7 2.8-1.8.4.3.7.7.7 1.4 0 1.6-1.3 2.7-3.4 2.7-2.4 0-4.1-1.6-4.1-4.3 0-2.6 1.7-4.5 4.2-4.5 1.4 0 2.5.5 3.2 1.3l1.1-1.1c-1-1.1-2.5-1.8-4.3-1.8-3.4 0-5.8 2.5-5.8 6.1 0 3.6 2.3 5.9 5.7 5.9 3 0 5-1.7 5-4.3 0-1.6-.7-2.8-1.6-3.3zm-3.7 2.9c-.7 0-1.2-.4-1.2-1 0-.6.5-1 1.3-1.1.5-.1 1.1 0 1.7.2-.2 1.2-.8 1.9-1.8 1.9z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
];

export default function TrustedBySection() {
  const renderTrack = (keyPrefix: string, isDuplicate = false) => (
    <div
      className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12 shrink-0"
      aria-hidden={isDuplicate ? 'true' : undefined}
    >
      {TRUSTED_PLATFORMS.map((item) => (
        <div
          key={`${keyPrefix}-${item.id}`}
          className="group inline-flex items-center gap-3 rounded-full bg-[#F8FAFC] border border-slate-200/80 px-5 py-2.5 shadow-xs hover:bg-white hover:border-[#2563EB]/35 hover:shadow-md transition-all duration-200 shrink-0"
        >
          <span className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            {item.renderMark(keyPrefix)}
          </span>
          {item.id !== 'ebay' && (
            <span className="font-display text-sm sm:text-[15px] font-semibold tracking-tight text-[#0F172A] whitespace-nowrap">
              {item.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Trusted by leading digital platforms"
      className="no-print relative py-12 sm:py-14 bg-white border-b border-slate-200/80 overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-7 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
          Trusted By
        </p>
        <h2 className="mt-2 font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A]">
          Proven execution across global creator, social &amp; commerce platforms.
        </h2>
      </div>

      {/* High-Speed Infinite Horizontal Marquee */}
      <div className="marquee-container relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white via-white/90 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white via-white/90 to-transparent"
          aria-hidden="true"
        />

        <div className="animate-marquee-fast py-1">
          {renderTrack('primary', false)}
          {renderTrack('duplicate', true)}
        </div>
      </div>
    </section>
  );
}
