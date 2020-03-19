import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Place } from 'src/app/models/class/place.model';

@Component({
  selector: 'app-map-route-search',
  templateUrl: './map-route-search.component.html',
  styleUrls: ['./map-route-search.component.scss'],
})
export class MapRouteSearchComponent {
  @Input() suggestList: Place[] = [];
  @Output() selectPlaceEvent = new EventEmitter<Place>();

  constructor() {}

  selectPlace(place: Place) {
    this.selectPlaceEvent.emit(place);
  }
}
