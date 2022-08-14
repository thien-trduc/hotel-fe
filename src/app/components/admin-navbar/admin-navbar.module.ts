import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from './admin-navbar.component';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [
    AdminNavbarComponent,
    
  ],
  imports: [
    CommonModule,
    NzIconModule,
    NzMenuModule
  ],
  exports: [
    AdminNavbarComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AdminNavbarModule { }
