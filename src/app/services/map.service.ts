import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private alertController: AlertController
  ) { }

  geocode(placeName: string): Promise<google.maps.LatLng> {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: placeName }, (result, status) => {
        if (this.geocodeResultCheck(status)) {
          resolve(result[0].geometry.location);
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
      this.presentAlert('サーバーエラーが発生しました。再度やり直してください。');
    } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
      this.presentAlert('見つかりませんでした。検索キーワードに誤字や脱字がないかご確認ください。地名や郵便番号を追加してみてください。');
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

  searchMiddlePoint(origin: google.maps.LatLng, destination: google.maps.LatLng): google.maps.LatLng{
    const originLat = origin.lat();
    const originLng = origin.lng();
    const destLat = destination.lat();
    const destLng = destination.lng();
    const middleLat = originLat > destLat 
      ? originLat - ((originLat - destLat) / 2)
      : destLat - ((destLat - originLat) / 2);
    const middleLng = originLng > destLng
      ? originLng - ((originLng - destLng) / 2)
      : destLng - ((destLng - originLng) / 2);
    let result: google.maps.LatLng = new google.maps.LatLng(middleLat, middleLng)
    return result;
  }
}
