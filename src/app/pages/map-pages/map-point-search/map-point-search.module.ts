import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapPointSearchComponent } from './map-point-search.component';

@NgModule({
  declarations: [MapPointSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MapPointSearchComponent }]),
    GoogleMapsModule,
  ]
})
export class MapPointSearchModule { }
