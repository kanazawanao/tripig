import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MapRouteResultComponent } from './map-route-result/map-route-result.component';

const modules = [
  MapRouteResultComponent,
];
@NgModule({
  declarations: [
    modules
  ],
  exports: [
    modules
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class MapModule { }
