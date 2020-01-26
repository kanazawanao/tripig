import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Direction } from 'src/app/models/interface/direction.model';
import { Place } from 'src/app/models/interface/place.model';
import { MapService } from 'src/app/services/map.service';
import { Category, CATEGORIES } from 'src/app/parts/category.class';

@Component({
  selector: 'app-map-route-search',
  templateUrl: './map-route-search.component.html',
  styleUrls: ['./map-route-search.component.scss']
})
export class MapRouteSearchComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  directionsRenderer = new google.maps.DirectionsRenderer();
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  infoContent = '';
  private onDestroy$ = new Subject();
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  selectedList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  selectedList: Place[] = [];
  suggestList: Place[] = [];
  direction?: Direction;
  defaultCategory: Category = CATEGORIES[0];
  zoom = 16;
  private dist = 0;
  get distance(): string {
    return `約${Math.floor(this.dist / 1000)}km`;
  }
  private dura = 0;
  get duration(): string {
    return `約${Math.floor(this.dura / 60)}分`;
  }
  initLatLng: google.maps.LatLng = new google.maps.LatLng(
    37.421995,
    -122.084092
  );
  center = this.initLatLng;
  originLatLng = this.initLatLng;
  destinationLatLng = this.initLatLng;
  middlePointLatLng = this.initLatLng;

  constructor(
    private location: Location,
    private store: Store<TripigState.State>,
    private mapService: MapService
  ) {}

  ionViewDidEnter(): void {
    this.direction$.pipe(takeUntil(this.onDestroy$)).subscribe(direction => {
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
    this.mapService
      .geocode({ address: direction.origin })
      .then(result => {
        this.originLatLng = result.geometry.location;
      })
      .catch(() => {
        this.location.back();
      });
    this.mapService
      .geocode({ address: direction.destination })
      .then(result => {
        this.destinationLatLng = result.geometry.location;
      })
      .catch(() => {
        this.location.back();
      });
    const request: google.maps.DirectionsRequest = {
      origin: direction.origin,
      destination: direction.destination,
      travelMode: direction.travelMode
    };
    this.mapService
      .route(request)
      .then(result => {
        this.directionsRenderer.setMap(this.map.data.getMap());
        this.directionsRenderer.setDirections(result);
        this.middlePointLatLng =
          result.routes[0].overview_path[
            Math.round(result.routes[0].overview_path.length / 2)
          ];
        this.calcDistAndDura(result);
      })
      .catch(() => {
        this.location.back();
      });
    this.middlePointPlaceSearch(this.defaultCategory);
  }

  middlePointPlaceSearch(category: Category): void {
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
      this.mapService
        .nearbySearch(placeService, request)
        .then(results => {
          this.suggestList = [...this.selectedList, ...results].filter(
            (member, index, self) => {
              return (
                self.findIndex(s => member.placeId === s.placeId) === index
              );
            }
          );
        })
        .catch(() => {
          // TODO: 周辺施設が検索できなかった場合どうするか検討
        });
    }
  }

  openInfoWindow(marker: MapMarker, place: Place): void {
    this.infoContent = place.name ? place.name : '';
    this.infoWindow.open(marker);
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
