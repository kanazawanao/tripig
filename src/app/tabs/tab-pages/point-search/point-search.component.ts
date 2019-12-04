import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigReducer from 'src/app/store/tripig.reducer';
import { Direction } from 'src/app/models/direction.model';
export interface Category {
  value: string;
  viewValue: string;
  icon: string;
}
@Component({
  selector: 'app-point-search',
  templateUrl: './point-search.component.html',
  styleUrls: ['./point-search.component.scss']
})
export class PointSearchComponent {
  searchForm = this.fb.group({
    destination: ['', Validators.required]
  });
  destinationKey = 'destination';
  get destination(): string {
    return this.searchForm.controls[this.destinationKey].value;
  }
  selectedCategory = '';
  get direction(): Direction {
    const direction: Direction = {
      destination: `${this.destination} ${this.selectedCategory}`,
      origin: '',
      radius: 10000,
      travelMode: google.maps.TravelMode.DRIVING
    };
    return direction;
  }
  categories: Category[] = [
    { value: '観光', viewValue: 'Any Categories', icon: 'local_see' },
    { value: 'ショッピング', viewValue: 'Shopping', icon: 'shopping_cart' },
    { value: 'カフェ', viewValue: 'Cafe', icon: 'local_cafe' },
    { value: 'ホテル', viewValue: 'Hotel', icon: 'hotel' },
    { value: 'コンビニ', viewValue: 'Convenience Store', icon: 'local_convenience_store' },
    { value: 'ガソリンスタンド', viewValue: 'Gas Station', icon: 'local_gas_station' },
    { value: '公園', viewValue: 'Park', icon: 'local_florist' },
    { value: 'レストラン', viewValue: 'Restaurant', icon: 'restaurant' },
    { value: '遊び', viewValue: '遊び', icon: 'sports' },
    { value: '温泉', viewValue: '温泉', icon: 'hot_tub' },
    { value: 'ビール', viewValue: 'バー', icon: 'local_bar' },
    { value: '動物園', viewValue: 'Zoo', icon: 'pets' },
  ];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<TripigReducer.State>
  ) {}

  search(value: string): void {
    this.selectedCategory = value;
    this.store.dispatch(
      TripigActions.setDirection({ direction: this.direction })
    );
    this.router.navigate(['/tabs/search/point']);
  }
}
