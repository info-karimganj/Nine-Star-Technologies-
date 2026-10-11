'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Typography } from '@/components/ui/Typography';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  description: string;
  url: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      // Auto focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setHasSearched(true);
        
        // Track the search event
        if (data.results && data.results.length > 0) {
          trackEvent('service_search', { query, resultsCount: data.results.length });
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Search failed', error);
        }
        setResults([]);
        setHasSearched(true);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-dark/60 backdrop-blur-sm fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Site Search"
    >
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-[var(--color-base)] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-5rem)] sm:max-h-[80vh]">
        {/* Search Header / Input */}
        <div className="flex items-center px-4 py-4 border-b border-[var(--color-border)]">
          <svg className="w-6 h-6 text-[var(--color-text-muted)] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            ref={inputRef}
            type="search"
            className="flex-grow bg-transparent border-none text-lg outline-none text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]"
            placeholder="Search services, products, solutions..."
            aria-label="Search services, products, solutions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
          <div className="mx-2 w-px h-6 bg-border"></div>
          <button 
            onClick={onClose}
            className="px-3 py-1 text-sm font-medium text-[var(--color-text)] opacity-60 hover:text-[var(--color-text)] transition-colors rounded-md hover:bg-[var(--color-surface)]"
            aria-label="Close search modal"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto flex-grow bg-[var(--color-surface)] opacity-30" aria-live="polite">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 text-[var(--color-text)] opacity-50">
              <svg className="w-8 h-8 animate-spin text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <Typography variant="body">Searching...</Typography>
            </div>
          )}

          {!isLoading && hasSearched && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <svg className="w-12 h-12 text-[var(--color-text-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <Typography variant="h3" className="mb-2">No results found</Typography>
              <Typography variant="body" className="text-[var(--color-text)] opacity-60">
                We couldn&apos;t find anything matching &quot;{query}&quot;. Try adjusting your search terms.
              </Typography>
            </div>
          )}

          {!isLoading && !hasSearched && !query && (
             <div className="py-8 px-6">
               <Typography variant="body" className="text-sm font-medium text-[var(--color-text)] opacity-50 uppercase tracking-wider mb-4">
                 Suggestions
               </Typography>
               <div className="flex flex-wrap gap-2">
                 {['Web Development', 'Custom Software', 'Cloud Migration', 'E-commerce', 'Automation'].map(suggestion => (
                   <button
                     key={suggestion}
                     onClick={() => setQuery(suggestion)}
                     className="px-4 py-2 sm:px-3 sm:py-1.5 bg-[var(--color-base)] border border-[var(--color-border)] rounded-full text-sm hover:border-primary hover:text-primary transition-colors"
                   >
                     {suggestion}
                   </button>
                 ))}
               </div>
             </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="p-4">
              <Typography variant="body" className="text-sm font-medium text-[var(--color-text)] opacity-50 uppercase tracking-wider mb-4 px-2">
                 Results ({results.length})
              </Typography>
              <div className="flex flex-col gap-1">
                {results.map((result) => (
                  <Link 
                    key={result.id} 
                    href={result.url}
                    onClick={onClose}
                    className="flex flex-col p-3 hover:bg-[var(--color-surface)] rounded-lg group transition-colors border border-transparent hover:border-[var(--color-border)]"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Typography variant="h3" as="h4" className="text-base font-semibold text-[var(--color-text)] group-hover:text-primary transition-colors m-0">
                        {result.title}
                      </Typography>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] opacity-60 font-medium">
                        {result.type}
                      </span>
                    </div>
                    <Typography variant="body" className="text-sm text-[var(--color-text)] opacity-60 line-clamp-1">
                      {result.description}
                    </Typography>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
