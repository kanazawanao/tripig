import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigReducer from 'src/app/store/tripig.reducer';
import { Direction } from 'src/app/models/interface/direction.model';
import { Category, CATEGORIES } from 'src/app/parts/category.class';
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
  initCategory: Category = CATEGORIES[0];
  private _origin = '';
  private _destination = '';
  searchForm = this.fb.group({
    origin: [this._origin, Validators.required],
    destination: ['', Validators.required],
    selectedTravelMode: [this.travelModes[0]]
  });

  get origin(): string {
    return this._origin;
  }
  set origin(value: string) {
    this._origin = value;
  }

  get destination(): string {
    return this._destination;
  }
  set destination(value: string) {
    this._destination = value;
  }

  private selectedModeKey = 'selectedTravelMode';
  get selectedMode(): Mode {
    return this.searchForm.controls[this.selectedModeKey].value;
  }

  get direction(): Direction {
    const direction: Direction = {
      destination: this.destination,
      origin: this.origin,
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
    const suggestDest = new google.maps.places.Autocomplete(
      this.inputDestination.nativeElement
    );
    suggestDest.addListener('place_changed', () => {
      const result = suggestDest.getPlace();
      this._destination = result.vicinity ? result.vicinity : result.name;
    });
    const suggestOrig = new google.maps.places.Autocomplete(
      this.inputOrigin.nativeElement
    );
    suggestOrig.addListener('place_changed', () => {
      const result = suggestOrig.getPlace();
      this._origin = result.vicinity ? result.vicinity : result.name;
    });
  }

  search(): void {
    this.store.dispatch(
      TripigActions.setDirection({ direction: this.direction })
    );
    this.store.dispatch(
      TripigActions.setCategory({ category: this.initCategory })
    );
    this.router.navigate(['/tabs/pages/map/route']);
  }
}
