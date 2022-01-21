import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Counter } from '../Counter';
import { HttpClient } from '@angular/common/http';

//allows to react to httpClient com. errors
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CloudFunctionAPIService } from '../cloud-function-api.service';

@Component({
  selector: 'app-device-full-details',
  templateUrl: './device-full-details.component.html',
  styleUrls: ['./device-full-details.component.css']
})
export class DeviceFullDetailsComponent implements OnInit {

  counter: Counter | undefined;

  constructor(private route: ActivatedRoute, private apiService: CloudFunctionAPIService) {
    const routeParams = this.route.snapshot.paramMap;
    const id = String(routeParams.get('id'));
    this.counter = this.apiService.getDevice(id);
  }
  ngOnInit(): void {
    console.log("init called...");
  }

}
