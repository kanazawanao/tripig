import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  email = '';
  password = '';
  signupForm = this.fb.group({
    email: [this.email, Validators.required],
    password: [this.password, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {}
  signUp() {

  }
}
