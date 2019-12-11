import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.component.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    MaterialModule,
  ],
  declarations: [TabsPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TabsPageModule {}
