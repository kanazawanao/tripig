import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Course } from '../models/interface/course.models';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private collection: AngularFirestoreCollection<Course>;
  private readonly PATH_PLACES = 'places';
  private readonly PATH_COURSE = 'course';
  userId = '';
  constructor(private auth: AuthService, private afStore: AngularFirestore) {
    this.userId = this.auth.session.user.uid;
    this.collection = this.afStore.collection(this.PATH_PLACES);
  }

  addPlace(course: Course): void {
    const id = (course.id = this.afStore.createId());
    this.collection
      .doc(this.userId)
      .collection<Course>(this.PATH_COURSE)
      .doc(id)
      .set(Object.assign({}, JSON.parse(JSON.stringify(course))));
  }

  updatePlace(course: Course): void {
    this.collection
      .doc(this.userId)
      .collection<Course>(this.PATH_COURSE)
      .doc(course.id)
      .update(Object.assign({}, JSON.parse(JSON.stringify(course))));
  }

  deletePlace(course: Course): void {
    this.collection
      .doc(this.userId)
      .collection<Course>(this.PATH_COURSE)
      .doc(course.id)
      .delete();
  }

  getAllPlace(): Observable<Course[]> {
    return this.collection
      .doc(this.userId)
      .collection<Course>(this.PATH_COURSE)
      .valueChanges();
  }
}
