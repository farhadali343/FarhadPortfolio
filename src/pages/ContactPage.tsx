import { ArrowLeft, Clock, Globe2, ShieldCheck } from 'lucide-react';
import Contact from '../components/Contact';
import { NavigateFn } from '../types/navigation';

interface ContactPageProps {
  onNavigate: NavigateFn;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  return (
    <div className="bg-[#F8FAFC]">
      <div className="border-b border-slate-200/80 bg-white py-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#475569]">
            <span className="inline-flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Typical reply within 24 hours</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Pakistan (PKT) · Global Remote</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigate('privacy-policy')}
              className="inline-flex items-center gap-1.5 hover:text-[#2563EB] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Privacy Policy</span>
            </button>
          </div>
        </div>
      </div>

      <Contact />
    </div>
  );
}
