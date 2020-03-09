import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Observable, Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Course } from 'src/app/models/class/course.models';
import { Place } from 'src/app/models/class/place.model';
import { Direction } from 'src/app/models/interface/direction.model';
import { AuthService } from 'src/app/services/auth.service';
import { MapService } from 'src/app/services/map.service';
import { PlaceService } from 'src/app/services/place.service';
import { ConditionFacade } from 'src/app/store/condition/facades';
import { PlaceFacade } from 'src/app/store/place/facades';

@Component({
  selector: 'app-map-route-result',
  templateUrl: './map-route-result.component.html',
  styleUrls: ['./map-route-result.component.scss'],
})
export class MapRouteResultComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap) map!: GoogleMap;
  registForm = this.fb.group({
    courseName: ['', Validators.required],
  });
  courseNameKey = 'courseName';
  get courseName(): string {
    return this.registForm.controls[this.courseNameKey].value;
  }
  private onDestroy$ = new Subject();
  private directionsRenderer = new google.maps.DirectionsRenderer();
  origin$: Observable<string> = this.conditionFacade.origin$;
  origin = '';
  destination$: Observable<string> = this.conditionFacade.destination$;
  destination = '';
  radius$: Observable<number> = this.conditionFacade.radius$;
  radius = 0;
  travelMode$: Observable<google.maps.TravelMode> = this.conditionFacade.travelMode$;
  travelMode = google.maps.TravelMode.DRIVING;
  private direction?: Direction;
  get travelmode(): string {
    return this.direction ? this.direction.travelMode.toString() : '';
  }
  private selectedList$: Observable<Place[]> = this.placeFacade.selectedPlaceList$;
  get googleMapLinks(): string {
    return 'https://www.google.com/maps/dir/?api=1' + this.waypointsForMap + '&travelmode=' + this.travelmode;
  }
  get waypointsForMap(): string {
    return (
      '&origin=' +
      this.originUrlValue +
      '&destination=' +
      this.destinationName +
      '&waypoints=' +
      this.waypoints.map((p) => p.name).join(' | ')
    );
  }
  waypoints: Place[] = [];
  originPlace?: Place = { selected: true };
  destinationPlace?: Place = { selected: true };
  get destinationName(): string {
    return this.destinationPlace ? (this.destinationPlace.name ? this.destinationPlace.name : '') : '';
  }
  resultList: Place[] = [];
  get originUrlValue(): string {
    return this.originPlace ? (this.originPlace.location ? this.originPlace.location.toUrlValue() : '') : '';
  }
  zoom = 16;
  private dist = 0;
  get distance(): string {
    return `約${Math.floor(this.dist / 1000)}km`;
  }
  private dura = 0;
  get duration(): string {
    return `約${Math.floor(this.dura / 60)}分`;
  }
  legs: google.maps.DirectionsLeg[] = [];

  constructor(
    public auth: AuthService,
    private dialogRef: MatDialogRef<MapRouteResultComponent>,
    private router: Router,
    private fb: FormBuilder,
    private inAppBrowser: InAppBrowser,
    private mapService: MapService,
    private placeService: PlaceService,
    private placeFacade: PlaceFacade,
    private conditionFacade: ConditionFacade,
  ) {}

  ngOnInit(): void {
    this.origin$
      .pipe(
        takeUntil(this.onDestroy$),
        mergeMap((origin) => {
          this.origin = origin;
          return this.destination$;
        }),
        mergeMap((destination) => {
          this.destination = destination;
          return this.radius$;
        }),
        mergeMap((radius) => {
          this.radius = radius;
          return this.travelMode$;
        }),
      )
      .subscribe((travelMode) => {
        const direction: Direction = {
          origin: this.origin,
          destination: this.destination,
          radius: this.radius,
          travelMode: travelMode,
        };
        this.direction = direction;
        this.setRouteMap(direction);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  dismissModal(): void {
    this.dialogRef.close();
  }

  regist(): void {
    this.placeService.addPlace(this.createCourse());
    this.placeFacade.updateSelectedPlaceList([]);
    this.dismissModal();
    this.router.navigate(['/tabs/registered']);
  }

  private createCourse(): Course {
    const course: Course = this.createDefaultCourse();
    if (this.originPlace && this.destinationPlace) {
      course.route.push(this.originPlace);
      this.waypoints.forEach((p) => course.route.push(p));
      course.route.push(this.destinationPlace);
    }
    return course;
  }

  private createDefaultCourse(): Course {
    const course = new Course(this.courseName);
    course.name = this.courseName;
    return course;
  }

  private setRouteMap(direction: Direction): void {
    if (direction.origin === '') {
      this.mapService.getCurrentPosition().then((result) => {
        const currentPosition: Place = {
          name: result.formatted_address,
          selected: true,
          location: result.geometry.location,
          placeId: result.place_id,
        };
        this.originPlace = currentPosition;
        this.resultList.push(currentPosition);
        this.setResultRoute(direction);
      });
    } else {
      this.mapService.geocode({ address: direction.origin }).then((result) => {
        this.originPlace = {
          selected: true,
          location: result.geometry.location,
          placeId: result.place_id,
          name: direction.origin,
        };
        this.resultList.push(this.originPlace);
        this.setResultRoute(direction);
      });
    }
  }

  private setResultRoute(direction: Direction): void {
    this.mapService.geocode({ address: direction.destination }).then((result) => {
      this.destinationPlace = {
        selected: true,
        location: result.geometry.location,
        placeId: result.place_id,
        name: direction.destination,
      };
      this.selectedList$.pipe(takeUntil(this.onDestroy$)).subscribe((waypoints) => {
        const request: google.maps.DirectionsRequest = this.CreateDirectionsRequest(direction, waypoints);
        this.mapService
          .route(request)
          .then((routeResult) => {
            this.directionsRenderer.setMap(this.map.data.getMap());
            this.directionsRenderer.setDirections(routeResult);
            routeResult.routes[0].waypoint_order.forEach((index) => {
              this.resultList.push(waypoints[index]);
              this.waypoints.push(waypoints[index]);
            });
            this.calcDistAndDura(routeResult);
            if (this.destinationPlace) {
              this.resultList.push(this.destinationPlace);
            }
          })
          .catch(() => {
            this.dismissModal();
          });
      });
    });
  }

  private CreateDirectionsRequest(direction: Direction, waypoints: Place[]): google.maps.DirectionsRequest {
    return {
      origin: this.originPlace ? this.originPlace.location : undefined,
      destination: this.destinationPlace ? this.destinationPlace.name : undefined,
      waypoints: this.createWaypoints(waypoints),
      travelMode: direction.travelMode,
      optimizeWaypoints: true,
    };
  }

  private calcDistAndDura(result: google.maps.DirectionsResult): void {
    this.dist = 0;
    this.dura = 0;
    result.routes[0].legs.forEach((leg) => {
      this.legs.push(leg);
      this.dist += leg.distance.value;
      this.dura += leg.duration.value;
    });
  }

  private createWaypoints(selectedList: Place[]): google.maps.DirectionsWaypoint[] {
    const waypoints: google.maps.DirectionsWaypoint[] = [];
    selectedList.forEach((selected) => {
      if (selected.location) {
        const p: google.maps.DirectionsWaypoint = {
          location: selected.location,
        };
        waypoints.push(p);
      }
    });
    return waypoints;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.resultList, event.previousIndex, event.currentIndex);
    this.setRoute();
  }

  delete(place: Place): void {
    this.resultList = this.resultList.filter((r) => r.placeId !== place.placeId);
    this.setRoute();
  }

  private setRoute(): void {
    this.setRouteInfo();
    const request: google.maps.DirectionsRequest = this.createDirectionRequest();
    this.mapService
      .route(request)
      .then((result) => {
        this.directionsRenderer.setMap(this.map.data.getMap());
        this.directionsRenderer.setDirections(result);
        this.calcDistAndDura(result);
      })
      .catch(() => {
        this.dismissModal();
      });
  }

  private createDirectionRequest(): google.maps.DirectionsRequest {
    return {
      origin: this.originPlace ? this.originPlace.location : undefined,
      destination: this.destinationPlace ? this.destinationPlace.name : undefined,
      waypoints: this.createWaypoints(this.waypoints),
      travelMode: this.direction ? this.direction.travelMode : undefined,
    };
  }

  private setRouteInfo(): void {
    this.originPlace = this.resultList.shift();
    this.destinationPlace = this.resultList.pop();
    this.waypoints = [];
    this.resultList.forEach((r) => {
      this.waypoints.push(r);
    });
    if (this.originPlace) {
      this.resultList.unshift(this.originPlace);
    }
    if (this.destinationPlace) {
      this.resultList.push(this.destinationPlace);
    }
  }

  toLoginPage(): void {
    this.dismissModal();
    this.router.navigate(['/tabs/pages/signIn']);
  }

  onGoogleMapLinkClick(): void {
    const browser = this.inAppBrowser.create(this.googleMapLinks);
    browser.show();
  }
}
