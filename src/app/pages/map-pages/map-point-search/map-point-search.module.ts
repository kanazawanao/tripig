import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { MaterialModule } from 'src/app/material/material.module';
import { MapPointSearchComponent } from './map-point-search.component';
import { SuggestListModule } from 'src/app/parts/suggest-list/suggest-list.module';
import { TabCategoryModule } from 'src/app/parts/tab-category/tab-category.module';

@NgModule({
  declarations: [MapPointSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MapPointSearchComponent }]),
    GoogleMapsModule,
    MaterialModule,
    SuggestListModule,
    TabCategoryModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MapPointSearchModule { }
