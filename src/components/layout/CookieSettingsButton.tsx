'use client';

import React from 'react';

export function CookieSettingsButton({ label = 'Cookie Settings' }: { label?: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('9star_open_cookie_preferences'));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="footer-link text-small text-left hover:underline cursor-pointer bg-transparent border-0 p-0 text-[var(--color-text-muted)]"
      style={{ color: 'var(--color-text-muted)' }}
    >
      {label}
    </button>
  );
}
