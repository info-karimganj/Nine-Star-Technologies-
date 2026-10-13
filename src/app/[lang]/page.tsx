import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { Metadata } from 'next';
import { constructMetadata } from '@/seo/metadata';
import { siteConfig } from '@/seo/config';
import { getSiteSettings, getServices } from '@/data/cms';
import { HomeInteractiveClient } from '@/components/home/HomeInteractiveClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const settings = await getSiteSettings();

  return constructMetadata({
    title: `${dict.home.hero.title || 'Building the future with AI and strategy'} | ${siteConfig.name}`,
    description: dict.home.hero.description,
    url: `${siteConfig.url}/${lang}`,
  });
}

export default async function Home(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const settings = await getSiteSettings();
  const dbServices = await getServices();

  const editorialServices = [
    {
      index: '01',
      title: lang === 'bn' ? 'সার্চ ইঞ্জিন অপ্টিমাইজেশন (SEO)' : 'Search Engine Optimization',
      desc: lang === 'bn' ? 'অর্গানিক অথরিটি তৈরি করুন যা নিয়মিত গ্রাহক এবং দীর্ঘমেয়াদি রেভিনিউ নিশ্চিত করে।' : 'Build compounding organic authority that captures intent-rich search queries and drives perpetual revenue.',
      href: `/${lang}/services`,
    },
    {
      index: '02',
      title: lang === 'bn' ? 'জেনারেটিভ ইঞ্জিন অপ্টিমাইজেশন (GEO)' : 'Generative Engine Optimization',
      desc: lang === 'bn' ? 'ChatGPT, Perplexity এবং Google AI তে আপনার ব্র্যান্ডের রিকমেন্ডেশন নিশ্চিত করুন।' : 'Ensure your brand is proactively cited and recommended by ChatGPT, Perplexity, Claude, and Google AI Overviews.',
      href: `/${lang}/services`,
    },
    {
      index: '03',
      title: lang === 'bn' ? 'ওয়েব ও ক্লাউড ইঞ্জিনিয়ারিং' : 'Web & Cloud Engineering',
      desc: lang === 'bn' ? 'Next.js এবং ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন যা গতি এবং ১০০% আপটাইমের জন্য অপ্টিমাইজড।' : 'Ultra-fast, modular Next.js and full-stack web applications engineered for speed, clean UX, and 100% uptime.',
      href: `/${lang}/services`,
    },
    {
      index: '04',
      title: lang === 'bn' ? 'পারফরম্যান্স মিডিয়া ও বিজ্ঞাপন' : 'Performance Media & Ads',
      desc: lang === 'bn' ? 'গুগল সার্চ ও মেটা বিজ্ঞাপনের মাধ্যমে সর্বোচ্চ আরওএএস (ROAS) অর্জন।' : 'High-return Google Search, Meta Ads, and programmatic campaigns with strict attribution and verifiable ROAS.',
      href: `/${lang}/services`,
    },
    {
      index: '05',
      title: lang === 'bn' ? 'কনভার্সন রেট অপ্টিমাইজেশন (CRO)' : 'Conversion Rate Optimization',
      desc: lang === 'bn' ? 'ডাটা-চালিত ইউআই/ইউএক্স রিডিজাইন এবং হিটম্যাপ অ্যানালাইসিসের মাধ্যমে সেলস দ্বিগুণ করুন।' : 'Double the output of your existing traffic through data-backed UI/UX redesigns, behavioral heatmaps, and multivariate testing.',
      href: `/${lang}/services`,
    },
    {
      index: '06',
      title: lang === 'bn' ? 'এআই অটোমেশন ও এজেন্টস' : 'AI Automations & Agents',
      desc: lang === 'bn' ? 'কাস্টম এলএলএম এজেন্ট এবং সিআরএম অটোমেশনের মাধ্যমে কাজের গতি বাড়ান।' : 'Streamline operational bottlenecks with custom LLM agents, automated lead nurturing, and CRM synchronization.',
      href: `/${lang}/services`,
    },
    {
      index: '07',
      title: lang === 'bn' ? 'প্রোডাক্ট ডিজাইন ও ইউআই/ইউএক্স অডিট' : 'Product Design & UX Audit',
      desc: lang === 'bn' ? 'আধুনিক ডিজাইন সিস্টেমের মাধ্যমে আকর্ষণীয় এবং ব্যবহারকারী-বান্ধব ইন্টারফেস।' : 'Intuitive, beautiful interfaces crafted with precision design systems that captivate users and elevate brand perception.',
      href: `/${lang}/services`,
    },
    {
      index: '08',
      title: lang === 'bn' ? 'রিটেনশন ও লাইফসাইকেল ইমেইল' : 'Retention & Lifecycle Email',
      desc: lang === 'bn' ? 'স্বয়ংক্রিয় অনবোর্ডিং এবং কাস্টমার রি-এনগেজমেন্ট ইমেইল ফানেল।' : 'Automated onboarding journeys, customer re-engagement sequences, and high-converting newsletters.',
      href: `/${lang}/services`,
    },
    {
      index: '09',
      title: lang === 'bn' ? 'অ্যানালিটিক্স ও ডিপ অ্যাট্রিবিউশন' : 'Analytics & Deep Attribution',
      desc: lang === 'bn' ? 'সার্ভার-সাইড ট্র্যাকিং এবং এক্সিকিউটিভ ড্যাশবোর্ডের মাধ্যমে নিখুঁত আরওআই পর্যবেক্ষণ।' : 'Complete clarity on marketing ROI with server-side tracking, BigQuery data pipelines, and real-time executive dashboards.',
      href: `/${lang}/services`,
    },
  ];

  return (
    <main className="w-full overflow-x-hidden">
      
      {/* ==========================================================================
           1. HERO SECTION (AZURE SKY & CUMULUS CLOUDS — REFERENCE IMAGE SIGNATURE)
           ========================================================================== */}
      <div className="hero-outer-frame">
        <div className="hero-sky-card">
          <div className="hero-light-beam"></div>
          <div className="hero-clouds-layer"></div>
          <div className="hero-clouds-photo-texture"></div>

          <div className="hero-content-inner site-container">
            {/* Top Pill Badge */}
            <div className="hero-top-pill">
              <span className="hero-pulse-dot"></span>
              <span>
                {lang === 'bn'
                  ? 'নাইনস্টার টেকনোলজিস • বিশ্বমানের প্রবৃদ্ধি'
                  : '9STAR Technologies • Scaled for Global Dominance'}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="hero-display-headline">
              {lang === 'bn' ? (
                <>এআই এবং আধুনিক কৌশলে<br />আগামীর ভবিষ্যৎ নির্মাণ</>
              ) : (
                <>Building the future with<br />AI and strategy</>
              )}
            </h1>

            {/* Subtitle */}
            <p className="hero-lead-text">
              {lang === 'bn'
                ? 'আমরা ডেটা-চালিত ইঞ্জিনিয়ারিং, ইন্টেলিজেন্ট অটোমেশন এবং কৌশলগত পরামর্শের মাধ্যমে ব্যবসায়ের দ্রুত প্রবৃদ্ধি নিশ্চিত করি।'
                : 'We help organizations unlock growth and efficiency through data-driven consulting, intelligent automation, and high-performance engineering.'}
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <Link href={`/${lang}/services`} className="btn btn-glass btn-lg">
                {lang === 'bn' ? 'সার্ভিস দেখুন' : 'VIEW SERVICES'}
              </Link>
              <button type="button" className="btn btn-neon btn-lg trigger-audit-btn cursor-pointer">
                <span>{lang === 'bn' ? 'শুরু করুন' : 'GET STARTED'}</span>
                <span className="arrow-circle">↗</span>
              </button>
            </div>
          </div>

          {/* 3D Floating Perspective Deck & Interactive Modal Component */}
          <HomeInteractiveClient lang={lang} contactEmail={settings?.contactEmail} />
        </div>
      </div>

      {/* ==========================================================================
           2. PARTNER LOGOS STRIP (MINIMALIST MONOCHROME)
           ========================================================================== */}
      <section className="partner-logo-strip" aria-label="Technology and Platform Partners">
        <div className="site-container">
          <div className="partner-logo-row">
            <div className="partner-logo-item">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2zm0-10h2v8h-2z"/></svg>
              <span>Google Partner</span>
            </div>
            <div className="partner-logo-item">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
              <span>Meta Verified</span>
            </div>
            <div className="partner-logo-item">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.7 14.4c-.3-.2-1-.6-2.1-.6-1.5 0-2.4.9-2.4 2.1 0 1.2.9 2 2.5 2 .9 0 1.6-.3 2-.5v-3zm-6.2 3.1c-.6.3-1.4.5-2.2.5-1.9 0-2.8-1.1-2.8-2.6 0-1.8 1.3-2.7 3.3-2.7.6 0 1.2.1 1.7.3v4.5zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/></svg>
              <span>AWS Solutions</span>
            </div>
            <div className="partner-logo-item">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 10 18H2L12 2z"/></svg>
              <span>Vercel Certified</span>
            </div>
            <div className="partner-logo-item">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5a2.5 2.5 0 0 1-5 0v-5a2.5 2.5 0 0 1 5 0z"/></svg>
              <span>OpenAI API</span>
            </div>
            <div className="partner-logo-item">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 14h9l-1 8 12-12h-9l1-8z"/></svg>
              <span>Supabase Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           3. "• ABOUT US" / VALUE PROPOSITION & 4-CARD BENTO GRID
           ========================================================================== */}
      <section className="about-bento-section" id="agency">
        <div className="site-container">
          
          <div className="about-header-group">
            <div className="eyebrow-dot">
              {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'ABOUT US'}
            </div>
            <h2 className="about-display-headline">
              {lang === 'bn' ? (
                <>
                  একটি গ্লোবাল কনসাল্টিং পার্টনার<br />
                  যা গড়ে তুলছে{' '}
                  <span className="inline-badge-pill badge-cyan">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </span>{' '}
                  সংশ্লিষ্ট স্মার্ট<br />
                  <span className="muted-text">
                    এবং{' '}
                    <span className="inline-badge-pill badge-lime">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                        <path d="M9 18h6"/><path d="M10 22h4"/>
                      </svg>
                    </span>{' '}
                    অভিযোজ্য প্ল্যাটফর্ম
                  </span>
                </>
              ) : (
                <>
                  A global consulting partner<br />
                  dedicated to building{' '}
                  <span className="inline-badge-pill badge-cyan">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </span>{' '}
                  smarter<br />
                  <span className="muted-text">
                    and{' '}
                    <span className="inline-badge-pill badge-lime">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                        <path d="M9 18h6"/><path d="M10 22h4"/>
                      </svg>
                    </span>{' '}
                    more adaptive
                  </span>
                </>
              )}
            </h2>
          </div>

          {/* 4-Card Bento Grid */}
          <div className="bento-showcase-grid">
            
            {/* Card 1: Photo Card with Docked Stat Box */}
            <div className="bento-card-photo">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Tech innovator portrait"
                className="bento-photo-img"
              />
              <div className="bento-photo-overlay"></div>
              
              <div className="bento-photo-header">
                <span className="bento-brand-tag">9STAR</span>
                <div className="bento-icon-pill">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
              </div>

              <div className="bento-docked-stat-card">
                <div className="stat-huge-number">150+</div>
                <p className="stat-desc">
                  {lang === 'bn'
                    ? 'বিশ্বসেরা এআই এবং ক্লাউড প্রযুক্তি পার্টনারদের সাথে কোলাবোরেশন।'
                    : 'Collaborating with leading AI and cloud technology providers.'}
                </p>
              </div>
            </div>

            {/* Card 2: Testimonial & 100% Commitment */}
            <div className="bento-card-testimonial">
              <div>
                <span className="tag-label">
                  {lang === 'bn' ? 'পরিমাপযোগ্য ফলাফলে প্রতিশ্রুতি' : 'Commitment to measurable'}
                </span>
                <div className="stat-huge-number">100%</div>
              </div>

              <div>
                <div className="avatar-stack">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Client 1" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Client 2" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Client 3" />
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Client 4" />
                </div>

                <blockquote className="testimonial-quote">
                  {lang === 'bn'
                    ? '“তাদের অটোমেশন স্ট্র্যাটেজি আমাদের কাজের ধরন পুরোপুরি বদলে দিয়েছে। এটি অত্যন্ত দ্রুত, স্মার্ট এবং নিখুঁত।”'
                    : '“Their automation strategy completely reshaped how we work. It’s efficient, intelligent, and seamless.”'}
                </blockquote>
              </div>
            </div>

            {/* Card 3: Neon Lime 520k+ Data Points Card */}
            <div className="bento-card-lime">
              <div>
                <span className="tag-label">
                  {lang === 'bn' ? 'ডেটা পয়েন্ট' : 'Data Points'}
                </span>
                <div className="stat-huge-number">520k+</div>
              </div>
              <p className="stat-desc">
                {lang === 'bn'
                  ? 'স্মার্ট ব্যবসায়িক সিদ্ধান্তের জন্য প্রতিমাসে বিশ্লেষিত।'
                  : 'Analyzed monthly to power smarter business strategies.'}
              </p>
            </div>

            {/* Card 4: Dark Card Continents 20+ */}
            <div className="bento-card-dark">
              <span className="dark-label">
                {lang === 'bn' ? 'গ্লোবাল উপস্থিতি ও মহাদেশ' : 'Global Reach & Continents'}
              </span>
              <span className="dark-number">20+</span>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
           4. SERVICES & CAPABILITIES (3x3 BENTO CARDS GRID)
           ========================================================================== */}
      <section className="services-modern-section" id="services">
        <div className="site-container">
          
          <div className="section-head-split">
            <div>
              <div className="eyebrow-dot">
                {lang === 'bn' ? '০২ / সক্ষমতা' : '02 / CAPABILITIES'}
              </div>
              <h2 className="section-heading-l">
                {lang === 'bn' ? 'আমাদের সেবা ও সমাধান' : 'What We Build & Deliver'}
              </h2>
            </div>
            <Link href={`/${lang}/request`} className="btn btn-dark">
              {lang === 'bn' ? 'পরামর্শের জন্য শিডিউল করুন →' : 'Schedule Consultation →'}
            </Link>
          </div>

          <div className="modern-services-grid">
            {editorialServices.map((svc) => (
              <Link
                key={svc.index}
                href={svc.href}
                className="service-bento-card group"
              >
                <div className="service-card-top">
                  <span className="service-index-badge">{svc.index}</span>
                  <div className="service-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                </div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.desc}</p>
                <div className="service-card-action">
                  <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Service'}</span>
                  <span>↗</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================================================
           5. PROVEN RESULTS & CASE STUDIES (OBSIDIAN DARK LUXURY THEME)
           ========================================================================== */}
      <section className="case-studies-section" id="case-studies">
        <div className="site-container">
          
          <div className="section-head-split">
            <div>
              <div className="eyebrow-dot" style={{ color: 'var(--neon-lime)' }}>
                {lang === 'bn' ? '০৩ / প্রমাণিত ফলাফল' : '03 / PROVEN RESULTS'}
              </div>
              <h2 className="section-heading-l" style={{ color: '#ffffff' }}>
                {lang === 'bn' ? 'আমাদের সফলতার কেস স্টাডি' : 'Case Studies That Speak For Themselves'}
              </h2>
            </div>
            <Link href={`/${lang}/case-studies`} className="btn btn-outline-white">
              {lang === 'bn' ? 'সম্পূর্ণ কেস লাইব্রেরি দেখুন →' : 'Request Full Case Library →'}
            </Link>
          </div>

          <div className="case-studies-grid">
            
            {/* Case Study 1 */}
            <div className="case-study-card">
              <div>
                <span className="case-study-tag">Hospitality & Booking</span>
                <h3 className="case-study-title">
                  {lang === 'bn' ? '৩টি দেশে শূন্য থেকে ১০০% ফুললি বুকড' : 'From invisible to fully booked across 3 countries'}
                </h3>
                <div className="case-study-metrics">
                  <div>
                    <div className="case-metric-val">+220%</div>
                    <div className="case-metric-label">Organic Visitors</div>
                  </div>
                  <div>
                    <div className="case-metric-val">#1 Rank</div>
                    <div className="case-metric-label">18 Target Keywords</div>
                  </div>
                  <div>
                    <div className="case-metric-val">-35%</div>
                    <div className="case-metric-label">OTA Costs</div>
                  </div>
                </div>
              </div>
              <Link href={`/${lang}/case-studies`} className="case-link-action">
                <span>{lang === 'bn' ? 'বিস্তারিত কেস স্টাডি' : 'Read Deep Dive'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* Case Study 2 */}
            <div className="case-study-card">
              <div>
                <span className="case-study-tag">EdTech & SaaS</span>
                <h3 className="case-study-title">
                  {lang === 'bn' ? (
                    <>কোনো অপ্রয়োজনীয় খরচ ছাড়াই <em>রিকারিং রেভিনিউ বৃদ্ধি</em></>
                  ) : (
                    <>Scaling recurring revenue with <em>zero wasted ad spend</em></>
                  )}
                </h3>
                <div className="case-study-metrics">
                  <div>
                    <div className="case-metric-val">+315%</div>
                    <div className="case-metric-label">Qualified Signups</div>
                  </div>
                  <div>
                    <div className="case-metric-val">Top 3</div>
                    <div className="case-metric-label">AI Citing</div>
                  </div>
                  <div>
                    <div className="case-metric-val">4.6x</div>
                    <div className="case-metric-label">Blended ROAS</div>
                  </div>
                </div>
              </div>
              <Link href={`/${lang}/case-studies`} className="case-link-action">
                <span>{lang === 'bn' ? 'বিস্তারিত কেস স্টাডি' : 'Read Deep Dive'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* Case Study 3 */}
            <div className="case-study-card">
              <div>
                <span className="case-study-tag">FinTech Platform</span>
                <h3 className="case-study-title">
                  {lang === 'bn' ? (
                    <>স্বল্প খরচে প্রাতিষ্ঠানিক <em>হাই-ভ্যালু লিড অর্জন</em></>
                  ) : (
                    <>Institutional leads at a <em>fraction</em> of benchmark cost</>
                  )}
                </h3>
                <div className="case-study-metrics">
                  <div>
                    <div className="case-metric-val">-48%</div>
                    <div className="case-metric-label">Acquisition Cost</div>
                  </div>
                  <div>
                    <div className="case-metric-val">+85%</div>
                    <div className="case-metric-label">SQL Conversion</div>
                  </div>
                  <div>
                    <div className="case-metric-val">$12M</div>
                    <div className="case-metric-label">Pipeline Generated</div>
                  </div>
                </div>
              </div>
              <Link href={`/${lang}/case-studies`} className="case-link-action">
                <span>{lang === 'bn' ? 'বিস্তারিত কেস স্টাডি' : 'Read Deep Dive'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================================
           6. CLIENT MARQUEE NETWORK
           ========================================================================== */}
      <section className="client-marquee-section" id="clients">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="marquee-container">
            <div className="marquee-fade-overlay"></div>
            <div className="marquee-track">
              <div className="client-pill"><span className="client-dot"></span> Ariston Global Logistics</div>
              <div className="client-pill"><span className="client-dot"></span> Apex Capital Partners</div>
              <div className="client-pill"><span className="client-dot"></span> Nova Health Systems</div>
              <div className="client-pill"><span className="client-dot"></span> CloudSpark Software</div>
              <div className="client-pill"><span className="client-dot"></span> Horizon Real Estate</div>
              <div className="client-pill"><span className="client-dot"></span> StellarPay FinTech</div>
              <div className="client-pill"><span className="client-dot"></span> Notion Enterprise Group</div>
              <div className="client-pill"><span className="client-dot"></span> Hostinger Cloud Platform</div>
              <div className="client-pill"><span className="client-dot"></span> Ariston Global Logistics</div>
              <div className="client-pill"><span className="client-dot"></span> Apex Capital Partners</div>
              <div className="client-pill"><span className="client-dot"></span> Nova Health Systems</div>
              <div className="client-pill"><span className="client-dot"></span> CloudSpark Software</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           7. MEDIA & KNOWLEDGE BREAKDOWN SHOWCASE
           ========================================================================== */}
      <section className="sec" id="showcase" style={{ background: '#ffffff' }}>
        <div className="site-container">
          <div className="section-head-split">
            <div>
              <div className="eyebrow-dot">
                {lang === 'bn' ? '০৪ / নলেজ ও মিডিয়া' : '04 / KNOWLEDGE & MEDIA'}
              </div>
              <h2 className="section-heading-l">
                {lang === 'bn' ? 'টেক অ্যানালাইসিস ও স্ট্র্যাটেজি সেশন' : 'Tech Breakdowns & Strategy Sessions'}
              </h2>
            </div>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              {lang === 'bn' ? 'ইউটিউবে সাবস্ক্রাইব করুন →' : 'Subscribe on YouTube →'}
            </a>
          </div>

          <div className="video-grid">
            <div className="video-card">
              <div className="video-thumb">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80" alt="Generative Engine Optimization Masterclass" />
                <div className="play-overlay"><div className="play-circle"><div className="play-triangle"></div></div></div>
              </div>
              <div style={{ padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="service-index-badge" style={{ fontSize: '0.7rem' }}>MASTERCLASS</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>15 Min Watch</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--obsidian-900)', lineHeight: 1.4 }}>
                  How Generative Search (GEO) Is Replacing Classic Google Results in 2026
                </h4>
              </div>
            </div>

            <div className="video-card">
              <div className="video-thumb">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80" alt="Full Funnel Architecture Guide" />
                <div className="play-overlay"><div className="play-circle"><div className="play-triangle"></div></div></div>
              </div>
              <div style={{ padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="service-index-badge" style={{ fontSize: '0.7rem' }}>ARCHITECTURE</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>24 Min Watch</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--obsidian-900)', lineHeight: 1.4 }}>
                  Building Modern Next.js Fullstack Apps Built to Convert High-Intent B2B Leads
                </h4>
              </div>
            </div>

            <div className="video-card">
              <div className="video-thumb">
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&q=80" alt="Conversion Optimization Breakdown" />
                <div className="play-overlay"><div className="play-circle"><div className="play-triangle"></div></div></div>
              </div>
              <div style={{ padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="service-index-badge" style={{ fontSize: '0.7rem' }}>CRO PLAYBOOK</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>18 Min Watch</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--obsidian-900)', lineHeight: 1.4 }}>
                  7 Critical Landing Page Mistakes Costing You 40% of Your Paid Ad Budget
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           8. GRAND PRE-FOOTER CTA CARD (DIALED DIRECTLY TO SITE SETTINGS)
           ========================================================================== */}
      <section className="site-container">
        <div className="prefooter-cta-card">
          <div className="prefooter-ambient-glow"></div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '740px', margin: '0 auto', textAlign: 'center', paddingInline: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              {lang === 'bn' ? 'চলুন শুরু করি এক নতুন যাত্রা।' : 'Let’s start a conversation.'}
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, maxWidth: '580px' }}>
              {lang === 'bn'
                ? 'আপনার ডিজিটাল প্রবৃদ্ধির পথে কী বাধা রয়েছে তা জানতে আজই ৯স্টার টেকনোলজিস থেকে ফ্রি অডিট গ্রহণ করুন।'
                : 'Ready to discover what’s holding your digital growth back? Get a comprehensive audit from 9STAR Technologies today.'}
            </p>
            
            {/* Show dynamic contact phone if configured in Admin */}
            {settings?.contactPhone && (
              <a
                href={`tel:${settings.contactPhone}`}
                className="inline-flex items-center gap-2 text-white/90 hover:text-white font-mono text-sm tracking-wider"
              >
                📞 {settings.contactPhone}
              </a>
            )}

            <button type="button" className="btn btn-neon btn-lg trigger-audit-btn cursor-pointer">
              <span>{lang === 'bn' ? 'ফ্রি টেক অডিট বুক করুন' : 'Book a Free Tech Audit'}</span>
              <span className="arrow-circle">↗</span>
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
