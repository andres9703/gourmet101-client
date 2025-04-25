import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@auth0/auth0-angular';
import { RouterLink, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu'
import { UserEntity } from 'src/app/domain/entities';
import { Button } from "primeng/button";
import { MenuItem } from 'primeng/api';
import { ServerAuthService } from 'src/app/core/auth/services/auth-service.service';
import { Router } from '@angular/router';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { GourmetUserStateService } from 'src/app/core/state/gourmet-user-state.service';



@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, RouterLink, RouterModule, AvatarModule, Menu, Button],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {


  constructor(private auth: AuthService) {
  }


 
  items: MenuItem[] | undefined;
  isMobileMenuOpen = false;
  isAuthenticated = signal(false);
  profileFirstLetter = signal('');
  user = signal<UserEntity | null>(null);

 

  private serverAuth = inject(ServerAuthService);
  private router = inject(Router);
  private userStateService = inject(UserStateService);
  private gourmetUserStateService = inject(GourmetUserStateService);

  ngOnInit() {
  
    this.user.set(this.userStateService.getUserFromSessionStorage());
    this.profileFirstLetter.set(this.user()?.name[0].toUpperCase() || '');

    console.log(this.isAuthenticated())

      this.items = [
        {
            items: [
                {
                    label: 'Feed',
                    icon: 'pi pi-megaphone',
                    routerLink: '/feed',
                },
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    routerLink: '/profile',
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-power-off',
                    command: () => this.logout(),
                }
            ]
        },
    ];
  }

       
  logout() {
    this.serverAuth.logout().subscribe(() => {
      this.auth.logout();
      this.userStateService.clearUser();
      this.gourmetUserStateService.clearUser();
      this.router.navigate(['/login']);
    });
  }


  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
