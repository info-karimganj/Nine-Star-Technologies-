import { Metadata } from 'next';
import { getServices } from '@/data/cms';
import { RequestForm } from '@/components/services/RequestForm';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { Typography } from '@/components/ui/Typography';
import { constructMetadata } from '@/seo/metadata';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  
  return constructMetadata({
    title: `${dict.navigation.startRequest} | 9STAR Technologies`,
    description: dict.home.hero.description,
    url: `https://9star.vercel.app/${lang}/request`,
  });
}

export default async function GeneralRequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { lang } = await params;
  const { service: serviceParam } = await searchParams;
  
  const dict = await getDictionary(lang);
  const services = await getServices();
  
  const selectedService = serviceParam 
    ? services.find((s) => s.id === serviceParam || s.slug === serviceParam)
    : services[0];

  const servicePayload = {
    title: selectedService ? (selectedService.title[lang] || selectedService.title.en) : dict.navigation.startRequest,
    description: selectedService ? (selectedService.shortDescription[lang] || selectedService.shortDescription.en) : dict.home.hero.description,
    requirements: {
      documents: selectedService?.requirements?.filter((r: any) => r.type === 'FILE').map((r: any) => r.title[lang] || r.title.en) || [],
    }
  };

  return (
    <main className="w-full bg-[#fbfcfd] min-h-screen pb-24">
      {/* 1. Luxury Editorial Header */}
      <section className="bg-white border-b border-[var(--nt-ink-200)] pt-20 pb-14 md:pt-28 md:pb-16 relative overflow-hidden mb-12">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
          <div className="hero-badge mb-4 mx-auto">
            <span className="hero-pulse-dot"></span>
            <span>Intake & Scoping</span>
          </div>
          <h1 className="heading-xl text-[var(--ink)] mb-3 tracking-tight">
            {dict.navigation.startRequest}
          </h1>
          <p className="body-lead text-[var(--ink-soft)] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {dict.requestForm?.step1?.title || 'Tell us about your project requirements to get started.'}
          </p>
        </div>
      </section>

      <div className="site-container mx-auto px-4 sm:px-6 max-w-4xl">
        <RequestForm service={servicePayload} dict={dict.requestForm} lang={lang} />
      </div>
    </main>
  );
}
