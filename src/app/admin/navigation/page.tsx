'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface NavItem {
  id: string;
  label: { en: string; bn: string };
  href: string;
  isExternal?: boolean;
  isActive: boolean;
  category: 'offerings' | 'company' | 'main' | 'footer';
}

const defaultNavItems: NavItem[] = [
  { id: 'nav-1', label: { en: 'Services', bn: 'সার্ভিসসমূহ' }, href: '/services', isActive: true, category: 'offerings' },
  { id: 'nav-2', label: { en: 'Solutions', bn: 'সলিউশন' }, href: '/solutions', isActive: true, category: 'offerings' },
  { id: 'nav-3', label: { en: 'Products', bn: 'প্রোডাক্ট' }, href: '/products', isActive: true, category: 'offerings' },
  { id: 'nav-4', label: { en: 'About Us', bn: 'আমাদের সম্পর্কে' }, href: '/about', isActive: true, category: 'company' },
  { id: 'nav-5', label: { en: 'Our Process', bn: 'কার্যপদ্ধতি' }, href: '/process', isActive: true, category: 'company' },
  { id: 'nav-6', label: { en: 'Case Studies', bn: 'কেস স্টাডি' }, href: '/case-studies', isActive: true, category: 'company' },
  { id: 'nav-7', label: { en: 'Contact Us', bn: 'যোগাযোগ' }, href: '/contact', isActive: true, category: 'main' },
  { id: 'nav-8', label: { en: 'Start Service Request', bn: 'অডিট রিকোয়েস্ট' }, href: '/request', isActive: true, category: 'main' },
];

export default function AdminNavigationPage() {
  const [items, setItems] = useState<NavItem[]>(defaultNavItems);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newItem, setNewItem] = useState({ labelEn: '', labelBn: '', href: '', category: 'offerings' as NavItem['category'] });
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.navigationMenu && Array.isArray(data.settings.navigationMenu)) {
          setItems(data.settings.navigationMenu);
        }
      })
      .catch(() => {});
  }, []);

  const handleToggleActive = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    );
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.labelEn || !newItem.href) return;

    const item: NavItem = {
      id: `nav-${Date.now()}`,
      label: { en: newItem.labelEn, bn: newItem.labelBn || newItem.labelEn },
      href: newItem.href,
      isActive: true,
      category: newItem.category,
    };

    setItems([...items, item]);
    setNewItem({ labelEn: '', labelBn: '', href: '', category: 'offerings' });
    setShowAddModal(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ navigationMenu: items }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Failed to save navigation menu');
      }
    } catch {
      alert('Error updating navigation');
    } finally {
      setSaving(false);
    }
  };

  const categories = [
    { key: 'offerings', title: 'Offerings Menu (Services, Solutions, Products)' },
    { key: 'company', title: 'Company Menu (About, Process, Case Studies)' },
    { key: 'main', title: 'Main Header Actions & Direct Links' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Navigation & Menus</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage public website header links, navigation dropdowns, and button destinations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wide transition-colors cursor-pointer"
          >
            + Add Menu Link
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-lg !bg-[#d4af37] hover:!bg-[#e0be48] !text-[#070e17] font-bold text-xs tracking-wide transition-colors cursor-pointer shadow-lg disabled:opacity-50"
          >
            {saving ? 'Saving...' : '💾 Save Navigation Menu'}
          </button>
        </div>
      </div>

      {success && (
        <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold">
          ✓ Navigation menu updated successfully! Changes have been propagated to public pages.
        </div>
      )}

      {/* Categories */}
      {categories.map((cat) => {
        const catItems = items.filter((i) => i.category === cat.key);
        return (
          <div key={cat.key} className="p-6 rounded-xl bg-[#0f1d30] border border-white/10 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">{cat.title}</h2>
            {catItems.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No links in this section yet.</p>
            ) : (
              <div className="space-y-2">
                {catItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#070e17] border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          item.isActive ? 'bg-emerald-400' : 'bg-slate-600'
                        }`}
                      />
                      <div>
                        <div className="font-semibold text-xs text-white">
                          {item.label.en}{' '}
                          <span className="text-slate-400 font-normal">({item.label.bn})</span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">{item.href}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(item.id)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                          item.isActive
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {item.isActive ? 'Active' : 'Disabled'}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 rounded text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer text-xs"
                        title="Remove link"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom Save Bar */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-lg !bg-[#d4af37] hover:!bg-[#e0be48] !text-[#070e17] font-bold text-sm tracking-wide transition-colors cursor-pointer shadow-lg disabled:opacity-50"
        >
          {saving ? 'Saving...' : '💾 Save Navigation Menu'}
        </button>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={handleAddItem}
            className="bg-[#0f1d30] border border-white/15 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Add New Navigation Link</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Label (English)</label>
              <input
                type="text"
                required
                value={newItem.labelEn}
                onChange={(e) => setNewItem({ ...newItem, labelEn: e.target.value })}
                placeholder="e.g. AI Automation"
                className="w-full px-3 py-2 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Label (বাংলা)</label>
              <input
                type="text"
                value={newItem.labelBn}
                onChange={(e) => setNewItem({ ...newItem, labelBn: e.target.value })}
                placeholder="যেমন: এআই অটোমেশন"
                className="w-full px-3 py-2 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target URL / Route</label>
              <input
                type="text"
                required
                value={newItem.href}
                onChange={(e) => setNewItem({ ...newItem, href: e.target.value })}
                placeholder="/services/ai-automation or https://..."
                className="w-full px-3 py-2 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Menu Group</label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value as NavItem['category'] })}
                className="w-full px-3 py-2 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="offerings">Offerings Dropdown</option>
                <option value="company">Company Dropdown</option>
                <option value="main">Main Header Direct Link</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg !bg-[#d4af37] hover:!bg-[#e0be48] !text-[#070e17] font-bold text-xs"
              >
                Add Link
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
