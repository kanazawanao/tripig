import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { RatingStarsComponent } from './rating-stars.component';

@NgModule({
  declarations: [
    RatingStarsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    RatingStarsComponent
  ]
})
export class RatingStarsModule { }
