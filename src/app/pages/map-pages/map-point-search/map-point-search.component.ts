import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Place } from 'src/app/models/class/place.model';

@Component({
  selector: 'app-map-point-search',
  templateUrl: './map-point-search.component.html',
  styleUrls: ['./map-point-search.component.scss'],
})
export class MapPointSearchComponent {
  @Input() suggestList: Place[] = [];
  @Output() selectPlaceEvent = new EventEmitter<Place>();

  constructor() {}

  selectPlace(place: Place) {
    this.selectPlaceEvent.emit(place);
  }
}
