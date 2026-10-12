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
    <main className="w-full bg-[#fbfcfd] min-h-screen">
      {/* 1. Luxury Editorial Hero Header */}
      <section className="bg-white border-b border-[var(--nt-ink-200)] pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <div className="hero-badge mb-4 mx-auto">
            <span className="hero-pulse-dot"></span>
            <span>Corporate Profile & Vision</span>
          </div>
          <h1 className="heading-xl text-[var(--ink)] mb-4 tracking-tight">
            {t.hero.title}
          </h1>
          <p className="body-lead text-[var(--ink-soft)] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
        </div>
      </section>

      {/* 2. Who We Are & What We Do */}
      <section className="py-20 md:py-24">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[var(--nt-ink-200)] shadow-xs">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
                Identity & Heritage
              </span>
              <h2 className="heading-sm text-[var(--ink)] mb-6">{t.whoWeAre.title}</h2>
              <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed mb-6">
                {t.whoWeAre.p1}
              </p>
              <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed">
                {t.whoWeAre.p2}
              </p>
            </div>
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[var(--nt-ink-200)] shadow-xs">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
                Capabilities & Delivery
              </span>
              <h2 className="heading-sm text-[var(--ink)] mb-6">{t.whatWeDo.title}</h2>
              <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed mb-6">
                {t.whatWeDo.p1}
              </p>
              <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed">
                {t.whatWeDo.p2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, Values */}
      <section className="py-20 md:py-24 bg-white border-t border-b border-[var(--nt-ink-200)]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50/60 via-slate-50 to-white border border-blue-100">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-bold mb-2 block">
                North Star
              </span>
              <h3 className="text-2xl font-bold text-[var(--ink)] mb-4">{t.missionVision.missionTitle}</h3>
              <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed">
                {t.missionVision.missionDesc}
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50/60 via-slate-50 to-white border border-indigo-100">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold mb-2 block">
                Future Horizon
              </span>
              <h3 className="text-2xl font-bold text-[var(--ink)] mb-4">{t.missionVision.visionTitle}</h3>
              <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed">
                {t.missionVision.visionDesc}
              </p>
            </div>
          </div>

          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
              Core Principles
            </span>
            <h2 className="heading-md text-[var(--ink)]">{t.coreValues.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {t.coreValues.values.map((val: any, idx: number) => (
              <div key={idx} className="p-7 rounded-2xl bg-[#f8fafc] border border-[var(--nt-ink-200)] hover:border-[var(--nt-accent)] hover:shadow-md transition-all flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--nt-accent)] flex items-center justify-center mb-6 font-mono font-bold text-base border border-blue-100">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[var(--ink)] mb-2">{val.title}</h3>
                <p className="text-[var(--ink-soft)] text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How We Work */}
      <section className="py-20 md:py-24">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-2 block">
              Execution Formula
            </span>
            <h2 className="heading-md text-[var(--ink)] mb-4">{t.howWeWork.title}</h2>
            <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed">
              {t.howWeWork.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {t.howWeWork.steps.map((step: any, idx: number) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[var(--nt-ink-200)] shadow-xs relative">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[var(--nt-accent)] border border-blue-200 font-mono font-bold text-base flex items-center justify-center mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[var(--ink)] mb-2">{step.title}</h3>
                <p className="text-[var(--ink-soft)] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Technology & Capability */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-[#080d1a] via-[#0f172a] to-[#1e293b] text-white">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="hero-badge !bg-white/10 !border-white/20 !text-cyan-300 mb-4 inline-flex">
                <span className="hero-pulse-dot !bg-cyan-400"></span>
                <span>Engineering Stack</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">{t.technology.title}</h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                {t.technology.p1}
              </p>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {t.technology.p2}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-xs">
                <h3 className="text-lg font-bold text-white mb-2">{t.technology.items.web.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{t.technology.items.web.desc}</p>
              </div>
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-xs">
                <h3 className="text-lg font-bold text-white mb-2">{t.technology.items.mobile.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{t.technology.items.mobile.desc}</p>
              </div>
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-xs">
                <h3 className="text-lg font-bold text-white mb-2">{t.technology.items.automation.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{t.technology.items.automation.desc}</p>
              </div>
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-xs">
                <h3 className="text-lg font-bold text-white mb-2">{t.technology.items.infrastructure.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{t.technology.items.infrastructure.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-20 md:py-28 bg-white border-t border-[var(--nt-ink-200)]">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="heading-md text-[var(--ink)] mb-4">{t.cta.title}</h2>
          <p className="text-[var(--ink-soft)] text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <LocalizedLink 
              href="/services" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm bg-[var(--nt-accent)] text-white hover:bg-blue-700 transition-all shadow-md text-center"
            >
              {t.cta.explore}
            </LocalizedLink>
            <LocalizedLink 
              href="/contact" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm border border-[var(--nt-ink-200)] text-[var(--ink)] hover:bg-slate-50 transition-all text-center"
            >
              {t.cta.contact}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
