import { createAction, props } from '@ngrx/store';
import { Direction } from '../models/direction.model';
import { Place } from '../models/place.model';

export const setDirection = createAction(
  '[Tripig] setDirection',
  props<{ direction: Direction; }>()
);

export const setSelectedList = createAction(
  '[Tripig] setSelectedList',
  props<{ selectedList: Place[]; }>()
);

export const setSuggestList = createAction(
  '[Tripig] setSuggestList',
  props<{ suggestList: Place[]; }>()
);
