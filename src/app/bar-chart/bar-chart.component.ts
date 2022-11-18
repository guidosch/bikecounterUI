import { Component, Input, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { CloudFunctionDeviceService } from '../cloud-function-device.service';
import { Counter } from '../Counter';
import { SeriesElement } from '../TimeseriesData';
import { TemplateBindingParseResult } from '@angular/compiler';


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
  private chartOptionsDay: ChartOptions = {
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

  private chartOptionsMonth: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        type: 'time',
        time: {
          unit: 'month'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            return formatDate(context[0].parsed.x, "MMMM", "en");
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
  selectedTimeRange: string = "thisMonth";

  ngOnInit() {
    this.selectedTimeRange = "thisMonth";
  }

  ngAfterViewInit(): void {
    this.fetchData();
  }

  fetchData(timeQuery: Date = new Date()) {
    this.destroyGraph();
    let today: string = timeQuery.toISOString().split("T")[0];
    let observable = this.cloudService.getDeviceCounterData(this.counter.id, today);
    
    observable.subscribe(data => {
      let backgroundColors = data.map(elem => colorWeekends(elem));
      this.chartData.push({ data: data, label: this.getTitle(), yAxisID: 'y', backgroundColor: backgroundColors });
      this.baseChartDir.ngOnChanges({});
    });
  }

  
  private getTitle() {
    return `Abfahrten auf Trail: ${this.counter.id}`;
  }

  fetchDataYear() {
    this.destroyGraph();
    let today: string = new Date().toISOString().split("T")[0];
    let observable = this.cloudService.getDeviceCounterDataYear(this.counter.id, today);
    
    observable.subscribe(data => {
      this.chartData.push({ data: data, label: this.getTitle(), yAxisID: 'y', backgroundColor: "#1976d2" });
      this.baseChartDir.ngOnChanges({});
    });
  }
  
  private destroyGraph() {
    this.chartData = [];
    this.baseChartDir.chart?.destroy();
  }
  
  chartOptions(){
    if (this.selectedTimeRange === "year"){
      return this.chartOptionsMonth;
    }
    return this.chartOptionsDay;

  }

  onTimeRangeChange() {
    switch (this.selectedTimeRange) {
      case "thisMonth":
        this.fetchData();
        break;
      case "+1":
        this.fetchData(monthBack(1));
        break;
      case "+2":
        this.fetchData(monthBack(2));
        break;
      case "year":
        this.fetchDataYear();
        break;
    }
  }

}

function monthBack(month: number): Date {
  let today = new Date();
  return new Date(today.setMonth(today.getMonth() - month));
}

function colorWeekends(elem: SeriesElement) {
  let day = new Date(elem.x).getDay();
  if (day == 0 || day == 6) {
    return "#bad6f2";
  } else {
    return "#1976d2"
  }
}


