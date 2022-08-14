import { HttpClient } from '@angular/common/http';
import { RoomTypeDto } from './../models/dto/room-type.dto';
import { AbstractService } from './abstract.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService extends AbstractService<RoomTypeDto> {

  constructor(
    public readonly http: HttpClient,
    public readonly api: ApiService,
  ) {
    super(
      http,
      `${environment.url}/room-type`,
      api
    )
  }
}
