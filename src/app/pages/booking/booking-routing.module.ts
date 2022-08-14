import { HomePageComponent } from 'src/app/pages/booking/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { Route } from 'src/app/constants/route';
import { LoginPageComponent } from './login-page/login-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: Route.LoginCustomer,
        component: LoginPageComponent,
    },
    {
        path: Route.Cart,
        component: CartPageComponent,
    },
    {
        path: Route.Home,
        component: HomePageComponent,
    },
    {
        path: Route.Register,
        component: RegisterComponent,
    },
    {
        path: `${Route.Detail}/:id`,
        component: DetailPageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookingRoutingModule {}
