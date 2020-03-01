import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { MaterialModule } from 'src/app/material/material.module';
import { MapSelectedCourseComponent } from './map-selected-course.component';

@NgModule({
  declarations: [MapSelectedCourseComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: MapSelectedCourseComponent }]), GoogleMapsModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapSelectedCourseModule {}
