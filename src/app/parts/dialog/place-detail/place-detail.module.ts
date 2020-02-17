import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { RatingStarsModule } from 'src/app/parts/rating-stars/rating-stars.module';
import { PlaceDetailComponent } from './place-detail.component';

@NgModule({
  declarations: [
    PlaceDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RatingStarsModule,
  ]
})
export class PlaceDetailModule { }
