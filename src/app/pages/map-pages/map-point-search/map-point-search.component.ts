import { Component, Input } from '@angular/core';
import { Place } from 'src/app/models/class/place.model';
import { PlaceFacade } from 'src/app/store/place/facades';

@Component({
  selector: 'app-map-point-search',
  templateUrl: './map-point-search.component.html',
  styleUrls: ['./map-point-search.component.scss'],
})
export class MapPointSearchComponent {
  @Input() suggestList: Place[] = [];

  constructor(private placeFacade: PlaceFacade) {}

  selectPlace(place: Place) {
    this.suggestList.map((s) => {
      if (s.placeId === place.placeId) {
        s.selected = !s.selected;
      }
    });
    this.placeFacade.updateSelectedPlaceList(this.suggestList.filter((s) => s.selected));
  }
}
