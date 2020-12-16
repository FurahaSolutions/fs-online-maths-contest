import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SocialUser} from 'angularx-social-login';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IToken {
  accessToken: string;
  expiresAt: string;
}

interface ITokenResponse {
  token: IToken
  user: IUser
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rememberMe = false;
  private authUserSubject$ = new BehaviorSubject<IUser | null>(null);
  authUser$ = this.authUserSubject$.asObservable();
  getStoredUser = (storageMethod: typeof localStorage | typeof sessionStorage) =>
    JSON.parse(String(storageMethod.getItem('token')));

  get storedToken(): IToken | null {
    return this.getStoredUser(sessionStorage) || this.getStoredUser(localStorage);
  }

  getUserProfile = () => this.httpClient.get<IUser>('/user').pipe(
    tap(this.authUserSubject$.next)
  );

  socialLogin = (socialUser: SocialUser) =>
    this.httpClient.post<ITokenResponse>('/login/social', socialUser).pipe(
      tap(this.authenticateApp)
    );
  login = (data: { username: string; password: string }) =>
    this.httpClient.post<ITokenResponse>('/login', data);

  authenticateApp = (response: ITokenResponse) => {
    this.storeToken(response.token);
    this.authUserSubject$.next(response.user);
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
  constructor(private httpClient: HttpClient) {
  }
}
