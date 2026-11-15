import { FormEvent, useState } from 'react';
import { Check, Copy, ExternalLink, Mail, Send } from 'lucide-react';
import { CONTACT_CONFIG, PROFILE } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'draft_ready' | 'error'>('idle');
  const [submitFeedback, setSubmitFeedback] = useState('');

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) next.name = 'Please enter your name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (subject.trim().length < 3) next.subject = 'Please enter a brief project subject.';
    if (message.trim().length < 10) {
      next.message = 'Please share at least 10 characters about your project or inquiry.';
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
    subject.trim() || 'Project Inquiry — Farhad Ali Portfolio'
  )}&body=${encodeURIComponent(
    `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
  )}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!CONTACT_CONFIG.formEndpoint) {
      setSubmitState('draft_ready');
      setSubmitFeedback(
        'Your inquiry is validated and ready. Launching your default email client—or click Open Email Draft below.'
      );
      window.location.href = mailtoHref;
      return;
    }

    setSubmitState('submitting');
    try {
      const response = await fetch(CONTACT_CONFIG.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setSubmitState('success');
      setSubmitFeedback('Your message has been delivered. Thank you for reaching out.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setSubmitState('error');
      setSubmitFeedback('Unable to send right now. Please use the direct email draft button below.');
    }
  };

  const activeSocials = CONTACT_CONFIG.socialLinks.filter(
    (item) => Boolean(item.href) && !item.isPlaceholder
  );
  const activeChannels = CONTACT_CONFIG.channelLinks.filter(
    (item) => Boolean(item.href) && !item.isPlaceholder
  );

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80 relative">
      {/* Subtle Toast Confirmation on Email Copy */}
      {copiedEmail && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-xl bg-[#0F172A] text-white px-4 py-2.5 text-xs font-medium shadow-[0_18px_36px_-10px_rgba(15,23,42,0.4)]"
        >
          <Check className="w-4 h-4 text-[#60A5FA]" />
          <span>Copied {CONTACT_CONFIG.email} to clipboard</span>
        </div>
      )}

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
              Contact &amp; Collaboration
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] text-balance">
              {CONTACT_CONFIG.headline}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-[48ch]">
            {CONTACT_CONFIG.supportingText}
          </p>
        </div>

        {/* Two-Column 3D Contact Studio Capsule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Email Copy + Verified Profiles & Channels */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <TiltCard3D
              maxTilt={4}
              liftZ={8}
              className="rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-6"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-1">
                Direct Contact
              </div>
              <p className="text-xs text-slate-500 mb-4">
                {PROFILE.availability.label} · {PROFILE.locationLine}
              </p>

              <div className="rounded-xl bg-[#F8FAFC] border border-slate-200/90 p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-slate-500">Email</div>
                  <a
                    href={`mailto:${CONTACT_CONFIG.email}`}
                    className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] truncate block"
                  >
                    {CONTACT_CONFIG.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0F172A] bg-white border border-slate-200 hover:border-[#2563EB] rounded-lg transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </TiltCard3D>

            <TiltCard3D
              maxTilt={3.5}
              liftZ={6}
              className="flex-1 rounded-2xl bg-white border border-slate-200/90 studio-card-shadow p-6 space-y-5"
            >
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Business Social Media
                </h3>
                <ul className="space-y-2 text-xs">
                  {activeSocials.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-[#0F172A]">{item.label}</span>
                      <a
                        href={item.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#2563EB] hover:underline truncate"
                      >
                        <span>{item.value}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Channels &amp; Storefronts
                </h3>
                <ul className="space-y-2 text-xs">
                  {activeChannels.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-[#0F172A]">{item.label}</span>
                      <a
                        href={item.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#2563EB] hover:underline truncate"
                      >
                        <span>{item.value}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard3D>
          </div>

          {/* Right Column: Validated Inquiry Form (Launches Pre-Filled Email Draft) */}
          <div className="lg:col-span-7">
            <TiltCard3D
              maxTilt={3}
              liftZ={8}
              className="h-full rounded-2xl bg-white border border-slate-200/90 studio-card-shadow"
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                className="h-full p-6 sm:p-8 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-5">
                  <div className="pb-4 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-[#0F172A]">
                      Project Inquiry Studio
                    </h3>
                    <span className="font-mono-tabular text-xs text-slate-500">
                      Direct Email Launch
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#0F172A] mb-1.5"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#0F172A] mb-1.5"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-semibold text-[#0F172A] mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g., Short-form video production or YouTube channel strategy"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#0F172A] mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share project goals, platforms, timeline, or collaboration details..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white resize-y transition-colors"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message}</p>
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

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-[0_12px_24px_-10px_rgba(37,99,235,0.55)] hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <Send className="w-4 h-4" />
                    {submitState === 'submitting' ? 'Preparing...' : 'Prepare Email Inquiry'}
                  </button>

                  <span className="text-xs text-slate-500">
                    Direct recipient: {CONTACT_CONFIG.email}
                  </span>
                </div>
              </form>
            </TiltCard3D>
          </div>
        </div>
      </div>
    </section>
  );
}
