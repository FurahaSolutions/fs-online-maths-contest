import {TestBed} from '@angular/core/testing';

import {GuestGuard} from './guest.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {AuthService} from '../../login/services/auth.service';
import {DashboardComponent} from '../../dashboard/dashboard.component';

describe('GuestGuard', () => {
  let guard: GuestGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'dashboard', component:DashboardComponent}
      ])]
    });
    guard = TestBed.inject(GuestGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return false if user is logged in', () => {
      spyOnProperty(authService, 'storedToken').and.returnValue(false);
      expect(guard.canActivate()).toBeTruthy();
    });
    it('should return true if user is not logged in', () => {
      spyOnProperty(authService, 'storedToken').and.returnValue(true);
      const navigateSpy = spyOn(router, 'navigate').and.callThrough();
      guard.canActivate();
      expect(navigateSpy).toHaveBeenCalled();
    });
  });
});
