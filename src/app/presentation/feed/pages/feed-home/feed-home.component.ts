import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/layout/navbar/navbar.component';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-feed-home',
  imports: [NavbarComponent, ButtonModule],
  templateUrl: './feed-home.component.html',
})
export class FeedHomeComponent {

}
