import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DomSanitizer } from '@angular/platform-browser';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatTabsModule,
  MatTooltipModule,
  DragDropModule
];

@NgModule({
  declarations: [],
  exports: [
    modules
  ],
  imports: [
    CommonModule,
    modules
  ]
})
export class MaterialModule {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('tent', sanitizer.bypassSecurityTrustResourceUrl('./assets/custome-icons/tent.svg'));
    iconRegistry.addSvgIcon('beer', sanitizer.bypassSecurityTrustResourceUrl('./assets/custome-icons/beer.svg'));
    iconRegistry.addSvgIcon('logo-google', sanitizer.bypassSecurityTrustResourceUrl('./assets/custome-icons/logo-google.svg'));
    iconRegistry.addSvgIcon('logo-facebook', sanitizer.bypassSecurityTrustResourceUrl('./assets/custome-icons/logo-facebook.svg'));
  }
}
