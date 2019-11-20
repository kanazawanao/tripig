import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GoogleMap } from '@angular/google-maps';
import { ModalController, AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Direction } from 'src/app/models/direction.model';

@Component({
  selector: 'app-map-route-result',
  templateUrl: './map-route-result.component.html',
  styleUrls: ['./map-route-result.component.scss'],
})
export class MapRouteResultComponent {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  selectedList$: Observable<google.maps.places.PlaceResult[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  private onDestroy$ = new Subject();
  center: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;
  constructor(
    private location: Location,
    private modalCtrl: ModalController,
    private router: Router,
    private store: Store<TripigState.State>,
    private alertController: AlertController
  ) { }

  ionViewDidEnter() {
    this.direction$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(direction => this.setRouteMap(direction));
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
  }


  dismissModal() {
    this.modalCtrl.dismiss();
  }

  regist() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/tabs/registered']);
  }

  private setRouteMap(direction: Direction) {
    const directionService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // HACK: subscribeのネストはやめたい
        this.selectedList$
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(waypoints => {
            const request: google.maps.DirectionsRequest = {
              origin: latlng,
              destination: direction.destination,
              waypoints: this.createWaypoints(waypoints),
              travelMode: direction.travelMode,
              optimizeWaypoints: true,
            };
            directionService.route(request, (result, status) => {
              if (this.routeResultCheck(status)) {
                directionsRenderer.setMap(this.map.data.getMap());
                directionsRenderer.setDirections(result);
                // TODO: 出発～到着までのルートをresultから抽出したいからできるのか確認
                console.log(result.geocoded_waypoints);
                console.log(result.routes);
                result.geocoded_waypoints.forEach(g => {
                  const gRequest: google.maps.GeocoderRequest = {
                    placeId: g.place_id
                  };
                  const geocoder = new google.maps.Geocoder();
                  geocoder.geocode(gRequest, (gResults, gStatus) => {
                    if (gStatus === google.maps.GeocoderStatus.OK) {
                      console.log(gResults);
                    }
                  });
                });
              } else {
                this.location.back();
              }
            });
          });
      });
    } else {
      // TODO: geolocation IS NOT available
    }
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

  private createWaypoints(selectedList: google.maps.places.PlaceResult[]): google.maps.DirectionsWaypoint[] {
    const waypoints: google.maps.DirectionsWaypoint[] = [];
    selectedList.forEach(selected => {
      if (selected.geometry) {
        const p: google.maps.DirectionsWaypoint = {
          location: selected.geometry.location,
        };
        waypoints.push(p);
      }
    });
    return waypoints;
  }
}
