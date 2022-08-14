import { AbstractService } from './abstract.service';
import { Injectable } from '@angular/core';
import { BookingOrderDto } from '../models/dto/booking-order.dto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingOrderService extends AbstractService<BookingOrderDto> {

  constructor(
    public readonly http: HttpClient,
    public readonly api: ApiService,
  ) {
    super(
      http,
      `${environment.url}/booking-order`,
      api
    )
   }

  
}
