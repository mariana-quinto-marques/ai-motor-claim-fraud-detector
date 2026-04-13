interface PersonCellProps {
  init: string;
  color: string;
  name: string;
  sub: string;
}

export default function PersonCell({ init, color, name, sub }: PersonCellProps) {
  return (
    <div className="c-person">
      <div className="c-av" style={{ background: color }}>
        {init}
      </div>
      <div>
        <div className="c-name">{name}</div>
        <div className="c-sub">{sub}</div>
      </div>
    </div>
  );
}
