import { createAction, props } from '@ngrx/store';
import { Direction } from '../models/direction.model';
import { Place } from '../models/place.model';
import { Course } from '../models/course.models';

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

export const setLastSelectedPlace = createAction(
  '[Tripig] setLastSelectedPlace',
  props<{ lastSelectedPlace: Place; }>()
);

export const setSelectedCourse = createAction(
  '[Tripig] setSelectedCourse',
  props<{ selectedCourse: Course; }>()
);
