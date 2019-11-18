/**
 * Direction
 */
export interface Direction {
  origin: string;
  destination: string;
  looking: string;
  radius: number;
  travelMode?: google.maps.TravelMode;
}
