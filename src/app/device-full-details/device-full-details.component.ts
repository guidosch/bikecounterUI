import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CloudFunctionDeviceService } from '../cloud-function-device.service';
import { Counter } from '../Counter';


@Component({
  selector: 'app-device-full-details',
  templateUrl: './device-full-details.component.html',
  styleUrls: ['./device-full-details.component.css']
})
export class DeviceFullDetailsComponent implements OnInit {

  counter!: Counter;

  constructor(private route: ActivatedRoute, private apiService: CloudFunctionDeviceService) {
    let deviceID: string = "";
    route.pathFromRoot[1].url.subscribe(val => {

      this.apiService.getDeviceSummary(val[1].path).subscribe(data => {
        this.counter = data[0];
      });

    });

  }

  ngOnInit(): void {
    console.log("init called...");
  }

}
