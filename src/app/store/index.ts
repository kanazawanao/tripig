import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromTripig from './tripig.reducer';

export interface State {
  tripig: fromTripig.State;
}

export const reducers: ActionReducerMap<State> = {
  tripig: fromTripig.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
