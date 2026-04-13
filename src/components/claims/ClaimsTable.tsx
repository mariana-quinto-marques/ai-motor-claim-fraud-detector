'use client';

import type { Claim } from '@/types/claim';
import PersonCell from '@/components/ui/PersonCell';
import RiskBadge from '@/components/ui/RiskBadge';
import ScoreCell from '@/components/ui/ScoreCell';
import SlaBadge from '@/components/ui/SlaBadge';
import StatusBadge from '@/components/ui/StatusBadge';

interface ClaimsTableProps {
  claims: Claim[];
  onSelect: (id: string) => void;
}

export default function ClaimsTable({ claims, onSelect }: ClaimsTableProps) {
  return (
    <table className="tbl">
      <thead>
        <tr>
          <th>ID</th>
          <th>Claimant</th>
          <th>Type</th>
          <th>Date</th>
          <th>Risk</th>
          <th>Score</th>
          <th>SLA</th>
          <th>Status</th>
          <th>Action Required</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {claims.map(c => (
          <tr key={c.id} onClick={() => onSelect(c.id)}>
            <td><span className="c-id">{c.id}</span></td>
            <td>
              <PersonCell init={c.init} color={c.color} name={c.name} sub={c.policy} />
            </td>
            <td>{c.type}</td>
            <td><span className="c-date">{c.date}</span></td>
            <td><RiskBadge risk={c.risk} /></td>
            <td><ScoreCell score={c.score} /></td>
            <td><SlaBadge sla={c.sla} label={c.slaLabel} /></td>
            <td><StatusBadge status={c.status} /></td>
            <td><span className="ar">{c.action}</span></td>
            <td><span className="tbl-cta">Open</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
