'use client';

interface FilterBarProps {
  filter: { type: string; value: string | null };
  onFilter: (type: 'all' | 'risk' | 'status', value: string | null) => void;
}

export default function FilterBar({ filter, onFilter }: FilterBarProps) {
  const isOn = (t: string, v: string | null) => {
    if (t === 'all') return filter.type === 'all';
    return filter.type === t && filter.value === v;
  };

  return (
    <div className="frow">
      <button className={`fb${isOn('all', null) ? ' on' : ''}`} onClick={() => onFilter('all', null)}>
        All 24
      </button>
      <button className={`fb${isOn('risk', 'HIGH') ? ' on' : ''}`} onClick={() => onFilter('risk', 'HIGH')}>
        High Risk
      </button>
      <button className={`fb${isOn('risk', 'MEDIUM') ? ' on' : ''}`} onClick={() => onFilter('risk', 'MEDIUM')}>
        Medium
      </button>
      <button className={`fb${isOn('risk', 'LOW') ? ' on' : ''}`} onClick={() => onFilter('risk', 'LOW')}>
        Low Risk
      </button>
      <button className={`fb${isOn('status', 'Investigating') ? ' on' : ''}`} onClick={() => onFilter('status', 'Investigating')}>
        Investigating
      </button>
      <button className={`fb${isOn('status', 'Review') ? ' on' : ''}`} onClick={() => onFilter('status', 'Review')}>
        Review
      </button>
      <button className={`fb${isOn('status', 'Open') ? ' on' : ''}`} onClick={() => onFilter('status', 'Open')}>
        Open
      </button>
      <button className={`fb${isOn('status', 'Approved') ? ' on' : ''}`} onClick={() => onFilter('status', 'Approved')}>
        Approved
      </button>
      <div className="fspacer">
        <button className="ib">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7l6-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
