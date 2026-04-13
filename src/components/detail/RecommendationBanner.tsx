import type { Claim } from '@/types/claim';

export default function RecommendationBanner({ claim }: { claim: Claim }) {
  const iconColor = claim.recoBanner === 'b-red' ? 'var(--red-mid)'
    : claim.recoBanner === 'b-amber' ? 'var(--amber-mid)'
    : 'var(--green-mid)';

  return (
    <div className={`reco-banner ${claim.recoBanner}`}>
      <div className="reco-banner-inner">
        <div className="reco-icon">
          <svg viewBox="0 0 16 16" fill="none" style={{ color: iconColor }}>
            <path d="M8 2L14 5.2V9C14 12.2 11.4 14.8 8 16C4.6 14.8 2 12.2 2 9V5.2L8 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="reco-lbl">{claim.recoLabel}</div>
          <div className="reco-text">{claim.recoText}</div>
          <div className="reco-sub">{claim.recoSub}</div>
        </div>
      </div>
    </div>
  );
}
