import { Category } from '../category.class';
import { Location } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Place } from 'src/app/models/class/place.model';
import { Direction } from 'src/app/models/interface/direction.model';
import { MapService } from 'src/app/services/map.service';
import { ConditionFacade } from 'src/app/store/condition/facades';
import { PlaceFacade } from 'src/app/store/place/facades';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() origin = '';
  @Input() destination = '';
  @Input() radius = 0;
  @Input() travelMode = google.maps.TravelMode.DRIVING;
  @Input() category = new Category();
  @Input() selectedList: Place[] = [];
  @Input() suggestList: Place[] = [];
  @Input() center?: google.maps.LatLng;
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  direction: Direction = {
    origin: this.origin,
    destination: this.destination,
    radius: this.radius,
    travelMode: this.travelMode,
  };
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  infoContent = '';
  constructor(
    private location: Location,
    private mapService: MapService,
    private placeFacade: PlaceFacade,
    private conditionFacade: ConditionFacade,
  ) {}

  ngOnInit() {
    this.conditionFacade.category$.subscribe((cat) => {
      this.setMap(this.direction, cat);
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
      const list = [...this.selectedList, ...results].filter((member, index, self) => {
        return self.findIndex((s) => member.placeId === s.placeId) === index;
      });
      this.placeFacade.searchSugestPlaceList(list);
    });
  }

  openInfoWindow(marker: MapMarker, place: Place): void {
    this.infoContent = place.name ? place.name : '';
    this.infoWindow.open(marker);
  }
}
