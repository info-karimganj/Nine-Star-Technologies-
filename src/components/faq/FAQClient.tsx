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
    <main className="w-full">
      {/* Hero */}
      <section className="bg-[var(--color-surface)] pt-24 pb-16 md:pt-32 md:pb-24 border-b border-[var(--color-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Typography variant="h1" className="mb-6">{dict.faq.hero.title}</Typography>
          <Typography variant="body" className="text-[var(--color-text)] opacity-70 text-xl max-w-2xl">
            {dict.faq.hero.subtitle}
          </Typography>
        </div>
      </section>

      <section className="py-20 bg-[var(--color-base)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Categories */}
          <div className="w-full md:w-64 shrink-0">
            <Typography variant="h3" className="mb-4 text-sm uppercase tracking-wider text-[var(--color-text)] opacity-50">{dict.faq.sidebar.categories}</Typography>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveCategory('All')}
                className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === 'All' ? 'bg-[var(--color-primary)] text-[var(--color-base)]' : 'hover:bg-[var(--color-surface)] text-[var(--color-text)] opacity-70'}`}
              >
                {dict.faq.sidebar.allQuestions}
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-[var(--color-primary)] text-[var(--color-base)]' : 'hover:bg-[var(--color-surface)] text-[var(--color-text)] opacity-70'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="flex-grow">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16 bg-[var(--color-surface)] rounded-xl border border-dashed border-[var(--color-border)]">
                <Typography variant="body" className="text-[var(--color-text)] opacity-50">
                  {dict.faq.emptyState}
                </Typography>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredFaqs.map((faq, idx) => (
                  <Card key={idx} className="p-6 border border-[var(--color-border)] shadow-sm">
                    <span className="text-xs font-medium text-[var(--color-text)]/70 mb-2 block uppercase tracking-wide">{faq.category}</span>
                    <Typography variant="h3" className="mb-3 text-lg">{faq.question}</Typography>
                    <Typography variant="body" className="text-[var(--color-text)] opacity-80">
                      {faq.answer}
                    </Typography>
                  </Card>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
