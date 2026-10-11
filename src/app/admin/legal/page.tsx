'use client';

import React, { useEffect, useState } from 'react';
import { LegalDocumentContent } from '@/lib/legal';
import { COOKIE_INVENTORY } from '@/lib/consent';

export default function AdminLegalGovernancePage() {
  const [documents, setDocuments] = useState<LegalDocumentContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<LegalDocumentContent | null>(null);
  const [activeTab, setActiveTab] = useState<'policies' | 'cookie-inventory'>('policies');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [editForm, setEditForm] = useState<{
    version: string;
    status: 'PUBLISHED' | 'UNDER_REVIEW' | 'DRAFT';
    summaryEn: string;
    summaryBn: string;
    sections: any[];
  }>({
    version: '2.0',
    status: 'PUBLISHED',
    summaryEn: '',
    summaryBn: '',
    sections: []
  });

  const fetchDocs = () => {
    setLoading(true);
    fetch('/api/admin/legal')
      .then(res => res.json())
      .then(data => {
        setDocuments(data.documents || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const openEditor = (doc: LegalDocumentContent) => {
    setSelectedDoc(doc);
    setEditForm({
      version: doc.version,
      status: doc.status,
      summaryEn: doc.summary.en,
      summaryBn: (doc.summary as any).bn || doc.summary.en,
      sections: JSON.parse(JSON.stringify(doc.sections))
    });
  };

  const handleSaveDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc) return;
    setSaving(true);
    setSuccessMsg('');

    const payload: LegalDocumentContent = {
      ...selectedDoc,
      version: editForm.version,
      status: editForm.status,
      summary: {
        ...selectedDoc.summary,
        en: editForm.summaryEn,
        bn: editForm.summaryBn
      },
      sections: editForm.sections
    };

    try {
      const res = await fetch('/api/admin/legal', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccessMsg(`Successfully saved and published ${payload.title.en}`);
        fetchDocs();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        alert('Failed to save document');
      }
    } catch {
      alert('Error updating document');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span className="text-[#d4af37]">§</span> Legal & Compliance Governance
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage multi-lingual legal policies, international compliance disclosures, and cookie audit inventories.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-lg bg-[#0f1d30] border border-white/10 p-1">
          <button
            type="button"
            onClick={() => { setActiveTab('policies'); setSelectedDoc(null); }}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'policies' ? 'bg-[#d4af37] text-[#070e17]' : 'text-slate-300 hover:text-white'
            }`}
          >
            Legal Policies ({documents.length})
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('cookie-inventory'); setSelectedDoc(null); }}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'cookie-inventory' ? 'bg-[#d4af37] text-[#070e17]' : 'text-slate-300 hover:text-white'
            }`}
          >
            Cookie Inventory ({COOKIE_INVENTORY.length})
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between">
          <span>✓ {successMsg}</span>
          <button onClick={() => setSuccessMsg('')} className="text-emerald-400 hover:text-emerald-200">✕</button>
        </div>
      )}

      {/* VIEW: POLICIES */}
      {activeTab === 'policies' && !selectedDoc && (
        <div className="bg-[#0b1523] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0f1d30] border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Policy Document</th>
                <th className="px-5 py-3.5">Slug Route</th>
                <th className="px-5 py-3.5">Version</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Last Updated</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">Loading legal documents...</td>
                </tr>
              ) : documents.map(d => (
                <tr key={d.slug} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-white block">{d.title.en}</span>
                    <span className="text-[11px] text-slate-500 font-sans">{(d.title as any).bn}</span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[11px] text-[#d4af37]">/legal/{d.slug}</td>
                  <td className="px-5 py-3.5 font-mono text-slate-300">v{d.version}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      d.status === 'PUBLISHED' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 font-mono text-[11px]">{d.lastUpdated}</td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <a
                      href={`/en/legal/${d.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors inline-block"
                    >
                      Preview
                    </a>
                    <button
                      onClick={() => openEditor(d)}
                      className="text-[11px] px-2.5 py-1.5 bg-[#d4af37] hover:bg-[#e0be48] text-[#070e17] font-bold rounded transition-colors"
                    >
                      Edit Content
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW: POLICY EDITOR */}
      {activeTab === 'policies' && selectedDoc && (
        <form onSubmit={handleSaveDoc} className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#0f1d30] border border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back to List
                </button>
                <span className="text-slate-600">/</span>
                <h2 className="text-base font-bold text-white">Editing: {selectedDoc.title.en}</h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Route: /legal/{selectedDoc.slug}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-lg bg-[#d4af37] hover:bg-[#e0be48] text-[#070e17] font-bold text-xs tracking-wide transition-colors cursor-pointer disabled:opacity-50"
              >
                {saving ? 'Publishing...' : 'Save & Publish Version'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-xl bg-[#0b1523] border border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Version Number</label>
              <input
                type="text"
                value={editForm.version}
                onChange={e => setEditForm({ ...editForm, version: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Publication Status</label>
              <select
                value={editForm.status}
                onChange={e => setEditForm({ ...editForm, status: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
              >
                <option value="PUBLISHED">PUBLISHED (Live to Public)</option>
                <option value="UNDER_REVIEW">UNDER_REVIEW (Draft for Counsel)</option>
                <option value="DRAFT">DRAFT</option>
              </select>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0b1523] border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">Executive Summary</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Summary (English)</label>
              <textarea
                rows={3}
                value={editForm.summaryEn}
                onChange={e => setEditForm({ ...editForm, summaryEn: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Summary (Bengali)</label>
              <textarea
                rows={3}
                value={editForm.summaryBn}
                onChange={e => setEditForm({ ...editForm, summaryBn: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-sans"
              />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0b1523] border border-slate-800 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Policy Clauses & Sections ({editForm.sections.length})
            </h3>
            {editForm.sections.map((sec, idx) => (
              <div key={sec.id || idx} className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Clause Title (EN)</label>
                    <input
                      type="text"
                      value={sec.title.en}
                      onChange={e => {
                        const copy = [...editForm.sections];
                        copy[idx].title.en = e.target.value;
                        setEditForm({ ...editForm, sections: copy });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Clause Title (BN)</label>
                    <input
                      type="text"
                      value={(sec.title as any).bn || sec.title.en}
                      onChange={e => {
                        const copy = [...editForm.sections];
                        copy[idx].title.bn = e.target.value;
                        setEditForm({ ...editForm, sections: copy });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white text-xs font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Content Text (EN)</label>
                  <textarea
                    rows={4}
                    value={sec.content.en}
                    onChange={e => {
                      const copy = [...editForm.sections];
                      copy[idx].content.en = e.target.value;
                      setEditForm({ ...editForm, sections: copy });
                    }}
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Content Text (BN)</label>
                  <textarea
                    rows={4}
                    value={(sec.content as any).bn || sec.content.en}
                    onChange={e => {
                      const copy = [...editForm.sections];
                      copy[idx].content.bn = e.target.value;
                      setEditForm({ ...editForm, sections: copy });
                    }}
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-xs font-sans"
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      )}

      {/* VIEW: COOKIE INVENTORY */}
      {activeTab === 'cookie-inventory' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0f1d30] border border-white/10 text-xs text-slate-300">
            <h3 className="font-bold text-white mb-1">Verified Technical Cookie & Storage Inventory</h3>
            <p className="text-slate-400">
              This inventory represents real, audited technologies operating in the website codebase. No synthetic or fictitious tracking cookies are present.
            </p>
          </div>

          <div className="bg-[#0b1523] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0f1d30] border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">Storage Key</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Type & Duration</th>
                  <th className="px-5 py-3.5">Purpose (EN/BN)</th>
                  <th className="px-5 py-3.5">Consent Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {COOKIE_INVENTORY.map(item => (
                  <tr key={item.key} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-white font-bold block">{item.key}</span>
                      <span className="text-[11px] text-slate-500">{item.name}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        item.category === 'necessary' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300">
                      <span className="block">{item.type}</span>
                      <span className="text-[11px] text-slate-500">{item.duration}</span>
                    </td>
                    <td className="px-5 py-3.5 max-w-sm text-slate-300">
                      <p className="leading-relaxed">{item.purpose.en}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5 font-sans">{item.purpose.bn}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      {item.consentRequired ? (
                        <span className="text-amber-400 text-[11px] font-medium">Blocked before consent</span>
                      ) : (
                        <span className="text-emerald-400 text-[11px] font-medium">Exempt (Strictly Necessary)</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
