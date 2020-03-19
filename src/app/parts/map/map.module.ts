import { MapComponent } from './map.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, GoogleMapsModule],
  exports: [MapComponent],
})
export class MapModule {}
