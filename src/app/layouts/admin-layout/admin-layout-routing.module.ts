import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     component: AdminLayoutComponent
    // },
    {
        path: '',
        component: AdminLayoutComponent,
        loadChildren: () => import('../../pages/admin/admin.module').then(m => m.AdminModule),
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminLayoutRoutingModule {}
