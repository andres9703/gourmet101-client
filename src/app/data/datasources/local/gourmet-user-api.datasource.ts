import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { GourmetUserEntity } from 'src/app/domain/entities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GourmetUserApiDataSource {
  constructor(private http: HttpClient) {}

  getUser(): Observable<GourmetUserEntity> {
    return this.http.get<GourmetUserEntity>('http://localhost:3000/auth/user');
  }

  
}

//   return this.http
//       .post<{ success: boolean }>('http://localhost:3000/auth/callback', {
//         code,
//         code_verifier: codeVerifier,
//       }, { withCredentials: true })
//       .pipe(
//         tap((response) => {
//           console.log('Callback response:🐯🐯🐯🐯', response);
//          return true
//         }),
//         catchError((error) => {
//           console.error('Callback error:🐞🐞', error);
//           this.router.navigate(['/error']);
//           return throwError(() => new Error('Authentication failed'));
//         })
//       );
