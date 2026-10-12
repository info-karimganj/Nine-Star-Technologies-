import { notFound } from 'next/navigation';
import { getServices } from '@/data/cms';
import { RequestForm } from '@/components/services/RequestForm';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export const instant = false; // Opt-out of static prerendering for Next.js 16 as needed

export default async function RequestServicePage({
  params,
}: {
  params: Promise<{ id: string; lang: Locale }>;
}) {
  const { id, lang } = await params;
  
  const dict = await getDictionary(lang);
  const services = await getServices();
  
  const cmsService = services.find((s) => s.id === id || s.slug === id);
  
  if (!cmsService) {
    notFound();
  }

  const service = {
    title: cmsService.title[lang] || cmsService.title.en,
    description: cmsService.shortDescription[lang] || cmsService.shortDescription.en,
    requirements: {
      documents: cmsService.requirements?.filter((r: any) => r.type === 'FILE').map((r: any) => r.title[lang] || r.title.en),
    }
  };

  return (
    <main className="w-full bg-[#fbfcfd] min-h-screen pb-24">
      {/* Luxury Editorial Header */}
      <section className="bg-white border-b border-[var(--nt-ink-200)] pt-20 pb-14 md:pt-28 md:pb-16 relative overflow-hidden mb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
          <div className="hero-badge mb-4 mx-auto">
            <span className="hero-pulse-dot"></span>
            <span>Service Engagement</span>
          </div>
          <h1 className="heading-xl text-[var(--ink)] mb-3 tracking-tight">
            {service.title}
          </h1>
          <p className="body-lead text-[var(--ink-soft)] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      <div className="site-container mx-auto px-4 sm:px-6 max-w-4xl">
        <RequestForm service={service} dict={dict.requestForm} lang={lang} />
      </div>
    </main>
  );
}
