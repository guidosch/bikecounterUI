import { Component } from '@angular/core';
import { Counter } from '../Counter';
import { CloudFunctionAPIService } from '../cloud-function-api.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent {
  counters = this.apiService.getDevices();
  selectedDevice: Counter | undefined;

  constructor(
    private apiService: CloudFunctionAPIService
  ){}

  details(counter: Counter) { 
    this.selectedDevice = counter;
  }

  onNotify() {
    window.alert('show graph... for');
  }
}
