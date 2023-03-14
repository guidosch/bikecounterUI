import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { CloudFunctionHealthService } from '../cloud-function-health.service';
import { Counter } from '../Counter';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnDestroy, AfterViewInit {
  //allows access to the component
  @ViewChild(BaseChartDirective)
  baseChartDir!: BaseChartDirective;

  private chartComponent: any;
  public lineChartData: ChartDataset[] = [];
  private apiService: CloudFunctionHealthService;
  public lineChartOptions: ChartOptions = {
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Bat. level"
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          drawOnChartArea: false,
        },
        min: 3,
        max:4.5,
        title: {
          display: true,
          text: "Bat. volt",
        }
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Temp."
        }
      },
      y3: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
        title: {
          display: true,
          text: "Humid."
        }
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
  public lineChartLegend = true;
  public lineChartType: ChartType = "line";
  public lineChartPlugins = [];

  //object passed from parent component
  @Input() counter!: Counter;

  constructor(private route: ActivatedRoute, private cloudService: CloudFunctionHealthService) {
    this.apiService = cloudService;
  }

  ngAfterViewInit(): void {
    let observable = this.apiService.getHealthDataForDevice(this.counter.id);

    //will be called after data is fetched from server
    observable.subscribe(data => {

      data.forEach(element => {
        if (element.measure === "batteryLevel") {
          this.lineChartData.push({ data: element.data, label: 'Battery level', yAxisID: 'y' });
        } else if (element.measure === "batteryVoltage") {
          this.lineChartData.push({ data: element.data, label: 'Battery voltage', yAxisID: 'y1' });
        } else if (element.measure === "temperature") {
          this.lineChartData.push({ data: element.data, label: 'Temperature', yAxisID: 'y2' });
        } else if (element.measure === "humidity") {
          this.lineChartData.push({ data: element.data, label: 'Humidity', yAxisID: 'y3' });
        }
      });
      this.baseChartDir.ngOnChanges({});

    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.lineChartData = [];
  }
}
