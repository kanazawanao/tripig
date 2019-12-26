import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { TabCategoryComponent } from './tab-category.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    TabCategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    TabCategoryComponent
  ]
})
export class TabCategoryModule { }
