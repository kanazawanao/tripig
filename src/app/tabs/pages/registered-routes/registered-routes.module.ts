import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material/material.module';
import { RegisteredRoutesComponent } from './registered-routes.component';

@NgModule({
  declarations: [RegisteredRoutesComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: RegisteredRoutesComponent }]),
    MaterialModule
  ]
})
export class RegisteredRoutesModule {}
