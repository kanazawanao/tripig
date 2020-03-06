import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Place } from 'src/app/models/class/place.model';
import { Direction } from 'src/app/models/interface/direction.model';
import { Category } from 'src/app/parts/category.class';
import { MapService } from 'src/app/services/map.service';
import { ConditionFacade } from 'src/app/store/condition/facades';
import { PlaceFacade } from 'src/app/store/place/facades';

@Component({
  selector: 'app-map-route-search',
  templateUrl: './map-route-search.component.html',
  styleUrls: ['./map-route-search.component.scss'],
})
export class MapRouteSearchComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  directionsRenderer = new google.maps.DirectionsRenderer();
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  infoContent = '';
  private onDestroy$ = new Subject();
  origin$: Observable<string> = this.conditionFacade.origin$;
  destination$: Observable<string> = this.conditionFacade.destination$;
  radius$: Observable<number> = this.conditionFacade.radius$;
  travelMode$: Observable<google.maps.TravelMode> = this.conditionFacade.travelMode$;
  category$: Observable<Category> = this.conditionFacade.category$;
  selectedList$: Observable<Place[]> = this.placeFacade.selectedPlaceList$;
  selectedList: Place[] = [];
  suggestList: Place[] = [];
  direction?: Direction;
  zoom = 16;
  private dist = 0;
  get distance(): string {
    return `約${Math.floor(this.dist / 1000)}km`;
  }
  private dura = 0;
  get duration(): string {
    return `約${Math.floor(this.dura / 60)}分`;
  }
  center?: google.maps.LatLng;
  originLatLng?: google.maps.LatLng;
  destinationLatLng?: google.maps.LatLng;
  middlePointLatLng?: google.maps.LatLng;

  constructor(
    private location: Location,
    private mapService: MapService,
    private conditionFacade: ConditionFacade,
    private placeFacade: PlaceFacade,
  ) {}

  ionViewDidEnter(): void {
    forkJoin([this.origin$, this.destination$, this.radius$, this.travelMode$, this.category$])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((list) => {
        const direction: Direction = {
          origin: list[0],
          destination: list[1],
          radius: list[2],
          travelMode: list[3],
        };
        this.setRouteMap(direction, list[4]);
      });
    this.selectedList$.pipe(takeUntil(this.onDestroy$)).subscribe((selectedList) => {
      this.selectedList = selectedList;
    });
  }

  ionViewDidLeave(): void {
    this.onDestroy$.next();
  }

  private setRouteMap(direction: Direction, category: Category): void {
    this.mapService
      .geocode({ address: direction.origin })
      .then((result) => {
        this.originLatLng = result.geometry.location;
      })
      .catch(() => {
        this.location.back();
      });
    this.mapService
      .geocode({ address: direction.destination })
      .then((result) => {
        this.destinationLatLng = result.geometry.location;
      })
      .catch(() => {
        this.location.back();
      });
    const request: google.maps.DirectionsRequest = {
      origin: direction.origin,
      destination: direction.destination,
      travelMode: direction.travelMode,
    };
    this.mapService
      .route(request)
      .then((result) => {
        this.directionsRenderer.setMap(this.map.data.getMap());
        this.directionsRenderer.setDirections(result);
        this.middlePointLatLng = result.routes[0].overview_path[Math.round(result.routes[0].overview_path.length / 2)];
        this.calcDistAndDura(result);
        this.middlePointPlaceSearch(category);
      })
      .catch(() => {
        this.location.back();
      });
  }

  middlePointPlaceSearch(category: Category): void {
    if (this.direction) {
      const placeService = new google.maps.places.PlacesService(this.map.data.getMap());
      const request: google.maps.places.PlaceSearchRequest = {
        rankBy: google.maps.places.RankBy.PROMINENCE,
        location: this.middlePointLatLng,
        radius: this.direction.radius,
        keyword: category.value,
      };
      this.mapService.nearbySearch(placeService, request).then((results) => {
        this.suggestList = [...this.selectedList, ...results].filter((member, index, self) => {
          return self.findIndex((s) => member.placeId === s.placeId) === index;
        });
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
    result.routes[0].legs.forEach((leg) => {
      this.dist += leg.distance.value;
      this.dura += leg.duration.value;
    });
  }

  selectPlace(place: Place) {
    this.suggestList.map((s) => {
      if (s.placeId === place.placeId) {
        s.selected = !s.selected;
      }
    });
    this.placeFacade.updateSelectedPlaceList(this.suggestList.filter((s) => s.selected));
  }
}
