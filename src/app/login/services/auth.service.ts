import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SocialUser} from 'angularx-social-login';
import {catchError, take, tap} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';
import {tokenMixin} from '../../shared/mixins/token.mixin';

export interface IUser {
  SocialPhotoLink: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
}

export interface IToken {
  accessToken: string;
  expiresAt: string;
}

interface ITokenResponse {
  token: IToken;
  user: IUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends tokenMixin() {

  authUserSubject$ = new BehaviorSubject<IUser | null>(null);
  authUser$ = this.authUserSubject$.asObservable();
  private rememberMe = false;

  constructor(private httpClient: HttpClient) {
    super();
    this.getUserProfile().pipe(take(1)).subscribe()
  }

  getUserProfile = () => this.httpClient.get<IUser>('/user').pipe(
    tap(this.authUserSubject$.next.bind(this.authUserSubject$)),
  );

  socialLogin = (socialUser: SocialUser) =>
    this.httpClient.post<ITokenResponse>('/login/social', socialUser).pipe(
      tap(this.authenticateApp.bind(this))
    );
  login = (data: { username: string; password: string }) =>
    this.httpClient.post<ITokenResponse>('/login', data);

  authenticateApp = ({token, user}: ITokenResponse) => {
    this.storeToken(token);
    this.authUserSubject$.next(user);
  };
  storeToken = (token: IToken) => {
    if (this.rememberMe) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  };

  tokenInvalidate = () => this.httpClient.get<any>('/logout');

  clearUser = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    this.authUserSubject$.next(null);
  };

  logout = () => this.tokenInvalidate().pipe(
    catchError(() => of(null)),
    tap(this.clearUser),
  );

}
