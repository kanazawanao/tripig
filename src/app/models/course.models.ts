import { Place } from './place.model';

/**
 * Route
 */
export interface Course {
  name: string;
  id?: string;
  route: Place[];
}
