import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AbstractService } from './abstract.service';
import { CustomerDto } from '../models/dto/customer.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends AbstractService<CustomerDto> {

  constructor(
    public readonly http: HttpClient,
    public readonly api: ApiService,
  ) {
    super(
      http,
      `${environment.url}/customer`,
      api
    )
  }
}
