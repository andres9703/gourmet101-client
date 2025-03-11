import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara'
import { definePreset } from '@primeng/themes';


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

const OrangePreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#fff3e0',  // Very light orange
      100: '#ffe0b2', // Light orange
      200: '#ffcc80', // Soft orange
      300: '#ffb74d', // Medium orange
      400: '#ff9800', // Vibrant orange (core color)
      500: '#fb8c00', // Slightly darker orange
      600: '#f57c00', // Darker orange
      700: '#ef6c00', // Deep orange
      800: '#e65100', // Dark orange
      900: '#d84315', // Very dark orange
      950: '#bf360c'  // Deepest orange shade
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.700}',        // Deep orange for text/buttons
          inverseColor: '#ffffff',       // White for contrast
          hoverColor: '{primary.600}',   // Darker orange on hover
          activeColor: '{primary.800}'   // Dark orange on active
        },
        highlight: {
          background: '{primary.100}',   // Light orange background
          focusBackground: '{primary.200}', // Slightly darker on focus
          color: '{primary.900}',        // Dark orange text
          focusColor: '{primary.950}'    // Deepest orange on focus
        }
      },
      dark: {
        primary: {
          color: '{primary.300}',        // Medium orange for visibility
          inverseColor: '{primary.950}', // Deep orange for contrast
          hoverColor: '{primary.200}',   // Softer orange on hover
          activeColor: '{primary.400}'   // Vibrant orange on active
        },
        highlight: {
          background: 'rgba(255, 152, 0, 0.16)', // Orange with transparency
          focusBackground: 'rgba(255, 152, 0, 0.24)', // Slightly more opaque
          color: 'rgba(255, 255, 255, 0.87)',    // Near-white for contrast
          focusColor: 'rgba(255, 255, 255, 0.87)' // Consistent focus color
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideHttpClient(withFetch()), provideAnimationsAsync(), providePrimeNG({theme:{
    preset: OrangePreset
  }})]
};
