import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { BatchFermentationFormModel } from '../../../../../models/batch.model';
import { BatchService } from '../../../../../services/batch-service';
import { form, FormField, required } from '@angular/forms/signals';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fermentation-phase',
  imports: [DatePipe, FormField],
  templateUrl: './fermentation-phase.html',
  styleUrl: './fermentation-phase.css',
})
export class FermentationPhase implements OnInit{

  batchService = inject(BatchService);
  batchId = input.required<string>();
  history = signal<BatchFermentationFormModel[]>([]);

  formModel = signal<BatchFermentationFormModel>({
    density: 0,
    temperature: '',
    creationDate: new Date(),
    notes: '',
  });

  fermentationForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.density, { message: 'La densidad es requerida' });
    required(schemaPath.temperature, { message: 'La temperatura es requerida' });
  });

  ngOnInit(): void {
    this.updateFermentationData().then();
  }


  async addFermentationData() {
    try {
      await this.batchService.addFermentationData(this.batchId(), this.formModel());
      await this.updateFermentationData();
      this.formModel.set({
        density: 0,
        temperature: '',
        creationDate: new Date(),
        notes: '',
      });
    } catch (e) {
      console.log(e);
    }
  }

  private async updateFermentationData() {
    try {
      const batch = await this.batchService.getFermentationData(this.batchId());
      this.history.set(batch);
    } catch (e) {
      console.log(e);
    }
  }
}
