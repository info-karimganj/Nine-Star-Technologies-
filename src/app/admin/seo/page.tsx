'use client';

import React, { useEffect, useState } from 'react';

export default function AdminSeoPage() {
  const [seo, setSeo] = useState({
    title: { en: '9STAR Technologies', bn: 'নাইনস্টার টেকনোলজিস', ar: 'ناين ستار للتقنية' },
    description: {
      en: 'Empowering businesses with cutting-edge software and automation.',
      bn: 'অত্যাধুনিক সফটওয়্যার এবং অটোমেশনের মাধ্যমে ব্যবসাকে শক্তিশালী করা।',
      ar: 'تمكين الشركات بأحدث البرمجيات والأتمتة.',
    },
    canonicalUrl: 'https://nine-star-technologies.vercel.app',
    keywords: 'AI engineering, web development, custom software, digital strategy, SEO Dhaka, automation',
    ogImage: '/uploads/brand-og.png',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeLang, setActiveLang] = useState<'en' | 'bn' | 'ar'>('en');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.globalSeo) {
          setSeo((prev) => ({
            ...prev,
            ...data.settings.globalSeo,
          }));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ globalSeo: seo }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Failed to save SEO settings');
      }
    } catch {
      alert('Error updating SEO settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-400">Loading SEO settings...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">SEO & Metadata Settings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure search engine optimization, OpenGraph sharing cards, and multi-language meta tags.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-lg !bg-[#d4af37] hover:!bg-[#e0be48] !text-[#070e17] font-bold text-xs tracking-wide transition-colors cursor-pointer shadow-lg disabled:opacity-50 self-start"
        >
          {saving ? 'Saving...' : '💾 Save SEO Settings'}
        </button>
      </div>

      {success && (
        <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold">
          ✓ SEO metadata saved successfully! Search engine tags have been updated.
        </div>
      )}

      {/* Language Switcher */}
      <div className="flex gap-2 border-b border-white/10 pb-3">
        {(['en', 'bn', 'ar'] as const).map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setActiveLang(lang)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeLang === lang
                ? '!bg-[#d4af37] !text-[#070e17]'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'English (EN)' : lang === 'bn' ? 'বাংলা (BN)' : 'العربية (AR)'}
          </button>
        ))}
      </div>

      {/* Localized Meta Titles & Descriptions */}
      <div className="p-6 rounded-xl bg-[#0f1d30] border border-white/10 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
          Search Engine Metadata ({activeLang.toUpperCase()})
        </h2>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Default Meta Title ({activeLang.toUpperCase()})
          </label>
          <input
            type="text"
            value={seo.title[activeLang] || ''}
            onChange={(e) =>
              setSeo({
                ...seo,
                title: { ...seo.title, [activeLang]: e.target.value },
              })
            }
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
          />
          <p className="text-[10px] text-slate-500 mt-1">Recommended length: 50-60 characters</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Meta Description ({activeLang.toUpperCase()})
          </label>
          <textarea
            rows={3}
            value={seo.description[activeLang] || ''}
            onChange={(e) =>
              setSeo({
                ...seo,
                description: { ...seo.description, [activeLang]: e.target.value },
              })
            }
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
          />
          <p className="text-[10px] text-slate-500 mt-1">Recommended length: 150-160 characters</p>
        </div>
      </div>

      {/* Global Indexing & URLs */}
      <div className="p-6 rounded-xl bg-[#0f1d30] border border-white/10 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Global Indexing & Sharing</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Canonical Domain URL</label>
            <input
              type="text"
              value={seo.canonicalUrl || ''}
              onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Social Preview Image (OG Image)</label>
            <input
              type="text"
              value={seo.ogImage || ''}
              onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
              placeholder="/uploads/... or https://..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">SEO Target Keywords</label>
          <input
            type="text"
            value={seo.keywords || ''}
            onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
            placeholder="Comma-separated keywords"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-lg !bg-[#d4af37] hover:!bg-[#e0be48] !text-[#070e17] font-bold text-sm tracking-wide transition-colors cursor-pointer shadow-lg disabled:opacity-50"
        >
          {saving ? 'Saving...' : '💾 Save SEO Settings'}
        </button>
      </div>
    </form>
  );
}
