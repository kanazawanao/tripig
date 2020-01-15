import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { User } from '../models/class/session';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collection: AngularFirestoreCollection<User>;
  constructor(private afStore: AngularFirestore) {
    this.collection = this.afStore.collection<User>('users');
  }

  addUser(user: User) {
    // HACK: カスタムobjectは登録できないといわれるので、無理やり変換して登録してる
    this.collection.doc(user.uid).set(user.deserialize());
  }

  updateUser(user: User) {
    this.collection.doc(user.uid).update(user.deserialize());
  }
}
