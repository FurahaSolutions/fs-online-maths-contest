import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {of} from 'rxjs';
import {SocialAuthService, SocialLoginModule} from 'angularx-social-login';

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
        SocialLoginModule
      ],
      declarations: [LoginComponent],
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
    const signInSpy = spyOn<any>((component as any).authService, 'signIn').and.callThrough();
    component.signInWithGoogle();
    expect(signInSpy).toHaveBeenCalled();
  });

  it('should call signIn when signInWithFb() is called', () => {
    const signInSpy = spyOn<any>((component as any).authService, 'signIn').and.callThrough();
    component.signInWithFB();
    expect(signInSpy).toHaveBeenCalled();
  });

  it('should call signOut when signOut() is called', () => {
    const signOutSpy = spyOn<any>((component as any).authService, 'signOut').and.callThrough();
    component.signOut();
    expect(signOutSpy).toHaveBeenCalled();
  });
});
