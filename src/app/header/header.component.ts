import {Component} from '@angular/core';
import {titleMixin} from '../shared/mixins/title.mixin';
import {AuthService} from '../login/services/auth.service';
import {mergeMap} from 'rxjs/operators';
import {from} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends titleMixin() {
  authUser$ = this.authService.authUser$;
  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  logout() {
    this.authService.logout().pipe(
      mergeMap(() =>
        from(this.router.navigate(['/login'])))
    ).subscribe();
  }
}
