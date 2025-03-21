import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerAuthService {
  constructor(private http: HttpClient, private router: Router) {}

  handleCallback(code: string, codeVerifier: string) {
    console.log(code, '🐱‍🏍🐱‍🏍🐱‍🏍 Code');
    console.log(codeVerifier, '🐱‍🏍🐱‍🏍🐱‍🏍 Code Verifier');

    if (!code || !codeVerifier) {
      console.error('Missing code or code_verifier');
      this.router.navigate(['/error']);
      return throwError(() => new Error('Missing authorization code or verifier'));
    }

    return this.http
      .post<{ success: boolean }>('http://localhost:3000/auth/callback', {
        code,
        code_verifier: codeVerifier,
      }, { withCredentials: true })
      .pipe(
        tap((response) => {
          console.log('Callback response:🐯🐯🐯🐯', response);
          if (response.success) {
            this.router.navigate(['/feed']);
          } else {
            this.router.navigate(['/error']);
          }
        }),
        catchError((error) => {
          console.error('Callback error:🐞🐞', error);
          this.router.navigate(['/error']);
          return throwError(() => new Error('Authentication failed'));
        })
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>('http://localhost:3000/auth/logout', {}, { withCredentials: true });
  }
}