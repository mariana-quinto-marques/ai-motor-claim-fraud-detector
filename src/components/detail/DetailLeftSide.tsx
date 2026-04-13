'use client';

import { useState } from 'react';
import type { Claim, Signal } from '@/types/claim';
import SignalBadge from '@/components/ui/SignalBadge';

function getSig(sigKey: string, signals: Signal[]) {
  return signals.find(s => s.sig === sigKey) || null;
}

function SigBadgeInline({ sigKey, signals }: { sigKey: string; signals: Signal[] }) {
  const s = getSig(sigKey, signals);
  if (!s) return null;
  return <SignalBadge verdict={s.v} finding={s.finding} />;
}

function Field({
  label, value, valueClass, full, sigKey, signals,
}: {
  label: string;
  value: React.ReactNode;
  valueClass?: string;
  full?: boolean;
  sigKey?: string;
  signals?: Signal[];
}) {
  return (
    <div className={`ds-field${full ? ' full' : ''}`}>
      <div className="ds-field-lbl">
        <span className="ds-lbl">{label}</span>
        {sigKey && signals && <SigBadgeInline sigKey={sigKey} signals={signals} />}
      </div>
      <div className={`ds-val${valueClass ? ` ${valueClass}` : ''}`}>{value ?? '—'}</div>
    </div>
  );
}

