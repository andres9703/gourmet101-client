import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth-guard.guard';

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
        path: 'welcome',
        loadComponent: () => import('./presentation/welcome/pages/welcome-page/welcome-page.component').then(m => m.WelcomePageComponent),
        title: 'Welcome'
    },
    {
        path: 'feed',
        loadComponent: () => import('./presentation/feed/pages/feed-home/feed-home.component').then(m => m.FeedHomeComponent),
        title: 'Feed',
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./presentation/profile/pages/profile/profile.component').then(m => m.ProfileComponent),
        title: 'Profile',
        canActivate: [AuthGuard]   
    },
    {
        path: 'error',
        loadComponent: () => import('./presentation/error/pages/error/error.component').then(m => m.ErrorComponent),
        title: 'Error'
    },
    {
        path: '**',
        loadComponent: () => import('./presentation/error/pages/error/error.component').then(m => m.ErrorComponent),
        title: 'Error'
    }
];
    