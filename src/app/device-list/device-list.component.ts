import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Counter } from '../Counter';
import { CloudFunctionAPIService } from '../cloud-function-summary.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatBadge } from '@angular/material/badge';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent {
  @ViewChild(MatExpansionPanel)
  expansionPanel!: MatExpansionPanel;

  @ViewChild(MatBadge)
  badge!: MatBadge;

  faExclamationTriangle = faExclamationTriangle;

  counters = this.apiService.getDevices();
  selectedDevice: Counter | undefined;

  constructor(private apiService: CloudFunctionAPIService ) { }

  details(counter: Counter) {
    this.selectedDevice = counter;
  }

  isOnline(counter: Counter) {
    return counter.online;
  }

  calcWarnings(counter: Counter) {
    //todo check with tobias about min voltage
    let errors: number = 0;
    if (counter.online){
      if (counter.batteryVoltage < 3.7){
        errors++;
      } else if (counter.humidity > 80) {
        errors++;
      }
   }
    return errors;
  }

  isOnlineMsg(counter: Counter) {
    return counter.online ? "(online)" : "(offline)";
  }

  onNotify() {
    window.alert('show graph... for');
  }
  
}
