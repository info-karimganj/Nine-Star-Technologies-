import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Service, Category as ServiceCategory, LanguageCode } from '@/types/cms';
import { LocalizedLink } from '@/components/ui';

interface ServiceCardProps {
  service: Service;
  category?: ServiceCategory;
  learnMoreText?: string;
  lang: LanguageCode;
}

export function ServiceCard({ service, category, learnMoreText = 'Learn More', lang }: ServiceCardProps) {
  return (
    <Card className="h-full flex flex-col hover:border-[var(--color-primary)] transition-all duration-200 group">
      <CardHeader className="mb-3">
        {category && (
          <div className="flex items-center gap-2 mb-2.5 text-[var(--color-text-muted)] group-hover:text-[var(--color-secondary-dark)] transition-colors">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={category.icon} />
            </svg>
            <Typography variant="small" className="text-xs uppercase tracking-wider font-semibold m-0 text-current">
              {category.title[lang] || category.title.en}
            </Typography>
          </div>
        )}
        <Typography variant="h3" className="m-0 mb-2 group-hover:text-[var(--color-primary)] transition-colors text-xl font-bold leading-snug">
          {service.title[lang] || service.title.en}
        </Typography>
      </CardHeader>
      <CardContent className="flex-1 mb-6">
        <Typography variant="body" className="text-[var(--color-text-muted)] m-0 text-sm leading-relaxed">
          {service.shortDescription[lang] || service.shortDescription.en}
        </Typography>
      </CardContent>
      <CardFooter className="mt-auto pt-4 border-t border-[var(--color-border)]">
        <LocalizedLink href={`/services/${service.slug || service.id}`} className="btn btn-outline w-full text-center block text-sm" style={{ textDecoration: 'none' }}>
          {learnMoreText}
        </LocalizedLink>
      </CardFooter>
    </Card>
  );
}
