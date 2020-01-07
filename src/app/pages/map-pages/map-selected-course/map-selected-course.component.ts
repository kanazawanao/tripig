import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Observable, Subject } from 'rxjs';
import { Course } from 'src/app/models/course.models';
import { takeUntil } from 'rxjs/operators';
import { MapMarker, MapInfoWindow, GoogleMap } from '@angular/google-maps';
import { Place } from 'src/app/models/place.model';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-selected-course',
  templateUrl: './map-selected-course.component.html',
  styleUrls: ['./map-selected-course.component.scss'],
})
export class MapSelectedCourseComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  selectedCourse$: Observable<Course> = this.store.select(
    TripigSelector.getSelectedCourse
  );
  initLatLng: google.maps.LatLng = new google.maps.LatLng(
    37.421995,
    -122.084092
  );
  center =  this.initLatLng;
  zoom = 16;
  selectedCourse?: Course;
  infoContent = '';
  directionsRenderer = new google.maps.DirectionsRenderer();
  private onDestroy$ = new Subject();
  constructor(
    private location: Location,
    private store: Store<TripigState.State>,
    private mapService: MapService
  ) { }

  ionViewDidEnter() {
    this.selectedCourse$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(s => {
        this.selectedCourse = s;
        this.setRoute(s);
      });
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
  }

  private setRoute(course: Course) {
    const origin = course.route[0];
    const destination = course.route[course.route.length - 1];
    const request: google.maps.DirectionsRequest = {
      origin: origin.location,
      destination: destination.name,
      waypoints: this.createWaypoints(course),
      travelMode: course.travelMode
    };
    this.mapService
      .route(request)
      .then(result => {
        this.directionsRenderer.setMap(this.map.data.getMap());
        this.directionsRenderer.setDirections(result);
      })
      .catch(() => {
        this.location.back();
      });
  }

  private createWaypoints(course: Course): google.maps.DirectionsWaypoint[] {
    const waypoints: google.maps.DirectionsWaypoint[] = [];
    course.route.slice(1, course.route.length - 1).forEach(selected => {
      if (selected.location) {
        const p: google.maps.DirectionsWaypoint = {
          location: selected.location
        };
        waypoints.push(p);
      }
    });
    return waypoints;
  }

  openInfoWindow(marker: MapMarker, place: Place): void {
    this.infoContent = place.name ? place.name : '';
    this.infoWindow.open(marker);
  }
}
