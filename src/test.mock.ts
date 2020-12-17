import {SocialAuthService} from 'angularx-social-login';
import {of} from 'rxjs';

export const mockSocialAuthService: Partial<SocialAuthService> = {
  authState: of(null),
  signIn: () => new Promise(resolve => resolve(null)),
  signOut: () => new Promise(resolve => resolve(null)),
};

export const mockAuthService = {
  socialLogin: () => of({user: {}, token: {}}),
  logout: () => of(true)
};
