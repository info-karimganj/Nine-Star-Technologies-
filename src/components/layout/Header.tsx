'use client';

import React, { useState } from 'react';
import { Button, LocalizedLink as Link } from '@/components/ui';
import { SearchModal } from '@/components/search/SearchModal';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header({ dict }: { dict: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="site-header relative bg-white/90 backdrop-blur-md border-b border-[var(--nt-ink-200)] sticky top-0 z-50 transition-all">
        <div className="site-container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Editorial Brand Logo */}
            <Link href="/" className="brand-logo flex items-center gap-2.5 shrink-0 focus-visible:outline-none" aria-label="Ninestar Technologies Home">
              <div className="logo-symbol !bg-blue-50/90 !border !border-blue-200 !text-blue-600 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-title font-display text-2xl font-extrabold tracking-tight !text-slate-950 leading-none">NINESTAR</span>
                <span className="logo-sub font-mono text-[0.65rem] tracking-[0.18em] !text-blue-600 uppercase font-bold">TECHNOLOGIES</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Main Desktop Navigation">
              {/* Offerings Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('offerings')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="nav-link flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-sm font-semibold !text-slate-800 hover:!text-blue-600 transition-colors py-2"
                  aria-expanded={activeDropdown === 'offerings'}
                  aria-haspopup="menu"
                >
                  {dict.navigation.offerings}
                  <svg className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${activeDropdown === 'offerings' ? 'rotate-180 !text-blue-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {activeDropdown === 'offerings' && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-[var(--nt-ink-200)] rounded-xl shadow-xl p-2 z-50">
                    <Link href="/services" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors">
                      {dict.navigation.services}
                    </Link>
                    <Link href="/solutions" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors">
                      {dict.navigation.solutions}
                    </Link>
                    <Link href="/products" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors">
                      {dict.navigation.products}
                    </Link>
                  </div>
                )}
              </div>

              {/* Company Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('company')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="nav-link flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-sm font-semibold !text-slate-800 hover:!text-blue-600 transition-colors py-2"
                  aria-expanded={activeDropdown === 'company'}
                  aria-haspopup="menu"
                >
                  {dict.navigation.company}
                  <svg className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${activeDropdown === 'company' ? 'rotate-180 !text-blue-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {activeDropdown === 'company' && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-[var(--nt-ink-200)] rounded-xl shadow-xl p-2 z-50">
                    <Link href="/about" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors">
                      {dict.navigation.about}
                    </Link>
                    <Link href="/process" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors">
                      {dict.navigation.process}
                    </Link>
                    <Link href="/case-studies" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors">
                      {dict.navigation.caseStudies}
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/contact" className="text-sm font-semibold !text-slate-800 hover:!text-blue-600 transition-colors">
                {dict.navigation.contact}
              </Link>
            </nav>

            {/* Right Action Button & Controls */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />

              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--nt-ink-200)] bg-white cursor-pointer text-[var(--ink)] hover:text-[var(--nt-accent)] hover:border-[var(--nt-accent)] transition-colors"
                aria-label="Open Search"
              >
                <svg className="w-4 h-4 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <Link
                href="/request"
                className="hidden sm:inline-flex btn btn-primary text-xs sm:text-sm font-semibold !py-2.5 !px-5"
              >
                <span className="w-5 h-5 rounded-full bg-[var(--nt-accent)] flex items-center justify-center text-[0.65rem] text-white">
                  ⭐
                </span>
                {dict.navigation.startRequest}
              </Link>

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden p-2 rounded-lg border border-[var(--nt-ink-200)] bg-white text-[var(--ink)] cursor-pointer"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer active" onClick={(e) => {
          if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
        }}>
          <div className="mobile-drawer-content">
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="brand-logo flex items-center gap-2">
                  <div className="logo-symbol !w-8 !h-8 text-sm !bg-blue-50 !border !border-blue-200 !text-blue-600 flex items-center justify-center">⭐</div>
                  <div className="logo-text">
                    <span className="logo-title font-display text-xl font-extrabold !text-slate-950">NINESTAR</span>
                    <span className="logo-sub font-mono text-[0.62rem] tracking-[0.16em] !text-blue-600 uppercase font-bold">TECHNOLOGIES</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[var(--ink)] cursor-pointer"
                  aria-label="Close Menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                <Link href="/services" className="text-base font-semibold text-[var(--ink)] py-1.5 hover:text-[var(--nt-accent)] transition-colors" onClick={toggleMobileMenu}>{dict.navigation.services}</Link>
                <Link href="/solutions" className="text-base font-semibold text-[var(--ink)] py-1.5 hover:text-[var(--nt-accent)] transition-colors" onClick={toggleMobileMenu}>{dict.navigation.solutions}</Link>
                <Link href="/products" className="text-base font-semibold text-[var(--ink)] py-1.5 hover:text-[var(--nt-accent)] transition-colors" onClick={toggleMobileMenu}>{dict.navigation.products}</Link>
                <Link href="/case-studies" className="text-base font-semibold text-[var(--ink)] py-1.5 hover:text-[var(--nt-accent)] transition-colors" onClick={toggleMobileMenu}>{dict.navigation.caseStudies}</Link>
                <Link href="/about" className="text-base font-semibold text-[var(--ink)] py-1.5 hover:text-[var(--nt-accent)] transition-colors" onClick={toggleMobileMenu}>{dict.navigation.about}</Link>
                <Link href="/process" className="text-base font-semibold text-[var(--ink)] py-1.5 hover:text-[var(--nt-accent)] transition-colors" onClick={toggleMobileMenu}>{dict.navigation.process}</Link>
                <Link href="/contact" className="text-base font-semibold text-[var(--ink)] py-1.5 hover:text-[var(--nt-accent)] transition-colors" onClick={toggleMobileMenu}>{dict.navigation.contact}</Link>
              </nav>
            </div>

            <div className="mt-8 border-t border-[var(--nt-ink-200)] pt-6 flex flex-col gap-4">
              <Link href="/request" className="btn btn-primary w-full text-center justify-center py-3" onClick={toggleMobileMenu}>
                {dict.navigation.startRequest} →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
