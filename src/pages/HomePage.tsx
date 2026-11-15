import Hero from '../components/Hero';
import HeroMarqueeSlider from '../components/HeroMarqueeSlider';
import TrustedBySection from '../components/TrustedBySection';
import Studio3DShowcase from '../components/Studio3DShowcase';
import Expertise from '../components/Expertise';
import PlatformLogosSlider from '../components/PlatformLogosSlider';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import {
  HomeChannelSpotlightSection,
  HomeCommerceSection,
  HomeEditorialSection,
  HomeFaqSection,
  HomeLaunchCtaSection,
  HomePhilosophySection,
  HomeResumeCtaSection,
  HomeWorkflowSection,
} from '../components/HomeSections';
import { ProjectCaseStudy } from '../data/portfolioData';
import { NavigateFn } from '../types/navigation';

interface HomePageProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
  onNavigate: NavigateFn;
  onDownloadResume: () => void;
  isGeneratingPdf: boolean;
}

export default function HomePage({
  onSelectProject,
  onNavigate,
  onDownloadResume,
  isGeneratingPdf,
}: HomePageProps) {
  return (
    <>
      {/* Section 1: Executive Hero & Impact Metrics */}
      <Hero />
      {/* Section 2: Featured Productions Right-to-Left Marquee */}
      <HeroMarqueeSlider onSelectProject={onSelectProject} />
      {/* High-Speed Social Proof: Trusted By Platforms Marquee */}
      <TrustedBySection />
      {/* Section 3: Interactive 3D Production Engine */}
      <Studio3DShowcase />
      {/* Section 4: Six Core Capabilities & Production Stack */}
      <Expertise />
      {/* Section 5: Real Platform & Marketplace Logos Slider */}
      <PlatformLogosSlider />
      {/* Section 6: Creative Philosophy Teaser -> About Page */}
      <HomePhilosophySection onNavigate={onNavigate} />
      {/* Section 7: Five-Step Production Architecture */}
      <HomeWorkflowSection />
      {/* Section 8: Selected Portfolio & 3D Isometric Case Studies */}
      <Projects onSelectProject={onSelectProject} />
      {/* Section 9: Flagship Media Properties Spotlight */}
      <HomeChannelSpotlightSection />
      {/* Section 10: E-Commerce, Merch & Affiliate Ecosystem */}
      <HomeCommerceSection />
      {/* Section 11: Editorial Writing & Research Depth */}
      <HomeEditorialSection />
      {/* Section 12: Independent Ventures & Operations Timeline */}
      <Experience />
      {/* Section 13: Curriculum Vitae Spotlight -> Resume Page */}
      <HomeResumeCtaSection
        onNavigate={onNavigate}
        onDownloadResume={onDownloadResume}
        isGeneratingPdf={isGeneratingPdf}
      />
      {/* Section 14: Collaboration & Workflow FAQ */}
      <HomeFaqSection />
      {/* Section 15: Project Launch CTA -> Contact Page */}
      <HomeLaunchCtaSection onNavigate={onNavigate} />
    </>
  );
}
