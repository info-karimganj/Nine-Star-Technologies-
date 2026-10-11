import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLegalDocument, getAllLegalDocuments } from '@/lib/legal';
import { LegalDocumentViewer } from '@/components/legal/LegalDocumentViewer';
import { Locale, i18n } from '@/i18n/config';

export async function generateStaticParams() {
  const docs = getAllLegalDocuments();
  const params: { lang: Locale; slug: string }[] = [];

  for (const locale of i18n.locales) {
    for (const doc of docs) {
      // Exclude standalone pages that already have explicit directories
      if (!['privacy-policy', 'terms-and-conditions', 'cookie-policy', 'refund-policy'].includes(doc.slug)) {
        params.push({
          lang: locale,
          slug: doc.slug,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata(props: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const doc = getLegalDocument(slug);

  if (!doc) {
    return { title: 'Legal Notice | 9STAR Technologies' };
  }

  const title = (doc.title as any)[lang] || doc.title.en;
  const desc = (doc.summary as any)[lang] || doc.summary.en;

  return {
    title: `${title} | 9STAR Technologies`,
    description: desc,
  };
}

export default async function LegalDynamicPolicyPage(props: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await props.params;
  const doc = getLegalDocument(slug);

  if (!doc) {
    notFound();
  }

  return <LegalDocumentViewer doc={doc} lang={lang} />;
}
