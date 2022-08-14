import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { BookingRoutingModule } from './booking-routing.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { CollectorModule } from 'src/app/components/collector/collector.module';
import { AboutModule } from 'src/app/components/about/about.module';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { RoomRankPageComponent } from './room-rank-page/room-rank-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DetailUserPageComponent } from './detail-user-page/detail-user-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { RoomRankHomeComponent } from './room-rank-home-page/room-rank-home-page.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxPayPalModule } from 'ngx-paypal';
import { RegisterComponent } from './register/register.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { ReceiptPageComponent } from './receipt-page/receipt-page.component';

const providerAuthLoginSocial = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(`${environment.googleClientId}`)
      },
      // {
      //   id: FacebookLoginProvider.PROVIDER_ID,
      //   provider: new FacebookLoginProvider(`${environment.faceBookClientId}`)
      // }
    ]
  } as SocialAuthServiceConfig,
}

@NgModule({
  declarations: [
    HomePageComponent,
    DetailPageComponent,
    RoomRankPageComponent,
    CartPageComponent,
    LoginPageComponent,
    DetailUserPageComponent,
    OrderPageComponent,
    RoomRankHomeComponent,
    RegisterComponent,
    ReceiptPageComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    CollectorModule,
    AboutModule,
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
    NzCarouselModule,
    NgxPayPalModule,
    NzUploadModule,
    SocialLoginModule,
  ],
  providers: [
    providerAuthLoginSocial,
  ]
})
export class BookingModule { }