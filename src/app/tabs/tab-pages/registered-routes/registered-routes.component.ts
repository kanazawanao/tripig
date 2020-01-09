import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigReducer from 'src/app/store/tripig.reducer';
import { Observable, Subject } from 'rxjs';
import { PlaceService } from 'src/app/services/place.service';
import { Course } from 'src/app/models/course.models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-registered-routes',
  templateUrl: './registered-routes.component.html',
  styleUrls: ['./registered-routes.component.scss']
})
export class RegisteredRoutesComponent {
  courses$: Observable<Course[]> = this.placeService.getAllPlace();
  courses: Course[] = [];

  private onDestroy$ = new Subject();
  constructor(
    private router: Router,
    private placeService: PlaceService,
    private store: Store<TripigReducer.State>
  ) {}

  ionViewDidEnter(): void {
    this.courses$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(c => {
        this.courses = c;
      });
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
  }

  select(course: Course): void {
    this.store.dispatch(
      TripigActions.setSelectedCourse({ selectedCourse: course })
    );
    this.router.navigate(['/tabs/pages/map/course']);
  }

  delete(course: Course): void {
    this.placeService.deletePlace(course);
  }
}
