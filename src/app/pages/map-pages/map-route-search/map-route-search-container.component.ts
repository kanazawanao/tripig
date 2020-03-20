import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Place } from 'src/app/models/class/place.model';
import { Direction } from 'src/app/models/interface/direction.model';
import { Category } from 'src/app/parts/category.class';
import { MapComponent } from 'src/app/parts/map/map.component';
import { MapService } from 'src/app/services/map.service';
import { ConditionFacade } from 'src/app/store/condition/facades';
import { PlaceFacade } from 'src/app/store/place/facades';

@Component({
  selector: 'app-map-route-search-container',
  templateUrl: './map-route-search-container.component.html',
  styleUrls: ['./map-route-search-container.component.scss'],
})
export class MapRouteSearchContainerComponent implements OnInit, OnDestroy {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  private onDestroy$ = new Subject();
  directionsRenderer = new google.maps.DirectionsRenderer();
  lastSelectedLocation$ = this.placeFacade.lastSelectedLocation$;
  origin$ = this.conditionFacade.origin$;
  origin = '';
  destination$ = this.conditionFacade.destination$;
  destination = '';
  radius$ = this.conditionFacade.radius$;
  radius = 0;
  travelMode$ = this.conditionFacade.travelMode$;
  travelMode = google.maps.TravelMode.DRIVING;
  category$ = this.conditionFacade.category$;
  selectedPlaceList$ = this.placeFacade.selectedPlaceList$;
  selectedList: Place[] = [];
  sugestPlaceList$ = this.placeFacade.sugestPlaceList$;
  sugestPlaceList: Place[] = [];
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
    private conditionFacade: ConditionFacade,
    private placeFacade: PlaceFacade,
    private location: Location,
    private mapService: MapService,
  ) {}

  ngOnInit() {
    this.origin$
      .pipe(
        takeUntil(this.onDestroy$),
        mergeMap((origin) => {
          this.origin = origin;
          return this.destination$;
        }),
        mergeMap((destination) => {
          this.destination = destination;
          return this.radius$;
        }),
        mergeMap((radius) => {
          this.radius = radius;
          return this.travelMode$;
        }),
        mergeMap((travelMode) => {
          this.travelMode = travelMode;
          return this.category$;
        }),
      )
      .subscribe((category) => {
        const direction: Direction = {
          origin: this.origin,
          destination: this.destination,
          radius: this.radius,
          travelMode: this.travelMode,
        };
        this.setRouteMap(direction, category);
      });
    this.selectedPlaceList$.pipe(takeUntil(this.onDestroy$)).subscribe((selectedList) => {
      this.selectedList = selectedList;
    });
    this.placeFacade.sugestPlaceList$.subscribe((list) => {
      this.sugestPlaceList = list;
    });
    this.lastSelectedLocation$.subscribe((location) => {
      this.center = location;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private setRouteMap(direction: Direction, category: Category): void {
    const request: google.maps.DirectionsRequest = {
      origin: direction.origin,
      destination: direction.destination,
      travelMode: direction.travelMode,
    };
    this.mapService
      .route(request)
      .then((result) => {
        this.directionsRenderer.setMap(this.mapComponent.map.data.getMap());
        this.directionsRenderer.setDirections(result);
        this.middlePointLatLng = result.routes[0].overview_path[Math.round(result.routes[0].overview_path.length / 2)];
        this.calcDistAndDura(result);
        this.middlePointPlaceSearch(direction, category);
      })
      .catch(() => {
        this.location.back();
      });
  }

  middlePointPlaceSearch(direction: Direction, category: Category): void {
    const placeService = new google.maps.places.PlacesService(this.mapComponent.map.data.getMap());
    const request: google.maps.places.PlaceSearchRequest = {
      rankBy: google.maps.places.RankBy.PROMINENCE,
      location: this.middlePointLatLng,
      radius: direction.radius,
      keyword: category.value,
    };
    this.mapService.nearbySearch(placeService, request).then((results) => {
      const list = [...this.selectedList, ...results].filter((member, index, self) => {
        return self.findIndex((s) => member.placeId === s.placeId) === index;
      });
      this.placeFacade.searchSugestPlaceList(list);
    });
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
    this.sugestPlaceList.map((s) => {
      if (s.placeId === place.placeId) {
        s.selected = !s.selected;
      }
    });
    this.placeFacade.updateSelectedPlaceList(this.sugestPlaceList.filter((s) => s.selected));
  }
}
