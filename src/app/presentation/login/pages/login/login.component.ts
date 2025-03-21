import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent  {
 

  constructor(private auth: AuthService) {}

  login() {
    console.log('Login in...')
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/callback'
      }
    });
  }
}
