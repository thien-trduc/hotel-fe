import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header.component';



@NgModule({
  declarations: [
    AdminHeaderComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    AdminHeaderComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AdminHeaderModule { }
