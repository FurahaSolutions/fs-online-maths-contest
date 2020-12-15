import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {of} from 'rxjs';
import {SocialAuthService, SocialLoginModule} from 'angularx-social-login';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginFormComponent} from '../login-form/login-form.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

const socialAuthServiceSpy: Partial<SocialAuthService> = {
  authState: of(null),
  signIn: () => new Promise(resolve => resolve(null)),
  signOut: () => new Promise(resolve => resolve(null)),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SocialLoginModule,
        RouterTestingModule,
        FontAwesomeModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [LoginComponent, LoginFormComponent],
      providers: [
        {
          provide: SocialAuthService,
          useValue: socialAuthServiceSpy
        }
      ],
    })
      .compileComponents();
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
});
