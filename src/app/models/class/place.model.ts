/**
 * Place
 */
export class Place {
  name?: string;
  selected: boolean;
  icon?: string;
  url?: string;
  photos?: google.maps.places.PlacePhoto[];
  location?: google.maps.LatLng;
  placeId?: string;
  rating?: number;
  numberOfReviews?: number;
  constructor(
    name?: string,
    selected?: boolean,
    icon?: string,
    url?: string,
    photos?: google.maps.places.PlacePhoto[],
    location?: google.maps.LatLng,
    placeId?: string,
    rating?: number,
    numberOfReviews?: number,
  ) {
    this.name = name ? name : '';
    this.selected = selected ? selected : false;
    this.icon = icon ? icon : '';
    this.url = url ? url : '';
    this.photos = photos ? photos : [];
    this.location = location ? location : undefined;
    this.placeId = placeId ? placeId : '';
    this.rating = rating ? rating : 0;
    this.numberOfReviews = numberOfReviews ? numberOfReviews : 0;
  }
}
