import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseDto } from "../models/dto/response.dto";
import { Pagination } from "../models/payload/pagination";
import { ApiService } from "./api.service";
import * as _ from 'lodash';
import { RequestPayload } from "../models/payload/request.payload";

export class AbstractService<T> {
  protected http: HttpClient;
  protected url: string;
  protected api: ApiService


  constructor(http: HttpClient, url: string, api: ApiService) {
    this.http = http;
    this.url = url;
    this.api = api;
  }

  filter(formData: RequestPayload): Observable<ResponseDto<T>> {
    const {
      pagination = {
        pageIndex: 0,
        pageSize: 10
      },
      query = {},
      sort = { createdAt: 'desc' }
    } = formData;
    return new Observable<ResponseDto<T>>(
      observer => {
        this.api.post(`${this.url}/list`, {
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

  search(formData: RequestPayload,): Observable<ResponseDto<T>> {
    const {
      pagination = {
        pageIndex: 0,
        pageSize: 10
      },
      query = {},
      sort = { createdAt: 'desc' }
    } = formData;
    return new Observable<ResponseDto<T>>(
      observer => {
        this.api.post(`${this.url}/search`, {
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

  create(formData: any): Observable<T> {
    return new Observable<T>(
      observer => {
        this.api.post(`${this.url}`, {
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

  getById(id: string | number): Observable<T> {
    return new Observable<T>(
      observer => {
        this.api.get(`${this.url}/${id}`).subscribe((res) => {
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

  updateById(id: string | number, formData: any): Observable<T> {
    return new Observable<T>(
      observer => {
        this.api.put(`${this.url}/${id}`, {
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

  deleteById(id: string | number): Observable<boolean> {
    return new Observable<boolean>(
      observer => {
        this.api.delete(`${this.url}/${id}`).subscribe((res) => {
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

}