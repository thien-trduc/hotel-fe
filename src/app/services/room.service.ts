import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoomDto } from '../models/dto/room.dto';
import { AbstractService } from './abstract.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends AbstractService<RoomDto> {

  constructor(
    public readonly http: HttpClient,
    public readonly api: ApiService,
  ) {
    super(
      http,
      `${environment.url}/room`,
      api
    )
  }

  findByDynamic(formData: any): Observable<any> {
    console.log(formData)
    return new Observable(
      observer => {
        this.api.post(`${this.url}/find-by-dynamic`, {
          ...formData
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

  updateStatusRoom(formData: any): Observable<any> {
    console.log(formData)
    return new Observable(
      observer => {
        this.api.patch(`${this.url}/update-status`, {
          ...formData
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
}
