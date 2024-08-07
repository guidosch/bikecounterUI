import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
//needed for httpClient error handling
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Counter } from './Counter';
import {trails} from './Trails';


@Injectable({
  providedIn: 'root'
})
export class CloudFunctionAPIService {

  constructor(private httpClient: HttpClient) { }

  /**
   * returns a list of devices with its common properties.
   */
  public getDevices(roles: string[] | undefined) {
    //load from API. Http Client return an Observable and and contains the Counter objects inside in the body.
    //The Observable can be consumed directly in the UI/html with the "| async" command.
    //return this.httpClient.get<Counter[]>('/assets/deviceData.json');

    let url = "https://europe-west6-bikecounter.cloudfunctions.net/getDevicesSummaryPro";
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
      retry(2), // retry a failed request up to 2 times
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
