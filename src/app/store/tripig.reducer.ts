import { Action, createReducer, on } from '@ngrx/store';
import * as TripigAction from './tripig.action';
import { Direction } from '../models/direction.model';
import { Place } from '../models/place.model';

export interface State {
  direction: Direction;
  selectedList: Place[];
}

export const initialState: State = {
  direction: {
    destination: '',
    origin: '',
    radius: 10000,
    travelMode: google.maps.TravelMode.DRIVING
  },
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
