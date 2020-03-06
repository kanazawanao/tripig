import { Category } from 'src/app/parts/category.class';

export const featureName = 'condition';

export interface State {
  origin: string;
  destination: string;
  radius: number;
  travelMode: google.maps.TravelMode;
  category: Category;
}

export const initialState: State = {
  origin: '',
  destination: '',
  radius: 0,
  travelMode: google.maps.TravelMode.DRIVING,
  category: { icon: '', index: 0, value: '', viewValue: '', custome: false },
};
