import { MapSelectedCourseContainerComponent } from './map-selected-course-container.component';
import { MapSelectedCourseComponent } from './map-selected-course.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [MapSelectedCourseComponent, MapSelectedCourseContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MapSelectedCourseContainerComponent }]),
    GoogleMapsModule,
    MaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapSelectedCourseModule {}
