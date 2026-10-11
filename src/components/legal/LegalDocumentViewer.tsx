'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LegalDocumentContent } from '@/lib/legal';
import { CookieSettingsButton } from '@/components/layout/CookieSettingsButton';

interface LegalDocumentViewerProps {
  doc: LegalDocumentContent;
  lang: string;
}

export function LegalDocumentViewer({ doc, lang }: LegalDocumentViewerProps) {
  const [activeSection, setActiveSection] = useState<string>(doc.sections[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const currentTitle = (doc.title as any)[lang] || doc.title.en;
  const currentSubtitle = doc.subtitle ? ((doc.subtitle as any)[lang] || doc.subtitle.en) : '';
  const currentSummary = (doc.summary as any)[lang] || doc.summary.en;

  const filteredSections = doc.sections.filter(s => {
    if (!searchQuery.trim()) return true;
    const t = ((s.title as any)[lang] || s.title.en).toLowerCase();
    const c = ((s.content as any)[lang] || s.content.en).toLowerCase();
    return t.includes(searchQuery.toLowerCase()) || c.includes(searchQuery.toLowerCase());
  });

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isCookiePolicy = doc.slug === 'cookie-policy';

  return (
    <article className="w-full">
      {/* 1. Header Banner */}
      <header className="bg-[#0a192f] text-white pt-24 pb-14 md:pt-32 md:pb-20 border-b border-[#1e293b] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs flex items-center gap-2 text-slate-400">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {lang === 'bn' ? 'হোম' : lang === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/legal`} className="hover:text-white transition-colors">
              {lang === 'bn' ? 'আইনি ও নীতিমালা কেন্দ্র' : lang === 'ar' ? 'المركز القانوني' : 'Legal Center'}
            </Link>
            <span>/</span>
            <span className="text-[#d4af37] font-medium truncate max-w-xs">{currentTitle}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#d4af37] mb-3">
                <span>Version {doc.version}</span>
                <span>•</span>
                <span>{doc.status}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
                {currentTitle}
              </h1>
              {currentSubtitle && (
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                  {currentSubtitle}
                </p>
              )}
            </div>

            {/* Verification / Metadata block */}
            <div className="shrink-0 p-4 rounded-xl bg-[#0f1d30] border border-white/10 text-xs text-slate-400 space-y-1.5 min-w-[220px]">
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Effective Date</span>
                <span className="text-white font-medium">{doc.effectiveDate}</span>
              </div>
              <div className="pt-1.5 border-t border-white/5">
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Last Updated</span>
                <span className="text-[#d4af37] font-medium">{doc.lastUpdated}</span>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-[11px] transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>{lang === 'bn' ? 'প্রিন্ট / পিডিএফ' : lang === 'ar' ? 'طباعة' : 'Print / PDF'}</span>
                </button>
                {isCookiePolicy && (
                  <div className="inline-block">
                    <CookieSettingsButton label={lang === 'bn' ? 'কুকি সেটিংস' : lang === 'ar' ? 'تعديل الخيارات' : 'Preferences'} />
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Body with Sticky Table of Contents */}
      <section className="py-12 md:py-16 bg-[#fafafa] dark:bg-[#070e17] min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Executive Summary Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#0b1523] border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
            <div className="flex items-start gap-3">
              <span className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] text-lg shrink-0">ℹ</span>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                  {lang === 'bn' ? 'নীতিমালার সংক্ষিপ্ত সারসংক্ষেপ' : lang === 'ar' ? 'الملخص التنفيذي' : 'Executive Overview'}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentSummary}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Sidebar / Sticky Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-4">
                
                {/* Search within document */}
                <div className="relative">
                  <input
                    type="search"
                    placeholder={lang === 'bn' ? 'নীতিমালায় অনুসন্ধান করুন...' : lang === 'ar' ? 'بحث في البنود...' : 'Search within policy...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 pl-9 rounded-xl bg-white dark:bg-[#0b1523] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0b1523] border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    {lang === 'bn' ? 'সূচিপত্র' : lang === 'ar' ? 'فهرس المحتويات' : 'Table of Contents'}
                  </h3>
                  <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                    {filteredSections.map(s => {
                      const title = (s.title as any)[lang] || s.title.en;
                      const isSelected = activeSection === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => scrollToSection(s.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                            isSelected 
                              ? 'bg-[#d4af37]/10 text-[#d4af37] font-bold border-l-2 border-[#d4af37]' 
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
                          }`}
                        >
                          <span className="truncate pr-2">{title}</span>
                          <span className="text-[10px] text-slate-400">→</span>
                        </button>
                      );
                    })}
                  </nav>

                  {/* Cookie Preference Quick Trigger */}
                  {isCookiePolicy && (
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="p-3 rounded-xl bg-[#0a192f] text-white space-y-2">
                        <span className="text-[11px] font-bold text-[#d4af37] block">
                          {lang === 'bn' ? 'কুকি সম্মতি পরিবর্তন' : lang === 'ar' ? 'تعديل خيارات ملفات الارتباط' : 'Manage Privacy Choices'}
                        </span>
                        <p className="text-[10px] text-slate-300">
                          {lang === 'bn' ? 'আপনার সক্রিয় ক্যাটাগরি যেকোনো সময় আপডেট বা প্রত্যাহার করুন।' : 'Update or withdraw your category selections at any time.'}
                        </p>
                        <CookieSettingsButton label={lang === 'bn' ? 'প্রেফারেন্স সেন্টার খুলুন' : 'Open Preference Center'} />
                      </div>
                    </div>
                  )}

                  {/* Privacy Desk Contact Action */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                    <span>{lang === 'bn' ? 'আইনি কোনো প্রশ্ন আছে?' : 'Have legal inquiries?'}</span>
                    <a href="mailto:privacy@9startechnologies.com" className="block text-[#d4af37] font-semibold hover:underline mt-0.5">
                      privacy@9startechnologies.com
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Sections */}
            <main className="lg:col-span-8 space-y-8">
              {filteredSections.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0b1523] border border-slate-200 dark:border-slate-800 text-slate-400">
                  {lang === 'bn' ? 'আপনার অনুসন্ধানের কোনো ফলাফল পাওয়া যায়নি।' : 'No policy sections matched your search.'}
                </div>
              ) : (
                filteredSections.map((sec, idx) => {
                  const title = (sec.title as any)[lang] || sec.title.en;
                  const content = (sec.content as any)[lang] || sec.content.en;

                  return (
                    <section
                      key={sec.id}
                      id={sec.id}
                      className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0b1523] border border-slate-200 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <span>{title}</span>
                        <span className="text-xs font-mono text-slate-400 font-normal">§{idx + 1}</span>
                      </h2>

                      {/* Content rendering with markdown linebreaks and tables */}
                      <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-4 font-sans">
                        {content}
                      </div>
                    </section>
                  );
                })
              )}

              {/* Related Policies Footer Navigation */}
              <div className="p-6 rounded-2xl bg-[#0a192f] text-white border border-[#1e293b] mt-12">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                  {lang === 'bn' ? 'সম্পর্কিত অন্যান্য আইনি নীতিমালা' : lang === 'ar' ? 'وثائق قانونية ذات صلة' : 'Related Policies & Notices'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {doc.slug !== 'privacy-policy' && (
                    <Link href={`/${lang}/legal/privacy-policy`} className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white flex items-center justify-between transition-colors">
                      <span>{lang === 'bn' ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}</span>
                      <span className="text-[#d4af37]">→</span>
                    </Link>
                  )}
                  {doc.slug !== 'terms-and-conditions' && (
                    <Link href={`/${lang}/legal/terms-and-conditions`} className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white flex items-center justify-between transition-colors">
                      <span>{lang === 'bn' ? 'ব্যবহারের শর্তাবলী (Terms & Conditions)' : 'Terms & Conditions'}</span>
                      <span className="text-[#d4af37]">→</span>
                    </Link>
                  )}
                  {doc.slug !== 'cookie-policy' && (
                    <Link href={`/${lang}/legal/cookie-policy`} className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white flex items-center justify-between transition-colors">
                      <span>{lang === 'bn' ? 'কুকি পলিসি (Cookie Policy)' : 'Cookie Policy'}</span>
                      <span className="text-[#d4af37]">→</span>
                    </Link>
                  )}
                  {doc.slug !== 'accessibility' && (
                    <Link href={`/${lang}/legal/accessibility`} className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white flex items-center justify-between transition-colors">
                      <span>{lang === 'bn' ? 'অ্যাক্সেসিবিলিটি বিবৃতি' : 'Accessibility Statement'}</span>
                      <span className="text-[#d4af37]">→</span>
                    </Link>
                  )}
                </div>
              </div>

            </main>

          </div>
        </div>
      </section>
    </article>
  );
}
