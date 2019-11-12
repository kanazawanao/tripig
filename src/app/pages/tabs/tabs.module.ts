import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material/material.module';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.component.page';
import { MapModule } from 'src/app/parts/dialog/map/map.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    MaterialModule,
    MapModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
