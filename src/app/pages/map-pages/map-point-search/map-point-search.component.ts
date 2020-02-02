import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Direction } from 'src/app/models/interface/direction.model';
import { Place } from 'src/app/models/interface/place.model';
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
  category$: Observable<Category> = this.store.select(
    TripigSelector.getCategory
  );
  selectedList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  lastSelectedPlace$: Observable<Place> = this.store.select(
    TripigSelector.getLastSelectedPlace
  );
  direction?: Direction;
  selectedList: Place[] = [];
  suggestList: Place[] = [];
  infoContent = '';
  center?: google.maps.LatLng;
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = { draggable: false };

  constructor(
    private location: Location,
    private store: Store<TripigState.State>,
    private mapService: MapService
  ) {}

  ionViewDidEnter(): void {
    this.setCenterOfLastSelectedPlace();
    this.direction$.pipe(
      takeUntil(this.onDestroy$),
      mergeMap(direction => {
        this.direction = direction;
        return this.category$;
      })
    ).subscribe(category => {
      if (this.direction) {
        this.setMap(this.direction, category);
      }
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

  private setCenterOfLastSelectedPlace(): void {
    this.lastSelectedPlace$
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(place => {
        if (place.location) {
          this.center = place.location;
        }
      });
  }

  private setMap(direction: Direction, category: Category): void {
    this.mapService
      .geocode({ address: direction.destination })
      .then(result => {
        this.center = result.geometry.location;
        this.searchSuggestList(direction, category);
      })
      .catch(() => {
        this.location.back();
      });
  }

  private searchSuggestList(direction: Direction, category: Category) {
    const placeService = new google.maps.places.PlacesService(
      this.map.data.getMap()
    );
    const request: google.maps.places.PlaceSearchRequest = {
      rankBy: google.maps.places.RankBy.PROMINENCE,
      location: this.center,
      radius: direction.radius,
      keyword: `${direction.destination} ${category.value}`
    };
    this.mapService
      .nearbySearch(placeService, request)
      .then(results => {
        this.suggestList = [...this.selectedList, ...results].filter(
          (member, index, self) => {
            return self.findIndex(s => member.placeId === s.placeId) === index;
          }
        );
      })
      .catch(() => {
        // TODO: 周辺施設が検索できなかった場合どうするか検討
      });
  }


  openInfoWindow(marker: MapMarker, place: Place): void {
    this.infoContent = place.name ? place.name : '';
    this.infoWindow.open(marker);
  }

  selectPlace(place: Place) {
    this.suggestList.map(s => {
      if (s.placeId === place.placeId) {
        s.selected = !s.selected;
      }
    });
    this.store.dispatch(
      TripigActions.setSelectedList({ selectedList: this.suggestList.filter(s => s.selected) })
    );
  }
}
