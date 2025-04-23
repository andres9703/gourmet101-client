import { Injectable, signal } from '@angular/core';
import {  tap } from 'rxjs';
import { GourmetUserEntity } from 'src/app/domain';
import { GetGourmetUserUseCase } from 'src/app/domain/usecases/gourmet-user/get-gourmet.user.usecase';

@Injectable({
  providedIn: 'root',
})
export class GourmetUserStateService {
  // The reactive signal holding your current user state
  private readonly _user = signal<GourmetUserEntity | null>(this.getGourmetUserFromSessionStorage());

  constructor(private getGourmetUserUseCase: GetGourmetUserUseCase) {
    
  }

  // Public readonly user signal
  readonly user = this._user.asReadonly();

  // Load user from API (after login / app start)
  loadGourmetUserToSessionStorage(sub: string) {
    return this.getGourmetUserUseCase.execute(sub).pipe(
      tap((GourmetuserInfo) => {
        sessionStorage.setItem('gourmetUser', JSON.stringify(GourmetuserInfo.user));
      })
    );
  }

  getGourmetUserFromSessionStorage() {
    const user = sessionStorage.getItem('gourmetUser');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  // Clear state (on logout)
  clearUser() {
    this._user.set(null);
    sessionStorage.removeItem('gourmetUser');
  }

}
