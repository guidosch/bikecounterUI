import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CloudFunctionDeviceService } from '../cloud-function-device.service';
import { Counter } from '../Counter';
import { TrailCoordinates, trails } from '../Trails';


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
        let trail = trails.get(this.counter.id);
        if (trail) {
          let url = `https://map.geo.admin.ch/?lang=de&topic=ech&E${trail.coordinates.x}=&N=${trail.coordinates.y}&zoom=8`
          this.counter.location = url;
        }
      });

    });
  }

  ngOnInit(): void { }

}
