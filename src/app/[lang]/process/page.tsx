import { Metadata } from 'next';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LocalizedLink } from '@/components/ui';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.process.hero.title} | 9STAR Technologies`,
    description: dict.process.hero.subtitle,
  };
}

const processSteps = [
  {
    id: '01',
    title: 'Discover',
    description: 'We start by learning about your organization, your goals, and identifying your core challenges without technical jargon.'
  },
  {
    id: '02',
    title: 'Understand',
    description: 'We dive deep into the specific problem to ensure we are treating the root cause, not just the symptoms.'
  },
  {
    id: '03',
    title: 'Plan',
    description: 'We map out a clear, step-by-step strategy including timelines, technical architecture, and exact deliverables.'
  },
  {
    id: '04',
    title: 'Request',
    description: 'Once the plan is approved, we formalize the project requirements and gather any necessary assets from your team.'
  },
  {
    id: '05',
    title: 'Execute',
    description: 'Our team builds the solution. You receive regular updates and maintain full visibility into our progress.'
  },
  {
    id: '06',
    title: 'Review',
    description: 'We test thoroughly and present the work for your feedback, ensuring it matches the agreed-upon specifications.'
  },
  {
    id: '07',
    title: 'Deliver',
    description: 'We hand over the finalized project, handle deployment, and provide necessary training for your team.'
  },
  {
    id: '08',
    title: 'Support',
    description: 'We provide ongoing assistance, monitoring, and maintenance to keep your systems running smoothly long-term.'
  }
];

const faqs = [
  {
    question: 'What happens after I contact you?',
    answer: 'We typically schedule a brief, no-pressure introductory call. The goal is simply to discuss your needs, answer your initial questions, and determine if we are the right fit for your project.'
  },
  {
    question: 'What information do you need?',
    answer: 'Initially, just a general idea of your goal or problem. Once a project begins, we will provide a clear checklist of specific assets, access credentials, or documentation required.'
  },
  {
    question: 'When will you respond?',
    answer: 'We respect your time. Our team aims to respond to all new inquiries and service requests within 1 to 2 business days.'
  },
  {
    question: 'How does pricing work?',
    answer: 'We believe in transparent, upfront pricing. Depending on the nature of the work, we provide a fixed project fee, a structured package, or a clear hourly estimate. No hidden surprises.'
  },
  {
    question: 'How are revisions handled?',
    answer: 'Each project phase includes designated review cycles. We ensure you are completely satisfied with the progress before we lock it in and move to the next phase.'
  },
  {
    question: 'How do I receive the final result?',
    answer: 'We handle the technical deployment and data migration. Upon completion, we hand off all ownership, source files (if applicable), and documentation via secure channels.'
  },
  {
    question: 'What happens after completion?',
    answer: 'Technology requires upkeep. We offer optional support and maintenance plans to ensure your solution remains secure, updated, and optimized as your business grows.'
  }
];

export default async function ProcessPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  const translatedProcessSteps = processSteps.map(step => ({
    ...step,
    title: dict.process.steps[step.id as keyof typeof dict.process.steps]?.title || step.title,
    description: dict.process.steps[step.id as keyof typeof dict.process.steps]?.description || step.description
  }));

  const translatedFaqs = [
    { question: dict.process.faqs.afterContact.question, answer: dict.process.faqs.afterContact.answer },
    { question: dict.process.faqs.informationNeeded.question, answer: dict.process.faqs.informationNeeded.answer },
    { question: dict.process.faqs.responseWhen.question, answer: dict.process.faqs.responseWhen.answer },
    { question: dict.process.faqs.pricing.question, answer: dict.process.faqs.pricing.answer },
    { question: dict.process.faqs.revisions.question, answer: dict.process.faqs.revisions.answer },
    { question: dict.process.faqs.receiveResult.question, answer: dict.process.faqs.receiveResult.answer },
    { question: dict.process.faqs.afterCompletion.question, answer: dict.process.faqs.afterCompletion.answer }
  ];

  return (
    <main className="w-full bg-[#fbfcfd] min-h-screen">
      {/* 1. Luxury Editorial Hero Header */}
      <section className="bg-white border-b border-[var(--nt-ink-200)] pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        {/* Ambient Subtle Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <div className="hero-badge mb-4 mx-auto">
            <span className="hero-pulse-dot"></span>
            <span>Delivery Methodology</span>
          </div>
          <h1 className="heading-xl text-[var(--ink)] mb-4 tracking-tight">
            {dict.process.hero.title}
          </h1>
          <p className="body-lead text-[var(--ink-soft)] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {dict.process.hero.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Visual Timeline Section */}
      <section className="py-20 md:py-28 relative">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
              Step-by-Step Execution
            </span>
            <h2 className="heading-md text-[var(--ink)] mb-3">{dict.process.timeline.title}</h2>
            <p className="text-[var(--ink-soft)] text-base">
              {dict.process.timeline.subtitle}
            </p>
          </div>

          <div className="relative">
            {/* Center Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-[var(--nt-ink-200)] -translate-x-1/2"></div>

            <div className="space-y-10 md:space-y-12">
              {translatedProcessSteps.map((step) => (
                <div key={step.id} className="relative flex flex-col md:flex-row items-center md:even:flex-row-reverse group">
                  
                  {/* Timeline Badge (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-[var(--nt-accent)] shadow-sm items-center justify-center text-[var(--nt-accent)] font-mono font-bold text-sm z-10 transition-transform group-hover:scale-110 duration-200">
                    {step.id}
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-[46%] flex justify-end md:even:justify-start">
                    <div className="w-full p-7 md:p-8 rounded-2xl bg-white border border-[var(--nt-ink-200)] shadow-xs hover:border-[var(--nt-accent)] hover:shadow-md transition-all relative overflow-hidden">
                      {/* Mobile Step Indicator */}
                      <div className="md:hidden inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-[var(--nt-accent)] font-mono text-xs font-bold mb-3 border border-blue-100">
                        Phase {step.id}
                      </div>
                      <h3 className="text-xl font-bold text-[var(--ink)] mb-2 group-hover:text-[var(--nt-accent)] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[var(--ink-soft)] text-sm sm:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Frequently Asked Questions */}
      <section className="py-20 md:py-24 bg-white border-t border-b border-[var(--nt-ink-200)]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
              Transparency First
            </span>
            <h2 className="heading-md text-[var(--ink)] mb-3">{dict.process.faqSection.title}</h2>
            <p className="text-[var(--ink-soft)] text-base max-w-xl mx-auto">
              {dict.process.faqSection.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {translatedFaqs.map((faq, idx) => (
              <div key={idx} className="p-6 sm:p-7 bg-[#f8fafc] rounded-2xl border border-[var(--nt-ink-200)] hover:border-slate-300 transition-colors">
                <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-2">{faq.question}</h3>
                <p className="text-[var(--ink-soft)] text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Luxury Dark CTA Card */}
      <section className="py-20 md:py-28">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-gradient-to-br from-[#080d1a] via-[#0f172a] to-[#1e293b] text-white p-10 md:p-16 rounded-3xl border border-slate-800 text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="hero-badge !bg-white/10 !border-white/20 !text-cyan-300 mb-4 mx-auto inline-flex">
                <span className="hero-pulse-dot !bg-cyan-400"></span>
                <span>Ready to Launch</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                {dict.process.cta.title}
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
                {dict.process.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <LocalizedLink 
                  href="/services" 
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-md text-center"
                >
                  {dict.process.cta.viewServices}
                </LocalizedLink>
                <LocalizedLink 
                  href="/contact" 
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm border border-white/20 text-white hover:bg-white/10 transition-all text-center"
                >
                  {dict.process.cta.contactUs}
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
