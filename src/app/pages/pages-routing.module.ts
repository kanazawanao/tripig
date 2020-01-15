import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../guard/login.guard';

const routes: Routes = [
  {
    path: 'map',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/pages/map-pages/map-pages.module').then(
            m => m.MapPagesModule
          )
      }
    ]
  },
  {
    path: 'signIn',
    loadChildren: () =>
      import('./sign-in/sign-in.module').then(m => m.SignInModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'signUp',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then(m => m.SignUpModule),
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
