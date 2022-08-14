import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthEmployeeGuard } from './guards/auth-employee.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/home-layout/home-layout.module').then(m => m.HomeLayoutModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
    canActivate: [AuthEmployeeGuard],

  },
  {
    path: 'login',
    loadChildren: () => import('./pages/authenticate/authenticate.module').then(m => m.AuthenticateModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
