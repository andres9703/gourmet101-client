import { Component, inject, signal, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/layout/navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { UserEntity } from 'src/app/domain';
import { JsonPipe } from '@angular/common';
import { GourmetUserStateService } from 'src/app/core/state/gourmet-user-state.service';


@Component({
  selector: 'app-feed-home',
  imports: [NavbarComponent, ButtonModule, JsonPipe],
  templateUrl: './feed-home.component.html',
})
export class FeedHomeComponent implements OnInit {
  gourmetUserStateService = inject(GourmetUserStateService);
  user = signal<UserEntity | null>(null);

  ngOnInit() {
    this.user.set(this.gourmetUserStateService.getGourmetUserFromSessionStorage());
  }
}
