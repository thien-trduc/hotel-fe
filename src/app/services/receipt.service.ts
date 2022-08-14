import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ReceiptDto } from '../models/dto/receipt.dto';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService extends AbstractService<ReceiptDto> {

  constructor(
    public readonly http: HttpClient,
    public readonly api: ApiService,
  ) {
    super(
      http,
      `${environment.url}/receipt`,
      api
    )
   }

   statisticalTurnOverByDate(formData: any): Observable<any> {
    return new Observable(
      observer => {
        this.api.post(`${this.url}/statistical-turn-over`, {
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
