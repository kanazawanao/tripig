import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Direction } from 'src/app/models/direction.model';

@Component({
  selector: 'app-map-point-search',
  templateUrl: './map-point-search.component.html',
  styleUrls: ['./map-point-search.component.scss'],
})
export class MapPointSearchComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject();
  direction$: Observable<Direction> = this.store.select(TripigSelector.getDirection);
  center: google.maps.LatLng =  new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;

  constructor(private store: Store<TripigState.State>) { }

  ngOnInit() {
    this.direction$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(direction => this.setMap(direction));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private setMap(direction: Direction) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: direction.arrival }, (result, status) => {
      if (this.geocodeResultCheck(status)) {
        this.center = result[0].geometry.location;
      }
    });
  }

  private geocodeResultCheck(status: google.maps.GeocoderStatus): boolean {
    if (status === google.maps.GeocoderStatus.OK) {
      return true;
    }
    return false;
  }
}
