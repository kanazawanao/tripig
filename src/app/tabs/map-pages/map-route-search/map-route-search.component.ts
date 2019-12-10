import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Direction } from 'src/app/models/direction.model';
import { MapService } from 'src/app/services/map.service';
import { Category, CATEGORIES } from 'src/app/parts/category.class';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'app-map-route-search',
  templateUrl: './map-route-search.component.html',
  styleUrls: ['./map-route-search.component.scss']
})
export class MapRouteSearchComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  private onDestroy$ = new Subject();
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  selectedList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  suggestList: Place[] = [];
  selectedList: Place[] = [];
  direction?: Direction;
  categories: Category[] = CATEGORIES;
  center: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  zoom = 16;
  private dist = 0;
  get distance(): string {
    return `約${Math.floor(this.dist / 1000)}km`;
  }
  private dura = 0;
  get duration(): string {
    return `約${Math.floor(this.dura / 60)}分`;
  }
  originLatLng: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  destinationLatLng: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);
  middlePointLatLng: google.maps.LatLng = new google.maps.LatLng(37.421995, -122.084092);

  constructor(
    private location: Location,
    private store: Store<TripigState.State>,
    private mapService: MapService
  ) {}

  ionViewDidEnter(): void {
    this.direction$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(direction => {
        this.setRouteMap(direction);
        this.direction = direction;
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

  private setRouteMap(direction: Direction): void {
    this.mapService.geocode(direction.origin).then(result => {
      this.originLatLng = result;
    }).catch(() => {
      this.location.back();
    });
    this.mapService.geocode(direction.destination).then(result => {
      this.destinationLatLng = result;
    }).catch(() => {
      this.location.back();
    });
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const request: google.maps.DirectionsRequest = {
      origin: direction.origin,
      destination: direction.destination,
      travelMode: direction.travelMode,
    };
    this.mapService.route(request).then(result => {
      directionsRenderer.setMap(null);
      directionsRenderer.setMap(this.map.data.getMap());
      directionsRenderer.setDirections(result);
      this.middlePointLatLng = result.routes[0].overview_path[result.routes[0].overview_path.length / 2];
      this.calcDistAndDura(result);
    }).catch(() => {
      this.location.back();
    });
  }

  middlePointPlaceSearch(category: Category) {
    if (this.direction) {
      this.direction.category = category;
      const placeService = new google.maps.places.PlacesService(
        this.map.data.getMap()
      );
      const request: google.maps.places.PlaceSearchRequest = {
        rankBy: google.maps.places.RankBy.PROMINENCE,
        location: this.middlePointLatLng,
        radius: this.direction.radius,
        keyword: this.direction.category.value
      };
      console.log(request);
      this.mapService
        .nearbySearch(placeService, request)
        .then(results => {
          this.suggestList = [...this.selectedList, ...results].filter((member, index, self) => {
            return self.findIndex(s => member.placeId  === s.placeId) === index;
          });
        })
        .catch(() => {
          // TODO: 周辺施設が検索できなかった場合どうするか検討
        });
    }
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

  private calcDistAndDura(result: google.maps.DirectionsResult): void {
    this.dist = 0;
    this.dura = 0;
    result.routes[0].legs.forEach(leg => {
      this.dist += leg.distance.value;
      this.dura += leg.duration.value;
    });
  }
}
