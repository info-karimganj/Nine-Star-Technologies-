import React from 'react';
import { LocalizedLink as Link } from '@/components/ui';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CookieSettingsButton } from './CookieSettingsButton';
import { getSiteSettings } from '@/data/cms';

export async function Footer({ dict }: { dict: any }) {
  const currentYear = 2026;
  const settings = await getSiteSettings();

  return (
    <footer className="site-footer bg-[var(--abyss)] text-[var(--paper)] pt-20 pb-12 border-t border-[var(--abyss-border)]">
      <div className="site-container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Editorial Vision Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="logo-symbol !w-8 !h-8 text-sm">
                ⭐
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">NINESTAR</span>
            </div>
            <p className="font-serif italic text-sm text-[var(--nt-ink-300)] leading-relaxed">
              {dict.footer.tagline || 'Engineering high-converting digital platforms, generative AI discovery, and performance scale.'}
            </p>
            <div className="pt-2">
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--nt-accent)]">Global Headquarters</p>
              <p className="text-xs text-[var(--nt-ink-400)] mt-1">
                {settings?.officeAddress?.en || settings?.officeAddress?.bn || 'Dhaka · Singapore · London'}
              </p>
              {settings?.contactEmail && (
                <a href={`mailto:${settings.contactEmail}`} className="inline-block mt-3 text-sm text-white hover:text-[var(--nt-cyan)] transition-colors">
                  {settings.contactEmail}
                </a>
              )}
              {(settings?.contactPhone || settings?.whatsappNumber) && (
                <p className="text-xs text-white/90 font-mono mt-1">
                  <a href={`tel:${(settings.contactPhone || settings.whatsappNumber).replace(/[^\d+]/g, '')}`} className="hover:text-[var(--nt-cyan)] transition-colors">
                    📞 {settings.contactPhone || settings.whatsappNumber}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Offerings Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--nt-cyan)] mb-4">{dict.navigation.offerings}</h4>
            <ul className="list-none p-0 m-0 space-y-2.5">
              <li><Link href="/services" className="footer-link text-sm hover:text-white transition-colors">{dict.navigation.services}</Link></li>
              <li><Link href="/solutions" className="footer-link text-sm hover:text-white transition-colors">{dict.navigation.solutions}</Link></li>
              <li><Link href="/products" className="footer-link text-sm hover:text-white transition-colors">{dict.navigation.products}</Link></li>
              <li><Link href="/case-studies" className="footer-link text-sm hover:text-white transition-colors">{dict.navigation.caseStudies}</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--nt-cyan)] mb-4">{dict.navigation.company}</h4>
            <ul className="list-none p-0 m-0 space-y-2.5">
              <li><Link href="/about" className="footer-link text-sm hover:text-white transition-colors">{dict.navigation.about}</Link></li>
              <li><Link href="/process" className="footer-link text-sm hover:text-white transition-colors">{dict.navigation.process}</Link></li>
              <li><Link href="/contact" className="footer-link text-sm hover:text-white transition-colors">{dict.navigation.contact}</Link></li>
              <li><Link href="/faq" className="footer-link text-sm hover:text-white transition-colors">{dict.navigation.resources}</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--nt-cyan)] mb-4">{dict.navigation.legalAndSocial}</h4>
            <ul className="list-none p-0 m-0 space-y-2.5 mb-6">
              <li><Link href="/legal" className="footer-link text-sm text-[var(--nt-gold)] font-medium hover:underline">{dict.navigation.legalCenter || 'Legal Center'}</Link></li>
              <li><Link href="/legal/privacy-policy" className="footer-link text-sm hover:text-white transition-colors">{dict.navigation.privacyPolicy}</Link></li>
              <li><Link href="/legal/terms-and-conditions" className="footer-link text-sm hover:text-white transition-colors">{dict.navigation.termsOfService}</Link></li>
              <li><Link href="/legal/cookie-policy" className="footer-link text-sm hover:text-white transition-colors">{dict.navigation.cookiePolicy}</Link></li>
              <li><CookieSettingsButton label={dict.navigation.cookieSettings || 'Cookie Settings'} /></li>
            </ul>
            <div className="flex gap-3">
              <a href={settings?.socialLinks?.linkedin || '#'} aria-label="LinkedIn" className="social-icon-btn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href={settings?.socialLinks?.twitter || '#'} aria-label="Twitter" className="social-icon-btn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              {settings?.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} aria-label="Facebook" className="social-icon-btn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--abyss-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--nt-ink-400)]">
          <p>&copy; {currentYear} Ninestar Technologies. {dict.footer.allRightsReserved}</p>
          <div className="flex items-center gap-3">
            <span>{dict.common.language}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
