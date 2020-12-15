import {Component} from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {titleMixin} from '../../../shared/mixins/title.mixin';
import {mergeMap, tap} from 'rxjs/operators';
import {from} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends titleMixin() {
  title = 'The Ultimate Maths Contest';
  faFacebook = faFacebook;
  faGoogle = faGoogle;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService) {
    super();
  }

  signInWithSocial(providerId: string): void {
    from(this.socialAuthService.signIn(providerId)).pipe(
      mergeMap(socialUser => this.authService.socialLogin(socialUser))
    ).subscribe();
  }

  signInWithGoogle(): void {
    this.signInWithSocial(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.signInWithSocial(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut().then();
  }

}
