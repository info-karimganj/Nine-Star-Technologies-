'use client';

import { useState } from 'react';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';

interface FAQClientProps {
  dict: any;
  categories: string[];
  faqs: { category: string; question: string; answer: string }[];
}

export function FAQClient({ dict, categories, faqs }: FAQClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

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
            <span>Knowledge Base & Support</span>
          </div>
          <h1 className="heading-xl text-[var(--ink)] mb-4 tracking-tight">
            {dict.faq.hero.title}
          </h1>
          <p className="body-lead text-[var(--ink-soft)] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {dict.faq.hero.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Main FAQ Explorer */}
      <section className="py-20 md:py-24">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex flex-col md:flex-row gap-10 lg:gap-14">
          
          {/* Sidebar Categories */}
          <div className="w-full md:w-64 shrink-0">
            <div className="sticky top-28 p-6 rounded-3xl bg-white border border-[var(--nt-ink-200)] shadow-xs">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--nt-accent)] font-semibold mb-4 block">
                {dict.faq.sidebar.categories}
              </span>
              <div className="flex flex-col gap-1.5">
                <button 
                  type="button"
                  onClick={() => setActiveCategory('All')}
                  className={`text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeCategory === 'All' 
                      ? 'bg-[var(--nt-accent)] text-white shadow-xs' 
                      : 'text-[var(--ink-soft)] hover:bg-slate-50 hover:text-[var(--ink)]'
                  }`}
                >
                  {dict.faq.sidebar.allQuestions}
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeCategory === cat 
                        ? 'bg-[var(--nt-accent)] text-white shadow-xs' 
                        : 'text-[var(--ink-soft)] hover:bg-slate-50 hover:text-[var(--ink)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ List */}
          <div className="flex-grow">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[var(--nt-ink-200)] p-8">
                <p className="text-[var(--ink-soft)]">
                  {dict.faq.emptyState}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, idx) => (
                  <div key={idx} className="p-7 sm:p-8 rounded-2xl bg-white border border-[var(--nt-ink-200)] shadow-xs hover:border-[var(--nt-accent)] hover:shadow-md transition-all">
                    <span className="text-xs font-mono font-semibold text-[var(--nt-accent)] uppercase tracking-wider mb-2 block">
                      {faq.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3 leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-[var(--ink-soft)] text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
