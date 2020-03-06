import { TabsPage } from './tabs.component.page';
import { AuthGuard } from '../guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
            loadChildren: () => import('./pages/point-search/point-search.module').then((m) => m.PointSearchModule),
          },
        ],
      },
      {
        path: 'route',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/route-search/route-search.module').then((m) => m.RouteSearchModule),
          },
        ],
      },
      {
        path: 'registered',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/registered-routes/registered-routes.module').then((m) => m.RegisteredRoutesModule),
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'pages',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/pages.module').then((m) => m.PagesModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/registered',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/registered',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
