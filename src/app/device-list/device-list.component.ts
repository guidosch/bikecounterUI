import { Component, ViewChild, OnInit } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatExpansionPanel } from '@angular/material/expansion';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { CloudFunctionAPIService } from '../cloud-function-summary.service';
import { Counter } from '../Counter';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

const rolesPrefix = "https://bikecounter.ch/roles"

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {

  @ViewChild(MatExpansionPanel)
  expansionPanel!: MatExpansionPanel;

  //accessing mat component instance
  @ViewChild(MatBadge)
  badge!: MatBadge;

  faExclamationTriangle = faExclamationTriangle;

  selectedDevice: Counter | undefined;
  roles: string[] | undefined;

  counters: Observable<Counter[]> | undefined;

  constructor(private apiService: CloudFunctionAPIService, public auth: AuthService) {
  }

  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => {
        if (profile) {
          this.roles = profile[`${rolesPrefix}`];
          //console.log("Profile: "+JSON.stringify(profile));
        }
      }
    );
    //todo use auth0 roles to filter counters
    this.counters = this.apiService.getDevices();
  }

  details(counter: Counter) {
    this.selectedDevice = counter;
  }

  checkRole() {
    return this.roles?.includes("admin");
  }

  isOnline(counter: Counter) {
    return counter.online;
  }

  calcWarnings(counter: Counter) {
    //Devices start having problems sending msg. below/equal ~3.0 volt.
    let errors: number = 0;
    if (counter.online) {
      if (counter.batteryVoltage && counter.batteryVoltage < 3.1) {
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

  /** example for ui action triggered with emmiter*/
  onNotify() {
    window.alert('show graph... for');
  }

  openPanel(counter: Counter) {
    console.log("Panel opened for: " + counter.id);
    this.selectedDevice = counter;
  }

  closedPanel(counter: Counter) {
    console.log("Panel opened for: " + counter.id);
  }

}
