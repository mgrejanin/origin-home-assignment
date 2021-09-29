import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'form/:slug',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loadChildren: () => import('@saving-goals/home').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loadChildren: () =>
      import('@saving-goals/dashboard').then((m) => m.DashboardModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
