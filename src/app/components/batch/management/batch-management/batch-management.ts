import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FermentationPhase } from '../batch-phases/fermentation-phase/fermentation-phase';
import { BatchService } from '../../../../services/batch-service';
import { BatchManagementModel } from '../../../../models/batch.model';
import { ConditioningPhase } from '../batch-phases/conditioning-phase/conditioning-phase';
import { PackagingPhase } from '../batch-phases/packaging-phase/packaging-phase';

@Component({
  selector: 'app-batch-management',
  imports: [FermentationPhase, ConditioningPhase, PackagingPhase],
  templateUrl: './batch-management.html',
  styleUrl: './batch-management.css',
})
export class BatchManagement implements OnInit {
  batchService = inject(BatchService);

  id = input.required<string>();
  phaseStep = signal<number>(1);

  batchManagementModel = signal<BatchManagementModel>({} as BatchManagementModel);
  phase = computed(() => {
    return this.batchManagementModel().status;
  });

  async ngOnInit(): Promise<void> {
    this.batchManagementModel.set(await this.batchService.getBatch(this.id()));
  }

  changePahse(step: number): void {
    this.phaseStep.set(step);
  }
}
