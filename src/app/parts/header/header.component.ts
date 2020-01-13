import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { AuthService } from 'src/app/services/auth.service';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  constructor(
    private store: Store<TripigState.State>,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}

  signOut(): void {
    this.auth.signOut();
  }
}
