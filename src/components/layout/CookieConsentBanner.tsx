'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getStoredConsent, 
  saveConsent, 
  ConsentPreferences, 
  DEFAULT_CONSENT,
  CONSENT_POLICY_VERSION
} from '@/lib/consent';

interface CookieConsentBannerProps {
  lang: string;
}

const UI_TRANSLATIONS: Record<string, {
  bannerTitle: string;
  bannerDesc: string;
  acceptAll: string;
  rejectOptional: string;
  customize: string;
  privacyPolicy: string;
  cookiePolicy: string;
  modalTitle: string;
  modalDesc: string;
  savePrefs: string;
  necessaryTitle: string;
  necessaryBadge: string;
  necessaryDesc: string;
  prefTitle: string;
  prefDesc: string;
  analyticsTitle: string;
  analyticsDesc: string;
  marketingTitle: string;
  marketingDesc: string;
  close: string;
  withdrawNotice: string;
}> = {
  en: {
    bannerTitle: 'Privacy & Cookie Preferences',
    bannerDesc: 'We respect your privacy. We use strictly necessary cookies to ensure secure operation and core features. With your permission, we also use optional functional and performance technologies to improve your experience. Rejection does not limit essential services.',
    acceptAll: 'Accept All',
    rejectOptional: 'Reject Optional',
    customize: 'Customize Choices',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
    modalTitle: 'Privacy Preference Center',
    modalDesc: 'Manage and audit your cookie consent categories. You can review our detailed technical inventory or change these settings at any time via the footer link.',
    savePrefs: 'Save Preferences',
    necessaryTitle: 'Strictly Necessary (Core Operation)',
    necessaryBadge: 'Always Active',
    necessaryDesc: 'Essential for cryptographic authentication, CSRF security, load balancing, and remembering your consent preferences. These cannot be disabled.',
    prefTitle: 'Functional & Preferences',
    prefDesc: 'Remembers your interface selections, localized region, and language preferences across browser sessions.',
    analyticsTitle: 'Performance & Aggregated Analytics',
    analyticsDesc: 'Collects anonymized navigation patterns and funnel completion metrics to help us optimize page speed and workflow usability without storing PII.',
    marketingTitle: 'Marketing & External Embeds',
    marketingDesc: 'Governs optional third-party integrations, social sharing badges, and promotional tracking. Currently not utilized on this platform.',
    close: 'Close',
    withdrawNotice: 'You can update or withdraw your consent anytime by clicking "Cookie Settings" in the footer.'
  },
  bn: {
    bannerTitle: 'গোপনীয়তা ও কুকি পছন্দসমূহ',
    bannerDesc: 'আমরা আপনার গোপনীয়তাকে সম্মান করি। ওয়েবসাইটের নিরাপদ পরিচালনা ও মূল ফিচারের জন্য আমরা প্রয়োজনীয় কুকি ব্যবহার করি। আপনার সম্মতি সাপেক্ষে আমরা পারফরম্যান্স ও ফাংশনাল প্রযুক্তি ব্যবহার করতে পারি। ঐচ্ছিক কুকি প্রত্যাখ্যান করলেও কোনো মূল সেবা ব্যাহত হবে না।',
    acceptAll: 'সবগুলো গ্রহণ করুন',
    rejectOptional: 'ঐচ্ছিক কুকি প্রত্যাখ্যান করুন',
    customize: 'পছন্দ কাস্টমাইজ করুন',
    privacyPolicy: 'গোপনীয়তা নীতি',
    cookiePolicy: 'কুকি পলিসি',
    modalTitle: 'প্রাইভেসি প্রেফারেন্স সেন্টার',
    modalDesc: 'আপনার পছন্দের কুকি ক্যাটাগরি নির্বাচন করুন। আপনি ফুটারের লিংক থেকে যেকোনো সময় এই পছন্দ পরিবর্তন বা প্রত্যাহার করতে পারেন।',
    savePrefs: 'পছন্দ সংরক্ষণ করুন',
    necessaryTitle: 'অপরিহার্য ও প্রয়োজনীয় (Strictly Necessary)',
    necessaryBadge: 'সর্বদা সক্রিয়',
    necessaryDesc: 'প্রমাণীকরণ, নিরাপত্তা, সেশন হ্যান্ডলিং এবং আপনার গোপনীয়তা পছন্দ রেকর্ড করতে অপরিহার্য। এটি বন্ধ করা যাবে না।',
    prefTitle: 'ফাংশনাল ও ব্যবহারকারী পছন্দ',
    prefDesc: 'পরবর্তী ভিজিটের জন্য আপনার নির্বাচিত ভাষা ও ডিসপ্লে পছন্দ মনে রাখে।',
    analyticsTitle: 'পারফরম্যান্স ও অ্যানালিটিক্স',
    analyticsDesc: 'ব্যক্তিগত তথ্য ছাড়া সম্পূর্ণ বেনামে সাইট ব্যবহারের মেট্রিক্স সংগ্রহ করে যাতে আমরা সাইটের গতি ও অভিজ্ঞতা উন্নত করতে পারি।',
    marketingTitle: 'মার্কেটিং ও তৃতীয় পক্ষীয় এম্বেড',
    marketingDesc: 'তৃতীয় পক্ষের মার্কেটিং ট্র্যাকার ও বিজ্ঞাপনের জন্য প্রযোজ্য। বর্তমানে প্ল্যাটফর্মে কোনো বহিরাগত বিজ্ঞাপন ট্র্যাকার ব্যবহৃত হয় না।',
    close: 'বন্ধ করুন',
    withdrawNotice: 'ফুটারের "কুকি সেটিংস" অপশন থেকে যেকোনো সময় আপনার সম্মতি প্রত্যাহার করা যাবে।'
  },
  ar: {
    bannerTitle: 'تفضيلات الخصوصية وملفات تعريف الارتباط',
    bannerDesc: 'نحن نحترم خصوصيتك. نستخدم ملفات تعريف الارتباط الضرورية لضمان تشغيل الموقع وأمانه. بموافقتك، نستخدم أيضاً تقنيات اختيارية لتحسين الأداء والتجربة دون جمع بيانات شخصية غير ضرورية.',
    acceptAll: 'قبول الكل',
    rejectOptional: 'رفض الاختياري',
    customize: 'تخصيص الخيارات',
    privacyPolicy: 'سياسة الخصوصية',
    cookiePolicy: 'سياسة ملفات تعريف الارتباط',
    modalTitle: 'مركز تفضيلات الخصوصية',
    modalDesc: 'تحكم في فئات ملفات تعريف الارتباط وتفضيلاتك في أي وقت من خلال رابط تذييل الصفحة.',
    savePrefs: 'حفظ التفضيلات',
    necessaryTitle: 'ضرورية للغاية (تشغيل أساسي)',
    necessaryBadge: 'نشط دائماً',
    necessaryDesc: 'ضرورية لأمان النظام والمصادقة وتخزين خيارات الخصوصية. لا يمكن تعطيلها.',
    prefTitle: 'الوظيفية والتفضيلات',
    prefDesc: 'تتذكر لغتك وتفضيلاتك المختارة لجلسات التصفح المستقبلية.',
    analyticsTitle: 'الأداء والتحليلات',
    analyticsDesc: 'تجمع مقاييس مجهولة لتحسين سرعة الموقع وتجربة الاستخدام دون تتبع هوية المستخدم.',
    marketingTitle: 'التسويق والتتبع الخارجي',
    marketingDesc: 'غير مفعلة حالياً على منصتنا ولا تُستخدم لأغراض إعلانية خارجية.',
    close: 'إغلاق',
    withdrawNotice: 'يمكنك تعديل أو سحب موافقتك في أي وقت عبر إعدادات ملفات تعريف الارتباط.'
  }
};

