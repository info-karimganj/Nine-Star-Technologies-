'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchServices = () => {
    setLoading(true);
    fetch('/api/admin/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleActive = async (service: any) => {
    try {
      await fetch(`/api/admin/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      fetchServices();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDeleteConfirmId(null);
        fetchServices();
      } else {
        alert('Failed to delete service');
      }
    } catch {
      alert('Error connecting to server');
    }
  };

  const filtered = services.filter((s) => {
    const titleMatch = (s.title?.en || '').toLowerCase().includes(search.toLowerCase());
    const catMatch = selectedCategory === 'ALL' || s.categoryId === selectedCategory;
    return titleMatch && catMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Services Catalog</h1>
          <p className="text-xs text-slate-400 mt-1">Manage public digital services, pricing models, and requirements.</p>
        </div>
        <Link
          href="/admin/services/new"
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#070e17] font-bold text-xs hover:bg-[#e0be48] transition-colors inline-flex items-center gap-2 self-start"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Service
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-[#0f1d30] border border-white/10 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search services by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37]"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg bg-[#070e17] border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
          >
            <option value="ALL">All Categories</option>
            <option value="web-development">Web Development</option>
            <option value="documents-online">Documents & Online</option>
            <option value="business-digital">Business & Digital</option>
            <option value="automation-ai">Automation & AI</option>
            <option value="app-development">App Development</option>
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="rounded-xl bg-[#0f1d30] border border-white/10 overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading services...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No services found matching search filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0a192f] text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10 text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">Service Name</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Pricing</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-white">{s.title?.en}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{s.shortDescription?.en}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-300 font-mono">
                        {s.categoryId}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-300">
                      {s.pricing?.type === 'CUSTOM_QUOTE' ? (
                        <span className="text-slate-400">Custom Quote</span>
                      ) : (
                        <span>${s.pricing?.amount?.toLocaleString() || 'N/A'}</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => handleToggleActive(s)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                          s.isActive
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {s.isActive ? 'Active' : 'Draft / Inactive'}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <a
                        href={`/en/services/${s.slug || s.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                      >
                        Preview
                      </a>
                      <Link
                        href={`/admin/services/${s.id}`}
                        className="px-2 py-1 rounded bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] font-semibold transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteConfirmId(s.id)}
                        className="px-2 py-1 rounded bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f1d30] border border-white/15 p-6 rounded-xl max-w-sm w-full space-y-4">
            <h3 className="text-base font-bold text-white">Delete Service</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to permanently delete this service? This action will remove it from the public catalog.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-xs text-white font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
