import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { MaterialModule } from 'src/app/material/material.module';
import { MapPointSearchComponent } from './map-point-search.component';

@NgModule({
  declarations: [MapPointSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MapPointSearchComponent }]),
    GoogleMapsModule,
    MaterialModule,
  ]
})
export class MapPointSearchModule { }
