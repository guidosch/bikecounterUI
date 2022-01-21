import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import 'chartjs-adapter-date-fns';
import {  } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  public lineChartData: ChartDataset[] = [
    {data: [{"x":1642714241000,"y":1},{"x":1643714241000,"y":2},{"x":1644714241000,"y":3},{"x":1645714241000,"y":13}], label: 'Battery level', yAxisID: 'y'},
    {data: [{"x":1642714241000,"y":4.5},{"x":1643714241000,"y":7.5},{"x":1644714241000,"y":6.5},{"x":1645714241000,"y":13}], label: 'Battery Voltage', yAxisID: 'y1'},
    {data: [{"x":1642714241000,"y":10},{"x":1643714241000,"y":12},{"x":1644714241000,"y":13},{"x":1645714241000,"y":16}], label: 'Temperature', yAxisID: 'y2'},
    {data: [{"x":1642714241000,"y":16},{"x":1643714241000,"y":26},{"x":1644714241000,"y":63},{"x":1645714241000,"y":13}], label: 'Humidity', yAxisID: 'y3'}
  ];

  public lineChartOptions: ChartOptions = {
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          drawOnChartArea: false,
        }
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        }
      },
      y3: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
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
  public lineChartType : ChartType = "line";
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.lineChartData = [];
  }
}
