import { createAction, props } from '@ngrx/store';
import { Direction } from '../models/direction.model';

export const setDirection = createAction(
  '[Tripig] setDirection',
  props<{ direction: Direction; }>()
);

export const setSelectedList = createAction(
  '[Tripig] setSelectedList',
  props<{ selectedList: google.maps.places.PlaceResult[]; }>()
);
