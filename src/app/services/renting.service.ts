import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RentingDto } from '../models/dto/renting.dto';
import { AbstractService } from './abstract.service';
import { ApiService } from './api.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RentingService extends AbstractService<RentingDto> {
  constructor(
    public readonly http: HttpClient,
    public readonly api: ApiService,
  ) {
    super(
      http,
      `${environment.url}/renting`,
      api
    )
  }

  public checkInBooking(formData: any): Observable<any> {
    return new Observable<any>(observer => {
      this.api.post(`${this.url}/check-in-booking`, {
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

  public checkOutRenting(formData: any): Observable<any> {
    return new Observable<any>(observer => {
      this.api.post(`${this.url}/check-out`, {
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
