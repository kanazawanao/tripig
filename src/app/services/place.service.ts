import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Course } from '../models/interface/course.models';
import { map } from 'rxjs/operators';
import { Place } from '../models/interface/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private collection: AngularFirestoreCollection<Course>;
  private readonly PATH_COURSE = 'course';
  userId = '';
  constructor(private auth: AuthService, private afStore: AngularFirestore) {
    this.collection = this.afStore.collection(this.PATH_COURSE);
  }

  addPlace(course: Course): void {
    const id = (course.id = this.afStore.createId());
    course.uid = this.auth.session.user.uid;
    this.collection
      .doc(id)
      .set(Object.assign({}, JSON.parse(JSON.stringify(course))));
  }

  updatePlace(course: Course): void {
    this.collection
      .doc(course.id)
      .update(Object.assign({}, JSON.parse(JSON.stringify(course))));
  }

  deletePlace(id: string): void {
    this.collection
      .doc(id)
      .delete();
  }

  setDeletedPlace(id: string, places: Place[]): void {
    this.collection
      .doc(id)
      .collection('deleted')
      .doc('places')
      .set(Object.assign({}, JSON.parse(JSON.stringify(places))));
  }

  getDeletedPlaces(id: string | undefined): Observable<Place[] | undefined> {
    return this.collection
      .doc(id)
      .collection('deleted')
      .doc<Place[]>('places')
      .valueChanges();
  }

  getAllPlace(): Observable<Course[]> {
    return this.collection
      .valueChanges()
      .pipe(
        map(courses => courses.filter(c => c.uid === this.auth.session.user.uid))
      );
  }

  getPlace(id: string): Observable<Course | undefined> {
    return this.collection
      .doc<Course>(id)
      .valueChanges();
  }
}
