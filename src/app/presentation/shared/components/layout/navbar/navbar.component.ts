import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@auth0/auth0-angular';
import { RouterLink, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu'
import { MenuItem } from '../../../interfaces/navbar/navbar.interface';
import { GetUserUseCase } from '../../../../../domain/usecases/user/get-user.usecase';


@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, RouterLink, RouterModule, AvatarModule, Menu],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  items: MenuItem[] = [
    { label: 'Feed', icon: 'pi pi-megaphone', routerLink: '/feed' },
    { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
    { label: 'Logout', icon: 'pi pi-power-off', command: () => this.logout() }
  ];
  isMobileMenuOpen = false;
  isAuthenticated = false;

  private auth = inject(AuthService);
  private getUserUseCase = inject(GetUserUseCase);

  ngOnInit() {
      this.getUserUseCase.execute().subscribe((user) => {
        console.log(user, "😀😀😀");
      });
  }

  logout() {
    this.auth.logout();
  }


  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
