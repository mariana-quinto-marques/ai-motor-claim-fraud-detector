'use client';

import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | ReactNode;
  delta: ReactNode;
  colorClass?: string;
}

export default function StatCard({ label, value, delta, colorClass }: StatCardProps) {
  return (
    <div className="stat">
      <div className="stat-lbl">{label}</div>
      <div className={`stat-num${colorClass ? ` ${colorClass}` : ''}`}>{value}</div>
      <div className="stat-delta">{delta}</div>
    </div>
  );
}
