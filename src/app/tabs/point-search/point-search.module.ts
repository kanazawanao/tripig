import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material/material.module';
import { PointSearchComponent } from './point-search.component';

@NgModule({
  declarations: [PointSearchComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PointSearchComponent }]),
    MaterialModule
  ]
})
export class PointSearchModule { }
