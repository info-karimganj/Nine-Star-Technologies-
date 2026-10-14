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

export const instant = false;

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
      {/* 1. Luxury Editorial Hero Header */}
      <section className="bg-white border-b border-[var(--nt-ink-200)] pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="mb-6">
            <Link href={`/${resolvedParams.lang}/products`} className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--nt-accent)] hover:underline">
              <span>&larr;</span>
              <span>{dict.productDetail.backToProducts}</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="hero-badge mb-4">
                <span className="hero-pulse-dot"></span>
                <span>{product.availability} System</span>
              </div>
              <h1 className="heading-xl text-[var(--ink)] mb-4 tracking-tight">
                {product.title}
              </h1>
              <p className="body-lead text-[var(--ink-soft)] text-lg sm:text-xl leading-relaxed mb-8">
                {product.overview}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <LocalizedLink 
                  href="/contact" 
                  className="px-8 py-3.5 rounded-full font-bold text-sm bg-[var(--nt-accent)] text-white hover:bg-blue-700 transition-all shadow-md text-center"
                >
                  {product.ctaText || dict.productDetail.getStarted}
                </LocalizedLink>
                <LocalizedLink 
                  href="/contact" 
                  className="px-8 py-3.5 rounded-full font-bold text-sm border border-[var(--nt-ink-200)] text-[var(--ink)] hover:bg-slate-50 transition-all text-center"
                >
                  {dict.productDetail.contactSales}
                </LocalizedLink>
              </div>
            </div>
            
            {/* Visual Feature Card Mockup */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white border border-[var(--nt-ink-200)] rounded-3xl aspect-[4/3] flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--nt-ink-200)] shadow-xs flex items-center justify-center text-2xl mb-4">
                ⭐
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--nt-accent)] font-bold mb-1">Architecture Verified</span>
              <span className="text-sm text-[var(--ink-soft)] text-center font-medium">Enterprise-ready deployment framework</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Problem & Features */}
      <section className="py-20 md:py-24 bg-[#fbfcfd]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Problem Statement */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-semibold mb-2 block">
              Core Challenge
            </span>
            <h2 className="heading-sm text-[var(--ink)] mb-4">{dict.productDetail.problemSolves}</h2>
            <div className="text-[var(--ink)] text-base sm:text-lg leading-relaxed bg-white p-8 rounded-2xl border border-[var(--nt-ink-200)] border-l-4 border-l-amber-500 shadow-xs italic">
              &ldquo;{product.problem}&rdquo;
            </div>
          </div>

          {/* Core Features */}
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
              Capabilities
            </span>
            <h2 className="heading-md text-[var(--ink)]">{dict.productDetail.coreFeatures}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {product.features.map((feature: any, idx: number) => (
              <div key={idx} className="p-8 rounded-2xl bg-white border border-[var(--nt-ink-200)] hover:border-[var(--nt-accent)] hover:shadow-lg transition-all shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[var(--nt-accent)] flex items-center justify-center mb-5 font-mono font-bold text-sm border border-blue-100">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[var(--ink)] mb-2">{feature.title}</h3>
                <p className="text-[var(--ink-soft)] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Use Cases & Technology */}
      <section className="py-20 md:py-24 bg-white border-t border-[var(--nt-ink-200)]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Use Cases */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
                Deployment Scenarios
              </span>
              <h2 className="heading-sm text-[var(--ink)] mb-6">{dict.productDetail.useCases}</h2>
              <div className="space-y-4">
                {product.useCases.map((useCase: any, idx: number) => (
                  <div key={idx} className="bg-[#f8fafc] p-6 rounded-2xl border border-[var(--nt-ink-200)]">
                    <h3 className="text-base font-bold text-[var(--ink)] mb-1.5">{useCase.title}</h3>
                    <p className="text-[var(--ink-soft)] text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
                Technical Foundation
              </span>
              <h2 className="heading-sm text-[var(--ink)] mb-4">{dict.productDetail.technology}</h2>
              <p className="text-[var(--ink-soft)] text-sm sm:text-base mb-6 leading-relaxed">
                {dict.productDetail.techSubtitle}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {product.technology.map((tech: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 bg-slate-50 border border-[var(--nt-ink-200)] rounded-xl text-xs font-mono font-medium text-[var(--ink)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="py-20 md:py-28 bg-[#fbfcfd] border-t border-[var(--nt-ink-200)]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="heading-md text-[var(--ink)] mb-4">{dict.productDetail.readyToAction}</h2>
          <p className="text-[var(--ink-soft)] text-base sm:text-lg mb-8 leading-relaxed">
            {dict.productDetail.requestDemo.replace('{productTitle}', product.title)}
          </p>
          <LocalizedLink 
            href="/contact" 
            className="inline-block px-8 py-3.5 rounded-full font-bold text-sm bg-[var(--nt-accent)] text-white hover:bg-blue-700 transition-all shadow-md"
          >
            {product.ctaText || dict.productDetail.requestDemoBtn}
          </LocalizedLink>
        </div>
      </section>

    </main>
  );
}
