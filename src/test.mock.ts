import {SocialAuthService} from 'angularx-social-login';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export const mockSocialAuthService: Partial<SocialAuthService> = {
  authState: of(null),
  signIn: () => new Promise(resolve => resolve(null)),
  signOut: () => new Promise(resolve => resolve(null)),
};

export const mockAuthService = {
  socialLogin: () => of({user: {}, token: {}}),
  logout: () => of(true)
};
@Injectable()
export class HttpTestingService {
  constructor(private httpClient: HttpClient) {
  }

  getItem = (link: string) => this.httpClient.get(link);

}

