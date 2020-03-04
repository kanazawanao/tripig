import * as TodoActions from '../actions';
import { initialState, State } from '../states';
import { Action, createReducer, on } from '@ngrx/store';

const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadAll, (state) => {
    return { ...state, loading: true };
  }),
);

export function reducer(state: State, action: Action) {
  return todoReducer(state, action); // AOTコンパイル用
}
