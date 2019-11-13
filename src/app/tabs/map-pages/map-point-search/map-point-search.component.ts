import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Observable } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';

@Component({
  selector: 'app-map-point-search',
  templateUrl: './map-point-search.component.html',
  styleUrls: ['./map-point-search.component.scss'],
})
export class MapPointSearchComponent implements OnInit {
  direction$: Observable<Direction> = this.store.select(TripigSelector.getDirection);
  center: google.maps.LatLng =  new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;

  constructor(private store: Store<TripigState.State>) { }

  ngOnInit() {
    this.direction$
      .subscribe(direction => {
        console.log(direction);
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: direction.arrival }, (result, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.center = result[0].geometry.location;
          }
        });
      });
  }
}
