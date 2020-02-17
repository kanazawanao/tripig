import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { User } from '../models/class/session';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collection: AngularFirestoreCollection<User>;
  constructor(private afStore: AngularFirestore) {
    this.collection = this.afStore.collection<User>('users');
  }

  addUser(user: User): void {
    this.collection.doc(user.uid).set(user.deserialize());
  }

  updateUser(user: User): void {
    this.collection.doc(user.uid).update(user.deserialize());
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.collection
      .valueChanges()
      .pipe(
        map(users => users.find(u => u.email === email))
      );
  }
}
