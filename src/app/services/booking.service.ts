import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractService } from './abstract.service';
import { ApiService } from './api.service';
import * as _ from 'lodash';
import { BookingDto } from '../models/dto/booking.dto';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends AbstractService<BookingDto>
{

  constructor(
    public readonly http: HttpClient,
    public readonly api: ApiService,
  ) {
    super(
      http,
      `${environment.url}/booking`,
      api
    )
  }

  public reserveBooking(formData: any): Observable<any> {
    return new Observable<any>(observer => {
      this.api.post(`${this.url}/reserve`, {
        ...formData,
      }).subscribe(
        (res) => {
          const body = _.get(res, 'body', {});
          if (_.isArray(body) && body.length > 0) {
            observer.next(body[0])
          } else {
            observer.next(body)
          }
        },
        (error) => observer.error(error),
        () => observer.complete()
      )
    })
  }
}