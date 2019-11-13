import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

const modules = [
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatSelectModule
];

@NgModule({
  declarations: [],
  exports: [modules],
  imports: [CommonModule, modules]
})
export class MaterialModule {}
