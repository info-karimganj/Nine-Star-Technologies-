import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLegalDocument } from '@/lib/legal';
import { LegalDocumentViewer } from '@/components/legal/LegalDocumentViewer';
import { Locale } from '@/i18n/config';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const doc = getLegalDocument('cookie-policy');
  const title = doc ? ((doc.title as any)[lang] || doc.title.en) : 'Cookie Policy';
  const desc = doc ? ((doc.summary as any)[lang] || doc.summary.en) : 'Cookie & Tracking Policy for 9STAR Technologies';

  return {
    title: `${title} | 9STAR Technologies`,
    description: desc,
  };
}

export default async function CookiePolicyPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const doc = getLegalDocument('cookie-policy');

  if (!doc) {
    notFound();
  }

  return <LegalDocumentViewer doc={doc} lang={lang} />;
}
