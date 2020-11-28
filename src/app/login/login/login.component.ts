import {Component} from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title = 'The Ultimate Maths Contest';
  user$ = this.authService.authState;

  constructor(private authService: SocialAuthService) {
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).catch();
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).catch();
  }

  signOut(): void {
    this.authService.signOut().then();
  }

}
