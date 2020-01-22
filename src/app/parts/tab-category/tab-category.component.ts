import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as TripigState from 'src/app/store/';
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
  @Output() categoryChange: EventEmitter<Category> = new EventEmitter();
  backgroundColor = 'skyblue';
  color = '#f0fff3';
  categories: Category[] = CATEGORIES;
  private onDestroy$ = new Subject();
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  direction?: Direction;
  constructor(private store: Store<TripigState.State>) {}

  ngOnInit() {
    this.direction$.pipe(takeUntil(this.onDestroy$)).subscribe(direction => {
      this.direction = direction;
    });
  }

  onTabClick(event: MatTabChangeEvent): void {
    this.categoryChange.emit(this.categories[event.index]);
  }
}
