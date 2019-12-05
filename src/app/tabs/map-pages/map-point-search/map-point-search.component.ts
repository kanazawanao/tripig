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
import { Category, CATEGORIES } from 'src/app/parts/category.class';

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
  direction?: Direction;
  categories: Category[] = CATEGORIES;
  suggestList: Place[] = [];
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
    this.direction$.pipe(takeUntil(this.onDestroy$)).subscribe(direction => {
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
    this.store.dispatch(
      TripigActions.setSelectedList({ selectedList: this.selectedList })
    );
  }

  private setMap(direction: Direction): void {
    console.log('setMap');
    this.mapService
      .geocode(direction.destination)
      .then(result => {
        this.center = result;
        this.searchPlace(result, direction);
      })
      .catch(() => {
        this.location.back();
      });
  }

  search(category: Category) {
    console.log('search');
    console.log(category);
    if (this.direction) {
      this.direction.category = category;
      this.setMap(this.direction);
    }
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
        // FIXME: selectedListとresultの内容が重複してしまうので、同じLatLngの地点は排除したい
        this.suggestList = this.selectedList.concat(results);
      })
      .catch(() => {
        // TODO: 周辺施設が検索できなかった場合どうするか検討
      });
  }

  openInfoWindow(marker: MapMarker): void {
    this.infoWindow.open(marker);
  }

  onSelectionChange(): void {
    this.store.dispatch(
      TripigActions.setSelectedList({
        selectedList: this.suggestList.filter(s => s.selected === true)
      })
    );
  }
}
