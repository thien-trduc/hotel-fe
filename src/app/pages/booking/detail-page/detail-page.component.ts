import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RoomRankDto } from './../../../models/dto/room-rank.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomTypeDto } from 'src/app/models/dto/room-type.dto';
import { RoomCategoryDto } from 'src/app/models/dto/room-category.dto';
import { RoomRankService } from 'src/app/services/room-rank.service';
import { RoomTypeService } from 'src/app/services/room-type.service';
import { RoomCategoryService } from 'src/app/services/room-category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'lodash';
import { BookingOrderService } from 'src/app/services/booking-order.service';
import { CHECK_IN_DATE, CHECK_OUT_DATE } from 'src/app/constants/common';
import * as moment from 'moment';
import { StorageService } from 'src/app/services/storage.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Route } from 'src/app/constants/route';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  validateForm!: FormGroup;
  backgroundImage!: string | undefined;
  sliderImage!: string[];
  roomRank!: RoomRankDto;
  roomType!: RoomTypeDto;
  roomCategory!: RoomCategoryDto;
  modalNotify!: NzModalRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roomRankService: RoomRankService,
    private roomTypeService: RoomTypeService,
    private roomCategoryService: RoomCategoryService,
    private bookingOrderService: BookingOrderService,
    private storageService: StorageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    const idRank = this.route.snapshot.paramMap.get('id') || '';
    this.validateForm = this.fb.group({
      count: [null, [Validators.required]],
    });
    this.roomRankService.getById(idRank).subscribe(value => {
      this.roomRank = value;
      this.sliderImage = value.images;
      this.backgroundImage = this.roomRank.images ? first<string>(this.roomRank.images) : '';
      this.roomTypeService.getById(value.roomType).subscribe(res => {
        this.roomType = res;
      }, error => console.log(error))
      this.roomCategoryService.getById(value.roomCategory).subscribe(res => {
        this.roomCategory = res;
      }, error => console.log(error))
    }, error => console.log(error))
  }

  submitForm(): void {


    if (!this.storageService.userCustomerInfo?.customer) {
      this.modalNotify = this.modal.error({
        nzTitle: 'Đặt phòng',
        nzContent: `Bạn cần đăng nhập trước khi đặt phòng!`,
        nzOnOk: () => {
          this.router.navigate([`/${Route.LoginCustomer}`]).then(() => {
            window.location.reload();
          });
        }
      });
      
      return;
    }

    if (!localStorage.getItem(CHECK_IN_DATE) || !localStorage.getItem(CHECK_OUT_DATE)) {
      this.modalNotify = this.modal.error({
        nzTitle: 'Đặt phòng',
        nzContent: `Bạn cần chọn thời gian check in và check out trước khi đặt phòng!`
      });
      return;
    }


    if (this.validateForm.valid) {
      const quantity = this.validateForm.value.count;
      const customer = this.storageService.userCustomerInfo.customer;
      const user = this.storageService.userCustomerInfo.userId;
      const checkInDate = localStorage.getItem(CHECK_IN_DATE);
      const checkOutDate = localStorage.getItem(CHECK_OUT_DATE);
      // note
      const bookingDate = moment().toDate().toISOString();
      const price = this.roomRank.price;
      const totalPrice = quantity * price;
      const roomRank = this.roomRank._id;
      this.bookingOrderService.create({
        quantity, customer, user, checkInDate, checkOutDate, bookingDate, totalPrice, roomRank, price
      }).subscribe(res => {
        if (!!res) {
          this.modalNotify = this.modal.success({
            nzTitle: 'Đặt phòng',
            nzContent: `Bạn đã đặt hạng phòng ${this.roomRank.name} thành công với số lượng ${quantity} !`
          });
        }
      }, (error: HttpErrorResponse) => {
        console.log(error)
        this.modalNotify = this.modal.error({
          nzTitle: 'Đặt phòng',
          nzContent: `${error.error.message}`
        });
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
