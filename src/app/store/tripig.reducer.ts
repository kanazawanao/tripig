import { Action, createReducer, on } from '@ngrx/store';
import * as TripigAction from './tripig.action';
import { Direction } from '../models/direction.model';

export interface State {
  direction: Direction;
  selectedList: google.maps.places.PlaceResult[];
}

export const initialState: State = {
  direction: {arrival: '', looking: '', leaving: ''},
  selectedList: [],
};

const coreReducer = createReducer(
  initialState,
  on(TripigAction.setDirection, (state, { direction } ) => {
    return {
      ...state,
      direction,
    };
  }),
  on(TripigAction.setSelectedList, (state, { selectedList } ) => {
    return {
      ...state,
      selectedList,
    };
  }),
);
export function reducer(state: State | undefined, action: Action): State {
  return coreReducer(state, action);
}

export const getDirection = (state: State) => state.direction;
export const getSelectedList = (state: State) => state.selectedList;
