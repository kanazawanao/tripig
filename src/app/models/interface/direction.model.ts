import { Category } from '../../parts/category.class';

/**
 * Direction
 */
export interface Direction {
  origin: string;
  destination: string;
  category: Category;
  radius: number;
  travelMode: google.maps.TravelMode;
}
