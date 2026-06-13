import { Component, signal } from '@angular/core';
import { ConditioningPhase } from './batch-phases/conditioning-phase/conditioning-phase';
import { PackagingPhase } from './batch-phases/packaging-phase/packaging-phase';
import { PrimaryPhase } from './batch-phases/primary-phase/primary-phase';

export type ActiveTab = 'fermentation' | 'maturation' | 'packaging';

@Component({
  selector: 'app-management',
  imports: [PrimaryPhase, ConditioningPhase, PackagingPhase],
  templateUrl: './management.html',
  styleUrl: './management.css',
})
export class Management {
  activeTab = signal<ActiveTab>('fermentation');

  selectTab(tab: ActiveTab): void {
    this.activeTab.set(tab);
  }
}
