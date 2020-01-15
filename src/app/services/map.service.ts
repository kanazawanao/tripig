import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Place } from '../models/interface/place.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(
    private alertController: AlertController,
    private geolocation: Geolocation
  ) {}

  getCurrentPosition(): Promise<google.maps.GeocoderResult> {
    return new Promise((resolve, reject) => {
      this.geolocation
        .getCurrentPosition()
        .then(position => {
          resolve(
            this.geocode({
              location: new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              )
            })
          );
        })
        .catch(error => {
          console.log('Error getting location', error);
          reject(error);
        });
    });
  }

  geocode(
    request: google.maps.GeocoderRequest
  ): Promise<google.maps.GeocoderResult> {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode(request, (result, status) => {
        if (this.geocodeResultCheck(status)) {
          resolve(result[0]);
        } else {
          reject(status);
        }
      });
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
      this.presentAlert(
        'サーバーエラーが発生しました。再度やり直してください。'
      );
    } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
      this.presentAlert(
        '見つかりませんでした。検索キーワードに誤字や脱字がないかご確認ください。地名や郵便番号を追加してみてください。'
      );
    }
    return false;
  }

  route(
    request: google.maps.DirectionsRequest
  ): Promise<google.maps.DirectionsResult> {
    const directionService = new google.maps.DirectionsService();
    return new Promise((resolve, reject) => {
      directionService.route(request, (result, status) => {
        if (this.routeResultCheck(status)) {
          resolve(result);
        } else {
          reject(status);
        }
      });
    });
  }

  private routeResultCheck(status: google.maps.DirectionsStatus): boolean {
    if (status === google.maps.DirectionsStatus.OK) {
      return true;
    } else if (status === google.maps.DirectionsStatus.INVALID_REQUEST) {
      this.presentAlert('リクエストが無効です。');
    } else if (status === google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED) {
      this.presentAlert(
        '経由地点が多すぎて検索することができませんでした。最大8箇所までに絞り込んでください。'
      );
    } else if (status === google.maps.DirectionsStatus.NOT_FOUND) {
      this.presentAlert('入力された地点を検索することができませんでした。');
    } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
      this.presentAlert('時間をおいて再度やり直してください。');
    } else if (status === google.maps.DirectionsStatus.REQUEST_DENIED) {
      this.presentAlert('Mapの利用が許可されていません。');
    } else if (status === google.maps.DirectionsStatus.UNKNOWN_ERROR) {
      this.presentAlert(
        'サーバーエラーが発生しました。再度やり直してください。'
      );
    } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
      this.presentAlert('ルートが見つかりませんでした。');
    }
    return false;
  }

  nearbySearch(
    service: google.maps.places.PlacesService,
    request: google.maps.places.PlaceSearchRequest
  ): Promise<Place[]> {
    return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if (this.nearbySearchResultCheck(status)) {
          resolve(this.ToPlaceArray(results));
        } else {
          reject(status);
        }
      });
    });
  }

  private nearbySearchResultCheck(
    status: google.maps.places.PlacesServiceStatus
  ): boolean {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      return true;
    } else if (status === google.maps.places.PlacesServiceStatus.NOT_FOUND) {
      this.presentAlert('お探しの周辺施設が見つかりませんでした。');
    } else if (
      status === google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR
    ) {
      this.presentAlert(
        'サーバーエラーが発生しました。再度やり直してください。'
      );
    } else if (
      status === google.maps.places.PlacesServiceStatus.INVALID_REQUEST
    ) {
      this.presentAlert('リクエストが無効です。');
    } else if (
      status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT
    ) {
      this.presentAlert('時間をおいて再度やり直してください。');
    } else if (
      status === google.maps.places.PlacesServiceStatus.REQUEST_DENIED
    ) {
      this.presentAlert('Mapの利用が許可されていません。');
    } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      this.presentAlert('お探しの周辺施設が見つかりませんでした。');
    }
    return false;
  }

  private ToPlaceArray(results: google.maps.places.PlaceResult[]): Place[] {
    const placeList: Place[] = [];
    results.forEach(r => {
      placeList.push({
        icon: r.icon,
        name: r.name,
        photos: r.photos
          ? r.photos.map(p => p.getUrl({ maxHeight: 500, maxWidth: 500 }))
          : [],
        selected: false,
        location: r.geometry ? r.geometry.location : undefined,
        placeId: r.place_id,
        rating: r.rating,
        // HACK: PlaceResultにuser_ratings_totalが定義されていない
        numberOfReviews: (r as any).user_ratings_total
      });
    });
    return placeList;
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
