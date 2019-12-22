import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigReducer from 'src/app/store/tripig.reducer';
import { Direction } from 'src/app/models/direction.model';
export interface Mode {
  value: google.maps.TravelMode;
  viewValue: string;
}
@Component({
  selector: 'app-route-search',
  templateUrl: './route-search.component.html',
  styleUrls: ['./route-search.component.scss']
})
export class RouteSearchComponent {
  @ViewChild('origin') inputOrigin!: ElementRef;
  @ViewChild('destination') inputDestination!: ElementRef;
  travelModes: Mode[] = [
    { value: google.maps.TravelMode.DRIVING, viewValue: 'directions_car' },
    { value: google.maps.TravelMode.WALKING, viewValue: 'directions_walk' },
    { value: google.maps.TravelMode.BICYCLING, viewValue: 'directions_bike' },
    // 日本国内だと路線を含めたルート検索できないみたい
    // {value: google.maps.TravelMode.TRANSIT, viewValue: 'directions_transit'},
    { value: google.maps.TravelMode.TWO_WHEELER, viewValue: 'motorcycle' }
  ];

  searchForm = this.fb.group({
    origin: ['', Validators.required],
    destination: ['', Validators.required],
    selectedTravelMode: [this.travelModes[0]]
  });

  private originKey = 'origin';
  get origin(): string {
    return this.searchForm.controls[this.originKey].value;
  }

  private destinationKey = 'destination';
  get destination(): string {
    return this.searchForm.controls[this.destinationKey].value;
  }

  private selectedModeKey = 'selectedTravelMode';
  get selectedMode(): Mode {
    return this.searchForm.controls[this.selectedModeKey].value;
  }

  get direction(): Direction {
    const direction: Direction = {
      destination: this.destination,
      origin: this.origin,
      category: { index: 0, value: '', viewValue: '', icon: '' },
      travelMode: this.selectedMode.value,
      radius: 10000
    };
    return direction;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<TripigReducer.State>
  ) {}

  ionViewDidEnter(): void {
    new google.maps.places.Autocomplete(this.inputDestination.nativeElement);
    new google.maps.places.Autocomplete(this.inputOrigin.nativeElement);
  }

  search(): void {
    this.store.dispatch(
      TripigActions.setDirection({ direction: this.direction })
    );
    this.router.navigate(['/tabs/pages/map/route']);
  }
}
