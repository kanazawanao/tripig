import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const modules = [
  MatInputModule,
  MatIconModule
];

@NgModule({
  declarations: [],
  exports: [modules],
  imports: [
    CommonModule,
    modules
  ]
})
export class MaterialModule { }
