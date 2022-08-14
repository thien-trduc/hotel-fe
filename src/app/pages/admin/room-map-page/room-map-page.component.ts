import { RoomStatusService } from 'src/app/services/room-status.service';
import { Component, OnInit } from '@angular/core';
import { MAX_PAGE } from 'src/app/constants/common';
import { RoomStatusDto } from 'src/app/models/dto/room-status.dto';
import { RequestPayload } from 'src/app/models/payload/request.payload';
import { RoomRankDto } from 'src/app/models/dto/room-rank.dto';
import { RoomRankService } from 'src/app/services/room-rank.service';
import { RoomService } from 'src/app/services/room.service';
import { RoomDto } from 'src/app/models/dto/room.dto';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as _ from 'lodash';

@Component({
  selector: 'app-room-map-page',
  templateUrl: './room-map-page.component.html',
  styleUrls: ['./room-map-page.component.css']
})
export class RoomMapPageComponent implements OnInit {

  roomStatusDatas!: RoomStatusDto[];
  roomStatusSearch!: RoomStatusDto[];

  roomRankSearch!: RoomRankDto[];
  rooms!: any[];
  statusRoomQuantity: any;

  roomRankSearchText!: string;
  rooomStatusSearchText!: string;

  startValue!: Date;
  endValue!: Date;
  endOpen = false;

  room!: RoomDto;

  modalUpdateRoom = false;

  statusRoomSelected!: string;

  constructor(
    private roomStatusService: RoomStatusService,
    private roomRankService: RoomRankService,
    private roomService: RoomService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.roomStatusService.filter({
      pagination: { pageSize: MAX_PAGE, pageIndex: 0 },
      query: null,
      sort: null,
    }).subscribe(res => {
      if (!!res) {
        this.roomStatusDatas = res.rows;
        this.roomStatusSearch = res.rows;
      }
    });
    this.roomRankService.filter({
      pagination: { pageSize: MAX_PAGE, pageIndex: 0 },
      query: null,
      sort: null,
    }).subscribe(res => {
      if (!!res) {
        this.roomRankSearch = res.rows;
      }
    });
    this.roomService.findByDynamic({}).subscribe(res => {
      if (!!res) {
        console.log(res)
        this.rooms = res.rooms;
        this.statusRoomQuantity = res.statusQuantity;
      }
    })
  }

  onSelectStatusSearchChange(value: any): void {
    this.rooomStatusSearchText = value;
  }

  onSearchStatus(value: any): void {
    if (!!value.trim()) {
      this.roomStatusService.search({
        pagination: { pageIndex: 0, pageSize: MAX_PAGE },
        query: { status: value.toUpperCase() },
        sort: null,
      }).subscribe(res => {
        if (!!res) {
          this.roomStatusSearch = res.rows;
        }
      })
    }
  }

  onSelectRankSearchChange(value: any): void {
    this.roomRankSearchText = value;
  }

  onSearchRank(value: any): void {
    if (!!value.trim()) {
      this.roomRankSearchText = value.toUpperCase();
      this.roomRankService.search({
        pagination: { pageIndex: 0, pageSize: MAX_PAGE },
        query: { name: value.toUpperCase() },
        sort: null,
      }).subscribe(res => {
        if (!!res) {
          this.roomRankSearch = res.rows;
        }
      })
    }
  }


  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
  }

  handleEndOpenChange(open: boolean): void {
    this.endOpen = open;
  }

  getQuantityStatus(status: string): number {
    if(this.statusRoomQuantity) {
      return Object.keys(this.statusRoomQuantity).includes(status) ? this.statusRoomQuantity[status] : 0;
    }
    return 0;
  }

  onSearchRoom(): void {
    this.roomService.findByDynamic({
      ...(!!this.roomRankSearchText && { roomRank: this.roomRankSearchText }),
      ...(!!this.rooomStatusSearchText && { roomStatus: this.rooomStatusSearchText })

    }).subscribe(res => {
      this.rooms = res.rooms;
      this.statusRoomQuantity = res.statusQuantity;
      this.roomRankSearchText = '';
      this.rooomStatusSearchText = '';
    })
  }

  openModalUpdateRoom(roomId: string): void {
    this.modalUpdateRoom = true;
    this.roomService.getById(roomId).subscribe(res => {
      if (!!res) {
        this.room = res;
      }
    })
  }

  closeModalUpdateRoom(): void {
    this.modalUpdateRoom = false;
  }

  updateStatusRoom(): void {
    console.log()
    this.roomService.updateStatusRoom({
      roomId: `${this.room._id}`,
      status: `${this.statusRoomSelected}`
    }).subscribe(res => {
      if (!!res) {
        this.message.success(`Cập nhật thành công`);
        this.roomService.findByDynamic({}).subscribe(res => {
          if (!!res) {
            console.log(res)
            this.rooms = res.rooms;
            this.statusRoomQuantity = res.statusQuantity;
            this.closeModalUpdateRoom();
          }
        })
      }
    })
  }

  getStatusRoomDetail(idStatus: string): string | undefined {
    return _.find(this.roomStatusDatas, roomStatus => `${roomStatus._id}` === idStatus)?.status;
  }
}
