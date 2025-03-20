import { Component } from '@angular/core';
import { ServerAuthService } from 'src/app/core/auth/services/auth-service.service';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent {
  constructor(private serverAuth: ServerAuthService) { }
 
  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    // this.auth.handleRedirectCallback();
    this.serverAuth.handleCallback(code!);
    console.log(code, "🤖🤖🤖")
  }
}
