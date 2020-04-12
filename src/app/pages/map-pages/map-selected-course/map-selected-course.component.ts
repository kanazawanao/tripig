import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Course } from 'src/app/models/class/course.models';
import { Place } from 'src/app/models/class/place.model';
import { MapComponent } from 'src/app/parts/map/map.component';
import { MapService } from 'src/app/services/map.service';
import { PlaceService } from 'src/app/services/place.service';
import { PlaceFacade } from 'src/app/store/place/facades';

@Component({
  selector: 'app-map-selected-course',
  templateUrl: './map-selected-course.component.html',
  styleUrls: ['./map-selected-course.component.scss'],
})
export class MapSelectedCourseComponent implements OnInit, OnDestroy {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  selectedCourse?: Course;
  deletedPlaces: Place[] = [];
  infoContent = '';
  directionsRenderer = new google.maps.DirectionsRenderer();
  private onDestroy$ = new Subject();
  constructor(
    private location: Location,
    private route: Router,
    private placeFacade: PlaceFacade,
    private mapService: MapService,
    private placeService: PlaceService,
  ) {}

  ngOnInit() {
    this.placeFacade.selectedCourseId$
      .pipe(mergeMap((id) => this.placeService.getPlace(id)))
      .pipe(
        mergeMap((course) => {
          this.selectedCourse = course;
          if (course) {
            this.setRoute(course);
          }
          return this.placeService.getDeletedPlaces(course ? (course.id ? course.id : '') : '');
        }),
      )
      .subscribe((deleted) => {
        this.deletedPlaces = deleted ? Object.values(deleted) : [];
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private setRoute(course: Course) {
    const origin = course.route[0];
    const destination = course.route[course.route.length - 1];
    const request: google.maps.DirectionsRequest = {
      origin: origin.location,
      destination: destination.name,
      waypoints: this.createWaypoints(course),
      travelMode: course.travelMode,
    };
    this.mapService
      .route(request)
      .then((result) => {
        this.directionsRenderer.setMap(this.mapComponent.map.data.getMap());
        this.directionsRenderer.setDirections(result);
      })
      .catch(() => {
        this.location.back();
      });
  }

  private createWaypoints(course: Course): google.maps.DirectionsWaypoint[] {
    const waypoints: google.maps.DirectionsWaypoint[] = [];
    course.route.slice(1, course.route.length - 1).forEach((selected) => {
      if (selected.location) {
        const p: google.maps.DirectionsWaypoint = {
          location: selected.location,
        };
        waypoints.push(p);
      }
    });
    return waypoints;
  }

  drop(event: CdkDragDrop<Place[]>): void {
    if (this.selectedCourse) {
      moveItemInArray(this.selectedCourse.route, event.previousIndex, event.currentIndex);
      this.placeService.updatePlace(this.selectedCourse);
    }
  }

  delete(place: Place): void {
    if (this.selectedCourse) {
      if (this.selectedCourse.id) {
        this.placeService.setDeletedPlace(
          this.selectedCourse.id,
          this.deletedPlaces.concat(this.selectedCourse.route.filter((r) => r.placeId === place.placeId)),
        );
      }
      this.selectedCourse.route = this.selectedCourse.route.filter((r) => r.placeId !== place.placeId);
      this.placeService.updatePlace(this.selectedCourse);

      if (this.selectedCourse.route.length === 0 && this.selectedCourse.id) {
        this.placeService.deletePlace(this.selectedCourse.id);
        this.route.navigate(['/tabs/registered']);
      }
    }
  }

  restore(deletedPlace: Place): void {
    this.deletedPlaces = this.deletedPlaces.filter((d) => d.placeId !== deletedPlace.placeId);
    if (this.selectedCourse) {
      this.selectedCourse.route.push(deletedPlace);
      this.placeService.updatePlace(this.selectedCourse);
      if (this.selectedCourse.id) {
        this.placeService.setDeletedPlace(this.selectedCourse.id, this.deletedPlaces);
      }
    }
  }
}
