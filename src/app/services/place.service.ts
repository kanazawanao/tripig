import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Course } from '../models/course.models';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private collection: AngularFirestoreCollection<Course>;
  userId = '';
  constructor(private auth: AuthService, private afStore: AngularFirestore) {
    this.userId = this.auth.userId;
    this.collection = this.afStore
      .collection('places')
      .doc(this.userId)
      .collection<Course>('course');
  }

  addPlace(course: Course): void {
    const id = (course.id = this.afStore.createId());
    this.collection
      .doc(id)
      .set(Object.assign({}, JSON.parse(JSON.stringify(course))));
  }

  updatePlace(course: Course): void {
    this.collection
      .doc(course.id)
      .update(Object.assign({}, JSON.parse(JSON.stringify(course))));
  }

  deletePlace(course: Course): void {
    this.collection
      .doc(course.id)
      .delete();
  }

  getAllPlace(): Observable<Course[]> {
    return this.collection
      .valueChanges();
  }
}
