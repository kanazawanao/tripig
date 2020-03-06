import * as PlaceActions from '../actions';
import * as PlaceSelectors from '../selectors';
import { State } from '../states';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Course } from 'src/app/models/class/course.models';
import { Place } from 'src/app/models/class/place.model';

@Injectable({
  providedIn: 'root',
})
export class PlaceFacade {
  loading$ = this.store.pipe(select(PlaceSelectors.getLoading));
  courseList$ = this.store.pipe(select(PlaceSelectors.getCourseList));
  selectedPlaceList$ = this.store.pipe(select(PlaceSelectors.getSelectedPlaceList));
  lastSelectedPlace$ = this.store.pipe(select(PlaceSelectors.getLastSelectedPlace));
  selectedCourseId$ = this.store.pipe(select(PlaceSelectors.getSelectedCourseId));

  constructor(private store: Store<State>) {}

  /**
   * Load all
   */
  loadAll() {
    this.store.dispatch(PlaceActions.loadAll());
  }

  /**
   * updateCourse
   * @param course Course
   */
  updateCourse(course: Course) {
    this.store.dispatch(PlaceActions.updateCourse({ course }));
  }

  /**
   * updateCourse
   * @param selectedPlaceList selectedPlaceList
   */
  updateSelectedPlaceList(selectedPlaceList: Place[]) {
    this.store.dispatch(PlaceActions.updateSelectedPlaceList({ selectedPlaceList }));
  }

  /**
   * selectLastPlace
   * @param lastSelectedPlace lastSelectedPlace
   */
  selectLastPlace(lastSelectedPlace: Place) {
    this.store.dispatch(PlaceActions.selectLastPlace({ lastSelectedPlace }));
  }

  /**
   * selectCourse
   * @param courseId courseId
   */
  selectCourse(courseId: string) {
    this.store.dispatch(PlaceActions.selectCourse({ courseId }));
  }
}
