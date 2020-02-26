import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { EditProjectComponent } from './edit-project.component';

@NgModule({
  declarations: [EditProjectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: EditProjectComponent }]),
    MaterialModule,
  ],
  exports: [EditProjectComponent],
})
export class EditProjectModule {}
