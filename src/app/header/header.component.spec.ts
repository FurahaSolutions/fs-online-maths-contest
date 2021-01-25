import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../login/services/auth.service';
import {mockAuthService} from '../../test.mock';
import {of} from 'rxjs';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {Router} from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService;
  let router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        {
          path: 'login',
          component: DashboardComponent
        }
      ])],
      declarations: [ HeaderComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('function logout()', () => {
    it('should call "authService.logout()"', () => {
       const logoutSpy = spyOn(authService, 'logout').and.returnValue(of(true));
       fixture.ngZone.run(() => component.logout());
       expect(logoutSpy).toHaveBeenCalled();
    });
    it('should navigate user to login page', () => {
      const routerSpy = spyOn(router, 'navigate').and.returnValue(of(true));
      component.logout();
      expect(routerSpy).toHaveBeenCalled();
    });
  });
});
