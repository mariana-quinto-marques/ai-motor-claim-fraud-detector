'use client';

import { useApp } from '@/context/AppContext';
import DetailHeader from './DetailHeader';
import RecommendationBanner from './RecommendationBanner';
import DetailLeftSide from './DetailLeftSide';
import DetailRightSide from './DetailRightSide';
import ActionFooter from './ActionFooter';

export default function ClaimDetailPanel() {
  const { selectedClaim, selectClaim } = useApp();
  const open = selectedClaim !== null;

  return (
    <>
      <div className={`ov${open ? ' on' : ''}`} onClick={() => selectClaim(null)} />
      <div className={`dp${open ? ' on' : ''}`}>
        {selectedClaim && (
          <>
            <DetailHeader claim={selectedClaim} onClose={() => selectClaim(null)} />
            <RecommendationBanner claim={selectedClaim} />
            <div className="dp-body">
              <div className="dp-left">
                <DetailLeftSide claim={selectedClaim} />
              </div>
              <DetailRightSide claim={selectedClaim} />
            </div>
            <ActionFooter claimId={selectedClaim.id} />
          </>
        )}
      </div>
    </>
  );
}
