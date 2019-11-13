import { Action, createReducer, on } from '@ngrx/store';
import * as TripigAction from './tripig.action';
import { Direction } from '../models/direction.model';

export interface State {
  direction: Direction;
}

export const initialState: State = {
  direction: {arrival: '', looking: '', leaving: ''},
};

const coreReducer = createReducer(
  initialState,
  on(TripigAction.setDirection, (state, { direction } ) => {
    return {
      ...state,
      direction,
    };
  }),
);
export function reducer(state: State | undefined, action: Action): State {
  return coreReducer(state, action);
}

export const getDirection = (state: State) => state.direction;
