import { RoomCategoryService } from './../../../services/room-category.service';
import { RoomTypeService } from './../../../services/room-type.service';
import { RoomCategoryDto } from './../../../models/dto/room-category.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RoomRankDto } from 'src/app/models/dto/room-rank.dto';
import { RequestPayload } from 'src/app/models/payload/request.payload';
import { RoomRankService } from 'src/app/services/room-rank.service';
import { UtilService } from 'src/app/services/util.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Route } from 'src/app/constants/route';
import { RoomTypeDto } from 'src/app/models/dto/room-type.dto';
import { MAX_PAGE } from 'src/app/constants/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room-rank-page',
  templateUrl: './room-rank-page.component.html',
  styleUrls: ['./room-rank-page.component.css']
})
export class RoomRankPageComponent implements OnInit {

  title = 'Hạng phòng'

  //modal
  formModal: boolean = false;
  confirmModalDelete!: NzModalRef;

  //table
  total = 1;
  datas: RoomRankDto[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 0;

  // form 
  validateForm!: FormGroup;
  roomTypesSearch: RoomTypeDto[] = [];
  roomCateSearch: RoomCategoryDto[] = [];

  //select search
  searchResult: RoomRankDto[] = [];

  // upload
  apiUpload = `${environment.url}/upload/room`;
  files: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: RoomRankService,
    private roomTypeService: RoomTypeService,
    private roomCategoryService: RoomCategoryService,
    public util: UtilService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(30)]],
      description: [null],
      images: [null],
      roomType: [null, [Validators.required]],
      roomCategory: [null, [Validators.required]],
    });
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
    const requestSelect = {
      pagination: { pageSize: MAX_PAGE, pageIndex: 0 }, query: null, sort: null,
    };
    this.roomTypeService.filter({...requestSelect}).subscribe(res => {
      if (!!res) {
        this.roomTypesSearch = res.rows
      }
    })
    this.roomCategoryService.filter({...requestSelect}).subscribe(res => {
      if (!!res) {
        this.roomCateSearch = res.rows
      }
    })
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
        pagination: { pageIndex: 0, pageSize: MAX_PAGE },
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

  onSearchRoomType(value: any): void {
    if (!!value.trim()) {
      value = value.toUpperCase();
      this.roomTypeService.search( {
        pagination: { pageIndex: 0, pageSize: MAX_PAGE },
        query: { name: value },
        sort: null,
      }).subscribe(res => {
        if (!!res) {
          this.roomTypesSearch = res.rows;
        }
      })
    }
  }

  onSeachRoomCategory(value: any): void {
    if (!!value.trim()) {
      value = value.toUpperCase();
      this.roomCategoryService.search( {
        pagination: { pageIndex: 0, pageSize: MAX_PAGE },
        query: { name: value },
        sort: null,
      }).subscribe(res => {
        if (!!res) {
          this.roomCateSearch = res.rows;
        }
      })
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.validateForm.controls.images.setValue(this.getUrlInfiles());
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

  openModal(): void {
    this.validateForm.reset();
    this.formModal = true;
  }

  closeModal(): void {
    this.formModal = false;
    this.validateForm.reset();
  }

  redirectDetail(id: string): void {
    this.router.navigate([`${Route.Admin}/${Route.RoomRank}/${id}`]);
  }

  getUrlInfiles(): string[] {
    return this.files.map(item => item.response.url);
  }
}
