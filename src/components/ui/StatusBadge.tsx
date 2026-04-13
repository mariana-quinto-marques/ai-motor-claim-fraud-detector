interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`st ${status}`}>
      {status}
    </span>
  );
}
