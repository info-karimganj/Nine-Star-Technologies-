import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServices, getCategories } from '@/data/cms';
import { Typography } from '@/components/ui/Typography';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { ServiceJsonLd, FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker';

const mapServiceToLegacy = (cmsService: any, lang: any) => ({
  id: cmsService.id,
  title: cmsService.title[lang] || cmsService.title.en,
  description: cmsService.shortDescription[lang] || cmsService.shortDescription.en,
  longDescription: cmsService.fullDescription ? (cmsService.fullDescription[lang] || cmsService.fullDescription.en) : undefined,
  categoryId: cmsService.categoryId,
  problemSolved: cmsService.problemSolved ? (cmsService.problemSolved[lang] || cmsService.problemSolved.en) : undefined,
  targetAudience: cmsService.whoIsThisFor?.length ? cmsService.whoIsThisFor.map((t: any) => t[lang] || t.en).join(', ') : undefined,
  whatYouGet: {
    included: cmsService.whatsIncluded?.map((i: any) => i[lang] || i.en) || [],
    notIncluded: cmsService.whatsNotIncluded?.map((i: any) => i[lang] || i.en) || []
  },
  process: cmsService.process?.map((p: any) => ({
    step: p.order.toString(),
    title: p.title[lang] || p.title.en,
    description: p.description[lang] || p.description.en
  })),
  pricing: cmsService.pricing ? {
    type: cmsService.pricing.type,
    amount: cmsService.pricing.amount,
    currency: cmsService.pricing.currency,
    packages: cmsService.pricing.packages?.map((p: any) => ({
      name: p.name[lang] || p.name.en,
      description: p.description[lang] || p.description.en,
      price: p.price,
      features: p.features.map((f: any) => f[lang] || f.en)
    })),
    addons: cmsService.pricing.addons?.map((a: any) => ({
      name: a.name[lang] || a.name.en,
      description: a.description ? (a.description[lang] || a.description.en) : undefined,
      price: a.price
    }))
  } : undefined,
  requirements: {
    documents: cmsService.requirements?.filter((r: any) => r.type === 'FILE').map((r: any) => r.title[lang] || r.title.en),
    prerequisites: cmsService.requirements?.filter((r: any) => r.type === 'TEXT').map((r: any) => r.title[lang] || r.title.en)
  },
  faqs: cmsService.faqs?.map((f: any) => ({
    question: f.question[lang] || f.question.en,
    answer: f.answer[lang] || f.answer.en
  })),
  estimatedTime: cmsService.estimatedDeliveryTime ? (cmsService.estimatedDeliveryTime[lang] || cmsService.estimatedDeliveryTime.en) : undefined,
  relatedServiceIds: []
});

export async function generateMetadata({ params }: { params: Promise<{ id: string, lang: Locale }> }): Promise<Metadata> {
  const { id, lang } = await params;
  const services = await getServices();
  const cmsService = services.find((s) => s.id === id || s.slug === id);
  if (!cmsService) {
    return { title: 'Service Not Found' };
  }
  
  const service = mapServiceToLegacy(cmsService, lang);

  return {
    title: cmsService.seoMetadata?.title?.[lang] || cmsService.seoMetadata?.title?.en || `${service.title} | 9STAR Technologies`,
    description: cmsService.seoMetadata?.description?.[lang] || cmsService.seoMetadata?.description?.en || service.description,
    openGraph: {
      title: cmsService.seoMetadata?.title?.[lang] || cmsService.seoMetadata?.title?.en || `${service.title} | 9STAR Technologies`,
      description: cmsService.seoMetadata?.description?.[lang] || cmsService.seoMetadata?.description?.en || service.description,
      images: cmsService.seoMetadata?.ogImage ? [cmsService.seoMetadata.ogImage] : [],
    },
    robots: {
      index: cmsService.seoMetadata?.noIndex !== true,
      follow: cmsService.seoMetadata?.noIndex !== true,
    }
  };
}

export const instant = false; // Opt-out of static prerendering for Next.js 16 as needed

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string, lang: Locale }>;
}) {
  const { id, lang } = await params;
  const dict = await getDictionary(lang);
  
  const services = await getServices();
  const serviceCategories = await getCategories();
  
  const cmsService = services.find((s) => s.id === id || s.slug === id);
  if (!cmsService) {
    notFound();
  }

  const service = mapServiceToLegacy(cmsService, lang) as any;

  const cmsCategory = serviceCategories.find((c) => c.id === service.categoryId);
  const category = cmsCategory ? {
    id: cmsCategory.id,
    title: cmsCategory.title[lang] || cmsCategory.title.en,
  } : null;
  
  const relatedServices = service.relatedServiceIds
    ? services.filter((s) => service.relatedServiceIds?.includes(s.id)).map(s => mapServiceToLegacy(s, lang))
    : [];

  return (
    <div className="container mx-auto px-6 py-12 pb-28 md:py-20">
      <AnalyticsTracker event="service_view" properties={{ service_id: cmsService.id, service_title: service.title }} />
      <ServiceJsonLd name={service.title} description={service.description} />
      {service.faqs && service.faqs.length > 0 && <FAQJsonLd faqs={service.faqs} />}
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: `https://9star.vercel.app/${lang}` },
        { name: dict.navigation.services, url: `https://9star.vercel.app/${lang}/services` },
        { name: service.title, url: `https://9star.vercel.app/${lang}/services/${cmsService.slug || cmsService.id}` }
      ]} />
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center flex-wrap gap-y-2 space-x-2 text-sm text-[var(--color-muted)]">
        <Link href={`/${lang}`} className="hover:text-[var(--color-text)] transition-colors shrink-0">{dict.navigation.home}</Link>
        <span className="shrink-0">/</span>
        <Link href={`/${lang}/services`} className="hover:text-[var(--color-text)] transition-colors shrink-0">{dict.navigation.services}</Link>
        <span className="shrink-0">/</span>
        {category && (
          <>
            <Link href={`/${lang}/services?category=${category.id}`} className="hover:text-[var(--color-text)] transition-colors shrink-0">
              {category.title}
            </Link>
            <span className="shrink-0">/</span>
          </>
        )}
        <span className="text-[var(--color-text)] line-clamp-1">{service.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* Header Section */}
          <section className="space-y-6">
            {category && (
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full text-sm font-medium">
                <span>{category.title}</span>
              </div>
            )}
            <Typography variant="display" className="text-4xl md:text-5xl font-bold break-words">
              {service.title}
            </Typography>
            <Typography variant="h3" className="text-xl md:text-2xl text-[var(--color-muted)] max-w-3xl leading-relaxed">
              {service.description}
            </Typography>
            {service.longDescription && (
              <Typography variant="body" className="text-lg leading-relaxed mt-4">
                {service.longDescription}
              </Typography>
            )}
          </section>

          {/* Problem & Audience */}
          {(service.problemSolved || service.targetAudience) && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[var(--color-base)] border border-[var(--color-border)] rounded-2xl p-8">
              {service.problemSolved && (
                <div className="space-y-4">
                  <Typography variant="h3" className="font-semibold text-lg flex items-start gap-2 break-words">
                    <svg className="w-5 h-5 text-[var(--color-secondary)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <span className="flex-1">{dict.serviceDetail.theProblem}</span>
                  </Typography>
                  <Typography variant="body" className="text-[var(--color-muted)]">
                    {service.problemSolved}
                  </Typography>
                </div>
              )}
              {service.targetAudience && (
                <div className="space-y-4">
                  <Typography variant="h3" className="font-semibold text-lg flex items-start gap-2 break-words">
                    <svg className="w-5 h-5 text-[var(--color-secondary)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    <span className="flex-1">{dict.serviceDetail.whoItsFor}</span>
                  </Typography>
                  <Typography variant="body" className="text-[var(--color-muted)]">
                    {service.targetAudience}
                  </Typography>
                </div>
              )}
            </section>
          )}

          {/* What You Get (Included / Not Included) */}
          {service.whatYouGet && (
            <section className="space-y-6">
              <Typography variant="h2" className="text-2xl font-bold">{dict.serviceDetail.whatsIncluded}</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.whatYouGet.included && service.whatYouGet.included.length > 0 && (
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {service.whatYouGet.included.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-[var(--color-text)]">
                          <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {service.whatYouGet.notIncluded && service.whatYouGet.notIncluded.length > 0 && (
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {service.whatYouGet.notIncluded.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-[var(--color-muted)]">
                          <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Process */}
          {service.process && service.process.length > 0 && (
            <section className="space-y-8">
              <Typography variant="h2" className="text-2xl font-bold">{dict.serviceDetail.howItWorks}</Typography>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-border)] before:to-transparent">
                {service.process.map((step: any, index: number) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--color-base)] bg-[var(--color-primary)] text-[var(--color-base)] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                      {step.step}
                    </div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl shadow-sm">
                      <Typography variant="h3" className="font-bold text-lg mb-2">{step.title}</Typography>
                      <Typography variant="body" className="text-[var(--color-muted)]">{step.description}</Typography>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Pricing Details */}
          {service.pricing && (service.pricing.packages || service.pricing.addons) && (
            <section className="space-y-8">
              <Typography variant="h2" className="text-2xl font-bold">{dict.serviceDetail.pricingOptions}</Typography>
              
              {service.pricing.packages && service.pricing.packages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.pricing.packages.map((pkg: any, idx: number) => (
                    <Card key={idx} className="flex flex-col h-full bg-[var(--color-base)] border-[var(--color-border)] hover:border-[var(--color-secondary)] transition-colors duration-300">
                      <CardHeader>
                        <Typography variant="h3" className="font-bold text-xl">{pkg.name}</Typography>
                        <div className="mt-4 flex items-baseline gap-1">
                          {pkg.price !== undefined && (
                            <span className="text-3xl font-bold">{service.pricing.currency || '$'}{pkg.price.toLocaleString()}</span>
                          )}
                        </div>
                        <Typography variant="body" className="text-[var(--color-muted)] mt-2">{pkg.description}</Typography>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-3 mt-4">
                          {pkg.features.map((feature: string, fIdx: number) => (
                            <li key={fIdx} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                              <svg className="w-4 h-4 text-[var(--color-secondary)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {service.pricing.addons && service.pricing.addons.length > 0 && (
                <div className="mt-8 space-y-4">
                  <Typography variant="h3" className="text-xl font-bold">{dict.serviceDetail.availableAddons}</Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.pricing.addons.map((addon: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-base)] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <div className="flex-1">
                          <Typography variant="body" className="font-medium break-words">{addon.name}</Typography>
                          <Typography variant="small" className="text-[var(--color-muted)]">{addon.description}</Typography>
                        </div>
                        <div className="font-bold whitespace-nowrap sm:ml-4">
                          {addon.price !== undefined && (
                            <>+ {service.pricing.currency || '$'}{addon.price.toLocaleString()}</>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Requirements */}
          {service.requirements && (
            <section className="space-y-6 bg-[var(--color-base)] border border-[var(--color-border)] rounded-2xl p-8">
              <Typography variant="h2" className="text-2xl font-bold">{dict.serviceDetail.whatWeNeed}</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.requirements.documents && service.requirements.documents.length > 0 && (
                  <div className="space-y-4">
                    <Typography variant="h3" className="font-semibold text-lg flex items-start gap-2 break-words">
                      <svg className="w-5 h-5 text-[var(--color-muted)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <span className="flex-1">{dict.serviceDetail.requiredDocuments}</span>
                    </Typography>
                    <ul className="list-disc list-inside space-y-2 text-[var(--color-muted)]">
                      {service.requirements.documents.map((req: string, idx: number) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {service.requirements.prerequisites && service.requirements.prerequisites.length > 0 && (
                  <div className="space-y-4">
                    <Typography variant="h3" className="font-semibold text-lg flex items-start gap-2 break-words">
                      <svg className="w-5 h-5 text-[var(--color-muted)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span className="flex-1">{dict.serviceDetail.prerequisites}</span>
                    </Typography>
                    <ul className="list-disc list-inside space-y-2 text-[var(--color-muted)]">
                      {service.requirements.prerequisites.map((req: string, idx: number) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <section className="space-y-8">
              <Typography variant="h2" className="text-2xl font-bold">{dict.serviceDetail.faq}</Typography>
              <div className="space-y-4">
                {service.faqs.map((faq: any, index: number) => (
                  <div key={index} className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]">
                    <Typography variant="h3" className="font-bold text-lg mb-2">{faq.question}</Typography>
                    <Typography variant="body" className="text-[var(--color-muted)]">{faq.answer}</Typography>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar / Sticky CTA */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card className="bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md overflow-hidden">
              <div className="h-1 bg-[var(--color-primary)]"></div>
              <CardContent className="p-6 space-y-6">
                
                {/* Pricing Summary */}
                {service.pricing && (
                  <div className="space-y-2 pb-6 border-b border-[var(--color-border)]">
                    <Typography variant="label" className="text-[var(--color-muted)] uppercase tracking-wider text-xs font-bold">
                      {dict.serviceDetail.pricing}
                    </Typography>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {service.pricing.type === 'CUSTOM' ? (
                        <span className="text-3xl font-bold text-[var(--color-text)]">{dict.serviceDetail.customQuote}</span>
                      ) : (
                        <>
                          {service.pricing.type === 'STARTING_FROM' && <span className="text-[var(--color-muted)]">{dict.serviceDetail.startingFrom}</span>}
                          {service.pricing.amount ? (
                            <span className="text-4xl font-bold text-[var(--color-text)]">
                              {service.pricing.currency || '$'}{service.pricing.amount.toLocaleString()}
                            </span>
                          ) : null}
                          {service.pricing.label && (
                            <span className="text-[var(--color-muted)]">/ {service.pricing.label}</span>
                          )}
                        </>
                      )}
                    </div>
                    {service.pricing.type === 'PACKAGE' && (
                      <Typography variant="small" className="text-[var(--color-muted)]">
                        {dict.serviceDetail.multiplePackages}
                      </Typography>
                    )}
                  </div>
                )}

                {/* Meta Information */}
                <div className="space-y-4">
                  {service.estimatedTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--color-muted)] flex items-start gap-2">
                        <svg className="w-4 h-4 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="flex-1">{dict.serviceDetail.timeline}</span>
                      </span>
                      <span className="font-medium text-[var(--color-text)] text-right">{service.estimatedTime}</span>
                    </div>
                  )}
                  {category && (
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--color-muted)] flex items-start gap-2">
                        <svg className="w-4 h-4 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                        <span className="flex-1">{dict.serviceDetail.category}</span>
                      </span>
                      <span className="font-medium text-[var(--color-text)] text-right">{category.title}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 space-y-3">
                  <Link href={`/${lang}/services/${service.id}/request`} className="btn btn-primary px-8 py-4 w-full justify-center text-center">
                    {dict.serviceDetail.requestServicePrimary}
                  </Link>
                  <Link href={`/${lang}/contact`} className="btn btn-outline px-8 py-4 w-full justify-center text-center block">
                    {dict.serviceDetail.needHelpChoosing}
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Support Info */}
            <div className="p-6 rounded-xl bg-[var(--color-muted)]/5 border border-[var(--color-border)]">
              <Typography variant="h3" className="font-bold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                {dict.serviceDetail.haveQuestions}
              </Typography>
              <Typography variant="small" className="text-[var(--color-muted)] mb-4">
                {dict.serviceDetail.supportText}
              </Typography>
              <Link href={`/${lang}/contact`} className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors inline-flex items-center gap-1">
                {dict.serviceDetail.contactSupport} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="pt-6">
                <Typography variant="h3" className="font-bold mb-4">{dict.serviceDetail.relatedServices}</Typography>
                <div className="space-y-3">
                  {relatedServices.map((rs: any) => {
                    return (
                      <Link key={rs.id} href={`/${lang}/services/${rs.id}`} className="group block p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-secondary)] bg-[var(--color-base)] transition-colors">
                        <Typography variant="body" className="font-semibold group-hover:text-[var(--color-primary)] transition-colors">{rs.title}</Typography>
                        <Typography variant="small" className="text-[var(--color-muted)] line-clamp-1 mt-1">{rs.description}</Typography>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-base)] border-t border-[var(--color-border)] p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 flex gap-3">
        <Link href={`/${lang}/services/${service.id}/request`} className="btn btn-primary flex-1 justify-center text-center flex items-center">
          {dict.serviceDetail.requestServiceMobile}
        </Link>
        <Link href={`/${lang}/contact`} className="btn btn-outline flex-none px-4 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </Link>
      </div>
    </div>
  );
}


export async function generateStaticParams() {
  const items = await getServices();
  return items.map((item) => ({ id: item.id }));
}
