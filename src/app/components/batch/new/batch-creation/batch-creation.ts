import { Component, computed, inject, output, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { BatchCreationFormModel } from '../../../../models/batch.model';
import { BatchService } from '../../../../services/batch-service';


@Component({
  selector: 'app-batch-creation',
  imports: [FormField],
  templateUrl: './batch-creation.html',
  styleUrl: './batch-creation.css',
})
export class BatchCreation {
  private router = inject(Router);
  private batchService = inject(BatchService);

  isSubmitting = signal<boolean>(false);
  confirmation = output<BatchCreationFormModel>();

  batchIdValue = () => {
    const date = new Date();
    return (
      date.getFullYear().toString().slice(2) +
      (date.getMonth() + 1) +
      date.getDate().toString() +
      (date.getMinutes() + date.getHours() + date.getSeconds())
    );
  };

  batchNameValue = () => {
    return 'Tradicional ' + this.batchIdValue();
  };

  batchModel = signal<BatchCreationFormModel>({
    batchId: this.batchIdValue(),
    style: 'Tradicional',
    name: this.batchNameValue(),
    honeyType: 'Multifloral Citrica',
    honeyWeight: 0,
    yeastType: 'MD05',
    watter: 0,
    fermentationVolume: 0,
    originalGravity: 1110,
    expectedFinalGravity: 1020,
    initialNotes: '',
  });

  batchForm = form(this.batchModel, (schemaPath) => {
    required(schemaPath.batchId, { message: 'Id es requerido' });
    required(schemaPath.name, { message: 'El nombre es requerido' });
  });

  estimatedAbv = computed(() => {
    const batchForm = this.batchModel();
    const og = batchForm.originalGravity;
    const efg = batchForm.expectedFinalGravity;
    if (!og || !efg || og <= efg) return 0;
    const abv = ((og - efg) * 131.25) / 1000;
    return parseFloat(abv.toFixed(2));
  });

  async createBatch(event: Event): Promise<void> {
    event.preventDefault(); // Stop standard page reload
    this.isSubmitting.set(true);
    try {
      await this.batchService.addBatch(this.batchModel());
      this.confirmation.emit(this.batchModel());
    } catch (e) {
      console.log(e);
      this.isSubmitting.set(false);
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard']).then();
  }
}
