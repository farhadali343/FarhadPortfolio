import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Experience from './components/Experience';
import Studio3DShowcase from './components/Studio3DShowcase';
import Projects from './components/Projects';
import CaseStudyModal from './components/CaseStudyModal';
import ResumeSection from './components/ResumeSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ProjectCaseStudy } from './data/portfolioData';
import { generateResumePdf } from './utils/resumePdf';

export default function App() {
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

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
        <Navbar />
        <main className="flex-1">
          <Hero onDownloadResume={handleDownloadResume} isGeneratingPdf={isGeneratingPdf} />
          <About />
          <Expertise />
          <Experience />
          <Studio3DShowcase />
          <Projects onSelectProject={setActiveProject} />
          <ResumeSection
            onDownloadResume={handleDownloadResume}
            isGeneratingPdf={isGeneratingPdf}
            pdfError={pdfError}
          />
          <Contact />
        </main>
        <Footer />
        <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
      </div>
    </MotionConfig>
  );
}
