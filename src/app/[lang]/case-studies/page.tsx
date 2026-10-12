import { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import { getCaseStudies } from '@/data/cms';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { LocalizedLink } from '@/components/ui';
import { constructMetadata } from '@/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'bn' | 'ar');
  return constructMetadata({
    title: `${dict.caseStudiesPage.hero.title} | 9STAR Technologies`,
    description: dict.caseStudiesPage.hero.description,
    url: `https://9star.vercel.app/${lang}/case-studies`,
  });
}

export default async function CaseStudiesPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as 'en' | 'bn' | 'ar');
  const t = dict.caseStudiesPage;

  const caseStudies = await getCaseStudies();

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
            <span>Client Impact & Results</span>
          </div>
          <h1 className="heading-xl text-[var(--ink)] mb-4 tracking-tight">
            {t.hero.title}
          </h1>
          <p className="body-lead text-[var(--ink-soft)] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
        </div>
      </section>

      {/* 2. Case Studies Listing */}
      <section className="py-20 md:py-24">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {caseStudies.length === 0 ? (
            // Clean Empty State
            <div className="text-center py-20 border border-dashed border-[var(--nt-ink-200)] rounded-3xl bg-white p-12">
              <h3 className="text-xl font-bold text-[var(--ink)] mb-2">{t.emptyState.title}</h3>
              <p className="text-[var(--ink-soft)] max-w-md mx-auto">
                {t.emptyState.description}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {caseStudies.map((study: any) => {
                const clientName = study.clientName;
                const industry = study.industry[lang as 'en' | 'bn' | 'ar'] || study.industry.en;
                const description = study.problem[lang as 'en' | 'bn' | 'ar'] || study.problem.en;
                
                return (
                  <LocalizedLink key={study.id} href={`/case-studies/${study.slug}`} className="group block focus-visible:outline-none" style={{ textDecoration: 'none' }}>
                    <div className="h-full rounded-2xl bg-white border border-[var(--nt-ink-200)] hover:border-[var(--nt-accent)] shadow-xs hover:shadow-xl transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <h3 className="text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--nt-accent)] transition-colors">
                            {clientName}
                          </h3>
                          <span className="text-xs font-mono font-semibold px-3 py-1 bg-blue-50/80 border border-blue-200/80 rounded-full text-[var(--nt-accent)] shrink-0">
                            {industry}
                          </span>
                        </div>
                        <p className="text-[var(--ink-soft)] text-sm sm:text-base leading-relaxed mb-8">
                          {description}
                        </p>
                      </div>
                      
                      <div className="pt-6 border-t border-[var(--nt-ink-200)] flex items-center justify-between text-[var(--nt-accent)] font-bold text-sm">
                        <span>{t.list.readCaseStudy}</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">&rarr;</span>
                      </div>
                    </div>
                  </LocalizedLink>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
