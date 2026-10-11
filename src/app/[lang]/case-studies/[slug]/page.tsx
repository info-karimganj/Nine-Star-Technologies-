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
      {/* Hero Section */}
      <section className="bg-[var(--color-primary)] text-[var(--color-base)] pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-10">
            <Link href={`/${resolvedParams.lang}/case-studies`} className="text-[var(--color-base)]/60 hover:text-[var(--color-base)] transition-colors text-sm font-medium">
              {dict.caseStudyDetail.backToCaseStudies}
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <div className="mb-4 inline-block px-3 py-1 bg-[var(--color-base)]/10 rounded-full text-xs font-semibold tracking-wider uppercase text-[var(--color-base)]/80">
              {industry}
            </div>
            <Typography variant="h1" className="text-[var(--color-base)] mb-6">
              {clientName}
            </Typography>
            <Typography variant="body" className="text-[var(--color-text-muted)] text-xl leading-relaxed">
              {shortDescription}
            </Typography>
          </div>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="py-20 bg-[var(--color-base)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Narrative */}
            <div className="lg:col-span-8">
              
              <div className="mb-16">
                <Typography variant="h2" className="mb-6 text-2xl">{dict.caseStudyDetail.theProblem}</Typography>
                <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed">
                  {problem}
                </Typography>
              </div>

              <div className="mb-16">
                <Typography variant="h2" className="mb-6 text-2xl">{dict.caseStudyDetail.theChallenge}</Typography>
                <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed p-6 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
                  {challenge}
                </Typography>
              </div>

              <div className="mb-16">
                <Typography variant="h2" className="mb-6 text-2xl">{dict.caseStudyDetail.theSolution}</Typography>
                <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed">
                  {solution}
                </Typography>
              </div>

              <div className="mb-16">
                <Typography variant="h2" className="mb-8 text-2xl">{dict.caseStudyDetail.ourProcess}</Typography>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  {process.map((step, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-[var(--color-primary)] text-[var(--color-base)] font-bold text-xs shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        {idx + 1}
                      </div>
                      <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 shadow-sm border border-[var(--color-border)]">
                        <Typography variant="h3" className="mb-2 text-base">{step.title}</Typography>
                        <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                          {step.description}
                        </Typography>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sidebar (Tech, Outcomes) */}
            <div className="lg:col-span-4 space-y-12">
              
              <div className="p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
                <Typography variant="h3" className="mb-6">{dict.caseStudyDetail.theOutcome}</Typography>
                <ul className="space-y-4">
                  {outcome.map((result, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <Typography variant="body" className="text-[var(--color-text)] opacity-80 pt-0.5">{result}</Typography>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Typography variant="h3" className="mb-6 text-lg">{dict.caseStudyDetail.technologyUsed}</Typography>
                <div className="flex flex-wrap gap-2">
                  {technology.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md text-xs font-medium text-[var(--color-text)] opacity-70">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {study.relatedServiceIds && study.relatedServiceIds.length > 0 && (
                <div>
                  <Typography variant="h3" className="mb-4 text-lg">{dict.caseStudyDetail.servicesProvided}</Typography>
                  <div className="flex flex-col gap-3">
                    {study.relatedServiceIds.map((serviceId: string, idx: number) => (
                      <Link key={idx} href={`/${resolvedParams.lang}/services/${serviceId}`} className="text-[var(--color-primary)] hover:underline text-sm font-medium">
                        {dict.caseStudyDetail.viewServiceReference}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Typography variant="h2" className="mb-12 text-center">{dict.caseStudyDetail.projectGallery}</Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Datas for Gallery */}
            <div className="bg-[var(--color-base)] border border-dashed border-[var(--color-border)] rounded-xl aspect-[4/3] flex items-center justify-center">
              <Typography variant="small" className="text-[var(--color-text-muted)]">{dict.caseStudyDetail.galleryImage1}</Typography>
            </div>
            <div className="bg-[var(--color-base)] border border-dashed border-[var(--color-border)] rounded-xl aspect-[4/3] flex items-center justify-center">
              <Typography variant="small" className="text-[var(--color-text-muted)]">{dict.caseStudyDetail.galleryImage2}</Typography>
            </div>
            <div className="bg-[var(--color-base)] border border-dashed border-[var(--color-border)] rounded-xl aspect-[4/3] flex items-center justify-center md:col-span-2 lg:col-span-1">
              <Typography variant="small" className="text-[var(--color-text-muted)]">{dict.caseStudyDetail.galleryImage3}</Typography>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
