import * as PlaceActions from '../actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PlaceService } from 'src/app/services/place.service';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private placeService: PlaceService) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaceActions.loadAll),
      switchMap(() =>
        this.placeService.getAllPlace().pipe(
          map((result) => PlaceActions.loadAllSuccess({ placeList: result })),
          catchError((error) => of(PlaceActions.loadAllFailure({ error }))),
        ),
      ),
    ),
  );
}
