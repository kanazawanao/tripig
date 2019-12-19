import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Observable, Subject } from 'rxjs';
import { Course } from 'src/app/models/course.models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-map-selected-course',
  templateUrl: './map-selected-course.component.html',
  styleUrls: ['./map-selected-course.component.scss'],
})
export class MapSelectedCourseComponent {
  selectedCourse$: Observable<Course> = this.store.select(
    TripigSelector.getSelectedCourse
  );
  selectedCourse?: Course;
  private onDestroy$ = new Subject();
  constructor(
    private store: Store<TripigState.State>,
  ) { }

  ionViewDidEnter() {
    this.selectedCourse$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(s => {
        this.selectedCourse = s;
      });
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
  }
}
