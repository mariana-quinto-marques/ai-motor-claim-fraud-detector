import type { RiskLevel } from '@/types/claim';

interface ScoreRingProps {
  score: number;
  risk: RiskLevel;
}

export default function ScoreRing({ score }: ScoreRingProps) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = score > 65 ? 'var(--red-mid)' : score > 35 ? 'var(--amber-mid)' : 'var(--green-mid)';

  return (
    <div className="ai-ring">
      <svg width={80} height={80} viewBox="0 0 80 80">
        <circle cx={40} cy={40} r={r} fill="none" stroke="var(--ink-5)" strokeWidth={8} />
        <circle
          cx={40}
          cy={40}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
      </svg>
      <span className="ai-ring-num">{score}</span>
    </div>
  );
}
