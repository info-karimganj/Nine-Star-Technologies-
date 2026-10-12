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
    <main className="w-full bg-[#fbfcfd] min-h-screen">
      <ServiceJsonLd name={solution.title as unknown as string} description={solution.shortDescription as unknown as string} />
      
      {/* 1. Luxury Editorial Hero Header */}
      <section className="bg-white border-b border-[var(--nt-ink-200)] pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          <div className="mb-6">
            <Link href={`/${resolvedParams.lang}/solutions`} className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--nt-accent)] hover:underline">
              <span>&larr;</span>
              <span>{dict.solutionDetail.backToSolutions}</span>
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <div className="hero-badge mb-4">
              <span className="hero-pulse-dot"></span>
              <span>Architecture Blueprint</span>
            </div>
            <h1 className="heading-xl text-[var(--ink)] mb-4 tracking-tight">
              {solution.title}
            </h1>
            <p className="body-lead text-[var(--ink-soft)] text-lg sm:text-xl leading-relaxed mb-8">
              {solution.shortDescription}
            </p>
            <LocalizedLink 
              href="/contact" 
              className="inline-block px-8 py-3.5 rounded-full font-bold text-sm bg-[var(--nt-accent)] text-white hover:bg-blue-700 transition-all shadow-md"
            >
              {solution.ctaText || dict.solutionDetail.discussSolution}
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* 2. Problem & Audience */}
      <section className="py-20 md:py-24">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            
            {/* The Problem */}
            <div className="lg:col-span-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-semibold mb-2 block">
                The Pain Point
              </span>
              <h2 className="heading-sm text-[var(--ink)] mb-4">{dict.solutionDetail.theChallenge}</h2>
              <div className="text-[var(--ink)] text-base sm:text-lg leading-relaxed p-7 sm:p-8 bg-white rounded-2xl border border-[var(--nt-ink-200)] border-l-4 border-l-amber-500 shadow-xs italic">
                &ldquo;{solution.problem}&rdquo;
              </div>
            </div>

            {/* Who Needs It */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
                Target Ecosystem
              </span>
              <h2 className="heading-sm text-[var(--ink)] mb-4">{dict.solutionDetail.whoNeedsThis}</h2>
              <ul className="space-y-3">
                {solution.whoNeedsIt.map((audience: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-[var(--nt-accent)] flex items-center justify-center text-xs font-bold mr-3 shrink-0 mt-0.5 border border-blue-100">
                      ✓
                    </span>
                    <span className="text-[var(--ink-soft)] text-sm sm:text-base leading-relaxed">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. The Solution & Benefits (Luxury Dark Section with Crystal Clarity) */}
      <section className="py-20 bg-gradient-to-br from-[#080d1a] via-[#0f172a] to-[#1e293b] text-white">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="max-w-4xl mb-14">
            <span className="hero-badge !bg-white/10 !border-white/20 !text-cyan-300 mb-4 inline-flex">
              <span className="hero-pulse-dot !bg-cyan-400"></span>
              <span>Our Strategic Framework</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">{dict.solutionDetail.ourSolution}</h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {solution.solution}
            </p>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 tracking-tight">{dict.solutionDetail.keyBenefits}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {solution.benefits.map((benefit: string, idx: number) => (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center backdrop-blur-xs">
                <div className="w-10 h-10 rounded-full bg-cyan-400/10 text-cyan-300 flex items-center justify-center mr-4 shrink-0 font-bold">
                  ✓
                </div>
                <span className="text-white font-medium text-sm sm:text-base">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Workflow & Implementation */}
      <section className="py-20 md:py-24 bg-white border-b border-[var(--nt-ink-200)]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="mb-16">
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
                Execution Phases
              </span>
              <h2 className="heading-md text-[var(--ink)]">{dict.solutionDetail.howWeImplementIt}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solution.workflow.map((step: any, idx: number) => (
                <div key={idx} className="p-7 rounded-2xl bg-[#f8fafc] border border-[var(--nt-ink-200)] shadow-xs relative">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[var(--nt-accent)] border border-blue-200 font-mono font-bold text-sm flex items-center justify-center mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-[var(--ink)] mb-2 text-base">{step.title}</h3>
                  <p className="text-[var(--ink-soft)] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center bg-blue-50/50 p-8 sm:p-10 rounded-3xl border border-blue-100 shadow-xs">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-bold mb-2 block">
              Estimated Delivery
            </span>
            <h3 className="text-xl font-bold text-[var(--ink)] mb-3">{dict.solutionDetail.implementationTimeline}</h3>
            <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed">
              {solution.implementation}
            </p>
          </div>

        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 md:py-28 bg-[#fbfcfd]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="heading-md text-[var(--ink)] mb-4">{dict.solutionDetail.readyToSolve}</h2>
          <p className="text-[var(--ink-soft)] text-base sm:text-lg mb-8 leading-relaxed">
            {dict.solutionDetail.discussChallenges}
          </p>
          <LocalizedLink 
            href="/contact" 
            className="inline-block px-8 py-3.5 rounded-full font-bold text-sm bg-[var(--nt-accent)] text-white hover:bg-blue-700 transition-all shadow-md"
          >
            {solution.ctaText || dict.solutionDetail.getStarted}
          </LocalizedLink>
        </div>
      </section>

    </main>
  );
}
