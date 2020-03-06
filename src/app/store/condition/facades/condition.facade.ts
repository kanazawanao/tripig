import * as ConditionActions from '../actions';
import * as ConditionSelectors from '../selectors';
import { State } from '../states';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Direction } from 'src/app/models/interface/direction.model';
import { Category } from 'src/app/parts/category.class';
@Injectable({
  providedIn: 'root',
})
export class ConditionFacade {
  origin$ = this.store.pipe(select(ConditionSelectors.getOrigin));
  destination$ = this.store.pipe(select(ConditionSelectors.getDestination));
  radius$ = this.store.pipe(select(ConditionSelectors.getRadius));
  travelMode$ = this.store.pipe(select(ConditionSelectors.getTravelMode));
  category$ = this.store.pipe(select(ConditionSelectors.getCategory));

  constructor(private store: Store<State>) {}

  /**
   * setDirection
   * @param direction direction
   */
  setDirection(direction: Direction) {
    this.setDestination(direction.destination);
    this.setOrigin(direction.origin);
    this.setRradius(direction.radius);
    this.setTravelMode(direction.travelMode);
  }

  /**
   * setOrigin
   * @param origin origin
   */
  setOrigin(origin: string) {
    this.store.dispatch(ConditionActions.setOrigin({ origin }));
  }

  /**
   * setDestination
   * @param destination destination
   */
  setDestination(destination: string) {
    this.store.dispatch(ConditionActions.setDestination({ destination }));
  }

  /**
   * setRradius
   * @param radius radius
   */
  setRradius(radius: number) {
    this.store.dispatch(ConditionActions.setRadius({ radius }));
  }

  /**
   * setTravelMode
   * @param travelMode travelMode
   */
  setTravelMode(travelMode: google.maps.TravelMode) {
    this.store.dispatch(ConditionActions.setTravelMode({ travelMode }));
  }

  /**
   * setCategory
   * @param category category
   */
  setCategory(category: Category) {
    this.store.dispatch(ConditionActions.setCategory({ category }));
  }
}
