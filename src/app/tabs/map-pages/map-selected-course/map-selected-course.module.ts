import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { MaterialModule } from 'src/app/material/material.module';
import { MapSelectedCourseComponent } from './map-selected-course.component';

@NgModule({
  declarations: [
    MapSelectedCourseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MapSelectedCourseComponent }]),
    GoogleMapsModule,
    MaterialModule
  ]
})
export class MapSelectedCourseModule { }
