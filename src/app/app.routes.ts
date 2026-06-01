import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard-component/dashboard-component')
            .then(m => m.DashboardComponent)
    },
    {
        path: 'batches/new',
        loadComponent: () => import('./components/batch/new-batch-component/new-batch-component')
            .then(m => m.NewBatchComponent)
    },
    {
        path: 'batches/:id',
        loadComponent: () => import('./components/batch/management/batch-managent-component/batch-managent-component')
            .then(m => m.BatchManagentComponent)
    },
];
