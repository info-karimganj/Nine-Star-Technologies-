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
    <main className="w-full bg-[#fbfcfd] min-h-screen pb-24">
      {/* 1. Luxury Editorial Hero Header */}
      <section className="bg-white border-b border-[var(--nt-ink-200)] pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden mb-12">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <div className="hero-badge mb-4 mx-auto">
            <span className="hero-pulse-dot"></span>
            <span>Enterprise Capabilities</span>
          </div>
          <h1 className="heading-xl text-[var(--ink)] mb-4 tracking-tight">
            {categoryDetails ? (categoryDetails.title[lang] || categoryDetails.title.en) : dict.home.problemFinder.title}
          </h1>
          <p className="body-lead text-[var(--ink-soft)] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {categoryDetails && categoryDetails.description
              ? (categoryDetails.description[lang] || categoryDetails.description.en) 
              : dict.home.overview.servicesDesc}
          </p>
        </div>
      </section>

      <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ServicesFilter 
          categories={serviceCategories} 
          activeCategory={activeCategory} 
          searchQuery={searchParams?.q || ''}
          lang={lang}
          allCategoriesText={dict.servicesData.common.filterAll}
          searchPlaceholder={dict.servicesData.common.searchPlaceholder}
        />

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {filteredServices.map((service) => {
              const cat = serviceCategories.find(c => c.id === service.categoryId);
              return (
                <ServiceCard key={service.id} service={service} category={cat} learnMoreText={dict.servicesData.common.learnMore} lang={lang as any} />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-[var(--nt-ink-200)] rounded-3xl bg-white p-12 mt-10">
            <h3 className="text-xl font-bold text-[var(--ink)] mb-2">{dict.servicesData.common.noServicesFound}</h3>
            <p className="text-[var(--ink-soft)] mb-6">
              {dict.servicesData.common.noServicesFoundDesc} "{searchParams?.q}".
            </p>
            <LocalizedLink href="/services" className="inline-block px-7 py-3 rounded-full font-bold text-sm bg-[var(--nt-accent)] text-white hover:bg-blue-700 transition-all shadow-md">
              {dict.servicesData.common.viewAllServices}
            </LocalizedLink>
          </div>
        )}
      </div>
    </main>
  );
}
