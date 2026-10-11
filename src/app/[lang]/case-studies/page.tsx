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
    <main className="w-full">
      {/* Hero Section */}
      <section className="bg-[var(--color-surface)] pt-24 pb-16 md:pt-32 md:pb-24 border-b border-[var(--color-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <Typography variant="h1" className="mb-6">
              {t.hero.title}
            </Typography>
            <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-xl leading-relaxed">
              {t.hero.description}
            </Typography>
          </div>
        </div>
      </section>

      {/* Case Studies Listing */}
      <section className="py-20 bg-[var(--color-base)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {caseStudies.length === 0 ? (
            // Clean Empty State
            <div className="text-center py-20 border border-dashed border-[var(--color-border)] rounded-xl bg-[var(--color-surface)]">
              <Typography variant="h3" className="mb-4 text-[var(--color-text)] opacity-60">{t.emptyState.title}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-50">
                {t.emptyState.description}
              </Typography>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {caseStudies.map((study: any) => {
                const clientName = study.clientName;
                const industry = study.industry[lang as 'en' | 'bn' | 'ar'] || study.industry.en;
                // Since shortDescription is not on CaseStudy, use problem as description for the card
                const description = study.problem[lang as 'en' | 'bn' | 'ar'] || study.problem.en;
                
                return (
                  <LocalizedLink key={study.id} href={`/case-studies/${study.slug}`} className="group block focus-visible:outline-none" style={{ textDecoration: 'none' }}>
                    <Card className="h-full border border-[var(--color-border)] group-hover:border-[var(--color-primary)] transition-all duration-200 p-7 md:p-8 flex flex-col">
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <Typography variant="h3" className="text-xl font-bold group-hover:text-[var(--color-primary)] transition-colors">{clientName}</Typography>
                        <span className="text-xs font-semibold px-2.5 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full text-[var(--color-text-muted)] shrink-0">
                          {industry}
                        </span>
                      </div>
                      <Typography variant="body" className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 flex-grow">
                        {description}
                      </Typography>
                      
                      <div className="mt-auto pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-[var(--color-primary)] font-semibold text-sm">
                        <span>{t.list.readCaseStudy}</span>
                        <span className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                      </div>
                    </Card>
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
