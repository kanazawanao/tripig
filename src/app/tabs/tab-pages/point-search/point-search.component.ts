import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigReducer from 'src/app/store/tripig.reducer';
import { Direction } from 'src/app/models/direction.model';
import { Category, CATEGORIES } from 'src/app/parts/category.class';
@Component({
  selector: 'app-point-search',
  templateUrl: './point-search.component.html',
  styleUrls: ['./point-search.component.scss']
})
export class PointSearchComponent {
  @ViewChild('destination') inputDestination!: ElementRef;
  searchForm = this.fb.group({
    destination: ['', Validators.required]
  });
  destinationKey = 'destination';
  get destination(): string {
    return this.searchForm.controls[this.destinationKey].value;
  }
  selectedCategory: Category = {icon: '', index: 0, value: '', viewValue: ''};
  get direction(): Direction {
    const direction: Direction = {
      destination: this.destination,
      origin: '',
      category: this.selectedCategory,
      radius: 10000,
      travelMode: google.maps.TravelMode.DRIVING
    };
    return direction;
  }
  categories: Category[] = CATEGORIES;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<TripigReducer.State>
  ) {}

  ionViewDidEnter(): void {
    new google.maps.places.Autocomplete(this.inputDestination.nativeElement);
  }

  search(category: Category): void {
    this.selectedCategory = category;
    this.store.dispatch(
      TripigActions.setDirection({ direction: this.direction })
    );
    this.router.navigate(['/tabs/search/point']);
  }
}
