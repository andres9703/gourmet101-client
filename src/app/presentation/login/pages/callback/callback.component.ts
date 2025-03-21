import { Component, OnInit } from '@angular/core';
import { ServerAuthService } from 'src/app/core/auth/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
  constructor(private serverAuth: ServerAuthService, private route: ActivatedRoute, private router: Router) {}
 
  ngOnInit() {
    console.log('CallbackComponent initialized at', new Date());
    const code = this.route.snapshot.queryParamMap.get('code');
    console.log(code, '💫💫💫');
    if (code) {
      // Retrieve the transaction data from sessionStorage
      const clientId = 'gbxBqcM9VFNEP4HFK2SrNSymJXJW0MrE'; // Your client ID
      const transactionKey = `a0.spajs.txs.${clientId}`;
      const transactionData = sessionStorage.getItem(transactionKey);

      let codeVerifier: string | null = null;
      if (transactionData) {
        try {
          const parsedData = JSON.parse(transactionData);
          codeVerifier = parsedData.code_verifier;
          console.log('Retrieved code_verifier:', codeVerifier);

          // Clean up sessionStorage
          sessionStorage.removeItem(transactionKey);
        } catch (error) {
          console.error('Failed to parse transaction data from sessionStorage:', error);
        }
      }

      if (!codeVerifier) {
        console.error('No code_verifier found in sessionStorage');
        this.router.navigate(['/error']);
        return;
      }

      // Pass both code and code_verifier to ServerAuthService
      this.serverAuth.handleCallback(code, codeVerifier).subscribe({
        next: () => console.log('Callback succeeded'),
        error: (err) => {
          console.error('Callback failed:', err);
          this.router.navigate(['/error']);
        },
      });
    } else {
      console.error('No code found in URL');
      this.router.navigate(['/login']);
    }
  }

  }

