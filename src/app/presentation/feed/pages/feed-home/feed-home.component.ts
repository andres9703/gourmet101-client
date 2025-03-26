import { Component, inject, effect, signal } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/layout/navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { GetUserUseCase, UserEntity } from 'src/app/domain';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-feed-home',
  imports: [NavbarComponent, ButtonModule, JsonPipe],
  templateUrl: './feed-home.component.html',
})
export class FeedHomeComponent {
  private getUserUseCase = inject(GetUserUseCase);
  user = signal<UserEntity | null>(null);
  private isAuthenticated = signal(false);

  constructor() {
    effect(() => {
      this.getUserUseCase.execute().subscribe((userInfo) => {
        this.user.set(userInfo.user);
        this.isAuthenticated.set(userInfo.isAuthenticated);
      });
    });
  }
}
