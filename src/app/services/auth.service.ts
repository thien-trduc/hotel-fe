import { ApiService } from './api.service';
import { UserDto } from './../models/dto/user.dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginPayload } from '../models/payload/login.payload';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string;

  constructor(
    private api: ApiService,
  ) { 
    this.url = environment.url;
  }

  public loginEmployee(formData: LoginPayload): Observable<any> {
    return new Observable<any>(observer => {
      this.api.post(`${this.url}/user-employees/login`, {
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

  public loginCustomer(formData: LoginPayload): Observable<any> {
    return new Observable<any>(observer => {
      this.api.post(`${this.url}/user-customers/login`, {
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

  public registerUserCustomer(formData: any): Observable<any> {
    return new Observable(observer => {
      this.api.post(`${this.url}/user-customers`, {
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

  public loginSocial(formData: any): Observable<any> {
    return new Observable(observer => {
      this.api.post(`${this.url}/user-customers/login-with-social`, {
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
