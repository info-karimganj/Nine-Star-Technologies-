'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = () => {
    setLoading(true);
    fetch('/api/admin/media')
      .then(res => res.json())
      .then(data => {
        setMedia(data.media || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', file.name);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        fetchMedia();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to upload media');
      }
    } catch {
      alert('Error uploading file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this media file?')) return;
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (selectedItem?.id === id) setSelectedItem(null);
        fetchMedia();
      } else {
        alert('Failed to delete media');
      }
    } catch {
      alert('Error connecting to server');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    alert('Public Image URL copied to clipboard!');
  };

  const filtered = media.filter(m =>
    (m.filename || '').toLowerCase().includes(search.toLowerCase()) ||
    (m.altText || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Media Library</h1>
          <p className="text-sm text-slate-400">Upload and manage brand assets, architecture diagrams, and client project screenshots</p>
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-semibold rounded-lg text-sm transition-colors shadow-lg shadow-amber-500/10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search media files by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-80 px-3.5 py-2 bg-[#0b1523] border border-slate-800 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading media library...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-slate-400 bg-[#0b1523] border border-slate-800 rounded-xl">
          No media files found. Click Upload Image to add assets to your repository.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`group relative bg-[#0b1523] border rounded-xl overflow-hidden cursor-pointer transition-all ${
                selectedItem?.id === item.id ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="aspect-square bg-slate-900/80 flex items-center justify-center overflow-hidden max-h-48 max-w-full">
                <img
                  src={item.url}
                  alt={item.altText || item.filename}
                  className="w-full h-full object-cover max-h-48 max-w-full group-hover:scale-105 transition-transform duration-300"
                  style={{ maxHeight: '12rem', maxWidth: '100%', objectFit: 'cover' }}
                  onError={(e: any) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-white truncate">{item.filename}</p>
                <p className="text-[10px] text-slate-500">{(item.sizeBytes / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected media detail modal/drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#0b1523] border border-slate-700 rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white truncate">{selectedItem.filename}</h2>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="aspect-video max-h-72 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center">
              <img src={selectedItem.url} alt={selectedItem.altText} className="max-h-72 max-w-full object-contain" style={{ maxHeight: '18rem', maxWidth: '100%' }} />
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p><strong className="text-slate-400">File URL:</strong> <span className="font-mono text-[11px] text-amber-400">{selectedItem.url}</span></p>
              <p><strong className="text-slate-400">Size:</strong> {(selectedItem.sizeBytes / 1024).toFixed(1)} KB</p>
              <p><strong className="text-slate-400">Uploaded by:</strong> {selectedItem.uploadedBy || 'Admin'}</p>
              <p><strong className="text-slate-400">Date:</strong> {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => handleDelete(selectedItem.id)}
                className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs"
              >
                Delete File
              </button>
              <button
                onClick={() => copyUrl(selectedItem.url)}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs"
              >
                Copy Public URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
