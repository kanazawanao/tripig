import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collection: AngularFirestoreCollection<User>;
  constructor(private afStore: AngularFirestore) {
    this.collection = this.afStore.collection<User>('users');
  }

  addUser(user: User) {
    // カスタムobjectは登録できないといわれるので、無理やり変換して登録しちゃう
    this.collection
      .doc(user.uid)
      .set(Object.assign({}, JSON.parse(JSON.stringify(user))));
  }

  updateUser(user: User) {
    this.collection
      .doc(user.uid)
      .update(Object.assign({}, JSON.parse(JSON.stringify(user))));
  }
}
