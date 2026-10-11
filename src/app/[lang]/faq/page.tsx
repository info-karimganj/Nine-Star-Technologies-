import { Metadata } from 'next';
import { FAQClient } from '@/components/faq/FAQClient';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.navigation.faq} | 9STAR Technologies`,
    description: dict.faq.hero.description,
  };
}

export default async function FAQPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  const categories = [
    dict.faq.categories.general,
    dict.faq.categories.services,
    dict.faq.categories.pricing,
    dict.faq.categories.documents,
    dict.faq.categories.websites,
    dict.faq.categories.apps,
    dict.faq.categories.automation,
    dict.faq.categories.payments,
    dict.faq.categories.support,
    dict.faq.categories.security
  ];

  const faqs = [
    { category: dict.faq.categories.general, question: dict.faq.items.general1.question, answer: dict.faq.items.general1.answer },
    { category: dict.faq.categories.services, question: dict.faq.items.services1.question, answer: dict.faq.items.services1.answer },
    { category: dict.faq.categories.pricing, question: dict.faq.items.pricing1.question, answer: dict.faq.items.pricing1.answer },
    { category: dict.faq.categories.websites, question: dict.faq.items.websites1.question, answer: dict.faq.items.websites1.answer },
    { category: dict.faq.categories.security, question: dict.faq.items.security1.question, answer: dict.faq.items.security1.answer }
  ];

  return <FAQClient dict={dict} categories={categories} faqs={faqs} />;
}
