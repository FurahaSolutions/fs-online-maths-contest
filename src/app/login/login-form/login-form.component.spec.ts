import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginFormComponent} from './login-form.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [LoginFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login() function', () => {
    it('should call authService.login() function with correct params', async(done => {
      component.loginForm.setValue({username: 'username', password: 'password'});
      const spyAuthService = spyOn((component as any).authService, 'login').and.callThrough();
      component.login();
      expect(spyAuthService).toHaveBeenCalledWith({username: 'username', password: 'password'});
    }));
  });


});
