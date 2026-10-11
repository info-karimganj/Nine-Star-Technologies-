import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSolutionBySlug, getSolutions } from '@/data/cms';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LocalizedLink } from '@/components/ui';
import { ServiceJsonLd } from '@/components/seo/JsonLd';

interface Props {
  params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const solutions = await getSolutions();
  if (solutions.length === 0) {
    return [{ slug: 'placeholder' }];
  }
  return solutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const solutionMeta = await getSolutionBySlug(resolvedParams.slug);
  
  if (!solutionMeta) {
    return { title: 'Solution Not Found' };
  }

  const dict = await getDictionary(resolvedParams.lang);
  const solution = dict.solutionsData.items[solutionMeta.id as keyof typeof dict.solutionsData.items];

  if (!solution) {
    return { title: dict.solutionDetail.notFound };
  }

  return {
    title: solutionMeta.seoMetadata?.title?.[resolvedParams.lang as keyof typeof solutionMeta.seoMetadata.title] || solutionMeta.seoMetadata?.title?.en || `${solution.title} ${dict.solutionDetail.pageTitleSuffix}`,
    description: solutionMeta.seoMetadata?.description?.[resolvedParams.lang as keyof typeof solutionMeta.seoMetadata.description] || solutionMeta.seoMetadata?.description?.en || solution.shortDescription,
    openGraph: {
      title: solutionMeta.seoMetadata?.title?.[resolvedParams.lang as keyof typeof solutionMeta.seoMetadata.title] || solutionMeta.seoMetadata?.title?.en || `${solution.title} ${dict.solutionDetail.pageTitleSuffix}`,
      description: solutionMeta.seoMetadata?.description?.[resolvedParams.lang as keyof typeof solutionMeta.seoMetadata.description] || solutionMeta.seoMetadata?.description?.en || solution.shortDescription,
      images: solutionMeta.seoMetadata?.ogImage ? [solutionMeta.seoMetadata.ogImage] : [],
    },
    robots: {
      index: solutionMeta.seoMetadata?.noIndex !== true,
      follow: solutionMeta.seoMetadata?.noIndex !== true,
    }
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const solutionMeta = await getSolutionBySlug(resolvedParams.slug);

  if (!solutionMeta) {
    notFound();
  }

  const dict = await getDictionary(resolvedParams.lang);
  const solution = dict.solutionsData.items[solutionMeta.id as keyof typeof dict.solutionsData.items];

  if (!solution) {
    notFound();
  }

  return (
    <main className="w-full">
      <ServiceJsonLd name={solution.title as unknown as string} description={solution.shortDescription as unknown as string} />
      {/* Breadcrumb & Hero */}
      <section className="bg-[var(--color-surface)] pt-24 pb-16 md:pt-32 md:pb-24 border-b border-[var(--color-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-8">
            <Link href={`/${resolvedParams.lang}/solutions`} className="text-[var(--color-text)] opacity-50 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">
              {dict.solutionDetail.backToSolutions}
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <Typography variant="h1" className="mb-6">
              {solution.title}
            </Typography>
            <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-xl leading-relaxed mb-8">
              {solution.shortDescription}
            </Typography>
            <LocalizedLink href="/contact" className="btn btn-primary btn-lg" style={{ textDecoration: 'none', display: 'inline-block' }}>
              {solution.ctaText || dict.solutionDetail.discussSolution}
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* Problem & Audience */}
      <section className="py-20 bg-[var(--color-base)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* The Problem */}
            <div className="lg:col-span-2">
              <Typography variant="h2" className="mb-6">{dict.solutionDetail.theChallenge}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed p-8 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] border-l-4 border-l-red-500/50">
                "{solution.problem}"
              </Typography>
            </div>

            {/* Who Needs It */}
            <div>
              <Typography variant="h2" className="mb-6">{dict.solutionDetail.whoNeedsThis}</Typography>
              <ul className="space-y-4">
                {solution.whoNeedsIt.map((audience: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-6 h-6 text-[var(--color-text)]/50 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <Typography variant="body" className="text-[var(--color-text)] opacity-80 pt-0.5">{audience}</Typography>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* The Solution & Benefits */}
      <section className="py-20 bg-[var(--color-primary)] text-[var(--color-base)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mb-16">
            <Typography variant="h2" className="text-[var(--color-base)] mb-6">{dict.solutionDetail.ourSolution}</Typography>
            <Typography variant="body" className="text-[var(--color-text-muted)] text-lg leading-relaxed">
              {solution.solution}
            </Typography>
          </div>

          <Typography variant="h3" className="text-[var(--color-base)] mb-8">{dict.solutionDetail.keyBenefits}</Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {solution.benefits.map((benefit: string, idx: number) => (
              <div key={idx} className="p-6 bg-[var(--color-base)]/5 border border-[var(--color-base)]/10 rounded-xl flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-base)]/10 flex items-center justify-center mr-4 shrink-0">
                  <svg className="w-5 h-5 text-[var(--color-base)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <Typography variant="body" className="text-[var(--color-base)] font-medium">{benefit}</Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow & Implementation */}
      <section className="py-20 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="mb-20">
            <Typography variant="h2" className="mb-12 text-center">{dict.solutionDetail.howWeImplementIt}</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {solution.workflow.map((step: any, idx: number) => (
                <Card key={idx} className="p-8 border-none shadow-sm relative overflow-visible">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-[var(--color-primary)] text-[var(--color-base)] rounded-full flex items-center justify-center text-xl font-bold border-4 border-surface">
                    {idx + 1}
                  </div>
                  <Typography variant="h3" className="mb-3 text-lg mt-2">{step.title}</Typography>
                  <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                    {step.description}
                  </Typography>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center bg-[var(--color-base)] p-10 rounded-2xl border border-[var(--color-border)] shadow-sm">
            <Typography variant="h3" className="mb-4">{dict.solutionDetail.implementationTimeline}</Typography>
            <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg">
              {solution.implementation}
            </Typography>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 md:py-24 bg-[var(--color-base)] border-t border-[var(--color-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <Typography variant="h2" className="mb-6">{dict.solutionDetail.readyToSolve}</Typography>
          <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-lg mb-10">
            {dict.solutionDetail.discussChallenges}
          </Typography>
          <LocalizedLink href="/contact" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
            {solution.ctaText || dict.solutionDetail.getStarted}
          </LocalizedLink>
        </div>
      </section>

    </main>
  );
}
