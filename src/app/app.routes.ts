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
      import('./components/batch/new/new-batch').then(
        (m) => m.NewBatch,
      ),
  },
  {
    path: 'batches/management',
    loadComponent: () =>
      import('./components/batch/management/management').then(
        (m) => m.Management,      
      ),
  }, 
];

