import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-registered-routes',
  templateUrl: './registered-routes.component.html',
  styleUrls: ['./registered-routes.component.scss'],
})
export class RegisteredRoutesComponent {

  constructor(
    private router: Router,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private auth: AuthService,
  ) { }

  googleSignIn() {
    if (this.platform.is('cordova')) {
      // Cordova環境でのみGooglePlusプラグインでログインする
      this.nativeGoogleLogin().then(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.auth.googleSignIn().then(() => {
        this.router.navigate(['/']);
      });
    }
  }

  async nativeGoogleLogin(): Promise<any> {
    try {
      const gplusUser = await this.gplus.login({
        webClientId: environment.webClientId,
        offline: true,
        scopes: 'profile email'
      });

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );
    } catch (err) {
      console.log(err);
    }
  }
}
