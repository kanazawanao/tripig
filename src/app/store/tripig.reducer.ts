import { Action, createReducer, on } from '@ngrx/store';
import * as TripigAction from './tripig.action';
import { Direction } from '../models/interface/direction.model';
import { Place } from '../models/interface/place.model';
import { Course } from '../models/interface/course.models';

export interface State {
  direction: Direction;
  selectedList: Place[];
  lastSelectedPlace: Place;
  selectedCourse: Course;
}

export const initialState: State = {
  direction: {
    destination: '',
    origin: '',
    category: { icon: '', viewValue: '', value: '', index: 0, custome: false },
    radius: 10000,
    travelMode: google.maps.TravelMode.DRIVING
  },
  selectedList: [],
  lastSelectedPlace: {
    selected: true,
    location: undefined
  },
  selectedCourse: {
    name: '',
    route: [],
    travelMode: google.maps.TravelMode.DRIVING
  }
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
  on(TripigAction.setLastSelectedPlace, (state, { lastSelectedPlace }) => {
    return {
      ...state,
      lastSelectedPlace
    };
  }),
  on(TripigAction.setSelectedCourse, (state, { selectedCourse }) => {
    return {
      ...state,
      selectedCourse
    };
  }),
);
export function reducer(state: State | undefined, action: Action): State {
  return coreReducer(state, action);
}

export const getDirection = (state: State) => state.direction;
export const getSelectedList = (state: State) => state.selectedList;
export const getLastSelectedPlace = (state: State) => state.lastSelectedPlace;
export const getSelectedCourse = (state: State) => state.selectedCourse;
