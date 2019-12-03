import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Direction } from 'src/app/models/direction.model';
import { Place } from 'src/app/models/place.model';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-point-search',
  templateUrl: './map-point-search.component.html',
  styleUrls: ['./map-point-search.component.scss']
})
export class MapPointSearchComponent {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, {static: false}) infoWindow!: MapInfoWindow;
  private onDestroy$ = new Subject();
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  selectedList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  suggestList: Place[] = [];
  selectedList: Place[] = [];
  min = 1;
  max = 50000;
  radius = 10000;
  thumbLabel = true;
  center: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = {draggable: false};

  constructor(
    private location: Location,
    private store: Store<TripigState.State>,
    private alertController: AlertController,
    private mapService: MapService
  ) {}

  ionViewDidEnter(): void {
    this.direction$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(direction => this.setMap(direction));
    this.selectedList$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(selectedList => {
        this.selectedList = selectedList;
      });
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
    this.store.dispatch(
      TripigActions.setSelectedList({ selectedList: this.selectedList })
    );
  }

  private setMap(direction: Direction): void {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: direction.destination }, (result, status) => {
      if (this.geocodeResultCheck(status)) {
        this.center = result[0].geometry.location;
        this.searchPlace(result[0].geometry.location, direction);
      } else {
        this.location.back();
      }
    });
  }

  private geocodeResultCheck(status: google.maps.GeocoderStatus): boolean {
    if (status === google.maps.GeocoderStatus.OK) {
      return true;
    } else if (status === google.maps.GeocoderStatus.ERROR) {
      this.presentAlert('接続に失敗しました。再度やり直してください。');
    } else if (status === google.maps.GeocoderStatus.INVALID_REQUEST) {
      this.presentAlert('リクエストが無効です。');
    } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
      this.presentAlert('時間をおいて再度やり直してください。');
    } else if (status === google.maps.GeocoderStatus.REQUEST_DENIED) {
      this.presentAlert('Mapの利用が許可されていません。');
    } else if (status === google.maps.GeocoderStatus.UNKNOWN_ERROR) {
      this.presentAlert('サーバーエラーが発生しました。再度やり直してください。');
    } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
      this.presentAlert('見つかりませんでした。検索キーワードに誤字や脱字がないかご確認ください。地名や郵便番号を追加してみてください。');
    }
    return false;
  }

  private searchPlace(latLng: google.maps.LatLng, direction: Direction): void {
    const placeService = new google.maps.places.PlacesService(
      this.map.data.getMap()
    );
    const request: google.maps.places.PlaceSearchRequest = {
      rankBy: google.maps.places.RankBy.PROMINENCE,
      location: latLng,
      radius: direction.radius,
      type: direction.looking,
      keyword: direction.destination
    };

    this.mapService.nearbySearch(placeService, request).then(results => {
      // FIXME: selectedListとresultの内容が重複してしまうので、同じLatLngの地点は排除したい
      this.suggestList = this.selectedList.concat(results);
    }).catch(() => {
      // TODO: 周辺施設が検索できなかった場合どうするか検討
    });
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

  openInfoWindow(marker: MapMarker): void {
    this.infoWindow.open(marker);
  }

  onSelectionChange(): void {
    this.store.dispatch(
      TripigActions.setSelectedList({ selectedList: this.suggestList.filter(s => s.selected === true) })
    );
  }
}
