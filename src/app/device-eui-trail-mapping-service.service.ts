import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeseriesData } from './TimeseriesData';

//needed for httpClient error handling
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CollectionToEUIMapping } from './eui-mappings';

const URL = "https://europe-west6-bikecounter.cloudfunctions.net/getDeviceEUITrailMappings";

@Injectable({
  providedIn: 'root'
})
export class DeviceEuiTrailMappingServiceService {

  constructor(private httpClient: HttpClient) { }

  public getMappings(deviceId: string) {
    return this.httpClient.get<CollectionToEUIMapping[]>(URL);
  }
}
