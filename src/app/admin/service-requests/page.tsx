'use client';

import React, { useEffect, useState } from 'react';

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState<any | null>(null);

  const fetchRequests = () => {
    fetch('/api/admin/service-requests')
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.requests || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/service-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchRequests();
      if (selectedReq && selectedReq.id === id) {
        setSelectedReq({ ...selectedReq, status: newStatus });
      }
    } catch {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Customer Service Inquiries</h1>
        <p className="text-xs text-slate-400 mt-1">Review, track, and manage incoming client project scopes.</p>
      </div>

      <div className="rounded-xl bg-[#0f1d30] border border-white/10 overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No service requests have been submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0a192f] text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10 text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">Reference #</th>
                  <th className="px-5 py-3.5">Client & Email</th>
                  <th className="px-5 py-3.5">Target Service</th>
                  <th className="px-5 py-3.5">Budget</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 font-mono text-[#d4af37] font-semibold">
                      {r.referenceNumber}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-white">{r.customerName}</div>
                      <div className="text-[11px] text-slate-400">{r.customerEmail}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 font-medium">{r.serviceTitle}</td>
                    <td className="px-5 py-3.5 text-slate-400">{r.projectBudget || 'Not specified'}</td>
                    <td className="px-5 py-3.5">
                      <select
                        value={r.status}
                        onChange={(e) => handleStatusChange(r.id, e.target.value)}
                        className="px-2 py-1 rounded bg-[#070e17] border border-white/15 text-[11px] font-semibold text-slate-200 focus:outline-none"
                      >
                        <option value="NEW">NEW</option>
                        <option value="UNDER_REVIEW">UNDER REVIEW</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedReq(r)}
                        className="px-2.5 py-1 rounded bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] font-bold text-xs"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Drawer / Modal */}
      {selectedReq && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f1d30] border border-white/15 p-6 rounded-2xl max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{selectedReq.serviceTitle}</h3>
                <span className="text-[11px] font-mono text-[#d4af37]">{selectedReq.referenceNumber}</span>
              </div>
              <button
                onClick={() => setSelectedReq(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Client Name</span>
                <span className="font-semibold text-white">{selectedReq.customerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Client Email</span>
                <span className="font-semibold text-white">{selectedReq.customerEmail}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Phone</span>
                <span className="font-semibold text-white">{selectedReq.customerPhone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Country</span>
                <span className="font-semibold text-white">{selectedReq.country || 'N/A'}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Primary Project Goal</span>
              <p className="p-3 rounded-lg bg-[#070e17] text-slate-300 leading-relaxed border border-white/10">
                {selectedReq.projectGoal}
              </p>
            </div>

            {selectedReq.projectDetails && (
              <div className="space-y-1.5 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Additional Details</span>
                <p className="p-3 rounded-lg bg-[#070e17] text-slate-300 leading-relaxed border border-white/10">
                  {selectedReq.projectDetails}
                </p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedReq(null)}
                className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#070e17] font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
