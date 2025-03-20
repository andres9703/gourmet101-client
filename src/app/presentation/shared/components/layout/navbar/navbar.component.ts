import { Component, effect, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@auth0/auth0-angular';
import { RouterLink, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu'
// import { MenuItem } from '../../../interfaces/navbar/navbar.interface';
import { GetUserUseCase } from 'src/app/domain/usecases';
import { UserEntity } from 'src/app/domain/entities';
import { Button } from "primeng/button";
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, RouterLink, RouterModule, AvatarModule, Menu, Button],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {


  constructor() {

    effect(() => {
      this.profileFirstLetter.set(this.user()?.name[0].toUpperCase() || '');
    })
  }
  // items: MenuItem[] = [
  //   { label: 'Feed', icon: 'pi pi-megaphone', routerLink: '/feed' },
  //   { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
  //   { label: 'Logout', icon: 'pi pi-power-off', command: () => this.logout() }
  // ];

  items: MenuItem[] | undefined;
  isMobileMenuOpen = false;
  isAuthenticated = false;

  private auth = inject(AuthService);
  private getUserUseCase = inject(GetUserUseCase);

  user = signal<UserEntity | null>(null);
  profileFirstLetter = signal('');

  ngOnInit() {
      this.getUserUseCase.execute().subscribe((user) => {
        console.log(user, "😀😀😀");
        this.user.set(user);
      });

      this.auth?.isAuthenticated$.subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });

      this.items = [
        {
            items: [
                {
                    label: 'New',
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
    this.auth.logout();
  }


  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
