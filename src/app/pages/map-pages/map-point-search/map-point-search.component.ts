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
  selector: 'app-map-point-search',
  templateUrl: './map-point-search.component.html',
  styleUrls: ['./map-point-search.component.scss'],
})
export class MapPointSearchComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  private onDestroy$ = new Subject();
  origin$: Observable<string> = this.conditionFacade.origin$;
  destination$: Observable<string> = this.conditionFacade.destination$;
  radius$: Observable<number> = this.conditionFacade.radius$;
  travelMode$: Observable<google.maps.TravelMode> = this.conditionFacade.travelMode$;
  category$: Observable<Category> = this.conditionFacade.category$;
  selectedList$: Observable<Place[]> = this.placeFacade.selectedPlaceList$;
  lastSelectedPlace$: Observable<Place | undefined> = this.placeFacade.lastSelectedPlace$;
  selectedList: Place[] = [];
  suggestList: Place[] = [];
  infoContent = '';
  center?: google.maps.LatLng;
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = { draggable: false };

  constructor(
    private location: Location,
    private mapService: MapService,
    private conditionFacade: ConditionFacade,
    private placeFacade: PlaceFacade,
  ) {}

  ionViewDidEnter(): void {
    this.setCenterOfLastSelectedPlace();
    forkJoin([this.origin$, this.destination$, this.radius$, this.travelMode$, this.category$])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((list) => {
        const direction: Direction = {
          origin: list[0],
          destination: list[1],
          radius: list[2],
          travelMode: list[3],
        };
        this.setMap(direction, list[4]);
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
      this.center = place?.location;
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
    this.placeFacade.updateSelectedPlaceList(this.suggestList.filter((s) => s.selected));
  }
}
