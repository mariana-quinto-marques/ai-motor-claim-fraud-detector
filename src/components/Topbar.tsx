'use client';

import { useApp } from '@/context/AppContext';

export default function Topbar() {
  const { pageMeta, search, toast } = useApp();
  const [title, subtitle] = pageMeta;

  return (
    <div className="topbar">
      <div className="tb-left">
        <span className="tb-title">{title}</span>
        <span className="tb-sep">/</span>
        <span className="tb-sub">{subtitle}</span>
      </div>
      <div className="tb-right">
        <div className="search-box">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--ink-4)', flexShrink: 0 }}>
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, ID, policy..."
            onInput={(e) => search((e.target as HTMLInputElement).value)}
          />
        </div>
        <button className="ib" onClick={() => toast('No new notifications')}>
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M8 2C6 2 4.5 3.5 4.5 5.5v4L3 12h10l-1.5-2.5v-4C11.5 3.5 10 2 8 2Z" stroke="currentColor" strokeWidth="1.4" />
            <path d="M6.5 13.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <div className="ai-chip">
          <div className="ai-chip-dot" />
          AI Active
        </div>
      </div>
    </div>
  );
}
