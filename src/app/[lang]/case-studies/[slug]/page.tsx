import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, getCaseStudies } from '@/data/cms';
import { getDictionary } from '@/i18n/getDictionary';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { ArticleJsonLd } from '@/components/seo/JsonLd';
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const study = await getCaseStudyBySlug(resolvedParams.slug);
  
  if (!study) {
    return { title: 'Case Study Not Found' };
  }

  const lang = resolvedParams.lang as 'en' | 'bn' | 'ar';
  const clientName = study.clientName;
  const description = study.problem[lang] || study.problem.en;

  return {
    title: study.seoMetadata?.title?.[lang] || study.seoMetadata?.title?.en || `${clientName} Case Study | 9STAR Technologies`,
    description: study.seoMetadata?.description?.[lang] || study.seoMetadata?.description?.en || description,
    openGraph: {
      title: study.seoMetadata?.title?.[lang] || study.seoMetadata?.title?.en || `${clientName} Case Study | 9STAR Technologies`,
      description: study.seoMetadata?.description?.[lang] || study.seoMetadata?.description?.en || description,
      images: study.seoMetadata?.ogImage ? [study.seoMetadata.ogImage] : [],
    },
    robots: {
      index: study.seoMetadata?.noIndex !== true,
      follow: study.seoMetadata?.noIndex !== true,
    }
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const study = await getCaseStudyBySlug(resolvedParams.slug);

  if (!study) {
    notFound();
  }

  const lang = resolvedParams.lang as 'en' | 'bn' | 'ar';
  const dict = await getDictionary(lang);
  
  const clientName = study.clientName;
  const industry = study.industry[lang] || study.industry.en;
  const shortDescription = study.problem[lang] || study.problem.en;
  const problem = study.problem[lang] || study.problem.en;
  const challenge = study.challenge[lang] || study.challenge.en;
  const solution = study.solution[lang] || study.solution.en;
  const process = study.process.map((step) => ({
    title: step.title[lang] || step.title.en,
    description: step.description[lang] || step.description.en,
  }));
  const outcome = study.outcome.map((o) => o[lang] || o.en);
  const technology = study.technology;

  return (
    <main className="w-full">
      <AnalyticsTracker event="case_study_view" properties={{ case_study_id: study.id, case_study_title: clientName }} />
      <ArticleJsonLd 
        title={clientName} 
        description={shortDescription} 
        datePublished={study.publishDate}
      />
      {/* 1. Luxury Editorial Hero Header */}
      <section className="bg-white border-b border-[var(--nt-ink-200)] pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          <div className="mb-6">
            <Link href={`/${resolvedParams.lang}/case-studies`} className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--nt-accent)] hover:underline">
              <span>&larr;</span>
              <span>{dict.caseStudyDetail.backToCaseStudies}</span>
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <div className="hero-badge mb-4">
              <span className="hero-pulse-dot"></span>
              <span>{industry}</span>
            </div>
            <h1 className="heading-xl text-[var(--ink)] mb-4 tracking-tight">
              {clientName}
            </h1>
            <p className="body-lead text-[var(--ink-soft)] text-lg sm:text-xl leading-relaxed">
              {shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Split */}
      <section className="py-20 md:py-24 bg-[#fbfcfd]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Narrative */}
            <div className="lg:col-span-8">
              
              <div className="mb-14">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
                  Diagnosis
                </span>
                <h2 className="heading-sm text-[var(--ink)] mb-4">{dict.caseStudyDetail.theProblem}</h2>
                <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed">
                  {problem}
                </p>
              </div>

              <div className="mb-14">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-semibold mb-2 block">
                  Core Obstacle
                </span>
                <h2 className="heading-sm text-[var(--ink)] mb-4">{dict.caseStudyDetail.theChallenge}</h2>
                <div className="text-[var(--ink)] text-base sm:text-lg leading-relaxed p-7 bg-white rounded-2xl border border-[var(--nt-ink-200)] border-l-4 border-l-[var(--nt-accent)] shadow-xs">
                  {challenge}
                </div>
              </div>

              <div className="mb-14">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-semibold mb-2 block">
                  Architecture & Implementation
                </span>
                <h2 className="heading-sm text-[var(--ink)] mb-4">{dict.caseStudyDetail.theSolution}</h2>
                <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed">
                  {solution}
                </p>
              </div>

              <div className="mb-14">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
                  Milestones
                </span>
                <h2 className="heading-sm text-[var(--ink)] mb-8">{dict.caseStudyDetail.ourProcess}</h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-[var(--nt-ink-200)]">
                  {process.map((step, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-[var(--nt-accent)] text-white font-mono font-bold text-xs shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        {idx + 1}
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-[var(--nt-ink-200)] shadow-xs">
                        <h3 className="font-bold text-[var(--ink)] mb-1 text-base">{step.title}</h3>
                        <p className="text-[var(--ink-soft)] text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sidebar (Tech, Outcomes) */}
            <div className="lg:col-span-4 space-y-8">
              
              <div className="p-7 sm:p-8 bg-white border border-[var(--nt-ink-200)] rounded-2xl shadow-xs">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-semibold mb-2 block">
                  Measured Impact
                </span>
                <h3 className="text-xl font-bold text-[var(--ink)] mb-6">{dict.caseStudyDetail.theOutcome}</h3>
                <ul className="space-y-4">
                  {outcome.map((result, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold mr-3 shrink-0 mt-0.5 border border-emerald-200">
                        ✓
                      </span>
                      <p className="text-[var(--ink-soft)] text-sm leading-relaxed">{result}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-7 sm:p-8 bg-white border border-[var(--nt-ink-200)] rounded-2xl shadow-xs">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
                  Stack Architecture
                </span>
                <h3 className="text-xl font-bold text-[var(--ink)] mb-4">{dict.caseStudyDetail.technologyUsed}</h3>
                <div className="flex flex-wrap gap-2">
                  {technology.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-50 border border-[var(--nt-ink-200)] rounded-lg text-xs font-mono font-medium text-[var(--ink-soft)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {study.relatedServiceIds && study.relatedServiceIds.length > 0 && (
                <div className="p-7 sm:p-8 bg-white border border-[var(--nt-ink-200)] rounded-2xl shadow-xs">
                  <h3 className="text-lg font-bold text-[var(--ink)] mb-4">{dict.caseStudyDetail.servicesProvided}</h3>
                  <div className="flex flex-col gap-2.5">
                    {study.relatedServiceIds.map((serviceId: string, idx: number) => (
                      <Link key={idx} href={`/${resolvedParams.lang}/services/${serviceId}`} className="text-[var(--nt-accent)] hover:underline text-sm font-semibold inline-flex items-center gap-1.5">
                        <span>&rarr;</span>
                        <span>{dict.caseStudyDetail.viewServiceReference}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 3. Project Gallery Section */}
      <section className="py-20 bg-white border-t border-[var(--nt-ink-200)]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="heading-md text-[var(--ink)]">{dict.caseStudyDetail.projectGallery}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#f8fafc] border border-[var(--nt-ink-200)] rounded-2xl aspect-[4/3] flex items-center justify-center p-6 text-center text-[var(--ink-soft)] text-sm font-medium shadow-xs hover:border-[var(--nt-accent)] transition-all">
              {dict.caseStudyDetail.galleryImage1}
            </div>
            <div className="bg-[#f8fafc] border border-[var(--nt-ink-200)] rounded-2xl aspect-[4/3] flex items-center justify-center p-6 text-center text-[var(--ink-soft)] text-sm font-medium shadow-xs hover:border-[var(--nt-accent)] transition-all">
              {dict.caseStudyDetail.galleryImage2}
            </div>
            <div className="bg-[#f8fafc] border border-[var(--nt-ink-200)] rounded-2xl aspect-[4/3] flex items-center justify-center p-6 text-center text-[var(--ink-soft)] text-sm font-medium shadow-xs hover:border-[var(--nt-accent)] transition-all md:col-span-2 lg:col-span-1">
              {dict.caseStudyDetail.galleryImage3}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
