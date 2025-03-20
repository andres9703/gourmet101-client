import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerAuthService {
  constructor(private http: HttpClient, private router: Router) {}

  handleCallback(code: string) {

    console.log(code, "🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍")

    return this.http
      .post<{ success: boolean }>('http://localhost:3000/auth/callback', { code })
      .pipe(
        tap((response) => {
          console.log('Callback response:🐯🐯🐯🐯', response);
          if (response.success) {
            this.router.navigate(['/feed']);
          }
        }),
        catchError((error) => {
          console.error('Callback error:🐞🐞', error);
          this.router.navigate(['/error']); // Fallback route
          console.error('Callback error:', error);
          return throwError(() => new Error('Authentication failed'));
        })
      );
  }
}