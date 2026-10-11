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
    <main className="w-full">
      {/* Hero Section */}
      <section className="bg-[var(--color-primary)] text-[var(--color-base)] pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <Typography variant="h1" className="text-[var(--color-base)] mb-6">
              {dict.process.hero.title}
            </Typography>
            <Typography variant="body" className="text-[var(--color-text-muted)] text-xl leading-relaxed">
              {dict.process.hero.subtitle}
            </Typography>
          </div>
        </div>
      </section>

      {/* Visual Timeline Section */}
      <section className="py-20 md:py-28 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          <div className="text-center mb-16">
            <Typography variant="h2" className="mb-4">{dict.process.timeline.title}</Typography>
            <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-lg">
              {dict.process.timeline.subtitle}
            </Typography>
          </div>

          <div className="relative">
            {/* Center Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>

            <div className="space-y-12 md:space-y-0">
              {translatedProcessSteps.map((step, index) => (
                <div key={step.id} className="relative flex flex-col md:flex-row items-center md:even:flex-row-reverse group">
                  
                  {/* Timeline Dot (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[var(--color-base)] border-4 border-surface shadow-sm items-center justify-center text-[var(--color-primary)] font-bold z-10 transition-transform group-hover:scale-110 duration-300">
                    {step.id}
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-[45%] flex justify-end md:even:justify-start">
                    <Card className="w-full p-8 border-none shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-[var(--color-base)]">
                      {/* Mobile Step Indicator */}
                      <div className="md:hidden mb-4 text-[var(--color-primary)] font-bold text-xl opacity-50">
                        {step.id}
                      </div>
                      <Typography variant="h3" className="mb-3 text-xl group-hover:text-[var(--color-primary)] transition-colors">{step.title}</Typography>
                      <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-base leading-relaxed">
                        {step.description}
                      </Typography>
                    </Card>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 md:py-24 bg-[var(--color-base)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <Typography variant="h2" className="mb-4">{dict.process.faqSection.title}</Typography>
            <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-lg">
              {dict.process.faqSection.subtitle}
            </Typography>
          </div>

          <div className="space-y-6">
            {translatedFaqs.map((faq, idx) => (
              <div key={idx} className="p-8 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
                <Typography variant="h3" className="mb-3 text-lg">{faq.question}</Typography>
                <Typography variant="body" className="text-[var(--color-text)] opacity-70 leading-relaxed">
                  {faq.answer}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[var(--color-primary)] text-[var(--color-base)] text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Typography variant="h2" className="text-[var(--color-base)] mb-6">{dict.process.cta.title}</Typography>
          <Typography variant="body" className="text-[var(--color-text-muted)] text-lg mb-10">
            {dict.process.cta.subtitle}
          </Typography>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <LocalizedLink href="/services">
              <Button size="lg" className="w-full sm:w-auto bg-[var(--color-base)] text-[var(--color-primary)] hover:bg-[var(--color-base)]/90">
                {dict.process.cta.viewServices}
              </Button>
            </LocalizedLink>
            <LocalizedLink href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-[var(--color-base)]/20 text-[var(--color-base)] hover:bg-[var(--color-base)]/10 hover:text-[var(--color-base)]">
                {dict.process.cta.contactUs}
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
