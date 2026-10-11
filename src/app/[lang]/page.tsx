import React from 'react';
import Link from 'next/link';
import { Typography, Button, Card, CardHeader, CardContent } from '@/components/ui';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { Metadata } from 'next';
import { TrackAction } from '@/components/analytics/TrackAction';
import { ProblemFinderClient } from '@/components/home/ProblemFinderClient';

import { constructMetadata } from '@/seo/metadata';
import { siteConfig } from '@/seo/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return constructMetadata({
    title: `${dict.home.hero.title} | ${siteConfig.name}`,
    description: dict.home.hero.description,
    url: `${siteConfig.url}/${lang}`,
  });
}

export default async function Home(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col">
      {/* 1. Hero */}
      <section className="py-20 md:py-28 bg-[var(--color-surface)] border-b border-[var(--color-border)] text-center fade-in">
        <div className="container max-w-4xl mx-auto px-4">
          <Typography variant="display" className="mb-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-primary)]">
            {dict.home.hero.title}
          </Typography>
          <Typography variant="h2" className="mb-6 text-xl sm:text-2xl font-semibold text-[var(--color-secondary-dark)]">
            {dict.home.hero.subtitle}
          </Typography>
          <Typography variant="body" className="mb-10 text-base sm:text-lg text-[var(--color-text-muted)] mx-auto max-w-2xl leading-relaxed">
            {dict.home.hero.description}
          </Typography>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 max-w-md mx-auto">
            <TrackAction event="cta_clicked" properties={{ location: 'hero', button: 'primary' }}>
              <Link href={`/${lang}/services`} className="btn btn-primary w-full sm:w-auto px-6 py-3 text-center text-sm font-semibold">
                {dict.home.hero.ctaPrimary}
              </Link>
            </TrackAction>
            <TrackAction event="cta_clicked" properties={{ location: 'hero', button: 'secondary' }}>
              <Link href={`/${lang}/contact`} className="btn btn-outline w-full sm:w-auto px-6 py-3 text-center text-sm font-semibold">
                {dict.home.hero.ctaSecondary}
              </Link>
            </TrackAction>
          </div>
        </div>
      </section>

      {/* 2. Interactive Problem Discovery (Journey 2: I Need Help / What are you trying to solve?) */}
      <section id="problem-finder" className="py-16 md:py-24 bg-[var(--color-base)] border-b border-[var(--color-border)]">
        <div className="container max-w-3xl mx-auto px-4 text-center mb-10">
          <Typography variant="h2" className="text-2xl sm:text-3xl font-bold mb-3">
            {dict.home.problemFinder.title}
          </Typography>
          <Typography variant="body" className="text-[var(--color-text-muted)] text-base max-w-xl mx-auto">
            {dict.home.problemFinder.subtitle}
          </Typography>
        </div>
        <div className="container px-4">
          <ProblemFinderClient problems={dict.home.problemFinder.problems} lang={lang} />
        </div>
      </section>

      {/* 2. Popular Services */}
      <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 slide-up">
          <Typography variant="h2" className="text-2xl sm:text-3xl font-bold mb-3">{dict.home.popularServices.title}</Typography>
          <Typography variant="body" className="text-[var(--color-text-muted)] text-base">{dict.home.popularServices.subtitle}</Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 slide-up">
          {dict.home.popularServices.cards.map((card: { title: string; desc: string }, i: number) => (
            <Card key={i} className="flex flex-col h-full hover:border-[var(--color-primary)] transition-all duration-200 group p-6">
              <CardHeader className="mb-3">
                <Typography variant="h3" className="text-lg font-bold group-hover:text-[var(--color-primary)] transition-colors mb-2">
                  {card.title}
                </Typography>
              </CardHeader>
              <CardContent className="flex-1">
                <Typography variant="body" className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {card.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-base)' }}>
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Typography variant="h2" className="mb-14 text-center text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-base)' }}>
            {dict.home.howItWorks.title}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 slide-up">
            {dict.home.howItWorks.steps.map((step: { title: string; desc: string }, idx: number) => (
              <div key={idx} className="flex flex-col p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xs">
                <div className="text-2xl font-bold mb-3" style={{ color: 'var(--color-secondary)' }}>0{idx + 1}</div>
                <Typography variant="h3" className="mb-2 text-lg font-semibold" style={{ color: 'var(--color-base)' }}>{step.title}</Typography>
                <Typography variant="body" className="text-sm leading-relaxed text-slate-300">{step.desc}</Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Selected Case Studies / Work */}
      <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 slide-up">
          <div>
            <Typography variant="h2" className="text-2xl sm:text-3xl font-bold mb-2">{dict.home.selectedWork.title}</Typography>
            <Typography variant="body" className="text-[var(--color-text-muted)] text-base">{dict.home.selectedWork.subtitle}</Typography>
          </div>
          <Link href={`/${lang}/case-studies`} className="hidden sm:inline-flex">
            <Button variant="outline" size="sm">{dict.home.selectedWork.viewAll}</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 slide-up">
          {dict.home.selectedWork.cases.map((workCase: { imageText: string; title: string; desc: string }, i: number) => (
            <Card key={i} className="p-7 flex flex-col justify-center hover:border-[var(--color-primary)] transition-all duration-200">
              <Typography variant="h3" className="text-xl font-bold mb-2.5 text-[var(--color-primary)]">{workCase.title}</Typography>
              <Typography variant="body" className="text-sm text-[var(--color-text-muted)] leading-relaxed">{workCase.desc}</Typography>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href={`/${lang}/case-studies`}>
            <Button variant="outline" className="w-full">{dict.home.selectedWork.viewAllMobile}</Button>
          </Link>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-16 md:py-24 container mx-auto px-4 max-w-3xl border-t border-[var(--color-border)]">
        <Typography variant="h2" className="text-center text-2xl sm:text-3xl font-bold mb-10">{dict.home.faq.title}</Typography>
        <div className="flex flex-col gap-5 slide-up">
          {dict.home.faq.questions.map((q: { q: string; a: string }, idx: number) => (
            <div key={idx} className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
              <Typography variant="h3" className="mb-2 text-base font-semibold text-[var(--color-text)]">{q.q}</Typography>
              <Typography variant="body" className="text-sm text-[var(--color-text-muted)] leading-relaxed">{q.a}</Typography>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-16 md:py-20 text-center border-t border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-primary-light)' }}>
        <div className="container max-w-xl mx-auto px-4 slide-up">
          <Typography variant="h2" className="mb-4 text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-base)' }}>{dict.home.finalCta.title}</Typography>
          <Typography variant="body" className="mb-8 text-sm sm:text-base leading-relaxed text-slate-300">
            {dict.home.finalCta.subtitle}
          </Typography>
          <Link href={`/${lang}/request`} className="btn btn-secondary px-8 py-3.5 inline-flex text-sm font-semibold">
            {dict.home.finalCta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
