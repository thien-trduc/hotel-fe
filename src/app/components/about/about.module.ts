import { NzCardModule } from 'ng-zorro-antd/card';
import { AboutComponent } from './about.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzCardModule,
  ],
  exports: [AboutComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AboutModule { }
