import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { MaterialModule } from 'src/app/material/material.module';
import { MapRouteSearchComponent } from './map-route-search.component';
import { SuggestListModule } from 'src/app/parts/suggest-list/suggest-list.module';

@NgModule({
  declarations: [
    MapRouteSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MapRouteSearchComponent }]),
    GoogleMapsModule,
    MaterialModule,
    SuggestListModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MapRouteSearchModule { }
