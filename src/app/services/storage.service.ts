import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageConst } from './constant';
import { UserDto } from '../models/dto/user.dto';
import { UserCustomerDto } from '../models/dto/user-customer.dto';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // region User info
  public set userInfo(userInfo: any) {
    if (this.isBrowser) {
      localStorage.setItem(StorageConst.USER_INFO, JSON.stringify(userInfo));
    }
  }

  public get userInfo(): any {
    if (this.isBrowser) {
      const userInfoRaw = localStorage.getItem(StorageConst.USER_INFO);

      if (userInfoRaw) {
        return JSON.parse(userInfoRaw);
      }
    }
    return null;
  }


  public set userCustomerInfo(userCustomerInfo: any) {
    if (this.isBrowser) {
      localStorage.setItem(StorageConst.USER_CUSTOMER_INFOR, JSON.stringify(userCustomerInfo));
    }
  }

  public get userCustomerInfo(): any {
    if (this.isBrowser) {
      const userInfoRaw = localStorage.getItem(StorageConst.USER_CUSTOMER_INFOR);

      if (userInfoRaw) {
        return JSON.parse(userInfoRaw);
      }
    }
    return null;
  }

  // endregion

  // region Token
  public get token(): any {
    return this.isBrowser ? localStorage.getItem(StorageConst.TOKEN) : '';
  }

  public set token(accessToken: any) {
    if (this.isBrowser) {
      localStorage.setItem(StorageConst.TOKEN, accessToken);
    }
  }
  // endregion

  public clearStorage(): void {
    localStorage.removeItem(StorageConst.TOKEN);
    localStorage.removeItem(StorageConst.USER_INFO);
    localStorage.removeItem(StorageConst.USER_CUSTOMER_INFOR);

  }
}
