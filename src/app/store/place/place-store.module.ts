import { TodoEffects } from './effects';
import { reducer } from './reducers';
import { featureName } from './states';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  imports: [StoreModule.forFeature(featureName, reducer), EffectsModule.forFeature([TodoEffects])],
})
export class TodoStoreModule {}
