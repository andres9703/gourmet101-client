import { Component, OnInit } from '@angular/core';
import { ServerAuthService } from 'src/app/core/auth/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import { GourmetUserEntity, UserEntity } from 'src/app/domain';
import { GetGourmetUserUseCase } from 'src/app/domain/usecases/gourmet-user/get-gourmet.user.usecase';
import { SaveGourmetUserUseCase } from 'src/app/domain/usecases/gourmet-user/save-gourmet-user-usecase';
import { GourmetUserStateService } from 'src/app/core/state/gourmet-user-state.service';
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
  constructor(private serverAuth: ServerAuthService, private route: ActivatedRoute, private router: Router, private getGourmetUserUseCase: GetGourmetUserUseCase, private saveGourmetUserUseCase: SaveGourmetUserUseCase, private gourmetUserStateService: GourmetUserStateService) {}
 
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
      this.serverAuth.handleCallback(code, codeVerifier).pipe(
        catchError(err => {
          console.error('handleCallback failed:', err);
          this.router.navigate(['/error']);
          return throwError(() => err);
        }),
        switchMap(() => this.serverAuth.loadUserState()),
        catchError(err => {
          console.error('User state failed:', err);
          this.router.navigate(['/error']);
          return throwError(() => err);
        }),
        switchMap((userState: {user: UserEntity, isAuthenticated: boolean} | null) => {
          return this.getGourmetUserUseCase.execute(userState?.user.sub!)
        }),
        catchError(err => {
          console.error('Database user validation failed:', err);
          this.router.navigate(['/error']);
          return throwError(() => err);
        }),
        switchMap((userInformation: { user: GourmetUserEntity, subSubmitted: string }) => {
          console.log('User information from line 71:', userInformation);
          if (!userInformation.user) {
            // Properly return the observable chain for new user creation
            console.log('Creating new user:', userInformation.subSubmitted);
            return this.saveGourmetUserUseCase.execute(userInformation.subSubmitted)
          } else {
            // Return existing user wrapped in observable
            return of(userInformation.user);
          }
        }),
        catchError(err => {
          console.error('User processing failed:', err);
          this.router.navigate(['/error']);
          return throwError(() => err); // Or use EMPTY to silently complete
        })
        ).subscribe({
          next: (user: GourmetUserEntity) => {
            console.log(user, "USER INTERACTING WITH DATABASE TEMBO👍👍👍");
            if(user.userId) {
              sessionStorage.setItem('gourmetUser', JSON.stringify(user));
              this.router.navigate(['/feed']);
            }
          },
          error: (err) => {
            // This will handle errors from both the switchMap and inner operations
            console.error('Final error handling:', err);
            // Navigation already handled in catchError, but could add more here
          },
        });
    } else {
      console.error('No code found in URL');
      this.router.navigate(['/login']);
    }
  }

  }

