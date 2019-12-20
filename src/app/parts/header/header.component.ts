import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapRouteResultComponent } from '../dialog/map/map-route-result/map-route-result.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { AuthService } from 'src/app/services/auth.service';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showResultRoute = false;
  selectedList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  constructor(
    private store: Store<TripigState.State>,
    private modalCtrl: ModalController,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.selectedList$.subscribe(list => {
      this.showResultRoute = list.length > 0;
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
