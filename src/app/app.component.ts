import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { MapRouteResultComponent } from './parts/dialog/map/map-route-result/map-route-result.component';
import { Observable } from 'rxjs';
import { Place } from './models/place.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  showResultRoute = false;
  selectedList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private store: Store<TripigState.State>,
    public auth: AuthService,
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.selectedList$.subscribe(list => {
      this.showResultRoute = list.length > 0;
    });
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async guide() {
    const modal = await this.modalCtrl.create({
      component: MapRouteResultComponent
    });
    return await modal.present();
  }

  signOut() {
    this.auth.signOut();
  }
}
