import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/class/course.models';
import { Place } from 'src/app/models/class/place.model';

export const loadAll = createAction('[Place Page] Load All');

export const loadAllSuccess = createAction('[Place API] Load All Success', props<{ courseList: Course[] }>());

export const loadAllFailure = createAction('[Place API] Load All Failure', props<{ error: any }>());

export const updateCourse = createAction('[Place Page] updateCourse', props<{ course: Course }>());

export const updateSelectedPlaceList = createAction('[Place Page] updateSelectedPlaceList', props<{ selectedPlaceList: Place[] }>());

export const searchSugestPlaceList = createAction('[Place Page] searchSugestPlaceList', props<{ sugestPlaceList: Place[] }>());

export const selectLastLocation = createAction('[Place Page] selectLastLocation', props<{ lastSelectedLocation?: google.maps.LatLng }>());

export const selectCourse = createAction('[Place Page] selectCourse', props<{ courseId: string }>());
