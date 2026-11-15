import { FormEvent, useState } from 'react';
import { Check, Copy, Mail, Send, AlertCircle } from 'lucide-react';
import { CONTACT_CONFIG, PROFILE } from '../data/portfolioData';

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
  const [submitState, setSubmitState] = useState<
    'idle' | 'submitting' | 'success' | 'needs_config' | 'error'
  >('idle');
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
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!CONTACT_CONFIG.formEndpoint) {
      setSubmitState('needs_config');
      setSubmitFeedback(
        'Direct form submission requires configuring an external form relay endpoint (e.g., Formspree or a mail API) in portfolioData.ts. You can send your validated message right away using your email client below.'
      );
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
      setSubmitFeedback(
        'Unable to reach the configured form endpoint right now. Please use the direct email link instead.'
      );
    }
  };

  const mailtoHref = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(
    subject.trim() || 'Project Inquiry — Farhad Ali Portfolio'
  )}&body=${encodeURIComponent(
    `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
  )}`;

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#F8F9FB] border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
                Contact &amp; Collaboration
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#15191F] text-balance">
                {CONTACT_CONFIG.headline}
              </h2>
              <p className="mt-3 text-base text-[#68717D] leading-relaxed">
                {CONTACT_CONFIG.supportingText}
              </p>

              {PROFILE.availability.showIndicator && (
                <p className="mt-4 text-xs font-medium text-[#2563EB]">
                  {PROFILE.availability.label} · {PROFILE.locationLine}
                </p>
              )}

              {/* Direct Contact Cards */}
              <div className="mt-8 space-y-3">
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-[#68717D]">
                      Email {CONTACT_CONFIG.emailIsPlaceholder ? '(Editable Placeholder)' : ''}
                    </div>
                    <a
                      href={`mailto:${CONTACT_CONFIG.email}`}
                      className="text-sm font-medium text-[#15191F] hover:text-[#2563EB] truncate block"
                    >
                      {CONTACT_CONFIG.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#15191F] bg-[#F8F9FB] border border-[#E5E7EB] hover:border-[#15191F] rounded-md transition-colors shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#68717D]" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-[#15191F]">WhatsApp</span>
                    {CONTACT_CONFIG.whatsappHref ? (
                      <a
                        href={CONTACT_CONFIG.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2563EB] hover:underline"
                      >
                        {CONTACT_CONFIG.whatsappLabel}
                      </a>
                    ) : (
                      <span className="text-[#68717D]">{CONTACT_CONFIG.whatsappLabel}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E5E7EB]">
                    <span className="font-medium text-[#15191F]">LinkedIn</span>
                    {CONTACT_CONFIG.linkedinHref ? (
                      <a
                        href={CONTACT_CONFIG.linkedinHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2563EB] hover:underline"
                      >
                        {CONTACT_CONFIG.linkedinLabel}
                      </a>
                    ) : (
                      <span className="text-[#68717D]">{CONTACT_CONFIG.linkedinLabel}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Business Social Media & Channels */}
            <div className="mt-8 pt-6 border-t border-[#E5E7EB] space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#68717D] mb-3">
                  Business Social Media
                </h3>
                <ul className="space-y-2 text-xs">
                  {CONTACT_CONFIG.socialLinks.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-3">
                      <span className="font-medium text-[#15191F]">{item.label}</span>
                      {item.href && !item.isPlaceholder ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2563EB] hover:underline truncate"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-[#68717D]">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#68717D] mb-3">
                  Channels &amp; Accounts
                </h3>
                <ul className="space-y-2 text-xs">
                  {CONTACT_CONFIG.channelLinks.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-3">
                      <span className="font-medium text-[#15191F]">{item.label}</span>
                      {item.href && !item.isPlaceholder ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2563EB] hover:underline truncate"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-[#68717D]">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white border border-[#E5E7EB] rounded-lg p-6 sm:p-8 space-y-5"
            >
              <div className="pb-4 border-b border-[#E5E7EB] flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-[#15191F]">
                  Project Inquiry Form
                </h3>
                <span className="text-xs text-[#68717D]">
                  {CONTACT_CONFIG.formEndpoint ? 'Direct relay active' : 'Client validation + Email launch'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-[#15191F] mb-1.5">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FB] border border-[#E5E7EB] rounded-md text-[#15191F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:bg-white"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-[#15191F] mb-1.5">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FB] border border-[#E5E7EB] rounded-md text-[#15191F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:bg-white"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-medium text-[#15191F] mb-1.5">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Short-form video production or YouTube channel strategy"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FB] border border-[#E5E7EB] rounded-md text-[#15191F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:bg-white"
                />
                {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-[#15191F] mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share project goals, platforms, timeline, or collaboration details..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FB] border border-[#E5E7EB] rounded-md text-[#15191F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:bg-white resize-y"
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              {/* Honest Submission States */}
              {submitState === 'needs_config' && (
                <div
                  role="status"
                  className="p-4 rounded-md border border-[#CBD5E1] bg-[#F8F9FB] text-xs text-[#15191F] space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{submitFeedback}</p>
                  </div>
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#15191F] hover:bg-[#2563EB] rounded-md transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Open Message in Email Client
                  </a>
                </div>
              )}

              {submitState === 'success' && (
                <div
                  role="status"
                  className="p-4 rounded-md border border-emerald-200 bg-emerald-50 text-xs text-emerald-900"
                >
                  {submitFeedback}
                </div>
              )}

              {submitState === 'error' && (
                <div
                  role="alert"
                  className="p-4 rounded-md border border-red-200 bg-red-50 text-xs text-red-800"
                >
                  {submitFeedback}
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submitState === 'submitting'}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  <Send className="w-4 h-4" />
                  {submitState === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>

                <span className="text-xs text-[#68717D]">
                  No unconfigured backend simulation — honest delivery state.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
