import React from 'react';
import { LocalizedLink as Link } from '@/components/ui';
import { Typography } from '@/components/ui';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CookieSettingsButton } from './CookieSettingsButton';

export function Footer({ dict }: { dict: any }) {
  const currentYear = 2026;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Contact Column */}
          <div>
            <div className="mb-4">
              <span className="text-h3" style={{ color: 'var(--color-base)' }}>9STAR</span>
            </div>
            <Typography variant="body" className="mb-4" style={{ color: 'var(--color-text-muted)' }}>
              {dict.footer.tagline}
            </Typography>
            <address className="not-italic" style={{ color: 'var(--color-text-muted)' }}>
              <Typography variant="small" className="mb-1">123 Innovation Drive</Typography>
              <Typography variant="small" className="mb-1">Tech District, San Francisco</Typography>
              <Typography variant="small" className="mb-1">CA 94105, USA</Typography>
              <div className="mt-4">
                <Typography variant="small" className="mb-1">
                  <a href="mailto:hello@9star.example.com" className="footer-link">hello@9star.example.com</a>
                </Typography>
                <Typography variant="small">
                  <a href="tel:+15551234567" className="footer-link">+1 (555) 123-4567</a>
                </Typography>
              </div>
            </address>
          </div>

          {/* Offerings Column */}
          <div>
            <Typography variant="label" className="mb-4 block" style={{ color: 'var(--color-base)' }}>{dict.navigation.offerings}</Typography>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li><Link href="/services" className="footer-link text-small">{dict.navigation.services}</Link></li>
              <li><Link href="/solutions" className="footer-link text-small">{dict.navigation.solutions}</Link></li>
              <li><Link href="/products" className="footer-link text-small">{dict.navigation.products}</Link></li>
              <li><Link href="/case-studies" className="footer-link text-small">{dict.navigation.caseStudies}</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <Typography variant="label" className="mb-4 block" style={{ color: 'var(--color-base)' }}>{dict.navigation.company}</Typography>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li><Link href="/about" className="footer-link text-small">{dict.navigation.about}</Link></li>
              <li><Link href="/process" className="footer-link text-small">{dict.navigation.process}</Link></li>
              <li><Link href="/contact" className="footer-link text-small">{dict.navigation.contact}</Link></li>
              <li><Link href="/faq" className="footer-link text-small">{dict.navigation.resources}</Link></li>
              <li><Link href="/contact" className="footer-link text-small">{dict.navigation.support}</Link></li>
            </ul>
          </div>

          {/* Legal & Social Column */}
          <div>
            <Typography variant="label" className="mb-4 block" style={{ color: 'var(--color-base)' }}>{dict.navigation.legalAndSocial}</Typography>
            <ul className="list-none p-0 m-0 flex flex-col gap-2 mb-6">
              <li><Link href="/legal" className="footer-link text-small font-semibold text-[#d4af37]">{dict.navigation.legalCenter || 'Legal Center'}</Link></li>
              <li><Link href="/legal/privacy-policy" className="footer-link text-small">{dict.navigation.privacyPolicy}</Link></li>
              <li><Link href="/legal/terms-and-conditions" className="footer-link text-small">{dict.navigation.termsOfService}</Link></li>
              <li><Link href="/legal/cookie-policy" className="footer-link text-small">{dict.navigation.cookiePolicy}</Link></li>
              <li><Link href="/legal/refund-policy" className="footer-link text-small">{dict.navigation.refundPolicy || 'Refund Policy'}</Link></li>
              <li><Link href="/legal/accessibility" className="footer-link text-small">{dict.navigation.accessibility || 'Accessibility'}</Link></li>
              <li><CookieSettingsButton label={dict.navigation.cookieSettings || 'Cookie Settings'} /></li>
            </ul>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              <a href="#" aria-label="LinkedIn" className="footer-link">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="footer-link">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <Typography variant="small" style={{ color: 'var(--color-text-muted)' }}>
            &copy; {currentYear} 9STAR Technologies. {dict.footer.allRightsReserved}
          </Typography>
          <div className="flex items-center gap-2">
            <span className="text-small text-gray-400">{dict.common.language}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
