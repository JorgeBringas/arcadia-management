import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BatchSummary } from '../../models/batch.model';
import { BatchService } from '../../services/batch-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private router = inject(Router);
  private batchService = inject(BatchService);

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
    this.router.navigate(['/batches/new']).then();
  }

  goToManagementBatch(id: string): void {
    this.router.navigate(['/batches/management/' + id]).then();
  }
}
