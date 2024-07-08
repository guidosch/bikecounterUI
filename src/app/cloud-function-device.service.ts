import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Counter } from './Counter';
import { SeriesElement } from './TimeseriesData';
import { catchError, retry, map } from 'rxjs/operators';
import { startWith, tap, delay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {trails} from './Trails';


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

  public getDeviceSummary(id: string, roles: string[] | undefined) {
    let url =urlDeviceSummary+id;
    return this.httpClient.get<Counter[]>(url).pipe(
      map(
        res => {
          return res.map(counter => {
            let trail = trails.get(counter.id);
            if (trail){
              counter.name = trail.name;
              counter.description = trail.description;
              counter.hidden = trail.hidden;
            }
            return counter;
          }).filter(counter => {
            if (roles && roles.includes("admin")) {
              return true;
            } else if (roles && roles.includes("user")) {
              return !counter.hidden;
            }
            return false;
          });
        }
      ),
      retry(2),
      catchError(this.handleError)
    );


  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'))
  }
  
}


