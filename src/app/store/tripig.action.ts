import { Place } from '../models/class/place.model';
import { Direction } from '../models/interface/direction.model';
import { Category } from '../parts/category.class';
import { createAction, props } from '@ngrx/store';

export const setDirection = createAction('[Tripig] setDirection', props<{ direction: Direction }>());

export const setCategory = createAction('[Tripig] setCategory', props<{ category: Category }>());

export const setSelectedList = createAction('[Tripig] setSelectedList', props<{ selectedList: Place[] }>());

export const setLastSelectedPlace = createAction('[Tripig] setLastSelectedPlace', props<{ lastSelectedPlace: Place }>());

export const setSelectedCourseId = createAction('[Tripig] setSelectedCourseId', props<{ selectedCourseId: string }>());

export const actions = {
  setDirection,
  setCategory,
  setSelectedList,
  setLastSelectedPlace,
  setSelectedCourseId,
};
