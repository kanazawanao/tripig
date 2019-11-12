import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapPointSearchComponent } from './map-point-search.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MapPointSearchComponent }]),
  ]
})
export class MapPointSearchModule { }
