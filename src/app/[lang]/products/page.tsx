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
            <span>Software Ecosystem</span>
          </div>
          <h1 className="heading-xl text-[var(--ink)] mb-4 tracking-tight">
            {t.hero.title}
          </h1>
          <p className="body-lead text-[var(--ink-soft)] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
        </div>
      </section>

      {/* 2. Products Listing */}
      <section className="py-20 md:py-24">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {products.map((product) => {
              const localizedProduct = dict.productsData.items[product.id as keyof typeof dict.productsData.items];
              return (
                <div key={product.id} className="p-8 sm:p-10 rounded-3xl bg-white border border-[var(--nt-ink-200)] hover:border-[var(--nt-accent)] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--nt-accent)] transition-colors">
                        {localizedProduct.title}
                      </h3>
                      <span className={`text-xs font-mono font-semibold px-3 py-1 rounded-full shrink-0 ${
                        localizedProduct.availability === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        localizedProduct.availability === 'Beta' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {localizedProduct.availability}
                      </span>
                    </div>
                    
                    <p className="text-[var(--ink-soft)] text-sm sm:text-base leading-relaxed mb-8">
                      {localizedProduct.shortDescription}
                    </p>
                  </div>
                  
                  <LocalizedLink 
                    href={`/products/${localizedProduct.slug}`} 
                    className="w-full py-3.5 rounded-full font-bold text-sm bg-slate-50 border border-[var(--nt-ink-200)] text-[var(--ink)] group-hover:bg-[var(--nt-accent)] group-hover:text-white group-hover:border-[var(--nt-accent)] transition-all text-center block"
                  >
                    {t.list.viewDetails}
                  </LocalizedLink>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
