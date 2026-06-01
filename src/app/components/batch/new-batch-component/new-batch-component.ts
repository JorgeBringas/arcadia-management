import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required } from '@angular/forms/signals';

import { BashService } from '../../../services/bash-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-batch-component',
  imports: [FormField, MatFormFieldModule, MatInputModule],
  templateUrl: './new-batch-component.html',
  styleUrl: './new-batch-component.css',
})
export class NewBatchComponent {
  private router = inject(Router);
  private batchService = inject(BashService);

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

  batchModel = signal({
    batchId: this.batchIdValue(),
    style: 'Tradicional',
    name: this.batchNameValue(),
    honeyType: 'Multifloral Citrica',
    honeyWeight: 0,
    yeastType: 'MD05',
    watter: 0,
    initialVolume: 0,
    originalGravity: 1110,
    expectedFinalGravity: 1020,
    initialNotes: '',
  });

  batchForm = form(this.batchModel, (schemaPath) => {
    required(schemaPath.batchId, { message: 'Id es requerido' });
    required(schemaPath.name, { message: 'El nombre es requerido' });
  });

  // Status Signals for submission tracking
  isSubmitting = signal<boolean>(false);

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
    } catch (e) {
      console.log(e);
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard']).then();
  }
}
