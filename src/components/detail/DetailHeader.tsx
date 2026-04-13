import type { Claim } from '@/types/claim';

export default function DetailHeader({ claim, onClose }: { claim: Claim; onClose: () => void }) {
  return (
    <div className="dp-hdr">
      <div className="dp-hdr-left">
        <div className="dp-id-row">
          <span className="dp-id">{claim.id}</span>
          <span className={`rb ${claim.risk}`}><span className="rb-dot" />{claim.risk} RISK</span>
          <span className={`st ${claim.status}`}>{claim.status}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div
            className="c-av"
            style={{ width: 36, height: 36, borderRadius: 9, fontSize: 13, flexShrink: 0, background: claim.color }}
          >
            {claim.init}
          </div>
          <div>
            <div className="dp-name">{claim.name}</div>
            <div className="dp-meta">{claim.type} &middot; {claim.loc} &middot; {claim.date}</div>
          </div>
        </div>
      </div>
      <div className="dp-close" onClick={onClose}>
        <svg viewBox="0 0 12 12" fill="none">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
