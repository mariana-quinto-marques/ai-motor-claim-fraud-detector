'use client';

import { useApp } from '@/context/AppContext';
import RiskBadge from '@/components/ui/RiskBadge';
import StatusBadge from '@/components/ui/StatusBadge';
import ScoreCell from '@/components/ui/ScoreCell';
import PersonCell from '@/components/ui/PersonCell';
import BarChart from './BarChart';
import SparkChart from './SparkChart';

const FRAUD_TYPES = [
  { label: 'Policy velocity (new policy claim)', value: 43, color: 'var(--pink)', valueColor: 'var(--red-mid)' },
  { label: 'Staged accidents / phantom third party', value: 28, color: 'var(--amber-mid)', valueColor: 'var(--amber-mid)' },
  { label: 'Inflated repair estimates', value: 19, color: 'var(--amber-mid)', valueColor: 'var(--amber-mid)' },
  { label: 'Pre-existing damage claimed', value: 10, color: 'var(--ink-4)', valueColor: 'var(--ink-3)' },
];

export default function FraudHubPage() {
  const { state, selectClaim } = useApp();
  const flagged = state.claims.filter(c => c.risk !== 'LOW');

  return (
    <>
      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="stat">
          <div className="stat-lbl">Fraud Detected (30d)</div>
          <div className="stat-num c-pink">7</div>
          <div className="stat-delta"><span className="d-neg">+2</span> vs prior month</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Avg Risk Score</div>
          <div className="stat-num c-amber">38</div>
          <div className="stat-delta"><span className="d-pos">−4</span> improving trend</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Fraud Prevented</div>
          <div className="stat-num c-green">£41k</div>
          <div className="stat-delta">prevented payouts this month</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-hd"><span className="card-title">Fraud Type Breakdown</span></div>
          <div className="card-body">
            <BarChart items={FRAUD_TYPES} />
          </div>
        </div>
        <div className="card">
          <div className="card-hd"><span className="card-title">Weekly Claim Volume</span></div>
          <div className="card-body">
            <SparkChart />
          </div>
        </div>
      </div>

      <div className="sec-label">Flagged Claims Requiring Action</div>
      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>ID</th><th>Claimant</th><th>Type</th><th>Date</th>
              <th>Risk</th><th>Score</th><th>Status</th><th>Action Required</th><th></th>
            </tr>
          </thead>
          <tbody>
            {flagged.map(c => (
              <tr key={c.id} onClick={() => selectClaim(c.id)}>
                <td><span className="c-id">{c.id}</span></td>
                <td><PersonCell init={c.init} color={c.color} name={c.name} sub={c.policy} /></td>
                <td><span style={{ fontSize: '12.5px', color: 'var(--ink-2)', fontWeight: 500 }}>{c.type}</span></td>
                <td><span className="c-date">{c.date}</span></td>
                <td><RiskBadge risk={c.risk} /></td>
                <td><ScoreCell score={c.score} /></td>
                <td><StatusBadge status={c.status} /></td>
                <td><span className="ar" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{c.action}</span></td>
                <td><span className="tbl-cta">Open</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
