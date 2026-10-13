'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ServiceFormClient({ serviceId }: { serviceId: string }) {
  const router = useRouter();
  const isNew = serviceId === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState<'en' | 'bn' | 'ar'>('en');

  const [formData, setFormData] = useState({
    slug: '',
    categoryId: 'web-development',
    title: { en: '', bn: '', ar: '' },
    shortDescription: { en: '', bn: '', ar: '' },
    pricing: {
      type: 'STARTING_FROM',
      amount: 2999,
      currency: '$',
    },
    estimatedDeliveryTime: { en: '2-4 weeks', bn: '২-৪ সপ্তাহ', ar: '٢-٤ أسابيع' },
    isActive: true,
    isPopular: false,
    isRecommended: false,
  });

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/services/${serviceId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.service) {
            setFormData({
              slug: data.service.slug || '',
              categoryId: data.service.categoryId || 'web-development',
              title: { en: data.service.title?.en || '', bn: data.service.title?.bn || '', ar: data.service.title?.ar || '' },
              shortDescription: { en: data.service.shortDescription?.en || '', bn: data.service.shortDescription?.bn || '', ar: data.service.shortDescription?.ar || '' },
              pricing: data.service.pricing || { type: 'STARTING_FROM', amount: 0, currency: '$' },
              estimatedDeliveryTime: { en: data.service.estimatedDeliveryTime?.en || '', bn: data.service.estimatedDeliveryTime?.bn || '', ar: data.service.estimatedDeliveryTime?.ar || '' },
              isActive: data.service.isActive ?? true,
              isPopular: data.service.isPopular ?? false,
              isRecommended: data.service.isRecommended ?? false,
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isNew, serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNew ? '/api/admin/services' : `/api/admin/services/${serviceId}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      router.push('/admin/services');
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Error saving service');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-400">Loading service details...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {isNew ? 'Create New Service' : 'Edit Service'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">Configure service parameters, multi-language copy, and pricing model.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/services"
            className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-slate-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-[#d4af37] hover:bg-[#e0be48] text-[#070e17] font-bold text-xs tracking-wide transition-colors cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Service'}
          </button>
        </div>
      </div>

      {/* Language Switcher Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3">
        {(['en', 'bn', 'ar'] as const).map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setActiveLang(lang)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeLang === lang
                ? 'bg-[#d4af37] text-[#070e17]'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'English (EN)' : lang === 'bn' ? 'বাংলা (BN)' : 'العربية (AR)'}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-xl bg-[#0f1d30] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
          Localized Content ({activeLang.toUpperCase()})
        </h2>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
          <input
            type="text"
            required={activeLang === 'en'}
            value={formData.title[activeLang] || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: { ...formData.title, [activeLang]: e.target.value },
              })
            }
            placeholder={activeLang === 'en' ? 'e.g. Corporate Web Platforms' : ''}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
          <textarea
            rows={3}
            value={formData.shortDescription[activeLang] || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                shortDescription: { ...formData.shortDescription, [activeLang]: e.target.value },
              })
            }
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Timeline</label>
          <input
            type="text"
            value={formData.estimatedDeliveryTime[activeLang] || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                estimatedDeliveryTime: { ...formData.estimatedDeliveryTime, [activeLang]: e.target.value },
              })
            }
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>
      </div>

      <div className="p-6 rounded-xl bg-[#0f1d30] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
          Technical Parameters & Pricing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. corporate-web-platforms"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            >
              <option value="web-development">Web Development</option>
              <option value="documents-online">Documents & Online</option>
              <option value="business-digital">Business & Digital</option>
              <option value="automation-ai">Automation & AI</option>
              <option value="app-development">App Development</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Pricing Model</label>
            <select
              value={formData.pricing.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pricing: { ...formData.pricing, type: e.target.value as any },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            >
              <option value="STARTING_FROM">Starting From</option>
              <option value="FIXED">Fixed Price</option>
              <option value="CUSTOM_QUOTE">Custom Quote</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Amount ($)</label>
            <input
              type="number"
              value={formData.pricing.amount || 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pricing: { ...formData.pricing, amount: parseFloat(e.target.value) || 0 },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="flex items-center gap-4 pt-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded text-[#d4af37] focus:ring-0"
              />
              Published (Active)
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Save Action Bar */}
      <div className="flex items-center justify-between pt-4">
        <Link
          href="/admin/services"
          className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-slate-300"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-lg !bg-[#d4af37] hover:!bg-[#e0be48] !text-[#070e17] font-bold text-sm tracking-wide transition-colors cursor-pointer shadow-lg disabled:opacity-50"
        >
          {saving ? 'Saving...' : '💾 Save Service'}
        </button>
      </div>
    </form>
  );
}
