import { MapPointSearchContainerComponent } from './map-point-search-container.component';
import { MapPointSearchComponent } from './map-point-search.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { MapModule } from 'src/app/parts/map/map.module';
import { SuggestListModule } from 'src/app/parts/suggest-list/suggest-list.module';
import { TabCategoryModule } from 'src/app/parts/tab-category/tab-category.module';

@NgModule({
  declarations: [MapPointSearchContainerComponent, MapPointSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MapPointSearchContainerComponent }]),
    MapModule,
    MaterialModule,
    SuggestListModule,
    TabCategoryModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapPointSearchModule {}
