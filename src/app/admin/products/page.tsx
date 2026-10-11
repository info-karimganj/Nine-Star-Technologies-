'use client';

import React, { useEffect, useState } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titleEn: '',
    titleBn: '',
    titleAr: '',
    descriptionEn: '',
    demoUrl: '',
    isActive: true,
    order: 0
  });

  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      titleEn: '',
      titleBn: '',
      titleAr: '',
      descriptionEn: '',
      demoUrl: '',
      isActive: true,
      order: products.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProduct(p);
    setFormData({
      titleEn: p.title?.en || '',
      titleBn: p.title?.bn || '',
      titleAr: p.title?.ar || '',
      descriptionEn: p.description?.en || '',
      demoUrl: p.demoUrl || '',
      isActive: p.isActive ?? true,
      order: p.order || 0
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: {
        en: formData.titleEn,
        bn: formData.titleBn || formData.titleEn,
        ar: formData.titleAr || formData.titleEn
      },
      description: {
        en: formData.descriptionEn
      },
      demoUrl: formData.demoUrl,
      isActive: formData.isActive,
      order: Number(formData.order)
    };

    try {
      if (editingProduct) {
        await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch {
      alert('Error saving product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Products Management</h1>
          <p className="text-sm text-slate-400">Manage turnkey software products, SaaS systems, and digital assets</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-sm transition-colors shadow-lg shadow-amber-500/10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </button>
      </div>

      <div className="bg-[#0b1523] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0f1d30] border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Demo URL</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading products...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No products configured yet.</td>
              </tr>
            ) : (
              products.map(p => (
                <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${p.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                      {p.title?.en}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">{p.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${p.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-700 text-slate-300'}`}>
                      {p.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 truncate max-w-xs">{p.demoUrl || '—'}</td>
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
          <div className="bg-[#0b1523] border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white">
              {editingProduct ? 'Edit Product' : 'Create Product'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={formData.titleEn}
                  onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Title (Bengali)</label>
                  <input
                    type="text"
                    value={formData.titleBn}
                    onChange={e => setFormData({ ...formData, titleBn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Title (Arabic)</label>
                  <input
                    type="text"
                    value={formData.titleAr}
                    onChange={e => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.descriptionEn}
                  onChange={e => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Demo / Preview URL</label>
                <input
                  type="url"
                  placeholder="https://demo.9startechnologies.com"
                  value={formData.demoUrl}
                  onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900"
                />
                <label htmlFor="isActive" className="text-xs text-slate-300">Publish immediately (Active)</label>
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
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
