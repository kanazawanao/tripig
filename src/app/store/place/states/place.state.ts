import { Course } from 'src/app/models/class/course.models';
import { Place } from 'src/app/models/class/place.model';

export const featureName = 'place';

export interface State {
  loading: boolean;
  courseList: Course[];
  selectedPlaceList: Place[];
  sugestPlaceList: Place[];
  lastSelectedPlace?: Place;
  selectedCourseId: string;
  err?: any;
}

export const initialState: State = {
  loading: false,
  courseList: [],
  selectedPlaceList: [],
  sugestPlaceList: [],
  selectedCourseId: '',
};
