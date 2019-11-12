import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.component.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'point',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-pages/point-search/point-search.module').then(m => m.PointSearchModule)
          }
        ]
      },
      {
        path: 'route',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-pages/route-search/route-search.module').then(m => m.RouteSearchModule)
          }
        ]
      },
      {
        path: 'registered',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-pages/registered-routes/registered-routes.module').then(m => m.RegisteredRoutesModule)
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./map-pages/map-pages.module').then(m => m.MapPagesModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/point',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/point',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
