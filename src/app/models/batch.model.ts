export type BatchStatus = 'Fermentation' | 'Maturation' | 'Concluded (SAT)';

export interface BatchSummary {
  batchId: string;
  name: string;
  status: string;
  creationDate: Date;
}
