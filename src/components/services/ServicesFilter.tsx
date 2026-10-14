import React from 'react';
import Link from 'next/link';
import { Category as ServiceCategory, LanguageCode } from '@/types/cms';

interface ServicesFilterProps {
  categories: ServiceCategory[];
  activeCategory: string;
  searchQuery: string;
  lang: LanguageCode;
  allCategoriesText?: string;
  searchPlaceholder?: string;
}

export function ServicesFilter({ categories, activeCategory, searchQuery, lang, allCategoriesText = "All Services", searchPlaceholder = "What are you trying to solve? (e.g., I need a website, automate my business)" }: ServicesFilterProps) {
  const getButtonClass = (isActive: boolean) => {
    return `btn ${isActive ? 'btn-primary' : 'btn-outline'} whitespace-nowrap rounded-full px-6 flex items-center justify-center`;
  };

  return (
    <div className="flex flex-col gap-6 mb-12">
      {/* Search Form */}
      <div className="w-full max-w-2xl mx-auto">
        <form action={`/${lang}/services`} method="GET" className="flex w-full">
          {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
          <div className="relative w-full">
            <input
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder={searchPlaceholder}
              className="w-full h-14 px-6 pr-14 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-base)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] transition-all text-lg shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors rounded-full"
              aria-label="Search"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Categories */}
      <div className="flex-none overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-3 min-w-max justify-start sm:justify-center">
          <Link
            href={searchQuery ? `/${lang}/services?q=${encodeURIComponent(searchQuery)}` : `/${lang}/services`}
            className={getButtonClass(!activeCategory)}
          >
            {allCategoriesText}
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${lang}/services?category=${cat.id}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
              className={getButtonClass(activeCategory === cat.id)}
            >
              {cat.title[lang] || cat.title.en}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
