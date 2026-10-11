import { Metadata } from 'next';
import { siteConfig } from './config';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  url,
  ogImage = siteConfig.ogImage,
  noIndex = false,
}: SEOProps): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@9star',
    },
    alternates: {
      canonical: url,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
