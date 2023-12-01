import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Counter, Gateway } from '../Counter';
import { trails } from '../Trails';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SeriesElement } from '../TimeseriesData';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent {

  //object passed from parent component
  @Input() counter!: Counter;
  selectedDevice: Counter | undefined;
  private dialog: MatDialog
  constructor( dialog: MatDialog) {
    this.dialog = dialog;
  }

  ngOnInit(): void {
    let trail = trails.get(this.counter.id);
    if (trail) {
      //let url = `https://map.geo.admin.ch/?lang=de&topic=ech&E${trail.x}=&N=${trail.y}&zoom=8`;
      let url = `http://map.geo.admin.ch/?Y=${trail.coordinates.x}&X=${trail.coordinates.y}&zoom=10&crosshair=marker`;
      this.counter.location = url;
    }
  }

  checkBatteryVoltage(volt: number): boolean {
    return volt < 3.1 ? true : false;
  }

  checkHumidity(humidity: number): boolean {
    return humidity > 80 ? true : false;
  }

  showGraph(counter: Counter) {
    this.selectedDevice = counter;
  }

  countGateways(counter: Counter): number {
    if (counter.gateways) {
      if (Array.isArray(counter.gateways)) {
        return counter.gateways.length;
      }
    }
    return 0;
  }

  openDialog(counter: Counter): void {
    this.dialog.open(GatewaysDialog, {
      width: '500px',
      data: counter
    });
  }

}

/**
 * Dialog component and class
 */
@Component({
  selector: 'gatways-dialog-dialog',
  templateUrl: 'gateways-dialog.html',
  styleUrls: ['./gateways-dialog.css']
})
export class GatewaysDialog implements OnDestroy, OnInit {

  dialogGraphViewMode: boolean = true;
  public tableData: SeriesElement[] = [];
  public gateways: Gateway[] = [];
  public airtime: number = 0;

  constructor(public dialogRef: MatDialogRef<GatewaysDialog>, @Inject(MAT_DIALOG_DATA) public dialogData: Counter) {
    this.airtime = dialogData.airtime;
    if (Array.isArray(dialogData.gateways)) {
      this.gateways = dialogData.gateways;
    } else if (dialogData.gateways) {
      this.gateways = [dialogData.gateways];
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  close(): void {
    this.dialogRef.close();
  }

}



