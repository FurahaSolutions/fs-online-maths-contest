import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'post').and.returnValue(of({user: {id: 1}, token: {accessToken: 'token'}}));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('property storedToken', () => {
    it('should  return value of token if token is stored in local storage', () => {
      spyOn(window.sessionStorage, 'getItem').and.returnValue(null);
      spyOn(window.localStorage, 'getItem').and.returnValue('{"accessToken": "qwerty", "expiresAt": "08:00:00"}');
      expect(service.storedToken).toEqual({accessToken: 'qwerty', expiresAt: '08:00:00'});
    });
    it('should  return value if token is stored in session storage', () => {
      spyOn(window.sessionStorage, 'getItem').and.returnValue('{"accessToken": "qwerty", "expiresAt": "09:00:00"}');
      expect(service.storedToken).toEqual({accessToken: 'qwerty', expiresAt: '09:00:00'});
    });
  });

  describe('function getUserProfile()', () => {
    it('should return update authUser$ property', done => {
      spyOn(httpClient, 'get').and.returnValue(of({name: 'John Doe'}));
      service.getUserProfile().pipe(
        mergeMap(() => service.authUser$)
      ).subscribe({
        next: (res) => {
          expect(res as any).toEqual({name: 'John Doe'});
          done();
        }
      });
    });
  });
  describe('function socialLogin() ', () => {
    it('should store token to local storage if rememberMe is false', () => {
      const spySessionStorage = spyOn(window.sessionStorage, 'setItem').and.callThrough();
      service.socialLogin(jasmine.createSpyObj([], ['token', 'user'])).subscribe();
      expect(spySessionStorage).toHaveBeenCalled();
    });

    it('should store token to session storage if rememberMe is true', () => {
      (service as any).rememberMe = true;
      const spySessionStorage = spyOn(window.localStorage, 'setItem').and.callThrough();
      service.socialLogin(jasmine.createSpyObj([], ['token', 'user'])).subscribe();
      expect(spySessionStorage).toHaveBeenCalled();
    });
  });

  describe('function logout()', () => {
    it('should clear storage if http request is successful', () => {
      const spySessionStorage = spyOn(window.sessionStorage, 'removeItem');
      const spyLocalStorage = spyOn(window.localStorage, 'removeItem');
      spyOn(httpClient, 'get').and.returnValue(of(true));
      service.logout().subscribe();
      expect(spySessionStorage).toHaveBeenCalled();
      expect(spyLocalStorage).toHaveBeenCalled();
    });

    it('should clear storage if http request fails', () => {
      const spySessionStorage = spyOn(window.sessionStorage, 'removeItem');
      const spyLocalStorage = spyOn(window.localStorage, 'removeItem');
      spyOn(httpClient, 'get').and.returnValue(throwError('An Error Occurred'));
      service.logout().subscribe();
      expect(spySessionStorage).toHaveBeenCalled();
      expect(spyLocalStorage).toHaveBeenCalled();
    });
  });
});
