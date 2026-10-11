'use client';

import React, { useEffect, useState } from 'react';

export default function AdminPagesManager() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    titleEn: '',
    titleBn: '',
    titleAr: '',
    contentEn: '',
    contentBn: '',
    contentAr: '',
    status: 'PUBLISHED'
  });

  const fetchPages = () => {
    setLoading(true);
    fetch('/api/admin/pages')
      .then(res => res.json())
      .then(data => {
        setPages(data.pages || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const openCreateModal = () => {
    setEditingPage(null);
    setFormData({
      slug: '',
      titleEn: '',
      titleBn: '',
      titleAr: '',
      contentEn: '',
      contentBn: '',
      contentAr: '',
      status: 'PUBLISHED'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingPage(p);
    setFormData({
      slug: p.slug,
      titleEn: p.title?.en || '',
      titleBn: p.title?.bn || '',
      titleAr: p.title?.ar || '',
      contentEn: p.content?.en || '',
      contentBn: p.content?.bn || '',
      contentAr: p.content?.ar || '',
      status: p.status || 'PUBLISHED'
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      slug: formData.slug,
      title: {
        en: formData.titleEn,
        bn: formData.titleBn || formData.titleEn,
        ar: formData.titleAr || formData.titleEn
      },
      content: {
        en: formData.contentEn,
        bn: formData.contentBn || formData.contentEn,
        ar: formData.contentAr || formData.contentEn
      },
      status: formData.status
    };

    try {
      if (editingPage) {
        await fetch(`/api/admin/pages/${editingPage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/admin/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setIsModalOpen(false);
      fetchPages();
    } catch {
      alert('Error saving page');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    try {
      await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' });
      fetchPages();
    } catch {
      alert('Failed to delete page');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Pages & Content Builder</h1>
          <p className="text-sm text-slate-400">Manage custom corporate pages, terms of service, policies, and rich sections</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-sm transition-colors shadow-lg shadow-amber-500/10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Create New Page
        </button>
      </div>

      <div className="bg-[#0b1523] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0f1d30] border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Page Title</th>
              <th className="px-6 py-4">Route Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Updated</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading custom pages...</td>
              </tr>
            ) : pages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No custom pages created yet.</td>
              </tr>
            ) : (
              pages.map(p => (
                <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{p.title?.en}</td>
                  <td className="px-6 py-4 font-mono text-xs text-amber-400">/{p.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${p.status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-700 text-slate-300'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">{new Date(p.updatedAt || p.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="text-xs px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-xs px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded border border-rose-500/20 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#0b1523] border border-slate-700 rounded-xl p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white">
              {editingPage ? 'Edit Page' : 'Create New Page'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Page Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="privacy-policy"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Body Content (English - Markdown/HTML)</label>
                <textarea
                  rows={6}
                  value={formData.contentEn}
                  onChange={e => setFormData({ ...formData, contentEn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-sm"
                >
                  Save Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
