import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    // Browser: Check authentication status with the server
    return http.get<{ isAuthenticated: boolean }>(`http://localhost:3000/auth/check`, {
      withCredentials: true, // Include cookies in the request
    }).pipe(
      map(response => {
        if (response.isAuthenticated) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        // Handle server errors (e.g., network failure, 401)
        router.navigate(['/login']);
        return of(false);
      })
    );
  } else {
    // Server: Allow rendering (client will handle redirection after hydration)
    return true;
  }
};