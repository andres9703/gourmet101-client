import { Component, effect, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@auth0/auth0-angular';
import { RouterLink, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu'
import { GetUserUseCase } from 'src/app/domain/usecases';
import { UserEntity } from 'src/app/domain/entities';
import { Button } from "primeng/button";
import { MenuItem } from 'primeng/api';
import { ServerAuthService } from 'src/app/core/auth/services/auth-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, RouterLink, RouterModule, AvatarModule, Menu, Button],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {


  constructor() {

    effect(() => {
     this.getUserUseCase.execute().subscribe((userInfo) => {
      this.user.set(userInfo.user);
      this.isAuthenticated.set(userInfo.isAuthenticated);

      console.log({user: this.user(), isAuthenticated: this.isAuthenticated()}, "💕💕");
    });
    })

    effect(() => {
      this.profileFirstLetter.set(this.user()?.name[0].toUpperCase() || '');
    })
  }
 
  items: MenuItem[] | undefined;
  isMobileMenuOpen = false;
  isAuthenticated = signal(false);
  profileFirstLetter = signal('');
  user = signal<UserEntity | null>(null);

 

  private auth = inject(AuthService);
  private getUserUseCase = inject(GetUserUseCase);
  private serverAuth = inject(ServerAuthService);
  private router = inject(Router);

 
  ngOnInit() {

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
      this.router.navigate(['/login']);
    });
  }


  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
