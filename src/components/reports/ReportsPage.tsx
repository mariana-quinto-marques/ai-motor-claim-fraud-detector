const CLAIM_TYPES = [
  { name: 'Collision', count: 11, pct: 100, color: 'var(--ink-2)' },
  { name: 'Theft', count: 5, pct: 45, color: 'var(--pink)' },
  { name: 'Vandalism', count: 3, pct: 27, color: 'var(--amber-mid)' },
  { name: 'Fire', count: 2, pct: 18, color: 'var(--red-mid)' },
  { name: 'Windscreen', count: 3, pct: 27, color: 'var(--green-mid)' },
];

export default function ReportsPage() {
  return (
    <div className="grid-2">
      <div className="card">
        <div className="card-hd"><span className="card-title">Monthly Performance</span></div>
        <div className="card-body">
          <div className="perf-row">
            <div className="perf-cell">
              <div className="pv" style={{ color: 'var(--green-mid)' }}>94.2%</div>
              <div className="pl">AI Accuracy</div>
            </div>
            <div className="perf-cell">
              <div className="pv" style={{ color: 'var(--pink)' }}>4.2d</div>
              <div className="pl">Avg Resolution</div>
            </div>
            <div className="perf-cell">
              <div className="pv" style={{ color: 'var(--amber-mid)' }}>£41k</div>
              <div className="pl">Fraud Blocked</div>
            </div>
            <div className="perf-cell">
              <div className="pv">97%</div>
              <div className="pl">CSAT Score</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-hd"><span className="card-title">Claims by Type — 30 days</span></div>
        <div className="card-body">
          {CLAIM_TYPES.map(ct => (
            <div className="type-row" key={ct.name}>
              <span className="type-name">{ct.name}</span>
              <span className="type-count">{ct.count}</span>
              <div className="type-tr">
                <div className="type-fill" style={{ width: `${ct.pct}%`, background: ct.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
