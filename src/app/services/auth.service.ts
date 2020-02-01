import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Session, User } from '../models/class/session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId = '';
  photoUrl = '';
  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private userService: UserService,
    private gplus: GooglePlus
  ) {}

  checkLogin(): void {
    this.afAuth.authState
      .pipe(
        // authの有無でObservbleを変更
        switchMap(auth => {
          if (!auth) {
            return of(null);
          } else {
            return this.getUser(auth.uid);
          }
        })
      )
      .subscribe(auth => {
        // ログイン状態を返り値の有無で判断
        this.session.login = !!auth;
        this.session.user = auth ? auth : new User();
        this.sessionSubject.next(this.session);
      });
  }

  checkLoginState(): Observable<Session> {
    return this.afAuth.authState.pipe(
      map(auth => {
        // ログイン状態を返り値の有無で判断
        this.session.login = !!auth;
        return this.session;
      })
    );
  }

  private getUser(uid: string): Observable<User> {
    return this.afStore
      .doc<User>(`users/${uid}`)
      .valueChanges()
      .pipe(
        map(user => {
          if (user) {
            return user;
          } else {
            return new User();
          }
        }),
        take(1),
        switchMap((user: User) => of(new User(uid, user.name, user.email, user.photoUrl)))
      );
  }

  signup(email: string, password: string): void {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(auth => {
        if (auth.user) {
          auth.user.sendEmailVerification();
          this.userService.addUser(this.createUser(auth.user));
        }
      })
      .then(() => alert('メールアドレス確認メールを送信しました。'))
      .catch(err => {
        console.log(err);
        alert('アカウントの作成に失敗しました。\n' + err);
      });
  }

  async signIn(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        // メールアドレス確認が済んでいるかどうか
        if (auth.user && !auth.user.emailVerified) {
          this.afAuth.auth.signOut();
          return Promise.reject('メールアドレスが確認できていません。');
        } else {
          this.session.login = true;
          this.sessionSubject.next(this.session);
          return this.router.navigate(['/']);
        }
      })
      .then(() => alert('ログインしました。'))
      .catch(err => {
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
    const user: User = new User();
    if (crediential) {
      user.uid = crediential.uid ? crediential.uid : '';
      user.name = crediential.displayName ? crediential.displayName : '';
      user.email = crediential.email ? crediential.email : '';
      user.photoUrl = crediential.photoURL ? crediential.photoURL : '';
    }
    return user;
  }

  signOut() {
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/tabs/pages/signIn']);
      })
      .then(() => alert('ログアウトしました。'))
      .catch(err => {
        console.log(err);
        alert('ログアウトに失敗しました。\n' + err);
      });
  }
}
