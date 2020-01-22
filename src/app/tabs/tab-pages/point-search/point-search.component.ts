import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigReducer from 'src/app/store/tripig.reducer';
import { Direction } from 'src/app/models/interface/direction.model';
import { Category, CATEGORIES } from 'src/app/parts/category.class';
@Component({
  selector: 'app-point-search',
  templateUrl: './point-search.component.html',
  styleUrls: ['./point-search.component.scss']
})
export class PointSearchComponent {
  @ViewChild('destination') inputDestination!: ElementRef;
  private _destination = '';
  searchForm = this.fb.group({
    destination: [this._destination, Validators.required]
  });
  get destination(): string {
    return this._destination;
  }

  selectedCategory: Category = { icon: '', index: 0, value: '', viewValue: '', custome: false };
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
  categories: Category[] = CATEGORIES.slice(0, 6);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<TripigReducer.State>
  ) {}

  ionViewDidEnter(): void {
    const suggest = new google.maps.places.Autocomplete(
      this.inputDestination.nativeElement
    );
    suggest.addListener('place_changed', () => {
      const result = suggest.getPlace();
      this._destination = result.vicinity ? result.vicinity : result.name;
    });
  }

  search(category: Category): void {
    this.selectedCategory = category;
    this.store.dispatch(
      TripigActions.setDirection({ direction: this.direction })
    );
    this.router.navigate(['/tabs/pages/map/point']);
  }
}
