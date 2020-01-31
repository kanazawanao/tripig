import { Place } from './place.model';

/**
 * Course
 */
export interface Course {
  name: string;
  id?: string;
  uids: string[];
  route: Place[];
  travelMode: google.maps.TravelMode;
}
