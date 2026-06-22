import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard').then(
        (m) => m.Dashboard,
      ),
  },
  {
    path: 'batches/new',
    loadComponent: () =>
      import('./components/batch/new/batch-new/batch-new').then(
        (m) => m.BatchNew,
      ),
  },
  {
    path: 'batches/management/:id',
    loadComponent: () =>
      import('./components/batch/management/batch-management/batch-management').then(
        (m) => m.BatchManagement,
      ),
  },
];

