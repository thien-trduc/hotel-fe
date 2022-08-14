import { StorageService } from 'src/app/services/storage.service';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/models/dto/user.dto';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit, AfterViewInit {

  sidebar: any;
  profileDropdown: any;
  user!:UserDto;

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: any,
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.storageService.userInfo;
  }

  ngAfterViewInit(): void {
    this.sidebar = this.document.getElementById('sidebar')
    this.profileDropdown = this.document.getElementById('ProfileDropDown')
  }

  sidebarToggle() {
    if (this.sidebar.style.display === "none") {
      this.sidebar.style.display = "block";
    } else {
      this.sidebar.style.display = "none";
    }
  }

  profileToggle() {
    if (this.profileDropdown.style.display === "none") {
      this.profileDropdown.style.display = "block";
    } else {
      this.profileDropdown.style.display = "none";
    }
  }

  logout(): void {
    this.storageService.clearStorage();
    this.router.navigate(['/login/admin']);
  }

}
