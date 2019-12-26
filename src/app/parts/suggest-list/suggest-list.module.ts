import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { SuggestListComponent } from './suggest-list.component';

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
  ],
  exports: [
    SuggestListComponent
  ]
})
export class SuggestListModule { }
