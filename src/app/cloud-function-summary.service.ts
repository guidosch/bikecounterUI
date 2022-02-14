import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
//needed for httpClient error handling
import { Observable, throwError } from 'rxjs';
import { catchError, retry, finalize } from 'rxjs/operators';
import { Counter } from './Counter';
import { LoaderService } from './loader.service';


@Injectable({
  providedIn: 'root'
})
export class CloudFunctionAPIService implements HttpInterceptor {

  constructor(private httpClient: HttpClient, private loaderService: LoaderService) { }

  //http interceptor  --> todo auslagern nach loader service, da der intercepter alle HTTP calls intercepted.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * returns a list of devices with its common properties.
   */
  public getDevices() {
    //load from API. Http Client return an Observable and and contains the Counter objects inside in the body.
    //The Observable can be consumed directly in the UI with the "| async" command.
    //return this.httpClient.get<Counter[]>('/assets/deviceData.json');

    let url = "https://europe-west6-bikecounter.cloudfunctions.net/getDevicesSummaryPro";
    return this.httpClient.get<Counter[]>(url).pipe(
      retry(2), // retry a failed request up to 2 times
      catchError(this.handleError)
    );;

  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'))
  }


}
