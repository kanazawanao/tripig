import { featureName, State } from '../place.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getState = createFeatureSelector<State>(featureName);

export const getLoading = createSelector(getState, (state) => state.loading);

export const getSselectedList = createSelector(getState, (state) => state.selectedList);
