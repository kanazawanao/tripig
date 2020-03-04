import { Course } from 'src/app/models/class/course.models';

export const featureName = 'place';

export interface State {
  loading: boolean;
  selectedList: Course[];
  err?: any;
}

export const initialState: State = {
  loading: false,
  selectedList: [],
};
