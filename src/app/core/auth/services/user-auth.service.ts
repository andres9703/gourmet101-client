import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/data/models/user/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {


  private isRefreshing = false;

  constructor(private http: HttpClient) {}

  isAuthenticated(): Observable<{ isAuthenticated: boolean, user: User }> {
    return this.http
      .get<{ isAuthenticated: boolean, user?: User, reason?: string }>('http://localhost:3000/auth/status', {
        withCredentials: true,
      })
      .pipe(
        switchMap((response) => {
          if (response.isAuthenticated && response.user) {
            return of({ isAuthenticated: true, user: response.user });
          }
          // If token is expired, try to refresh it
          if (response.reason?.includes('No authentication token provided')) {
            return this.refreshToken().pipe(
              switchMap((refreshSuccess) => {
                if (refreshSuccess) {
                  // Retry the authentication check after refreshing
                  return this.http
                    .get<{ isAuthenticated: boolean, user?: User }>('http://localhost:3000/auth/status', {
                      withCredentials: true,
                    })
                    .pipe(
                      map((newResponse) => {
                        if (newResponse.isAuthenticated && newResponse.user) {
                          return { isAuthenticated: true, user: newResponse.user };
                        }
                        return { isAuthenticated: false, user: null as any };
                      })
                    );
                }
                return of({ isAuthenticated: false, user: null as any });
              }),
              catchError(() => of({ isAuthenticated: false, user: null as any }))
            );
          }
          return of({ isAuthenticated: false, user: null as any });
        }),
        catchError(() => of({ isAuthenticated: false, user: null as any }))
      );
  }

  private refreshToken(): Observable<boolean> {
    if (this.isRefreshing) {
      return of(false);
    }
    this.isRefreshing = true;
    return this.http
      .post<{ success: boolean }>('http://localhost:3000/auth/refresh', {}, { withCredentials: true })
      .pipe(
        map((response) => response.success),
        tap(() => (this.isRefreshing = false)),
        catchError((error) => {
          console.error('Refresh token failed 🐞🐞:', error);
          this.isRefreshing = false;
          return of(false);
        })
      );
  }
}
