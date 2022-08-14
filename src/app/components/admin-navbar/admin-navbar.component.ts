import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/dto/user.dto';
import { Router } from '@angular/router';
import { Route } from 'src/app/constants/route';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  isList!: number;
  isMenu: boolean = false;
  isMenuBtn() {
    this.isMenu = !this.isMenu;
  }
  isSearch: boolean = false;
  user!: UserDto;

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user = this.storageService.userInfo;
  }

  redirectRoomType(): void{ 
    this.router.navigate([`/${Route.Admin}/${Route.RoomType}`])
  }
  
  redirectRoomCategory(): void {
    this.router.navigate([`/${Route.Admin}/${Route.RoomCategory}`])
  }

  redirectRoomRank(): void {
    this.router.navigate([`/${Route.Admin}/${Route.RoomRank}`])
  }

  redirectRoomMap(): void {
    this.router.navigate([`/${Route.Admin}/${Route.RoomMap}`])
  }

  redirectRoomStatus(): void {
    this.router.navigate([`/${Route.Admin}/${Route.RoomStatus}`])
  }

  redirectBooking(): void {
    this.router.navigate([`/${Route.Admin}/${Route.Booking}`])
  }

  redirectRenting(): void {
    this.router.navigate([`/${Route.Admin}/${Route.Renting}`])
  }

  redirectReceipt(): void {
    this.router.navigate([`/${Route.Admin}/${Route.Receipt}`])
  }

  redirectStatisticalTurnOver(): void {
    this.router.navigate([`/${Route.Admin}/${Route.StatisticalTurnOver}`])
  }

  redirectStatisticalRoomRank(): void {
    this.router.navigate([`/${Route.Admin}/${Route.StatisticalRoomRank}`])
  }
}
