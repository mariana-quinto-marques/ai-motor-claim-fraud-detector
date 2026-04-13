'use client';

import { useApp } from '@/context/AppContext';
import StatCard from './StatCard';
import RiskDonut from './RiskDonut';
import ActivityFeed from './ActivityFeed';
import PersonCell from '@/components/ui/PersonCell';
import RiskBadge from '@/components/ui/RiskBadge';
import ScoreCell from '@/components/ui/ScoreCell';
import SlaBadge from '@/components/ui/SlaBadge';
import StatusBadge from '@/components/ui/StatusBadge';

export default function DashboardPage() {
  const { state, selectClaim, goPage } = useApp();
  const top5 = state.claims.slice(0, 5);

  const lowCount = state.claims.filter(c => c.risk === 'LOW').length;
  const medCount = state.claims.filter(c => c.risk === 'MEDIUM').length;
  const highCount = state.claims.filter(c => c.risk === 'HIGH').length;

  return (
    <div>
      {/* Stat Cards */}
      <div className="stats">
        <StatCard
          label="Active Claims"
          value="24"
          delta={<><span className="d-pos">+3</span> this week</>}
          colorClass="c-pink"
        />
        <StatCard
          label="Awaiting Action"
          value="7"
          delta={<><span className="d-neg">+2</span> since yesterday</>}
          colorClass="c-red"
        />
        <StatCard
          label="Avg Resolution"
          value="4.2d"
          delta={<><span className="d-pos">-0.8d</span> vs last month</>}
          colorClass="c-green"
        />
        <StatCard
          label="Fraud Prevented"
          value={<>&pound;41k</>}
          delta={<><span className="d-pos">+12%</span> this quarter</>}
        />
      </div>

      {/* Grid: Recent Claims + Side Column */}
      <div className="grid-main">
        {/* Recent Claims Table */}
        <div className="card">
          <div className="card-hd">
            <span className="card-title">Recent Claims</span>
            <span className="card-act" onClick={() => goPage('claims')}>View all</span>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>ID</th>
                <th>Claimant</th>
                <th>Type</th>
                <th>Risk</th>
                <th>Score</th>
                <th>SLA</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {top5.map(c => (
                <tr key={c.id} onClick={() => selectClaim(c.id)}>
                  <td><span className="c-id">{c.id}</span></td>
                  <td>
                    <PersonCell init={c.init} color={c.color} name={c.name} sub={c.policy} />
                  </td>
                  <td>{c.type}</td>
                  <td><RiskBadge risk={c.risk} /></td>
                  <td><ScoreCell score={c.score} /></td>
                  <td><SlaBadge sla={c.sla} label={c.slaLabel} /></td>
                  <td><StatusBadge status={c.status} /></td>
                  <td><span className="tbl-cta">Open</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Risk Distribution Donut */}
          <div className="card">
            <div className="card-hd">
              <span className="card-title">Risk Distribution</span>
            </div>
            <div className="card-body">
              <RiskDonut low={lowCount} medium={medCount} high={highCount} />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card">
            <div className="card-hd">
              <span className="card-title">Activity Feed</span>
            </div>
            <ActivityFeed claims={state.claims} onSelect={selectClaim} />
          </div>
        </div>
      </div>
    </div>
  );
}
