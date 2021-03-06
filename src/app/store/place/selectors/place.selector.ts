import { featureName, State } from '../states';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getState = createFeatureSelector<State>(featureName);

export const getLoading = createSelector(getState, (state) => state.loading);

export const getCourseList = createSelector(getState, (state) => state.courseList);

export const getSelectedPlaceList = createSelector(getState, (state) => state.selectedPlaceList);

export const getSugestPlaceList = createSelector(getState, (state) => state.sugestPlaceList);

export const getLastSelectedLocation = createSelector(getState, (state) => state.lastSelectedLocation);

export const getSelectedCourseId = createSelector(getState, (state) => state.selectedCourseId);
