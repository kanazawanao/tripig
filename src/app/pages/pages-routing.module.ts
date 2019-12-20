import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'map',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/pages/map-pages/map-pages.module').then(m => m.MapPagesModule)
      }
    ]
  },
  {
    path: 'signIn',
    loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
