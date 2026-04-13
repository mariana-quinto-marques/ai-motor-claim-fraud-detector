'use client';

import { useApp } from '@/context/AppContext';
import type { PageId } from '@/context/AppContext';

const NAV_ITEMS: { id: PageId; label: string; icon: React.ReactNode; count?: string; countClass?: string }[] = [
  {
    id: 'dashboard',
    label: 'Overview',
    icon: (
      <svg className="sb-link-icon" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5.5" height="5.5" rx="1.2" fill="currentColor" />
        <rect x="8.5" y="2" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity=".4" />
        <rect x="2" y="8.5" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity=".4" />
        <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity=".4" />
      </svg>
    ),
  },
  {
    id: 'claims',
    label: 'All Claims',
    icon: (
      <svg className="sb-link-icon" viewBox="0 0 16 16" fill="none">
        <path d="M3 5h10M3 8h10M3 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    count: '24',
  },
  {
    id: 'fraud',
    label: 'Fraud Hub',
    icon: (
      <svg className="sb-link-icon" viewBox="0 0 16 16" fill="none">
        <path d="M8 2L14 5.2V9C14 12.2 11.4 14.8 8 16C4.6 14.8 2 12.2 2 9V5.2L8 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M5.5 8.5l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    count: '7',
    countClass: 'urg',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: (
      <svg className="sb-link-icon" viewBox="0 0 16 16" fill="none">
        <path d="M2 13.5V10l3-3 3 3 3-4.5 3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const { state, goPage, setFilter } = useApp();

  return (
    <aside className="sb">
      {/* Logo */}
      <div className="sb-top">
        <div className="sb-brand">
          <div className="sb-mark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v5c0 5.55 3.4 10.74 8 12 4.6-1.26 8-6.45 8-12V6l-8-4z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(255,255,255,.1)" />
              <path d="M7 14h10M7.5 14l1-3h7l1 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 11.5l.5-1.5h5l.5 1.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="14" r=".9" fill="white" />
              <circle cx="15" cy="14" r=".9" fill="white" />
            </svg>
          </div>
          <span className="sb-wordmark" style={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
            ClaimShield
          </span>
        </div>
        <div className="sb-tagline">Claims Intelligence</div>
        <div className="sb-rule" />
      </div>

      {/* Nav */}
      <div className="sb-scroll">
        <div className="sb-section">
          <div className="sb-section-lbl">Main</div>
        </div>
        <div className="sb-nav">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`sb-link${state.activePage === item.id ? ' on' : ''}`}
              onClick={() => goPage(item.id)}
            >
              {item.icon}
              {item.label}
              {item.count && (
                <span className={`sb-link-count${item.countClass ? ` ${item.countClass}` : ''}`}>
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="sb-hr" />

        <div className="sb-section">
          <div className="sb-section-lbl">Queues</div>
        </div>
        <div className="sb-nav">
          <div
            className="sb-link"
            onClick={() => {
              goPage('claims');
              setFilter('risk', 'HIGH');
            }}
          >
            <span className="sb-queue-dot" style={{ background: '#F5317F', boxShadow: '0 0 5px rgba(245,49,127,.5)' }} />
            High Risk
            <span className="sb-link-count urg">3</span>
          </div>
          <div
            className="sb-link"
            onClick={() => {
              goPage('claims');
              setFilter('risk', 'MEDIUM');
            }}
          >
            <span className="sb-queue-dot" style={{ background: '#FBB040' }} />
            Needs Review
            <span className="sb-link-count" style={{ background: 'rgba(251,176,64,.12)', color: '#FBB040' }}>4</span>
          </div>
          <div
            className="sb-link"
            onClick={() => {
              goPage('claims');
              setFilter('status', 'Approved');
            }}
          >
            <span className="sb-queue-dot" style={{ background: '#22C55E' }} />
            Approved
            <span className="sb-link-count" style={{ background: 'rgba(34,197,94,.1)', color: '#22C55E' }}>17</span>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="sb-bot">
        <div className="sb-user">
          <div className="sb-av">JR</div>
          <div className="sb-user-info">
            <div className="sb-uname">Jade Robinson</div>
            <div className="sb-urole">Senior Adjuster</div>
          </div>
          <svg className="sb-user-caret" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </aside>
  );
}
