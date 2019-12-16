import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in.component';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: SignInComponent }]),
  ],
  exports: [
    SignInComponent
  ]
})
export class SignInModule { }
