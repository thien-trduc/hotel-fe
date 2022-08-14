import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BookingDetailDto } from 'src/app/models/dto/booking-detail.dto';
import { BookingDto } from 'src/app/models/dto/booking.dto';
import { BookingService } from 'src/app/services/booking.service';
import { RentingService } from 'src/app/services/renting.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  data!: BookingDto;
  title = 'Phiếu đặt'

  //modal
  formModal: boolean = false;
  confirmModalDelete!: NzModalRef;
  modalPhieuThue!: NzModalRef;

  //table
  total = 1;
  datas: BookingDto[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 0;

  // form 
  validateForm!: FormGroup;

  //select search
  searchResult: BookingDto[] = [];

  bookingDetailDatas: BookingDetailDto[] = [];
  bookingSelect!: string;

  constructor(
    private fb: FormBuilder,
    private service: BookingService,
    public util: UtilService,
    private message: NzMessageService,
    private modal: NzModalService,
    private rentingService: RentingService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      valueDiscount: [null],
      totalDiscount: [null],
      // color: [null, [Validators.required]],
    });
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, {});
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: any,
  ): void {
    this.service.filter({
      pagination: { pageIndex, pageSize },
      query: _.first(filter),
      sort: this.util.handleSort(sortField, sortOrder),
    }).subscribe(res => {
      if (!!res) {
        this.loading = false;
        this.datas = res.rows;
        this.pageIndex = res.pageIndex;
        this.pageSize = res.pageSize;
      }
    }, err => {
      console.log(err.error.message)
    });

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  onSelectSearchChange(value: any): void {
    if (!!value.trim()) {
      this.loading = true;
      this.service.search({
        pagination: { pageIndex: 0, pageSize: this.pageSize },
        query: { bookingCode: value.toUpperCase() },
        sort: null,
      }).subscribe(res => {
        if (!!res) {
          this.loading = false;
          this.datas = res.rows;
          this.pageIndex = res.pageIndex;
          this.pageSize = res.pageSize;
        }
      })
    }
  }

  onSearch(value: any): void {
    if (!!value.trim()) {
      value = value.toUpperCase();
      this.loading = true;
      this.service.search({
        pagination: { pageIndex: 0, pageSize: this.pageSize },
        query: { bookingCode: value },
        sort: null,
      }).subscribe(res => {
        if (!!res) {
          this.loading = false;
          this.datas = res.rows;
          this.pageIndex = res.pageIndex;
          this.pageSize = res.pageSize;
        }
      })
      this.service.search({
        pagination: { pageIndex: 0, pageSize: 10000 },
        query: { bookingCode: value },
        sort: null,
      }).subscribe(res => {
        if (!!res) {
          this.searchResult = res.rows;
        }
      })
    }
  }

  submitForm(): void {
    if (this.validateForm.valid && !!this.bookingSelect) {
      this.rentingService.checkInBooking({
        booking: this.bookingSelect,
      }).subscribe(res => {
        // this.modalPhieuThue = this.modal.success({
        //   nzTitle: 'Check In',
        //   nzContent: `Check In cho khách hàng thành công ! Mã phiếu thuê : ${res._id}`
        // })
        this.message.success(`Check In cho khách hàng thành công !`)
        this.formModal = false;
        
        this.loadDataFromServer(this.pageIndex,this.pageSize,null,null, [])
      }, error => console.log(error))
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  delete(id: string) {
    this.confirmModalDelete = this.modal.confirm({
      nzTitle: 'Chắc chắn xóa ?',
      nzOnOk: () => this.service.deleteById(id).subscribe(res => {
        if (res) {
          this.message.success('Xóa thành công!')
          this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
        }
      })
    });
  }

  openModal(id: string): void {
    this.bookingSelect = id;
    this.validateForm.reset();
    this.formModal = true;
    if (!!id) {
      this.service.getById(id).subscribe(res => {
        if (!!res) {
          this.data = res;
          this.bookingDetailDatas = this.data.details;
          const {  } = this.data;
          // this.validateForm.setValue({
          // })
        }
      }, error => console.log(error))
    }
  }
  
  closeModal(): void {
    this.formModal = false;
    this.validateForm.reset();
  }


}
