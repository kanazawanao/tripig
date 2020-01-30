import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigReducer from 'src/app/store/tripig.reducer';
import { Subject } from 'rxjs';
import { PlaceService } from 'src/app/services/place.service';
import { Course } from 'src/app/models/interface/course.models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-registered-routes',
  templateUrl: './registered-routes.component.html',
  styleUrls: ['./registered-routes.component.scss']
})
export class RegisteredRoutesComponent {
  courses: Course[] = [];

  private onDestroy$ = new Subject();
  constructor(
    private router: Router,
    private placeService: PlaceService,
    private store: Store<TripigReducer.State>
  ) {}

  ionViewDidEnter(): void {
    this.placeService
      .getAllPlace()
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
      TripigActions.setSelectedCourseId({ selectedCourseId: course.id ? course.id : '' })
    );
    this.router.navigate(['/tabs/pages/map/course']);
  }

  delete(course: Course): void {
    if (course.id) {
      this.placeService.deletePlace(course.id);
    }
  }
}
