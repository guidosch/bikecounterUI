import { Component, ViewChild, SimpleChange } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatExpansionPanel } from '@angular/material/expansion';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { CloudFunctionAPIService } from '../cloud-function-summary.service';
import { Counter } from '../Counter';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent {
  @ViewChild(MatExpansionPanel)
  expansionPanel!: MatExpansionPanel;

  //accessing mat component instance
  @ViewChild(MatBadge)
  badge!: MatBadge;

  faExclamationTriangle = faExclamationTriangle;

  counters = this.apiService.getDevices();
  selectedDevice: Counter | undefined;

  constructor(private apiService: CloudFunctionAPIService ) {
  }

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
      if (counter.batteryVoltage && counter.batteryVoltage < 3.7){
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

  openPanel(counter: Counter) {
    console.log("Panel opened for: "+counter.id);
    this.selectedDevice = counter;
  }
  
}
