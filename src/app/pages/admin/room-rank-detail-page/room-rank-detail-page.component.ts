import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAX_PAGE } from 'src/app/constants/common';
import { RoomCategoryDto } from 'src/app/models/dto/room-category.dto';
import { RoomRankDto } from 'src/app/models/dto/room-rank.dto';
import { RoomTypeDto } from 'src/app/models/dto/room-type.dto';
import { RoomCategoryService } from 'src/app/services/room-category.service';
import { RoomRankService } from 'src/app/services/room-rank.service';
import { RoomTypeService } from 'src/app/services/room-type.service';

@Component({
  selector: 'app-room-rank-detail-page',
  templateUrl: './room-rank-detail-page.component.html',
  styleUrls: ['./room-rank-detail-page.component.css']
})
export class RoomRankDetailPageComponent implements OnInit {

  data!: RoomRankDto;
  validateForm!: FormGroup;

  roomTypesSearch: RoomTypeDto[] = [];
  roomCategorysSearch: RoomCategoryDto[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roomTypeService: RoomTypeService,
    private roomCategoryService: RoomCategoryService,
    private roomRankService: RoomRankService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(30)]],
      description: [null],
      images: [null],
      roomType: [null, [Validators.required]],
      roomCategory: [null, [Validators.required]],
    });
    this.roomRankService.getById(id).subscribe(res => {
      if (!!res) {
        this.data = res;
        const { name, description, images, roomType, roomCategory } = this.data;
        this.validateForm.setValue({ name, description, images, roomType, roomCategory })
      }
    }, error => { console.log(error) });

    const requestSelect = {
      pagination: { pageSize: MAX_PAGE, pageIndex: 0 }, query: null, sort: null,
    };
    this.roomTypeService.filter({ ...requestSelect }).subscribe(res => {
      if (!!res) {
        this.roomTypesSearch = res.rows;
      }
    }, error => { console.log(error) });
    this.roomCategoryService.filter({ ...requestSelect }).subscribe(res => {
      if (!!res) {
        this.roomCategorysSearch = res.rows;
      }
    }, error => { console.log(error) });
  }

  onSearchRoomType(value: any): void {
    if (!!value.trim()) {
      value = value.toUpperCase();
      this.roomTypeService.search({
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
      this.roomCategoryService.search({
        pagination: { pageIndex: 0, pageSize: MAX_PAGE },
        query: { name: value },
        sort: null,
      }).subscribe(res => {
        if (!!res) {
          this.roomCategorysSearch = res.rows;
        }
      })
    }
  }

  submitForm(): void {

  }

}
