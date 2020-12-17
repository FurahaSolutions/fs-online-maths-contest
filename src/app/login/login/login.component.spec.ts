import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {SocialAuthService, SocialLoginModule} from 'angularx-social-login';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginFormComponent} from '../login-form/login-form.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {mockAuthService, mockSocialAuthService} from '../../../test.mock';
import {Router} from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SocialLoginModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          {path: 'dashboard', component: DashboardComponent},
        ]),
        FontAwesomeModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [LoginComponent, LoginFormComponent],
      providers: [
        {
          provide: SocialAuthService,
          useValue: mockSocialAuthService
        },
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ],
    })
      .compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signIn when signInWithGoogle() is called', () => {
    spyOn(router, 'navigate').and.callThrough();
    const signInSpy = spyOn<any>((component as any).socialAuthService, 'signIn').and.callThrough();
    component.signInWithGoogle();

    expect(signInSpy).toHaveBeenCalled();
  });

  it('should call signIn when signInWithFb() is called', () => {
    const signInSpy = spyOn<any>((component as any).socialAuthService, 'signIn').and.callThrough();
    component.signInWithFB();
    expect(signInSpy).toHaveBeenCalled();
  });

  it('should call signOut when signOut() is called', () => {
    const signOutSpy = spyOn<any>((component as any).socialAuthService, 'signOut').and.callThrough();
    component.signOut();
    expect(signOutSpy).toHaveBeenCalled();
  });

  // it('should navigate to "/dashboard" after successful login', () => {
  //   const navigateSpy = spyOn(router, 'navigate').and.callThrough();
  //   // const navigateSpy = spyOn<any>((component as any).router, 'navigate').and.callThrough();
  //   component.signInWithFB();
  //   expect(navigateSpy).toHaveBeenCalled();
  // });
});
