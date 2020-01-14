import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User | null | undefined>;
  userId = '';
  photoUrl = '';
  loggedIn = false;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private userService: UserService,
    private gplus: GooglePlus
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userId = user.uid;
          this.photoUrl = user.photoURL ? user.photoURL : '';
          this.loggedIn = true;
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          this.loggedIn = false;
          return of(null);
        }
      })
    );
  }

  signup(email: string, password: string): void {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then( auth => {
        if (auth.user) {
          auth.user.sendEmailVerification();
        }
      })
      .then(() => alert('メールアドレス確認メールを送信しました。'))
      .catch( err => {
        console.log(err);
        alert('アカウントの作成に失敗しました。\n' + err);
      });
  }

  async signIn(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        // メールアドレス確認が済んでいるかどうか
        if (auth.user && !auth.user.emailVerified) {
          this.afAuth.auth.signOut();
          return Promise.reject('メールアドレスが確認できていません。');
        } else {
          this.loggedIn = true;
          return this.router.navigate(['/']);
        }
      })
      .then(() => alert('ログインしました。'))
      .catch( err => {
        console.log(err);
        alert('ログインに失敗しました。\n' + err);
      });
  }

  async nativeGoogleLogin(): Promise<any> {
    try {
      const gplusUser = await this.gplus.login({
        webClientId: environment.webClientId,
        offline: true,
        scopes: 'profile email'
      });

      const credential = await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );
      return this.userService.addUser(this.createUser(credential.user));
    } catch (err) {
      console.log(err);
    }
  }

  googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthSignIn(provider);
  }

  facebookSignIn() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthSignIn(provider);
  }

  private async oAuthSignIn(provider: firebase.auth.AuthProvider) {
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return this.userService.addUser(this.createUser(credential.user));
    } catch (err) {
      return console.log(err);
    }
  }

  private createUser(crediential: firebase.auth.UserCredential | any) {
    const user: User = {
      displayName: '',
      email: '',
      photoURL: '',
      profile: '',
      uid: ''
    };
    if (crediential) {
      user.uid = crediential.uid ? crediential.uid : '';
      user.email = crediential.email ? crediential.email : '';
      user.displayName = crediential.displayName ? crediential.displayName : '';
      user.photoURL = crediential.photoURL ? crediential.photoURL : '';
      user.profile = crediential.profile ? crediential.profile : '';
    }
    return user;
  }

  signOut() {
    this.afAuth
      .auth
      .signOut()
      .then(() => {
        this.router.navigate(['/tabs/pages/signIn']);
      })
      .then(() => alert('ログアウトしました。'))
      .catch( err => {
        console.log(err);
        alert('ログアウトに失敗しました。\n' + err);
      });
  }
}
