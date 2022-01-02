import { Injectable } from '@angular/core';
import { Counter } from './Counter';
import { HttpClient } from '@angular/common/http';

//needed for httpClient error handling
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CloudFunctionAPIService {
  devices: Counter[] = [];

  constructor(private httpClient: HttpClient) { }
  
  /**
   * return a list of devices
   */
  public getDevices() {
    //load from API. Http Client return an Observable and and contains the Counter objects inside in the body.
    //The Observable can be consumed directly in the UI with the "| async" command.
    //return this.httpClient.get<Counter[]>('/assets/deviceData.json');

    let url = "https://europe-west6-bikecounter.cloudfunctions.net/getDevicesSummaryPro";
    return this.httpClient.get<Counter[]>(url);

  }

  /**
   * name
   */
  public getDevice(id: String): Counter | undefined {
    return this.devices.find(device => device.id === id);
  }
  
}
