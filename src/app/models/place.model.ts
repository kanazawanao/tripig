/**
 * Place
 */
export interface Place {
  name?: string;
  selected: boolean;
  icon?: string;
  url?: string;
  photos?: google.maps.places.PlacePhoto[];
  location?: google.maps.LatLng;
  placeId?: string;
  rating?: number;
  numberOfReviews?: number;
}
