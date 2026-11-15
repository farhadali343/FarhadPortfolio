import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import CaseStudyModal from './components/CaseStudyModal';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';
import { ProjectCaseStudy } from './data/portfolioData';
import {
  PageRoute,
  ROUTE_TO_PATH,
  isPolicyRoute,
  resolveRouteFromPath,
} from './types/navigation';
import { generateResumePdf } from './utils/resumePdf';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    resolveRouteFromPath(window.location.pathname)
  );
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const navigate = useCallback((route: PageRoute, sectionId?: string) => {
    const targetPath = ROUTE_TO_PATH[route];
    const nextUrl = sectionId ? `${targetPath}#${sectionId}` : targetPath;
    if (window.location.pathname + window.location.hash !== nextUrl) {
      window.history.pushState({ route, sectionId }, '', nextUrl);
    }

    setCurrentRoute(route);

    if (sectionId) {
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 40);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = resolveRouteFromPath(window.location.pathname);
      setCurrentRoute(nextRoute);
      const hashId = window.location.hash.replace('#', '');
      if (hashId) {
        window.setTimeout(() => {
          const el = document.getElementById(hashId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 40);
      } else {
        window.scrollTo({ top: 0 });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleDownloadResume = () => {
    setPdfError(null);
    setIsGeneratingPdf(true);
    try {
      generateResumePdf();
    } catch {
      setPdfError(
        'Could not generate the PDF file directly in this browser. Please use the Print Resume button and select Save as PDF.'
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
        <Navbar currentRoute={currentRoute} onNavigate={navigate} />
        <main className="flex-1">
          {currentRoute === 'home' && (
            <HomePage
              onSelectProject={setActiveProject}
              onNavigate={navigate}
              onDownloadResume={handleDownloadResume}
              isGeneratingPdf={isGeneratingPdf}
            />
          )}
          {currentRoute === 'about' && <AboutPage onNavigate={navigate} />}
          {currentRoute === 'resume' && (
            <ResumePage
              onNavigate={navigate}
              onDownloadResume={handleDownloadResume}
              isGeneratingPdf={isGeneratingPdf}
              pdfError={pdfError}
            />
          )}
          {currentRoute === 'contact' && <ContactPage onNavigate={navigate} />}
          {isPolicyRoute(currentRoute) && (
            <PolicyPage activeRoute={currentRoute} onNavigate={navigate} />
          )}
        </main>
        <Footer onNavigate={navigate} />
        <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
      </div>
    </MotionConfig>
  );
}
