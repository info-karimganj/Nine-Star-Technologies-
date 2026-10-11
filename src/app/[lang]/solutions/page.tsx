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
    <main className="w-full">
      {/* Hero Section */}
      <section className="bg-[var(--color-primary)] text-[var(--color-base)] pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <Typography variant="h1" className="text-[var(--color-base)] mb-6">
              {t.hero.title}
            </Typography>
            <Typography variant="body" className="text-[var(--color-text-muted)] text-xl leading-relaxed">
              {t.hero.description}
            </Typography>
          </div>
        </div>
      </section>

      {/* Solutions Listing */}
      <section className="py-16 md:py-24 bg-[var(--color-base)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((solution) => {
              const localizedSolution = dict.solutionsData.items[solution.id as keyof typeof dict.solutionsData.items];
              return (
                <Card key={solution.id} className="p-7 md:p-8 border border-[var(--color-border)] flex flex-col h-full hover:border-[var(--color-primary)] transition-all duration-200 group">
                  <Typography variant="h2" className="mb-3 text-xl md:text-2xl font-bold group-hover:text-[var(--color-primary)] transition-colors">{localizedSolution.title}</Typography>
                  <Typography variant="body" className="text-[var(--color-text-muted)] text-base mb-6 leading-relaxed">
                    {localizedSolution.shortDescription}
                  </Typography>
                  
                  <div className="mb-8 p-5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] flex-grow">
                    <Typography variant="label" className="mb-2 block text-xs text-[var(--color-secondary-dark)] font-bold">{t.list.problemLabel}</Typography>
                    <Typography variant="body" className="text-[var(--color-text)] text-sm leading-relaxed italic opacity-90">
                      &ldquo;{localizedSolution.problem}&rdquo;
                    </Typography>
                  </div>
                  
                  <LocalizedLink href={`/solutions/${localizedSolution.slug}`} className="btn btn-outline mt-auto w-full text-center block text-sm font-medium" style={{ textDecoration: 'none' }}>
                    {t.list.exploreButton}
                  </LocalizedLink>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <Typography variant="h2" className="mb-6">{t.cta.title}</Typography>
          <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-lg mb-8">
            {t.cta.description}
          </Typography>
          <LocalizedLink href="/contact" className="btn btn-primary btn-lg" style={{ textDecoration: 'none', display: 'inline-block' }}>
            {t.cta.button}
          </LocalizedLink>
        </div>
      </section>
    </main>
  );
}
