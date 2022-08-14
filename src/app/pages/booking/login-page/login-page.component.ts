import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Route } from 'src/app/constants/route';
import { UserCustomerDto } from 'src/app/models/dto/user-customer.dto';
import { UserDto } from 'src/app/models/dto/user.dto';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private message: NzMessageService,
    private storage: StorageService,
    private fb: FormBuilder,
    private router: Router,
    private socialService: SocialAuthService
  ) { }

  ngOnInit(
  ): void {
    this.validateForm = this.fb.group({
      username: [null, [
        Validators.required,
        //Validators.email
      ]],
      password: [null, [Validators.required]],
    });
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.loginCustomer(this.validateForm.value)
        .subscribe(res => {
          if (!!res) {
            const {
              userId,
              username,
              customer,
              token
            } = res;
            console.log(res)
            this.storage.token = token;
            this.storage.userCustomerInfo = new UserCustomerDto(
              userId, username, customer,
            )
            this.router.navigate([`/${Route.Home}`]).then(() => {
              window.location.reload();
            });
          }
          // this.redirectTo(`/${Route.Home}`)
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

  redirectRegister(): void {
    this.router.navigate([`/${Route.Register}`])
  }

  signInWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      if (!!res) {
        this.authService.loginSocial(res).subscribe(data => {
          if (!!data) {
            const {
              userId,
              username,
              customer,
              token
            } = data;
            console.log(res)
            this.storage.token = token;
            this.storage.userCustomerInfo = new UserCustomerDto(
              userId, username, customer,
            )
            this.router.navigate([`/${Route.Home}`]).then(() => {
              window.location.reload();
            });
          }
        })
      }
    });
  }

}
