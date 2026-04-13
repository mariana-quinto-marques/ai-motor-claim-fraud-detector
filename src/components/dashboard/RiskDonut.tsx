'use client';

interface RiskDonutProps {
  low: number;
  medium: number;
  high: number;
}

export default function RiskDonut({ low, medium, high }: RiskDonutProps) {
  const total = low + medium + high;
  const circ = 2 * Math.PI * 34; // ~213.6

  const lowArc = (low / total) * circ;
  const medArc = (medium / total) * circ;
  const highArc = (high / total) * circ;

  const lowOffset = 0;
  const medOffset = lowArc;
  const highOffset = lowArc + medArc;

  const pct = (n: number) => Math.round((n / total) * 100);

  return (
    <div className="donut-wrap">
      <svg width="90" height="90" viewBox="0 0 90 90">
        {/* Green — Low */}
        <circle
          cx="45" cy="45" r="34"
          fill="none"
          stroke="var(--green-mid)"
          strokeWidth="10"
          strokeDasharray={`${lowArc} ${circ - lowArc}`}
          strokeDashoffset={-lowOffset}
          transform="rotate(-90 45 45)"
        />
        {/* Amber — Medium */}
        <circle
          cx="45" cy="45" r="34"
          fill="none"
          stroke="var(--amber-mid)"
          strokeWidth="10"
          strokeDasharray={`${medArc} ${circ - medArc}`}
          strokeDashoffset={-medOffset}
          transform="rotate(-90 45 45)"
        />
        {/* Red — High */}
        <circle
          cx="45" cy="45" r="34"
          fill="none"
          stroke="var(--red-mid)"
          strokeWidth="10"
          strokeDasharray={`${highArc} ${circ - highArc}`}
          strokeDashoffset={-highOffset}
          transform="rotate(-90 45 45)"
        />
      </svg>
      <div className="donut-leg">
        <div className="leg-row">
          <span className="leg-dot" style={{ background: 'var(--green-mid)' }} />
          <span className="leg-lbl">Low</span>
          <span className="leg-num">{low}<span className="leg-pct"> {pct(low)}%</span></span>
        </div>
        <div className="leg-row">
          <span className="leg-dot" style={{ background: 'var(--amber-mid)' }} />
          <span className="leg-lbl">Medium</span>
          <span className="leg-num">{medium}<span className="leg-pct"> {pct(medium)}%</span></span>
        </div>
        <div className="leg-row">
          <span className="leg-dot" style={{ background: 'var(--red-mid)' }} />
          <span className="leg-lbl">High</span>
          <span className="leg-num">{high}<span className="leg-pct"> {pct(high)}%</span></span>
        </div>
      </div>
    </div>
  );
}
