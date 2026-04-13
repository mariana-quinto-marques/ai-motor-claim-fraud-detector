export type Severity = "minor" | "moderate" | "severe";
export type Recommendation = "repair" | "replace";

export interface CostRange {
  low: number;
  high: number;
}

export interface DamagedPart {
  partName: string;
  damageType: string;
  severity: Severity;
  recommendation: Recommendation;
  estimatedCostRange: CostRange;
  details: string;
}

export interface DamageAssessment {
  overallSeverity: Severity;
  summary: string;
  damagedParts: DamagedPart[];
  totalEstimatedCostRange: CostRange;
  claimNotes: string;
}

export interface UploadedPhoto {
  id: string;
  file: File;
  previewUrl: string;
  base64DataUri: string;
}
