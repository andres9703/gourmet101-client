import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'example',
        pathMatch: 'full'
    },
    {
        path: 'example',
        loadComponent: () => import('./presentation/example-feature/pages/example/example.component').then(m => m.ExampleComponent),
        title: 'Example'
    },
    {
        path: 'feed',
        loadComponent: () => import('./presentation/feed/pages/feed-home/feed-home.component').then(m => m.FeedHomeComponent),
        title: 'Feed'
    }
];
