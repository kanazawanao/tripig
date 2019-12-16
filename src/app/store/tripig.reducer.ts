import { Action, createReducer, on } from '@ngrx/store';
import * as TripigAction from './tripig.action';
import { Direction } from '../models/direction.model';
import { Place } from '../models/place.model';

export interface State {
  direction: Direction;
  selectedList: Place[];
  suggestList: Place[];
  lastSelectedPlace: Place;
}

export const initialState: State = {
  direction: {
    destination: '',
    origin: '',
    category: {icon: '', viewValue: '', value: '', index: 0},
    radius: 10000,
    travelMode: google.maps.TravelMode.DRIVING
  },
  selectedList: [],
  suggestList: [],
  lastSelectedPlace: {selected: true, location: new google.maps.LatLng(37.421995, -122.084092)},
};

const coreReducer = createReducer(
  initialState,
  on(TripigAction.setDirection, (state, { direction }) => {
    return {
      ...state,
      direction
    };
  }),
  on(TripigAction.setSelectedList, (state, { selectedList }) => {
    return {
      ...state,
      selectedList
    };
  }),
  on(TripigAction.setSuggestList, (state, { suggestList }) => {
    return {
      ...state,
      suggestList
    };
  }),
  on(TripigAction.setLastSelectedPlace, (state, { lastSelectedPlace }) => {
    return {
      ...state,
      lastSelectedPlace
    };
  })
);
export function reducer(state: State | undefined, action: Action): State {
  return coreReducer(state, action);
}

export const getDirection = (state: State) => state.direction;
export const getSelectedList = (state: State) => state.selectedList;
export const getSuggestList = (state: State) => state.suggestList;
export const getLastSelectedPlace = (state: State) => state.lastSelectedPlace;
