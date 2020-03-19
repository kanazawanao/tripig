import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Direction } from 'src/app/models/interface/direction.model';
import { CATEGORIES, Category } from 'src/app/parts/category.class';
import { ConditionFacade } from 'src/app/store/condition/facades';

@Component({
  selector: 'app-point-search',
  templateUrl: './point-search.component.html',
  styleUrls: ['./point-search.component.scss'],
})
export class PointSearchComponent {
  @ViewChild('destination') inputDestination!: ElementRef;
  private _destination = '';
  searchForm = this.fb.group({
    destination: [this._destination, Validators.required],
  });
  get destination(): string {
    return this._destination;
  }

  selectedCategory: Category = new Category();
  get direction(): Direction {
    const direction: Direction = {
      destination: this.destination,
      origin: '',
      radius: 10000,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    return direction;
  }
  categories: Category[] = CATEGORIES.slice(0, 6);

  constructor(private fb: FormBuilder, private facadeService: ConditionFacade) {}

  ionViewDidEnter(): void {
    const suggest = new google.maps.places.Autocomplete(this.inputDestination.nativeElement);
    suggest.addListener('place_changed', () => {
      const result = suggest.getPlace();
      this._destination = result.vicinity ? result.vicinity : result.name;
    });
  }

  search(category: Category): void {
    this.facadeService.setDirection(this.direction);
    this.facadeService.setCategory(category);
  }
}
