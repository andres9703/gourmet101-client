import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/data/models/user/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) {}

  isAuthenticated(): Observable<{ isAuthenticated: boolean, user: User }> {
    return this.http
      .get<{ isAuthenticated: boolean, user: User }>('http://localhost:3000/auth/status', {
        withCredentials: true, // Send cookies with the request
      })
      .pipe(map((response) => response));
  }
}
