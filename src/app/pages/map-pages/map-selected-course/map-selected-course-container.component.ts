import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/models/class/place.model';
import { PlaceFacade } from 'src/app/store/place/facades';

@Component({
  selector: 'app-map-selected-course-container',
  templateUrl: './map-selected-course-container.component.html',
  styleUrls: ['./map-selected-course-container.component.scss'],
})
export class MapSelectedCourseContainerComponent implements OnInit {
  selectedPlaceList$ = this.placeFacade.selectedPlaceList$;
  lastSelectedLocation$ = this.placeFacade.lastSelectedLocation$;
  constructor(private placeFacade: PlaceFacade) {}

  ngOnInit() {}

  selectPlace(place: Place) {}
}
