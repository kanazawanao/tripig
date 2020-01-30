import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MapMarker, MapInfoWindow, GoogleMap } from '@angular/google-maps';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Course } from 'src/app/models/interface/course.models';
import { Place } from 'src/app/models/interface/place.model';
import { MapService } from 'src/app/services/map.service';
import { PlaceService } from 'src/app/services/place.service';
import * as TripigActions from 'src/app/store/tripig.action';

@Component({
  selector: 'app-map-selected-course',
  templateUrl: './map-selected-course.component.html',
  styleUrls: ['./map-selected-course.component.scss']
})
export class MapSelectedCourseComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  initLatLng: google.maps.LatLng = new google.maps.LatLng(
    37.421995,
    -122.084092
  );
  center = this.initLatLng;
  zoom = 16;
  selectedCourse?: Course;
  infoContent = '';
  directionsRenderer = new google.maps.DirectionsRenderer();
  private onDestroy$ = new Subject();
  constructor(
    private router: Router,
    private location: Location,
    private store: Store<TripigState.State>,
    private mapService: MapService,
    private placeService: PlaceService,
  ) {}

  ionViewDidEnter() {
    this.store.select(TripigSelector.getSelectedCourseId)
      .pipe(
        mergeMap(id => this.placeService.getPlace(id))
      )
      .subscribe(course => {
        this.selectedCourse = course;
        if (course) {
          this.setRoute(course);
        }
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

  drop(event: CdkDragDrop<Place[]>): void {
    if (this.selectedCourse) {
      moveItemInArray(this.selectedCourse.route, event.previousIndex, event.currentIndex);
      this.placeService.updatePlace(this.selectedCourse);
    }
  }

  delete(place: Place): void {
    if (this.selectedCourse) {
      this.selectedCourse.route = this.selectedCourse.route.filter(r => r.placeId !== place.placeId);
    }
  }

  save() {
    if (this.selectedCourse) {
      this.placeService.addPlace(this.selectedCourse);
      this.store.dispatch(TripigActions.setSelectedList({ selectedList: [] }));
      this.router.navigate(['/tabs/registered']);
    }
  }
}
