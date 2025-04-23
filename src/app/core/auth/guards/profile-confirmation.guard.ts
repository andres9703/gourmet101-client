import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GourmetUserStateService } from '../../state/gourmet-user-state.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  constructor(private router: Router, private gourmetUserStateService: GourmetUserStateService) {}

  canActivate(): boolean {
    try {
      const user = this.gourmetUserStateService.getGourmetUserFromSessionStorage()
      if (user?.isProfileComplete) {
        return true;
      }
      console.log('Profile is not completed yet.');
      this.router.navigate(['/profile']);
      return false;
    } catch (error) {
      console.error('Error checking profile completion:', error);
      this.router.navigate(['/profile']);
      return false;
    }
  }
}