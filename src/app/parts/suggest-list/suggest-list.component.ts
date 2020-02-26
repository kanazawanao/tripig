import { MapRouteResultComponent } from '../dialog/map/map-route-result/map-route-result.component';
import { PlaceDetailComponent } from '../dialog/place-detail/place-detail.component';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Place } from 'src/app/models/class/place.model';
import * as TripigState from 'src/app/store/';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigSelector from 'src/app/store/tripig.selector';

@Component({
  selector: 'app-suggest-list',
  templateUrl: './suggest-list.component.html',
  styleUrls: ['./suggest-list.component.scss'],
})
export class SuggestListComponent implements OnInit, OnDestroy {
  @ViewChild('suggests') checkList!: MatSelectionList;
  @Input() suggestList: Place[] = [];
  @Output() selectEvent = new EventEmitter<Place>();
  showResultRoute = false;
  private onDestroy$ = new Subject();
  googleSearchUrl = 'https://www.google.com/search?q=';

  selectedList$: Observable<Place[]> = this.store.select(TripigSelector.getSelectedList);
  constructor(private store: Store<TripigState.State>, private inAppBrowser: InAppBrowser, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.selectedList$.pipe(takeUntil(this.onDestroy$)).subscribe((list) => {
      this.showResultRoute = list.length > 0;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onCheckBoxClick(event: MouseEvent, place: Place): void {
    event.stopPropagation();
    this.store.dispatch(TripigActions.setLastSelectedPlace({ lastSelectedPlace: place }));
  }

  onSearchLinkClick(event: MouseEvent, suggest: Place): void {
    const encodedName = suggest.name ? encodeURIComponent(suggest.name) : '';
    event.stopPropagation();
    const browser = this.inAppBrowser.create(`${this.googleSearchUrl}${encodedName}`);
    browser.show();
  }

  openRouteResultDialog(): void {
    this.dialog.open(MapRouteResultComponent);
  }

  onSelectedChange(options: MatListOption[]) {
    const selected: Place[] = [];
    options.map((option) => {
      if (option.selected) {
        selected.push(Object.assign({}, option.value));
      }
    });
    selected.forEach((s) => (s.selected = true));
    this.store.dispatch(TripigActions.setSelectedList({ selectedList: selected }));
  }

  openPlaceDetailDialog(event: MouseEvent, suggest: Place): void {
    event.stopPropagation();
    this.dialog.open(PlaceDetailComponent, {
      data: suggest,
    });
  }
}
