import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client
  },
  {
    path: 'login',
    renderMode: RenderMode.Client
  },
  {
    path: 'callback',
    renderMode: RenderMode.Client
  },
  {
    path: 'feed',
    renderMode: RenderMode.Client 
  },
  {
    path: 'profile',
    renderMode: RenderMode.Client
  }
];
