import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { UserAuthService } from 'src/app/core/auth/services/user-auth.service';
import { User } from '../../models/user/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserApiDataSource {
  constructor() {}

  private userAuth = inject(UserAuthService);

  getUser(): Observable<{ user: User; isAuthenticated: boolean }> {
    return this.userAuth.isAuthenticated().pipe(
      map(({ user, isAuthenticated }) => ({ user, isAuthenticated }))
    );
  }

  
}
