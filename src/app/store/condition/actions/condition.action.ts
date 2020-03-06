import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/parts/category.class';

export const setOrigin = createAction('[Condition] setOrigin', props<{ origin: string }>());

export const setDestination = createAction('[Condition] setDestination', props<{ destination: string }>());

export const setRadius = createAction('[Condition] setRadius', props<{ radius: number }>());

export const setTravelMode = createAction('[Condition] setTravelMode', props<{ travelMode: google.maps.TravelMode }>());

export const setCategory = createAction('[Condition] setCategory', props<{ category: Category }>());
