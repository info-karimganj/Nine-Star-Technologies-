import { Metadata } from 'next';
import { getServices, getCategories } from '@/data/cms';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServicesFilter } from '@/components/services/ServicesFilter';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { Typography } from '@/components/ui/Typography';
import { LocalizedLink } from '@/components/ui';
import { constructMetadata } from '@/seo/metadata';
export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  
  return constructMetadata({
    title: `${dict.navigation.services} - 9STAR Technologies`,
    description: dict.home.overview.servicesDesc,
    url: `https://9star.vercel.app/${lang}/services`,
  });
}

export const instant = false;

export default async function ServicesPage(props: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const searchParams = await props.searchParams;
  const query = (searchParams?.q || '').toLowerCase();
  const activeCategory = searchParams?.category || '';

  const services = await getServices();
  const serviceCategories = await getCategories();

  let filteredServices = services;

  if (activeCategory) {
    filteredServices = filteredServices.filter((s) => s.categoryId === activeCategory);
  }

  if (query) {
    filteredServices = filteredServices.filter((s) => {
      const title = s.title[lang] || s.title.en;
      const desc = s.shortDescription[lang] || s.shortDescription.en;
      return title.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
    });
  }

  // Get active category details for title/description
  const categoryDetails = activeCategory 
    ? serviceCategories.find(c => c.id === activeCategory)
    : null;

  return (
    <div className="pt-16 pb-16 min-h-screen flex flex-col">
      <div className="container">
        <header className="text-center max-w-3xl mx-auto mb-12 mt-8">
          <Typography variant="h1" className="mb-4">
            {categoryDetails ? (categoryDetails.title[lang] || categoryDetails.title.en) : dict.home.problemFinder.title}
          </Typography>
          <Typography variant="body" className="text-xl text-[var(--color-text-muted)]">
            {categoryDetails && categoryDetails.description
              ? (categoryDetails.description[lang] || categoryDetails.description.en) 
              : dict.home.overview.servicesDesc}
          </Typography>
        </header>

        <ServicesFilter 
          categories={serviceCategories} 
          activeCategory={activeCategory} 
          searchQuery={searchParams?.q || ''}
          lang={lang}
          allCategoriesText={dict.servicesData.common.filterAll}
          searchPlaceholder={dict.servicesData.common.searchPlaceholder}
        />

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const cat = serviceCategories.find(c => c.id === service.categoryId);
              return (
                <ServiceCard key={service.id} service={service} category={cat} learnMoreText={dict.servicesData.common.learnMore} lang={lang as any} />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-[var(--color-border)] rounded-lg">
            <Typography variant="h3" className="mb-2">{dict.servicesData.common.noServicesFound}</Typography>
            <Typography variant="body" className="text-[var(--color-text-muted)] mb-6">
              {dict.servicesData.common.noServicesFoundDesc} "{searchParams?.q}".
            </Typography>
            <LocalizedLink href="/services" className="btn btn-primary">
              {dict.servicesData.common.viewAllServices}
            </LocalizedLink>
          </div>
        )}


      </div>
    </div>
  );
}
