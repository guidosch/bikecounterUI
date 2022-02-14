import { Component, Input, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { CloudFunctionDeviceService } from '../cloud-function-device.service';
import { Counter } from '../Counter';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnDestroy {
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
            return context[0].label.substring(0, 12)
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
    this.cloudService =service;
  }
  
  ngAfterViewInit(): void {
    //todo extract start time
    let observable = this.cloudService.getDeviceCounterData(this.counter.id, "2022-01-15");
    let title = `Abfahrten auf Trail: ${this.counter.id}`;
    
    observable.subscribe(data => {
      this.chartData.push({ data: data, label: title, yAxisID: 'y' });
      //this calls the chart.update() method
      this.baseChartDir.ngOnChanges({});
  
    });

  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.chartData = [];
  }
}
