import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminNavbarModule } from 'src/app/components/admin-navbar/admin-navbar.module';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminHeaderModule } from 'src/app/components/admin-header/admin-header.module';



@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    AdminNavbarModule,
    AdminHeaderModule
  ]
})
export class AdminLayoutModule { }
