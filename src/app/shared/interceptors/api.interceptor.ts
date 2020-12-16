import {Inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    @Inject('apiBaseUrl') private baseUrl: string) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = /^http[s]*:\/\//.test(request.url) ? request.url : `${this.baseUrl}${request.url}`;
    const apiReq = request.clone({ url });
    return next.handle(apiReq);
  }
}
