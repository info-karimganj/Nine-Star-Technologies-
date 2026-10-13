'use client';

import React, { useState, useEffect, useRef } from 'react';

interface HomeInteractiveClientProps {
  lang: string;
  contactEmail?: string;
}

export function HomeInteractiveClient({ lang, contactEmail = 'contact@9startechnologies.com' }: HomeInteractiveClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
  });

  const deckRef = useRef<HTMLDivElement>(null);

  // Parallax tilt on mouse move for the floating deck
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || window.innerWidth < 990) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = deck.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = (x / rect.width) * 10;
      const rotateX = -(y / rect.height) * 8;
      const track = deck.querySelector('.floating-deck-track') as HTMLElement;
      if (track) {
        track.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      }
    };

    const handleMouseLeave = () => {
      const track = deck.querySelector('.floating-deck-track') as HTMLElement;
      if (track) {
        track.style.transform = `rotateY(0deg) rotateX(0deg)`;
      }
    };

    deck.addEventListener('mousemove', handleMouseMove);
    deck.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      deck.removeEventListener('mousemove', handleMouseMove);
      deck.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Listen for clicks on any element with .trigger-audit-btn
  useEffect(() => {
    const handleTriggerClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.trigger-audit-btn');
      if (target) {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    document.addEventListener('click', handleTriggerClick);
    return () => document.removeEventListener('click', handleTriggerClick);
  }, []);

  // Keyboard accessibility: ESC closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Submit Audit Form directly to /api/admin/service-requests
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          projectGoal: `Free Growth & Tech Audit for ${formData.website || 'General Inquiry'}`,
          projectDetails: `Submitted via website audit modal for URL: ${formData.website}. Preferred language: ${lang}.`,
        }),
      });

      if (res.ok) {
        alert(
          lang === 'bn'
            ? 'ধন্যবাদ! আপনার অডিট রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে। আমাদের টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে।'
            : 'Thank you! Your audit request has been successfully received. Our senior engineering team will contact you within 24 hours.'
        );
        setFormData({ name: '', email: '', website: '' });
        setIsModalOpen(false);
      } else {
        alert(
          lang === 'bn'
            ? 'রিকোয়েস্ট পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
            : 'Failed to submit request. Please try again or email us directly.'
        );
      }
    } catch {
      alert(
        lang === 'bn'
          ? 'রিকোয়েস্ট পাঠানো সম্ভব হয়নি। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ চেক করুন।'
          : 'Network error. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 3D Curved Perspective Floating Card Deck (Signature Centerpiece) */}
      <div className="floating-deck-wrapper" ref={deckRef} aria-hidden="true">
        <div className="floating-deck-track">
          {/* Card 1: Growth Index Bar Chart */}
          <div className="deck-card deck-card-1">
            <div style={{ fontSize: '0.64rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Intelligence</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>Growth Index</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '75px', paddingTop: '10px' }}>
              <div style={{ flex: 1, background: '#93c5fd', height: '35%', borderRadius: '4px' }}></div>
              <div style={{ flex: 1, background: '#60a5fa', height: '55%', borderRadius: '4px' }}></div>
              <div style={{ flex: 1, background: '#3b82f6', height: '80%', borderRadius: '4px' }}></div>
              <div style={{ flex: 1, background: '#10b981', height: '100%', borderRadius: '4px' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.65rem', color: '#10b981', fontWeight: 700 }}>
              <span>+220%</span>
              <span>GEO v2.6</span>
            </div>
          </div>

          {/* Card 2: Pipeline Stats */}
          <div className="deck-card deck-card-2">
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b' }}>Pipeline Active</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBlock: '4px' }}>$4,900 <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 500 }}>/ $35M</span></div>
            <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '99px', marginBlock: '10px', overflow: 'hidden' }}>
              <div style={{ width: '78%', height: '100%', background: '#0b74f5' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.68rem', color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Maximum</span><span style={{ fontWeight: 700 }}>$100</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Optimized</span><span style={{ fontWeight: 700 }}>$85</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Conversion</span><span style={{ fontWeight: 700, color: '#10b981' }}>+44%</span></div>
            </div>
          </div>

          {/* Card 3: Human Portrait & Stats Pill */}
          <div className="deck-card deck-card-3">
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '16px' }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                alt="Consultant avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '10px', left: '8px', right: '8px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', padding: '8px 10px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.65rem', fontWeight: 700 }}>
                  <span style={{ color: '#0f172a' }}>$2,670</span>
                  <span style={{ color: '#10b981' }}>+$1,200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 (Center): "Intelligence in Every Decision" with Line Graph */}
          <div className="deck-card deck-card-4">
            <div style={{ fontSize: '0.66rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Intelligence in</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Every Decision</div>
            <svg width="100%" height="80" viewBox="0 0 140 70" fill="none" style={{ marginBlock: '4px' }}>
              <path d="M5 55 Q 35 48 55 35 T 100 20 T 135 8" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M5 55 Q 35 48 55 35 T 100 20 T 135 8 L 135 68 L 5 68 Z" fill="url(#blueChartGradNext)" opacity="0.25" />
              <circle cx="135" cy="8" r="4" fill="#0b74f5" />
              <defs>
                <linearGradient id="blueChartGradNext" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8"/>
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: '#94a3b8', fontWeight: 600 }}>
              <span>Week 1</span>
              <span>Week 4</span>
              <span>Live</span>
            </div>
          </div>

          {/* Card 5: Dark Obsidian Card */}
          <div className="deck-card deck-card-5">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>Expertise</span>
              <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--neon-lime)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', color: '#000', fontWeight: 900 }}>★</span>
            </div>
            <p style={{ fontSize: '0.76rem', fontWeight: 500, color: 'rgba(255,255,255,0.85)', lineHeight: 1.45, marginBottom: '14px' }}>
              Combines Strategy, Data, and Artificial Intelligence
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--neon-lime)', fontWeight: 700 }}>9STAR AI Core</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--neon-lime)" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>

          {/* Card 6: Frosted Glass Sky Card */}
          <div className="deck-card deck-card-6">
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', fontWeight: 700, fontSize: '1.1rem' }}>
              +
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.25, marginBottom: '6px' }}>
              Data training
            </div>
            <div style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.4 }}>
              Upload your custom dataset
            </div>
            <div style={{ marginTop: '24px', fontSize: '0.65rem', fontWeight: 700, color: 'var(--neon-lime)' }}>
              ● Ready to sync
            </div>
          </div>

          {/* Card 7: White Metric Card */}
          <div className="deck-card deck-card-7">
            <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Scale Metric</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>520k+</div>
            <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '4px', lineHeight: 1.35 }}>Data points analyzed monthly.</div>
            <div style={{ marginTop: '16px', padding: '6px 8px', borderRadius: '8px', background: '#f1f5f9', fontSize: '0.65rem', fontWeight: 700, color: '#0b74f5', textAlign: 'center' }}>
              Predictive Mode
            </div>
          </div>

          {/* Card 8: Mobile Conversion Card */}
          <div className="deck-card deck-card-8">
            <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#64748b' }}>Conversion</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>49% ↗</div>
            <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: '4px' }}>Lead velocity jump across organic search.</div>
          </div>
        </div>
      </div>

      {/* Social Proof Rating */}
      <div className="hero-social-proof">
        <span className="rating-text">
          {lang === 'bn' ? '৪,৯০০+ ক্লায়েন্টদের দ্বারা রেটিং ৪.৯/৫' : 'Rated 4.9/5 by 4,900+ clients'}
        </span>
        <div className="rating-stars" aria-label="5 stars rating">★★★★★</div>
      </div>

      {/* Audit Modal (Connected directly to /api/admin/service-requests & Supabase) */}
      {isModalOpen && (
        <div
          className="modal-backdrop active"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>

            <span className="service-index-badge" style={{ marginBottom: '12px', display: 'inline-block' }}>
              {lang === 'bn' ? 'ফ্রি স্ট্র্যাটেজি সেশন' : 'FREE STRATEGY SESSION'}
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 700, color: 'var(--obsidian-900)', marginBottom: '10px', lineHeight: 1.25 }}>
              {lang === 'bn' ? 'আপনার ফ্রি টেক ও গ্রোথ অডিট নিন' : 'Get Your Free Tech & Growth Audit'}
            </h3>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', marginBottom: '28px', lineHeight: 1.6 }}>
              {lang === 'bn'
                ? 'নিচে আপনার তথ্য দিন এবং আমাদের টিম ২৪ ঘণ্টার মধ্যে আপনার ওয়েবসাইট, এসইও এবং টেক স্ট্যাক বিশ্লেষণ করবে।'
                : 'Leave your details below and our senior growth architects will inspect your digital stack, SEO, and speed benchmarks within 24 hours.'}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  {lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Your Full Name'}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={lang === 'bn' ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {lang === 'bn' ? 'কাজের ইমেইল' : 'Work Email'}
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@company.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {lang === 'bn' ? 'ওয়েবসাইট / কোম্পানির লিঙ্ক' : 'Website / Company URL'}
                </label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://yourcompany.com"
                  required
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-neon"
                style={{ width: '100%', paddingBlock: '16px', marginTop: '10px', fontSize: '0.95rem' }}
              >
                <span>{isSubmitting ? (lang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Submitting...') : (lang === 'bn' ? 'অডিট রিকোয়েস্ট পাঠান' : 'Submit Audit Request')}</span>
                <span className="arrow-circle">↗</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
