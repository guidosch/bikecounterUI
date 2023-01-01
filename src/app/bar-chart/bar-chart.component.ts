import { Component, Input, OnDestroy, OnInit, ViewChild, AfterViewInit, Inject, AfterContentInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartDataset, ChartOptions, ChartType, ChartEvent } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { CloudFunctionDeviceService } from '../cloud-function-device.service';
import { Counter } from '../Counter';
import { SeriesElement } from '../TimeseriesData';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component annotation belongs to the class header like in e.g. java. It binds the components to this class
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  //allows access to the component
  @ViewChild(BaseChartDirective)
  baseChartDir!: BaseChartDirective;

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
    locale:"de-DE",
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
    locale:"de-DE",
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

  public chartType: ChartType = "bar";
  private cloudService: CloudFunctionDeviceService;
  private dialog: MatDialog;

  //object passed from parent component
  @Input() counter!: Counter;

  constructor(private route: ActivatedRoute, private service: CloudFunctionDeviceService, dialog: MatDialog) {
    this.cloudService = service;
    this.dialog = dialog;
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

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    if (active) {
      try {
        let index = (active[0] as any).index;
        let chooseDay = new Date((this.chartData[0].data[index] as any).x).toISOString();
        this.openDialog('0ms', '0ms', chooseDay, this.counter.id);
      } catch (error) {
        console.log("chart click no data found!");
      }
    }
  }

  chartOptions() {
    if (this.selectedTimeRange === "year") {
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, day: string, id: string): void {
    this.dialog.open(DialogChartDialog, {
      width: '1500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        day,
        id
      }
    });
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

function colorKeepAliveMsg(elem: SeriesElement) {
  return elem.y === 0.5 ? "red" : "#1976d2";
}


type DialogData = {
  day: string;
  id: string;
};


/**
 * Dialog component and class
 */
@Component({
  selector: 'dialog-chart-dialog',
  templateUrl: 'dialog-chart-dialog.html',
})
export class DialogChartDialog implements OnDestroy, OnInit, AfterViewInit {

  @ViewChild(BaseChartDirective)
  baseChartDir!: BaseChartDirective;

  dialogGraphViewMode: boolean = true;
  displayedColumns: string[] = ['x', 'y'];
  public chartData: ChartDataset[] = [];
  public tableData: SeriesElement[]= [];
  public chartOptions: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        type: 'time',
        time: {
          unit: 'hour'
        }
      }
    },
    //locale:"de-DE",
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            return formatDate(context[0].parsed.x, "full", "en");
          }
        }
      }
    }
  };
  public chartType: ChartType = "bar";
  private cloudService: CloudFunctionDeviceService;

  constructor(private service: CloudFunctionDeviceService, public dialogRef: MatDialogRef<DialogChartDialog>, @Inject(MAT_DIALOG_DATA) public dialogData: DialogData) {
    this.cloudService = service;
    this.dialogData = dialogData;
  }

  ngOnInit(): void {
    //this.fetchData();
  }

  fetchData() {
    let clickedDay: string = this.dialogData.day.split("T")[0];
    let observable = this.cloudService.getDeviceCounterDataSingleDay(this.dialogData.id, clickedDay);

    observable.subscribe(data => {
      //only show the last 25 elements otherwise graph does not show bars
      let reduced = data;
      if (data.length > 50){
        reduced = data.slice(-50);
      }
      let markedKeepAliveMsg = reduced.map(elem => {
        if (elem.y === 0){
          return {...elem, y : 0.5};
        }
        return elem;
      });
      
      let backgroundColors = markedKeepAliveMsg.map(elem => colorKeepAliveMsg(elem));
      this.chartData.push({ data: markedKeepAliveMsg, label: this.dialogData.id, yAxisID: 'y', backgroundColor: backgroundColors, barThickness:3 });
      this.tableData = data;
      this.baseChartDir.ngOnChanges({});
    });
  }

  ngAfterViewInit(): void {
    this.fetchData();
  }
  
  ngOnDestroy(): void {
    this.chartData = [];
    this.tableData = [];
    this.baseChartDir.chart?.destroy();
  }

  close(): void {
    this.dialogRef.close();
    this.dialogGraphViewMode = true;
  }

  tableView(): void {
    this.dialogGraphViewMode = false;
  }

  graphView(): void {
    this.dialogGraphViewMode = true;
  }
}


