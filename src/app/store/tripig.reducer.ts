import { Action, createReducer, on } from '@ngrx/store';
import * as TripigAction from './tripig.action';
import { Direction } from '../models/interface/direction.model';
import { Place } from '../models/interface/place.model';
import { Course } from '../models/interface/course.models';

export interface State {
  direction: Direction;
  selectedList: Place[];
  suggestList: Place[];
  lastSelectedPlace: Place;
  selectedCourse: Course;
}

export const initialState: State = {
  direction: {
    destination: '',
    origin: '',
    category: { icon: '', viewValue: '', value: '', index: 0 },
    radius: 10000,
    travelMode: google.maps.TravelMode.DRIVING
  },
  selectedList: [],
  suggestList: [],
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
  }),
  on(TripigAction.setSelectedCourse, (state, { selectedCourse }) => {
    return {
      ...state,
      selectedCourse
    };
  }),
  on(TripigAction.onSelectedChange, (state, { place }) => {
    return {
      ...state,
      suggestList: state.suggestList.map(s => {
        if (s.placeId === place.placeId) {
          s.selected = !s.selected;
        }
        return s;
      })
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
export const getSelectedCourse = (state: State) => state.selectedCourse;
