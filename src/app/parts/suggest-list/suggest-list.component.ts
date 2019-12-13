import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TripigState from 'src/app/store/';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Place } from 'src/app/models/place.model';
import { Observable, Subject } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { takeUntil, map } from 'rxjs/operators';
import { Category, CATEGORIES } from '../category.class';

@Component({
  selector: 'app-suggest-list',
  templateUrl: './suggest-list.component.html',
  styleUrls: ['./suggest-list.component.scss'],
})
export class SuggestListComponent implements OnInit, OnDestroy {
  @Output() middlePointPlaceSearch: EventEmitter<any> = new EventEmitter();
  private onDestroy$ = new Subject();
  googleSearchUrl = 'https://www.google.com/search?q=';
  categories: Category[] = CATEGORIES;
  suggestList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSuggestList
  );
  suggestList: Place[] = [];
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  direction?: Direction;

  constructor(
    private store: Store<TripigState.State>,
  ) { }

  ngOnInit() {
    this.direction$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(direction => {
        this.direction = direction;
      });
    this.suggestList$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(suggestList => {
        this.suggestList = suggestList;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onSelectionChange(place: Place): void {
    this.suggestList$
      .pipe(
        takeUntil(this.onDestroy$),
        map(suggestList => {
          suggestList.forEach(s => {
            if (s.placeId === place.placeId) {
              s.selected = !s.selected;
            }
          });
          return suggestList;
        })
      ).subscribe(suggestList => {
        this.store.dispatch(
          TripigActions.setSuggestList({suggestList})
        );
        this.store.dispatch(
          TripigActions.setSelectedList({
            selectedList: suggestList.filter(s => s.selected === true)
          })
        );
      });
  }

  onTabClick(category: Category) {
    this.middlePointPlaceSearch.emit(category);
  }
}