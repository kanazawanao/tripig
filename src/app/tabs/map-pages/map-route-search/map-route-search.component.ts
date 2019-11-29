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
    const directionService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const request: google.maps.DirectionsRequest = {
      origin: direction.origin,
      destination: direction.destination,
      travelMode: direction.travelMode,
    };
    directionService.route(request, (result, status) => {
      if (this.routeResultCheck(status)) {
        directionsRenderer.setMap(this.map.data.getMap());
        directionsRenderer.setDirections(result);
      } else {
        this.location.back();
      }
    });
  }

  private routeResultCheck(status: google.maps.DirectionsStatus): boolean {
    if (status === google.maps.DirectionsStatus.OK) {
      return true;
    } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
      this.presentAlert('ルートが見つかりませんでした。');
    } else if (status === google.maps.DirectionsStatus.NOT_FOUND) {
      this.presentAlert('入力された地点を検索することができませんでした。');
    }
    return false;
  }

  private async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '検索に失敗しました',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  middlePointPlaceSearch() {
    const result = this.mapService.searchMiddlePoint(this.originLatLng, this.destinationLatLng);
  }
}
