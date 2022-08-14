import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RentingDetailDto } from 'src/app/models/dto/renting-detail.dto';
import { RentingDto } from 'src/app/models/dto/renting.dto';
import { RentingService } from 'src/app/services/renting.service';
import { UtilService } from 'src/app/services/util.service';
import * as _ from 'lodash';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-renting-page',
  templateUrl: './renting-page.component.html',
  styleUrls: ['./renting-page.component.css']
})
export class RentingPageComponent implements OnInit {

  data!: RentingDto;
  title = 'Phiếu thuê'

  //modal
  formModal: boolean = false;
  // confirmModalDelete!: NzModalRef;
  modalPhieuThue!: NzModalRef;

  //table
  total = 1;
  datas: RentingDto[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 0;

  // form 
  validateForm!: FormGroup;

  //select search
  searchResult: RentingDto[] = [];

  rentingDetailDatas: RentingDetailDto[] = [];
  rentingSelect!: string;

  constructor(
    private fb: FormBuilder,
    private service: RentingService,
    public util: UtilService,
    private message: NzMessageService,
    private modal: NzModalService,
    private rentingService: RentingService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      // valueDiscount: [null],
      // totalDiscount: [null],
      // color: [null, [Validators.required]],
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
        query: { RentingCode: value.toUpperCase() },
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
        query: { RentingCode: value },
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
        query: { RentingCode: value },
        sort: null,
      }).subscribe(res => {
        if (!!res) {
          this.searchResult = res.rows;
        }
      })
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if (!!this.rentingSelect) {
        this.rentingService.checkOutRenting({
          rentingId: this.rentingSelect,
        }).subscribe(res => {
          this.formModal = false;
          // this.modalPhieuThue = this.modal.success({
          //   nzTitle: 'Check out',
          //   nzContent: `Check out cho khách hàng thành công ! Mã hóa đơn : ${res._id}`
          // })
          this.message.success(`Check out cho khách hàng thành công ! Mã hóa đơn : ${res._id}`)
          this.loadDataFromServer(this.pageIndex,this.pageSize,null,null, [])
        }, error => console.log(error))
        

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
    // this.confirmModalDelete = this.modal.confirm({
    //   nzTitle: 'Chắc chắn xóa ?',
    //   nzOnOk: () => this.service.deleteById(id).subscribe(res => {
    //     if (res) {
    //       this.message.success('Xóa thành công!')
    //       this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
    //     }
    //   })
    // });
  }

  openModal(id: string): void {
    this.rentingSelect = id;
    this.validateForm.reset();
    this.formModal = true;
    if (!!id) {
      this.service.getById(id).subscribe(res => {
        if (!!res) {
          this.data = res;
          console.log(this.data)
          this.rentingDetailDatas = this.data.details;
          const { } = this.data;
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
