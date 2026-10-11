'use client';

import React, { useEffect, useState } from 'react';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    questionEn: '',
    questionBn: '',
    questionAr: '',
    answerEn: '',
    answerBn: '',
    answerAr: '',
    category: 'General',
    order: 0
  });

  const fetchFaqs = () => {
    setLoading(true);
    fetch('/api/admin/faqs')
      .then(res => res.json())
      .then(data => {
        setFaqs(data.faqs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openCreateModal = () => {
    setEditingFaq(null);
    setFormData({
      questionEn: '',
      questionBn: '',
      questionAr: '',
      answerEn: '',
      answerBn: '',
      answerAr: '',
      category: 'General',
      order: faqs.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (f: any) => {
    setEditingFaq(f);
    setFormData({
      questionEn: f.question?.en || '',
      questionBn: f.question?.bn || '',
      questionAr: f.question?.ar || '',
      answerEn: f.answer?.en || '',
      answerBn: f.answer?.bn || '',
      answerAr: f.answer?.ar || '',
      category: f.category || 'General',
      order: f.order || 0
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      question: {
        en: formData.questionEn,
        bn: formData.questionBn || formData.questionEn,
        ar: formData.questionAr || formData.questionEn
      },
      answer: {
        en: formData.answerEn,
        bn: formData.answerBn || formData.answerEn,
        ar: formData.answerAr || formData.answerEn
      },
      category: formData.category,
      order: Number(formData.order)
    };

    try {
      if (editingFaq) {
        await fetch(`/api/admin/faqs/${editingFaq.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/admin/faqs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setIsModalOpen(false);
      fetchFaqs();
    } catch {
      alert('Error saving FAQ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
      fetchFaqs();
    } catch {
      alert('Failed to delete FAQ');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Frequently Asked Questions (FAQs)</h1>
          <p className="text-sm text-slate-400">Manage client questions, technical answers, and knowledgebase entries</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-sm transition-colors shadow-lg shadow-amber-500/10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New FAQ
        </button>
      </div>

      <div className="bg-[#0b1523] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0f1d30] border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Question</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Answer Preview</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Loading FAQs...</td>
              </tr>
            ) : faqs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">No FAQs configured yet.</td>
              </tr>
            ) : (
              faqs.map(f => (
                <tr key={f.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white max-w-xs truncate">{f.question?.en}</td>
                  <td className="px-6 py-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-800 border border-slate-700">{f.category || 'General'}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs truncate max-w-sm">{f.answer?.en}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(f)}
                      className="text-xs px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
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
              {editingFaq ? 'Edit FAQ' : 'Create FAQ'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Question (English) *</label>
                <input
                  type="text"
                  required
                  value={formData.questionEn}
                  onChange={e => setFormData({ ...formData, questionEn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Question (Bengali)</label>
                  <input
                    type="text"
                    value={formData.questionBn}
                    onChange={e => setFormData({ ...formData, questionBn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Question (Arabic)</label>
                  <input
                    type="text"
                    value={formData.questionAr}
                    onChange={e => setFormData({ ...formData, questionAr: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Answer (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.answerEn}
                  onChange={e => setFormData({ ...formData, answerEn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                />
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
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
