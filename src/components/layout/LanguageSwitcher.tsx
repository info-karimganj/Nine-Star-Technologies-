'use client';

import React, { useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  
  // Extract current language, fallback to 'en'
  const currentLang = typeof params?.lang === 'string' ? params.lang : 'en';

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'ar', label: 'العربية' }
  ];

  const handleLanguageChange = (newLang: string) => {
    if (newLang === currentLang) return;
    
    // Replace the current language in the pathname
    const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPathname || `/${newLang}`);
    setIsOpen(false);
    
    trackEvent('language_changed', { language: newLang });
  };

  const activeLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-transparent border border-[var(--color-border)] px-2.5 py-1.5 rounded-md cursor-pointer text-xs font-semibold hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Change language"
      >
        <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
        <span>{activeLanguage.code.toUpperCase()}</span>
        <svg className={`w-3 h-3 opacity-50 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-1.5 w-32 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-md py-1.5 z-50 fade-in"
          role="listbox"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`block w-full text-left px-3.5 py-1.5 text-xs font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors cursor-pointer border-none bg-transparent ${currentLang === lang.code ? 'font-bold text-[var(--color-secondary-dark)]' : 'text-[var(--color-text)]'}`}
              role="option"
              aria-selected={currentLang === lang.code}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
