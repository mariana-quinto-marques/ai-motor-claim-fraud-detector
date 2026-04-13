interface SlaBadgeProps {
  sla: 'ok' | 'warn' | 'breach';
  label: string;
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1L13 13H1L7 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 6v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="11" r="0.5" fill="currentColor" />
    </svg>
  );
}

export default function SlaBadge({ sla, label }: SlaBadgeProps) {
  return (
    <span className={`sla ${sla}`}>
      {sla === 'breach' ? <WarningIcon /> : <ClockIcon />}
      {label}
    </span>
  );
}
