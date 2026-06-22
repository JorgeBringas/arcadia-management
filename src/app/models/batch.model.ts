export type BatchStatus = 'Fermentation' | 'Conditioning' | 'Packaging';

export interface BatchCreationFormModel {
  batchId: string;
  style: string;
  name: string;
  honeyType: string;
  honeyWeight: number;
  yeastType: string;
  watter: number;
  fermentationVolume: number;
  originalGravity: number;
  expectedFinalGravity: number;
  initialNotes: string;
}

export interface BatchFermentationFormModel {
  density: number;
  temperature: string;
  creationDate: Date;
  notes: string;
}

export interface BatchManagementModel {
  batchId: string;
  name: string;
  status: string;
  creationDate: Date;
  fermentation: BatchFermentationFormModel[];
}

export interface BatchConditioningModel {
  name: string;
  volume: number;
  temperature: number;
  notes: string;
  creationDate: Date;
}

export interface BatchPackagingModel {
  bottles: number;
  presentation: string;
  volume: number;
  serial: number;
  initialFolio: number;
  endFolio: number;
  creationDate: Date;
}

export interface BatchSummary {
  batchId: string;
  name: string;
  status: string;
  creationDate: Date;
}
