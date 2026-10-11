import { NextResponse } from 'next/server';
import {
  getServices,
  getCategories,
  getProducts,
  getSolutions,
  getCaseStudies
} from '@/data/cms';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query || query.length > 100) {
    return NextResponse.json({ results: [] });
  }

  const results: any[] = [];

  const [
    services,
    serviceCategories,
    products,
    solutions,
    caseStudies
  ] = await Promise.all([
    getServices(),
    getCategories(),
    getProducts(),
    getSolutions(),
    getCaseStudies()
  ]);

  const lang = 'en'; // default to English for API search for now

  // Search Services
  services.forEach(item => {
    const title = item.title[lang] || item.title.en || '';
    const desc = item.shortDescription[lang] || item.shortDescription.en || '';
    if (title.toLowerCase().includes(query) || desc.toLowerCase().includes(query)) {
      results.push({
        id: `service-${item.id}`,
        title: title,
        type: 'Service',
        description: desc,
        url: `/services/${item.id}`
      });
    }
  });

  // Search Service Categories
  serviceCategories.forEach(item => {
    const title = item.title[lang] || item.title.en || '';
    const desc = item.description?.[lang] || item.description?.en || '';
    if (title.toLowerCase().includes(query) || desc.toLowerCase().includes(query)) {
      results.push({
        id: `category-${item.id}`,
        title: title,
        type: 'Category',
        description: desc,
        url: `/services?category=${item.id}`
      });
    }
  });

  // Search Products
  products.forEach(item => {
    const title = item.title[lang] || item.title.en || '';
    const desc = item.overview[lang] || item.overview.en || '';
    if (title.toLowerCase().includes(query) || desc.toLowerCase().includes(query)) {
      results.push({
        id: `product-${item.id}`,
        title: title,
        type: 'Product',
        description: desc.substring(0, 100) + '...',
        url: `/products/${item.slug}`
      });
    }
  });

  // Search Solutions
  solutions.forEach(item => {
    const title = item.title[lang] || item.title.en || '';
    const desc = item.problem[lang] || item.problem.en || '';
    if (title.toLowerCase().includes(query) || desc.toLowerCase().includes(query)) {
      results.push({
        id: `solution-${item.id}`,
        title: title,
        type: 'Solution',
        description: desc.substring(0, 100) + '...',
        url: `/solutions/${item.slug}`
      });
    }
  });

  // Search Case Studies
  caseStudies.forEach(item => {
    const clientName = item.clientName || '';
    const problem = item.problem[lang] || item.problem.en || '';
    if (clientName.toLowerCase().includes(query) || problem.toLowerCase().includes(query)) {
      results.push({
        id: `case-study-${item.id}`,
        title: clientName,
        type: 'Case Study',
        description: `${clientName} - ${problem.substring(0, 50)}...`,
        url: `/case-studies/${item.slug}`
      });
    }
  });

  // Search FAQ
  const faqs = [
    { category: 'General', question: 'What is 9STAR Technologies?', answer: 'We are a digital services and technology solutions provider focusing on practical problem-solving.' },
    { category: 'Services', question: 'Do you offer ongoing support?', answer: 'Yes, we offer maintenance and support packages for all of our deployments.' },
    { category: 'Pricing', question: 'Do you charge hourly or per project?', answer: 'We offer both depending on the project scope. Most full builds are fixed-price.' },
    { category: 'Websites', question: 'Do you build custom CMS solutions?', answer: 'Yes, we build scalable architectures using modern frameworks.' },
    { category: 'Security', question: 'How do you handle data privacy?', answer: 'We follow strict security protocols and compliance guidelines tailored to your industry.' }
  ];

  faqs.forEach((item, idx) => {
    if (item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query)) {
      results.push({
        id: `faq-${idx}`,
        title: item.question,
        type: 'FAQ',
        description: `${item.answer.substring(0, 100)}...`,
        url: `/faq`
      });
    }
  });

  return NextResponse.json({ results: results.slice(0, 20) });
}
