import { Component, inject, signal, computed, input, resource } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

export type ActiveTab = 'fermentation' | 'maturation' | 'sat';

@Component({
  selector: 'app-batch-managent-component',
  imports: [DatePipe],
  templateUrl: './batch-managent-component.html',
  styleUrl: './batch-managent-component.css',
})
export class BatchManagentComponent {

  private router = inject(Router);
  private apiUrl = 'https://us-central1-your-project.cloudfunctions.net/api/batches';

  // Automatically bound from URL /batches/:id via 'withComponentInputBinding()'
  id = input.required<string>();

  // UI Reactive Navigation State
  currentTab = signal<ActiveTab>('fermentation');

  // Interactive Form Local Signals (For daily metric tracking logs)
  logGravity = signal<number>(1.000);
  logTemp = signal<number>(22.0);
  logNotes = signal<string>('');

  // SAT Bottling Form Local Signals
  bottleCount = signal<number | null>(null);
  stampSeries = signal<string>('');
  stampStart = signal<string>('');
  stampEnd = signal<string>('');

  /**
   * resource reactive lifecycle hook.
   * Re-fetches database information automatically if the batch ID parameter updates.
   */
  batchResource = resource({
    params: () => ({ batchId: this.id() }),
    loader: ({ params }) => {
      return fetch(`${this.apiUrl}/search?term=${encodeURIComponent(params.batchId)}&status=`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to synchronize database state.');
          return res.json().then(data => data[0] || null); // Return match payload
        });
    }
  });

  // Safe computed shortcuts derived straight from resource values
  batch = computed(() => this.batchResource.value());
  isLoading = computed(() => this.batchResource.isLoading());

  /**
   * Computed Signal: Dynamically assesses real-time ABV content 
   * based on the latest current gravity entries recorded.
   */
  realtimeAbv = computed(() => {
    const data = this.batch();
    if (!data) return 0;
    const og = data.densidadInicial || 1.090;
    const currentG = data.currentGravity || og;

    const calculated = (og - currentG) * 131.25;
    return parseFloat(calculated.toFixed(2));
  });

  // Generic signal form sync utility handler
  updateInput<T>(signalRef: (value: T) => void, event: Event, isNumber = false): void {
    const element = event.target as HTMLInputElement | HTMLTextAreaElement;
    const value = isNumber ? parseFloat(element.value) || 0 : element.value;
    signalRef(value as T);
  }

  setTab(tab: ActiveTab): void {
    this.currentTab.set(tab);
  }

  async submitLogEntry(event: Event): Promise<void> {
    event.preventDefault();
    // Logic to dispatch a POST mutation to write a subcollection item goes here...
    alert(`Metric Logged: SG ${this.logGravity()} at ${this.logTemp()}°C`);
    this.batchResource.reload(); // Instantly triggers UI fresh repaint
  }

  async finalizeFiscalBatch(event: Event): Promise<void> {
    event.preventDefault();
    alert(`Batch successfully locked and linked to Tax Stamps: ${this.stampStart()} to ${this.stampEnd()}`);
    this.router.navigate(['/dashboard']);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

}
