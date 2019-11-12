import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'point',
    loadChildren: () => import('./map-point-search/map-point-search.module').then(m => m.MapPointSearchModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./map-route-search/map-route-search.module').then(m => m.MapRouteSearchModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapPagesRoutingModule { }
