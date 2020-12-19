import {getTestBed, inject, TestBed} from '@angular/core/testing';

import {ApiInterceptor} from './api.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpTestingService} from '../../../test.mock';


describe('ApiInterceptor', () => {
  let injector;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpTestingService,
        {
          provide: 'apiBaseUrl',
          useValue: 'http://api/base'
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptor,
          multi: true
        }
      ]
    });
    injector = getTestBed();

    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should have an intercept function() that appends base URL', inject([HttpTestingService], (service: HttpTestingService) => {
    service.getItem('/my-link').subscribe({
      next: (res) => {
        expect(res).toBeTruthy();
      }
    });
    const httpReq = httpMock.expectOne(`http://api/base/my-link`);
    expect(httpReq.request.url).toBe(`http://api/base/my-link`);
  }));

  it('should have an not append base URL if http protocol is provided', inject([HttpTestingService], (service: HttpTestingService) => {
    service.getItem('https://api/base/my-link').subscribe({
      next: (res) => {
        expect(res).toBeTruthy();
      }
    });
    const httpReq = httpMock.expectOne(`https://api/base/my-link`);
    expect(httpReq.request.url).toBe(`https://api/base/my-link`);
  }));
});
