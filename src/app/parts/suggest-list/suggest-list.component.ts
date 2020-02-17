import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as TripigState from 'src/app/store/';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { Place } from 'src/app/models/interface/place.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapRouteResultComponent } from '../dialog/map/map-route-result/map-route-result.component';
import { ModalController } from '@ionic/angular';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { PlaceDetailComponent } from '../dialog/place-detail/place-detail.component';

@Component({
  selector: 'app-suggest-list',
  templateUrl: './suggest-list.component.html',
  styleUrls: ['./suggest-list.component.scss']
})
export class SuggestListComponent implements OnInit, OnDestroy {
  @ViewChild('suggests') checkList!: MatSelectionList;
  @Input() suggestList: Place[] = [];
  @Output() selectEvent = new EventEmitter<Place>();
  showResultRoute = false;
  private onDestroy$ = new Subject();
  googleSearchUrl = 'https://www.google.com/search?q=';

  selectedList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  constructor(
    private store: Store<TripigState.State>,
    private inAppBrowser: InAppBrowser,
    private modalCtrl: ModalController,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.selectedList$.pipe(takeUntil(this.onDestroy$)).subscribe(list => {
      this.showResultRoute = list.length > 0;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onCheckBoxClick(event: MouseEvent, place: Place): void {
    event.stopPropagation();
    this.store.dispatch(
      TripigActions.setLastSelectedPlace({ lastSelectedPlace: place })
    );
  }

  onSearchLinkClick(event: MouseEvent, suggest: Place): void {
    const encodedName = suggest.name ? encodeURIComponent(suggest.name) : '';
    event.stopPropagation();
    const browser = this.inAppBrowser.create(
      `${this.googleSearchUrl}${encodedName}`
    );
    browser.show();
  }

  async guide(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: MapRouteResultComponent
    });
    return await modal.present();
  }

  onSelectedChange(change: MatSelectionListChange) {
    const selected: Place[] = [];
    change.source.options.map((o, i) => {
      if (o.selected) {
        selected.push(this.suggestList[i]);
      }
    });
    this.store.dispatch(
      TripigActions.setSelectedList({ selectedList: selected })
    );
  }

  openDialog(event: MouseEvent, suggest: Place): void {
    console.log(suggest);
    event.stopPropagation();
    this.dialog.open(PlaceDetailComponent, {
      data: suggest
    });
  }
}