export function CookieConsentBanner({ lang }: CookieConsentBannerProps) {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPreferences>(DEFAULT_CONSENT);

  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  useEffect(() => {
    setMounted(true);
    const existing = getStoredConsent();
    if (!existing || !existing.hasInteracted) {
      setShowBanner(true);
    } else {
      setPrefs(existing);
    }

    // Listen for manual reopen trigger from footer or button
    const handleOpen = () => {
      const current = getStoredConsent() || DEFAULT_CONSENT;
      setPrefs(current);
      setShowModal(true);
    };

    window.addEventListener('9star_open_cookie_preferences', handleOpen);
    return () => {
      window.removeEventListener('9star_open_cookie_preferences', handleOpen);
    };
  }, []);

  if (!mounted) return null;

  const handleAcceptAll = () => {
    const updated = saveConsent({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: false, // Remains false as no marketing trackers are deployed
    });
    setPrefs(updated);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleRejectOptional = () => {
    const updated = saveConsent({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    });
    setPrefs(updated);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSaveCustom = () => {
    const updated = saveConsent({
      necessary: true,
      preferences: prefs.preferences,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
    });
    setPrefs(updated);
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {/* 1. Initial Notice Banner (Non-manipulative, Equal Weight) */}
      {showBanner && !showModal && (
        <aside
          role="region"
          aria-label={t.bannerTitle}
          className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-[#0a192f] text-slate-100 border-t-2 border-[#d4af37] shadow-2xl backdrop-blur-md"
        >
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {t.bannerTitle}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.bannerDesc}
              </p>
              <div className="flex items-center gap-4 text-xs pt-1">
                <Link
                  href={`/${lang}/legal/privacy-policy`}
                  className="text-[#d4af37] hover:underline font-semibold"
                >
                  {t.privacyPolicy}
                </Link>
                <span className="text-slate-500">•</span>
                <Link
                  href={`/${lang}/legal/cookie-policy`}
                  className="text-[#d4af37] hover:underline font-semibold"
                >
                  {t.cookiePolicy}
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleRejectOptional}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-600 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors focus:ring-2 focus:ring-[#d4af37] cursor-pointer"
              >
                {t.rejectOptional}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#d4af37]/40 bg-transparent hover:bg-white/5 text-[#d4af37] text-xs sm:text-sm font-semibold transition-colors focus:ring-2 focus:ring-[#d4af37] cursor-pointer"
              >
                {t.customize}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#d4af37] hover:bg-[#e0be48] text-[#070e17] text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/10 transition-colors focus:ring-2 focus:ring-white cursor-pointer"
              >
                {t.acceptAll}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Granular Preference Center Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
        >
          <div className="bg-[#0b1523] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-slate-200 shadow-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <h3 id="cookie-modal-title" className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-[#d4af37]">★</span> {t.modalTitle}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
                  {t.modalDesc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm transition-colors cursor-pointer"
                aria-label={t.close}
              >
                ✕
              </button>
            </div>

            {/* Category Cards */}
            <div className="space-y-4 overflow-y-auto pr-1 flex-1 py-2">
              {/* Category 1: Strictly Necessary */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm text-white flex items-center gap-2">
                    <span>{t.necessaryTitle}</span>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    {t.necessaryBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.necessaryDesc}
                </p>
              </div>

              {/* Category 2: Preferences */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="pref-toggle" className="font-semibold text-sm text-white cursor-pointer">
                    {t.prefTitle}
                  </label>
                  <input
                    id="pref-toggle"
                    type="checkbox"
                    checked={prefs.preferences}
                    onChange={(e) => setPrefs({ ...prefs, preferences: e.target.checked })}
                    className="w-4 h-4 rounded text-[#d4af37] focus:ring-[#d4af37] bg-slate-800 border-slate-600 cursor-pointer accent-[#d4af37]"
                  />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.prefDesc}
                </p>
              </div>

              {/* Category 3: Analytics */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="analytics-toggle" className="font-semibold text-sm text-white cursor-pointer">
                    {t.analyticsTitle}
                  </label>
                  <input
                    id="analytics-toggle"
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                    className="w-4 h-4 rounded text-[#d4af37] focus:ring-[#d4af37] bg-slate-800 border-slate-600 cursor-pointer accent-[#d4af37]"
                  />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.analyticsDesc}
                </p>
              </div>

              {/* Category 4: Marketing */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="marketing-toggle" className="font-semibold text-sm text-white cursor-pointer">
                    {t.marketingTitle}
                  </label>
                  <input
                    id="marketing-toggle"
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                    className="w-4 h-4 rounded text-[#d4af37] focus:ring-[#d4af37] bg-slate-800 border-slate-600 cursor-pointer accent-[#d4af37]"
                  />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.marketingDesc}
                </p>
              </div>

              <p className="text-[11px] text-slate-400 italic pt-2">
                {t.withdrawNotice}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800 mt-4">
              <button
                type="button"
                onClick={handleRejectOptional}
                className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
              >
                {t.rejectOptional}
              </button>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {t.savePrefs}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-[#d4af37] hover:bg-[#e0be48] text-[#070e17] text-xs font-bold transition-colors cursor-pointer"
                >
                  {t.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
