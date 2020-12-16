import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {AuthService} from '../../login/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Promise<boolean | UrlTree> | boolean {
    if (!!this.authService.storedToken) {
      return this.router.navigate(['/dashboard']);
    }
    return true;
  }

}
