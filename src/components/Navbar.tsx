import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LayoutGroup, motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { NavigateFn, PageRoute, ROUTE_TO_PATH } from '../types/navigation';

const HOME_SECTION_IDS = ['home', 'studio-3d', 'expertise', 'projects'] as const;
type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

interface NavItemConfig {
  key: string;
  label: string;
  route: PageRoute;
  sectionId?: HomeSectionId;
}

const NAV_ITEMS: NavItemConfig[] = [
  { key: 'projects', label: 'Work', route: 'home', sectionId: 'projects' },
  { key: 'studio-3d', label: '3D Studio', route: 'home', sectionId: 'studio-3d' },
  { key: 'expertise', label: 'Capabilities', route: 'home', sectionId: 'expertise' },
  { key: 'about', label: 'About', route: 'about' },
  { key: 'resume', label: 'Resume', route: 'resume' },
];

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: NavigateFn;
}

export default function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [activeHomeSection, setActiveHomeSection] = useState<HomeSectionId>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const manualTargetRef = useRef<{ id: HomeSectionId; expiresAt: number } | null>(null);

  const computeScrollSpy = useCallback(() => {
    if (currentRoute !== 'home') return;

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
        setActiveHomeSection(pendingTarget.id);
        return;
      }
    }

    if (scrollY < 48) {
      setActiveHomeSection('home');
      return;
    }

    const spyLine = Math.min(Math.max(viewportHeight * 0.28, 115), 185);
    let current: HomeSectionId = 'home';

    for (const id of HOME_SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= spyLine) {
        current = id;
      }
    }

    setActiveHomeSection(current);
  }, [currentRoute]);

  useEffect(() => {
    if (currentRoute !== 'home') return;

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
  }, [computeScrollSpy, currentRoute]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (item: NavItemConfig) => {
    setMobileOpen(false);
    if (item.route === 'home' && item.sectionId) {
      manualTargetRef.current = { id: item.sectionId, expiresAt: Date.now() + 850 };
      setActiveHomeSection(item.sectionId);
    }
    onNavigate(item.route, item.sectionId);
  };

  const isNavItemActive = (item: NavItemConfig) => {
    if (currentRoute !== 'home') {
      return currentRoute === item.route;
    }
    if (item.route === 'home' && item.sectionId) {
      return activeHomeSection === item.sectionId;
    }
    return false;
  };

  const isContactActive = currentRoute === 'contact';

  return (
    <header className="no-print sticky top-3.5 z-40 w-full px-3 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-5xl rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-[0_16px_38px_-14px_rgba(15,23,42,0.12)] px-4 sm:px-5 h-14 flex items-center justify-between gap-6">
        {/* Wordmark -> Home */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            setActiveHomeSection('home');
            onNavigate('home');
          }}
          aria-current={currentRoute === 'home' && activeHomeSection === 'home' ? 'page' : undefined}
          className="font-display text-sm sm:text-[15px] font-semibold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0 pl-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-full"
        >
          {PROFILE.wordmark}
        </a>

        {/* 5 Clean Links: Work, 3D Studio, Capabilities, About (Page), Resume (Page) */}
        <LayoutGroup id="floating-glass-nav">
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(item);
              const href = item.sectionId ? `/#${item.sectionId}` : ROUTE_TO_PATH[item.route];
              return (
                <a
                  key={item.key}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
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

        {/* High-Contrast Pill CTA -> Contact Page */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              onNavigate('contact');
            }}
            aria-current={isContactActive ? 'page' : undefined}
            className={`inline-flex items-center justify-center px-4 py-2 text-xs sm:text-[13px] font-semibold text-white rounded-full transition-all duration-150 whitespace-nowrap shrink-0 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 ${
              isContactActive ? 'bg-[#2563EB]' : 'bg-[#0F172A] hover:bg-[#2563EB]'
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
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(item);
              const href = item.sectionId ? `/#${item.sectionId}` : ROUTE_TO_PATH[item.route];
              return (
                <a
                  key={item.key}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
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
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                onNavigate('contact');
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
