import { Component, Input, OnInit, Output, ViewChild, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/constants/route';
import { RoomRankDto } from 'src/app/models/dto/room-rank.dto';

@Component({
  selector: 'app-room-rank-home-page',
  templateUrl: './room-rank-home-page.component.html',
  styleUrls: ['./room-rank-home-page.component.css']
})
export class RoomRankHomeComponent implements OnInit, AfterViewInit {

  @Input() title: string = '';
  @Input() data: RoomRankDto[] = [];

  constructor(
    private element: ElementRef,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const roomConstainer = [...this.element.nativeElement.querySelectorAll('.room-container')];
    const nxtBtn = [...this.element.nativeElement.querySelectorAll('.nxt-btn')];
    const preBtn = [...this.element.nativeElement.querySelectorAll('.pre-btn')];

    roomConstainer.forEach((item, i) => {
      let containerDimenstions = item.getBoundingClientRect();
      let containerWidth = containerDimenstions.width;

      nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
      })

      preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
      })
    })
  }

  redirectDetailPage(id: string): void {
    this.router.navigate([`${Route.Detail}/${id}`]);
  }
}
