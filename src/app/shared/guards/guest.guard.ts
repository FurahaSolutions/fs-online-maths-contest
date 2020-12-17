import {Injectable, NgZone} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {AuthService} from '../../login/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {
  }

  canActivate(): Promise<boolean | UrlTree> | boolean {
    if (!!this.authService.storedToken) {
      return this.ngZone.run(() => this.router.navigate(['/dashboard']));
    }
    return true;
  }

}
