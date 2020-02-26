import { Place } from './place.model';

/**
 * Course
 */
export class Course {
  name: string;
  id?: string;
  uids: string[];
  route: Place[];
  travelMode: google.maps.TravelMode;

  constructor(name?: string, id?: string, uids?: string[], route?: Place[], travelMode?: google.maps.TravelMode) {
    this.name = name ? name : '';
    this.id = id ? id : '';
    this.uids = uids ? uids : [];
    this.route = route ? route : [];
    this.travelMode = travelMode ? travelMode : google.maps.TravelMode.DRIVING;
  }

  deserialize() {
    return Object.assign({}, JSON.parse(JSON.stringify(this)));
  }
}
