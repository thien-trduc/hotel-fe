import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from 'src/app/services/storage.service';
import { UserDto } from 'src/app/models/dto/user.dto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-admin-page',
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
  ) { }

  ngOnInit(
  ): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.loginEmployee(this.validateForm.value)
        .subscribe(res => {
          if (!!res) {
            const {
              userId,
              username,
              employee,
              token
            } = res;
            this.storage.token = token;
            this.storage.userInfo = new UserDto(
              userId, username, employee,
            )
          }
          this.router.navigate(['/admin'])
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
}
