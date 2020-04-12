import { PlaceDetailComponent } from '../dialog/place-detail/place-detail.component';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Place } from 'src/app/models/class/place.model';
import { PlaceFacade } from 'src/app/store/place/facades';

@Component({
  selector: 'app-suggest-list',
  templateUrl: './suggest-list.component.html',
  styleUrls: ['./suggest-list.component.scss'],
})
export class SuggestListComponent {
  @ViewChild('suggests') checkList!: MatSelectionList;
  @Input() suggestList: Place[] = [];
  @Output() selectEvent = new EventEmitter<Place>();
  showResultRoute = false;
  googleSearchUrl = 'https://www.google.com/search?q=';

  constructor(private placeFacade: PlaceFacade, private inAppBrowser: InAppBrowser, public dialog: MatDialog) {}

  onCheckBoxClick(event: MouseEvent, place: Place): void {
    event.stopPropagation();
    this.placeFacade.selectLastLocation(place.location);
  }

  onSearchLinkClick(event: MouseEvent, suggest: Place): void {
    event.stopPropagation();
    const encodedName = suggest.name ? encodeURIComponent(suggest.name) : '';
    const browser = this.inAppBrowser.create(`${this.googleSearchUrl}${encodedName}`);
    browser.show();
  }

  onSelectedChange(options: MatListOption[]) {
    const selected: Place[] = [];
    options.map((option) => {
      if (option.selected) {
        selected.push(Object.assign({}, option.value));
      }
    });
    selected.map((s) => {
      s.selected = true;
    });
    this.placeFacade.updateSelectedPlaceList(selected);
  }

  openPlaceDetailDialog(event: MouseEvent, suggest: Place): void {
    event.stopPropagation();
    this.dialog.open(PlaceDetailComponent, {
      data: suggest,
    });
  }
}
