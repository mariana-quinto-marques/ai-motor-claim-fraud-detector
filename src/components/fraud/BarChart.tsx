interface BarItem {
  label: string;
  value: number;
  color: string;
  valueColor?: string;
}

export default function BarChart({ items }: { items: BarItem[] }) {
  return (
    <div className="bar-chart">
      {items.map((item, i) => (
        <div className="bc-row" key={i}>
          <div className="bc-lbl">
            <span className="bc-lbl-t">{item.label}</span>
            <span className="bc-lbl-v" style={{ color: item.valueColor }}>{item.value}%</span>
          </div>
          <div className="bc-tr">
            <div className="bc-fill" style={{ width: `${item.value}%`, background: item.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
