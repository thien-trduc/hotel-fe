import { Component, OnInit, ViewChild } from '@angular/core';
import { ReceiptService } from 'src/app/services/receipt.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-statistical-turn-over-page',
  templateUrl: './statistical-turn-over-page.component.html',
  styleUrls: ['./statistical-turn-over-page.component.css']
})
export class StatisticalTurnOverPageComponent implements OnInit {

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
    private receptService: ReceiptService,
  ) { }


  ngOnInit(): void {
  }

  show(): void {
    this.showChart = true;
    this.receptService.statisticalTurnOverByDate({
      startDate: this.startValue.toISOString(),
      endDate: this.endValue.toISOString(),
    }).subscribe(res => {
      if (!!res) {
        const labels = res.map((data: any) => data.name);
        const data = res.map((data: any) => data.value);
        this.barChartData ={...this.barChartData, labels };

        this.barChartData ={...this.barChartData, datasets: [{ data, label :'doanh thu' } ] };
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
