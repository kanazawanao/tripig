import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private userService: UserService
  ) {}

  async signIn(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      return console.log(err);
      // TODO: エラー処理追加
    }
  }

  googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthSignIn(provider);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/signIn']);
    });
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
}
