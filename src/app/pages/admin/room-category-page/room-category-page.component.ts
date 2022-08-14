import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RoomCategoryDto } from 'src/app/models/dto/room-category.dto';
import { RequestPayload } from 'src/app/models/payload/request.payload';
import { RoomCategoryService } from 'src/app/services/room-category.service';
import { UtilService } from 'src/app/services/util.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-room-category-page',
  templateUrl: './room-category-page.component.html',
  styleUrls: ['./room-category-page.component.css']
})
export class RoomCategoryPageComponent implements OnInit {

  data!: RoomCategoryDto;
  title = 'Loại phòng'

  //modal
  formModal: boolean = false;
  confirmModalDelete!: NzModalRef;

  //table
  total = 1;
  datas: RoomCategoryDto[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 0;

  // form 
  validateForm!: FormGroup;

  //select search
  searchResult: RoomCategoryDto[] = [];

  constructor(
    private fb: FormBuilder,
    private service: RoomCategoryService,
    public util: UtilService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      categoryCode: [null, [Validators.required]],
      name: [null, [Validators.required]],
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
          const { categoryCode, name } = this.data;
          this.validateForm.setValue({
            categoryCode, name
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
