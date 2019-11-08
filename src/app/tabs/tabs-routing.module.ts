import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
              import('./point-search/point-search.module').then(m => m.PointSearchModule)
          }
        ]
      },
      {
        path: 'route',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./route-search/route-search.module').then(m => m.RouteSearchModule)
          }
        ]
      },
      {
        path: 'registered',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./registered-routes/registered-routes.module').then(m => m.RegisteredRoutesModule)
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
