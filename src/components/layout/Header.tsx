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
    <header className="site-header relative">
      <div className="container flex items-center justify-between" style={{ height: '4.5rem' }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none" aria-label="9STAR Technologies Home">
          <div className="w-8 h-8 rounded-md shrink-0 flex items-center justify-center font-bold text-sm tracking-tight text-white shadow-sm" style={{ backgroundColor: 'var(--color-primary)' }}>
            <span style={{ color: 'var(--color-secondary)' }}>9</span>★
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ margin: 0, color: 'var(--color-primary)' }}>9STAR</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2" aria-label="Main Desktop Navigation">

          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('offerings')}
            onMouseLeave={() => setActiveDropdown(null)}
            onFocus={() => setActiveDropdown('offerings')}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setActiveDropdown(null);
              }
            }}
          >
            <button
              className="nav-link flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-body"
              aria-expanded={activeDropdown === 'offerings'}
              aria-haspopup="menu"
              onClick={() => setActiveDropdown(activeDropdown === 'offerings' ? null : 'offerings')}
            >
              {dict.navigation.offerings}
              <svg className={`w-3.5 h-3.5 opacity-60 transition-transform duration-150 ${activeDropdown === 'offerings' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {activeDropdown === 'offerings' && (
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-md py-1.5 fade-in z-50" role="menu">
                <Link href="/services" className="block px-4 py-2 hover:bg-[var(--color-primary)] hover:text-white text-sm font-medium transition-colors" style={{ textDecoration: 'none' }} role="menuitem">{dict.navigation.services}</Link>
                <Link href="/solutions" className="block px-4 py-2 hover:bg-[var(--color-primary)] hover:text-white text-sm font-medium transition-colors" style={{ textDecoration: 'none' }} role="menuitem">{dict.navigation.solutions}</Link>
                <Link href="/products" className="block px-4 py-2 hover:bg-[var(--color-primary)] hover:text-white text-sm font-medium transition-colors" style={{ textDecoration: 'none' }} role="menuitem">{dict.navigation.products}</Link>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('company')}
            onMouseLeave={() => setActiveDropdown(null)}
            onFocus={() => setActiveDropdown('company')}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setActiveDropdown(null);
              }
            }}
          >
            <button
              className="nav-link flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-body"
              aria-expanded={activeDropdown === 'company'}
              aria-haspopup="menu"
              onClick={() => setActiveDropdown(activeDropdown === 'company' ? null : 'company')}
            >
              {dict.navigation.company}
              <svg className={`w-3.5 h-3.5 opacity-60 transition-transform duration-150 ${activeDropdown === 'company' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {activeDropdown === 'company' && (
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-md py-1.5 fade-in z-50" role="menu">
                <Link href="/about" className="block px-4 py-2 hover:bg-[var(--color-primary)] hover:text-white text-sm font-medium transition-colors" style={{ textDecoration: 'none' }} role="menuitem">{dict.navigation.about}</Link>
                <Link href="/process" className="block px-4 py-2 hover:bg-[var(--color-primary)] hover:text-white text-sm font-medium transition-colors" style={{ textDecoration: 'none' }} role="menuitem">{dict.navigation.process}</Link>
                <Link href="/case-studies" className="block px-4 py-2 hover:bg-[var(--color-primary)] hover:text-white text-sm font-medium transition-colors" style={{ textDecoration: 'none' }} role="menuitem">{dict.navigation.caseStudies}</Link>
              </div>
            )}
          </div>

          <Link href="/contact" className="nav-link text-body">{dict.navigation.contact}</Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-md border border-[var(--color-border)] bg-transparent cursor-pointer text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors focus-visible:outline-none"
            aria-label="Open Search"
          >
            <svg className="w-4 h-4 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <Link href="/request" className="btn btn-primary" style={{ textDecoration: 'none' }}>{dict.navigation.startRequest}</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 bg-transparent border-none cursor-pointer text-body"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle Mobile Menu"
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

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-lg fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="container py-4 flex flex-col gap-1" aria-label="Mobile Navigation">
            <Link href="/services" className="nav-link block px-4 py-3" onClick={toggleMobileMenu}>{dict.navigation.services}</Link>
            <Link href="/solutions" className="nav-link block px-4 py-3" onClick={toggleMobileMenu}>{dict.navigation.solutions}</Link>
            <Link href="/products" className="nav-link block px-4 py-3" onClick={toggleMobileMenu}>{dict.navigation.products}</Link>
            <Link href="/case-studies" className="nav-link block px-4 py-3" onClick={toggleMobileMenu}>{dict.navigation.caseStudies}</Link>
            <Link href="/about" className="nav-link block px-4 py-3" onClick={toggleMobileMenu}>{dict.navigation.about}</Link>
            <Link href="/process" className="nav-link block px-4 py-3" onClick={toggleMobileMenu}>{dict.navigation.process}</Link>
            <Link href="/contact" className="nav-link block px-4 py-3" onClick={toggleMobileMenu}>{dict.navigation.contact}</Link>

            <div className="my-4 border-t border-[var(--color-border)] pt-4 flex flex-col gap-4">
              <div className="flex justify-between items-center px-4">
                <span className="text-sm font-medium">{dict.common.language}</span>
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 nav-link bg-transparent border-none text-left cursor-pointer text-body w-full px-4 py-3"
                aria-label="Open Search"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                {dict.navigation.search}
              </button>
              <Link href="/request" className="btn btn-primary w-[calc(100%-2rem)] mx-4 mb-4 py-3 justify-center text-center" style={{ textDecoration: 'none' }}>{dict.navigation.startRequest}</Link>
            </div>
          </nav>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
