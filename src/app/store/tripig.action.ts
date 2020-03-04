import { Place } from '../models/class/place.model';
import { Direction } from '../models/interface/direction.model';
import { Category } from '../parts/category.class';
import { createAction, props } from '@ngrx/store';

export const signIn = createAction('[SignIn Page] signIn');

export const signInSuccess = createAction('[SignIn Page] login Success');

export const signInFailure = createAction('[SignIn Page] login Failure');

export const signUp = createAction('[SignUp Page] signUp');

export const signUpSuccess = createAction('[SignUp Page] signUp Success');

export const signUpFailure = createAction('[SignUp Page] signUp Failure');

export const loadAll = createAction('[Place API] load All');

export const loadAllSuccess = createAction('[Place API] load All Success');

export const loadAllFailure = createAction('[Place API] signUp All Failure');

export const setDirection = createAction('[Tripig] setDirection', props<{ direction: Direction }>());

export const setCategory = createAction('[Tripig] setCategory', props<{ category: Category }>());

export const setSelectedList = createAction('[Tripig] setSelectedList', props<{ selectedList: Place[] }>());

export const setLastSelectedPlace = createAction('[Tripig] setLastSelectedPlace', props<{ lastSelectedPlace: Place }>());

export const setSelectedCourseId = createAction('[Tripig] setSelectedCourseId', props<{ selectedCourseId: string }>());

export const actions = {
  signIn,
  signInSuccess,
  signInFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  setDirection,
  setCategory,
  setSelectedList,
  setLastSelectedPlace,
  setSelectedCourseId,
};
