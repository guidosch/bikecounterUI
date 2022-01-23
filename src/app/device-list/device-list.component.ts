import { Component, ViewChild } from '@angular/core';
import { Counter } from '../Counter';
import { CloudFunctionAPIService } from '../cloud-function-summary.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatBadge } from '@angular/material/badge';

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

  counters = this.apiService.getDevices();
  selectedDevice: Counter | undefined;

  constructor(
    private apiService: CloudFunctionAPIService
  ) { }

  details(counter: Counter) {
    this.selectedDevice = counter;
  }

  isOnline(counter: Counter) {
    return counter.online;
  }

  isOnlineMsg(counter: Counter) {
    return counter.online ? "(online)" : "(offline)";
  }

  onNotify() {
    window.alert('show graph... for');
  }
}
