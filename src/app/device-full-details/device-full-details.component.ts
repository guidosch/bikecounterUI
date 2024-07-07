import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CloudFunctionDeviceService } from '../cloud-function-device.service';
import { Counter } from '../Counter';
import { TrailCoordinates, trails } from '../Trails';
import { AuthService } from '@auth0/auth0-angular';

const rolesPrefix = "https://bikecounter.ch/roles";

@Component({
  selector: 'app-device-full-details',
  templateUrl: './device-full-details.component.html',
  styleUrls: ['./device-full-details.component.css']
})
export class DeviceFullDetailsComponent implements OnInit {

  counter!: Counter;
  route: ActivatedRoute;
  roles: string[] | undefined;

  constructor(route: ActivatedRoute, private apiService: CloudFunctionDeviceService, public auth: AuthService) {
    this.route = route;
  }

  ngOnInit(): void {
    let deviceID: string = "";
    this.route.pathFromRoot[1].url.subscribe(val => {

      //todo: writh with rxjs. First call depends on second call
      this.auth.user$.subscribe(
        (profile) => {
          if (profile) {
            this.roles = profile[`${rolesPrefix}`];

            //load device
            this.apiService.getDeviceSummary(val[1].path, this.roles).subscribe(data => {
              this.counter = data[0];
              let trail = trails.get(this.counter.id);
              if (trail) {
                let url = `https://map.geo.admin.ch/?lang=de&topic=ech&E${trail.coordinates.x}=&N=${trail.coordinates.y}&zoom=8`
                this.counter.location = url;
              }
            });

          }
        }
      );
    });
  }

  checkRole() {
    return this.roles?.includes("approved");
  }

  isOnline(counter: Counter) {
    return counter.online;
  }

  isOnlineMsg(counter: Counter) {
    return counter.online ? "(online)" : "(offline)";
  }

}
