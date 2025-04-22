import { Injectable, signal } from '@angular/core';
import { mapTo, of, tap } from 'rxjs';
import { UserEntity } from 'src/app/domain';
import { GetUserUseCase } from 'src/app/domain';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  // The reactive signal holding your current user state
  private readonly _user = signal<UserEntity | null>(this.getUserFromSessionStorage());

  constructor(private getUserUseCase: GetUserUseCase) {

  }

  // Public readonly user signal
  readonly user = this._user.asReadonly();

  // Load user from API (after login / app start)
  loadUserToSessionStorage() {
    return this.getUserUseCase.execute().pipe(
      tap((userInfo) => {
        sessionStorage.setItem('user', JSON.stringify(userInfo.user));
      })
    );
  }

  getUserFromSessionStorage() {
    const user = sessionStorage.getItem('user') || null;
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  // Clear state (on logout)
  clearUser() {
    this._user.set(null);
    sessionStorage.removeItem('user');
  }

}
