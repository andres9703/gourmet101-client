import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../../models/user/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserApiDataSource {
  constructor() {}

  private auth = inject(AuthService);

  getUser(): Observable<User> {
    return this.auth.user$.pipe(
      filter((user): user is User => user !== null && user !== undefined),
      map(user => user as User)
    );
  }

  
}
