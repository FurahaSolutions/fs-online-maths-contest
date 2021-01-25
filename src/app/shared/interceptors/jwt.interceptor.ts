import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tokenMixin} from '../mixins/token.mixin';

@Injectable()
export class JwtInterceptor extends tokenMixin() implements HttpInterceptor {

  constructor() {
    super();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.storedToken) {
      request = request.clone({
        setHeaders: {
          ['Authorization']: `Bearer ${this.storedToken.accessToken}`
        }
      });
    }
    return next.handle(request);
  }
}
