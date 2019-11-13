import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Direction } from 'src/app/models/direction.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-map-route-search',
  templateUrl: './map-route-search.component.html',
  styleUrls: ['./map-route-search.component.scss']
})
export class MapRouteSearchComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  private onDestroy$ = new Subject();
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  center: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;

  constructor(
    private router: Router,
    private store: Store<TripigState.State>,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.direction$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(direction => this.setRouteMap(direction));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private setRouteMap(direction: Direction) {
    const directionService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const request: google.maps.DirectionsRequest = {
      origin: direction.leaving,
      destination: direction.arrival,
      travelMode: direction.travelMode
    };
    directionService.route(request, (result, status) => {
      if (this.routeResultCheck(status)) {
        directionsRenderer.setMap(this.map.data.getMap());
        directionsRenderer.setDirections(result);
      } else {
        this.router.navigate(['/tabs/route']);
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
}
