import { CHECK_IN_DATE, CHECK_OUT_DATE } from './../../constants/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { Route } from 'src/app/constants/route';
import { UserCustomerDto } from 'src/app/models/dto/user-customer.dto';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userCustomer!: UserCustomerDto;

  public startValue!: Date ;
  public endValue!: Date ;
  public endOpen = false;
  @ViewChild('endDatePicker') public endDatePicker!: NzDatePickerComponent;


  constructor(
    private route: Router,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.userCustomer = this.storageService.userCustomerInfo;
  }

  redirectUserCustomer(): void {
    // this.userCustomer = this.storageService.userCustomerInfo;
      if(!!this.userCustomer) {
        
      } else {
        this.route.navigate([`${Route.LoginCustomer}`])
      }
  }

  public redirectCart(): void {
    this.userCustomer = this.storageService.userCustomerInfo;
    if(!!this.userCustomer) {
      this.route.navigate([`/${Route.Cart}`])
    } else {
      this.route.navigate([`${Route.LoginCustomer}`])
    }
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue ) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  public handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
  }

  public handleEndOpenChange(open: boolean): void {
    this.endOpen = open;
  }

  public onStartChange(value: Date) {
    localStorage.setItem(CHECK_IN_DATE, this.startValue.toISOString());
  }

  public onEndChange(value: Date) {
    localStorage.setItem(CHECK_OUT_DATE, this.endValue.toISOString());
  }

  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }

  logout(): void {
    this.storageService.clearStorage()
    this.route.navigate([`/${Route.LoginCustomer}`]).then(() => {
      window.location.reload();
    })
    // this.redirectTo(`/${Route.LoginCustomer}`);
  }

  redirectTrangChu(): void {
    this.route.navigate([`/${Route.Home}`])
  }  
  
  redirectKhuyenMai(): void {

  }

  redirectHangPhong(): void {

  }

  redirectLienHe(): void {

  }
}
