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
    <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 max-w-4xl">
      <div className="mb-8 text-center">
        <Typography variant="h1" className="text-3xl sm:text-4xl font-bold mb-3">
          {dict.navigation.startRequest}
        </Typography>
        <Typography variant="body" className="text-[var(--color-text-muted)] max-w-xl mx-auto">
          {dict.requestForm?.step1?.title || 'Tell us about your project requirements to get started.'}
        </Typography>
      </div>

      <RequestForm service={servicePayload} dict={dict.requestForm} lang={lang} />
    </div>
  );
}
