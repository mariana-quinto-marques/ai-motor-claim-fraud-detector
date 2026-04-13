'use client';

import type { Claim } from '@/types/claim';

interface ActivityFeedProps {
  claims: Claim[];
  onSelect: (id: string) => void;
}

const FEED_ITEMS = [
  { id: 'CLM-2025-002', title: 'High risk flagged', sub: 'CLM-2025-002', init: 'PP', color: 'var(--red-mid)', time: '2m ago' },
  { id: 'CLM-2025-005', title: 'Location mismatch', sub: 'CLM-2025-005', init: 'KZ', color: 'var(--amber-mid)', time: '8m ago' },
  { id: 'CLM-2025-001', title: 'Clean claim', sub: 'CLM-2025-001', init: 'AK', color: 'var(--green-mid)', time: '14m ago' },
  { id: 'CLM-2025-006', title: 'Fire total loss', sub: 'CLM-2025-006', init: 'TR', color: 'var(--red-mid)', time: '22m ago' },
];

export default function ActivityFeed({ claims, onSelect }: ActivityFeedProps) {
  return (
    <div>
      {FEED_ITEMS.map(item => (
        <div key={item.id} className="feed-row" onClick={() => onSelect(item.id)}>
          <div className="feed-av" style={{ background: item.color }}>{item.init}</div>
          <div className="feed-body">
            <div className="feed-title">{item.title}</div>
            <div className="feed-sub">{item.sub}</div>
          </div>
          <div className="feed-time">{item.time}</div>
        </div>
      ))}
    </div>
  );
}
