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

  const pressCoverage = [
    '⚡ TechCrunch Daily',
    '📰 Prothom Alo Business',
    '🌐 The Daily Star',
    '📈 Search Engine Journal',
    '📺 Channel I Feature',
    '🚀 Product Hunt Top 5',
    '📊 Bloomberg Technology',
    '💼 Forbes Tech Council',
  ];

  const editorialServices = [
    {
      index: '01',
      title: 'Search Engine Optimization (SEO)',
      desc: 'Build compounding organic authority that captures intent-rich search queries and drives perpetual revenue.',
      href: `/${lang}/services`,
    },
    {
      index: '02',
      title: 'Generative Engine Optimization (GEO)',
      desc: 'Ensure your brand is proactively cited and recommended by ChatGPT, Perplexity, Claude, and Google AI Overviews.',
      href: `/${lang}/services`,
    },
    {
      index: '03',
      title: 'Web & Cloud Engineering',
      desc: 'Ultra-fast Next.js and full-stack web applications engineered for speed, clean UX, and 100% uptime.',
      href: `/${lang}/services`,
    },
    {
      index: '04',
      title: 'Performance Media & Ads',
      desc: 'High-return Google Search, Meta Ads, and programmatic campaigns with strict attribution and verifiable ROAS.',
      href: `/${lang}/services`,
    },
    {
      index: '05',
      title: 'Conversion Rate Optimization',
      desc: 'Double the output of your existing traffic through data-backed UI/UX redesigns and behavioral heatmaps.',
      href: `/${lang}/services`,
    },
    {
      index: '06',
      title: 'AI Automations & Custom Agents',
      desc: 'Streamline operational bottlenecks with custom LLM agents, automated lead nurturing, and CRM synchronization.',
      href: `/${lang}/services`,
    },
    {
      index: '07',
      title: 'Product Design & UI/UX Audit',
      desc: 'Intuitive, beautiful interfaces crafted with precision design systems that captivate users and elevate brand perception.',
      href: `/${lang}/services`,
    },
    {
      index: '08',
      title: 'Retention & Lifecycle Email',
      desc: 'Automated onboarding journeys, customer re-engagement sequences, and high-converting newsletters.',
      href: `/${lang}/services`,
    },
    {
      index: '09',
      title: 'Analytics & Deep Attribution',
      desc: 'Complete clarity on marketing ROI with server-side tracking, BigQuery data pipelines, and real-time dashboards.',
      href: `/${lang}/services`,
    },
  ];

  return (
    <main className="flex flex-col overflow-x-hidden">
      {/* 1. Hero Section (Editorial High-Impact Layout) */}
      <section className="homepage-hero relative min-h-[85vh] flex flex-col justify-center items-center py-20 px-4 bg-white overflow-hidden text-center">
        {/* Floating Ambient Blobs */}
        <span className="blob" style={{ width: '280px', height: '280px', background: 'rgba(37, 99, 235, 0.12)', top: '8%', right: '10%' }}></span>
        <span className="blob" style={{ width: '160px', height: '160px', background: 'rgba(6, 182, 212, 0.16)', bottom: '12%', left: '8%', animationDelay: '1.5s' }}></span>
        <span className="blob" style={{ width: '90px', height: '90px', background: 'rgba(245, 158, 11, 0.14)', top: '48%', right: '6%', animationDelay: '3s' }}></span>

        <div className="site-container relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          {/* Pulsing Geographic Badge */}
          <div className="hero-badge shadow-xs">
            <span className="hero-pulse-dot"></span>
            <span>Ninestar Technologies &bull; Scale Globally</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="m-0 tracking-tight">
            <span className="display-l block text-[var(--ink)]">WE’RE YOUR PARTNERS IN</span>
            <span className="display-l block text-[var(--nt-accent)]">GROWTH & TECH</span>
          </h1>

          {/* Serif Lead Paragraph */}
          <p className="body-lead max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed">
            {dict.home.hero.description || 'A founder-driven technology and digital agency. Full-stack development, Generative Engine Optimisation (GEO), high-intent SEO, and performance scale for forward-thinking enterprises.'}
          </p>

          {/* Dual Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-3">
            <TrackAction event="cta_clicked" properties={{ location: 'hero', button: 'primary' }}>
              <Link
                href={`/${lang}/request`}
                className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-[var(--nt-accent)] flex items-center justify-center text-white text-xs">
                  ⭐
                </span>
                {dict.home.hero.ctaPrimary} →
              </Link>
            </TrackAction>

            <TrackAction event="cta_clicked" properties={{ location: 'hero', button: 'secondary' }}>
              <Link
                href={`/${lang}/contact`}
                className="btn btn-outline btn-lg hover:bg-slate-50 transition-all"
              >
                {dict.home.hero.ctaSecondary} →
              </Link>
            </TrackAction>
          </div>
        </div>
      </section>

      {/* 2. Halftone & Press Marquee Section */}
      <section className="halftone relative bg-[var(--abyss)] py-12 overflow-hidden text-white">
        <div className="site-container relative z-10 mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-slate-600/40"></span>
            <span className="font-serif uppercase tracking-[0.18em] text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--nt-cyan)] inline-block"></span>
              RECOGNIZED & FEATURED ACROSS GLOBAL MEDIA
            </span>
            <span className="h-[1px] w-12 bg-slate-600/40"></span>
          </div>

          <div className="marquee-container">
            <div className="marquee-fade-overlay"></div>
            <div className="marquee-track">
              {pressCoverage.concat(pressCoverage).map((chip, idx) => (
                <div key={idx} className="press-chip text-sm font-semibold text-slate-800">
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. 01 / THE AGENCY Metrics Section */}
      <section className="py-20 bg-white border-b border-[var(--nt-ink-200)]" id="agency">
        <div className="site-container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="eyebrow mb-3">01 / THE AGENCY</p>
              <h2 className="heading-xl mb-5 text-[var(--ink)]">
                We engineer digital platforms that convert visitors into lifetime customers.
              </h2>
              <p className="body-lead mb-8 text-[var(--ink-soft)] text-base sm:text-lg">
                Ninestar Technologies is a high-conviction digital engineering and performance agency. We don’t hide behind confusing spreadsheets or sell bloated contracts. You partner directly with elite developers and growth strategists fully dedicated to your bottom line.
              </p>
              <Link href={`/${lang}/services`} className="btn btn-primary">
                Explore Services →
              </Link>
            </div>

            {/* Metrics 2x2 counter grid */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 bg-[var(--nt-ink-50)] p-8 sm:p-10 rounded-2xl border border-[var(--nt-ink-200)]">
              <div className="text-center">
                <div className="font-display text-4xl sm:text-5xl font-bold text-[var(--ink)]">150+</div>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] font-medium mt-1">Clients Served</p>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl sm:text-5xl font-bold text-[var(--ink)]">14</div>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] font-medium mt-1">Countries Globally</p>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl sm:text-5xl font-bold text-[var(--nt-accent)]">$35M+</div>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] font-medium mt-1">Client Revenue Scaled</p>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl sm:text-5xl font-bold text-[var(--nt-accent)]">9+</div>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] font-medium mt-1">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Problem Finder (Ninestar Intelligent Diagnostic) */}
      <section id="problem-finder" className="py-20 bg-[var(--paper-deep)] border-b border-[var(--nt-ink-200)]">
        <div className="site-container max-w-4xl mx-auto px-4 text-center mb-10">
          <p className="eyebrow mb-2">INTELLIGENT DIAGNOSTIC</p>
          <h2 className="heading-xl mb-3 text-[var(--ink)]">
            {dict.home.problemFinder?.title || 'What Are You Trying to Solve?'}
          </h2>
          <p className="body-lead max-w-xl mx-auto text-sm sm:text-base">
            {dict.home.problemFinder?.subtitle || 'Select your challenge below to uncover tailor-made roadmaps and instant solutions.'}
          </p>
        </div>
        <div className="site-container max-w-5xl mx-auto px-4">
          <ProblemFinderClient problems={dict.home.problemFinder?.problems || []} lang={lang} />
        </div>
      </section>

      {/* 5. 02 / CAPABILITIES & SERVICES (Editorial 3x3 Grid with Hover Inversion) */}
      <section className="py-24 bg-white border-b border-[var(--nt-ink-200)]" id="services">
        <div className="site-container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-2">02 / CAPABILITIES</p>
              <h2 className="heading-xl text-[var(--ink)]">What We Build & Deliver</h2>
            </div>
            <Link href={`/${lang}/request`} className="btn btn-outline self-start sm:self-auto">
              Schedule Consultation →
            </Link>
          </div>

          <div className="services-grid-editorial shadow-xs">
            {editorialServices.map((svc) => (
              <Link
                key={svc.index}
                href={svc.href}
                className="service-card-editorial group text-left"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-[var(--nt-ink-400)] block mb-2">{svc.index}</span>
                  <h3 className="font-sans text-lg font-bold text-[var(--ink)] leading-snug mb-2 group-hover:text-white transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed group-hover:text-slate-300 transition-colors">
                    {svc.desc}
                  </p>
                </div>
                <div className="service-icon mt-4 flex justify-end text-[var(--nt-ink-400)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h10v10M7 17 17 7"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 03 / WORK & CASE STUDIES (Dark Editorial Theme) */}
      <section className="py-24 bg-[var(--nt-ink-900)] text-white border-b border-[var(--nt-ink-700)]" id="case-studies">
        <div className="site-container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow eyebrow-light mb-2">03 / PROVEN RESULTS</p>
              <h2 className="heading-xl text-white">Case Studies That Speak For Themselves</h2>
            </div>
            <Link href={`/${lang}/case-studies`} className="btn btn-outline-white self-start sm:self-auto">
              Request Full Case Library →
            </Link>
          </div>

          <div className="case-studies-grid-dark rounded-xl overflow-hidden border border-[var(--nt-ink-700)]">
            <div className="case-study-card-dark p-8 sm:p-10">
              <div>
                <span className="eyebrow eyebrow-light block mb-2">Hospitality & Booking</span>
                <h3 className="font-serif text-2xl text-white leading-snug mb-6">From invisible to fully booked across 3 countries</h3>
                <div className="flex gap-6 mb-6">
                  <div>
                    <div className="font-serif text-3xl font-bold text-white">+220%</div>
                    <div className="text-xs text-slate-400 mt-1">Organic Visitors</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-bold text-white">#1 Rank</div>
                    <div className="text-xs text-slate-400 mt-1">18 Target Keywords</div>
                  </div>
                </div>
              </div>
              <Link href={`/${lang}/case-studies`} className="text-sm text-[var(--nt-cyan)] hover:underline inline-flex items-center gap-1 font-semibold">
                Read Deep Dive →
              </Link>
            </div>

            <div className="case-study-card-dark p-8 sm:p-10">
              <div>
                <span className="eyebrow eyebrow-light block mb-2">SaaS & Enterprise</span>
                <h3 className="font-serif text-2xl text-white leading-snug mb-6">Scaling B2B pipeline via Generative AI & Next.js</h3>
                <div className="flex gap-6 mb-6">
                  <div>
                    <div className="font-serif text-3xl font-bold text-white">4.8x</div>
                    <div className="text-xs text-slate-400 mt-1">Qualified Pipeline</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-bold text-white">&lt;0.8s</div>
                    <div className="text-xs text-slate-400 mt-1">Core Web Vitals</div>
                  </div>
                </div>
              </div>
              <Link href={`/${lang}/case-studies`} className="text-sm text-[var(--nt-cyan)] hover:underline inline-flex items-center gap-1 font-semibold">
                Read Deep Dive →
              </Link>
            </div>

            <div className="case-study-card-dark p-8 sm:p-10">
              <div>
                <span className="eyebrow eyebrow-light block mb-2">E-Commerce Architecture</span>
                <h3 className="font-serif text-2xl text-white leading-snug mb-6">Headless migration and global checkout conversion</h3>
                <div className="flex gap-6 mb-6">
                  <div>
                    <div className="font-serif text-3xl font-bold text-white">+48%</div>
                    <div className="text-xs text-slate-400 mt-1">Mobile Checkout</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-bold text-white">0 Downtime</div>
                    <div className="text-xs text-slate-400 mt-1">BFCM Peak</div>
                  </div>
                </div>
              </div>
              <Link href={`/${lang}/case-studies`} className="text-sm text-[var(--nt-cyan)] hover:underline inline-flex items-center gap-1 font-semibold">
                Read Deep Dive →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 04 / CLIENT PORTFOLIO TICKER */}
      <section className="py-12 bg-white border-b border-[var(--nt-ink-200)] overflow-hidden">
        <div className="site-container mx-auto px-4 mb-6 text-center">
          <p className="eyebrow mb-2">TRUSTED ECOSYSTEM</p>
          <h3 className="font-serif italic text-sm text-[var(--nt-ink-400)]">Powering high-velocity businesses and digital innovators</h3>
        </div>
        <div className="marquee-container">
          <div className="marquee-fade-overlay"></div>
          <div className="marquee-track">
            {['Apex Cloud Solutions', 'Vanguard E-Commerce', 'Nordic Health Systems', 'Quantum Logistics', 'Fintech Velocity', 'SilkRoad Global', 'Starlight Hospitality', 'Synapse Media Group', 'Apex Cloud Solutions', 'Vanguard E-Commerce', 'Nordic Health Systems', 'Quantum Logistics'].map((client, idx) => (
              <div key={idx} className="client-pill">
                <span className="client-dot"></span>
                <span>{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. 05 / INSIGHTS & STRATEGY */}
      <section className="py-20 bg-[var(--paper)] border-b border-[var(--nt-ink-200)]" id="insights">
        <div className="site-container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-2">05 / INSIGHTS & STRATEGY</p>
              <h2 className="heading-xl text-[var(--ink)]">Latest Articles & Engineering Breakdowns</h2>
            </div>
            <Link href={`/${lang}/services`} className="btn-pill-outline self-start sm:self-auto">
              Explore All Articles →
            </Link>
          </div>

          <div className="space-y-2">
            <Link href={`/${lang}/services`} className="article-item group">
              <span className="eyebrow block mb-2">GEO & AI Search</span>
              <h3 className="article-title group-hover:text-[var(--nt-accent)] transition-colors">
                What Is Generative Engine Optimisation (GEO) And Why It Dominates 2026
              </h3>
              <p className="article-desc">
                GEO is the revolutionary marketing concept replacing manual search queries. Discover how AI answer engines index knowledge and how your company can become the top recommended source.
              </p>
              <div className="flex items-center gap-3 text-xs text-[var(--nt-ink-400)] font-mono">
                <time>October 2026</time>
                <span>&bull;</span>
                <span>8 min read</span>
              </div>
            </Link>

            <Link href={`/${lang}/services`} className="article-item group">
              <span className="eyebrow block mb-2">Engineering & Speed</span>
              <h3 className="article-title group-hover:text-[var(--nt-accent)] transition-colors">
                Why Legacy WordPress Sites Lose 60% of Mobile Visitors (And How We Fix It)
              </h3>
              <p className="article-desc">
                Bloated plugins and sluggish Core Web Vitals kill conversions before prospects even read your offer. Here is how modern Next.js and JAMstack architecture restores sub-second load times.
              </p>
              <div className="flex items-center gap-3 text-xs text-[var(--nt-ink-400)] font-mono">
                <time>September 2026</time>
                <span>&bull;</span>
                <span>11 min read</span>
              </div>
            </Link>

            <Link href={`/${lang}/services`} className="article-item group">
              <span className="eyebrow block mb-2">Paid Acquisition</span>
              <h3 className="article-title group-hover:text-[var(--nt-accent)] transition-colors">
                The Real Reason Your Google Ads CPA Is Rising — And The Modern B2B Fix
              </h3>
              <p className="article-desc">
                Blind broad-match bidding and lack of first-party data signals burn client capital. We reveal the exact full-funnel structure we run across our enterprise portfolio.
              </p>
              <div className="flex items-center gap-3 text-xs text-[var(--nt-ink-400)] font-mono">
                <time>August 2026</time>
                <span>&bull;</span>
                <span>7 min read</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Topics & Disciplines Strip */}
      <section className="py-14 bg-[var(--paper-deep)] border-b border-[var(--nt-ink-200)]">
        <div className="site-container max-w-4xl mx-auto px-4 text-center">
          <h3 className="heading-lg mb-2 text-[var(--ink)]">Explore Topics & Disciplines</h3>
          <p className="text-sm text-[var(--ink-soft)] max-w-lg mx-auto mb-6">
            Practical insights straight from our engineers and marketers running high-volume enterprise infrastructure.
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {['Web Development', 'Generative Engine Optimization', 'Search Engine Optimization', 'AI Automation', 'Google Ads', 'Meta Ads', 'CRO & UI/UX', 'Cloud Architecture', 'Next.js Scalability'].map((topic, i) => (
              <Link key={i} href={`/${lang}/services`} className="category-pill">
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section className="py-20 bg-white border-b border-[var(--nt-ink-200)]">
        <div className="site-container max-w-4xl mx-auto px-4 sm:px-6">
          <p className="eyebrow text-center mb-2">FAQ</p>
          <h2 className="heading-xl text-center text-[var(--ink)] mb-12">{dict.home.faq?.title || 'Frequently Asked Questions'}</h2>
          <div className="space-y-4">
            {dict.home.faq?.questions?.map((q: { q: string; a: string }, idx: number) => (
              <div key={idx} className="p-6 rounded-xl border border-[var(--nt-ink-200)] bg-[var(--paper-deep)]">
                <h3 className="text-base font-bold text-[var(--ink)] mb-2">{q.q}</h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{q.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final High-Converting CTA */}
      <section className="py-28 text-center bg-[var(--abyss)] text-white relative overflow-hidden">
        <div className="site-container max-w-3xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="hero-badge !bg-white/10 !border-white/20 !text-white mb-6">
            <span className="hero-pulse-dot !bg-[var(--nt-cyan)]"></span>
            <span>Founder-Led Technical Execution</span>
          </div>
          <h2 className="display-l mb-4 text-white">Let’s Start a Conversation.</h2>
          <p className="body-lead mb-8 text-slate-300 max-w-xl mx-auto text-base sm:text-lg">
            Ready to discover what’s holding your digital growth back? Book a complimentary engineering and growth audit with Ninestar Technologies today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${lang}/request`}
              className="btn btn-primary btn-lg !bg-[var(--nt-accent)] !border-[var(--nt-accent)] shadow-xl hover:!bg-[var(--nt-accent-hover)] transition-all"
            >
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[var(--nt-accent)] text-xs">
                ⭐
              </span>
              Get a Free Tech Audit →
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="btn btn-outline-white btn-lg"
            >
              Contact Our Engineers →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
