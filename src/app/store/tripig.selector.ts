import { createSelector } from '@ngrx/store';
import { State } from './';
import * as fromTripig from './tripig.reducer';

export const selectTripig = (state: State) => state.tripig;
export const getDirection = createSelector(selectTripig, fromTripig.getDirection);
export const getSelectedList = createSelector(selectTripig, fromTripig.getSelectedList);
export const getSuggestList = createSelector(selectTripig, fromTripig.getSuggestList);
