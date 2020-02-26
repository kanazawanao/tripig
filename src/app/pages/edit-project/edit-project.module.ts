import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditProjectComponent } from './edit-project.component';

@NgModule({
  declarations: [EditProjectComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: EditProjectComponent }])],
})
export class EditProjectModule {}
