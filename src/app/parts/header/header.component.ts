import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TripigState from 'src/app/store/';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { AuthService } from 'src/app/services/auth.service';
import { Place } from 'src/app/models/interface/place.model';
import { Session } from 'src/app/models/class/session';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedList$: Observable<Place[]> = this.store.select(
    TripigSelector.getSelectedList
  );
  public login = false;
  constructor(
    private store: Store<TripigState.State>,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.sessionState.subscribe((session:Session) => {
      if(session) {
        this.login = session.login;
      }
    })
  }

  signOut(): void {
    this.auth.signOut();
  }
}
