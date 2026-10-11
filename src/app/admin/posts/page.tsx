'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PostsAdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    fetch('/api/admin/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Articles & Insights</h1>
          <p className="text-xs text-slate-400 mt-1">Publish editorial articles, industry insights, and technical guides.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#070e17] font-bold text-xs hover:bg-[#e0be48] transition-colors inline-flex items-center gap-2 self-start"
        >
          Create Post
        </Link>
      </div>

      <div className="rounded-xl bg-[#0f1d30] border border-white/10 overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading articles...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No articles created yet. Click "Create Post" to draft your first article.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0a192f] text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10 text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">Title</th>
                  <th className="px-5 py-3.5">Slug</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-white">{p.title?.en}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{p.excerpt?.en}</div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-400 text-[11px]">{p.slug}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        p.isPublished ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {p.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <Link
                        href={`/admin/posts/${p.id}`}
                        className="px-2.5 py-1 rounded bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] font-semibold"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
