import { RoomRankDto } from './../models/dto/room-rank.dto';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { RequestPayload } from '../models/payload/request.payload';
import { Observable } from "rxjs";
import { ResponseDto } from '../models/dto/response.dto';
import { RoomRankPriceDto } from '../models/dto/room-rank-price.dto';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class RoomRankService extends AbstractService<RoomRankDto> {

  constructor(
    public readonly http: HttpClient,
    public readonly api: ApiService,
  ) {
    super(
      http,
      `${environment.url}/room-rank`,
      api
    )
  }

  getRoomRankDiscountBooking(formData: RequestPayload): Observable<ResponseDto<RoomRankDto>> {
    const {
      pagination = {
        pageIndex: 0,
        pageSize: 10
      },
      query = {},
      sort = { createdAt: 'desc' }
    } = formData;
    return new Observable(
      observer => {
        this.api.post(`${this.url}/list-discount-booking`, {
          pagination, query, sort
        }).subscribe(
          (res) => {
            const body = _.get(res, 'body', {});
            if (body) {
              observer.next(body)
            }
          },
          (error) => observer.error(error),
          () => observer.complete()
        )
      })
  }

  getRoomRankBooking(formData: RequestPayload): Observable<ResponseDto<RoomRankDto>> {
    const {
      pagination = {
        pageIndex: 0,
        pageSize: 10
      },
      query = {},
      sort = { createdAt: 'desc' }
    } = formData;
    return new Observable(
      observer => {
        this.api.post(`${this.url}/list-booking`, {
          pagination, query, sort
        }).subscribe(
          (res) => {
            const body = _.get(res, 'body', {});
            if (body) {
              observer.next(body)
            }
          },
          (error) => observer.error(error),
          () => observer.complete()
        )
      })
  }

  getRoomRankAndDiscountBooking(formData: RequestPayload): Observable<ResponseDto<RoomRankDto>> {
    const {
      pagination = {
        pageIndex: 0,
        pageSize: 10
      },
      query = {},
      sort = { createdAt: 'desc' }
    } = formData;
    return new Observable(
      observer => {
        this.api.post(`${this.url}/list-booking-and-discount`, {
          pagination, query, sort
        }).subscribe(
          (res) => {
            const body = _.get(res, 'body', {});
            if (body) {
              observer.next(body)
            }
          },
          (error) => observer.error(error),
          () => observer.complete()
        )
      })
  }


  findPricesService(id: string, formData: RequestPayload): Observable<ResponseDto<RoomRankPriceDto>> {
    const {
      pagination = {
        pageIndex: 0,
        pageSize: 10
      },
      query = {},
      sort = { createdAt: 'desc' }
    } = formData;
    return new Observable(
      observer => {
        this.api.post(`${this.url}/${id}/price/list`, {
          pagination, query, sort
        }).subscribe(
          (res) => {
            const body = _.get(res, 'body', {});
            if (body) {
              observer.next(body)
            }
          },
          (error) => observer.error(error),
          () => observer.complete()
        )
      })
  }

  createPriceService(id: string, formData: any): Observable<RoomRankPriceDto> {
    return new Observable(
      observer => {
        this.api.post(`${this.url}/${id}/price`, {
          ...formData
        }).subscribe((res) => {
          const body = _.get(res, 'body', {});
          if (body) {
            observer.next(body)
          }
        },
          (error) => observer.error(error),
          () => observer.complete())
      }
    )
  }

  updatePriceService(id: string, idPrice: string, formData: any): Observable<RoomRankPriceDto> {
    return new Observable(
      observer => {
        this.api.patch(`${this.url}/${id}/price/${idPrice}`, {
          ...formData
        }).subscribe((res) => {
          const body = _.get(res, 'body', {});
          if (body) {
            observer.next(body)
          }
        },
          (error) => observer.error(error),
          () => observer.complete())
      }
    )
  }

  deletePriceService(id: string | number, idPrice: string): Observable<boolean> {
    return new Observable(
      observer => {
        this.api.delete(`${this.url}/${id}/price/${idPrice}`).subscribe((res) => {
          const status = _.get(res, 'status');
          if (status === HttpStatusCode.NoContent) {
            observer.next(true)
          }
          observer.next(false)
        },
          (error) => observer.error(error),
          () => observer.complete())
      }
    )
  }

  getPriceById(id: string | number,  idPrice: string): Observable<RoomRankPriceDto> {
    return new Observable(
      observer => {
        this.api.get(`${this.url}/${id}/price/${idPrice}`).subscribe((res) => {
          console.log(res)
          const body = _.get(res, 'body', {});
          if (body) {
            observer.next(body)
          }
        },
          (error) => observer.error(error),
          () => observer.complete())
      }
    )
  }

  statisticalRoomRank(formData: any): Observable<any> {
    return new Observable(
      observer => {
        this.api.post(`${this.url}/statistical-room-rank`, {
          ...formData
        }).subscribe((res) => {
          const body = _.get(res, 'body', {});
          if (body) {
            observer.next(body)
          }
        },
          (error) => observer.error(error),
          () => observer.complete())
      }
    )
  }
}