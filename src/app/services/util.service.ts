import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private api: ApiService) {
   }

  handleSort(sortField: string | null,
    sortOrder: string | null): any {
      const sort: any = {};
      if (sortField && sortOrder) {
          sort[sortField] = sortOrder.replace('end', '').toUpperCase();
      }
      return sort;
  }

  formatDate(date: Date | string): string {
    return moment(date).add(7).format('DD-MM-yyyy hh:mm:ss');
  }

  formatCurrency(value: number): string {
    return `${value} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  upload(file: any, url: string): Observable<any> {
    return new Observable(observer => {
      const formData = new FormData();
      formData.append('file', file);
      this.api.postFile(`${url}`,formData).subscribe(
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
