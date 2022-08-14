import { Component, OnInit, ViewChild } from '@angular/core';
import { ReceiptService } from 'src/app/services/receipt.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { RoomRankService } from 'src/app/services/room-rank.service';

@Component({
  selector: 'app-statistical-room-rank-page',
  templateUrl: './statistical-room-rank-page.component.html',
  styleUrls: ['./statistical-room-rank-page.component.css']
})
export class StatisticalRoomRankPageComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  startValue!: Date;
  endValue!: Date;
  endOpen = false;
  showChart = false;
  public barChartPlugins = [
    DataLabelsPlugin
  ];
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';


  public barChartData!: ChartData<'bar'>;

  constructor(
    private service: RoomRankService,
  ) { }


  ngOnInit(): void {
  }

  show(): void {
    this.showChart = true;
    this.service.statisticalRoomRank({
      startDate: this.startValue.toISOString(),
      endDate: this.endValue.toISOString(),
    }).subscribe(res => {
      if (!!res) {
        const labels = res.map((data: any) => data.name);
        const data = res.map((data: any) => data.value);
        this.barChartData ={...this.barChartData, labels };

        this.barChartData ={...this.barChartData, datasets: [{ data, label :'số lượng đặt' } ] };
        console.log(this.barChartData)

      }
    })
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
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

}
