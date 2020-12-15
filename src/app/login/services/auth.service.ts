import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SocialUser} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  socialLogin = (socialUser: SocialUser) =>
    this.httpClient.post('/login/social', socialUser);
  login = (data: { username: string; password: string }) =>
    this.httpClient.post('/login', data);
}
