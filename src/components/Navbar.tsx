import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LayoutGroup, motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

const SECTION_IDS = [
  'home',
  'studio-3d',
  'about',
  'expertise',
  'experience',
  'projects',
  'resume',
  'contact',
] as const;

type SectionId = (typeof SECTION_IDS)[number];

const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: 'projects', label: 'Work' },
  { id: 'studio-3d', label: '3D Studio' },
  { id: 'expertise', label: 'Capabilities' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const manualTargetRef = useRef<{ id: SectionId; expiresAt: number } | null>(null);

  const computeScrollSpy = useCallback(() => {
    const docEl = document.documentElement;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    const pendingTarget = manualTargetRef.current;
    if (pendingTarget) {
      const targetEl = document.getElementById(pendingTarget.id);
      const reachedTarget =
        targetEl && Math.abs(targetEl.getBoundingClientRect().top - 84) < 52;
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

    const spyLine = Math.min(Math.max(viewportHeight * 0.28, 115), 185);
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

  // Map Experience scroll zone cleanly to Capabilities when scrolling between About & 3D Studio
  const highlightedNavSection: SectionId =
    activeSection === 'experience' ? 'expertise' : activeSection;
  const isContactActive = activeSection === 'contact';

  return (
    <header className="no-print sticky top-3.5 z-40 w-full px-3 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-5xl rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-[0_16px_38px_-14px_rgba(15,23,42,0.12)] px-4 sm:px-5 h-14 flex items-center justify-between gap-6">
        {/* Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          aria-current={activeSection === 'home' ? 'page' : undefined}
          className="font-display text-sm sm:text-[15px] font-semibold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0 pl-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-full"
        >
          {PROFILE.wordmark}
        </a>

        {/* 5 Clean Navigation Links with Scroll-Spy Active Pill */}
        <LayoutGroup id="floating-glass-nav">
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const isActive = highlightedNavSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isActive ? 'text-[#2563EB]' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </LayoutGroup>

        {/* High-Contrast Pill CTA + Mobile Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            aria-current={isContactActive ? 'page' : undefined}
            className={`inline-flex items-center justify-center px-4 py-2 text-xs sm:text-[13px] font-semibold text-white rounded-full transition-all duration-150 whitespace-nowrap shrink-0 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 ${
              isContactActive
                ? 'bg-[#2563EB]'
                : 'bg-[#0F172A] hover:bg-[#2563EB]'
            }`}
          >
            Start a Project
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#0F172A] border border-slate-200 bg-white/90 rounded-full hover:border-[#0F172A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Detached Mobile Frosted Glass Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="pointer-events-auto md:hidden mt-2 mx-auto max-w-5xl rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(15,23,42,0.16)] px-3 py-3"
        >
          <nav aria-label="Mobile Navigation" className="grid grid-cols-2 gap-1">
            {NAV_LINKS.map((item) => {
              const isActive = highlightedNavSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-2.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#2563EB] bg-[#2563EB]/10 font-semibold'
                      : 'text-[#0F172A] hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              aria-current={isContactActive ? 'page' : undefined}
              className={`px-3 py-2.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                isContactActive
                  ? 'text-white bg-[#2563EB]'
                  : 'text-[#0F172A] hover:bg-slate-100'
              }`}
            >
              Start a Project
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
