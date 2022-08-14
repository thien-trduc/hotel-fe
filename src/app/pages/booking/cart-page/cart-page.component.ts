import { MAX_PAGE } from './../../../constants/common';
import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BookingOrderDto } from 'src/app/models/dto/booking-order.dto';
import { RequestPayload } from 'src/app/models/payload/request.payload';
import { BookingOrderService } from 'src/app/services/booking-order.service';
import { UtilService } from 'src/app/services/util.service';
import * as _ from 'lodash';
import { StorageService } from 'src/app/services/storage.service';
import { CHECK_IN_DATE, CHECK_OUT_DATE } from 'src/app/constants/common';
import * as moment from 'moment';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { PaypalService } from 'src/app/services/paypal.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ElementRef } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { StorageConst } from 'src/app/services/constant';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { Route } from 'src/app/constants/route';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {

  total = 1;
  bookingOrders: BookingOrderDto[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 0;

  checkInDate!: string;
  checkOutDate!: string;
  price = 0;

  validateForm!: FormGroup;

  public payPalConfig?: IPayPalConfig;
  showSuccess!: boolean;

  items!: any[];
  amount: any;

  confirmModalDelete!: NzModalRef;

  constructor(
    private fb: FormBuilder,
    private bookingOrderService: BookingOrderService,
    private storage: StorageService,
    public util: UtilService,
    private bookingService: BookingService,
    private modal: NzModalService,
    private router: Router,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.initConfig();
    this.validateForm = this.fb.group({
      description: [null],
    });
    this.checkInDate = this.util.formatDate(moment(localStorage.getItem(CHECK_IN_DATE)).toDate());
    this.checkOutDate = this.util.formatDate(moment(localStorage.getItem(CHECK_OUT_DATE)).toDate());
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, {});
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: any,
  ): void {
    const formData: RequestPayload = {
      pagination: { pageIndex, pageSize },
      query: _.first(filter),
      sort: this.util.handleSort(sortField, sortOrder),
    }
    console.log(formData)
    this.bookingOrderService.filter(formData).subscribe(res => {
      if (!!res) {
        this.loading = false;
        this.bookingOrders = res.rows;
        this.pageIndex = res.pageIndex;
        this.pageSize = res.pageSize;
      }
    }, err => {
      console.log(`${err.error.message}`)
    });
    this.bookingOrderService.filter({
      pagination: { pageIndex: 0, pageSize: MAX_PAGE },
      query: _.first(filter),
      sort: this.util.handleSort(sortField, sortOrder),
    }).subscribe(res => {
      if (!!res) {
        this.items = res.rows.map(row => {
          return {
            name: row.roomRank.name,
            quantity: `${row.quantity}`,
            // category: row.roomRank.name,
            unit_amount: {
              currency_code: 'EUR',
              value: `${row.price}`,
            },
          }
        })
        console.log(this.items)

        this.price = _.reduce(
          res.rows,
          (sum: number, item: any) => {
            return sum + (item.price * item.quantity);
          },
          0,
        );
        console.log(this.price)
      }
    }, err => {
      console.log(`${err.error.message}`)
    });

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }


  delete(bookingOrderId: string): void {
    this.confirmModalDelete = this.modal.confirm({
      nzTitle: 'Chắc chắn xóa ?',
      nzOnOk: () => this.bookingOrderService.deleteById(bookingOrderId).subscribe(res => {
        this.message.success('Xóa thành công!')
        this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
      })
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const { description } = this.validateForm.value;
      const customerInfor = this.storage.userCustomerInfo;
      this.bookingService.reserveBooking({
        checkInDate: moment(localStorage.getItem(CHECK_IN_DATE)).toDate(),
        checkOutDate: moment(localStorage.getItem(CHECK_OUT_DATE)).toDate(),
        price: this.price,
        customer: customerInfor.customer,
        description,
        date: moment().toDate(),
      }).subscribe(res => {
        console.log(res)
      }, error => {
        console.log(error)
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

  public initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: `${this.price}`,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: `${this.price}`,
                }
              }
            },
            items: [
              ...this.items,
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {

          this.submitForm()
          this.modal.success({
            nzTitle: `Đặt phòng`,
            nzContent: `Bạn đã đặt phòng thành công! `
          });
          this.router.navigate([`${Route.Home}`])
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

}
