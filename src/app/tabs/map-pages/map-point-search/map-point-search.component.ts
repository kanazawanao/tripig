import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Direction } from 'src/app/models/direction.model';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map-point-search',
  templateUrl: './map-point-search.component.html',
  styleUrls: ['./map-point-search.component.scss']
})
export class MapPointSearchComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  suggestList: google.maps.places.PlaceResult[] = [];
  RADIUS = 1000;
  private onDestroy$ = new Subject();
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  center: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;

  constructor(private store: Store<TripigState.State>) {}

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
        this.searchPlace(result[0].geometry.location, direction);
      }
    });
  }

  private geocodeResultCheck(status: google.maps.GeocoderStatus): boolean {
    if (status === google.maps.GeocoderStatus.OK) {
      return true;
    }
    return false;
  }

  searchPlace(latLng: google.maps.LatLng, direction: Direction) {
    const placeService = new google.maps.places.PlacesService(
      this.map.data.getMap()
    );
    const request: google.maps.places.PlaceSearchRequest = {
      rankBy: google.maps.places.RankBy.PROMINENCE,
      location: latLng,
      radius: this.RADIUS,
      type: direction.looking
    };
    placeService.nearbySearch(request, (results, status) => {
      if (this.nearbySearchResultCheck(status)) {
        this.suggestList = results;
        console.log(results);
      }
    });
  }

  private nearbySearchResultCheck(
    status: google.maps.places.PlacesServiceStatus
  ): boolean {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      return true;
    }
    return false;
  }
}
