import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../login/services/auth.service';
import {Router} from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  describe('canActivate', () => {
    it('should return false if user is logged in', () => {
      spyOnProperty(authService, 'storedToken').and.returnValue(true);
      expect(guard.canActivate()).toBeTruthy();
    });
    it('should return true if user is not logged in', () => {
      spyOnProperty(authService, 'storedToken').and.returnValue(false);
      const navigateSpy = spyOn(router, 'navigate').and.callThrough();
      guard.canActivate();
      expect(navigateSpy).toHaveBeenCalled();
    });
  });
});
