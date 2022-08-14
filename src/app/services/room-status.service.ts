import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RoomStatusDto } from '../models/dto/room-status.dto';
import { AbstractService } from './abstract.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoomStatusService extends AbstractService<RoomStatusDto> {

  constructor(
    public readonly http: HttpClient,
    public readonly api: ApiService,
  ) {
    super(
      http,
      `${environment.url}/room-status`,
      api
    )
  }
}