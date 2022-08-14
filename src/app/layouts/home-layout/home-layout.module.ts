import { HomeLayoutRoutingModule } from './home-layout-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FooterModule } from 'src/app/components/footer/footer.module';


@NgModule({
  declarations: [
    HomeLayoutComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    HomeLayoutRoutingModule,
  ],
})
export class HomeLayoutModule { }
