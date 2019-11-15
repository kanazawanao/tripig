/**
 * Direction
 */
export interface Direction {
  origin: string;
  destination: string;
  looking: string;
  travelMode?: google.maps.TravelMode;
}
