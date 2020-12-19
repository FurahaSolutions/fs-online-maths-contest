import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../login/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let storedToken = this.authService.storedToken;
    if(storedToken) {
      request = request.clone({
        setHeaders: {
          ['Authorization']: `Bearer ${storedToken.accessToken}`
        }
      });
    }
    return next.handle(request);
  }
}
