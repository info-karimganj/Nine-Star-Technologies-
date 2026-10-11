import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/data/cms';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LocalizedLink } from '@/components/ui';
import { ServiceJsonLd } from '@/components/seo/JsonLd';
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker';

interface Props {
  params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  if (products.length === 0) {
    return [{ slug: 'placeholder' }];
  }
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const productMeta = await getProductBySlug(resolvedParams.slug);
  
  if (!productMeta) {
    return { title: 'Product Not Found' };
  }

  const dict = await getDictionary(resolvedParams.lang);
  const product = dict.productsData.items[productMeta.id as keyof typeof dict.productsData.items];

  if (!product) {
    return { title: dict.productDetail.notFound };
  }

  return {
    title: productMeta.seoMetadata?.title?.[resolvedParams.lang] || productMeta.seoMetadata?.title?.en || `${product.title} ${dict.productDetail.pageTitleSuffix}`,
    description: productMeta.seoMetadata?.description?.[resolvedParams.lang] || productMeta.seoMetadata?.description?.en || product.shortDescription,
    openGraph: {
      title: productMeta.seoMetadata?.title?.[resolvedParams.lang] || productMeta.seoMetadata?.title?.en || `${product.title} ${dict.productDetail.pageTitleSuffix}`,
      description: productMeta.seoMetadata?.description?.[resolvedParams.lang] || productMeta.seoMetadata?.description?.en || product.shortDescription,
      images: productMeta.seoMetadata?.ogImage ? [productMeta.seoMetadata.ogImage] : [],
    },
    robots: {
      index: productMeta.seoMetadata?.noIndex !== true,
      follow: productMeta.seoMetadata?.noIndex !== true,
    }
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const productMeta = await getProductBySlug(resolvedParams.slug);

  if (!productMeta) {
    notFound();
  }

  const dict = await getDictionary(resolvedParams.lang);
  const product = dict.productsData.items[productMeta.id as keyof typeof dict.productsData.items];

  if (!product) {
    notFound();
  }

  return (
    <main className="w-full">
      <AnalyticsTracker event="product_view" properties={{ product_id: productMeta.id, product_title: product.title }} />
      <ServiceJsonLd name={product.title as unknown as string} description={product.shortDescription as unknown as string} />
      {/* Breadcrumb & Hero */}
      <section className="bg-[var(--color-primary)] text-[var(--color-base)] pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-8">
            <Link href={`/${resolvedParams.lang}/products`} className="text-[var(--color-base)]/60 hover:text-[var(--color-base)] transition-colors text-sm font-medium">
              {dict.productDetail.backToProducts}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4 inline-block px-3 py-1 bg-[var(--color-base)]/10 rounded-full text-xs font-semibold tracking-wider uppercase text-[var(--color-base)]/80">
                {product.availability}
              </div>
              <Typography variant="h1" className="text-[var(--color-base)] mb-6">
                {product.title}
              </Typography>
              <Typography variant="body" className="text-[var(--color-text-muted)] text-xl leading-relaxed mb-8">
                {product.overview}
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4">
                <LocalizedLink href="/contact" className="btn btn-primary btn-lg text-center" style={{ textDecoration: 'none' }}>
                  {product.ctaText || dict.productDetail.getStarted}
                </LocalizedLink>
                <LocalizedLink href="/contact" className="btn btn-outline btn-lg border-[var(--color-base)]/20 text-[var(--color-base)] hover:bg-[var(--color-base)]/10 hover:text-[var(--color-base)] text-center" style={{ textDecoration: 'none' }}>
                  {dict.productDetail.contactSales}
                </LocalizedLink>
              </div>
            </div>
            
            {/* Hero Image/UI Mockup */}
            <div className="bg-surface/10 border border-[var(--color-base)]/10 rounded-2xl aspect-[4/3] flex items-center justify-center relative overflow-hidden shadow-2xl">
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Features */}
      <section className="py-20 bg-[var(--color-base)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Problem Statement */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <Typography variant="h2" className="mb-6">{dict.productDetail.problemSolves}</Typography>
            <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed bg-[var(--color-surface)] p-8 rounded-xl border border-[var(--color-border)]">
              {product.problem}
            </Typography>
          </div>

          {/* Core Features */}
          <Typography variant="h2" className="mb-12 text-center">{dict.productDetail.coreFeatures}</Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.features.map((feature: any, idx: number) => (
              <Card key={idx} className="p-8 border border-[var(--color-border)] hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/5 text-[var(--color-primary)] flex items-center justify-center mb-6">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <Typography variant="h3" className="mb-3">{feature.title}</Typography>
                <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                  {feature.description}
                </Typography>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Use Cases & Technology */}
      <section className="py-20 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Use Cases */}
            <div>
              <Typography variant="h2" className="mb-8">{dict.productDetail.useCases}</Typography>
              <div className="space-y-6">
                {product.useCases.map((useCase: any, idx: number) => (
                  <div key={idx} className="bg-[var(--color-base)] p-6 rounded-xl border border-[var(--color-border)]">
                    <Typography variant="h3" className="mb-2 text-lg">{useCase.title}</Typography>
                    <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                      {useCase.description}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div>
              <Typography variant="h2" className="mb-8">{dict.productDetail.technology}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-70 mb-6">
                {dict.productDetail.techSubtitle}
              </Typography>
              <div className="flex flex-wrap gap-3">
                {product.technology.map((tech: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 bg-[var(--color-base)] border border-[var(--color-border)] rounded-full text-sm font-medium text-[var(--color-text)] opacity-80">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 md:py-24 bg-[var(--color-base)] border-t border-[var(--color-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <Typography variant="h2" className="mb-6">{dict.productDetail.readyToAction}</Typography>
          <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-lg mb-10">
            {dict.productDetail.requestDemo.replace('{productTitle}', product.title)}
          </Typography>
          <LocalizedLink href="/contact" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
            {product.ctaText || dict.productDetail.requestDemoBtn}
          </LocalizedLink>
        </div>
      </section>

    </main>
  );
}
