import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigReducer from 'src/app/store/tripig.reducer';
import { Direction } from 'src/app/models/direction.model';

@Component({
  selector: 'app-route-search',
  templateUrl: './route-search.component.html',
  styleUrls: ['./route-search.component.scss'],
})
export class RouteSearchComponent implements OnInit {
  searchForm = this.fb.group({
    leaving: ['', Validators.required],
    arrival: ['', Validators.required],
  });
  leavingKey = 'leaving';
  get leaving(): string {
    return this.searchForm.controls[this.leavingKey].value;
  }
  arrivalKey = 'arrival';
  get arrival(): string {
    return this.searchForm.controls[this.arrivalKey].value;
  }
  get direction(): Direction {
    const direction: Direction = {
      arrival: this.arrival,
      looking: '',
      leaving: this.leaving
    };
    return direction;
  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<TripigReducer.State>
  ) { }

  ngOnInit() {}

  search() {
    this.store.dispatch(TripigActions.setDirection({ direction: this.direction }));
    this.router.navigate(['/tabs/search/route']);
  }
}
