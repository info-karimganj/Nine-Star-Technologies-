import { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { LocalizedLink } from '@/components/ui';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'bn' | 'ar');
  return {
    title: `${dict.aboutPage.hero.title} | 9STAR Technologies`,
    description: dict.aboutPage.hero.description,
  };
}

export default async function AboutPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as 'en' | 'bn' | 'ar');
  const t = dict.aboutPage;

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="bg-[var(--color-primary)] text-[var(--color-base)] pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <Typography variant="h1" className="text-[var(--color-base)] mb-6">
              {t.hero.title}
            </Typography>
            <Typography variant="body" className="text-[var(--color-text-muted)] text-xl leading-relaxed">
              {t.hero.description}
            </Typography>
          </div>
        </div>
      </section>

      {/* Who We Are & What We Do */}
      <section className="py-20 md:py-24 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <Typography variant="h2" className="mb-6">{t.whoWeAre.title}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed mb-6">
                {t.whoWeAre.p1}
              </Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed">
                {t.whoWeAre.p2}
              </Typography>
            </div>
            <div>
              <Typography variant="h2" className="mb-6">{t.whatWeDo.title}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed mb-6">
                {t.whatWeDo.p1}
              </Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed">
                {t.whatWeDo.p2}
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 md:py-24 bg-[var(--color-base)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div>
              <Typography variant="h2" className="mb-6">{t.missionVision.missionTitle}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed">
                {t.missionVision.missionDesc}
              </Typography>
            </div>
            <div>
              <Typography variant="h2" className="mb-6">{t.missionVision.visionTitle}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed">
                {t.missionVision.visionDesc}
              </Typography>
            </div>
          </div>

          <Typography variant="h2" className="mb-12 text-center">{t.coreValues.title}</Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 h-full flex flex-col items-start border-none shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)] opacity-10 text-[var(--color-primary)] flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <Typography variant="h3" className="mb-3">{t.coreValues.values[0].title}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                {t.coreValues.values[0].desc}
              </Typography>
            </Card>

            <Card className="p-8 h-full flex flex-col items-start border-none shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)] opacity-10 text-[var(--color-primary)] flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <Typography variant="h3" className="mb-3">{t.coreValues.values[1].title}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                {t.coreValues.values[1].desc}
              </Typography>
            </Card>

            <Card className="p-8 h-full flex flex-col items-start border-none shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)] opacity-10 text-[var(--color-primary)] flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <Typography variant="h3" className="mb-3">{t.coreValues.values[2].title}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                {t.coreValues.values[2].desc}
              </Typography>
            </Card>

            <Card className="p-8 h-full flex flex-col items-start border-none shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)] opacity-10 text-[var(--color-primary)] flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <Typography variant="h3" className="mb-3">{t.coreValues.values[3].title}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                {t.coreValues.values[3].desc}
              </Typography>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 md:py-24 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Typography variant="h2" className="mb-6">{t.howWeWork.title}</Typography>
            <Typography variant="body" className="text-[var(--color-text)] opacity-80 text-lg leading-relaxed">
              {t.howWeWork.description}
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-[var(--color-border)] -z-10"></div>
              <div className="bg-[var(--color-base)] w-16 h-16 rounded-full flex items-center justify-center text-[var(--color-primary)] font-bold text-xl mb-6 shadow-sm border border-[var(--color-border)]">1</div>
              <Typography variant="h3" className="mb-3">{t.howWeWork.steps[0].title}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                {t.howWeWork.steps[0].desc}
              </Typography>
            </div>
            
            <div className="relative">
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-[var(--color-border)] -z-10"></div>
              <div className="bg-[var(--color-base)] w-16 h-16 rounded-full flex items-center justify-center text-[var(--color-primary)] font-bold text-xl mb-6 shadow-sm border border-[var(--color-border)]">2</div>
              <Typography variant="h3" className="mb-3">{t.howWeWork.steps[1].title}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                {t.howWeWork.steps[1].desc}
              </Typography>
            </div>
            
            <div className="relative">
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-[var(--color-border)] -z-10"></div>
              <div className="bg-[var(--color-base)] w-16 h-16 rounded-full flex items-center justify-center text-[var(--color-primary)] font-bold text-xl mb-6 shadow-sm border border-[var(--color-border)]">3</div>
              <Typography variant="h3" className="mb-3">{t.howWeWork.steps[2].title}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                {t.howWeWork.steps[2].desc}
              </Typography>
            </div>
            
            <div className="relative">
              <div className="bg-[var(--color-base)] w-16 h-16 rounded-full flex items-center justify-center text-[var(--color-primary)] font-bold text-xl mb-6 shadow-sm border border-[var(--color-border)]">4</div>
              <Typography variant="h3" className="mb-3">{t.howWeWork.steps[3].title}</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-sm">
                {t.howWeWork.steps[3].desc}
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Capability */}
      <section className="py-20 md:py-24 bg-[var(--color-primary)] text-[var(--color-base)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Typography variant="h2" className="text-[var(--color-base)] mb-6">{t.technology.title}</Typography>
              <Typography variant="body" className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-6">
                {t.technology.p1}
              </Typography>
              <Typography variant="body" className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                {t.technology.p2}
              </Typography>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="border border-[var(--color-base)]/10 rounded-xl p-6 bg-[var(--color-base)]/5">
                <Typography variant="h3" className="text-[var(--color-base)] mb-2">{t.technology.items.web.title}</Typography>
                <Typography variant="body" className="text-[var(--color-text-muted)] text-sm">{t.technology.items.web.desc}</Typography>
              </div>
              <div className="border border-[var(--color-base)]/10 rounded-xl p-6 bg-[var(--color-base)]/5">
                <Typography variant="h3" className="text-[var(--color-base)] mb-2">{t.technology.items.mobile.title}</Typography>
                <Typography variant="body" className="text-[var(--color-text-muted)] text-sm">{t.technology.items.mobile.desc}</Typography>
              </div>
              <div className="border border-[var(--color-base)]/10 rounded-xl p-6 bg-[var(--color-base)]/5">
                <Typography variant="h3" className="text-[var(--color-base)] mb-2">{t.technology.items.automation.title}</Typography>
                <Typography variant="body" className="text-[var(--color-text-muted)] text-sm">{t.technology.items.automation.desc}</Typography>
              </div>
              <div className="border border-[var(--color-base)]/10 rounded-xl p-6 bg-[var(--color-base)]/5">
                <Typography variant="h3" className="text-[var(--color-base)] mb-2">{t.technology.items.infrastructure.title}</Typography>
                <Typography variant="body" className="text-[var(--color-text-muted)] text-sm">{t.technology.items.infrastructure.desc}</Typography>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <Typography variant="h2" className="mb-6">{t.cta.title}</Typography>
          <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-lg mb-10 max-w-2xl mx-auto">
            {t.cta.description}
          </Typography>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <LocalizedLink href="/services" className="btn btn-primary btn-lg w-full sm:w-auto text-center" style={{ textDecoration: 'none' }}>
              {t.cta.explore}
            </LocalizedLink>
            <LocalizedLink href="/contact" className="btn btn-outline btn-lg w-full sm:w-auto text-center" style={{ textDecoration: 'none' }}>
              {t.cta.contact}
            </LocalizedLink>
          </div>
        </div>
      </section>

    </main>
  );
}
