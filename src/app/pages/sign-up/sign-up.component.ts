import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  get email(): string {
    return this.signupForm.controls['email'].value;
  }
  get password(): string {
    return this.signupForm.controls['password'].value;
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
