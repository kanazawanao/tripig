import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Observable } from 'rxjs';
import { GoogleMap } from '@angular/google-maps';
import { Direction } from 'src/app/models/direction.model';

@Component({
  selector: 'app-map-route-search',
  templateUrl: './map-route-search.component.html',
  styleUrls: ['./map-route-search.component.scss'],
})
export class MapRouteSearchComponent implements OnInit {
  @ViewChild(GoogleMap, {static: false}) map!: GoogleMap;
  direction$: Observable<Direction> = this.store.select(TripigSelector.getDirection);
  center: google.maps.LatLng =  new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;

  constructor(private store: Store<TripigState.State>) { }

  ngOnInit() {
    this.direction$
      .pipe()
      .subscribe(direction => {
        console.log(direction);
        const directionService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        const request: google.maps.DirectionsRequest = {
          origin: direction.leaving,
          destination: direction.arrival,
          travelMode: google.maps.TravelMode.WALKING,
        };
        directionService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setMap(this.map.data.getMap());
            directionsRenderer.setDirections(result);
          }
        });
      });
  }
}