export default function DetailLeftSide({ claim }: { claim: Claim }) {
  const [note, setNote] = useState('');
  const s = claim.signals;
  const ageClass = claim.policyAge < 30 ? 'danger' : claim.policyAge < 60 ? 'warn' : 'good';

  const photoCells = Array.from({ length: Math.max(claim.photos, 4) }, (_, i) =>
    i < claim.photos ? (
      <div key={i} className="ev-cell has-img" title={`Photo ${i + 1}`}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--ink-3)' }}>
          <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </div>
    ) : (
      <div key={i} className="ev-cell">
        <span style={{ color: 'var(--ink-5)', fontSize: 9, fontWeight: 600 }}>—</span>
      </div>
    )
  );

  const narrSig = getSig('Narrative Consistency', s);
  const photoSig = getSig('Photo Evidence', s);

  return (
    <>
      {/* Policyholder */}
      <div className="sec-hd">Policyholder</div>
      <div className="ds-card"><div className="ds-grid">
        <Field label="Full name" value={claim.name} />
        <Field label="Date of birth" value={claim.dob} />
        <Field label="Phone" value={claim.phone} valueClass="mono" />
        <Field label="Email" value={claim.email} valueClass="sm" />
        <Field label="Policy number" value={claim.policy} valueClass="mono" />
        <Field label="Policy age at claim" value={`${claim.policyAge} days${claim.policyAge < 30 ? ' · CRITICAL' : ''}`} valueClass={ageClass} sigKey="Policy Velocity" signals={s} />
        <Field label="Prior claims" value={`${claim.prior} claim${claim.prior !== 1 ? 's' : ''}`} valueClass={claim.prior > 1 ? 'warn' : undefined} sigKey="Claim History" signals={s} />
        <Field label="SLA" value={claim.slaLabel} valueClass={claim.sla === 'breach' ? 'danger' : claim.sla === 'warn' ? 'warn' : 'good'} />
      </div></div>

      {/* Incident */}
      <div className="sec-hd">Incident</div>
      <div className="ds-card"><div className="ds-grid">
        <Field label="Type" value={claim.type} />
        <Field label="Date & time" value={`${claim.date} · ${claim.time || '—'}`} valueClass="mono" />
        <Field label="Location" value={claim.loc} valueClass="sm" sigKey="Location Verification" signals={s} />
        <Field label="Road type" value={claim.roadType} />
        <Field label="Weather" value={claim.weather} sigKey="Location Verification" signals={s} />
        <Field label="Road condition" value={claim.roadCondition} />
      </div></div>

      {/* What Happened */}
      <div className="sec-hd">What Happened</div>
      <div className="ds-narrative">
        {claim.desc}
        {narrSig && (
          <span style={{ marginLeft: 6, verticalAlign: 'middle' }}>
            <SignalBadge verdict={narrSig.v} finding={narrSig.finding} />
          </span>
        )}
      </div>

      {/* Vehicle & Damage */}
      <div className="sec-hd">Vehicle &amp; Damage</div>
      <div className="ds-card"><div className="ds-grid">
        <Field label="Vehicle" value={claim.vehicleDesc} valueClass="mono" />
        <Field label="Damage estimate" value={`£${claim.est.toLocaleString()}`} sigKey="Repair Estimate" signals={s} />
        <Field label="Driveable" value={
          claim.driveable
            ? <span className="chip-yes-good">Yes</span>
            : <span className="chip-no-bad">No</span>
        } />
        <Field label="Injuries" value={
          claim.injuries
            ? <span className="chip-yes-bad">Reported</span>
            : <span className="chip-no-good">None</span>
        } />
        <Field label="Vehicle location" value={claim.vehicleLocation} valueClass="sm" />
        <Field label="What was damaged" value={claim.damageItems} valueClass="sm" />
        <Field label="Damage description" value={claim.damageDesc || '—'} valueClass="sm" full sigKey="Narrative Consistency" signals={s} />
      </div></div>

      {/* Police & Reference */}
      <div className="sec-hd">Police &amp; Reference</div>
      <div className="ds-card"><div className="ds-grid">
        <Field label="Police attended" value={claim.police ? 'Yes' : 'Not reported'} valueClass={claim.police ? undefined : 'warn'} />
        <Field label="Reference number" value={claim.police || 'None provided'} valueClass={claim.police ? 'mono' : 'muted'} />
      </div></div>

      {/* Third Party */}
      <div className="sec-hd">Third Party</div>
      <div className="ds-card"><div className="ds-grid">
        {claim.tp ? (
          <>
            <Field label="Full name" value={claim.tpName} />
            <Field label="Phone" value={claim.tpPhone} valueClass="mono" />
            <Field label="Registration" value={claim.tpReg} valueClass="mono" sigKey="Third Party Traceability" signals={s} />
            <Field label="Insurer" value={claim.tpInsurer} />
            <Field label="Vehicle" value={claim.tpVehicle} valueClass="sm" sigKey="Third Party Traceability" signals={s} />
            <Field label="Witness" value={claim.witName ? `${claim.witName} · ${claim.witPhone}` : 'None provided'} valueClass={claim.witName ? 'sm' : 'muted'} />
          </>
        ) : (
          <Field label="Involved" value="None" valueClass="muted" full />
        )}
      </div></div>

      {/* Evidence */}
      <div className="sec-hd">Evidence</div>
      <div className="ds-card" style={{ padding: '14px 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>
            {claim.photos} photo{claim.photos !== 1 ? 's' : ''} uploaded
          </span>
          {photoSig && <SignalBadge verdict={photoSig.v} finding={photoSig.finding} />}
        </div>
        <div className="evidence-grid">
          {claim.photos > 0 ? photoCells : (
            <div style={{ color: 'var(--ink-3)', fontSize: 12, gridColumn: 'span 4' }}>No photos uploaded</div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="sec-hd">Timeline</div>
      <div className="ds-card" style={{ padding: '14px 16px 4px' }}>
        <div className="tl">
          {claim.timeline.map((ev, i) => (
            <div className="tl-row" key={i}>
              <div className={`tl-dot ${ev.c}`} />
              <div className="tl-con">
                <div className="tl-ev">{ev.e}</div>
                <div className="tl-time">{ev.t}</div>
                {ev.n && <div className="tl-note">{ev.n}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Handler Notes */}
      <div className="sec-hd">Handler Notes</div>
      <textarea
        className="notes-area"
        rows={3}
        placeholder="Add case notes, actions taken, decisions made…"
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <button className="btn btn-ghost" style={{ fontSize: 12, padding: '6px 12px' }} onClick={() => {}}>
        <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
          <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        Save Note
      </button>
    </>
  );
}
