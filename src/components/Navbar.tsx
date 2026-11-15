import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const SECTION_IDS = [
  'home',
  'about',
  'expertise',
  'experience',
  'studio-3d',
  'projects',
  'resume',
  'contact',
] as const;

type SectionId = (typeof SECTION_IDS)[number];

const DESKTOP_NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'studio-3d', label: '3D Studio' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
];

const MOBILE_NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  ...DESKTOP_NAV_LINKS,
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const manualTargetRef = useRef<{ id: SectionId; expiresAt: number } | null>(null);

  const computeScrollSpy = useCallback(() => {
    const docEl = document.documentElement;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const maxScroll = Math.max(docEl.scrollHeight - viewportHeight, 1);

    setScrollProgress(Math.min(Math.max(scrollY / maxScroll, 0), 1));

    const pendingTarget = manualTargetRef.current;
    if (pendingTarget) {
      const targetEl = document.getElementById(pendingTarget.id);
      const reachedTarget =
        targetEl && Math.abs(targetEl.getBoundingClientRect().top - 72) < 48;
      if (reachedTarget || Date.now() >= pendingTarget.expiresAt) {
        manualTargetRef.current = null;
      } else {
        setActiveSection(pendingTarget.id);
        return;
      }
    }

    if (scrollY < 48) {
      setActiveSection('home');
      return;
    }

    if (viewportHeight + scrollY >= docEl.scrollHeight - 24) {
      setActiveSection('contact');
      return;
    }

    const spyLine = Math.min(Math.max(viewportHeight * 0.28, 110), 180);
    let current: SectionId = 'home';

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= spyLine) {
        current = id;
      }
    }

    setActiveSection(current);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    const scheduleSpyUpdate = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(() => {
        ticking = false;
        computeScrollSpy();
      });
    };

    computeScrollSpy();
    window.addEventListener('scroll', scheduleSpyUpdate, { passive: true });
    window.addEventListener('resize', scheduleSpyUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleSpyUpdate);
      window.removeEventListener('resize', scheduleSpyUpdate);
    };
  }, [computeScrollSpy]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const scrollToSection = (id: SectionId) => {
    setMobileOpen(false);
    manualTargetRef.current = { id, expiresAt: Date.now() + 850 };
    setActiveSection(id);

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isContactActive = activeSection === 'contact';

  return (
    <header className="no-print sticky top-0 z-40 w-full bg-[#F8F9FB]/95 backdrop-blur-sm border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          aria-current={activeSection === 'home' ? 'page' : undefined}
          className="font-display text-base sm:text-lg font-bold tracking-tight text-[#15191F] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
        >
          {PROFILE.wordmark}
        </a>

        {/* Zone 2: Scroll-Spy Section Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-5 lg:gap-7">
          {DESKTOP_NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm ${
                  isActive ? 'text-[#15191F] font-semibold' : 'text-[#68717D] hover:text-[#15191F]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[#2563EB] origin-left transition-transform duration-200 ease-out ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            aria-current={isContactActive ? 'page' : undefined}
            className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 ${
              isContactActive ? 'bg-[#2563EB]' : 'bg-[#15191F] hover:bg-[#2563EB]'
            }`}
          >
            Let&apos;s Talk
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#15191F] border border-[#E5E7EB] bg-white rounded-md hover:border-[#15191F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Subtle Scroll Progress Hairline */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full bg-[#2563EB] origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-t border-[#E5E7EB] bg-white px-4 py-4"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {MOBILE_NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#2563EB] bg-[#F8F9FB] font-semibold'
                      : 'text-[#15191F] hover:bg-[#F8F9FB]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span aria-hidden="true" className="w-4 h-[2px] bg-[#2563EB] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

