/**
 * Place
 */
export interface Place {
  name?: string;
  selected: boolean;
  icon?: string;
  url?: string;
  photos?: string[];
  location?: google.maps.LatLng;
  placeId?: string;
  rating?: number;
  numberOfReviews?: number;
}
