import { ArrowLeft, ArrowRight } from 'lucide-react';
import ResumeSection from '../components/ResumeSection';
import { NavigateFn } from '../types/navigation';

interface ResumePageProps {
  onNavigate: NavigateFn;
  onDownloadResume: () => void;
  isGeneratingPdf: boolean;
  pdfError: string | null;
}

export default function ResumePage({
  onNavigate,
  onDownloadResume,
  isGeneratingPdf,
  pdfError,
}: ResumePageProps) {
  return (
    <div className="bg-white">
      <div className="no-print border-b border-slate-200/80 bg-[#F8FAFC] py-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:underline"
          >
            <span>Ready to collaborate? Contact Farhad</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <ResumeSection
        onDownloadResume={onDownloadResume}
        isGeneratingPdf={isGeneratingPdf}
        pdfError={pdfError}
      />
    </div>
  );
}
