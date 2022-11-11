import { Component, Input, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { CloudFunctionDeviceService } from '../cloud-function-device.service';
import { Counter } from '../Counter';
import { SeriesElement } from '../TimeseriesData';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  //allows access to the component
  @ViewChild(BaseChartDirective)
  baseChartDir!: BaseChartDirective;

  private chartComponent: any;
  public chartData: ChartDataset[] = [];
  public chartOptions: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            return formatDate(context[0].parsed.x, "fullDate", "en");
          }
        }
      }
    }
  };
  public chartLegend = true;
  public chartType: ChartType = "bar";
  public chartPlugins = [];
  private cloudService: CloudFunctionDeviceService;

  //object passed from parent component
  @Input() counter!: Counter;

  constructor(private route: ActivatedRoute, private service: CloudFunctionDeviceService) {
    this.cloudService = service;
  }

  ngAfterViewInit(): void {
    let today: string = new Date().toISOString().split("T")[0];
    let observable = this.cloudService.getDeviceCounterData(this.counter.id, today);
    let title = `Abfahrten auf Trail: ${this.counter.id}`;

    observable.subscribe(data => {
      let backgroundColors = data.map(elem => colorWeekends(elem));
      this.chartData.push({ data: data, label: title, yAxisID: 'y', backgroundColor: backgroundColors });

      this.baseChartDir.ngOnChanges({});
      this.baseChartDir.update();
    });
  }

}

function colorWeekends(elem: SeriesElement) {
  let day = new Date(elem.x).getUTCDay();
  if (day == 0 || day == 6) {
    return "#bad6f2";
  } else {
    return "#1976d2"
  }
}
