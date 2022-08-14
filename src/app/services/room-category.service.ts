import { RoomCategoryDto } from 'src/app/models/dto/room-category.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AbstractService } from './abstract.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoomCategoryService  extends AbstractService<RoomCategoryDto> {

  constructor(
    public readonly http: HttpClient,
    public readonly api: ApiService,
  ) { 
    super(
      http,
      `${environment.url}/room-category`,
      api
    )
  }
}
