import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Route } from 'src/app/constants/route';
import { environment } from 'src/environments/environment';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { UtilService } from 'src/app/services/util.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;

  files: any = [];
  apiUpload = `${environment.url}/upload/customer`;

  constructor(
    private authService: AuthService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private utilService: UtilService,
    private customerService: CustomerService,
  ) { }

  ngOnInit(
  ): void {
    this.validateForm = this.fb.group({
      idCard: [null, [Validators.required]],
      fullName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      password: [null],
      avatar: [null],
    });
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const {password, avatar, ...data } = this.validateForm.value
      this.customerService.create(data)
        .subscribe(res => {
          if (!!res) {
            this.authService.registerUserCustomer({
              password,
              avatar,
              customer: res._id,
              username: res.email,
            }).subscribe(resUser => {
              if (!!resUser) {
                this.message.success('Tạo tài khoản thành công')
                this.router.navigate([`/${Route.LoginCustomer}`]);
              }
            }, err => {
              console.log(`${err.error.message}`)
            })
          }
        }, err => {
          console.log(`${err.error.message}`)
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

  customReq = (item: NzUploadXHRArgs) => {
    return this.utilService.upload(item.file, this.apiUpload).subscribe(res => {
      this.validateForm.controls.avatar.setValue(res.url);
      this.files = [{ url: res.url }];
      return res;
    });
  }
}
