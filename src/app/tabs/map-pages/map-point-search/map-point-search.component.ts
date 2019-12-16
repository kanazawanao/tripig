import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Direction } from 'src/app/models/direction.model';
import { Place } from 'src/app/models/place.model';
import { MapService } from 'src/app/services/map.service';
import { Category } from 'src/app/parts/category.class';

@Component({
  selector: 'app-map-point-search',
  templateUrl: './map-point-search.component.html',
  styleUrls: ['./map-point-search.component.scss']
})
export class MapPointSearchComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  private onDestroy$ = new Subject();
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  selectedList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  lastSelectedPlace$: Observable<Place> = this.store.select(
    TripigSelector.getLastSelectedPlace
  );
  direction?: Direction;
  selectedList: Place[] = [];
  min = 1;
  max = 50000;
  radius = 10000;
  thumbLabel = true;
  center: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = { draggable: false };

  constructor(
    private location: Location,
    private store: Store<TripigState.State>,
    private mapService: MapService
  ) {}

  ionViewDidEnter(): void {
    this.lastSelectedPlace$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(place => {
        if (place.location) {
          this.center = place.location;
        }
      });
    this.direction$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(direction => {
        this.direction = direction;
        this.setMap(direction);
      });
    this.selectedList$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(selectedList => {
        this.selectedList = selectedList;
      });
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
  }

  search(category: Category) {
    if (this.direction) {
      this.direction.category = category;
      this.setMap(this.direction);
    }
  }

  private setMap(direction: Direction): void {
    this.mapService
      .geocode({address: direction.destination})
      .then(result => {
        this.center = result.geometry.location;
        this.searchPlace(result.geometry.location, direction);
      })
      .catch(() => {
        this.location.back();
      });
  }

  private searchPlace(latLng: google.maps.LatLng, direction: Direction): void {
    const placeService = new google.maps.places.PlacesService(
      this.map.data.getMap()
    );
    const request: google.maps.places.PlaceSearchRequest = {
      rankBy: google.maps.places.RankBy.PROMINENCE,
      location: latLng,
      radius: direction.radius,
      keyword: `${direction.destination} ${direction.category.value}`
    };
    this.mapService
      .nearbySearch(placeService, request)
      .then(results => {
        const suggestList = [...this.selectedList, ...results].filter((member, index, self) => {
          return self.findIndex(s => member.placeId  === s.placeId) === index;
        });
        this.store.dispatch(
          TripigActions.setSuggestList({ suggestList })
        );
      })
      .catch(() => {
        // TODO: 周辺施設が検索できなかった場合どうするか検討
      });
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

}
