const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HEIGHTS = [50, 80, 45, 100, 65, 30, 20];

export default function SparkChart() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        {DAYS.map(d => (
          <span key={d} style={{ fontSize: 11, color: 'var(--ink-3)' }}>{d}</span>
        ))}
      </div>
      <div className="spark">
        {HEIGHTS.map((h, i) => (
          <div
            key={i}
            className={`spark-b${i === 3 ? ' pk' : ''}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="micro-stats">
        <div className="ms">
          <div className="ms-val" style={{ color: 'var(--amber-mid)' }}>12.5%</div>
          <div className="ms-lbl">Fraud Rate</div>
        </div>
        <div className="ms">
          <div className="ms-val" style={{ color: 'var(--green-mid)' }}>94.2%</div>
          <div className="ms-lbl">AI Accuracy</div>
        </div>
      </div>
    </>
  );
}
