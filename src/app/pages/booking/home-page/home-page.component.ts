import { RoomRankDto } from './../../../models/dto/room-rank.dto';
import { Component, OnInit } from '@angular/core';
import { RoomRankService } from 'src/app/services/room-rank.service';
import { RequestPayload } from 'src/app/models/payload/request.payload';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  roomRanksBooking: RoomRankDto[] = [];
  roomRankDicountsBooking: RoomRankDto[] = [];


  sider = [
    '/assets/image/hotel.png',
    '/assets/image/hotel1.png',
    '/assets/image/hotel2.png'
  ];

  constructor(
    private roomRankService: RoomRankService,
  ) { }

  ngOnInit(): void {
    const formData: RequestPayload = {
      pagination: {
        pageIndex: 0,
        pageSize: 10
      },
      query: {},
      sort: {},
    }
    this.roomRankService.getRoomRankBooking(formData).subscribe(res => {
      if (!!res) {
        this.roomRanksBooking = res.rows;
      }
    })
    this.roomRankService.getRoomRankDiscountBooking(formData).subscribe(res => {
      if (!!res) {
        this.roomRankDicountsBooking = res.rows;
      }
    })
  }

}
