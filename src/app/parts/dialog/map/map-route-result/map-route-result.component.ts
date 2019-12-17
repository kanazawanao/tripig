import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import * as TripigActions from 'src/app/store/tripig.action';
import { Direction } from 'src/app/models/direction.model';
import { Place } from 'src/app/models/place.model';
import { MapService } from 'src/app/services/map.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/services/auth.service';
import { PlaceService } from 'src/app/services/place.service';
import { Course } from 'src/app/models/course.models';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-map-route-result',
  templateUrl: './map-route-result.component.html',
  styleUrls: ['./map-route-result.component.scss']
})
export class MapRouteResultComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  registForm = this.fb.group({
    courseName: ['', Validators.required]
  });
  courseNameKey = 'courseName';
  get courseName(): string {
    return this.registForm.controls[this.courseNameKey].value;
  }
  private onDestroy$ = new Subject();
  private directionsRenderer = new google.maps.DirectionsRenderer();
  private direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  private direction?: Direction;
  get travelmode(): string {
    return this.direction
      ? this.direction.travelMode.toString()
      : '';
  }
  private selectedList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  get googleMapLinks(): string {
    return 'https://www.google.com/maps/dir/?api=1' +
          this.waypointsForMap +
          '&travelmode=' + this.travelmode;
  }
  get waypointsForMap(): string {
    return '&origin=' + this.originUrlValue
      + '&destination=' + this.destinationName
      + '&waypoints=' + this.waypoints.map(p => p.name).join(' | ');
  }
  waypoints: Place[] = [];
  origin?: Place = {selected: true};
  destination?: Place = {selected: true};
  get destinationName(): string {
    return this.destination
      ? this.destination.name
        ? this.destination.name
        : ''
      : '';
  }
  resultList: Place[] = [];
  get originUrlValue(): string {
    return this.origin
      ? this.origin.location
        ? this.origin.location.toUrlValue()
        : ''
      : '';
  }
  center: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;
  loggedIn = false;
  private dist = 0;
  get distance(): string {
    return `約${Math.floor(this.dist / 1000)}km`;
  }

  private dura = 0;
  get duration(): string {
    return `約${Math.floor(this.dura / 60)}分`;
  }

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private store: Store<TripigState.State>,
    private mapService: MapService,
    private placeService: PlaceService,
    private fb: FormBuilder,
    public auth: AuthService
  ) { }

  ionViewDidEnter(): void {
    console.log(this.auth.loggedIn);
    this.direction$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(direction => {
        this.direction = direction;
        this.setRouteMap(direction);
      });
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
  }

  dismissModal(): void {
    this.modalCtrl.dismiss();
  }

  regist(): void {
    this.placeService.addPlace(this.createCourse());
    this.store.dispatch(
      TripigActions.setSelectedList({ selectedList: [] })
    );
    this.modalCtrl.dismiss();
    this.router.navigate(['/tabs/registered']);
  }

  private createCourse() {
    const course: Course = {
      name: this.courseName,
      route: []
    };
    if (this.origin && this.destination) {
      course.route.push(this.origin);
      this.waypoints.forEach(p => course.route.push(p));
      course.route.push(this.destination);
    }
    return course;
  }

  private setRouteMap(direction: Direction): void {
    if (direction.origin === '') {
      this.mapService.getCurrentPosition().then(result => {
        const currentPosition: Place = {
          name: '現在地',
          selected: true,
          location: result.geometry.location,
          placeId: result.place_id
        };
        this.origin = currentPosition;
        this.resultList.push(currentPosition);
        this.setResultRoute(direction);
      });
    } else {
      this.mapService.geocode({address: direction.origin}).then(result => {
        this.origin = {
          selected: true,
          location: result.geometry.location,
          placeId: result.place_id,
          name: direction.origin
        };
        this.resultList.push(this.origin);
        this.setResultRoute(direction);
      });
    }
  }

  private setResultRoute(direction: Direction) {
    const destPosition: Place = {
      name: direction.destination,
      selected: true,
    };
    this.destination = destPosition;
    this.selectedList$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(waypoints => {
        const request: google.maps.DirectionsRequest = this.CreateDirectionsRequest(direction, waypoints);
        this.mapService.route(request).then(result => {
          this.directionsRenderer.setMap(this.map.data.getMap());
          this.directionsRenderer.setDirections(result);
          result.routes[0].waypoint_order.forEach(index => {
            this.resultList.push(waypoints[index]);
            this.waypoints.push(waypoints[index]);
          });
          this.calcDistAndDura(result);
          if (this.destination) {
            this.resultList.push(this.destination);
          }
        }).catch(() => {
          this.dismissModal();
        });
      });
  }

  private CreateDirectionsRequest(
    direction: Direction,
    waypoints: Place[],
  ): google.maps.DirectionsRequest {
    return {
      origin: this.origin ? this.origin.location : undefined,
      destination: this.destination ? this.destination.name : undefined,
      waypoints: this.createWaypoints(waypoints),
      travelMode: direction.travelMode,
      optimizeWaypoints: true
    };
  }

  private calcDistAndDura(result: google.maps.DirectionsResult): void {
    this.dist = 0;
    this.dura = 0;
    result.routes[0].legs.forEach(leg => {
      this.dist += leg.distance.value;
      this.dura += leg.duration.value;
    });
  }

  private createWaypoints(
    selectedList: Place[]
  ): google.maps.DirectionsWaypoint[] {
    const waypoints: google.maps.DirectionsWaypoint[] = [];
    selectedList.forEach(selected => {
      if (selected.location) {
        const p: google.maps.DirectionsWaypoint = {
          location: selected.location
        };
        waypoints.push(p);
      }
    });
    return waypoints;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.resultList, event.previousIndex, event.currentIndex);
    this.setRoute();
  }

  delete(place: Place) {
    this.resultList = this.resultList.filter(r => r.placeId !== place.placeId);
    this.setRoute();
  }

  private setRoute() {
    this.origin = this.resultList.shift();
    this.destination = this.resultList.pop();
    this.waypoints = [];
    this.resultList.forEach(r => {
      this.waypoints.push(r);
    });
    if (this.origin) {
      this.resultList.unshift(this.origin);
    }
    if (this.destination) {
      this.resultList.push(this.destination);
    }
    const request: google.maps.DirectionsRequest = {
      origin: this.origin ? this.origin.location : undefined,
      destination: this.destination ? this.destination.name : undefined,
      waypoints: this.createWaypoints(this.waypoints),
      travelMode: this.direction ? this.direction.travelMode : undefined
    };
    this.mapService.route(request).then(result => {
      this.directionsRenderer.setMap(this.map.data.getMap());
      this.directionsRenderer.setDirections(result);
      this.calcDistAndDura(result);
    }).catch(() => {
      this.dismissModal();
    });
  }

  toLoginPage() {
    this.dismissModal();
    this.router.navigate(['/tabs/pages/signIn']);
  }
}
