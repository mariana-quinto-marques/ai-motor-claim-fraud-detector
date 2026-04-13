import type { Trigger } from '@/types/claim';

export default function TriggerLog({ triggers }: { triggers: Trigger[] }) {
  return (
    <div className="ai-trigger">
      <div className="ai-trigger-title">Analysis Triggers</div>
      {triggers.map((t, i) => (
        <div className="ai-trigger-row" key={i}>
          <div className="ai-t-dot" />
          <div>
            <div className="ai-t-ev">{t.e}</div>
            <div className="ai-t-note">{t.note}</div>
            <div className="ai-t-time">{t.t}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
