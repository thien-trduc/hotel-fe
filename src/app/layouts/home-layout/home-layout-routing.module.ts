import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './home-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        loadChildren: () => import('../../pages/booking/booking.module').then(m => m.BookingModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeLayoutRoutingModule {}
