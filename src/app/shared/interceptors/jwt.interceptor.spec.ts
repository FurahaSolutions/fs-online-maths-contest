import {getTestBed, TestBed} from '@angular/core/testing';

import {JwtInterceptor} from './jwt.interceptor';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpTestingService} from '../../../test.mock';
import {AuthService} from '../../login/services/auth.service';

describe('JwtInterceptor', () => {
  let injector;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  let service: HttpTestingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpTestingService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        }
      ]

    });
    injector = getTestBed();

    httpMock = injector.get(HttpTestingController);
    authService = TestBed.inject(AuthService);
    service = TestBed.inject(HttpTestingService);
  });

  afterEach(() => httpMock.verify());

  describe('intercept() function', () => {
    it('should add authorization token to http request if token exists on local storage', () => {
      spyOn(window.sessionStorage, 'getItem').and.returnValue(null);
      spyOn(window.localStorage, 'getItem').and.returnValue('{"accessToken": "some-auth-token"}');
      service.getItem('/my-link').subscribe();
      const httpReq = httpMock.expectOne(`/my-link`);
      expect(httpReq.request.headers.get('Authorization')).toBe(`Bearer some-auth-token`);
    });

    it('should add authorization token to http request if token exists on session storage', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue(null);
      spyOn(window.sessionStorage, 'getItem').and.returnValue('{"accessToken": "some-auth-token"}');
      service.getItem('/my-link').subscribe();
      const httpReq = httpMock.expectOne(`/my-link`);
      expect(httpReq.request.headers.get('Authorization')).toBe(`Bearer some-auth-token`);
    });

    it('should not have authorization token if token is not stored in storage', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue(null);
      spyOn(window.sessionStorage, 'getItem').and.returnValue(null);
      service.getItem('/my-link').subscribe();
      const httpReq = httpMock.expectOne(`/my-link`);
      expect(httpReq.request.headers.has('Authorization')).toBeFalsy();
    });
  });
});
