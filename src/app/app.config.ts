import { ApplicationConfig, inject, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { 
      preset: Aura,
      options: {
        darkModeSelector: '.my-app-dark',
        cssLayer: {
          name: 'primeng',
          order: 'theme, base, primeng'
      }
    }
     } }),
    provideAuth0({
      domain: 'dev-t1u7ensmo082ywsp.us.auth0.com',
      clientId: 'gbxBqcM9VFNEP4HFK2SrNSymJXJW0MrE',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/callback',
        scope: 'openid profile email offline_access',
      },
      skipRedirectCallback: true
    }),
  ]
};
