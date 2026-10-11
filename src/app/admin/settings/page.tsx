'use client';

import React, { useEffect, useState } from 'react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data.settings);
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
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Failed to save settings');
      }
    } catch {
      alert('Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return <div className="p-8 text-center text-xs text-slate-400">Loading settings...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Global Site Settings</h1>
          <p className="text-xs text-slate-400 mt-1">Configure company communications, contact channels, and global SEO.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-lg bg-[#d4af37] hover:bg-[#e0be48] text-[#070e17] font-bold text-xs tracking-wide transition-colors cursor-pointer disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {success && (
        <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs">
          Settings saved successfully! Public pages have been revalidated.
        </div>
      )}

      <div className="p-6 rounded-xl bg-[#0f1d30] border border-white/10 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Company Contact Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail || ''}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Support Email</label>
            <input
              type="email"
              value={settings.supportEmail || ''}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Business Phone</label>
            <input
              type="text"
              value={settings.contactPhone || ''}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Hotline</label>
            <input
              type="text"
              value={settings.whatsappNumber || ''}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-[#0f1d30] border border-white/10 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Social Media Handles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={settings.socialLinks?.linkedin || ''}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
              })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Twitter / X URL</label>
            <input
              type="text"
              value={settings.socialLinks?.twitter || ''}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, twitter: e.target.value }
              })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Facebook URL</label>
            <input
              type="text"
              value={settings.socialLinks?.facebook || ''}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, facebook: e.target.value }
              })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
