import * as ConditionActions from '../actions';
import { initialState, State } from '../states';
import { Action, createReducer, on } from '@ngrx/store';

const conditionReducer = createReducer(
  initialState,
  on(ConditionActions.setOrigin, (state, { origin }) => {
    return { ...state, origin };
  }),
  on(ConditionActions.setDestination, (state, { destination }) => {
    return { ...state, destination };
  }),
  on(ConditionActions.setRadius, (state, { radius }) => {
    return { ...state, radius };
  }),
  on(ConditionActions.setTravelMode, (state, { travelMode }) => {
    return { ...state, travelMode };
  }),
  on(ConditionActions.setCategory, (state, { category }) => {
    return { ...state, category };
  }),
);

export function reducer(state: State, action: Action) {
  return conditionReducer(state, action); // AOTコンパイル用
}
