import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { GoogleMap } from '@angular/google-maps';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Direction } from 'src/app/models/direction.model';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-route-search',
  templateUrl: './map-route-search.component.html',
  styleUrls: ['./map-route-search.component.scss']
})
export class MapRouteSearchComponent {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  private onDestroy$ = new Subject();
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  center: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;
  originLatLng: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  destinationLatLng: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);

  constructor(
    private location: Location,
    private store: Store<TripigState.State>,
    private alertController: AlertController,
    private mapService: MapService
  ) {}

  ionViewDidEnter(): void {
    this.direction$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(direction => this.setRouteMap(direction));
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
  }

  private setRouteMap(direction: Direction): void {
    this.mapService.geocode(direction.origin).then(result => {
      this.originLatLng = result;
    }).catch(() => {
      this.location.back();
    });
    this.mapService.geocode(direction.destination).then(result => {
      this.destinationLatLng = result;
    }).catch(() => {
      this.location.back();
    });
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const request: google.maps.DirectionsRequest = {
      origin: direction.origin,
      destination: direction.destination,
      travelMode: direction.travelMode,
    };
    this.mapService.route(request).then(result => {
      directionsRenderer.setMap(this.map.data.getMap());
      directionsRenderer.setDirections(result);
    }).catch(() => {
      this.location.back();
    });
  }

  middlePointPlaceSearch() {
    const result = this.mapService.searchMiddlePoint(this.originLatLng, this.destinationLatLng);
  }
}
