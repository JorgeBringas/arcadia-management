import { Component, input, Signal } from '@angular/core';
import { BatchCreationFormModel } from '../../../../models/batch.model';

@Component({
  selector: 'app-batch-confirmation',
  imports: [],
  templateUrl: './batch-confirmation.html',
  styleUrl: './batch-confirmation.css',
})
export class BatchConfirmation {

  batch = input.required<BatchCreationFormModel>();

}
