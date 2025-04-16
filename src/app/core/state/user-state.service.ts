import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { GourmetUserEntity } from 'src/app/domain/entities/gourmet-user/gourmet-user.entity';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  // The reactive signal holding your current user state
  private readonly _user = signal<GourmetUserEntity | null>(null);

  constructor(private http: HttpClient) {}

  // Public readonly user signal
  readonly user = this._user.asReadonly();

  //user already fill in the profile fields
  isProfileReady = signal<boolean>(false)

  // Load user from API (after login / app start)
  loadUser() {
    return this.http.get<GourmetUserEntity>('/api/profile').pipe(
      map((user) => {
        this._user.set(user);
        return user;
      })
    );
  }

  // Update local state after profile update
  updateUser(updatedUser: GourmetUserEntity) {
    this._user.set(updatedUser);
  }

  // Clear state (on logout)
  clearUser() {
    this._user.set(null);
  }

  // Convenient helper (if you need it)
  isLoggedIn() {
    return this.user() !== null;
  }

  getUserId() {
    return this.user()?.id;
  }
}
