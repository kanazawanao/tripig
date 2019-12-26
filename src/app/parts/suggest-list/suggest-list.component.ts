import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
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
  styleUrls: ['./suggest-list.component.scss']
})
export class SuggestListComponent implements OnInit, OnDestroy {
  @Output() categoryChange: EventEmitter<any> = new EventEmitter();
  private onDestroy$ = new Subject();
  googleSearchUrl = 'https://www.google.com/search?q=';
  categories: Category[] = CATEGORIES;

  suggestList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSuggestList
  );
  direction$: Observable<Direction> = this.store.select(
    TripigSelector.getDirection
  );
  direction?: Direction;

  constructor(
    private store: Store<TripigState.State>,
    private inAppBrowser: InAppBrowser
  ) {}

  ngOnInit(): void {
    this.direction$.pipe(takeUntil(this.onDestroy$)).subscribe(direction => {
      this.direction = direction;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onSelectionChange(place: Place): void {
    place.selected = !place.selected;
    this.store.dispatch(
      TripigActions.setLastSelectedPlace({ lastSelectedPlace: place })
    );
    if (place.selected) {
      this.store.dispatch(TripigActions.addSelectedPlace({ selectedPlace: place }));
    } else {
      this.store.dispatch(TripigActions.deleteSelectedPlace({ selectedPlace: place }));
    }
    this.suggestList$
      .pipe(
        takeUntil(this.onDestroy$),
        map(suggestList => {
          suggestList.map(s => {
            if (s.placeId === place.placeId) {
              s.selected = place.selected;
            }
          });
          return suggestList;
        })
      )
      .subscribe(suggestList => {
        this.store.dispatch(TripigActions.setSuggestList({ suggestList }));
      });
  }

  onTabClick(category: Category): void {
    this.categoryChange.emit(category);
  }

  onSearchLinkClick(event: MouseEvent, suggest: Place): void {
    event.stopPropagation();
    const browser = this.inAppBrowser.create(
      `${this.googleSearchUrl}${suggest.name}`
    );
    browser.show();
  }
}
