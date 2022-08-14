import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { AdminRoutingModule } from './admin-routing.module';
import { RoomCategoryPageComponent } from './room-category-page/room-category-page.component';
import { RoomMapPageComponent } from './room-map-page/room-map-page.component';
import { RoomPageComponent } from './room-page/room-page.component';
import { RoomRankDetailPageComponent } from './room-rank-detail-page/room-rank-detail-page.component';
import { RoomRankPageComponent } from './room-rank-page/room-rank-page.component';
import { RoomStatusPageComponent } from './room-status-page/room-status-page.component';
import { RoomTypePageComponent } from './room-type-page/room-type-page.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RoomRankPricePageComponent } from './room-rank-price-page/room-rank-price-page.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { RentingPageComponent } from './renting-page/renting-page.component';
import { ReceiptPageComponent } from './receipt-page/receipt-page.component';
import { StatisticalTurnOverPageComponent } from './statistical-turn-over-page/statistical-turn-over-page.component';
import { NgChartsModule } from 'ng2-charts';
import { StatisticalRoomRankPageComponent } from './statistical-room-rank-page/statistical-room-rank-page.component';

@NgModule({
  declarations: [
    RoomPageComponent,
    RoomRankPageComponent,
    RoomTypePageComponent,
    RoomCategoryPageComponent,
    RoomMapPageComponent,
    RoomRankDetailPageComponent,
    RoomStatusPageComponent,
    RoomRankPricePageComponent,
    BookingPageComponent,
    RentingPageComponent,
    ReceiptPageComponent,
    StatisticalTurnOverPageComponent,
    StatisticalRoomRankPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzTableModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzMessageModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzModalModule,
    NzUploadModule,
    NzTagModule,
    NzCardModule,
    NzDatePickerModule,
    NzInputModule,
    NgChartsModule,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AdminModule { }
