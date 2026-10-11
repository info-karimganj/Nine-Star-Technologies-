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
    <div className="container mx-auto px-6 py-12">
      <RequestForm service={service} dict={dict.requestForm} lang={lang} />
    </div>
  );
}
