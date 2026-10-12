import { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import { getSolutions } from '@/data/cms';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LocalizedLink } from '@/components/ui';
import { constructMetadata } from '@/seo/metadata';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as 'en' | 'bn' | 'ar');
  
  return constructMetadata({
    title: `${dict.navigation.solutions} | 9STAR Technologies`,
    description: dict.solutionsPage.hero.description,
    url: `https://9star.vercel.app/${lang}/solutions`,
  });
}

export default async function SolutionsPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as 'en' | 'bn' | 'ar');
  const t = dict.solutionsPage;
  const solutions = await getSolutions();

  return (
    <main className="w-full bg-[#fbfcfd] min-h-screen">
      {/* 1. Luxury Editorial Hero Header */}
      <section className="bg-white border-b border-[var(--nt-ink-200)] pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <div className="hero-badge mb-4 mx-auto">
            <span className="hero-pulse-dot"></span>
            <span>Enterprise Solutions</span>
          </div>
          <h1 className="heading-xl text-[var(--ink)] mb-4 tracking-tight">
            {t.hero.title}
          </h1>
          <p className="body-lead text-[var(--ink-soft)] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
        </div>
      </section>

      {/* 2. Solutions Listing */}
      <section className="py-20 md:py-24">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {solutions.map((solution) => {
              const localizedSolution = dict.solutionsData.items[solution.id as keyof typeof dict.solutionsData.items];
              return (
                <div key={solution.id} className="p-8 sm:p-10 rounded-3xl bg-white border border-[var(--nt-ink-200)] hover:border-[var(--nt-accent)] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--nt-accent)] transition-colors mb-3">
                      {localizedSolution.title}
                    </h3>
                    <p className="text-[var(--ink-soft)] text-sm sm:text-base mb-6 leading-relaxed">
                      {localizedSolution.shortDescription}
                    </p>
                    
                    <div className="mb-8 p-6 bg-[#f8fafc] rounded-2xl border border-[var(--nt-ink-200)]">
                      <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-bold mb-2 block">
                        {t.list.problemLabel}
                      </span>
                      <p className="text-[var(--ink)] text-sm sm:text-base leading-relaxed italic">
                        &ldquo;{localizedSolution.problem}&rdquo;
                      </p>
                    </div>
                  </div>
                  
                  <LocalizedLink 
                    href={`/solutions/${localizedSolution.slug}`} 
                    className="w-full py-3.5 rounded-full font-bold text-sm bg-slate-50 border border-[var(--nt-ink-200)] text-[var(--ink)] group-hover:bg-[var(--nt-accent)] group-hover:text-white group-hover:border-[var(--nt-accent)] transition-all text-center block"
                  >
                    {t.list.exploreButton}
                  </LocalizedLink>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="py-20 md:py-28 bg-white border-t border-[var(--nt-ink-200)]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="heading-md text-[var(--ink)] mb-4">{t.cta.title}</h2>
          <p className="text-[var(--ink-soft)] text-base sm:text-lg mb-8 leading-relaxed">
            {t.cta.description}
          </p>
          <LocalizedLink 
            href="/contact" 
            className="inline-block px-8 py-3.5 rounded-full font-bold text-sm bg-[var(--nt-accent)] text-white hover:bg-blue-700 transition-all shadow-md text-center"
          >
            {t.cta.button}
          </LocalizedLink>
        </div>
      </section>
    </main>
  );
}
