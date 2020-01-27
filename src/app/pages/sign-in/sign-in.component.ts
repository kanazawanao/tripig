import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signinForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  private readonly EMAIL = 'email';
  get email(): string {
    return this.signinForm.controls[this.EMAIL].value;
  }
  private readonly PASSWORD = 'password';
  get password(): string {
    return this.signinForm.controls[this.PASSWORD].value;
  }
  constructor(
    private router: Router,
    private platform: Platform,
    private auth: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {}

  googleSignIn(): void {
    if (this.platform.is('cordova')) {
      // Cordova環境でのみGooglePlusプラグインでログインする
      this.auth.nativeGoogleLogin().then(() => {
        this.router.navigate(['/tabs/registered']);
      });
    } else {
      this.auth.googleSignIn().then(() => {
        this.router.navigate(['/tabs/registered']);
      });
    }
  }

  facebookSignIn(): void {
    if (this.platform.is('cordova')) {
      // Cordova環境でのみGooglePlusプラグインでログインする
      // this.auth.nativeFacebookLogin().then(() => {
      //   this.router.navigate(['/tabs/registered']);
      // });
    } else {
      this.auth.facebookSignIn().then(() => {
        this.router.navigate(['/tabs/registered']);
      });
    }
  }

  signIn(): void {
    this.auth.signIn(this.email, this.password);
  }
  toSignUpPage() {
    this.router.navigate(['/tabs/pages/signUp']);
  }
}
