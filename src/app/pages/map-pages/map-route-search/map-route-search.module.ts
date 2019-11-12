import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapRouteSearchComponent } from './map-route-search.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MapRouteSearchComponent }]),
  ]
})
export class MapRouteSearchModule { }
