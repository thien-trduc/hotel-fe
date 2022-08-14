import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(
    public readonly http: HttpClient,
    public readonly api: ApiService,
  ) { }

  public payment(formData: any): Observable<any> {
    return new Observable<any>(observer => {
      this.api.post(`${environment.url}/paypal/payment`, {
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
