import { Component } from '@angular/core';
import { PrimaryPhaseComponent } from '../pahses/primary-phase-component/primary-phase-component';
import { ConditioningPhaseComponent } from '../pahses/conditioning-phase-component/conditioning-phase-component';
import { PackagingPhaseComponent } from '../pahses/packaging-phase-component/packaging-phase-component';

@Component({
  selector: 'app-edit-batch-component',
  imports: [PrimaryPhaseComponent, ConditioningPhaseComponent, PackagingPhaseComponent],
  templateUrl: './edit-batch-component.html',
  styleUrl: './edit-batch-component.css',
})
export class EditBatchComponent {}
