import type { Claim } from '@/types/claim';
import ScoreRing from './ScoreRing';
import TriggerLog from './TriggerLog';
import SignalTable from './SignalTable';

export default function DetailRightSide({ claim }: { claim: Claim }) {
  const s = claim.score;
  const rColor = s > 65 ? 'var(--red-mid)' : s > 35 ? 'var(--amber-mid)' : 'var(--green-mid)';
  const verdictDesc = s > 65
    ? 'Do not process without SIU review.'
    : s > 35
    ? 'Verification required before authorising.'
    : 'Standard processing pathway cleared.';

  const now = new Date();
  const dateFmt = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeFmt = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="dp-right">
      <div className="ai-header">
        <div className="ai-header-top">
          <div className="ai-header-label">
            <div className="ai-header-icon">
              <svg viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity=".35" />
                <circle cx="8" cy="8" r="1" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="ai-header-title">Fraud Detection Analysis</div>
              <div className="ai-header-sub">Completed · {dateFmt} · {timeFmt}</div>
            </div>
          </div>
        </div>
        <div className="ai-score-wrap">
          <ScoreRing score={s} risk={claim.risk} />
          <div style={{ flex: 1 }}>
            <div className={`ai-verdict ${claim.risk}`}>{claim.risk} RISK</div>
            <div className="ai-verdict-desc">{verdictDesc}</div>
            <div className="ai-score-bar-wrap" style={{ marginTop: 10 }}>
              <div className="ai-score-bar-track">
                <div className="ai-score-bar-fill" style={{ width: `${s}%`, background: rColor }} />
              </div>
              <div className="ai-score-bar-labels">
                <span>0 — Low</span><span>50</span><span>100 — High</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TriggerLog triggers={claim.triggers} />

      <div className="ai-signals-section">
        <div className="ai-sig-table-hd">Signal Analysis — Data Points Examined</div>
        <SignalTable signals={claim.signals} />
      </div>

      <div className="ai-reasoning-section">
        <div className="ai-reasoning-box">
          <div className="ai-reasoning-lbl">Model Reasoning</div>
          <div className="ai-reasoning-txt">{claim.reasoning}</div>
        </div>
      </div>

      <div className="ai-model-badge">
        <span className="ai-model-lbl">ClaimShield Fraud Model v2.4</span>
        <span className="ai-model-val">Run: {now.toISOString().slice(0, 19).replace('T', ' ')}</span>
      </div>
    </div>
  );
}
