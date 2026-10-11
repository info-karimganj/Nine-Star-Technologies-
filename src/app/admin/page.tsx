'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-sm text-slate-400 flex items-center gap-2">
          <svg className="animate-spin w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Loading system telemetry...
        </div>
      </div>
    );
  }

  const m = data?.metrics || {};

  const cards = [
    { title: 'Active Services', value: `${m.activeServices || 0} / ${m.totalServices || 0}`, link: '/admin/services', desc: 'Managed offerings' },
    { title: 'Pending Inquiries', value: m.pendingRequests || 0, link: '/admin/service-requests', desc: 'Awaiting review', alert: (m.pendingRequests || 0) > 0 },
    { title: 'Published Posts', value: m.publishedPosts || 0, link: '/admin/posts', desc: `${m.draftPosts || 0} drafts` },
    { title: 'Case Studies', value: m.caseStudies || 0, link: '/admin/case-studies', desc: 'Client portfolios' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">System Dashboard</h1>
        <p className="text-xs text-slate-400 mt-1">
          Live website metrics, customer intake funnels, and recent administrative audit events.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <Link
            key={i}
            href={card.link}
            className={`p-5 rounded-xl bg-[#0f1d30] border transition-all hover:border-[#d4af37]/60 block ${
              card.alert ? 'border-amber-500/40' : 'border-white/10'
            }`}
          >
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.title}</div>
            <div className="text-3xl font-extrabold text-white mt-2">{card.value}</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
              <span>{card.desc}</span>
              <span className="text-[#d4af37] font-semibold text-[11px]">Manage &rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Supabase Cloud Connection & Security Status */}
      <div className="p-5 rounded-xl bg-[#0a192f] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 font-bold">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Supabase Backend Infrastructure</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Connected & Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Project: <span className="text-slate-300">qzxzttmrbeftlgujrldk.supabase.co</span> | Auth: <span className="text-[#d4af37]">Publishable Key</span> (RLS Enforced)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/admin/legal"
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
          >
            Legal Governance
          </Link>
          <a
            href="https://supabase.com/dashboard/project/qzxzttmrbeftlgujrldk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e0be48] text-[#070e17] font-bold transition-colors"
          >
            Supabase Dashboard &rarr;
          </a>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Service Inquiries */}
        <div className="p-6 rounded-xl bg-[#0f1d30] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Recent Service Requests</h2>
            <Link href="/admin/service-requests" className="text-xs font-semibold text-[#d4af37] hover:underline">
              View All
            </Link>
          </div>

          {!data?.recentRequests || data.recentRequests.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500 border border-dashed border-white/10 rounded-lg">
              No service requests received yet.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {data.recentRequests.map((req: any) => (
                <div key={req.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-semibold text-white">{req.customerName}</div>
                    <div className="text-slate-400 text-[11px]">{req.serviceTitle}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/10 text-slate-300">
                      {req.status}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Audit Log Stream */}
        <div className="p-6 rounded-xl bg-[#0f1d30] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Recent Activity & Audit Logs</h2>
            <Link href="/admin/audit-logs" className="text-xs font-semibold text-[#d4af37] hover:underline">
              All Logs
            </Link>
          </div>

          {!data?.recentLogs || data.recentLogs.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500 border border-dashed border-white/10 rounded-lg">
              No administrative logs recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {data.recentLogs.map((log: any) => (
                <div key={log.id} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="font-medium text-slate-300">
                      <span className="text-[#d4af37] font-mono font-semibold">{log.action}</span> · {log.entity}
                    </div>
                    <div className="text-slate-500 text-[11px]">{log.details}</div>
                  </div>
                  <div className="text-[10px] text-slate-500 shrink-0 text-right">
                    <div>{log.userName}</div>
                    <div>{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
