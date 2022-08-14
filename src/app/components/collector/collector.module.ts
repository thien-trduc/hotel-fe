import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorComponent } from './collector.component';


@NgModule({
  declarations: [
    CollectorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CollectorComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CollectorModule { }
