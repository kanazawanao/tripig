import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { SuggestListComponent } from './suggest-list.component';
import { RatingStarsModule } from 'src/app/parts/rating-stars/rating-stars.module';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    SuggestListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RatingStarsModule,
  ],
  exports: [
    SuggestListComponent
  ]
})
export class SuggestListModule { }
