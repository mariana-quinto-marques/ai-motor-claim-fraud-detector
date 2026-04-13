interface RiskBadgeProps {
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export default function RiskBadge({ risk }: RiskBadgeProps) {
  return (
    <span className={`rb ${risk}`}>
      <span className="rb-dot"></span>
      {risk}
    </span>
  );
}
