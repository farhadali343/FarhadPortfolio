import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Check,
  Copy,
  Facebook,
  Film,
  Mail,
  ShoppingBag,
  Youtube,
} from 'lucide-react';
import { CONTACT_CONFIG, PROFILE } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

const PROJECT_TYPES = [
  'YouTube Channel Strategy & Production',
  'Short-Form Video & Motion Systems',
  'AI-Directed Content Pipeline',
  'Social Media & Brand Growth',
  'E-Commerce & Affiliate Storefront',
  'Editorial & SEO Writing',
  'General Collaboration',
] as const;

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState<string>(PROJECT_TYPES[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitState, setSubmitState] = useState<
    'idle' | 'submitting' | 'success' | 'draft_ready' | 'error'
  >('idle');
  const [submitFeedback, setSubmitFeedback] = useState('');

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) next.name = 'Please enter your name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!projectType.trim()) next.projectType = 'Please choose a project type.';
    if (message.trim().length < 10) {
      next.message = 'Please share at least 10 characters about your project or goals.';
    }
    return next;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_CONFIG.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(false);
    }
  };

  const mailtoHref = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(
    `${projectType} — Inquiry from ${name.trim() || 'Portfolio Visitor'}`
  )}&body=${encodeURIComponent(
    `Name: ${name.trim()}\nEmail: ${email.trim()}\nProject Type: ${projectType}\n\n${message.trim()}`
  )}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!CONTACT_CONFIG.formEndpoint) {
      setSubmitState('draft_ready');
      setSubmitFeedback(
        'Your inquiry is ready. Opening your email client—or click Open Email Draft below.'
      );
      window.location.href = mailtoHref;
      return;
    }

    setSubmitState('submitting');
    try {
      const response = await fetch(CONTACT_CONFIG.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, projectType, message }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setSubmitState('success');
      setSubmitFeedback('Your message has been delivered. Thank you for reaching out.');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setSubmitState('error');
      setSubmitFeedback('Unable to send right now. Please use the direct email draft button below.');
    }
  };

  const allLinks = [...CONTACT_CONFIG.socialLinks, ...CONTACT_CONFIG.channelLinks].filter(
    (item) => Boolean(item.href) && !item.isPlaceholder
  );

  const youtubeLinks = allLinks.filter((item) => item.id.startsWith('yt-'));
  const tiktokLinks = allLinks.filter((item) => item.id.startsWith('tt-'));
  const facebookLinks = allLinks.filter((item) => item.id.startsWith('fb-'));
  const socialLinks = allLinks.filter(
    (item) => item.id.startsWith('ig-') || item.id.startsWith('threads-')
  );
  const storeAndCurationLinks = allLinks.filter(
    (item) =>
      item.id.startsWith('shopify-') ||
      item.id.startsWith('fourthwall-') ||
      item.id.startsWith('pinterest-') ||
      item.id.startsWith('benable-') ||
      item.id.startsWith('medium-') ||
      item.id.startsWith('app-')
  );

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-[#F8FAFC] border-b border-slate-200/80 relative"
    >
      {/* Toast Confirmation on Email Copy */}
      {copiedEmail && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-xl bg-[#0F172A] text-white px-4 py-2.5 text-xs font-medium shadow-[0_18px_36px_-10px_rgba(15,23,42,0.4)]"
        >
          <Check className="w-4 h-4 text-[#60A5FA]" />
          <span>Copied! {CONTACT_CONFIG.email}</span>
        </div>
      )}

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Contact Studio
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#0F172A] text-balance leading-[1.08]">
              {CONTACT_CONFIG.headline}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#475569] max-w-[46ch] leading-relaxed">
            {CONTACT_CONFIG.supportingText}
          </p>
        </div>

        {/* Two-Column Contact Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Availability, One-Click Email Copy, & Cleanly Grouped Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <TiltCard3D
              maxTilt={4}
              liftZ={8}
              className="rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-7 sm:p-8"
            >
              <div className="flex items-center gap-2.5 text-xs font-medium text-[#475569] mb-4">
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{PROFILE.availability.label} · PK / Remote</span>
              </div>

              <div className="rounded-xl bg-[#F8FAFC] border border-slate-200/90 p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-[#475569]">Direct Email</div>
                  <a
                    href={`mailto:${CONTACT_CONFIG.email}`}
                    className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] truncate block mt-0.5"
                  >
                    {CONTACT_CONFIG.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    copiedEmail
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-[#0F172A] border-slate-200 hover:border-[#2563EB]'
                  }`}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#60A5FA]" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#475569]" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </TiltCard3D>

            {/* Cleanly Separated Platform Directory */}
            <TiltCard3D
              maxTilt={3.5}
              liftZ={6}
              className="flex-1 rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-7 sm:p-8"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#475569] mb-5">
                Channels &amp; Profiles
              </h3>

              <div className="divide-y divide-slate-100">
                {/* 1. YouTube Channels (Grouped Together) */}
                <div className="pb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] mb-2.5">
                    <Youtube className="w-4 h-4 text-[#2563EB]" strokeWidth={1.75} />
                    <span>YouTube Channels</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {youtubeLinks.map((item) => (
                      <a
                        key={item.id}
                        href={item.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8FAFC] border border-slate-200/90 px-3 py-1.5 text-xs font-medium text-[#0F172A] hover:border-[#2563EB]/50 hover:text-[#2563EB] transition-colors"
                      >
                        <span>{item.value}</span>
                        <ArrowUpRight className="w-3 h-3 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* 2. TikTok (Separate Group) */}
                <div className="py-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] mb-2.5">
                    <Film className="w-4 h-4 text-[#2563EB]" strokeWidth={1.75} />
                    <span>TikTok</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tiktokLinks.map((item) => (
                      <a
                        key={item.id}
                        href={item.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8FAFC] border border-slate-200/90 px-3 py-1.5 text-xs font-medium text-[#0F172A] hover:border-[#2563EB]/50 hover:text-[#2563EB] transition-colors"
                      >
                        <span>{item.value}</span>
                        <ArrowUpRight className="w-3 h-3 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* 3. Facebook (Separate Group) */}
                <div className="py-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] mb-2.5">
                    <Facebook className="w-4 h-4 text-[#2563EB]" strokeWidth={1.75} />
                    <span>Facebook</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {facebookLinks.map((item) => (
                      <a
                        key={item.id}
                        href={item.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8FAFC] border border-slate-200/90 px-3 py-1.5 text-xs font-medium text-[#0F172A] hover:border-[#2563EB]/50 hover:text-[#2563EB] transition-colors"
                      >
                        <span>Farhad Ali (Business Page)</span>
                        <ArrowUpRight className="w-3 h-3 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* 4. Instagram & Threads */}
                <div className="py-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] mb-2.5">
                    <AtSign className="w-4 h-4 text-[#2563EB]" strokeWidth={1.75} />
                    <span>Instagram &amp; Threads</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((item) => (
                      <a
                        key={item.id}
                        href={item.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8FAFC] border border-slate-200/90 px-3 py-1.5 text-xs font-medium text-[#0F172A] hover:border-[#2563EB]/50 hover:text-[#2563EB] transition-colors"
                      >
                        <span>
                          {item.label}: {item.value}
                        </span>
                        <ArrowUpRight className="w-3 h-3 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* 5. Stores, Publications & Web Apps */}
                <div className="pt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] mb-2.5">
                    <ShoppingBag className="w-4 h-4 text-[#C28E36]" strokeWidth={1.75} />
                    <span>Stores, Publications &amp; Web Apps</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {storeAndCurationLinks.map((item) => {
                      const shortName = item.id.startsWith('shopify-')
                        ? 'EleCoStudio (Shopify)'
                        : item.id.startsWith('fourthwall-')
                          ? 'POV Narrative Shop'
                          : item.id.startsWith('pinterest-')
                            ? 'Pinterest (@easyfinds_us)'
                            : item.id.startsWith('medium-')
                              ? 'Medium Publication'
                              : item.id === 'app-automation-editor'
                                ? 'Automation Editor'
                                : item.id === 'app-paktransfer'
                                  ? 'PakTransfer'
                                  : 'Benable';
                      return (
                        <a
                          key={item.id}
                          href={item.href!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8FAFC] border border-slate-200/90 px-3 py-1.5 text-xs font-medium text-[#0F172A] hover:border-[#2563EB]/50 hover:text-[#2563EB] transition-colors"
                        >
                          <span>{shortName}</span>
                          <ArrowUpRight className="w-3 h-3 text-slate-400" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Right Column: Clean Modern Inquiry Form */}
          <div className="lg:col-span-7">
            <TiltCard3D
              maxTilt={3}
              liftZ={8}
              className="h-full rounded-2xl bg-white border border-slate-200/90 studio-card-shadow"
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                className="h-full p-7 sm:p-9 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#0F172A] mb-2"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#0F172A] mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-project-type"
                      className="block text-xs font-semibold text-[#0F172A] mb-2"
                    >
                      Project Type
                    </label>
                    <select
                      id="contact-project-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="mt-1.5 text-xs text-red-600">{errors.projectType}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#0F172A] mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your channel goals, creative scope, timeline, or collaboration details..."
                      className="w-full px-4 py-3 text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white resize-y transition-colors"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {submitState === 'draft_ready' && (
                    <div
                      role="status"
                      className="p-4 rounded-xl border border-[#2563EB]/25 bg-[#2563EB]/5 text-xs text-[#0F172A] space-y-3"
                    >
                      <p className="leading-relaxed font-medium">{submitFeedback}</p>
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#2563EB] rounded-lg transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Open Email Draft
                      </a>
                    </div>
                  )}

                  {submitState === 'success' && (
                    <div
                      role="status"
                      className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-xs text-emerald-900"
                    >
                      {submitFeedback}
                    </div>
                  )}

                  {submitState === 'error' && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-800 space-y-2"
                    >
                      <p>{submitFeedback}</p>
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-1.5 font-semibold underline"
                      >
                        Open Email Draft
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0F172A] hover:bg-[#2563EB] rounded-full shadow-[0_14px_28px_-10px_rgba(15,23,42,0.4)] hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <span>
                      {submitState === 'submitting' ? 'Preparing...' : 'Send Project Inquiry'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </TiltCard3D>
          </div>
        </div>
      </div>
    </section>
  );
}
