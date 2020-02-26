import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Course } from 'src/app/models/class/course.models';
import { InviteGroupComponent } from 'src/app/parts/dialog/invite-group/invite-group.component';
import { PlaceService } from 'src/app/services/place.service';
import { actions } from 'src/app/store/tripig.action';
import * as TripigReducer from 'src/app/store/tripig.reducer';

@Component({
  selector: 'app-registered-routes',
  templateUrl: './registered-routes.component.html',
  styleUrls: ['./registered-routes.component.scss'],
})
export class RegisteredRoutesComponent {
  courses: Course[] = [];

  private onDestroy$ = new Subject();
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private placeService: PlaceService,
    private store: Store<TripigReducer.State>,
  ) {}

  ionViewDidEnter(): void {
    this.placeService
      .getAllPlace()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((c) => {
        this.courses = c;
      });
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
  }

  createTravelPlanning() {
    this.router.navigate(['/tabs/pages/plan']);
  }

  select(course: Course): void {
    this.store.dispatch(actions.setSelectedCourseId({ selectedCourseId: course.id ? course.id : '' }));
    this.router.navigate(['/tabs/pages/map/course']);
  }

  delete(course: Course): void {
    if (course.id) {
      this.placeService.deletePlace(course.id);
    }
  }

  inviteGroup(course: Course) {
    this.openDialog(course);
  }

  openDialog(course: Course): void {
    const dialogRef = this.dialog.open(InviteGroupComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      course.uids.push(result);
      this.placeService.updatePlace(course);
    });
  }
}
