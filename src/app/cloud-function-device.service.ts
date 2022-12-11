import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Counter } from './Counter';
import { SeriesElement } from './TimeseriesData';
import { startWith, tap, delay } from 'rxjs/operators';


const urlDeviceSummary ="https://europe-west6-bikecounter.cloudfunctions.net/getDeviceSummaryPro?collection=";

//collection=xy&q=2022-01-31
const urlCountData ="https://europe-west6-bikecounter.cloudfunctions.net/printDailyGraphDataChartsjs?collection=";

//collection=xy&q=2022-01-31
const urlCountDataYear = "https://europe-west6-bikecounter.cloudfunctions.net/printGraphChartsJs?collection=";

//collection=xy&q=2022-01-31
const urlSingleDay = "https://europe-west6-bikecounter.cloudfunctions.net/printSingleDayChartjs?collection=";

@Injectable({
  providedIn: 'root'
})

/**
 * Calls google cloud functions for counter and summary data.
 */
export class CloudFunctionDeviceService {
  constructor(private httpClient: HttpClient) { }
  
  public getDeviceCounterData(id: string, startTime:string) {
    let url = urlCountData+id+"&q="+startTime;
    return this.httpClient.get<SeriesElement[]>(url);
  }

  public getDeviceCounterDataYear(id: string, startTime:string) {
    let url = urlCountDataYear+id+"&q="+startTime;
    return this.httpClient.get<SeriesElement[]>(url);
  }

  /**
   * delayed because of ExpressionChangedAfterItHasBeenCheckedError
   * @param id 
   * @param startTime 
   * @returns observable of one day values
   */
  public getDeviceCounterDataSingleDay(id: string, startTime:string) {
    let url = urlSingleDay+id+"&q="+startTime;
    return this.httpClient.get<SeriesElement[]>(url).pipe(delay(3000));
  }

  public getDeviceSummary(id: string) {
    let url =urlDeviceSummary+id;
    //return an observable
    return this.httpClient.get<Counter[]>(url);

  }
  
}
