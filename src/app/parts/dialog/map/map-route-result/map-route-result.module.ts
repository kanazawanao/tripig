import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MaterialModule } from 'src/app/material/material.module';
import { MapRouteResultComponent } from './map-route-result.component';


@NgModule({
  declarations: [MapRouteResultComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MaterialModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MapRouteResultModule { }
