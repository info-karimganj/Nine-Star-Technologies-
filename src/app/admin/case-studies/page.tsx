'use client';

import React, { useEffect, useState } from 'react';

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCase, setEditingCase] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titleEn: '',
    titleBn: '',
    titleAr: '',
    clientName: '',
    industryEn: 'Technology',
    challengeEn: '',
    solutionEn: '',
    isPublished: true
  });

  const fetchCaseStudies = () => {
    setLoading(true);
    fetch('/api/admin/case-studies')
      .then(res => res.json())
      .then(data => {
        setCaseStudies(data.caseStudies || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const openCreateModal = () => {
    setEditingCase(null);
    setFormData({
      titleEn: '',
      titleBn: '',
      titleAr: '',
      clientName: '',
      industryEn: 'Technology',
      challengeEn: '',
      solutionEn: '',
      isPublished: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cs: any) => {
    setEditingCase(cs);
    setFormData({
      titleEn: cs.title?.en || '',
      titleBn: cs.title?.bn || '',
      titleAr: cs.title?.ar || '',
      clientName: cs.clientName || '',
      industryEn: cs.industry?.en || 'Technology',
      challengeEn: cs.challenge?.en || '',
      solutionEn: cs.solution?.en || '',
      isPublished: cs.isPublished ?? true
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
      clientName: formData.clientName,
      industry: {
        en: formData.industryEn
      },
      challenge: {
        en: formData.challengeEn
      },
      solution: {
        en: formData.solutionEn
      },
      isPublished: formData.isPublished
    };

    try {
      if (editingCase) {
        await fetch(`/api/admin/case-studies/${editingCase.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/admin/case-studies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setIsModalOpen(false);
      fetchCaseStudies();
    } catch {
      alert('Error saving case study');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    try {
      await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' });
      fetchCaseStudies();
    } catch {
      alert('Failed to delete case study');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Case Studies Management</h1>
          <p className="text-sm text-slate-400">Showcase enterprise client outcomes, performance benchmarks, and delivery proofs</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-sm transition-colors shadow-lg shadow-amber-500/10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Case Study
        </button>
      </div>

      <div className="bg-[#0b1523] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0f1d30] border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Industry</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading case studies...</td>
              </tr>
            ) : caseStudies.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No case studies published yet.</td>
              </tr>
            ) : (
              caseStudies.map(cs => (
                <tr key={cs.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${cs.isPublished ? 'bg-amber-400' : 'bg-slate-500'}`}></span>
                      {cs.title?.en}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{cs.clientName || 'Confidential'}</td>
                  <td className="px-6 py-4 text-slate-400 text-xs">{cs.industry?.en || 'Tech'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${cs.isPublished ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-700 text-slate-300'}`}>
                      {cs.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(cs)}
                      className="text-xs px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cs.id)}
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
          <div className="bg-[#0b1523] border border-slate-700 rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white">
              {editingCase ? 'Edit Case Study' : 'Create Case Study'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Project Title (English) *</label>
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
                  <label className="block text-xs font-medium text-slate-400 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Industry</label>
                  <input
                    type="text"
                    value={formData.industryEn}
                    onChange={e => setFormData({ ...formData, industryEn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Challenge Summary</label>
                <textarea
                  rows={2}
                  value={formData.challengeEn}
                  onChange={e => setFormData({ ...formData, challengeEn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Delivered Solution</label>
                <textarea
                  rows={3}
                  value={formData.solutionEn}
                  onChange={e => setFormData({ ...formData, solutionEn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900"
                />
                <label htmlFor="isPublished" className="text-xs text-slate-300">Publish to public website</label>
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
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
