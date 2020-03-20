import { MapRouteSearchContainerComponent } from './map-route-search-container.component';
import { MapRouteSearchComponent } from './map-route-search.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { MapModule } from 'src/app/parts/map/map.module';
import { SuggestListModule } from 'src/app/parts/suggest-list/suggest-list.module';
import { TabCategoryModule } from 'src/app/parts/tab-category/tab-category.module';

@NgModule({
  declarations: [MapRouteSearchContainerComponent, MapRouteSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MapRouteSearchContainerComponent }]),
    GoogleMapsModule,
    MaterialModule,
    SuggestListModule,
    TabCategoryModule,
    MapModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapRouteSearchModule {}
