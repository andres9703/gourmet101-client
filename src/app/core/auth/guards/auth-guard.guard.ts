import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserAuthService } from '../services/user-auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserAuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((userInfo) => {
        if (userInfo.isAuthenticated) {
          return true; // Allow access
        }
        console.log('Unauthorized access attempt <----------------------');
        this.router.navigate(['/login']); // Redirect to login if not authenticated
        return false;
      }),
      catchError((error) => {
        console.error('Error checking authentication:', error);
        this.router.navigate(['/login']); // Redirect to login on error
        return of(false);
      })
    );
  }
}