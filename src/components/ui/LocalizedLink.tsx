'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

type LocalizedLinkProps = React.ComponentProps<typeof Link> & {
  href: string;
};

export function LocalizedLink({ href, children, ...props }: LocalizedLinkProps) {
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'en';

  // Check if href is already absolute or already contains a locale
  // For simplicity, we just prefix if it starts with a /
  const localizedHref = href.startsWith('/') ? `/${lang}${href === '/' ? '' : href}` : href;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
