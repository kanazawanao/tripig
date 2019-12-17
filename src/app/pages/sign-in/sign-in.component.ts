import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  constructor(
    private router: Router,
    private platform: Platform,
    private auth: AuthService,
  ) { }

  ngOnInit() {}

  googleSignIn() {
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
}
