import * as PlaceActions from '../actions';
import { initialState, State } from '../states';
import { Action, createReducer, on } from '@ngrx/store';

const placeReducer = createReducer(
  initialState,
  on(PlaceActions.loadAll, (state) => {
    return { ...state, loading: true };
  }),
  on(PlaceActions.loadAllSuccess, (state, { courseList }) => {
    return { ...state, courseList };
  }),
  on(PlaceActions.loadAllFailure, (state) => {
    return { ...state, loading: false, courses: [] };
  }),
  on(PlaceActions.updateCourse, (state, { course }) => {
    return { ...state };
  }),
  on(PlaceActions.updateSelectedPlaceList, (state, { selectedPlaceList }) => {
    return { ...state, selectedPlaceList };
  }),
  on(PlaceActions.selectLastLocation, (state, { lastSelectedLocation }) => {
    return { ...state, lastSelectedLocation };
  }),
  on(PlaceActions.selectCourse, (state, { courseId }) => {
    return { ...state, selectedCourseId: courseId };
  }),
  on(PlaceActions.searchSugestPlaceList, (state, { sugestPlaceList }) => {
    return { ...state, sugestPlaceList };
  }),
);

export function reducer(state: State, action: Action) {
  return placeReducer(state, action); // AOTコンパイル用
}
