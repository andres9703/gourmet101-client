import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./presentation/login/pages/login/login.component').then(m => m.LoginComponent),
        title: 'Login'
    },
    {
        path: 'callback',
        loadComponent: () => import('./presentation/login/pages/callback/callback.component').then(m => m.CallbackComponent),
        title: 'Callback'
    },
    {
        path: 'feed',
        loadComponent: () => import('./presentation/feed/pages/feed-home/feed-home.component').then(m => m.FeedHomeComponent),
        title: 'Feed',
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./presentation/profile/pages/profile/profile.component').then(m => m.ProfileComponent),
        title: 'Profile',
        canActivate: [authGuard]    
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
    