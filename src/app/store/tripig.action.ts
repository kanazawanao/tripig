import { createAction, props } from '@ngrx/store';
import { Direction } from '../models/interface/direction.model';
import { Place } from '../models/interface/place.model';
import { Category } from '../parts/category.class';

export const setDirection = createAction(
  '[Tripig] setDirection',
  props<{ direction: Direction }>()
);

export const setCategory = createAction(
  '[Tripig] setCategory',
  props<{ category: Category }>()
);

export const setSelectedList = createAction(
  '[Tripig] setSelectedList',
  props<{ selectedList: Place[] }>()
);

export const setLastSelectedPlace = createAction(
  '[Tripig] setLastSelectedPlace',
  props<{ lastSelectedPlace: Place }>()
);

export const setSelectedCourseId = createAction(
  '[Tripig] setSelectedCourseId',
  props<{ selectedCourseId: string }>()
);
