import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as TripigState from 'src/app/store/';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Category, CATEGORIES } from '../category.class';
import { Direction } from 'src/app/models/interface/direction.model';
import { takeUntil } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-tab-category',
  templateUrl: './tab-category.component.html',
  styleUrls: ['./tab-category.component.scss']
})
export class TabCategoryComponent implements OnInit {
  backgroundColor = '#81d6f8';
  color = '#f0fff3';
  categories: Category[] = CATEGORIES;
  private onDestroy$ = new Subject();
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  direction?: Direction;
  category$: Observable<Category> = this.store.select(
    TripigSelector.getCategory
  );
  category?: Category;
  constructor(private store: Store<TripigState.State>) {}

  ngOnInit() {
    this.direction$.pipe(takeUntil(this.onDestroy$)).subscribe(direction => {
      this.direction = direction;
    });
    this.category$.pipe(takeUntil(this.onDestroy$)).subscribe(category => {
      this.category = category;
    });
  }

  onTabClick(event: MatTabChangeEvent): void {
    this.store.dispatch(
      TripigActions.setCategory({ category: this.categories[event.index] })
    );
  }
}
