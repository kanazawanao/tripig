import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ConditionFacade } from 'src/app/store/condition/facades';
import { PlaceFacade } from 'src/app/store/place/facades';
import { Place } from 'src/app/models/class/place.model';
import { Subject } from 'rxjs';
import { Direction } from 'src/app/models/interface/direction.model';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { Category } from 'src/app/parts/category.class';
import { MapService } from 'src/app/services/map.service';
import { MapComponent } from 'src/app/parts/map/map.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, OnDestroy {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  private onDestroy$ = new Subject();
  suggestList: Place[] = [];
  selectedList: Place[] = [];
  lastSelectedLocation$ = this.placeFacade.lastSelectedLocation$;
  selectedPlaceList$ = this.placeFacade.selectedPlaceList$;
  origin$ = this.conditionFacade.origin$;
  origin = '';
  destination$ = this.conditionFacade.destination$;
  destination = '';
  radius$ = this.conditionFacade.radius$;
  radius = 0;
  travelMode$ = this.conditionFacade.travelMode$;
  travelMode = google.maps.TravelMode.DRIVING;
  category$ = this.conditionFacade.category$;
  center?: google.maps.LatLng;

  constructor(
    private placeFacade: PlaceFacade,
    private conditionFacade: ConditionFacade,
    private location: Location,
    private mapService: MapService,
  ) {}

  ngOnInit(): void {
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
        this.setMap(direction, category);
      });
    this.placeFacade.sugestPlaceList$.subscribe((list) => {
      this.suggestList = list;
    });
    this.placeFacade.selectedPlaceList$.subscribe((list) => {
      this.selectedList = list;
    });
    this.lastSelectedLocation$.subscribe((location) => {
      this.center = location;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private setMap(direction: Direction, category: Category): void {
    this.mapService
      .geocode({ address: direction.destination })
      .then((result) => {
        this.placeFacade.selectLastLocation(result.geometry.location);
        this.searchSuggestList(direction, category);
      })
      .catch(() => {
        this.location.back();
      });
  }

  private searchSuggestList(direction: Direction, category: Category) {
    const placeService = new google.maps.places.PlacesService(this.mapComponent.map.data.getMap());
    const request: google.maps.places.PlaceSearchRequest = {
      rankBy: google.maps.places.RankBy.PROMINENCE,
      location: this.center,
      radius: direction.radius,
      keyword: `${direction.destination} ${category.value}`,
    };
    this.mapService.nearbySearch(placeService, request).then((results) => {
      const list = [...this.selectedList, ...results].filter((member, index, self) => {
        return self.findIndex((s) => member.placeId === s.placeId) === index;
      });
      this.placeFacade.searchSugestPlaceList(list);
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
