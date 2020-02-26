import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Place } from 'src/app/models/class/place.model';
import { Direction } from 'src/app/models/interface/direction.model';
import { Category } from 'src/app/parts/category.class';
import { MapService } from 'src/app/services/map.service';
import * as TripigState from 'src/app/store/';
import { actions } from 'src/app/store/tripig.action';
import { selectors } from 'src/app/store/tripig.selector';

@Component({
  selector: 'app-map-point-search',
  templateUrl: './map-point-search.component.html',
  styleUrls: ['./map-point-search.component.scss'],
})
export class MapPointSearchComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  private onDestroy$ = new Subject();
  direction$: Observable<Direction> = this.store.select(selectors.getDirection);
  category$: Observable<Category> = this.store.select(selectors.getCategory);
  selectedList$: Observable<Place[]> = this.store.select(selectors.getSelectedList);
  lastSelectedPlace$: Observable<Place> = this.store.select(selectors.getLastSelectedPlace);
  direction?: Direction;
  selectedList: Place[] = [];
  suggestList: Place[] = [];
  infoContent = '';
  center?: google.maps.LatLng;
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = { draggable: false };

  constructor(private location: Location, private store: Store<TripigState.State>, private mapService: MapService) {}

  ionViewDidEnter(): void {
    this.setCenterOfLastSelectedPlace();
    this.direction$
      .pipe(
        takeUntil(this.onDestroy$),
        mergeMap((direction) => {
          this.direction = direction;
          return this.category$;
        }),
      )
      .subscribe((category) => {
        if (this.direction) {
          this.setMap(this.direction, category);
        }
      });
    this.selectedList$.pipe(takeUntil(this.onDestroy$)).subscribe((selectedList) => {
      this.selectedList = selectedList;
    });
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
  }

  private setCenterOfLastSelectedPlace(): void {
    this.lastSelectedPlace$.pipe(takeUntil(this.onDestroy$)).subscribe((place) => {
      if (place.location) {
        this.center = place.location;
      }
    });
  }

  private setMap(direction: Direction, category: Category): void {
    this.mapService
      .geocode({ address: direction.destination })
      .then((result) => {
        this.center = result.geometry.location;
        this.searchSuggestList(direction, category);
      })
      .catch(() => {
        this.location.back();
      });
  }

  private searchSuggestList(direction: Direction, category: Category) {
    const placeService = new google.maps.places.PlacesService(this.map.data.getMap());
    const request: google.maps.places.PlaceSearchRequest = {
      rankBy: google.maps.places.RankBy.PROMINENCE,
      location: this.center,
      radius: direction.radius,
      keyword: `${direction.destination} ${category.value}`,
    };
    this.mapService.nearbySearch(placeService, request).then((results) => {
      this.suggestList = [...this.selectedList, ...results].filter((member, index, self) => {
        return self.findIndex((s) => member.placeId === s.placeId) === index;
      });
    });
  }

  openInfoWindow(marker: MapMarker, place: Place): void {
    this.infoContent = place.name ? place.name : '';
    this.infoWindow.open(marker);
  }

  selectPlace(place: Place) {
    this.suggestList.map((s) => {
      if (s.placeId === place.placeId) {
        s.selected = !s.selected;
      }
    });
    this.store.dispatch(actions.setSelectedList({ selectedList: this.suggestList.filter((s) => s.selected) }));
  }
}
