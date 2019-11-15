import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-route-result',
  templateUrl: './map-route-result.component.html',
  styleUrls: ['./map-route-result.component.scss'],
})
export class MapRouteResultComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  regist() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/tabs/registered']);
  }
}
