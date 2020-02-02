import { createSelector } from '@ngrx/store';
import { State } from './';
import * as fromTripig from './tripig.reducer';

export const selectTripig = (state: State) => state.tripig;
export const getDirection = createSelector(
  selectTripig,
  fromTripig.getDirection
);
export const getCategory = createSelector(
  selectTripig,
  fromTripig.getCategory
);
export const getSelectedList = createSelector(
  selectTripig,
  fromTripig.getSelectedList
);
export const getLastSelectedPlace = createSelector(
  selectTripig,
  fromTripig.getLastSelectedPlace
);
export const getSelectedCourseId = createSelector(
  selectTripig,
  fromTripig.getSelectedCourseId
);
