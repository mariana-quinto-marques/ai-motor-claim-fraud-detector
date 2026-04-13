'use client';

import { useApp } from '@/context/AppContext';

interface ActionFooterProps {
  claimId: string;
}

export default function ActionFooter({ claimId }: ActionFooterProps) {
  const { updateClaimStatus } = useApp();

  return (
    <div className="dp-foot">
      <button className="btn btn-grn" onClick={() => updateClaimStatus(claimId, 'Approved')}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Approve Claim
      </button>
      <button className="btn btn-ghost" onClick={() => updateClaimStatus(claimId, 'Review')}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Send for Review
      </button>
      <button className="btn btn-dark" onClick={() => updateClaimStatus(claimId, 'Investigating')}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 12V4M8 4L4.5 7.5M8 4L11.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Escalate to SIU
      </button>
      <button className="btn btn-danger" onClick={() => updateClaimStatus(claimId, 'Rejected')}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Reject
      </button>
    </div>
  );
}
