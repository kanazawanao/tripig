import { actions } from './tripig.action';
import { Place } from '../models/class/place.model';
import { Direction } from '../models/interface/direction.model';
import { Category } from '../parts/category.class';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  direction: Direction;
  category: Category;
  selectedList: Place[];
  lastSelectedPlace: Place;
  selectedCourseId: string;
}

export const initialState: State = {
  direction: {
    destination: '',
    origin: '',
    radius: 10000,
    travelMode: google.maps.TravelMode.DRIVING,
  },
  category: { icon: '', viewValue: '', value: '', index: 0, custome: false },
  selectedList: [],
  lastSelectedPlace: {
    selected: true,
    location: undefined,
  },
  selectedCourseId: '',
};

const coreReducer = createReducer(
  initialState,
  on(actions.setDirection, (state, { direction }) => {
    return {
      ...state,
      direction,
    };
  }),
  on(actions.setCategory, (state, { category }) => {
    return {
      ...state,
      category,
    };
  }),
  on(actions.setSelectedList, (state, { selectedList }) => {
    return {
      ...state,
      selectedList,
    };
  }),
  on(actions.setLastSelectedPlace, (state, { lastSelectedPlace }) => {
    return {
      ...state,
      lastSelectedPlace,
    };
  }),
  on(actions.setSelectedCourseId, (state, { selectedCourseId }) => {
    return {
      ...state,
      selectedCourseId,
    };
  }),
);
export function reducer(state: State | undefined, action: Action): State {
  return coreReducer(state, action);
}

export const getDirection = (state: State) => state.direction;
export const getCategory = (state: State) => state.category;
export const getSelectedList = (state: State) => state.selectedList;
export const getLastSelectedPlace = (state: State) => state.lastSelectedPlace;
export const getSelectedCourseId = (state: State) => state.selectedCourseId;
