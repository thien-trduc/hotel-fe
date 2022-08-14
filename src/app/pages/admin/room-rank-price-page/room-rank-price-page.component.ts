import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RoomRankPriceDto } from 'src/app/models/dto/room-rank-price.dto';
import { RequestPayload } from 'src/app/models/payload/request.payload';
import { RoomRankService } from 'src/app/services/room-rank.service';
import { UtilService } from 'src/app/services/util.service';
import * as _ from 'lodash';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-room-rank-price-page',
  templateUrl: './room-rank-price-page.component.html',
  styleUrls: ['./room-rank-price-page.component.css']
})
export class RoomRankPricePageComponent implements OnInit {

  @Input() roomRankId!: string;

  id: string = '';

  // form 
  validateForm!: FormGroup;
  dataRoomPrice!: RoomRankPriceDto;

  //modal
  formModal: boolean = false;
  confirmModalDelete!: NzModalRef;

  //table
  total = 1;
  datas: RoomRankPriceDto[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 0;

  idRank!: string;

  constructor(
    private fb: FormBuilder,
    private roomRankService: RoomRankService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private modal: NzModalService,
    public util: UtilService,
  ) { }

  ngOnInit(): void {
    this.idRank = this.roomRankId;
    console.log(this.idRank)
    this.validateForm = this.fb.group({
      date: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null,  []);
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
      query: {..._.first(filter), roomRank: this.roomRankId},
      sort: this.util.handleSort(sortField, sortOrder),
    }
    this.roomRankService.findPricesService(this.idRank, formData).subscribe(res => {
      this.loading = false;
      this.datas = res.rows;
      this.pageIndex = res.pageIndex;
      this.pageSize = res.pageSize;
    }, err => {
      this.message.error(`${err.error.message}`)
    });

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  openModal(id?: string): void {
    this.validateForm.reset();
    this.formModal = true;
    if (!!id) {
      this.roomRankService.getPriceById(this.idRank, id).subscribe(res => {
        if (!!res) {
          this.dataRoomPrice = res;
          const { date, price } = this.dataRoomPrice;
          this.validateForm.setValue({
            date, price
          });
        }
      })
    }
  }

  delete(id: string) {
    this.confirmModalDelete = this.modal.confirm({
      nzTitle: 'Chắc chắn xóa ?',
      nzOnOk: () => this.roomRankService.deletePriceService(this.idRank, id).subscribe(res => {
        if (res) {
          this.message.success('Xóa thành công!')
          this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
        }
      })
    });
  }

  closeModal(): void {
    this.formModal = false;
    this.validateForm.reset();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = { ...this.validateForm.value, roomRank: this.idRank };
      if (!!this.dataRoomPrice) {
        this.roomRankService.updatePriceService(this.idRank, this.dataRoomPrice._id, formData).subscribe(res => {
          if (!!res) {
            this.message.success('Cập nhật thành công !');
            this.validateForm.reset();
            this.formModal = false
            this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
          }
        }, err => {
          this.message.error(`${err.error.message}`)
        });
      } else {
        this.roomRankService.createPriceService(this.idRank, formData).subscribe(res => {
          if (!!res) {
            this.message.success('Tạo thành công !');
            this.validateForm.reset();
            this.formModal = false
            this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
          }
        }, err => {
          this.message.error(`${err.error.message}`)
        });
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  disabledDate(current: any): any {

    return current && moment(current).add(1, 'day').isBefore(moment());
  }

}
