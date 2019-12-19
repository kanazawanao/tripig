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
  {
    path: 'course',
    loadChildren: () => import('./map-selected-course/map-selected-course.module').then(m => m.MapSelectedCourseModule)
  },
  {
    path: '**',
    redirectTo: 'point'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapPagesRoutingModule { }
