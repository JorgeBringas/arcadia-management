import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard-component/dashboard-component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'batches/new',
    loadComponent: () =>
      import('./components/batch/new-batch-component/new-batch-component').then(
        (m) => m.NewBatchComponent,
      ),
  },

  {
    path: 'batches/edit',
    loadComponent: () =>
      import('./components/batch/edit-batch-component/edit-batch-component').then(
        (m) => m.EditBatchComponent,
      ),
  },
  {
    path: 'batches/phases/conditioning',
    loadComponent: () =>
      import('./components/batch/pahses/conditioning-phase-component/conditioning-phase-component').then(
        (m) => m.ConditioningPhaseComponent,
      ),
  },
  {
    path: 'batches/phases/packaging',
    loadComponent: () =>
      import('./components/batch/pahses/packaging-phase-component/packaging-phase-component').then(
        (m) => m.PackagingPhaseComponent,
      ),
  },
];
