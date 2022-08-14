import { RoomCategoryPageComponent } from './room-category-page/room-category-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/constants/route';
import { RoomTypePageComponent } from './room-type-page/room-type-page.component';
import { RoomRankPageComponent } from './room-rank-page/room-rank-page.component';
import { RoomRankDetailPageComponent } from './room-rank-detail-page/room-rank-detail-page.component';
import { RoomMapPageComponent } from './room-map-page/room-map-page.component';
import { RoomStatusPageComponent } from './room-status-page/room-status-page.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { RentingPageComponent } from './renting-page/renting-page.component';
import { ReceiptPageComponent } from './receipt-page/receipt-page.component';
import { StatisticalTurnOverPageComponent } from './statistical-turn-over-page/statistical-turn-over-page.component';
import { StatisticalRoomRankPageComponent } from './statistical-room-rank-page/statistical-room-rank-page.component';

export const routes: Routes = [
    {
        path: Route.RoomStatus,
        component: RoomStatusPageComponent,
    },
    {
        path: Route.RoomMap,
        component: RoomMapPageComponent,
    },
    {
        path: Route.RoomType,
        component: RoomTypePageComponent,
    },
    {
        path: Route.RoomCategory,
        component: RoomCategoryPageComponent,
    },
    {
        path: Route.RoomRank,
        component: RoomRankPageComponent,
    },
    {
        path: `${Route.RoomRank}/:id`,
        component: RoomRankDetailPageComponent,
    },
    {
        path: Route.Booking,
        component: BookingPageComponent,
    },
    {
        path: Route.Renting,
        component: RentingPageComponent,
    },
    {
        path: Route.Receipt,
        component: ReceiptPageComponent,
    },
    {
        path: Route.StatisticalTurnOver,
        component: StatisticalTurnOverPageComponent,
    },
    {
        path: Route.StatisticalRoomRank,
        component: StatisticalRoomRankPageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
