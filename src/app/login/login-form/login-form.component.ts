import {Component} from '@angular/core';
import {faLock} from '@fortawesome/free-solid-svg-icons/faLock';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  faLock = faLock;
  faUser = faUser;
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe();
  }

}
