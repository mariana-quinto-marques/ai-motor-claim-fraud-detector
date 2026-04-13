export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type ClaimStatus = 'Open' | 'Review' | 'Approved' | 'Rejected' | 'Investigating';
export type SlaStatus = 'ok' | 'warn' | 'breach';
export type SignalVerdict = 'ok' | 'warn' | 'flag';

export interface Signal {
  sig: string;
  src: string;
  finding: string;
  conf: string;
  v: SignalVerdict;
}

export interface Trigger {
  e: string;
  t: string;
  note: string;
}

export interface TimelineEvent {
  e: string;
  t: string;
  c: 'pink' | 'green' | 'amber';
  n?: string;
}

export interface Claim {
  id: string;
  name: string;
  init: string;
  color: string;
  type: string;
  date: string;
  time: string;
  loc: string;
  status: ClaimStatus;
  risk: RiskLevel;
  score: number;
  policy: string;
  policyAge: number;
  prior: number;
  photos: number;
  tp: boolean;
  police: string;
  est: number;
  driveable: boolean;
  dob: string;
  phone: string;
  email: string;
  vehicleDesc: string;
  roadType: string;
  weather: string;
  roadCondition: string;
  damageItems: string;
  damageDesc: string;
  injuries: boolean;
  vehicleLocation: string;
  tpName: string | null;
  tpPhone: string | null;
  tpReg: string | null;
  tpInsurer: string | null;
  tpVehicle: string | null;
  witName: string | null;
  witPhone: string | null;
  sla: SlaStatus;
  slaLabel: string;
  action: string;
  recoBanner: 'b-red' | 'b-amber' | 'b-green';
  recoLabel: string;
  recoText: string;
  recoSub: string;
  desc: string;
  triggers: Trigger[];
  signals: Signal[];
  reasoning: string;
  timeline: TimelineEvent[];
}
