/**
 * Direction
 */
export interface Direction {
  origin: string;
  destination: string;
  category: string;
  radius: number;
  travelMode: google.maps.TravelMode;
}
