import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  private _email = '';
  private _password = '';
  signupForm = this.fb.group({
    email: [this._email, Validators.required],
    password: [this._password, Validators.required],
  });
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  signUp() {
    this.authService.signup(this.email, this.password);
  }
}
