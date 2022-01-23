import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeseriesData } from './TimeseriesData';

//needed for httpClient error handling
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const URL = "https://europe-west6-bikecounter.cloudfunctions.net/getDeviceHealthData";

@Injectable({
  providedIn: 'root'
})
export class CloudFunctionHealthService {
  
  constructor(private httpClient: HttpClient) { }

  public getHealthDataForDevice(deviceId: string) {

    return this.httpClient.get<TimeseriesData[]>(URL+"?collection="+deviceId);
  }
}
