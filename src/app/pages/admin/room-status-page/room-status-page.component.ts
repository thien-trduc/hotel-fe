import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RoomStatusDto } from 'src/app/models/dto/room-status.dto';
import { RequestPayload } from 'src/app/models/payload/request.payload';
import { RoomStatusService } from 'src/app/services/room-status.service';
import { UtilService } from 'src/app/services/util.service';
import * as _ from 'lodash';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-room-status-page',
  templateUrl: './room-status-page.component.html',
  styleUrls: ['./room-status-page.component.css']
})
export class RoomStatusPageComponent implements OnInit {
  data!: RoomStatusDto;
  title = 'Trạng thái phòng'

  //modal
  formModal: boolean = false;
  confirmModalDelete!: NzModalRef;

  //table
  total = 1;
  datas: RoomStatusDto[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 0;

  // form 
  validateForm!: FormGroup;

  //select search
  searchResult: RoomStatusDto[] = [];

  constructor(
    private fb: FormBuilder,
    private service: RoomStatusService,
    public util: UtilService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      status: [null, [Validators.required]],
      color: [null, [Validators.required]],
    });
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
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
    this.service.filter(formData).subscribe(res => {
      if (!!res) {
        this.loading = false;
        this.datas = res.rows;
        this.pageIndex = res.pageIndex;
        this.pageSize = res.pageSize;
      }
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

  onSelectSearchChange(value: any): void {
    if (!!value.trim()) {
      const formData: RequestPayload = {
        pagination: { pageIndex: 0, pageSize: this.pageSize },
        query: { name: value.toUpperCase() },
        sort: null,
      }
      this.loading = true;
      this.service.search(formData).subscribe(res => {
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
      const formData: RequestPayload = {
        pagination: { pageIndex: 0, pageSize: this.pageSize },
        query: { name: value },
        sort: null, 
      }
      this.loading = true;
      this.service.search(formData).subscribe(res => {
        if (!!res) {
          this.loading = false;
          this.datas = res.rows;
          this.pageIndex = res.pageIndex;
          this.pageSize = res.pageSize;
        }
      })
      const formDataText: RequestPayload = {
        pagination: { pageIndex: 0, pageSize: 10000 },
        query: { name: value },
        sort: null,
      }
      this.service.search(formDataText).subscribe(res => {
        if (!!res) {
          this.searchResult = res.rows;
        }
      })
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if (!!this.data) {
        this.service.updateById(this.data._id, this.validateForm.value).subscribe(res => {
          if (!!res) {
            this.message.success('Lưu thành công !');
            this.validateForm.reset();
            this.formModal = false
            this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
          }
        }, err => {
          this.message.error(`${err.error.message}`)
        })
      } else {
        this.service.create(this.validateForm.value).subscribe(res => {
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

  openModal(id?: string): void {
    this.validateForm.reset();
    this.formModal = true;
    if (!!id) {
      this.service.getById(id).subscribe(res => {
        if (!!res) {
          this.data = res;
          const { status, color = '' } = this.data;
          this.validateForm.setValue({
            status, color
          })
        }
      })
    }
  }

  closeModal(): void {
    this.formModal = false;
    this.validateForm.reset();
  }
}
