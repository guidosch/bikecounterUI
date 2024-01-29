import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartEvent, ChartOptions, ChartType } from 'chart.js';
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

  
  @ViewChild(BaseChartDirective)
  baseChartDir!: BaseChartDirective;
  id: string = "default";
  private chartComponent: any;
  public lineChartData: ChartDataset[] = [];
  private apiService: CloudFunctionHealthService;
  public lineChartOptions: ChartOptions = {
    responsive: true,
    //maintainAspectRatio: false,
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
        max: 4.5,
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

  @Input() counter!: Counter;

  @ViewChild('lineChartDiv') lineChartDiv!: ElementRef;
  
  constructor(private route: ActivatedRoute, private cloudService: CloudFunctionHealthService) {
    this.apiService = cloudService;
  }

  ngAfterViewInit(): void {
    let observable = this.apiService.getHealthDataForDevice(this.counter.id);

    observable.subscribe(data => {
      let temp: ChartDataset[] = [];
      data.forEach(element => {
        if (element.measure === "batteryLevel") {
          temp.push({ data: element.data, label: 'Battery level', yAxisID: 'y' });
        } else if (element.measure === "batteryVoltage") {
          temp.push({ data: element.data, label: 'Battery voltage', yAxisID: 'y1' });
        } else if (element.measure === "temperature") {
          temp.push({ data: element.data, label: 'Temperature', yAxisID: 'y2' });
        } else if (element.measure === "humidity") {
          temp.push({ data: element.data, label: 'Humidity', yAxisID: 'y3' });
        }
      });
      this.lineChartData.push(...temp);
      this.baseChartDir.ngOnChanges({});
      this.baseChartDir.update();

      // this is a hack due to the problem of the chart shrinking to zero when data arrives.
      let flexContainer = this.lineChartDiv.nativeElement.parentElement.parentElement.parentElement;
      let firstClassName = flexContainer.className.split(" ")[0];
      if (firstClassName == "flex-container") {
        let width = flexContainer.offsetWidth;
        let height = flexContainer.offsetHeight;
        if (width > height) {
          this.lineChartDiv.nativeElement.style.width = width/3+"px";
          this.baseChartDir.chart?.resize();
        } else {
          this.lineChartDiv.nativeElement.style.height = height/2+"px";
          this.baseChartDir.chart?.resize();
        }
      }

    });
  }

  ngOnInit() {
    this.id = crypto.randomUUID();
  }
  ngOnDestroy() {
    this.lineChartData = [];
  }

}
