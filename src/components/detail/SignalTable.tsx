import type { Signal } from '@/types/claim';

interface SignalTableProps {
  signals: Signal[];
}

export default function SignalTable({ signals }: SignalTableProps) {
  return (
    <table className="ai-sig-table">
      <thead>
        <tr>
          <th>Signal</th>
          <th>Finding</th>
          <th>Conf.</th>
          <th>Verdict</th>
        </tr>
      </thead>
      <tbody>
        {signals.map((s, i) => (
          <tr key={i}>
            <td style={{ padding: '9px 8px 9px 0' }}>
              <div className="ast-signal">{s.sig}</div>
              <div className="ast-source">{s.src}</div>
            </td>
            <td style={{ padding: '9px 8px' }}><div className="ast-finding">{s.finding}</div></td>
            <td style={{ padding: '9px 8px' }}><span className="ast-conf">{s.conf}</span></td>
            <td style={{ padding: '9px 0', textAlign: 'right' }}>
              <span className={`ast-verdict ${s.v}`}><span className="ast-vdot" />{s.v === 'ok' ? 'Clear' : s.v === 'warn' ? 'Review' : 'Flagged'}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
