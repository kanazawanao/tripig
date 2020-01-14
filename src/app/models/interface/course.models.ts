import { Place } from './place.model';

/**
 * Course
 */
export interface Course {
  name: string;
  id?: string;
  route: Place[];
  travelMode: google.maps.TravelMode;
}
