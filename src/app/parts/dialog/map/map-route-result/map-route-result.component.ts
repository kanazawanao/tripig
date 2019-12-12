import { Component, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Direction } from 'src/app/models/direction.model';
import { Place } from 'src/app/models/place.model';
import { MapService } from 'src/app/services/map.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-map-route-result',
  templateUrl: './map-route-result.component.html',
  styleUrls: ['./map-route-result.component.scss']
})
export class MapRouteResultComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
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
      + '&destination=' + this.destination.name
      + '&waypoints=' + this.waypoints.map(p => p.name).join(' | ');
  }
  waypoints: Place[] = [];
  origin: Place = {selected: true};
  resultList: Place[] = [];
  get originUrlValue(): string {
    return this.origin.location
      ? this.origin.location.toUrlValue()
      : '';
  }
  destination: Place = {selected: true};
  center: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;

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
    private zone: NgZone,
    private mapService: MapService
  ) {}

  ionViewDidEnter(): void {
    this.direction$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(direction => {
        this.direction = direction;
        this.zone.run(() => {
          this.setRouteMap(direction);
        });
      });
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
  }

  dismissModal(): void {
    this.modalCtrl.dismiss();
  }

  regist(): void {
    this.modalCtrl.dismiss();
    this.router.navigate(['/tabs/registered']);
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
          const destPosition: Place = {
            name: direction.destination,
            selected: true,
          };
          this.resultList.push(destPosition);
          this.destination = destPosition;
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
      origin: this.origin.location,
      destination: direction.destination,
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
  }

  delete(place: Place) {
    this.resultList = this.resultList.filter(r => r.placeId !== place.placeId);
  }
}
