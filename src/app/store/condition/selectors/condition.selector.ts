import { featureName, State } from '../states';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getState = createFeatureSelector<State>(featureName);

export const getOrigin = createSelector(getState, (state) => state.origin);

export const getDestination = createSelector(getState, (state) => state.destination);

export const getRadius = createSelector(getState, (state) => state.radius);

export const getTravelMode = createSelector(getState, (state) => state.travelMode);

export const getCategory = createSelector(getState, (state) => state.category);
