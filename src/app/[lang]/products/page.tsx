import { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import { getProducts } from '@/data/cms';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LocalizedLink } from '@/components/ui';
import { constructMetadata } from '@/seo/metadata';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as 'en' | 'bn' | 'ar');
  
  return constructMetadata({
    title: `${dict.navigation.products} | 9STAR Technologies`,
    description: dict.productsPage.hero.description,
    url: `https://9star.vercel.app/${lang}/products`,
  });
}

export default async function ProductsPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as 'en' | 'bn' | 'ar');
  const t = dict.productsPage;
  const products = await getProducts();

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="bg-[var(--color-surface)] pt-24 pb-16 md:pt-32 md:pb-24">
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

      {/* Products Listing */}
      <section className="py-16 md:py-24 bg-[var(--color-base)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => {
              const localizedProduct = dict.productsData.items[product.id as keyof typeof dict.productsData.items];
              return (
                <Card key={product.id} className="flex flex-col h-full border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-200 group p-7 md:p-8">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <Typography variant="h3" className="text-xl font-bold group-hover:text-[var(--color-primary)] transition-colors">{localizedProduct.title}</Typography>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
                      localizedProduct.availability === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      localizedProduct.availability === 'Beta' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {localizedProduct.availability}
                    </span>
                  </div>
                  
                  <Typography variant="body" className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-8 flex-grow">
                    {localizedProduct.shortDescription}
                  </Typography>
                  
                  <LocalizedLink href={`/products/${localizedProduct.slug}`} className="btn btn-outline mt-auto w-full text-center block text-sm font-medium" style={{ textDecoration: 'none' }}>
                    {t.list.viewDetails}
                  </LocalizedLink>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
