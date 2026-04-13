interface SignalBadgeProps {
  verdict: 'ok' | 'warn' | 'flag';
  finding: string;
}

const LABEL_MAP: Record<string, string> = {
  ok: 'Clear',
  warn: 'Review',
  flag: 'Flagged',
};

export default function SignalBadge({ verdict, finding }: SignalBadgeProps) {
  return (
    <span className={`sig-badge ${verdict}`} data-tip={finding}>
      {LABEL_MAP[verdict]}
    </span>
  );
}
