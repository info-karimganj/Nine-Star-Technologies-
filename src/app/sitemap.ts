import { MetadataRoute } from 'next';
import { siteConfig } from '@/seo/config';
import { getServices, getProducts, getSolutions, getCaseStudies } from '@/data/cms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Add more dynamic routes here using your CMS layer
  const services = await getServices();
  const products = await getProducts();
  const solutions = await getSolutions();
  const caseStudies = await getCaseStudies();

  // Languages we support
  const languages = ['en', 'bn', 'ar'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/process',
    '/contact',
    '/faq',
    '/request',
    '/services',
    '/products',
    '/solutions',
    '/case-studies',
    '/legal',
    '/legal/privacy-policy',
    '/legal/terms-and-conditions',
    '/legal/cookie-policy',
    '/legal/data-processing',
    '/legal/acceptable-use',
    '/legal/disclaimer',
    '/legal/refund-policy',
    '/legal/accessibility',
    '/legal/security',
    '/legal/third-party-services',
    '/legal/communications'
  ];

  staticRoutes.forEach((route) => {
    languages.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  // Dynamic Service routes
  services.forEach((service) => {
    languages.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/services/${service.slug}`,
        lastModified: new Date(service.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  // Dynamic Product routes
  products.forEach((product) => {
    languages.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  // Dynamic Solution routes
  solutions.forEach((solution) => {
    languages.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/solutions/${solution.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  // Dynamic Case Studies
  caseStudies.forEach((cs) => {
    languages.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/case-studies/${cs.slug}`,
        lastModified: new Date(cs.publishDate),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}
