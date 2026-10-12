import { Metadata } from 'next';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/contact/ContactForm';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.navigation.contact} | 9STAR Technologies`,
    description: dict.contact.hero.subtitle,
  };
}

export default async function ContactPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  
  return (
    <main className="w-full bg-[var(--paper)]">
      {/* Editorial Contact Header */}
      <section className="bg-white border-b border-[var(--nt-ink-200)] pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        {/* Subtle radial glow */}
        <span className="blob" style={{ width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)', top: '10%', right: '10%' }}></span>
        
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 text-center">
          <div className="hero-badge mb-4 mx-auto">
            <span className="hero-pulse-dot"></span>
            <span>Let&apos;s Connect</span>
          </div>
          <h1 className="heading-xl text-[var(--ink)] mb-4">{dict.contact.hero.title}</h1>
          <p className="body-lead text-[var(--ink-soft)] text-lg max-w-2xl mx-auto">
            {dict.contact.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Main Form & Contact Info */}
      <section className="py-20 bg-[var(--paper-deep)]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Contact Form Container */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[var(--nt-ink-200)] shadow-xs">
              <h2 className="heading-lg text-[var(--ink)] mb-2">{dict.contact.form.title}</h2>
              <p className="text-sm text-[var(--ink-soft)] mb-8">
                Fill out the form below and our engineering team will respond within 24 hours.
              </p>
              <ContactForm dict={dict} />
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="eyebrow mb-2">COMMUNICATION CHANNELS</p>
                <h2 className="heading-lg text-[var(--ink)] mb-6">{dict.contact.info.title}</h2>
              </div>
              
              <div className="p-6 bg-white rounded-2xl border border-[var(--nt-ink-200)] shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[var(--nt-accent)] flex items-center justify-center shrink-0 border border-blue-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--nt-ink-400)] block font-semibold mb-1">{dict.contact.info.email}</span>
                  <a href="mailto:contact@9startechnologies.com" className="text-[var(--ink)] hover:text-[var(--nt-accent)] font-semibold transition-colors">
                    contact@9startechnologies.com
                  </a>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[var(--nt-ink-200)] shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[var(--nt-accent)] flex items-center justify-center shrink-0 border border-blue-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--nt-ink-400)] block font-semibold mb-1">{dict.contact.info.phone}</span>
                  <a href="tel:+18005550199" className="text-[var(--ink)] hover:text-[var(--nt-accent)] font-semibold transition-colors">
                    +1 (800) 555-0199
                  </a>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[var(--nt-ink-200)] shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[var(--nt-accent)] flex items-center justify-center shrink-0 border border-blue-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--nt-ink-400)] block font-semibold mb-1">{dict.contact.info.office}</span>
                  <p className="text-[var(--ink)] font-medium text-sm leading-relaxed">
                    123 Innovation Drive, Tech District<br />San Francisco, CA 94105
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[var(--nt-ink-200)] shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[var(--nt-accent)] flex items-center justify-center shrink-0 border border-blue-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--nt-ink-400)] block font-semibold mb-1">{dict.contact.info.hours}</span>
                  <p className="text-[var(--ink)] font-medium text-sm leading-relaxed">
                    Mon - Fri: 9:00 AM - 6:00 PM (PT)
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
