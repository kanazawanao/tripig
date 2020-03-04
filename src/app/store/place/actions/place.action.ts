import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/class/course.models';
import { Place } from 'src/app/models/class/place.model';

export const loadAll = createAction('[Place Page] Load All', props<{ offset?: number; limit?: number }>());

export const loadAllSuccess = createAction('[Place API] Load All Success', props<{ placeList: Course[] }>());

export const loadAllFailure = createAction('[Place API] Load All Failure', props<{ error: any }>());

export const updateAll = createAction('[Place Page] Update All', props<{ placeList: Place[] }>());

export const updateAllSuccess = createAction('[Place API] Update All Success');

export const updateAllFailure = createAction('[Place API] Update All Failure', props<{ error: any }>());
