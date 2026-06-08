import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BatchSummary } from '../../models/batch.model';
import { BashService } from '../../services/bash-service';

@Component({
  selector: 'app-dashboard-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
  private router = inject(Router);
  private batchService = inject(BashService);

  // Reactive State UI Filters
  txtSearch = signal<string>('');
  selectedStatus = signal<string>('');

  batches = signal(<BatchSummary[]>[]);

  search() {
    try {
      this.batchService.getBatchList(this.txtSearch(), this.selectedStatus()).subscribe({
        next: (data) => {
          this.batches.set(data);
        },
        error: (e) => {
          console.log(e);
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Input event handler methods replacing [(ngModel)]
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.txtSearch.set(input.value);
  }

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedStatus.set(select.value);
  }

  viewBatchDetails(id: string): void {
    this.router.navigate(['/batches', id]);
  }

  goToNewBatch(): void {
    this.router.navigate(['/batches/new']);
  }
}
