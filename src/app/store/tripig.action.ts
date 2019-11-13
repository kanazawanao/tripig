import { createAction, props } from '@ngrx/store';
import { Direction } from '../models/direction.model';

export const setDirection = createAction(
  '[Tripig] setDirection',
  props<{ direction: Direction; }>()
);

