import { Component, signal } from '@angular/core';
import { BatchCreation } from "../batch-creation/batch-creation";
import { BatchCreationFormModel } from '../../../../models/batch.model';
import { BatchConfirmation } from "../batch-confirmation/batch-confirmation";

@Component({
  selector: 'app-batch-new',
  imports: [BatchCreation, BatchConfirmation],
  templateUrl: './batch-new.html',
  styleUrl: './batch-new.css',
})
export class BatchNew {

  viewStep = signal<number>(1);
  batch = signal<BatchCreationFormModel>({} as BatchCreationFormModel);


  showConfirmation(batch: BatchCreationFormModel): void {
    this.batch.set(batch);
    this.viewStep.set(2);
  }

}
