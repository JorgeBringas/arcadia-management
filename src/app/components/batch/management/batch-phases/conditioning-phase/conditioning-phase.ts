import { Component, inject, input, OnInit, signal } from '@angular/core';
import { BatchConditioningModel } from '../../../../../models/batch.model';
import { form, FormField, required } from '@angular/forms/signals';
import { BatchService } from '../../../../../services/batch-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-conditioning-phase',
  imports: [FormField, DatePipe],
  templateUrl: './conditioning-phase.html',
  styleUrl: './conditioning-phase.css',
})
export class ConditioningPhase implements OnInit {
  batchService = inject(BatchService);
  batchId = input.required<string>();
  history = signal<BatchConditioningModel[]>([]);

  conditioningModel = signal<BatchConditioningModel>({
    name: '',
    volume: 0,
    temperature: 0,
    notes: '',
    creationDate: new Date(),
  });

  conditioningForm = form(this.conditioningModel, (schemaPath) => {
    required(schemaPath.name, { message: 'El nombre es requerido' });
    required(schemaPath.volume, { message: 'El volumen es requerido' });
    required(schemaPath.temperature, { message: 'La temperatura es requerida' });
  });

  async ngOnInit(): Promise<void> {
    await this.getConditioningData();
  }

  async addConditioningData() {
    try {
      await this.batchService.addConditioningData(this.batchId(), this.conditioningModel());
      await this.getConditioningData();
      this.conditioningModel.set({
        name: '',
        volume: 0,
        temperature: 0,
        notes: '',
        creationDate: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  }

  private async getConditioningData() {
    try {
      const data = await this.batchService.getConditioningData(this.batchId()).then();
      this.history.set(data);
    } catch (e) {
      console.log(e);
    }
  }
}
